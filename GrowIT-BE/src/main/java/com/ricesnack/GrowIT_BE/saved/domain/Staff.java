package com.ricesnack.GrowIT_BE.saved.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer productivity;

    public Staff(String name, Integer productivity) {
        this.name = name;
        this.productivity = productivity;
    }
}
