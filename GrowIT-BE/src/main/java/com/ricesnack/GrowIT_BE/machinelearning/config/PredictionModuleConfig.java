package com.ricesnack.GrowIT_BE.machinelearning.config;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.service.OnnxPredictor;
import com.ricesnack.GrowIT_BE.machinelearning.service.processor.*; // Wildcard import로 모든 Processor 포함
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.EnumMap;
import java.util.Map;

@Configuration
public class PredictionModuleConfig {

    @Bean
    public Map<ModelType, OnnxPredictor> predictors() {
        // 클래스 필드 대신 지역 변수를 사용하도록 수정하여 메서드의 독립성을 높임
        Map<ModelType, OnnxPredictor> predictorMap = new EnumMap<>(ModelType.class);
        for (ModelType modelType : ModelType.values()) {
            try (InputStream is = new ClassPathResource(modelType.getFilePath()).getInputStream()) {
                byte[] modelBytes = is.readAllBytes();
                predictorMap.put(modelType, new OnnxPredictor(modelBytes));
            } catch (Exception e) {
                throw new RuntimeException("Failed to load ONNX model for " + modelType, e);
            }
        }
        return predictorMap;
    }

    @Bean
    public Map<ModelType, PredictionResultProcessor> resultProcessors(
            // 각 Processor Bean들을 명시적으로 주입받습니다.
            HiringResultProcessor hiringResultProcessor,
            MarketingResultProcessor marketingResultProcessor,
            FacilityInvestmentResultProcessor facilityInvestmentResultProcessor,
            RndInvestmentResultProcessor rndInvestmentResultProcessor,
            ProjectResultProcessor projectResultProcessor
    ) {
        Map<ModelType, PredictionResultProcessor> map = new EnumMap<>(ModelType.class);

        // 각 ModelType에 맞는 전용 Processor를 매핑합니다.
        map.put(ModelType.HIRING, hiringResultProcessor);
        map.put(ModelType.MARKETING, marketingResultProcessor);
        map.put(ModelType.FACILITY_INVESTMENT, facilityInvestmentResultProcessor);
        map.put(ModelType.RND, rndInvestmentResultProcessor);
        map.put(ModelType.PROJECT, projectResultProcessor);

        return map;
    }
}