package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;

@Getter
public enum EventSubCategory {
    WORK_POLICY(EventCategory.EMPLOYMENT),
    STAFF_CHANGE(EventCategory.EMPLOYMENT),

    VIRAL_PR(EventCategory.MARKETING),
    BRAND(EventCategory.MARKETING),
    RISK(EventCategory.MARKETING),

    CAPITAL(EventCategory.INVESTMENT),
    RISK_INVEST(EventCategory.INVESTMENT),
    FIN_RISK(EventCategory.INVESTMENT),

    TECH_RND(EventCategory.PROJECT),
    SECURITY(EventCategory.PROJECT);

    private final EventCategory category;

    EventSubCategory(EventCategory category) {
        this.category = category;
    }

}
