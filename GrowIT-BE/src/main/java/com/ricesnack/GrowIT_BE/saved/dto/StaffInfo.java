package com.ricesnack.GrowIT_BE.saved.dto;

import com.ricesnack.GrowIT_BE.saved.domain.Hire;

public record StaffInfo(
        Long id,
        Integer productivity
) {
    public static StaffInfo from(Hire hire) {
        return new StaffInfo(hire.getStaff().getId(), hire.getStaff().getProductivity());
    }
}
