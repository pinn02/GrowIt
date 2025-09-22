package com.ricesnack.GrowIT_BE.machinelearning.dto;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.List;

public record PredictionRequestDto(
        Long savedId,
        int turn,
        ModelType modelType,
        @Nullable
        List<Long> hireIds,
        @Nullable
        List<String> marketingType,
        @Nullable
        List<String> projectType
) {}
