package com.ricesnack.GrowIT_BE.machinelearning.domain;

import jakarta.persistence.Entity;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.List;

public class ScenarioData implements Serializable {

    private static final long serialVersionUID = 1L;
    private final String scenarioId;
    private final List<AnnualData> timeSeriesData;
    private int currentTurn;

    public ScenarioData(String scenarioId, List<AnnualData> timeSeriesData) {
        this.scenarioId = scenarioId;
        this.timeSeriesData = timeSeriesData;
        this.currentTurn = 0; // 게임은 항상 0번째 턴(첫 번째 연도)에서 시작
    }

    public AnnualData getCurrentYearData() {
        if (timeSeriesData == null || timeSeriesData.isEmpty() || currentTurn >= timeSeriesData.size()) {
            return null;
        }
        return timeSeriesData.get(currentTurn);
    }
}
