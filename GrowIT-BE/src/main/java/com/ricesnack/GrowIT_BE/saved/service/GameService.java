package com.ricesnack.GrowIT_BE.saved.service;

import com.ricesnack.GrowIT_BE.member.domain.CustomOAuth2UserDetails;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.member.domain.SecurityMember;
import com.ricesnack.GrowIT_BE.saved.dto.GameCreateRequest;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public interface GameService {
    SavedResponse createNewSave(GameCreateRequest request, SecurityMember member);
}