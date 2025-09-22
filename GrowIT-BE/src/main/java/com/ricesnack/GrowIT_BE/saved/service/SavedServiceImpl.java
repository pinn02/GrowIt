package com.ricesnack.GrowIT_BE.saved.service;

import com.ricesnack.GrowIT_BE.error.CustomException;
import com.ricesnack.GrowIT_BE.error.ErrorCode;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.saved.domain.CEO;
import com.ricesnack.GrowIT_BE.saved.domain.EventWeight;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import com.ricesnack.GrowIT_BE.saved.domain.StatDelta;
import com.ricesnack.GrowIT_BE.saved.dto.GameCreateRequest;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;
import com.ricesnack.GrowIT_BE.saved.repository.EventOverrideRepository;
import com.ricesnack.GrowIT_BE.saved.repository.EventWeightRepository;
import com.ricesnack.GrowIT_BE.saved.repository.SavedRepository;
import com.ricesnack.GrowIT_BE.saved.repository.StatDeltaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SavedServiceImpl implements SavedService {

    private final SavedRepository savedRepository;
    private final StatDeltaRepository statDeltaRepository;
    private final EventWeightRepository eventWeightRepository;
    private final EventOverrideRepository eventOverrideRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SavedResponse> findRecentSaves(Long memberId) {

            Pageable pageRequest = PageRequest.of(0, 3, Sort.by(Sort.Direction.DESC, "saveDate"));
            Page<Saved> savedPage = savedRepository.findByMember_MemberId(memberId, pageRequest); // findByMember_MemberId 사용

            return savedPage.getContent().stream()
                    .map(SavedResponse::from)
                    .toList();
    }


    @Transactional
    public void deleteSavedById(Long saveId, Long memberId) {

        Saved saved = savedRepository.findByIdWithDetailsAndMemberId(saveId, memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.SAVE_NOT_FOUND_OR_NO_PERMISSION));

        savedRepository.delete(saved);
    }

    @Override
    @Transactional
    public void createNewSave(GameCreateRequest gameCreateRequest, Member member) {

        // 1) CEO 파싱
        CEO ceo = CEO.from(gameCreateRequest.CEOName());

        // 2) Saved 생성 및 저장
        Saved saved = savedRepository.save(Saved.builder()
                .member(member)
                .companyName(gameCreateRequest.companyName())
                .ceo(ceo)
                .currentTurn(1)
                .capital(ceo.applyInitialCapital(BigDecimal.valueOf(1000)))
                .companyValue(BigDecimal.ZERO)
                .productivity(0)
                .employeeCount(0)
                .monthlySalaryExpense(BigDecimal.ZERO)
                .accumulatedCompanyValue(BigDecimal.ZERO)
                .build());

        // 3) 스탯 배율 저장
        ceo.getTrait().statMultipliers().forEach((rewardType, mul) -> {
            int delta = toPercentInt(mul);
            statDeltaRepository.save(StatDelta.builder()
                    .saved(saved)
                    .statName(rewardType.name())
                    .delta(delta)
                    .build());
        });

        // 4) 이벤트 "서브 카테고리" 배율 저장
        Map<String, Double> subCategoryMul = new java.util.HashMap<>();

        ceo.getTrait().eventChanceMultipliers().forEach((event, mul) -> {
            String subCategory = event.getSubCategory().name();   // ★ 여기!
            subCategoryMul.merge(subCategory, mul, (a, b) -> a * b);
        });

        subCategoryMul.forEach((subCategory, mul) -> {
            int delta = toPercentInt(mul);
            eventWeightRepository.save(
                    EventWeight.builder()
                            .saved(saved)
                            .category(subCategory)
                            .delta(delta)
                            .build()
            );
        });

        // 5) (선택) 특정 이벤트 오버라이드 저장 블록은 필요시 구현
    }

    private static int toPercentInt(double multiplier) {
        return new java.math.BigDecimal(multiplier)
                .multiply(java.math.BigDecimal.valueOf(100))
                .setScale(0, java.math.RoundingMode.HALF_UP)
                .intValueExact();
    }
}
