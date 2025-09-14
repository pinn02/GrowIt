package com.ricesnack.GrowIT_BE.member.service;

import com.ricesnack.GrowIT_BE.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void logout(String email) {
        memberRepository.clearRefreshTokenByEmail(email);
    }
}
