package com.ricesnack.GrowIT_BE.saved.dto;

import com.ricesnack.GrowIT_BE.saved.domain.Project;

public record ProjectInfo(
        Long id,
        Integer endTurn
) {
    public static ProjectInfo from(Project project) {
        return new ProjectInfo(project.getId(), project.getEndTurn());
    }
}
