package com.ricesnack.GrowIT_BE.machinelearning.dto;

public record InvestmentPredictionResponse(
    Integer probability,
    Integer spentCapital,
    Integer totalCapital
) {
}
