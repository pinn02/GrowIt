package com.ricesnack.GrowIT_BE.saved.domain;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
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

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer salary;

    public Staff(String name, Integer productivity, String description, Integer salary) {
        this.name = name;
        this.productivity = productivity;
        this.description = description;
        this.salary = salary;
    }
}
