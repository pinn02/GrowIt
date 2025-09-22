package com.ricesnack.GrowIT_BE.saved.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EventWeight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventWeightId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saved_id", nullable = false)
    private Saved saved;

    @Column(nullable = false, length = 30)
    private String category;

    @Column(nullable = false)
    private Integer delta = 100;

    @Builder
    public EventWeight(Saved saved, String category, Integer delta) {
        this.saved = saved;
        this.category = category;
        this.delta = delta;
    }
}
