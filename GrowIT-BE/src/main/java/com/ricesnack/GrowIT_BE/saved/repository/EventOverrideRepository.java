package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.EventOverrides;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventOverrideRepository extends JpaRepository<EventOverrides, Long> {
    boolean existsBySaved_IdAndEventTitle(Long savedId, String eventTitle);

    @Modifying
    @Query("UPDATE EventOverrides eo SET eo.overrideWeight = eo.overrideWeight + :delta100 " +
            "WHERE eo.saved.id = :savedId AND eo.eventTitle = :eventTitle")
    void incrementOverrideWeight(@Param("savedId") Long savedId,
                                 @Param("eventTitle") String eventTitle,
                                 @Param("delta100") int delta100);
}
