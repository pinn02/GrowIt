package com.ricesnack.GrowIT_BE.saved.dto;

import java.math.BigDecimal;
import java.util.List;

public record GameCreateRequest(
        String companyName,

        BigDecimal money,

        BigDecimal value,

        Integer turn,

        Integer productivity,

        List<HireRequest> hire,
        List<ProjectRequest> project
) {
}