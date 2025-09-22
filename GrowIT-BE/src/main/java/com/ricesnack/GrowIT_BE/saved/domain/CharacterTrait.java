package com.ricesnack.GrowIT_BE.saved.domain;

import java.util.Collections;
import java.util.EnumMap;
import java.util.Map;

public class CharacterTrait {
    private final EnumMap<RewardType, Double> statMultipliers;
    private final EnumMap<Event, Double> eventMultipliers;

    private CharacterTrait(EnumMap<RewardType, Double> statMultipliers,
                           EnumMap<Event, Double> eventMultipliers) {
        this.statMultipliers = statMultipliers;
        this.eventMultipliers = eventMultipliers;
    }

    public static Builder builder() { return new Builder(); }

    public Map<RewardType, Double> statMultipliers() {
        return Collections.unmodifiableMap(statMultipliers);
    }

    public Map<Event, Double> eventChanceMultipliers() {
        return Collections.unmodifiableMap(eventMultipliers);
    }

    public double getStatOrDefault(RewardType type, double defaultValue) {
        Double v = statMultipliers.get(type);
        return (v == null) ? defaultValue : v;
    }

    public static class Builder {
        private final EnumMap<RewardType, Double> stats = new EnumMap<>(RewardType.class);
        private final EnumMap<Event, Double> events = new EnumMap<>(Event.class);

        // 배수는 모두 곱셈 기준. 1.0이 기본(저장 생략 권장)
        public Builder stat(RewardType type, double multiplier) {
            if (multiplier != 1.0) stats.put(type, multiplier);
            return this;
        }
        public Builder event(Event type, double multiplier) {
            if (multiplier != 1.0) events.put(type, multiplier);
            return this;
        }

        public CharacterTrait build() {
            return new CharacterTrait(new EnumMap<>(stats), new EnumMap<>(events));
        }
    }
}
