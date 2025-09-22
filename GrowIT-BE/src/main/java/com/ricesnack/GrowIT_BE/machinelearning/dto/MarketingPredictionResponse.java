package com.ricesnack.GrowIT_BE.machinelearning.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record MarketingPredictionResponse(
        Integer probability,
        BigDecimal enterpriseValue,
        BigDecimal totalEnterpriseValue,
        BigDecimal spentCapital,
        BigDecimal totalCapital
) {
}
