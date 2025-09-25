package com.ricesnack.GrowIT_BE.saved.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "saved_id", nullable = false)
    private Saved saved;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectType projectType;

    @Column(name = "end_turn", nullable = false)
    private Integer endTurn;

    public Project(Saved saved, ProjectType projectType, Integer endTurn) {
        this.saved = saved;
        this.projectType = projectType;
        this.endTurn = endTurn;
    }
}
