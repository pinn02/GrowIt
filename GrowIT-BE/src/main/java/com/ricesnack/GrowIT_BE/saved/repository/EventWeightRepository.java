package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.Event;
import com.ricesnack.GrowIT_BE.saved.domain.EventWeight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventWeightRepository extends JpaRepository<EventWeight, Long> {
    @Modifying
    @Query("UPDATE EventWeight ew SET ew.delta = ew.delta + :delta100 " +
            "WHERE ew.saved.id = :savedId AND ew.category = :category")
    void incrementMagnification(@Param("savedId") Long savedId,
                                @Param("category") String category,
                                @Param("delta100") int delta100);
}
