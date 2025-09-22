package com.ricesnack.GrowIT_BE.game.service;

import com.ricesnack.GrowIT_BE.error.CustomException;
import com.ricesnack.GrowIT_BE.error.ErrorCode;
import com.ricesnack.GrowIT_BE.game.dto.GamePlayRequest;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.saved.domain.*;
import com.ricesnack.GrowIT_BE.saved.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService {
    private final SavedRepository savedRepository;
    private final EventWeightRepository eventWeightRepository;
    private final RewardDeltaRepository rewardDeltaRepository;
    private final StatDeltaRepository statDeltaRepository;
    private final EventOverrideRepository eventOverrideRepository;

    @Transactional
    public void makeDecision(Member member, GamePlayRequest gamePlayRequest) {
        log.info("makeDecision 호출 - savedId: {}, policy: {}",
                gamePlayRequest.savedId(), gamePlayRequest.policy());
        changePolicy(gamePlayRequest);
        log.info("makeDecision 완료");
    }

    @Transactional
    public void changePolicy(GamePlayRequest gamePlayRequest) {
        try {
            log.info("=== changePolicy 시작 ===");
            log.info("요청 정보 - savedId: {}, policy: {}",
                    gamePlayRequest.savedId(), gamePlayRequest.policy());

            Saved saved = savedRepository.findById(gamePlayRequest.savedId())
                    .orElseThrow(() -> new CustomException(ErrorCode.SAVE_NOT_EXIST));

            log.info("현재 저장된 정책: {}", saved.getPolicy());

            Policy originalPolicy = saved.getPolicy();
            Policy newPolicy = parsePolicyNullable(gamePlayRequest.policy());

            log.info("정책 비교 - 기존: {}, 새정책: {}, 동일한가: {}",
                    originalPolicy, newPolicy, originalPolicy == newPolicy);

            // 동일하면 아무 것도 안 함
            if (originalPolicy == newPolicy) {
                log.info("정책이 동일하여 변경하지 않음");
                return;
            }

            log.info("=== Delta 적용 시작 ===");

            // 1) 이전 정책 효과 제거(Δ를 빼기)
            if (originalPolicy != null) {
                log.info("기존 정책 효과 제거 시작: {}", originalPolicy);
                try {
                    CharacterTrait oldTrait = originalPolicy.getTrait();
                    applyTraitAsDelta(saved.getId(), oldTrait, -1);
                    log.info("기존 정책 효과 제거 완료");
                } catch (Exception e) {
                    log.error("기존 정책 효과 제거 중 오류 발생", e);
                    throw e; // 예외를 다시 던져서 트랜잭션 롤백 유발
                }
            }

            // 2) 새 정책 효과 적용(Δ를 더하기)
            if (newPolicy != null) {
                log.info("새 정책 효과 적용 시작: {}", newPolicy);
                try {
                    CharacterTrait newTrait = newPolicy.getTrait();
                    applyTraitAsDelta(saved.getId(), newTrait, +1);
                    log.info("새 정책 효과 적용 완료");
                } catch (Exception e) {
                    log.error("새 정책 효과 적용 중 오류 발생", e);
                    throw e; // 예외를 다시 던져서 트랜잭션 롤백 유발
                }
            }

            log.info("=== Policy 업데이트 시작 ===");

            // 3) 정책 업데이트 및 저장
            log.info("정책 업데이트 전 - saved.policy: {}", saved.getPolicy());
            saved.updatePolicy(newPolicy);
            log.info("정책 업데이트 후 - saved.policy: {}", saved.getPolicy());

            Saved savedEntity = savedRepository.save(saved);
            log.info("저장 완료 - 저장된 policy: {}", savedEntity.getPolicy());

            log.info("=== changePolicy 완료 ===");

        } catch (Exception e) {
            log.error("changePolicy 실행 중 예외 발생 - 트랜잭션 롤백됨", e);
            throw e; // 예외를 다시 던져서 호출자에게 알림
        }
    }

    private Policy parsePolicyNullable(String raw) {
        log.info("parsePolicyNullable - input: {}", raw);
        if (raw == null || raw.isBlank()) return null;
        try {
            Policy policy = Policy.valueOf(raw.trim().toUpperCase(Locale.ROOT));
            log.info("파싱 완료 - policy: {}", policy);
            return policy;
        } catch (IllegalArgumentException e) {
            log.error("정책 파싱 실패 - raw: {}, error: {}", raw, e.getMessage());
            throw new CustomException(ErrorCode.POLICY_NOT_FOUND);
        }
    }

    private void applyTraitAsDelta(Long savedId, CharacterTrait trait, int sign) {
        log.info("applyTraitAsDelta - savedId: {}, sign: {}", savedId, sign);

        // Stat(상태 지표) 델타 적용
        for (Map.Entry<StatType, Double> e : trait.statMultipliers().entrySet()) {
            int delta100 = toDelta100(e.getValue()) * sign;
            if (delta100 != 0) {
                log.info("StatType 업데이트 - type: {}, delta: {}", e.getKey().name(), delta100);
                try {
                    boolean exists = statDeltaRepository.existsBySaved_IdAndStatName(savedId, e.getKey().name());
                    if (!exists) {
                        createDefaultStatDelta(savedId, e.getKey().name(), delta100);
                    } else {
                        statDeltaRepository.incrementMagnification(savedId, e.getKey().name(), delta100);
                    }
                    log.info("StatType 업데이트 성공");
                } catch (Exception ex) {
                    log.error("StatType 업데이트 실패", ex);
                }
            }
        }

        // Event(이벤트 확률) 델타 적용 - EventOverrides 사용
        for (Map.Entry<Event, Double> e : trait.eventMultipliers().entrySet()) {
            int delta100 = toDelta100(e.getValue()) * sign;
            if (delta100 != 0) {
                log.info("EventOverride 업데이트 - event: {}, delta: {}", e.getKey().name(), delta100);
                try {
                    boolean exists = eventOverrideRepository.existsBySaved_IdAndEventTitle(savedId, e.getKey().name());
                    if (!exists) {
                        createDefaultEventOverride(savedId, e.getKey().name(), delta100);
                    } else {
                        eventOverrideRepository.incrementOverrideWeight(savedId, e.getKey().name(), delta100);
                    }
                    log.info("EventOverride 업데이트 성공");
                } catch (Exception ex) {
                    log.error("EventOverride 업데이트 실패", ex);
                }
            }
        }

        // Reward(보상/비용) 델타 적용
        for (Map.Entry<RewardType, Double> e : trait.rewardMultipliers().entrySet()) {
            int delta100 = toDelta100(e.getValue()) * sign;
            if (delta100 != 0) {
                log.info("RewardType 업데이트 - type: {}, delta: {}", e.getKey().name(), delta100);
                try {
                    boolean exists = rewardDeltaRepository.existsBySaved_IdAndStatName(savedId, e.getKey().name());
                    if (!exists) {
                        createDefaultRewardDelta(savedId, e.getKey().name(), delta100);
                    } else {
                        rewardDeltaRepository.incrementMagnification(savedId, e.getKey().name(), delta100);
                    }
                    log.info("RewardType 업데이트 성공");
                } catch (Exception ex) {
                    log.error("RewardType 업데이트 실패", ex);
                }
            }
        }
    }

    private void createDefaultStatDelta(Long savedId, String statName, int delta100) {
        Saved saved = savedRepository.getReferenceById(savedId);
        StatDelta newStatDelta = StatDelta.builder()
                .saved(saved)
                .statName(statName)
                .delta(100 + delta100)
                .build();
        statDeltaRepository.save(newStatDelta);
        log.info("기본 StatDelta 생성완료: statName={}, delta={}", statName, 100 + delta100);
    }

    private void createDefaultEventOverride(Long savedId, String eventTitle, int delta100) {
        Saved saved = savedRepository.getReferenceById(savedId);
        EventOverrides newEventOverride = new EventOverrides(saved, eventTitle, 100 + delta100);
        eventOverrideRepository.save(newEventOverride);
        log.info("기본 EventOverride 생성완료: eventTitle={}, overrideWeight={}", eventTitle, 100 + delta100);
    }

    private void createDefaultRewardDelta(Long savedId, String rewardType, int delta100) {
        Saved saved = savedRepository.getReferenceById(savedId);
        RewardDelta newRewardDelta = RewardDelta.builder()
                .saved(saved)
                .statName(rewardType)
                .delta(100 + delta100)
                .build();
        rewardDeltaRepository.save(newRewardDelta);
        log.info("기본 RewardDelta 생성완료: rewardType={}, delta={}", rewardType, 100 + delta100);
    }

    private int toDelta100(double multiplier) {
        int result = (int) Math.round((multiplier - 1.0) * 100.0);
        log.debug("multiplier: {} -> delta100: {}", multiplier, result);
        return result;
    }
}