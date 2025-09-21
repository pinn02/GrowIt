package com.ricesnack.GrowIT_BE.machinelearning.service;

import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;
import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import com.ricesnack.GrowIT_BE.machinelearning.repository.AnnualDataRepository;
import com.ricesnack.GrowIT_BE.machinelearning.service.processor.PredictionResultProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final AnnualDataRepository dataRepository;
    private final Map<ModelType, OnnxPredictor> predictors;
    private final Map<ModelType, List<String>> modelFeatures;
    private final Map<ModelType, PredictionResultProcessor> resultProcessors;

    public Object predictForTurnByModel(PredictionRequestDto requestDto) {
        ModelType modelType = requestDto.modelType();
        int year = 1995 + requestDto.turn() - 1;

        AnnualData annualData = dataRepository.findById(year)
                .orElseThrow(() -> new IllegalArgumentException("No data found for year " + year));


    }
}
