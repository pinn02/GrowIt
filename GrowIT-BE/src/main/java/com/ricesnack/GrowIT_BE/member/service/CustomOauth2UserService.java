package com.ricesnack.GrowIT_BE.member.service;

import com.ricesnack.GrowIT_BE.member.domain.CustomOAuth2UserDetails;
import com.ricesnack.GrowIT_BE.member.domain.KakaoUserDetails;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.member.domain.OAuth2UserInfo;
import com.ricesnack.GrowIT_BE.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo oAuth2UserInfo = null;

        if(provider.equals("kakao")){
            oAuth2UserInfo = new KakaoUserDetails(oAuth2User.getAttributes());
        } else {
            OAuth2Error error = new OAuth2Error("unsupported_provider", "지원하지 않는 OAuth2 제공자입니다: " + provider, null);
            throw new OAuth2AuthenticationException(error);
        }

        String providerId = oAuth2UserInfo.getProviderId();
        String email = oAuth2UserInfo.getEmail(); // 카카오에서 제공하는 실제 이메일
        String nickname = ""; // 닉네임을 빈 값으로 설정

        if (email == null || email.trim().isEmpty()) {
            OAuth2Error error = new OAuth2Error("email_not_provided", "OAuth2 제공자로부터 이메일을 받지 못했습니다.", null);
            throw new OAuth2AuthenticationException(error);
        }

        Member member = memberRepository.findByEmail(email)
                .map(existingMember -> {
                    if (existingMember.getProvider() == null || existingMember.getProviderId() == null) {
                        existingMember.updateOAuth2Info(provider, providerId);
                        memberRepository.save(existingMember);
                    }
                    return existingMember;
                })
                .orElseGet(() -> {
                    return memberRepository.findByProviderAndProviderId(provider, providerId)
                            .map(existingMember -> {
                                if (!existingMember.getEmail().equals(email)) {
                                    existingMember.updateEmail(email);
                                    memberRepository.save(existingMember);
                                }
                                return existingMember;
                            })
                            .orElseGet(() -> {
                                try {
                                    Member newMember = Member.builder()
                                            .email(email)
                                            .nickname(nickname)
                                            .provider(provider)
                                            .providerId(providerId)
                                            .build();

                                    Member savedMember = memberRepository.save(newMember);
                                    return savedMember;
                                } catch (Exception e) {
                                    OAuth2Error error = new OAuth2Error("user_creation_failed", "사용자 생성에 실패했습니다: " + e.getMessage(), null);
                                    throw new OAuth2AuthenticationException(error, e);
                                }
                            });
                });

        return new CustomOAuth2UserDetails(member, oAuth2User.getAttributes());
    }

}
