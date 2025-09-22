package com.ricesnack.GrowIT_BE.saved.dto;

import java.math.BigDecimal;
import java.util.List;

public record GameCreateRequest(
        String companyName,
        String CEOName
) {
}