package com.ricesnack.GrowIT_BE.machinelearning.repository;

import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnnualDataRepository extends JpaRepository<AnnualData, Integer> {
}
