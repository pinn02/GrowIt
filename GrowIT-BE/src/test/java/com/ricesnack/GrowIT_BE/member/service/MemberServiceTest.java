package com.ricesnack.GrowIT_BE.member.service;

import com.ricesnack.GrowIT_BE.error.CustomException;
import com.ricesnack.GrowIT_BE.error.ErrorCode;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verifyNoMoreInteractions;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;

    @Test
    void logout_요청시_refresh_token을_초기화한다() {
        // given
        String email = "test@test.com";

        // when
        memberService.logout(email);

        // then
        then(memberRepository).should().clearRefreshTokenByEmail(email);
        verifyNoMoreInteractions(memberRepository);
    }

    @Test
    void withdraw_요청시_회원이_soft_delete_된다() {
        String email = "user@test.com";
        Member member = Member.builder()
                .email("test@test.com")
                .nickname("test")
                .refreshToken("refresh token")
                .provider("provider name")
                .providerId("provider id")
                .build();

        given(memberRepository.findByEmail(email)).willReturn(Optional.of(member));

        // when
        memberService.withdraw(email);

        // then
        assertThat(member.isDeleted()).isTrue();

        ArgumentCaptor<Member> captor = ArgumentCaptor.forClass(Member.class);
        then(memberRepository).should().save(captor.capture());
        assertThat(captor.getValue().isDeleted()).isTrue();

        then(memberRepository).should().findByEmail(email);
        verifyNoMoreInteractions(memberRepository);
    }

    @Test
    void withdraw_요청시_올바르지_않은_토큰_입력시_Member_Not_Found_에러가_발생한다() {
        // given
        String email = "absent@test.com";
        given(memberRepository.findByEmail(email)).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> memberService.withdraw(email))
                .isInstanceOf(CustomException.class)
                .hasMessageContaining(ErrorCode.MEMBER_NOT_FOUND.getMessage());

        then(memberRepository).should().findByEmail(email);
        then(memberRepository).should(never()).save(any());
        verifyNoMoreInteractions(memberRepository);
    }
}
