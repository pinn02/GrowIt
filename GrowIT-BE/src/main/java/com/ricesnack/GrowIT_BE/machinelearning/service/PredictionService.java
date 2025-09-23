package com.ricesnack.GrowIT_BE.machinelearning.service;

import ai.onnxruntime.OrtException;
import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;
import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import com.ricesnack.GrowIT_BE.machinelearning.repository.AnnualDataRepository;
import com.ricesnack.GrowIT_BE.machinelearning.service.processor.PredictionResultProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
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
        System.out.println("\n--- [DEBUG] 1. 요청 정보 확인 ---");
        ModelType modelType = requestDto.modelType();
        int year = 1995 + requestDto.turn() - 1;
        System.out.println("ModelType: " + modelType + ", Turn: " + requestDto.turn() + ", Calculated Year: " + year);

        AnnualData annualData = dataRepository.findById(year)
                .orElseThrow(() -> new IllegalArgumentException("No data found for year " + year));
        System.out.println("--- [DEBUG] 2. DB 데이터 확인 ---");
        System.out.println(year + "년도 AnnualData 조회 성공");

        OnnxPredictor predictor = predictors.get(modelType);
        if (predictor == null) {
            throw new IllegalArgumentException("No predictor found for model type " + modelType);
        }

        List<String> features = modelFeatures.get(modelType);
        if (features == null) {
            throw new IllegalArgumentException("No features found for model type " + modelType);
        }
        System.out.println("--- [DEBUG] 3. 모델 요구 피처 목록 확인 ---");
        System.out.println("요구 피처 개수: " + features.size());
        System.out.println("요구 피처 목록: " + features);

        float[] inputData = new float[features.size()];
        System.out.println("--- [DEBUG] 4. 모델 입력 데이터 생성 ---");
        for (int i = 0; i < features.size(); i++) {
            String featureName = features.get(i);
            float featureValue = (float) annualData.getFeatureValue(featureName);
            inputData[i] = featureValue;
            System.out.println("피처: " + featureName + ", 값: " + featureValue);
        }
        System.out.println("--- [DEBUG] 5. 최종 입력 텐서(Tensor) 확인 ---");
        System.out.println("입력 데이터 배열: " + Arrays.toString(inputData));
        System.out.println("입력 데이터 길이: " + inputData.length);


        Map<Long, Float> probabilities;
        try {
            System.out.println("--- [DEBUG] 6. ONNX 모델 예측 실행 직전 ---");
            probabilities = predictor.predictProbabilities(inputData);
            System.out.println("--- [DEBUG] 7. ONNX 모델 예측 성공! ---");
            System.out.println("예측 결과 (확률): " + probabilities);
        } catch (OrtException e) {
            System.err.println("!!! [ERROR] ONNX 예측 중 심각한 오류 발생 !!!");
            e.printStackTrace(); // 가장 중요한 상세 에러 로그 출력
            throw e; // 원래 로직대로 예외를 다시 던짐
        }

        PredictionResultProcessor processor = resultProcessors.get(modelType);
        if (processor == null) {
            throw new IllegalArgumentException("No result processor found for model type " + modelType);
        }
        System.out.println("--- [DEBUG] 8. 결과 처리 Processor 실행 ---");
        return processor.process(probabilities, requestDto);
    }
}