package com.ricesnack.GrowIT_BE.machinelearning.domain;

import lombok.Getter;

@Getter
public enum ModelType {

    HIRING("models/hiring_model.onnx"),
    MARKETING("models/marketing_model.onnx"),
    FACILITY_INVESTMENT("models/facility_investment_model.onnx"),
    RND("models/rnd_model.onnx"),
    PROJECT("models/project_model.onnx");

    private final String filePath;

    ModelType(String filePath) {
        this.filePath = filePath;
    }
}
