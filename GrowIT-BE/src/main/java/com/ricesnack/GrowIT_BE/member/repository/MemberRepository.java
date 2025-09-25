package com.ricesnack.GrowIT_BE.member.repository;

import com.ricesnack.GrowIT_BE.member.domain.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByProviderAndProviderId(String provider, String providerId);

    @Transactional
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("update Member m set m.refreshToken = null where m.email = :email")
    void clearRefreshTokenByEmail(@Param("email") String email);
}
