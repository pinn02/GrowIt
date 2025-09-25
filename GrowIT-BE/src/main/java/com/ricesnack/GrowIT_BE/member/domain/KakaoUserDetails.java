package com.ricesnack.GrowIT_BE.member.domain;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@AllArgsConstructor
public class KakaoUserDetails implements OAuth2UserInfo {
    private Map<String, Object> attributes;

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        String providerId = attributes.get("id").toString();
        return providerId;
    }

    @Override
    public String getEmail() {
        try {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            if (kakaoAccount != null) {
                String email = (String) kakaoAccount.get("email");
                return email;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public String getName() {
        try {
            Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
            if (properties != null) {
                String nickname = (String) properties.get("nickname");
                return nickname;
            } else {
                return "카카오사용자";
            }
        } catch (Exception e) {
            return "카카오사용자";
        }
    }

}
