package com.ricesnack.GrowIT_BE.machinelearning.service;

import ai.onnxruntime.*;
import java.util.Collections;
import java.util.Map;

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
        try (OnnxTensor inputTensor = OnnxTensor.createTensor(env, new float[][]{inputData});
             OrtSession.Result results = session.run(Collections.singletonMap(inputName, inputTensor))) {
            return (Map<Long, Float>) results.get(1).getValue();
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

