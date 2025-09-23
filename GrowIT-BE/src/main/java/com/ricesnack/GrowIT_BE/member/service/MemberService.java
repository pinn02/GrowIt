package com.ricesnack.GrowIT_BE.member.service;

import com.ricesnack.GrowIT_BE.error.CustomException;
import com.ricesnack.GrowIT_BE.error.ErrorCode;
import com.ricesnack.GrowIT_BE.member.domain.Member;
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

    public void withdraw(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        member.delete();
        memberRepository.save(member);
    }
}
