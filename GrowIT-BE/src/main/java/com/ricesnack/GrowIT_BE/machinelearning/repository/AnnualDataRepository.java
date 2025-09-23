package com.ricesnack.GrowIT_BE.machinelearning.repository;

import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnualDataRepository extends JpaRepository<AnnualData, Integer> {
}
