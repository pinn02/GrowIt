package com.ricesnack.GrowIT_BE.machinelearning.controller;

import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import com.ricesnack.GrowIT_BE.machinelearning.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping("/data/predict")
    public ResponseEntity<Object> predictByModel(
            @RequestBody PredictionRequestDto requestDto) {

        Object response = predictionService.predictForTurnByModel(requestDto);
        return ResponseEntity.ok(response);
    }
}
