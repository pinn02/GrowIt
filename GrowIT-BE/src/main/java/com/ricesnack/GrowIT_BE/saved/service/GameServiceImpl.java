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

        System.out.println("========= gameService.createNewSave 메소드 시작 =========");

        try {
            Member member = userDetails.getMember();
            System.out.println("1. Member 객체 가져오기 성공: " + member.getEmail());

            Saved newSave = Saved.builder()
                    .member(member)
                    .companyName(request.companyName())
                    .currentTurn(request.turn())
                    .capital(request.money())
                    .companyValue(request.value())
                    .productivity(request.productivity())
                    .build();
            System.out.println("2. Saved 객체 생성 성공");

            savedRepository.save(newSave);
            System.out.println("3. Saved 엔티티 저장 성공! ID: " + newSave.getId());

            if (request.hire() != null && !request.hire().isEmpty()) {
                System.out.println("4. 직원(Hire) 정보 처리 시작");
                for (HireRequest hireInfo : request.hire()) {
                    Staff newStaff = new Staff(hireInfo.name(), hireInfo.productivity());
                    staffRepository.save(newStaff);
                    Hire newHire = new Hire(newSave, newStaff);
                    hireRepository.save(newHire);
                }
                System.out.println("5. 직원(Hire) 정보 처리 완료");
            }

            if (request.project() != null && !request.project().isEmpty()) {
                System.out.println("6. 프로젝트(Project) 정보 처리 시작");
                for (ProjectRequest projectInfo : request.project()) {
                    ProjectType type = ProjectType.valueOf(projectInfo.type());
                    Project newProject = new Project(newSave, type, projectInfo.endTurn());
                    projectRepository.save(newProject);
                }
                System.out.println("7. 프로젝트(Project) 정보 처리 완료");
            }

            long employeeCount = (request.hire() != null ? request.hire().size() : 0) + 1;
            newSave.updateEmployeeCount(employeeCount);
            System.out.println("8. 직원 수 업데이트 완료");

            System.out.println("========= gameService.createNewSave 메소드 정상 종료 =========");
            return SavedResponse.from(savedRepository.findByIdWithDetails(newSave.getId()).get());

        } catch (Exception e) {
            System.out.println("!!!!!!!!!! 서비스 메소드 실행 중 예외 발생 !!!!!!!!!!");
            e.printStackTrace(); // 예외의 전체 내용을 콘솔에 출력
            throw e; // 예외를 다시 던져서 트랜잭션 롤백이 되도록 함
        }
    }
}
