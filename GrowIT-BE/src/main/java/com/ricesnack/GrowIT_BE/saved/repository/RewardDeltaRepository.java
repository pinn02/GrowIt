package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.RewardType;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import com.ricesnack.GrowIT_BE.saved.domain.RewardDelta;
import com.ricesnack.GrowIT_BE.saved.domain.StatType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RewardDeltaRepository extends JpaRepository<RewardDelta, Long> {
    boolean existsBySaved_IdAndStatName(Long savedId, String statName);

    @Modifying
    @Query("UPDATE RewardDelta rd SET rd.delta = rd.delta + :delta100 " +
            "WHERE rd.saved.id = :savedId AND rd.statName = :rewardType")
    int incrementMagnification(@Param("savedId") Long savedId,
                               @Param("rewardType") String rewardType,
                               @Param("delta100") int delta100);
}
