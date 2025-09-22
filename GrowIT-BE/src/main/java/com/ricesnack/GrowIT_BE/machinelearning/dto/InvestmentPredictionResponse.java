package com.ricesnack.GrowIT_BE.machinelearning.dto;

public record InvestmentPredictionResponse(
    Integer probability,
    Integer productivity,
    Integer totalProductivity,
    Integer spentCapital,
    Integer totalCapital
) {
}
