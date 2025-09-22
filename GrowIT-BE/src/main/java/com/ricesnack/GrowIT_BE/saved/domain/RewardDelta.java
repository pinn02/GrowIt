package com.ricesnack.GrowIT_BE.saved.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RewardDelta {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statDeltaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saved_id", nullable = false)
    private Saved saved;

    @Column(name = "stat_name", nullable = false, length = 30)
    private String statName;

    @Column(nullable = false)
    private Integer delta = 100;

    @Builder
    public RewardDelta(Saved saved, String statName, Integer delta) {
        this.saved = saved;
        this.statName = statName;
        this.delta = delta;
    }
}
