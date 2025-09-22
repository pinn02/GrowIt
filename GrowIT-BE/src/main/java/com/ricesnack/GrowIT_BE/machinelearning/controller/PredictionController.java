package com.ricesnack.GrowIT_BE.machinelearning.controller;

import ai.onnxruntime.OrtException;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import com.ricesnack.GrowIT_BE.machinelearning.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping("/data/predict")
    public ResponseEntity<Object> predictByModel(
            @RequestBody PredictionRequestDto requestDto) {
        try {
            Object response = predictionService.predictForTurnByModel(requestDto);

            if (response == null) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(response);

        } catch (OrtException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "모델 예측 중 오류가 발생했습니다."));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
