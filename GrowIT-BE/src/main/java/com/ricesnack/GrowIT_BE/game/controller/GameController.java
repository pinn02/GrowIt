package com.ricesnack.GrowIT_BE.game.controller;

import com.ricesnack.GrowIT_BE.game.dto.GamePlayRequest;
import com.ricesnack.GrowIT_BE.game.service.GameService;
import com.ricesnack.GrowIT_BE.member.domain.SecurityMember;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @PostMapping()
    public ResponseEntity<Void> makeDecision(
            @AuthenticationPrincipal SecurityMember securityMember,
            @RequestBody GamePlayRequest gamePlayRequest) {
        gameService.makeDecision(securityMember.getMember(), gamePlayRequest);
        return ResponseEntity.ok().build();
    }
}
