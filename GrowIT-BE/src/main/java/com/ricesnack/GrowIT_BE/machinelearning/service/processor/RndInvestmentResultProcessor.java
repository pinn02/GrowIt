package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.InvestmentPredictionResponse;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;

import java.util.Map;

public class RndInvestmentResultProcessor implements PredictionResultProcessor {

    private static final Integer BASE_COST = 150;
    private static final Integer COMPANY_VALUE_WEIGHT = 0.05;

    @Override
    public Object process(Map<Long, Float> probabilties, PredictionRequestDto requestDto) {
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilties);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        int gainedProductivity = switch (tier) {
            case "S" -> getRandomValueInRange(25, 35);
            case "A" -> getRandomValueInRange(15, 25);
            case "B" -> getRandomValueInRange(5, 15);
            default -> getRandomValueInRange(3, 10);
        };

//        Integer enterpriseValue = saved.findBy()
//        Integer spentCapital = BASE_COST + enterpriseValue * COMPANY_VALUE_WEIGHT;
//        Integer capital = saved.findBy();
//        Integer totalCapital = capital - spentCapital;
//        Integer productivity = saved.fnidBy();
//        Integer totalProductivity = productivity + gainedProductivity;


//        return new InvestmentPredictionResponse(
//                (int) (probability * 100),
//                gainedProductivity,
//                totalproductivity,
//                spentCapital,
//                totalCapital
//        );
    }
}
