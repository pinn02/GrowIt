package com.ricesnack.GrowIT_BE.machinelearning.service;

import ai.onnxruntime.OnnxTensor;
import ai.onnxruntime.OrtEnvironment;
import ai.onnxruntime.OrtException;
import ai.onnxruntime.OrtSession;

import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.Map;

public class OnnxPredictor implements AutoCloseable {

    private final OrtSession session;
    private final OrtEnvironment env;

    public OnnxPredictor(String modelResourcePath) {
        try {
            this.env = OrtEnvironment.getEnvironment();
            InputStream modelStream = OnnxPredictor.class.getResourceAsStream(modelResourcePath);
            if (modelStream == null) {
                throw new IllegalArgumentException("Model resource not found: " + modelResourcePath);
            }
            Path tempFile = Files.createTempFile("model-", ".onnx");
            try (OutputStream out = Files.newOutputStream(tempFile)) {
                modelStream.transferTo(out);
            }
            this.session = env.createSession(tempFile.toString(), new OrtSession.SessionOptions());
            Files.delete(tempFile);

        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize OnnxPredictor", e);
        }
    }

    @SuppressWarnings("unchecked")
    public Map<Long, Float> predictProbabilities(float[] inputData) throws OrtException {
        String inputName = session.getInputNames().iterator().next();
        try (OnnxTensor inputTensor = OnnxTensor.createTensor(env, new float[][]{inputData});
             OrtSession.Result results = session.run(Collections.singletonMap(inputName, inputTensor))) {
            return (Map<Long, Float>) results.get(1).getValue();
        }
    }


    @Override
    public void close() throws OrtException {
        if (session != null) session.close();
        if (env != null) env.close();
    }



}
