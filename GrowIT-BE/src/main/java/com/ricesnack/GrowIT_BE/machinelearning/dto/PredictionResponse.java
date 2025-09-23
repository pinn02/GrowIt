package com.ricesnack.GrowIT_BE.machinelearning.dto;

import java.util.Map;

public record PredictionResponse(
        String tier,
        Map<String, Float> probabilities
) {}
