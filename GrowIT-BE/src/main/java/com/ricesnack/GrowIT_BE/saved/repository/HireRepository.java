package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.Hire;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface HireRepository extends JpaRepository<Hire, Long> {

    void deleteBySavedAndStaffIdIn(Saved saved, List<Long> staffIds);

    long countBySaved(Saved saved);
}
