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

        features.put(ModelType.HIRING, List.of(
                "unemployment_rate", "bsi_composite", "real_wage_growth", "growth_rate_qoq_lag1",
                "population", "gfcf_ict_real", "unemployment_rate_ma3", "bsi_composite_ma3",
                "unemployment_rate_change3", "bsi_composite_change3", "unemployment_rate_ma6",
                "bsi_composite_ma12", "real_wage_growth_change12", "unemployment_rate_std3",
                "bsi_composite_std6", "gdp", "ict_production", "ict_investment", "ccsi",
                "corporate_loan_rate", "equipment_investment_index", "productivity_index",
                "exchange_rate", "bsi_6_m_ma", "gdp_12_m_ma", "exchange_rate_12_m_std",
                "ccsi_3_m_momentum", "ict_prod_6_m_momentum", "loan_rate_lag_3_m",
                "manufacturing_productivity"
        ));

        features.put(ModelType.MARKETING, List.of(
                "unemployment_rate", "bsi_composite", "real_wage_growth", "growth_rate_qoq_lag1",
                "population", "gfcf_ict_real", "unemployment_rate_ma3", "bsi_composite_ma3",
                "unemployment_rate_change3", "bsi_composite_change3", "unemployment_rate_ma6",
                "bsi_composite_ma12", "real_wage_growth_change12", "unemployment_rate_std3",
                "bsi_composite_std6", "gdp", "ict_production", "ict_investment", "ccsi",
                "corporate_loan_rate", "equipment_investment_index", "productivity_index",
                "exchange_rate", "bsi_6_m_ma", "gdp_12_m_ma", "exchange_rate_12_m_std",
                "ccsi_3_m_momentum", "ict_prod_6_m_momentum", "loan_rate_lag_3_m",
                "manufacturing_productivity"
        ));

        features.put(ModelType.RND, List.of(
                "application_lag1", "application_lag2", "corp_domestic_applications",
                "corp_domestic_registrations", "loan_avg", "loan_avg_lag1", "loan_avg_lag2",
                "registration_lag1", "registration_lag2", "regular_avg_wage", "rnd_total",
                "rnd_total_by_industry_app_sw", "rnd_total_by_industry_consulting",
                "rnd_total_by_industry_embedded_sw", "rnd_total_by_industry_info_svc",
                "rnd_total_by_industry_programming_svc", "rnd_total_by_industry_system_sw",
                "rnd_total_by_industry_virtual_asset", "rnd_total_lag1", "rnd_total_lag1_x",
                "rnd_total_lag1_y", "rnd_total_lag2", "rnd_total_lag2_x", "rnd_total_lag2_y",
                "service_productivity"
        ));

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
                "inv_long_computer_raw", "inv_long_special_machine_raw", "ma6_electric",
                "ma6_computer", "ma6_special_machine", "ma_6y_electric", "ma_6y_computer",
                "ma_6y_special_machine", "total_assets", "total_investment", "cpi"
        ));

        return features;
    }
}
