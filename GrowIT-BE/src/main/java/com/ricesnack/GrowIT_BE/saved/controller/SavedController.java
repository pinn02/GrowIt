package com.ricesnack.GrowIT_BE.saved.controller;

import com.ricesnack.GrowIT_BE.member.domain.CustomOAuth2UserDetails;
import com.ricesnack.GrowIT_BE.member.domain.SecurityMember;
import com.ricesnack.GrowIT_BE.saved.dto.GameCreateRequest;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;
import com.ricesnack.GrowIT_BE.saved.service.GameService;
import com.ricesnack.GrowIT_BE.saved.service.SavedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SavedController {

    private final SavedService savedService;
    private final GameService gameService;

    @GetMapping("/saved")
    public ResponseEntity<List<SavedResponse>> getRecentSaves(@AuthenticationPrincipal SecurityMember member) {
        Long memberId = member.getMemberId();
        List<SavedResponse> recentSaves = savedService.findRecentSaves(memberId);
        return ResponseEntity.ok(recentSaves);

    }

    @DeleteMapping("/saved/{saveId}")
    public ResponseEntity<Void> deleteSave(
            @PathVariable Long saveId,
            @AuthenticationPrincipal SecurityMember member) {
        Long memberId = member.getMemberId();
        savedService.deleteSavedById(saveId, memberId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/game")
    public ResponseEntity<Void> createNewSave(
            @RequestBody GameCreateRequest request,
            @AuthenticationPrincipal SecurityMember member
    ) {
        gameService.createNewSave(request, member);
        return ResponseEntity.ok().build();
    }
}
