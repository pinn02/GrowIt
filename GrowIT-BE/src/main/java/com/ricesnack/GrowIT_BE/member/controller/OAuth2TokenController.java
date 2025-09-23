package com.ricesnack.GrowIT_BE.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/oauth2")
public class OAuth2TokenController {

    @GetMapping("/token")
    public ResponseEntity<?> getTokenFromSession(HttpServletRequest request) {

        try {
            Boolean success = (Boolean) request.getSession().getAttribute("oauth2_success");

            if (success == null || !success) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "OAuth2 인증이 완료되지 않았습니다."));
            }

            String accessToken = (String) request.getSession().getAttribute("accessToken");
            String refreshToken = (String) request.getSession().getAttribute("refreshToken");
            String userEmail = (String) request.getSession().getAttribute("userEmail");
            String userNickname = (String) request.getSession().getAttribute("userNickname");

            if (accessToken == null || refreshToken == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "토큰을 찾을 수 없습니다."));
            }

            request.getSession().removeAttribute("oauth2_success");
            request.getSession().removeAttribute("accessToken");
            request.getSession().removeAttribute("refreshToken");
            request.getSession().removeAttribute("userEmail");
            request.getSession().removeAttribute("userNickname");

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("userEmail", userEmail);
            response.put("userNickname", userNickname);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "토큰 조회 중 오류가 발생했습니다."));
        }
    }

}
