package com.ricesnack.GrowIT_BE.member.domain;

public interface OAuth2UserInfo {
    String getProvider();
    String getProviderId();
    String getEmail();
    String getName();

}
