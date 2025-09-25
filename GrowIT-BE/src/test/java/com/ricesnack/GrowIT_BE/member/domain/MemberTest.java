package com.ricesnack.GrowIT_BE.member.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberTest {

    @Test
    void Member_생성_테스트() {
        // given & when
        Member member = initMember();

        // then
        assertThat(member.getEmail()).isEqualTo("test@test.com");
        assertThat(member.getNickname()).isEqualTo("test");
        assertThat(member.getRefreshToken()).isEqualTo("refresh token");
        assertThat(member.getProvider()).isEqualTo("provider name");
        assertThat(member.getProviderId()).isEqualTo("provider id");
    }

    @Test
    void member_생성_시_현재_시각으로_초기화된다() {
        // given
        LocalDateTime before = LocalDateTime.now();

        // when
        Member member = initMember();

        LocalDateTime after = LocalDateTime.now();

        // then
        assertThat(member.getCreatedAt()).isBetween(before, after);
    }

    @Test
    void OAuth2_정보_업데이트_시_provider와_providerId가_업데이트_된다() {
        // given
        Member member = initMember();

        // when
        member.updateOAuth2Info("google", "google provider id");

        // then
        assertThat(member.getProvider()).isEqualTo("google");
        assertThat(member.getProviderId()).isEqualTo("google provider id");
    }

    @Test
    void Nickname이_업데이트된다() {
        // given
        Member member = initMember();
        String changedNickname = "changed nickname";

        // when
        member.updateNickname(changedNickname);

        // then
        assertThat(member.getNickname()).isEqualTo(changedNickname);
    }

    @Test
    void Email이_업데이트된다() {
        // given
        Member member = initMember();
        String changedEmail = "changed email";

        // when
        member.updateEmail(changedEmail);

        // then
        assertThat(member.getEmail()).isEqualTo(changedEmail);
    }

    @Test
    void refresh_token이_업데이트된다() {
        // given
        Member member = initMember();
        String changedRefreshToken = "changed refresh token";

        // when
        member.updateRefreshToken(changedRefreshToken);

        // then
        assertThat(member.getRefreshToken()).isEqualTo(changedRefreshToken);
    }

    @Test
    void Member가_soft_delete된다() {
        // given
        Member member = initMember();

        // when
        member.delete();

        // then
        assertThat(member.isDeleted()).isEqualTo(true);
    }

    private Member initMember() {
        return Member.builder()
                .email("test@test.com")
                .nickname("test")
                .refreshToken("refresh token")
                .provider("provider name")
                .providerId("provider id")
                .build();
    }
}
