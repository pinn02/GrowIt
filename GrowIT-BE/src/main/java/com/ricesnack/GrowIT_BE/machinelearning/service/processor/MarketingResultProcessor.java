package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.MarketingPredictionResponse;
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
public class MarketingResultProcessor implements PredictionResultProcessor {

    private final SavedRepository savedRepository;

    // double 대신 BigDecimal로 선언하여 정밀도 보장
    private static final BigDecimal COMPANY_VALUE_WEIGHT = new BigDecimal("0.05");
    private static final Map<String, BigDecimal> BASE_COSTS = Map.of(
            "NEWS", new BigDecimal("30"),
            "SNS", new BigDecimal("60"),
            "TV", new BigDecimal("100")
    );

    @Override
    @Transactional
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        // 1. DB에서 현재 게임 상태 조회
        Saved saved = savedRepository.findById(requestDto.savedId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 세이브 파일을 찾을 수 없습니다."));

        // 2. 머신러닝 결과로 얻게 될 '기업 가치' 계산
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        // 마케팅은 생산성보다 기업 가치를 올리는 것으로 로직 변경
        int gainedCompanyValueAmount = switch (tier) {
            case "S" -> getRandomValueInRange(15, 20);
            case "A" -> getRandomValueInRange(10, 15);
            case "B" -> getRandomValueInRange(5, 10);
            default -> getRandomValueInRange(1, 5);
        };
        BigDecimal gainedCompanyValue = new BigDecimal(gainedCompanyValueAmount);

        // 3. 마케팅 비용 계산
        if (requestDto.marketingType() == null || requestDto.marketingType().isEmpty()) {
            throw new IllegalArgumentException("마케팅 타입을 지정해야 합니다.");
        }
        String marketingType = requestDto.marketingType().get(0).toUpperCase();
        BigDecimal baseCost = BASE_COSTS.getOrDefault(marketingType, BigDecimal.ZERO);

        BigDecimal companyValueComponent = saved.getCompanyValue().multiply(COMPANY_VALUE_WEIGHT);
        BigDecimal spentCapital = baseCost.add(companyValueComponent).setScale(0, RoundingMode.HALF_UP);

        // 4. 자본 확인
        if (saved.getCapital().compareTo(spentCapital) < 0) {
            throw new IllegalStateException("자본이 부족하여 마케팅을 진행할 수 없습니다.");
        }

        // 5. Saved 엔티티의 새 메서드를 호출하여 상태 업데이트 (턴 증가 없음)
        saved.updateValueAndCapital(spentCapital, gainedCompanyValue);

        // 6. 결과 DTO를 생성하여 반환
        return MarketingPredictionResponse.builder()
                .probability((int) (probability * 100))
                .enterpriseValue(gainedCompanyValue)
                .totalEnterpriseValue(saved.getCompanyValue())
                .spentCapital(spentCapital)
                .totalCapital(saved.getCapital())
                .build();
    }


}