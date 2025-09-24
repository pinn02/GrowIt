package com.ricesnack.GrowIT_BE.saved.service;

import com.ricesnack.GrowIT_BE.error.CustomException;
import com.ricesnack.GrowIT_BE.error.ErrorCode;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.member.repository.MemberRepository;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import com.ricesnack.GrowIT_BE.saved.dto.ProjectInfo;
import com.ricesnack.GrowIT_BE.saved.dto.SavedResponse;
import com.ricesnack.GrowIT_BE.saved.dto.StaffInfo;
import com.ricesnack.GrowIT_BE.saved.repository.SavedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedServiceImpl implements SavedService {

    private final SavedRepository savedRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SavedResponse> findRecentSaves(Long memberId) {

            Pageable pageRequest = PageRequest.of(0, 3, Sort.by(Sort.Direction.DESC, "saveDate"));
            Page<Saved> savedPage = savedRepository.findByMember_MemberId(memberId, pageRequest); // findByMember_MemberId 사용

            return savedPage.getContent().stream()
                    .map(SavedResponse::from)
                    .toList();
    }


    @Transactional
    public void deleteSavedById(Long saveId, Long memberId) {

        Saved saved = savedRepository.findByIdWithDetailsAndMemberId(saveId, memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.SAVE_NOT_FOUND_OR_NO_PERMISSION));

        savedRepository.delete(saved);
    }

}
