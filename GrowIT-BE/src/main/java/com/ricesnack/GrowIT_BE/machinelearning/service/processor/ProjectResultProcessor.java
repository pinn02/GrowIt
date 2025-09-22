package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;

import java.util.Map;

public class ProjectResultProcessor implements PredictionResultProcessor {
    private static final double COMPANY_VALUE_WEIGHT = 0.05;

    @Override
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());

        if (requestDto.projectType() == null || requestDto.projectType().isEmpty()) {
            throw new IllegalArgumentException("프로젝트 타입을 지정해야 합니다.");
        }

        String projectType = requestDto.projectType().get(0);
//        Integer enterpriseValue = saved.findby()
        Integer baseCost;
        int gainedEnterpriseValue;

        switch (projectType) {
            case "COMPANY":
                baseCost = 100;
                gainedEnterpriseValue = switch (tier) {
                    case "S" -> getRandomValueInRange(8, 12);
                    case "A" -> getRandomValueInRange(5, 10);
                    case "B" -> getRandomValueInRange(3, 7);
                    default -> getRandomValueInRange(1, 5);
                };
                break;
            case "GOVERMENT":
                baseCost = 150;
                gainedEnterpriseValue = switch (tier) {
                    case "S" -> getRandomValueInRange(13, 17);
                    case "A" -> getRandomValueInRange(10, 15);
                    case "B" -> getRandomValueInRange(8, 12);
                    default -> getRandomValueInRange(6, 10);
                };
                break;
            case "GLOBAL":
                baseCost = 200;
                gainedEnterpriseValue = switch (tier) {
                    case "S" -> getRandomValueInRange(18, 22);
                    case "A" -> getRandomValueInRange(15, 20);
                    case "B" -> getRandomValueInRange(12, 16);
                    default -> getRandomValueInRange(10, 14);
                };
                break;
            default:
                throw new IllegalArgumentException("알 수 없는 프로젝트 타입입니다: " + projectType);
        }

//        Integer spentCapital = baseCost + enterpriseValue * COMPANY_VALUE_WEIGHT;
//        savedRepository.save()

//        return null;
    }

}
