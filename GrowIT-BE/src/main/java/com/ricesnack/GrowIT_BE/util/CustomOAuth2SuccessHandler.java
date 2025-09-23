package com.ricesnack.GrowIT_BE.util;

import com.ricesnack.GrowIT_BE.config.jwt.JwtService;
import com.ricesnack.GrowIT_BE.member.domain.CustomOAuth2UserDetails;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.member.repository.MemberRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Value("${front.url2}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        try {
            CustomOAuth2UserDetails userDetails = (CustomOAuth2UserDetails) authentication.getPrincipal();

            Long memberId = userDetails.getMember().getMemberId();
            String email = userDetails.getMember().getEmail();

            String accessToken = jwtService.generateAccessToken(memberId, email);
            String refreshToken = jwtService.generateRefreshToken(memberId, email);

            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
            member.updateRefreshToken(refreshToken);
            memberRepository.save(member);

            request.getSession().setAttribute("oauth2_success", true);
            request.getSession().setAttribute("accessToken", accessToken);
            request.getSession().setAttribute("refreshToken", refreshToken);
            request.getSession().setAttribute("userEmail", email);
            request.getSession().setAttribute("userNickname", userDetails.getMember().getNickname());

            String redirectUrl = frontendUrl + "/oauth2/success";

            response.sendRedirect(redirectUrl);

        } catch (Exception e) {
            response.sendRedirect(frontendUrl + "/login?error=oauth_failed");
        }
    }

}
