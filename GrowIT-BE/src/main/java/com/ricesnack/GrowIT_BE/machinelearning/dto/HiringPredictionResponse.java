package com.ricesnack.GrowIT_BE.machinelearning.dto;

import com.ricesnack.GrowIT_BE.saved.domain.Hire;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record HiringPredictionResponse(
        Integer probability,
        Integer productivity,
        Integer totalProductivity,
        BigDecimal spentCapital,
        BigDecimal totalCapital,
        List<Long> hireIds
) {
}
