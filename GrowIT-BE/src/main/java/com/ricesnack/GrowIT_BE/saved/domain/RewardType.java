package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;

@Getter
public enum RewardType {
    HIRE_REWARD(100),

    MARKETING_TV_REWARD(100),
    MARKETING_SNS_REWARD(100),
    MARKETING_NEWSPAPER_REWARD(100),

    INVEST_FACILITY_REWARD(100),
    INVEST_RND_REWARD(100),

    PUBLIC_PROJECT_REWARD(100),
    INTERNAL_PROJECT_REWARD(100),
    GLOBAL_PROJECT_REWARD(100),

    INITIAL_CAPITAL(100),

    HIRE_COST(100),
    MARKETING_COST(100),
    INVEST_COST(100),
    PROJECT_COST(100);

    private final int magnification;

    RewardType(int magnification) {
        this.magnification = magnification;
    }
}
