package com.ricesnack.GrowIT_BE.saved.domain;

import com.ricesnack.GrowIT_BE.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Saved {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "save_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private Integer currentTurn;

    @Column(nullable = false)
    private BigDecimal capital;

    @Column(nullable = false)
    private BigDecimal companyValue;

    @Column(nullable = false)
    private Integer productivity;

    @Column(nullable = false)
    private Integer employeeCount;

    @Column(nullable = false)
    private BigDecimal monthlySalaryExpense;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime saveDate;

    @Builder.Default
    @OneToMany(mappedBy = "saved", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hire> hires = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "saved", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();

    public void updateInfo(BigDecimal capital, BigDecimal companyValue, Integer productivity) {
        this.capital = capital;
        this.companyValue = companyValue;
        this.productivity = productivity;
        this.currentTurn += 1;
    }

    public void updateEmployeeCount(long count) {
        this.employeeCount = (int) count;
    }

}
