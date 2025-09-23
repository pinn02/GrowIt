package com.ricesnack.GrowIT_BE.saved.repository;

import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface SavedRepository extends JpaRepository<Saved, Long> {

    @Query(value = "SELECT DISTINCT s FROM Saved s " +
            "LEFT JOIN FETCH s.hires h " +
            "LEFT JOIN FETCH h.staff " +
            "LEFT JOIN FETCH s.projects " +
            "WHERE s.member.memberId = :memberId",
            countQuery = "SELECT COUNT(DISTINCT s) FROM Saved s WHERE s.member.memberId = :memberId")
    Page<Saved> findAllWithDetails(@Param("memberId") Long memberId, Pageable pageable);

    @Query("SELECT s FROM Saved s WHERE s.id = :id AND s.member.memberId = :memberId")
    Optional<Saved> findByIdWithDetailsAndMemberId(@Param("id") Long id, @Param("memberId") Long memberId);



    Page<Saved> findByMember_MemberId(Long memberId, Pageable pageable);
}
