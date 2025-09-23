package com.ricesnack.GrowIT_BE.machinelearning.config;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.service.OnnxPredictor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.EnumMap;
import java.util.Map;

@Configuration
public class PredictionConfig {

    @Bean
    public Map<ModelType, OnnxPredictor> predictorMap() {
        Map<ModelType, OnnxPredictor> predictors = new EnumMap<>(ModelType.class);
        for (ModelType modelType : ModelType.values()) {
            predictors.put(modelType, new OnnxPredictor("/" + modelType.getFilePath()));
        }
        return predictors;
    }
}
