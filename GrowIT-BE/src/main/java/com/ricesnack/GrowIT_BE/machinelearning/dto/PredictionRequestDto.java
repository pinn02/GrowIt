package com.ricesnack.GrowIT_BE.machinelearning.dto;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;

import java.util.List;

public record PredictionRequestDto(
        int turn,
        ModelType modelType,
        List<Integer> hire
) {
}
