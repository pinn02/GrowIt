package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    @Query("""
        select coalesce(sum(s.salary), 0)
        from Staff s
        where s.id in :staffIds
    """)
    int sumSalaryByIds(@Param("staffIds") List<Long> staffIds);

    @Query("""
        select coalesce(sum(s.productivity), 0)
        from Staff s
        where s.id in :staffIds
    """)
    int sumProductivityByIds(@Param("staffIds") List<Long> staffIds);
}
