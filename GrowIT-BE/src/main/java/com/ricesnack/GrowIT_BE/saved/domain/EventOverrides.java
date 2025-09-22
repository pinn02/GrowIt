package com.ricesnack.GrowIT_BE.saved.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EventOverrides {
    @Id
    @GeneratedValue
    private Long eventOverrideId;

    @ManyToOne
    @JoinColumn(name = "saved_id")
    private Saved saved;

    private String eventTitle;
    private Integer overrideWeight;

    public EventOverrides(Saved saved, String eventTitle, Integer overrideWeight) {
        this.saved = saved;
        this.eventTitle = eventTitle;
        this.overrideWeight = overrideWeight;
    }
}