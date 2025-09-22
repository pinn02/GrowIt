package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import com.ricesnack.GrowIT_BE.saved.domain.StatDelta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatDeltaRepository extends JpaRepository<StatDelta, Long> {
    List<StatDelta> findBySaved(Saved saved);
    void deleteBySaved(Saved saved);
}
