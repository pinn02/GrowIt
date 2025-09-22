package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.MarketingPredictionResponse;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;

@Component
public class MarketingResultProcessor implements PredictionResultProcessor {

    private static final double COMPANY_VALUE_WEIGHT = 0.05;
    private static final Map<String, Integer> BASE_COSTS = Map.of(
            "NEWS", 30,
            "SNS", 60,
            "TV", 100
    );

    @Override
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        int productivity = switch (tier) {
            case "S" -> getRandomValueInRange(15, 20);
            case "A" -> getRandomValueInRange(10, 15);
            case "B" -> getRandomValueInRange(5, 10);
            default -> getRandomValueInRange(1, 5);
        };

        if (requestDto.marketingType() == null || requestDto.marketingType().isEmpty()) {
            throw new IllegalArgumentException("마케팅 타입을 지정해야 합니다.");
        }
        String marketingType = requestDto.marketingType().get(0);
        Integer baseCost = BASE_COSTS.getOrDefault(marketingType, 0);
//        Integer enterpriseValue = savedRepository().findBygameId();
//        Integer spentCapital  = baseCost + enterpriseValue * COMPANY_VALUE_WEIGHT;

//        Integer capital = savedRepository.save()
//        Integer finalEnterpriseValue = savedRepository.save()

//        return new MarketingPredictionResponse(
//                (int) (probability * 100),
//                enterpriseValue,
//                finalEnterpriseVAlue,
//                capital,
//                finalCapital
//        );
    }

}
