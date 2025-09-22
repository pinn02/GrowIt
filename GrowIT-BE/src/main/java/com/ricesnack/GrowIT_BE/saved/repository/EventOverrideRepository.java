package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.EventOverrides;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventOverrideRepository extends JpaRepository<EventOverrides, Long> {
    List<EventOverrides> findBySaved_Id(Long savedId);
    void deleteBySaved_Id(Long savedId);
}
