package com.ricesnack.GrowIT_BE.member.controller;

import com.ricesnack.GrowIT_BE.member.domain.SecurityMember;
import com.ricesnack.GrowIT_BE.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@AuthenticationPrincipal SecurityMember member) {
        memberService.logout(member.getEmail());
        return ResponseEntity.ok(Map.of("message", "로그아웃이 완료되었습니다."));
    }

    @PatchMapping("/withdraw")
    public ResponseEntity<Map<String, String>> withdraw(@AuthenticationPrincipal SecurityMember member) {
        memberService.withdraw(member.getEmail());
        return ResponseEntity.ok(Map.of("message", "회원 탈퇴가 완료되었습니다."));
    }
}
