package com.ricesnack.GrowIT_BE.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseDto> handleCustomException(CustomException e) {
        ErrorCode code = e.getErrorCode();
        log.info("CustomException 발생 - ErrorCode: {}", code);
        
        ErrorResponseDto response = ErrorResponseDto.of(code);
        
        return ResponseEntity
                .status(code.getStatus())
                .body(response);
    }
    
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleUsernameNotFoundException(UsernameNotFoundException e) {
        log.info("UsernameNotFoundException 발생: {}", e.getMessage());
        
        ErrorResponseDto response = ErrorResponseDto.builder()
                .status(401)
                .message("인증이 필요합니다. 유효한 토큰을 제공해주세요.")
                .build();
                
        return ResponseEntity
                .status(401)
                .body(response);
    }
}