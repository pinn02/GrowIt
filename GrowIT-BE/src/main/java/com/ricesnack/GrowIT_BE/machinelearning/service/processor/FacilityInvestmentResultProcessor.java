package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;

import java.util.Map;

public class FacilityInvestmentResultProcessor implements PredictionResultProcessor {

    private static final Integer BASE_COST = 50;
    private static final Integer COMPANY_VALUE_WEIGHT = 0.05;

    @Override
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        int gainedProductivity = switch (tier) {
            case "S" -> getRandomValueInRange(18, 25);
            case "A" -> getRandomValueInRange(14, 20);
            case "B" -> getRandomValueInRange(10, 15);
            default -> getRandomValueInRange(5, 10);
        };
//        enterpriseValue = savedRepository.findbyId

//        Integer spentCapital = BASE_COST + enterpriseValue * COMPANY_VALUE_WEIGHT
//        Integer capital = saved.findById()
        if (capital < spentCapital) {
            throw new IllegalArgumentException("자본이 부족하여 시설 투자를 진행할 수 없습니다");
        }

//        productivity = saved.findBy()
//        int totalProductivity = productivity + gainedProductivity;
//        Integer totalCapital = capital - spentCapital;

//        return new InvestmentPredictionResponse(
//                (int) (probality * 100),
//                gainedProductivity,
//                totalProductivity
//                spentCapital,
//                totalCapital,
//        )


}
