package com.ricesnack.GrowIT_BE.machinelearning.dto;

public record MarketingPredictionResponse(
        Integer probability,
        Integer enterpriseValue,
        Integer totalEnterpriseValue,
        Integer spentCapital,
        Integer totalCapital
) {
}
