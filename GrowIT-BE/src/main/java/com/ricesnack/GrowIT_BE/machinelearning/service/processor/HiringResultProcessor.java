package com.ricesnack.GrowIT_BE.machinelearning.service.processor;

import com.ricesnack.GrowIT_BE.machinelearning.dto.HiringPredictionResponse;
import com.ricesnack.GrowIT_BE.machinelearning.dto.PredictionRequestDto;
import com.ricesnack.GrowIT_BE.saved.domain.Hire;
import com.ricesnack.GrowIT_BE.saved.domain.Saved;
import com.ricesnack.GrowIT_BE.saved.domain.Staff;
import com.ricesnack.GrowIT_BE.saved.repository.SavedRepository;
import com.ricesnack.GrowIT_BE.saved.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class HiringResultProcessor implements PredictionResultProcessor {

    private final SavedRepository savedRepository;
    private final StaffRepository staffRepository;

    private static final BigDecimal BASE_HIRING_COST = new BigDecimal("100");
    private static final BigDecimal COMPANY_VALUE_WEIGHT = new BigDecimal("0.005");

    @Override
    @Transactional
    public Object process(Map<Long, Float> probabilities, PredictionRequestDto requestDto) {
        // 1. DB에서 현재 게임 상태와 고용할 직원 정보 조회
        Saved saved = savedRepository.findById(requestDto.savedId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 세이브 파일을 찾을 수 없습니다."));

        List<Staff> staffsToHire = staffRepository.findAllById(requestDto.hireIds());

        // 2. 머신러닝 결과로 얻게 될 생산성 계산
        Map.Entry<Long, Float> chosenEntry = selectTierBasedOnProbabilities(probabilities);
        String tier = mapLabelToTier(chosenEntry.getKey());
        float probability = chosenEntry.getValue();

        int gainedProductivity = switch (tier) {
            case "S" -> getRandomValueInRange(40, 60);
            case "A" -> getRandomValueInRange(20, 30);
            case "B" -> getRandomValueInRange(10, 20);
            default -> getRandomValueInRange(5, 10);
        };

        // 3. 고용 비용 계산
        BigDecimal costPerPerson = BASE_HIRING_COST.add(saved.getCompanyValue().multiply(COMPANY_VALUE_WEIGHT));
        BigDecimal totalCost = costPerPerson.multiply(new BigDecimal(staffsToHire.size()));

        // 4. 자본 확인
        if (saved.getCapital().compareTo(totalCost) < 0) {
            throw new IllegalStateException("자본이 부족하여 고용을 진행할 수 없습니다.");
        }

        // 5. 최종 자본 및 생산성 계산
        BigDecimal finalCapital = saved.getCapital().subtract(totalCost);
        int finalProductivity = saved.getProductivity() + gainedProductivity;

        // 6. Saved 엔티티의 updateInfo 메서드를 사용하여 상태 업데이트
        saved.updateStateWithinTurn(finalCapital, finalProductivity);

        // 7. hires 리스트에 새로운 Hire 객체를 추가 (CascadeType.ALL에 의해 자동 저장됨)
        for (Staff staff : staffsToHire) {
            Hire newHire = new Hire(saved, staff);
            saved.getHires().add(newHire);
        }

        // 8. 변경된 직원 수 업데이트
        saved.updateEmployeeCount(saved.getHires().size());

        // 9. 결과 DTO를 생성하여 반환
        List<Long> hiredStaffIds = staffsToHire.stream().map(Staff::getId).collect(Collectors.toList());

        return HiringPredictionResponse.builder()
                .probability((int) (probability * 100))
                .productivity(gainedProductivity)
                .totalProductivity(finalProductivity)
                .spentCapital(totalCost)
                .totalCapital(finalCapital)
                .hireIds(hiredStaffIds)
                .build();
    }



}