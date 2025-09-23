package com.ricesnack.GrowIT_BE.error;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponseDto {
    private int status;
    private String message;

    public static ErrorResponseDto of(ErrorCode errorCode) {
        return ErrorResponseDto.builder()
                .status(errorCode.getStatusCode())
                .message(errorCode.getMessage())
                .build();
    }
}