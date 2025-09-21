package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.HiringPredictionResponse;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class HiringResultProcessor implements PredictionResultProcessor {

    private static final BigDecimal BASE_HIRING_COST = new BigDecimal("100");
    private static final BigDecimal COMPANY_VALUE_WEIGHT = new BigDecimal("0.005");

    @Override
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        int productivity = switch (tier) {
            case "S" -> getRandomValueInRange(40, 60);
            case "A" -> getRandomValueInRange(20, 30);
            case "B" -> getRandomValueInRange(10, 20);
            default -> getRandomValueInRange(5, 10);
        };

        List<Integer> hireIds = requestDto.hireIds() != null ? requestDto.hireIds() : Collections.<Integer>emptyList();
//        BigDecimal costPerPerson = BASE_HIRING_COST.add(saved.getCompanyValue().multiply(COMPANY_VALUE_WEIGHT));

//        if (saved.getCapital().compareTo(spentCapital) < 0) {
//            throw new IllegalStateException("자본이 부족하여 고용을 진행할 수 없습니다.");
//        }
//
//        BigDecimal finalCapital = saved.getCapital().subtract(spentCapital);
//        int finalProductivity = saved.getProductivity() + gainedProductivity;
//
//        saved.setCapital(finalCapital);
//        saved.setProductivity(finalProductivity);
//
//        List<Integer> hireIds = requestDto.hire() != null ? requestDto.hire() : Collections.emptyList();
//
//        return new HiringPredictionResponse(
//                (int) (probability * 100),
//                gainedProductivity,
//                finalProductivity,
//                spentCapital.intValue(),
//                finalCapital.intValue(),
//                hireIds
//        );



    }
}
