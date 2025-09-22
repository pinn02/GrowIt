package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.Hire;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface HireRepository extends JpaRepository<Hire, Long> {

    // (saved_id, staff_id) 존재 여부/목록 조회
    @Query("""
        select h.staff.id
        from Hire h
        where h.saved.id = :savedId
          and h.staff.id in :staffIds
    """)
    List<Long> findExistingStaffIds(@Param("savedId") Long savedId,
                                    @Param("staffIds") List<Long> staffIds);

    // 해당 세이브에서 특정 직원들 고용 기록 삭제
    @Modifying
    @Query("""
        delete from Hire h
        where h.saved.id = :savedId
          and h.staff.id in :staffIds
    """)
    int deleteBySavedIdAndStaffIdIn(@Param("savedId") Long savedId,
                                    @Param("staffIds") List<Long> staffIds);
}
