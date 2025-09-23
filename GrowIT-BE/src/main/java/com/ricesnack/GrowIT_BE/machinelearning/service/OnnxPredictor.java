package com.ricesnack.GrowIT_BE.machinelearning.service;

import ai.onnxruntime.*;

import java.util.*;

public class OnnxPredictor implements AutoCloseable {

    private final OrtSession session;
    private final OrtEnvironment env;

    public OnnxPredictor(byte[] modelAsBytes) throws OrtException {
        this.env = OrtEnvironment.getEnvironment();
        this.session = env.createSession(modelAsBytes, new OrtSession.SessionOptions());
    }

    @SuppressWarnings("unchecked")
    public Map<Long, Float> predictProbabilities(float[] inputData) throws OrtException {
        String inputName = session.getInputNames().iterator().next();

        // 모델 입력 정보 확인
        System.out.println("=== 모델 입력 정보 ===");
        System.out.println("Input name: " + inputName);

        // 모델이 예상하는 입력 shape 확인
        var inputInfo = session.getInputInfo();
        System.out.println("Expected input info: " + inputInfo);

        try (OnnxTensor inputTensor = OnnxTensor.createTensor(env, new float[][]{inputData})) {
            System.out.println("Created tensor shape: " + Arrays.toString(inputTensor.getInfo().getShape()));

            try (OrtSession.Result results = session.run(Collections.singletonMap(inputName, inputTensor))) {
                System.out.println("Model execution completed successfully");

                // 1. 모델의 두 번째 출력(output_probability)을 가져옵니다.
                List<OnnxMap> probabilitySequence = (List<OnnxMap>) results.get(1).getValue();

                // 2. 결과 처리: List의 첫 번째 요소가 우리가 원하는 Map입니다.
                if (probabilitySequence == null || probabilitySequence.isEmpty()) {
                    throw new IllegalStateException("모델이 비어있는 확률 시퀀스를 반환했습니다.");
                }
                Map<?, ?> rawProbabilities = probabilitySequence.get(0).getValue();
                Map<String, Float> gradeProbabilities = new HashMap<>();
                for (Map.Entry<?, ?> entry : rawProbabilities.entrySet()) {
                    if (entry.getKey() instanceof String && entry.getValue() instanceof Float) {
                        gradeProbabilities.put((String) entry.getKey(), (Float) entry.getValue());
                    }
                }
                System.out.println("--- [DEBUG] 모델 원본 출력 (Map<String, Float>): " + gradeProbabilities);

                // 3. 서비스가 요구하는 `Map<Long, Float>` 형태로 변환합니다.
                // "S", "A", "B", "C" 등급을 Long 타입 키(0L, 1L, 2L, 3L)로 매핑합니다.
                Map<Long, Float> longKeyedProbabilities = new HashMap<>();
                for (Map.Entry<String, Float> entry : gradeProbabilities.entrySet()) {
                    String grade = entry.getKey();
                    Float probability = entry.getValue();
                    Long key;

                    switch (grade.toUpperCase()) { // 대소문자 구분 없도록 toUpperCase() 사용
                        case "S":
                            key = 0L;
                            break;
                        case "A":
                            key = 1L;
                            break;
                        case "B":
                            key = 2L;
                            break;
                        case "C":
                            key = 3L;
                            break;
                        // 필요하다면 다른 등급(D, F 등)에 대한 case를 추가할 수 있습니다.
                        default:
                            // 예상치 못한 등급 키가 들어올 경우 에러를 발생시켜 문제를 즉시 인지하도록 합니다.
                            System.err.println("!!! [ERROR] 예상치 못한 등급 키가 발견되었습니다: " + grade);
                            throw new IllegalStateException("모델 출력에서 알 수 없는 등급 키 '" + grade + "'를 받았습니다.");
                    }
                    longKeyedProbabilities.put(key, probability);
                }

                // 4. 최종 변환된 Map을 반환합니다.
                System.out.println("--- [DEBUG] 최종 변환된 결과 (Map<Long, Float>): " + longKeyedProbabilities);
                return longKeyedProbabilities;

            } catch (ClassCastException e) {
                System.err.println("!!! [ERROR] 모델 결과 형 변환(Casting) 실패 !!!");
                System.err.println("모델의 실제 출력 타입과 Java 코드가 일치하는지 확인하세요. 예상 타입: List<Map<String, Float>>");
                e.printStackTrace();
                throw new RuntimeException("ONNX 결과 형 변환에 실패했습니다. 모델 출력 스키마를 확인하세요.", e);
            }
        }
    }

    @Override
    public void close() throws OrtException {
        if (session != null) {
            session.close();
        }
        if (env != null) {
            env.close();
        }
    }
}

