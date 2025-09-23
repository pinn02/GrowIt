package com.ricesnack.GrowIT_BE.saved.dto;

import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

public record SavedResponse(
        Long savedId,
        String companyName,
        Integer turn,
        Integer money,
        Integer value,
        Integer productivity,
        List<StaffInfo> staffIds,
        List<ProjectInfo> project,
        LocalDateTime data

) {
    public static SavedResponse from(Saved saved) {
        List<StaffInfo> staffInfos = saved.getHires().stream()
                .map(StaffInfo::from)
                .toList();

        List<ProjectInfo> projectInfos = saved.getProjects().stream()
                .map(ProjectInfo::from)
                .toList();

        return new SavedResponse(
                saved.getId(),
                saved.getCompanyName(),
                saved.getCurrentTurn(),
                saved.getCapital().intValue(),
                saved.getCompanyValue().intValue(),
                saved.getProductivity(),
                staffInfos,
                projectInfos,
                saved.getSaveDate()
        );
    }
}
