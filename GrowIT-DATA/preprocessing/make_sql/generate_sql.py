import pandas as pd
import glob
import numpy as np
import re


def to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def generate_insert_sql():
    # 1. Java AnnualData Entity 기준 "공식" DB 컬럼 목록 (최종 수정)
    # 이 목록이 유일한 기준이며, 여기에 없는 컬럼은 모두 무시됩니다.
    official_db_columns = [
        "unemployment_rate", "bsi_composite", "real_wage_growth", "growth_rate_qoq_lag1",
        "population", "gfcf_ict_real", "unemployment_rate_ma3", "bsi_composite_ma3",
        "unemployment_rate_change3", "bsi_composite_change3", "unemployment_rate_ma6",
        "bsi_composite_ma12", "real_wage_growth_change12", "unemployment_rate_std3",
        "bsi_composite_std6", "gdp", "ict_production", "ict_investment", "ccsi",
        "corporate_loan_rate", "equipment_investment_index", "productivity_index",
        "exchange_rate", "bsi_6_m_ma", "gdp_12_m_ma", "exchange_rate_12_m_std",
        "ccsi_3_m_momentum", "ict_prod_6_m_momentum", "loan_rate_lag_3_m",
        "manufacturing_productivity",
        # RND 모델 컬럼
        "application_lag1", "application_lag2", "corp_domestic_applications",
        "corp_domestic_registrations", "loan_avg", "loan_avg_lag1", "loan_avg_lag2",
        "registration_lag1", "registration_lag2", "regular_avg_wage", "rnd_total",
        "rnd_total_by_industry_app_sw", "rnd_total_by_industry_consulting",
        "rnd_total_by_industry_embedded_sw", "rnd_total_by_industry_info_svc",
        "rnd_total_by_industry_programming_svc", "rnd_total_by_industry_system_sw",
        "rnd_total_by_industry_virtual_asset", "rnd_total_lag1", "rnd_total_lag1_x",
        "rnd_total_lag1_y", "rnd_total_lag2", "rnd_total_lag2_x", "rnd_total_lag2_y",
        "service_productivity",
        # 설비투자 모델 컬럼 (한글명 매핑)
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
    ]

    # 원본 CSV의 컬럼명과 DB에 저장될 snake_case 컬럼명을 매핑
    column_mapping = {
        "corporate_loans_lagged_금리(연리%)": "corporate_loans_lagged_rate",
        "corporate_loans_lagged_금리(연리%)_lag_6": "corporate_loans_lagged_rate_lag_6",
        "corporate_loans_long_금리(연리%)": "corporate_loans_long_rate",
        "GFCF_Real_ma6_GFCF_Real_6년_이동평균": "gfcf_real_ma6_gfcf_real_6y_ma",
        "ict_수입액 (백만US$)": "ict_imports_usd",
        "ict_수출액 (백만US$)": "ict_exports_usd",
        "investment_final_전기기기 및 장치_계절조정지수 (2020=100)": "inv_final_electric_seasonal",
        "investment_final_전기기기 및 장치_원지수 (2020=100)": "inv_final_electric_raw",
        "investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)": "inv_final_computer_seasonal",
        "investment_final_컴퓨터사무용기계_원지수 (2020=100)": "inv_final_computer_raw",
        "investment_final_특수산업용기계_계절조정지수 (2020=100)": "inv_final_special_machine_seasonal",
        "investment_final_특수산업용기계_원지수 (2020=100)": "inv_final_special_machine_raw",
        "investment_lagged_계절조정지수 (2020=100)_전기기기 및 장치": "inv_lagged_electric_seasonal",
        "investment_lagged_계절조정지수 (2020=100)_컴퓨터사무용기계": "inv_lagged_computer_seasonal",
        "investment_lagged_계절조정지수 (2020=100)_특수산업용기계": "inv_lagged_special_machine_seasonal",
        "investment_lagged_원지수 (2020=100)_전기기기 및 장치": "inv_lagged_electric_raw",
        "investment_lagged_원지수 (2020=100)_컴퓨터사무용기계": "inv_lagged_computer_raw",
        "investment_lagged_원지수 (2020=100)_특수산업용기계": "inv_lagged_special_machine_raw",
        "investment_long_계절조정지수 (2020=100)_전기기기 및 장치": "inv_long_electric_seasonal",
        "investment_long_계절조정지수 (2020=100)_컴퓨터사무용기계": "inv_long_computer_seasonal",
        "investment_long_계절조정지수 (2020=100)_특수산업용기계": "inv_long_special_machine_seasonal",
        "investment_long_원지수 (2020=100)_전기기기 및 장치": "inv_long_electric_raw",
        "investment_long_원지수 (2020=100)_컴퓨터사무용기계": "inv_long_computer_raw",
        "investment_long_원지수 (2020=100)_특수산업용기계": "inv_long_special_machine_raw",
        "ma6_전기기기 및 장치": "ma6_electric",
        "ma6_컴퓨터사무용기계": "ma6_computer",
        "ma6_특수산업용기계": "ma6_special_machine",
        "ma_6년_전기기기 및 장치": "ma_6y_electric",
        "ma_6년_컴퓨터사무용기계": "ma_6y_computer",
        "ma_6년_특수산업용기계": "ma_6y_special_machine"
    }

    # 2. 모든 CSV 파일을 읽고 DB 스키마에 맞게 정제
    all_files = glob.glob("*.csv")
    monthly_dfs, yearly_dfs = [], []

    for filename in all_files:
        try:
            df = pd.read_csv(filename, encoding='utf-8')
            new_columns = {col: column_mapping.get(col, to_snake_case(col)) for col in df.columns}
            df = df.rename(columns=new_columns)

            # "공식 컬럼 목록"에 있는 컬럼만 필터링
            df = df[df.columns.intersection(['date', 'year'] + official_db_columns)]

            if 'date' in df.columns:
                df['time_idx'] = pd.to_datetime(df['date'])
                df = df.set_index('time_idx').drop(columns=['date'])
                monthly_dfs.append(df)
            elif 'year' in df.columns:
                df['time_idx'] = pd.to_datetime(df['year'], format='%Y')
                df = df.set_index('time_idx').drop(columns=['year'])
                yearly_dfs.append(df)
        except Exception as e:
            print(f"파일 처리 중 오류 '{filename}': {e}")

    # 3. 월별 데이터 처리 (통합 -> 연간 평균)
    annual_from_monthly_df = pd.DataFrame()
    if monthly_dfs:
        merged_monthly_df = pd.concat(monthly_dfs, axis=1)
        merged_monthly_df = merged_monthly_df.loc[:, ~merged_monthly_df.columns.duplicated()]
        annual_from_monthly_df = merged_monthly_df.resample('YE').mean()

    # 4. 연도별 데이터 처리 (통합)
    final_yearly_df = pd.DataFrame()
    if yearly_dfs:
        merged_yearly_df = pd.concat(yearly_dfs, axis=1)
        merged_yearly_df = merged_yearly_df.loc[:, ~merged_yearly_df.columns.duplicated()]
        final_yearly_df = merged_yearly_df

    # 5. 연도별 데이터를 기준으로 월별->연도별 데이터를 병합
    combined_df = final_yearly_df.combine_first(annual_from_monthly_df)

    # 6. 전체 기간에 대해 보간/보외 수행
    print("데이터 보간 및 보외를 시작합니다...")
    full_range_index = pd.date_range(start='1995-12-31', end='2025-12-31', freq='YE')
    final_df = combined_df.reindex(full_range_index)

    missing_mask = final_df.isnull()

    final_df = final_df.interpolate(method='linear', limit_direction='both')

    for col in final_df.columns:
        if missing_mask[col].any():
            std_dev = combined_df[col].std()
            if pd.notna(std_dev) and std_dev > 0:
                noise = np.random.normal(0, std_dev * 0.05, final_df[col].shape)
                final_df.loc[missing_mask[col], col] += noise[missing_mask[col]]

    final_df = final_df.ffill().bfill()
    final_df['year'] = final_df.index.year

    print("최종 연도별 데이터 생성 완료.")

    # 7. SQL INSERT 구문 생성
    table_name = "annual_data"
    sql_statements = []

    for index, row in final_df.iterrows():
        valid_row_data = row.dropna()
        # year 컬럼이 없으면 해당 row는 의미가 없으므로 건너뜀
        if 'year' not in valid_row_data:
            continue

        columns = ['year'] + [col for col in official_db_columns if col in valid_row_data.index]
        values = [str(int(valid_row_data['year']))] + [f"{valid_row_data[col]:.4f}" for col in columns if col != 'year']

        cols_str = ", ".join([f"`{c}`" for c in columns])
        vals_str = ", ".join(values)

        update_pairs = ", ".join([f"`{col}`=VALUES(`{col}`)" for col in columns if col != 'year'])
        sql = f"INSERT INTO {table_name} ({cols_str}) VALUES ({vals_str}) ON DUPLICATE KEY UPDATE {update_pairs};"
        sql_statements.append(sql)

    with open("data.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_statements))

    print("\n'data.sql' 파일이 성공적으로 생성되었습니다.")

    # 8. 데이터 가용성 리포트
    print("\n" + "=" * 50)
    print("          데이터 가용성 리포트 (NULL 비율)")
    print("=" * 50)

    report_columns = [col for col in official_db_columns if col in final_df.columns]
    null_report = final_df[report_columns].isnull().sum() / len(final_df) * 100

    if not null_report.any():
        print("모든 컬럼에 데이터가 성공적으로 채워졌습니다! (NULL 없음)")
    else:
        print("아래 컬럼들은 최종 데이터에서도 일부 비어있습니다 (이론상 발생하면 안 됨):")
        print(null_report[null_report > 0].round(2).to_string())
    print("=" * 50)


if __name__ == '__main__':
    generate_insert_sql()

