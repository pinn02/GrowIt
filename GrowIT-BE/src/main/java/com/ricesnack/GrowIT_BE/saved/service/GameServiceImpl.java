package com.ricesnack.GrowIT_BE.saved.service;

import com.ricesnack.GrowIT_BE.member.domain.CustomOAuth2UserDetails;
import com.ricesnack.GrowIT_BE.member.domain.Member;
import com.ricesnack.GrowIT_BE.member.repository.MemberRepository;
import com.ricesnack.GrowIT_BE.saved.domain.*;
import com.ricesnack.GrowIT_BE.saved.dto.*;
import com.ricesnack.GrowIT_BE.saved.repository.HireRepository;
import com.ricesnack.GrowIT_BE.saved.repository.ProjectRepository;
import com.ricesnack.GrowIT_BE.saved.repository.SavedRepository;
import com.ricesnack.GrowIT_BE.saved.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {
    private final MemberRepository memberRepository;
    private final SavedRepository savedRepository;
    private final StaffRepository staffRepository;
    private final HireRepository hireRepository;
    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public SavedResponse createNewSave(
            @AuthenticationPrincipal CustomOAuth2UserDetails userDetails,
            GameCreateRequest request) {
        Member member = userDetails.getMember();

        Saved newSave = Saved.builder()
                .member(member)
                .companyName(request.companyName())
                .currentTurn(request.turn())
                .capital(request.money())
                .companyValue(request.value())
                .productivity(request.productivity())
                .build();

        savedRepository.save(newSave);

        if (request.hire() != null && !request.hire().isEmpty()) {
            for (HireRequest hireInfo : request.hire()) {
                Staff newStaff = new Staff(hireInfo.name(), hireInfo.productivity());
                staffRepository.save(newStaff);
                Hire newHire = new Hire(newSave, newStaff);
                hireRepository.save(newHire);
            }
        }

        if (request.project() != null && !request.project().isEmpty()) {
            for (ProjectRequest projectInfo : request.project()) {
                ProjectType type = ProjectType.valueOf(projectInfo.type());
                Project newProject = new Project(newSave, type, projectInfo.endTurn());
                projectRepository.save(newProject);
            }
        }

        long employeeCount = (request.hire() != null ? request.hire().size() : 0) + 1; // +1은 대표(본인)
        newSave.updateEmployeeCount(employeeCount);

        return SavedResponse.from(savedRepository.findByIdWithDetails(newSave.getId()).get());
    }

}
