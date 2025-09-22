package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;

@Getter
public enum StatType {
    COMPANY_VALUE(100),          // 기업 가치
    PRODUCTIVITY(100),           // 생산성
    EMPLOYEE_COUNT(100),         // 직원 수
    MONTHLY_SALARY_EXPENSE(100), // 월급 지출
    ACCUMULATED_COMPANY_VALUE(100); // 누적 기업 가치

    private final int defaultValue;

    StatType(int defaultValue) {
        this.defaultValue = defaultValue;
    }
}