package com.ricesnack.GrowIT_BE.saved.controller;

import com.ricesnack.GrowIT_BE.member.domain.CustomOAuth2UserDetails;
import com.ricesnack.GrowIT_BE.saved.dto.GameCreateRequest;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;
import com.ricesnack.GrowIT_BE.saved.service.GameService;
import com.ricesnack.GrowIT_BE.saved.service.SavedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SavedController {

    private final SavedService savedServoce;
    private final GameService gameService;

    @GetMapping("/saved")
    public ResponseEntity<List<SavedResponse>> getRecentSaves(
            @AuthenticationPrincipal CustomOAuth2UserDetails userDetails) {
        Long memberId = userDetails.getMember().getMemberId();
        List<SavedResponse> recentSaves = savedServoce.findRecentSaves(memberId);
        return ResponseEntity.ok(recentSaves);
    }

    @DeleteMapping("/saved/{saveId}")
    public ResponseEntity<Void> deleteSave(
            @PathVariable Long saveId,
            @AuthenticationPrincipal CustomOAuth2UserDetails userDetails) {
        Long memberId = userDetails.getMember().getMemberId();
        savedServoce.deleteSavedById(saveId, memberId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/game")
    public ResponseEntity<Void> createNewSave(
            @RequestBody GameCreateRequest request,
            @AuthenticationPrincipal CustomOAuth2UserDetails userDetails
    ) {
        Long memberId = userDetails.getMember().getMemberId();
        gameService.createNewSave(userDetails, request);
        return ResponseEntity.ok().build();
    }
}
