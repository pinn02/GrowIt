package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;

@Getter
public enum Event {
    // ===== 고용 =====
    LABOR_LAW("노동법 개정", "직원 만족도 상승", EventSubCategory.WORK_POLICY, 0, 5, 10),
    REMOTE_WORK("재택 근무 정착", "재택 근무 시스템 정착", EventSubCategory.WORK_POLICY, 0, 0, 20),

    KEY_TALENT_LOSS("핵심 인력 이탈", "대체 인력 채용", EventSubCategory.STAFF_CHANGE, -10, 0, -30),
    UNION_STRIKE("노조 파업", "임금 인상", EventSubCategory.STAFF_CHANGE, -30, 0, 30),
    PANDEMIC("전염병 확산", "재택 근무 전환", EventSubCategory.STAFF_CHANGE, -10, -10, -15),

    // ===== 마케팅 =====
    SNS_CHALLENGE("SNS 챌린지 성공", "바이럴 마케팅 확산", EventSubCategory.VIRAL_PR, 30, 30, 10),
    TECH_ANNOUNCEMENT("신기술 발표 성공", "기술 발표 주목", EventSubCategory.VIRAL_PR, 0, 20, 0),

    GLOBAL_AWARD("세계적 수상", "글로벌 진출", EventSubCategory.BRAND, 0, 50, 20),
    CSR_ACTIVITY("지역 사회 공헌 활동", "사회적 이미지 강화", EventSubCategory.BRAND, 0, 10, 0),

    PRODUCT_ISSUE("제품 이슈 언론 보도", "브랜드 신뢰 하락", EventSubCategory.RISK, 0, -20, 0),
    CLASS_ACTION("기업 간 집단 소송", "법적 분쟁", EventSubCategory.RISK, 0, -15, 0),

    // ===== 투자 =====
    GOV_GRANT("정부 지원금 획득", "지원금 수령", EventSubCategory.CAPITAL, 50, 0, 10),
    VC_INVESTMENT("벤처 투자 유치 성공", "VC 투자", EventSubCategory.CAPITAL, 0, 30, 0),

    RISK_INVEST_SUCCESS("리스크 투자 성공", "투자 성공", EventSubCategory.RISK_INVEST, 50, 30, 10),
    RISK_INVEST_FAIL("리스크 투자 실패", "투자 실패", EventSubCategory.RISK_INVEST, -30, 0, -10),

    TAX_AUDIT("세무조사", "세무조사 비용", EventSubCategory.FIN_RISK, -30, 0, 0),
    NATURAL_DISASTER("자연재해/팬데믹", "비상 대응", EventSubCategory.FIN_RISK, -30, -50, 0),

    // ===== 프로젝트 =====
    PATENT("특허 등록 성공", "특허 사업화", EventSubCategory.TECH_RND, 10, 50, 0),
    BIG_PARTNERSHIP("대기업 협업", "파트너십 체결", EventSubCategory.TECH_RND, 30, 30, 10),

    DATA_LEAK("데이터 유출 사고", "보안 강화", EventSubCategory.SECURITY, -30, 0, -10),
    SYSTEM_OUTAGE("IT 시스템 마비", "서버 다운", EventSubCategory.SECURITY, 0, -20, 0),
    DDOS_ATTACK("디도스 공격", "외부 공격", EventSubCategory.SECURITY, 0, -10, -10);

    private final String eventName;
    private final String action;
    private final EventSubCategory subCategory;

    private final int capitalDelta;
    private final int companyValueDelta;
    private final int productivityDelta;

    Event(String eventName, String action, EventSubCategory subCategory,
          int capitalDelta, int companyValueDelta, int productivityDelta) {
        this.eventName = eventName;
        this.action = action;
        this.subCategory = subCategory;
        this.capitalDelta = capitalDelta;
        this.companyValueDelta = companyValueDelta;
        this.productivityDelta = productivityDelta;
    }
}
