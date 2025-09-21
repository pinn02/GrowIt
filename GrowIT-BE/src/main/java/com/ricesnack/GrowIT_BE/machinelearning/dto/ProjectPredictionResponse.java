package com.ricesnack.GrowIT_BE.machinelearning.dto;

public record ProjectPredictionResponse(
        Integer probability,
        Integer enterpriseValue,
        Integer spentCapital,
        Integer earnedCapital,
        Integer totalCapital
) {
}
