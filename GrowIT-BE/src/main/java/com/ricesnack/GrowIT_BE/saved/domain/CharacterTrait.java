package com.ricesnack.GrowIT_BE.saved.domain;

import java.util.Collections;
import java.util.EnumMap;
import java.util.Map;

public class CharacterTrait {
    private final EnumMap<RewardType, Double> rewardMultipliers;
    private final EnumMap<StatType, Double> statMultipliers;
    private final EnumMap<Event, Double> eventMultipliers;

    private CharacterTrait(EnumMap<RewardType, Double> rewardMultipliers,
                           EnumMap<StatType, Double> statMultipliers,
                           EnumMap<Event, Double> eventMultipliers) {
        this.rewardMultipliers = rewardMultipliers;
        this.statMultipliers = statMultipliers;
        this.eventMultipliers = eventMultipliers;
    }

    public static Builder builder() { return new Builder(); }

    // ===== Getter Methods =====
    public Map<RewardType, Double> rewardMultipliers() {
        return Collections.unmodifiableMap(rewardMultipliers);
    }

    public Map<StatType, Double> statMultipliers() {
        return Collections.unmodifiableMap(statMultipliers);
    }

    public Map<Event, Double> eventMultipliers() {
        return Collections.unmodifiableMap(eventMultipliers);
    }

    // ===== Default Fallback Accessors =====
    public double getRewardOrDefault(RewardType type, double defaultValue) {
        return rewardMultipliers.getOrDefault(type, defaultValue);
    }

    public double getStatOrDefault(StatType type, double defaultValue) {
        return statMultipliers.getOrDefault(type, defaultValue);
    }

    public double getEventOrDefault(Event type, double defaultValue) {
        return eventMultipliers.getOrDefault(type, defaultValue);
    }

    // ===== Builder =====
    public static class Builder {
        private final EnumMap<RewardType, Double> rewards = new EnumMap<>(RewardType.class);
        private final EnumMap<StatType, Double> stats = new EnumMap<>(StatType.class);
        private final EnumMap<Event, Double> events = new EnumMap<>(Event.class);

        public Builder reward(RewardType type, double multiplier) {
            if (multiplier != 1.0) rewards.put(type, multiplier);
            return this;
        }

        public Builder stat(StatType type, double multiplier) {
            if (multiplier != 1.0) stats.put(type, multiplier);
            return this;
        }

        public Builder event(Event type, double multiplier) {
            if (multiplier != 1.0) events.put(type, multiplier);
            return this;
        }

        public CharacterTrait build() {
            return new CharacterTrait(
                    new EnumMap<>(rewards),
                    new EnumMap<>(stats),
                    new EnumMap<>(events)
            );
        }
    }
}
