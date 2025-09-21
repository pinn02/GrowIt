package com.ricesnack.GrowIT_BE.machinelearning.config;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.service.OnnxPredictor;
import com.ricesnack.GrowIT_BE.machinelearning.service.processor.HiringResultProcessor;
import com.ricesnack.GrowIT_BE.machinelearning.service.processor.PredictionResultProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.EnumMap;
import java.util.Map;

@Configuration
public class PredictionModuleConfig {

    private Map<ModelType, OnnxPredictor> predictors;

    @Bean
    public Map<ModelType, OnnxPredictor> predictors() {
        this.predictors = new EnumMap<>(ModelType.class);
        for (ModelType modelType : ModelType.values()) {
            try (InputStream is = new ClassPathResource(modelType.getFilePath()).getInputStream()) {
                byte[] modelBytes = is.readAllBytes();
                predictors.put(modelType, new OnnxPredictor(modelBytes));
            } catch (Exception e) { // IOException과 OrtException을 모두 처리하도록 수정
                throw new RuntimeException("Failed to load ONNX model for " + modelType, e);
            }
        }
        return this.predictors;
    }

    @Bean
    public Map<ModelType, PredictionResultProcessor> resultProcessors(
            HiringResultProcessor hiring, MarketingResultProcessor marketing,
            InvestmentResultProcessor investment, ProjectResultProcessor project
    ) {
        Map<ModelType, PredictionResultProcessor> map = new EnumMap<>(ModelType.class);
        map.put(ModelType.HIRING, hiring);
        map.put(ModelType.MARKETING, marketing);
        map.put(ModelType.FACILITY_INVESTMENT, investment);
        map.put(ModelType.RND, investment);
        map.put(ModelType.PROJECT, project);
        return map;
    }
}
