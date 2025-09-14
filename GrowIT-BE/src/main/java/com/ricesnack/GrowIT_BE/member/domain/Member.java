package com.ricesnack.GrowIT_BE.member.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column(length = 30)
    private String nickname;

    @Column(length = 512)
    private String refreshToken;

    private String provider;

    private String providerId;

    private boolean isDeleted;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    protected Member() {}

    @Builder
    private Member(String email, String nickname, String refreshToken, String provider, String providerId) {
        this.email = email;
        this.nickname = nickname;
        this.refreshToken = refreshToken;
        this.provider = provider;
        this.providerId = providerId;
        this.createdAt = LocalDateTime.now();
    }

    public void updateOAuth2Info(String provider, String providerId) {
        this.provider = provider;
        this.providerId = providerId;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void delete() {
        this.isDeleted = true;
    }
}
