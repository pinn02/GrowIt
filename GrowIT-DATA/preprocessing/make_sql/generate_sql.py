import pandas as pd
import glob
import numpy as np


def generate_insert_sql():
    # 1. 5개 모델에 필요한 모든 컬럼 목록 (중복 제거)
    all_features = sorted(list(set([
        # HIRING
        "unemployment_rate", "BSI_Composite", "real_wage_growth", "growth_rate_qoq_lag1",
        "population", "GFCF_ICT_Real", "unemployment_rate_MA3", "BSI_Composite_MA3",
        "unemployment_rate_change3", "BSI_Composite_change3", "unemployment_rate_MA6",
        "BSI_Composite_MA12", "real_wage_growth_change12", "unemployment_rate_std3", "BSI_Composite_std6",
        # PROJECT & MARKETING
        "GDP", "ICT_Production", "ICT_Investment", "CCSI", "Corporate_Loan_Rate",
        "productivity_index", "Exchange_Rate", "BSI_6M_MA", "GDP_12M_MA",
        "Exchange_Rate_12M_Std", "CCSI_3M_Momentum", "ICT_Prod_6M_Momentum", "Loan_Rate_Lag_3M",
        "Equipment_Investment_Index",
        # FACILITY_INVESTMENT
        "corporate_loans_lagged_금리(연리%)", "corporate_loans_lagged_금리(연리%)_lag_6",
        "corporate_loans_long_금리(연리%)", "GFCF_ICT_Real_long_GFCF_Real", "GFCF_Real_ma6_GFCF_Real",
        "GFCF_Real_ma6_GFCF_Real_6년_이동평균", "ict_수입액 (백만US$)", "ict_수출액 (백만US$)", "info_comm_value",
        "investment_final_전기기기 및 장치_계절조정지수 (2020=100)", "investment_final_전기기기 및 장치_원지수 (2020=100)",
        "investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)", "investment_final_컴퓨터사무용기계_원지수 (2020=100)",
        "investment_final_특수산업용기계_계절조정지수 (2020=100)", "investment_final_특수산업용기계_원지수 (2020=100)",
        "investment_lagged_계절조정지수 (2020=100)_전기기기 및 장치", "investment_lagged_계절조정지수 (2020=100)_컴퓨터사무용기계",
        "investment_lagged_계절조정지수 (2020=100)_특수산업용기계", "investment_lagged_원지수 (2020=100)_전기기기 및 장치",
        "investment_lagged_원지수 (2020=100)_컴퓨터사무용기계", "investment_lagged_원지수 (2020=100)_특수산업용기계",
        "investment_long_계절조정지수 (2020=100)_전기기기 및 장치", "investment_long_계절조정지수 (2020=100)_컴퓨터사무용기계",
        "investment_long_계절조정지수 (2020=100)_특수산업용기계", "investment_long_원지수 (2020=100)_전기기기 및 장치",
        "investment_long_원지수 (2020=100)_컴퓨터사무용기계", "investment_long_원지수 (2020=100)_특수산업용기계",
        "ma6_전기기기 및 장치", "ma6_컴퓨터사무용기계", "ma6_특수산업용기계", "ma_6년_전기기기 및 장치",
        "ma_6년_컴퓨터사무용기계", "ma_6년_특수산업용기계", "total_assets", "total_investment", "CPI",
        # RND
        "application_lag1", "application_lag2", "corp_domestic_applications", "corp_domestic_registrations",
        "loan_avg", "loan_avg_lag1", "loan_avg_lag2", "manufacturing_productivity", "registration_lag1",
        "registration_lag2", "regular_avg_wage", "rnd_total", "rnd_total_by_industry_app_sw",
        "rnd_total_by_industry_consulting", "rnd_total_by_industry_embedded_sw",
        "rnd_total_by_industry_info_svc", "rnd_total_by_industry_programming_svc",
        "rnd_total_by_industry_system_sw", "rnd_total_by_industry_virtual_asset",
        "rnd_total_lag1", "rnd_total_lag1_x", "rnd_total_lag1_y", "rnd_total_lag2",
        "rnd_total_lag2_x", "rnd_total_lag2_y", "service_productivity"
    ])))

    # 2. 모든 CSV 파일을 읽어 하나의 데이터프레임으로 합치기
    # 이 스크립트가 있는 폴더의 모든 csv를 읽습니다.
    all_files = glob.glob("*.csv")
    df_list = []

    for filename in all_files:
        try:
            df = pd.read_csv(filename)
            # 날짜 컬럼을 찾아 datetime 형식으로 변환
            if 'date' in df.columns:
                df['time_idx'] = pd.to_datetime(df['date'])
            elif 'Date' in df.columns:
                df['time_idx'] = pd.to_datetime(df['Date'])
            elif 'year' in df.columns:
                df['time_idx'] = pd.to_datetime(df['year'], format='%Y')
            else:  # 첫 번째 컬럼을 날짜로 간주
                df['time_idx'] = pd.to_datetime(df.iloc[:, 0])

            df = df.set_index('time_idx')
            df_list.append(df)
        except Exception as e:
            print(f"파일 처리 중 오류 '{filename}': {e}")

    # 모든 데이터프레임을 컬럼 기준으로 합치기
    merged_df = pd.concat(df_list, axis=1)

    # 중복된 컬럼은 첫 번째 것만 남김
    merged_df = merged_df.loc[:, ~merged_df.columns.duplicated()]

    # 필요한 컬럼만 선택
    available_cols = [col for col in all_features if col in merged_df.columns]
    final_df = merged_df[available_cols].copy()

    # 모든 컬럼을 숫자로 변환 (변환 불가 시 NaN 처리)
    for col in final_df.columns:
        final_df[col] = pd.to_numeric(final_df[col], errors='coerce')

    # 3. 월별 -> 연도별 평균 데이터로 변환
    annual_avg_df = final_df.resample('Y').mean()
    annual_avg_df['year'] = annual_avg_df.index.year

    print("연도별 평균 데이터 생성 완료:")
    print(annual_avg_df.head())

    # 4. SQL INSERT 구문 생성
    table_name = "annual_data"
    sql_statements = []

    for index, row in annual_avg_df.iterrows():
        columns = ['year'] + [col for col in available_cols]
        values = [str(row['year'])]

        for col in available_cols:
            value = row[col]
            if pd.isna(value):
                values.append("NULL")
            else:
                values.append(f"{value:.4f}")  # 소수점 4자리까지

        cols_str = ", ".join([f"`{c}`" for c in columns])
        vals_str = ", ".join(values)

        sql = f"INSERT INTO {table_name} ({cols_str}) VALUES ({vals_str});"
        sql_statements.append(sql)

    # 5. data.sql 파일로 저장
    with open("data.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_statements))

    print("\n'data.sql' 파일이 성공적으로 생성되었습니다.")


if __name__ == '__main__':
    generate_insert_sql()


