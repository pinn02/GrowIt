package com.ricesnack.GrowIT_BE.machinelearning.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record InvestmentPredictionResponse(
    Integer probability,
    Integer productivity,
    Integer totalProductivity,
    BigDecimal spentCapital,
    BigDecimal totalCapital
) {
}
