package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;

@Getter
public enum Policy {
    // 1. 포괄임금제 → 생산성 1.3배, 이벤트 [핵심인력 이탈, 노조 파업] 확률 증가
    COMPREHENSIVE_WAGE_SYSTEM(
            "포괄임금제",
            CharacterTrait.builder()
                    .stat(StatType.PRODUCTIVITY, 1.3)
                    .event(Event.KEY_TALENT_LOSS, 1.2)  // 20% 증가 예시
                    .event(Event.UNION_STRIKE, 1.2)
                    .build()
    ),

    // 2. 공격적 인수 합병 → 기업 가치 1.2배, 이벤트 [기업간 집단 소송] 확률 증가
    AGGRESSIVE_MNA(
            "공격적 인수 합병",
            CharacterTrait.builder()
                    .stat(StatType.COMPANY_VALUE, 1.2)
                    .event(Event.CLASS_ACTION, 1.5)
                    .build()
    ),

    // 3. 문어발식 투자 → 투자 비용 1.3배, 투자 생산성 1.2배, 이벤트 [리스크 투자] 확률 2배
    DIVERSIFIED_INVEST(
            "문어발식 투자",
            CharacterTrait.builder()
                    .reward(RewardType.INVEST_COST, 1.3)
                    .reward(RewardType.INVEST_FACILITY_REWARD, 1.2)
                    .reward(RewardType.INVEST_RND_REWARD, 1.2)
                    .event(Event.RISK_INVEST_SUCCESS, 2.0)
                    .event(Event.RISK_INVEST_FAIL, 2.0)
                    .build()
    ),

    // 4. 프리미엄 브랜드 전략 → 마케팅 비용 1.2배, 기업가치 1.1배
    PREMIUM_BRAND_STRATEGY(
            "프리미엄 브랜드 전략",
            CharacterTrait.builder()
                    .stat(StatType.COMPANY_VALUE, 1.1)
                    .reward(RewardType.MARKETING_COST, 1.2)
                    .build()
    ),

    // 5. 산업 스파이 운영 → R&D 생산성 1.5배, 기업간 집단 소송 확률 2배
    INDUSTRIAL_SPY(
            "산업 스파이 운영",
            CharacterTrait.builder()
                    .reward(RewardType.INVEST_RND_REWARD, 1.5)
                    .event(Event.CLASS_ACTION, 2.0)
                    .build()
    );

    private final String name;
    private final CharacterTrait trait;

    Policy(String name, CharacterTrait trait) {
        this.name = name;
        this.trait = trait;
    }
}
