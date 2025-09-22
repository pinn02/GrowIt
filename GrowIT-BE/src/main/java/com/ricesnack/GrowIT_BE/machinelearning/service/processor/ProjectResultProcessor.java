package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import com.ricesnack.GrowIT_BE.saved.repository.SavedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class ProjectResultProcessor implements PredictionResultProcessor {

    private final SavedRepository savedRepository;

    private static final BigDecimal COMPANY_VALUE_WEIGHT = new BigDecimal("0.05");

    @Override
    @Transactional
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        // 1. DB에서 현재 게임 상태 조회
        Saved saved = savedRepository.findById(requestDto.savedId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 세이브 파일을 찾을 수 없습니다."));

        // 2. 프로젝트 타입 확인 및 기본 비용/가치 상승량 설정
        if (requestDto.projectType() == null || requestDto.projectType().isEmpty()) {
            throw new IllegalArgumentException("프로젝트 타입을 지정해야 합니다.");
        }
        String projectType = requestDto.projectType().get(0).toUpperCase();

        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());

        BigDecimal baseCost;
        int gainedCompanyValueAmount;

        switch (projectType) {
            case "COMPANY" -> {
                baseCost = new BigDecimal("100");
                gainedCompanyValueAmount = switch (tier) {
                    case "S" -> getRandomValueInRange(8, 12);
                    case "A" -> getRandomValueInRange(5, 10);
                    case "B" -> getRandomValueInRange(3, 7);
                    default -> getRandomValueInRange(1, 5);
                };
            }
            case "GOVERNMENT" -> {
                baseCost = new BigDecimal("150");
                gainedCompanyValueAmount = switch (tier) {
                    case "S" -> getRandomValueInRange(13, 17);
                    case "A" -> getRandomValueInRange(10, 15);
                    case "B" -> getRandomValueInRange(8, 12);
                    default -> getRandomValueInRange(6, 10);
                };
            }
            case "GLOBAL" -> {
                baseCost = new BigDecimal("200");
                gainedCompanyValueAmount = switch (tier) {
                    case "S" -> getRandomValueInRange(18, 22);
                    case "A" -> getRandomValueInRange(15, 20);
                    case "B" -> getRandomValueInRange(12, 16);
                    default -> getRandomValueInRange(10, 14);
                };
            }
            default -> throw new IllegalArgumentException("알 수 없는 프로젝트 타입입니다: " + projectType);
        }
        BigDecimal gainedCompanyValue = new BigDecimal(gainedCompanyValueAmount);

        // 3. 최종 비용 계산
        BigDecimal companyValueComponent = saved.getCompanyValue().multiply(COMPANY_VALUE_WEIGHT);
        BigDecimal spentCapital = baseCost.add(companyValueComponent).setScale(0, RoundingMode.HALF_UP);

        // 4. 자본 확인
        if (saved.getCapital().compareTo(spentCapital) < 0) {
            throw new IllegalStateException("자본이 부족하여 프로젝트를 진행할 수 없습니다.");
        }

        // 5. Saved 엔티티의 범용 메서드를 호출하여 상태 업데이트 (턴 증가 없음)
        saved.updateValueAndCapital(spentCapital, gainedCompanyValue);


        // 6. 요청대로 별도 DTO 없이, 성공 메시지만 반환
        return Map.of("message", "프로젝트가 성공적으로 반영되었습니다.");
    }

}