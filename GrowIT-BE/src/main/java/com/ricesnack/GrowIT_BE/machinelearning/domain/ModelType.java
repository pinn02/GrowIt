package com.ricesnack.GrowIT_BE.machinelearning.domain;

import java.util.List;

public enum ModelType {

    HIRING("models/hiring_tier_model.onnx", List.of(
            "unemployment_rate", "BSI_Composite", "real_wage_growth", "growth_rate_qoq_lag1",
            "population", "GFCF_ICT_Real", "unemployment_rate_MA3", "BSI_Composite_MA3",
            "unemployment_rate_change3", "BSI_Composite_change3", "unemployment_rate_MA6",
            "BSI_Composite_MA12", "real_wage_growth_change12", "unemployment_rate_std3",
            "BSI_Composite_std6"
    )),
    PROJECT("models/project_tier_model.onnx", List.of(
            "GDP", "ICT_Production", "ICT_Investment", "CCSI", "Corporate_Loan_Rate",
            "Equipment_Investment_Index", "productivity_index", "Exchange_Rate", "BSI_6M_MA",
            "GDP_12M_MA", "Exchange_Rate_12M_Std", "CCSI_3M_Momentum", "ICT_Prod_6M_Momentum",
            "Loan_Rate_Lag_3M"
    )),
    FACILITY_INVESTMENT("models/facility_investment_model.onnx", List.of(
            "GDP", "Corporate_Loan_Rate", "BSI_Composite", "Exchange_Rate", "ICT_Investment", "GFCF_ICT_Real"
    )),
    MARKETING("models/marketing_tier_model.onnx", List.of(
            "GDP", "CCSI", "Exchange_Rate", "Ad_Sentiment_DI"
    )),
    RND("models/rnd_tier_classifier.onnx", List.of(
            "GDP", "ICT_Production", "Corporate_Loan_Rate", "BSI_Composite", "manufacturing_productivity"
    ));

    private final String filePath;
    private final List<String> featureOrder;

    ModelType(String filePath, List<String> featureOrder) {
        this.filePath = filePath;
        this.featureOrder = featureOrder;
    }

    public String getFilePath() { return filePath; }
    public List<String> getFeatureOrder() { return featureOrder; }
}
