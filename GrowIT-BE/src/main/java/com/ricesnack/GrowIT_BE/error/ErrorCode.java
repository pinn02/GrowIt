package com.ricesnack.GrowIT_BE.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // 회원 관련
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."),
    SAVE_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "저장 생성 중 오류가 발생했습니다."),
    SAVE_NOT_FOUND_OR_NO_PERMISSION(HttpStatus.FORBIDDEN, "세이브가 존재하지 않거나 삭제 권한이 없습니다.");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatusCode() {
        return this.status.value();
    }
}
