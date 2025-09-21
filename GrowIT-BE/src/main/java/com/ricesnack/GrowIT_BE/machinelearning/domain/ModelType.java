package com.ricesnack.GrowIT_BE.machinelearning.domain;

import lombok.Getter;

@Getter
public enum ModelType {

    HIRING("models/hiring_tier_model.onnx"),
    PROJECT("models/project_tier_model.onnx"),
    FACILITY_INVESTMENT("models/facility_investment_model.onnx"),
    RND_INVESTMENT("models/rnd_investment_model.onnx"),
    MARKETING("models/marketing_tier_model.onnx"),
    RND("models/rnd_tier_classifier.onnx");

    private final String filePath;

    ModelType(String filePath) {
        this.filePath = filePath;
    }
}
