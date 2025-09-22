package com.ricesnack.GrowIT_BE.data.domain;

import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;

import java.io.Serializable;
import java.util.List;

public class ScenarioData implements Serializable {

    private static final long serialVersionUID = 1L;
    private final String scenarioId;
    private final List<AnnualData> timeSeriesData;

    public ScenarioData(String scenarioId, List<AnnualData> timeSeriesData) {
        this.scenarioId = scenarioId;
        this.timeSeriesData = timeSeriesData;
    }

    public String getScenarioId() {
        return scenarioId;
    }

    public List<AnnualData> getTimeSeriesData() {
        return timeSeriesData;
    }
}
