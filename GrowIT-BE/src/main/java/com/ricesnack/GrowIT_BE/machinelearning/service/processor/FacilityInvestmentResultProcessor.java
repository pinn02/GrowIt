package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.InvestmentPredictionResponse;
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
public class FacilityInvestmentResultProcessor implements PredictionResultProcessor {

    private final SavedRepository savedRepository;

    private static final BigDecimal BASE_COST = new BigDecimal("50");
    private static final BigDecimal COMPANY_VALUE_WEIGHT = new BigDecimal("0.05");

    @Override
    @Transactional
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        // 1. DB에서 현재 게임 상태 조회
        Saved saved = savedRepository.findById(requestDto.savedId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 세이브 파일을 찾을 수 없습니다."));

        // 2. 머신러닝 결과로 얻게 될 생산성 계산
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        int gainedProductivity = switch (tier) {
            case "S" -> getRandomValueInRange(18, 25);
            case "A" -> getRandomValueInRange(14, 20);
            case "B" -> getRandomValueInRange(10, 15);
            default -> getRandomValueInRange(5, 10);
        };

        // 3. 투자 비용 계산
        BigDecimal enterpriseValueComponent = saved.getCompanyValue().multiply(COMPANY_VALUE_WEIGHT);
        BigDecimal spentCapital = BASE_COST.add(enterpriseValueComponent).setScale(0, RoundingMode.HALF_UP);

        // 4. 자본 확인
        if (saved.getCapital().compareTo(spentCapital) < 0) {
            throw new IllegalStateException("자본이 부족하여 시설 투자를 진행할 수 없습니다.");
        }

        // 5. 이벤트 적용 후의 최종 자본 및 생산성 계산
        BigDecimal finalCapital = saved.getCapital().subtract(spentCapital);
        int finalProductivity = saved.getProductivity() + gainedProductivity;

        // 6. Saved 엔티티의 통합 메서드를 호출하여 상태 업데이트 (턴 증가 없음)
        saved.updateStateWithinTurn(finalCapital, finalProductivity);


        // 7. 결과 DTO를 생성하여 반환
        return InvestmentPredictionResponse.builder()
                .probability((int) (probability * 100))
                .productivity(gainedProductivity)
                .totalProductivity(saved.getProductivity())
                .spentCapital(spentCapital)
                .totalCapital(saved.getCapital())
                .build();
    }

}