package com.ricesnack.GrowIT_BE.machinelearning.service;

import ai.onnxruntime.OrtException;
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

    public Object predictForTurnByModel(PredictionRequestDto requestDto) throws OrtException {
        ModelType modelType = requestDto.modelType();
        int year = 1995 + requestDto.turn() - 1;

        AnnualData annualData = dataRepository.findById(year)
                .orElseThrow(() -> new IllegalArgumentException("No data found for year " + year));

        OnnxPredictor predictor = predictors.get(modelType);
        if (predictor == null) {
            throw new IllegalArgumentException("No predictor found for model type " + modelType);
        }

        List<String> features = modelFeatures.get(modelType);
        if (features == null) {
            throw new IllegalArgumentException("No features found for model type " + modelType);
        }

        float[] inputData = new float[features.size()];
        for (int i = 0; i < features.size(); i++) {
            inputData[i] = (float) annualData.getFeatureValue(features.get(i));
        }

        Map<Long, Float> probabilities = predictor.predictProbabilities(inputData);

        PredictionResultProcessor processor = resultProcessors.get(modelType);
        if (processor == null) {
            throw new IllegalArgumentException("No result processor found for model type " + modelType);
        }

        return processor.process(probabilities, requestDto);
    }
}
