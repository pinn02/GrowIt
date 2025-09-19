package com.ricesnack.GrowIT_BE.saved.controller;

import com.ricesnack.GrowIT_BE.member.domain.SecurityMember;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;
import com.ricesnack.GrowIT_BE.saved.service.SavedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/saved")
@RequiredArgsConstructor
public class SavedController {

    private final SavedService savedService;

    @GetMapping()
    public ResponseEntity<List<SavedResponse>> getRecentSaves(@AuthenticationPrincipal SecurityMember member) {
        Long memberId = member.getMemberId();
        List<SavedResponse> recentSaves = savedService.findRecentSaves(memberId);
        return ResponseEntity.ok(recentSaves);

    }

    @DeleteMapping("/{saveId}")
    public ResponseEntity<Void> deleteSave(
            @PathVariable Long saveId,
            @AuthenticationPrincipal SecurityMember member) {
        Long memberId = member.getMemberId();
        savedService.deleteSavedById(saveId, memberId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{companyName}")
    public ResponseEntity<Void> createNewSave(
            @PathVariable String companyName,
            @AuthenticationPrincipal SecurityMember securityMember) {
        savedService.createNewSave(companyName, securityMember.getMember());
        return ResponseEntity.ok().build();
    }
}
