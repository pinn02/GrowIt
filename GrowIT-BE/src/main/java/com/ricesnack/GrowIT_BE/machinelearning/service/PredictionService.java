package com.ricesnack.GrowIT_BE.machinelearning.service;

import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;
import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionResponse;
import com.ricesnack.GrowIT_BE.machinelearning.repository.AnnualDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final AnnualDataRepository dataRepository;
    private final Map<ModelType, OnnxPredictor> predictors;

    public PredictionResponse predictForTurnByModel(int turn, ModelType modelType) {
        int year = 1995 + turn - 1;
        AnnualData annualData = dataRepository.findById(year)
                .orElseThrow(() -> new IllegalArgumentException("No data found for year: " + year));

        OnnxPredictor predictor = predictors.get(modelType);
        if (predictor == null) {
            throw new IllegalArgumentException("No predictor found for model type: " + modelType);
        }

        List<String> featureOrder = modelType.getFeatureOrder();
        float[] inputArray = createInputArray(annualData, featureOrder);

        try {
            Map<Long, Float> probabilities = predictor.predictProbabilities(inputArray);
            return processProbabilities(probabilities);
        } catch (Exception e) {
            return new PredictionResponse("Error", Map.of());
        }
    }


    public Map<String, PredictionResponse> predicForTurn(int turn) {
        int year = 1995 + turn - 1;
        AnnualData annualData = dataRepository.findById(year)
                .orElseThrow(() -> new IllegalArgumentException("No data found for year: " + year));

        Map<String, PredictionResponse> allPredictions = new LinkedHashMap<>();

        for (ModelType modelType : ModelType.values()) {
            allPredictions.put(modelType.name(), predictForTurnByModel(turn, modelType));
        }
        return allPredictions;
    }

    private float[] createInputArray(AnnualData annualData, List<String> featureOrder) {
        float[] inputArray = new float[featureOrder.size()];
        for (int i = 0; i < featureOrder.size(); i++) {
            inputArray[i] = (float) annualData.getFeatureValue(featureOrder.get(i));
        }
        return inputArray;
    }

    private PredictionResponse processProbabilities(Map<Long, Float> probabilities) {
        Map.Entry<Long, Float> bestEntry = probabilities.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElseThrow(() -> new IllegalArgumentException("No predictions found"));
        String bestTier = mapLabelToTier(bestEntry.getKey());

        Map<String, Float> tierProbabilities = new HashMap<>();
        probabilities.forEach((label, prob) -> tierProbabilities.put(mapLabelToTier(label), prob));

        return new PredictionResponse(bestTier, tierProbabilities);
    }

    private String mapLabelToTier(long label) {
        return switch ((int) label) {
            case 0 -> "A";
            case 1 -> "B";
            case 2 -> "C";
            case 3 -> "S";
            default -> "Unknown";
        };
    }
}
