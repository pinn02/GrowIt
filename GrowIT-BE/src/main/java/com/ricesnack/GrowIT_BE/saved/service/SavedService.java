package com.ricesnack.GrowIT_BE.saved.service;

import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;

import java.util.List;

public interface SavedService {
    List<SavedResponse> findRecentSaves(Long memberId);
    void deleteSavedById(Long savedId, Long memberId);
    void createNewSave(String companyName, Member member);
}
