package com.ricesnack.GrowIT_BE.machinelearning.dto;

import com.ricesnack.GrowIT_BE.saved.domain.Hire;

import java.util.List;

public record HiringPredictionResponse(
        Integer probability,
        Integer productivity,
        Integer totalProductivity,
        Integer spentCapital,
        Integer totalCapital,
        List<Integer> hireIds
) {
}
