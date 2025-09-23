package com.ricesnack.GrowIT_BE.machinelearning.config;

import com.ricesnack.GrowIT_BE.machinelearning.domain.ModelType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Configuration
public class ModelFeatureConfig {

    @Bean
    public Map<ModelType, List<String>> modelFeatures() {
        Map<ModelType, List<String>> features = new EnumMap<>(ModelType.class);

        // HIRING 모델: 확인된 15개 피처 목록으로 수정
        features.put(ModelType.HIRING, List.of(
                "unemployment_rate", "bsi_composite", "real_wage_growth", "growth_rate_qoq_lag1",
                "population", "gfcf_ict_real", "unemployment_rate_ma3", "bsi_composite_ma3",
                "unemployment_rate_change3", "bsi_composite_change3", "unemployment_rate_ma6",
                "bsi_composite_ma12", "real_wage_growth_change12", "unemployment_rate_std3",
                "bsi_composite_std6"
        ));

        // MARKETING 모델: 확인된 16개 피처 목록으로 수정 (엔티티에 retail_sales_index, kospi 필드 추가 필요)
        features.put(ModelType.MARKETING, List.of(
                "gdp",
                "ict_production",
                "ict_investment",
                "ccsi",
                "bsi_composite",
                "corporate_loan_rate",
                "equipment_investment_index",
                "productivity_index",
                "exchange_rate",
                "bsi_6m_ma",
                "gdp_12m_ma",
                "exchange_rate_12m_std",
                "ccsi_3m_momentum",
                "ict_prod_6m_momentum",
                "loan_rate_lag_3m",
                "ad_sentiment_di" // 새로운 피처
        ));

        // RND 모델: 모델이 요구하는 피처 목록이 맞는지 확인이 필요합니다.
        features.put(ModelType.RND, List.of(
                "application_lag1", "application_lag2", "corp_domestic_applications",
                "corp_domestic_registrations", "loan_avg", "loan_avg_lag1", "loan_avg_lag2",
                "registration_lag1", "registration_lag2", "regular_avg_wage", "rnd_total",
                "rnd_total_by_industry_app_sw", "rnd_total_by_industry_consulting",
                "rnd_total_by_industry_embedded_sw", "rnd_total_by_industry_info_svc",
                "rnd_total_by_industry_programming_svc", "rnd_total_by_industry_system_sw",
                "rnd_total_by_industry_virtual_asset", "rnd_total_lag1", "rnd_total_lag1x",
                "rnd_total_lag1y", "rnd_total_lag2", "rnd_total_lag2x", "rnd_total_lag2y",
                "service_productivity"
        ));

        // FACILITY_INVESTMENT 모델: 모델이 요구하는 피처 목록이 맞는지 확인이 필요합니다.
        features.put(ModelType.FACILITY_INVESTMENT, List.of(
                "corporate_loans_lagged_rate", "corporate_loans_lagged_rate_lag_6",
                "corporate_loans_long_rate", "gfcf_ict_real_long_gfcf_real",
                "gfcf_real_ma6_gfcf_real", "gfcf_real_ma6_gfcf_real_6y_ma", "ict_imports_usd",
                "ict_exports_usd", "info_comm_value", "inv_final_electric_seasonal",
                "inv_final_electric_raw", "inv_final_computer_seasonal", "inv_final_computer_raw",
                "inv_final_special_machine_seasonal", "inv_final_special_machine_raw",
                "inv_lagged_electric_seasonal", "inv_lagged_computer_seasonal",
                "inv_lagged_special_machine_seasonal", "inv_lagged_electric_raw",
                "inv_lagged_computer_raw", "inv_lagged_special_machine_raw",
                "inv_long_electric_seasonal", "inv_long_computer_seasonal",
                "inv_long_special_machine_seasonal", "inv_long_electric_raw",
                "inv_long_computer_raw", "inv_long_special_machine_raw", "ma_6_electric",
                "ma_6_computer", "ma_6_special_machine", "ma_6y_electric", "ma_6y_computer",
                "ma_6y_special_machine", "total_assets", "total_investment", "cpi"
        ));

        // PROJECT 모델: 피처 목록 확인 후 채워주세요.
        features.put(ModelType.PROJECT, List.of(
                // TODO: PROJECT 모델 학습에 사용된 피처 목록을 여기에 정확히 입력해야 합니다.
        ));

        return features;
    }
}