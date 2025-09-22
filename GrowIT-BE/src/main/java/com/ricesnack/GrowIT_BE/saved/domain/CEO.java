package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.Locale;

@Getter
public enum CEO {

    STEVE_JOBS("스티브 잡스",
            CharacterTrait.builder()
                    .stat(RewardType.MARKETING_TV_REWARD, 1.2)
                    .stat(RewardType.MARKETING_SNS_REWARD, 1.2)
                    .stat(RewardType.MARKETING_NEWSPAPER_REWARD, 1.2)
                    .stat(RewardType.PUBLIC_PROJECT_REWARD, 1.2)
                    .stat(RewardType.INTERNAL_PROJECT_REWARD, 1.2)
                    .stat(RewardType.GLOBAL_PROJECT_REWARD, 1.2)
                    .event(Event.UNION_STRIKE, 2.0)
                    .build()),
    BILL_GATES("빌 게이츠",
            CharacterTrait.builder()
                    .stat(RewardType.INVEST_RND_REWARD, 1.3)
                    .event(Event.PATENT, 2.0)
                    .event(Event.RISK_INVEST_FAIL, 2.5)
                    .build()),
    ELON_MUSK("일론 머스크",
            CharacterTrait.builder()
                    .stat(RewardType.HIRE_COST, 1.5)
                    .event(Event.UNION_STRIKE, 2.0)
                    .event(Event.RISK_INVEST_FAIL, 1.5)
                    .build()),
    MARK_ZUCKERBERG("마크 주커버그",
            CharacterTrait.builder()
                    .stat(RewardType.HIRE_COST, 1.2)
                    .stat(RewardType.MARKETING_TV_REWARD, 1.3)
                    .stat(RewardType.MARKETING_SNS_REWARD, 1.3)
                    .stat(RewardType.MARKETING_NEWSPAPER_REWARD, 1.3)
                    .build()),
    DONALD_TRUMP("도날드 트럼프",
            CharacterTrait.builder()
                    .stat(RewardType.INITIAL_CAPITAL, 2.0)
                    .stat(RewardType.MARKETING_TV_REWARD, 1.3)
                    .stat(RewardType.MARKETING_SNS_REWARD, 1.3)
                    .stat(RewardType.MARKETING_NEWSPAPER_REWARD, 1.3)
                    .event(Event.SNS_CHALLENGE, 3.0)
                    .build()),
    JENSEN_HUANG("젠슨 황",
            CharacterTrait.builder()
                    .stat(RewardType.INVEST_RND_REWARD, 1.5)
                    .event(Event.TECH_ANNOUNCEMENT, 2.0)
                    .build()),
    JEFF_BEZOS("제프 베이조스",
            CharacterTrait.builder()
                    .stat(RewardType.GLOBAL_PROJECT_REWARD, 1.5)
                    .stat(RewardType.MARKETING_COST, 0.8)
                    .build());

    private final String name;
    private final CharacterTrait trait;

    CEO(String name, CharacterTrait trait) {
        this.name = name;
        this.trait = trait;
    }

    public static CEO from(String input) {
        if (input == null) throw new IllegalArgumentException("CEO 입력이 비었습니다.");
        String key = normalizeKey(input);
        for (CEO c : values()) {
            if (normalizeKey(c.name()).equals(key)) return c;
        }
        throw new IllegalArgumentException("알 수 없는 CEO: " + input);
    }

    private static String normalizeKey(String s) {
        return Normalizer.normalize(s, Normalizer.Form.NFKC)
                .replaceAll("[()\\[\\]{}]", "")
                .replaceAll("\\s+", "")
                .toLowerCase(Locale.ROOT);
    }

    public BigDecimal applyInitialCapital(BigDecimal base) {
        double m = trait.getStatOrDefault(RewardType.INITIAL_CAPITAL, 1.0);
        return base.multiply(BigDecimal.valueOf(m));
    }
}
