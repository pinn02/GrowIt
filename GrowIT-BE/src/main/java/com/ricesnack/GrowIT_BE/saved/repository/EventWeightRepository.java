package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.EventWeight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventWeightRepository extends JpaRepository<EventWeight, Long> {
    List<EventWeight> findBySaved_Id(Long savedId);
    void deleteBySaved_Id(Long savedId);
}
