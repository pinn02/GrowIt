package com.ricesnack.GrowIT_BE.machinelearning.controller;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionResponse;
import com.ricesnack.GrowIT_BE.machinelearning.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PredictionController {

    private final PredictionService predictionService;

    @GetMapping("/data/{turn}/{modelType}")
    public ResponseEntity<PredictionResponse> predictByModel(
            @PathVariable int turn,
            @PathVariable ModelType modelType) {

        PredictionResponse response = predictionService.predictForTurnByModel(turn, modelType);
        return ResponseEntity.ok(response);
    }
}
