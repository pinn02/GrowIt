package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;

import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

public interface PredictionResultProcessor {
    Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto);

    default Map.Entry<Long, Float> selectTierBasedOnProbabilities(Map<Long, Float> probabilities) {
        if (probabilities == null || probabilities.isEmpty()) {
            throw new IllegalArgumentException("Probabilities map cannot be empty.");
        }

        double totalWeight = probabilities.values(). stream().mapToDouble(Float::doubleValue).sum();
        if (totalWeight <= 0) {
            return probabilities.entrySet().stream().findFirst().orElseThrow();
        }
        double randomValue = ThreadLocalRandom.current().nextDouble() * totalWeight;

        for (Map.Entry<Long, Float> entry : probabilities.entrySet()) {
            randomValue -= entry.getValue();
            if (randomValue <= 0) {
                return entry;
            }
        }
        return probabilities.entrySet().stream().findFirst().orElseThrow();
    }

    default int getRandomValueInRange(int min, int max) {
        if (min >= max) {
            return min;
        }
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }

    default String mapLabelToTier(long label) {
        return switch ((int) label) {
            case 0 -> "A";
            case 1 -> "B";
            case 2 -> "C";
            case 3 -> "S";
            default -> "Unknown";
        };
    }
}
