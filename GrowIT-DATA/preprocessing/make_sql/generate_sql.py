import pandas as pd
import numpy as np
import re


def to_snake_case(name):
    """
    Spring Data JPA의 Physical Naming Strategy를 더 정확하게 모방하는 수정된 함수.
    - camelCase -> camel_case (e.g., unemploymentRate -> unemployment_rate)
    - acronyms -> acronym_word (e.g., bsi6MMa -> bsi_6m_ma)
    - letters and numbers -> letter_number (e.g., applicationLag1 -> application_lag_1)
    - numbers and letters -> numberLetter (e.g., rndTotalLag1X -> rnd_total_lag_1x)
    """
    # 1. 대문자 연속 후 소문자가 나올 때 분리 (e.g., bsi6MMa -> bsi6M_Ma)
    name = re.sub(r'(?<=[A-Z])(?=[A-Z][a-z])', '_', name)
    # 2. 소문자 뒤에 대문자가 나올 때 분리 (e.g., unemploymentRate -> unemployment_Rate)
    name = re.sub(r'(?<=[a-z])(?=[A-Z])', '_', name)
    # 3. 문자 뒤에 숫자가 나올 때 분리 (e.g., applicationLag1 -> applicationLag_1)
    name = re.sub(r'(?<=[a-zA-Z])(?=[0-9])', '_', name)
    return name.lower()


def generate_insert_sql():
    # 1. Java AnnualData Entity의 필드명을 기준으로 생성된 "공식" DB 컬럼 목록.
    # 이 목록이 유일한 기준이며, 모든 데이터는 이 스키마에 맞춰집니다.
    java_entity_fields = [
        "year", "unemploymentRate", "bsiComposite", "realWageGrowth", "growthRateQoqLag1",
        "population", "gfcfIctReal", "unemploymentRateMa3", "bsiCompositeMa3",
        "unemploymentRateChange3", "bsiCompositeChange3", "unemploymentRateMa6",
        "bsiCompositeMa12", "realWageGrowthChange12", "unemploymentRateStd3",
        "bsiCompositeStd6", "gdp", "ictProduction", "ictInvestment", "ccsi",
        "corporateLoanRate", "equipmentInvestmentIndex", "productivityIndex",
        "exchangeRate", "bsi6MMa", "gdp12MMa", "exchangeRate12MStd",
        "ccsi3MMomentum", "ictProd6MMomentum", "loanRateLag3M",
        "manufacturingProductivity", "applicationLag1", "applicationLag2",
        "corpDomesticApplications", "corpDomesticRegistrations", "loanAvg",
        "loanAvgLag1", "loanAvgLag2", "registrationLag1", "registrationLag2",
        "regularAvgWage", "rndTotal", "rndTotalByIndustryAppSw",
        "rndTotalByIndustryConsulting", "rndTotalByIndustryEmbeddedSw",
        "rndTotalByIndustryInfoSvc", "rndTotalByIndustryProgrammingSvc",
        "rndTotalByIndustrySystemSw", "rndTotalByIndustryVirtualAsset",
        "rndTotalLag1", "rndTotalLag1X", "rndTotalLag1Y", "rndTotalLag2",
        "rndTotalLag2X", "rndTotalLag2Y", "serviceProductivity",
        "corporateLoansLaggedRate", "corporateLoansLaggedRateLag6",
        "corporateLoansLongRate", "gfcfIctRealLongGfcfReal",
        "gfcfRealMa6GfcfReal", "gfcfRealMa6GfcfReal6yMa", "ictImportsUsd",
        "ictExportsUsd", "infoCommValue", "invFinalElectricSeasonal",
        "invFinalElectricRaw", "invFinalComputerSeasonal", "invFinalComputerRaw",
        "invFinalSpecialMachineSeasonal", "invFinalSpecialMachineRaw",
        "invLaggedElectricSeasonal", "invLaggedComputerSeasonal",
        "invLaggedSpecialMachineSeasonal", "invLaggedElectricRaw",
        "invLaggedComputerRaw", "invLaggedSpecialMachineRaw",
        "invLongElectricSeasonal", "invLongComputerSeasonal",
        "invLongSpecialMachineSeasonal", "invLongElectricRaw",
        "invLongComputerRaw", "invLongSpecialMachineRaw", "ma6Electric",
        "ma6Computer", "ma6SpecialMachine", "ma6yElectric", "ma6yComputer",
        "ma6ySpecialMachine", "totalAssets", "totalInvestment", "cpi"
    ]
    official_db_columns = [to_snake_case(f) for f in java_entity_fields]

    # 원본 CSV의 컬럼명과 DB에 저장될 snake_case 컬럼명을 매핑 (수동 지정)
    column_mapping = {
        # 대소문자/특수문자가 포함된 원본 CSV 컬럼명 -> 최종 DB 컬럼명
        'Date': 'date',
        'BSI_Composite': 'bsi_composite',
        'GFCF_ICT_Real': 'gfcf_ict_real',
        'GDP': 'gdp',
        'ICT_Production': 'ict_production',
        'ICT_Investment': 'ict_investment',
        'CCSI': 'ccsi',
        'Corporate_Loan_Rate': 'corporate_loan_rate',
        'Equipment_Investment_Index': 'equipment_investment_index',
        'Exchange_Rate': 'exchange_rate',
        'BSI_6M_MA': to_snake_case('bsi6MMa'),
        'GDP_12M_MA': to_snake_case('gdp12MMa'),
        'Exchange_Rate_12M_Std': to_snake_case('exchangeRate12MStd'),
        'CCSI_3M_Momentum': to_snake_case('ccsi3MMomentum'),
        'ICT_Prod_6M_Momentum': to_snake_case('ictProd6MMomentum'),
        'Loan_Rate_Lag_3M': to_snake_case('loanRateLag3M'),
        "corporate_loans_lagged_금리(연리%)": "corporate_loans_lagged_rate",
        "corporate_loans_lagged_금리(연리%)_lag_6": "corporate_loans_lagged_rate_lag6",
        "corporate_loans_long_금리(연리%)": "corporate_loans_long_rate",
        "GFCF_ICT_Real_long_GFCF_Real": "gfcf_ict_real_long_gfcf_real",
        "GFCF_Real_ma6_GFCF_Real": "gfcf_real_ma6_gfcf_real",
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
        "ma_6년_전기기기 및 장치": "ma6y_electric",
        "ma_6년_컴퓨터사무용기계": "ma6y_computer",
        "ma_6년_특수산업용기계": "ma6y_special_machine"
    }

    # 2. 단일 CSV 파일 읽기 및 정제
    try:
        df = pd.read_csv("merged_all_clean.csv", encoding='utf-8')

        # CSV 컬럼명을 소문자로 먼저 통일
        df.columns = df.columns.str.lower()
        # 수동 매핑에 있는 소문자 버전의 컬럼명도 변환
        lower_case_mapping = {k.lower(): v for k, v in column_mapping.items()}
        df = df.rename(columns=lower_case_mapping)

        # "공식 컬럼 목록"에 있는 컬럼과 날짜 컬럼만 필터링
        final_columns = [col for col in df.columns if col in official_db_columns or col == 'date']
        df = df[final_columns]

        df['time_idx'] = pd.to_datetime(df['date'])
        df = df.set_index('time_idx').drop(columns=['date'])

    except FileNotFoundError:
        print("[오류] 'merged_all_clean.csv' 파일을 찾을 수 없습니다.")
        return
    except Exception as e:
        print(f"파일 처리 중 오류: {e}")
        return

    # 3. 월별 데이터를 연간 평균으로 변환
    annual_df = df.resample('YE').mean()

    # 4. 전체 기간에 대해 보간/보외 수행
    print("데이터 보간 및 보외를 시작합니다...")
    full_range_index = pd.date_range(start='1995-12-31', end='2025-12-31', freq='YE')
    final_df = annual_df.reindex(full_range_index)

    final_df = final_df.interpolate(method='linear', limit_direction='both')
    final_df['year'] = final_df.index.year

    print("최종 연도별 데이터 생성 완료.")

    # 5. SQL INSERT 구문 생성
    table_name = "annual_data"
    sql_statements = []

    for index, row in final_df.iterrows():
        valid_row_data = row.dropna()
        if 'year' not in valid_row_data:
            continue

        columns = [col for col in official_db_columns if col in valid_row_data.index]
        values = [str(int(valid_row_data[c])) if c == 'year' else f"{valid_row_data[c]:.4f}" for c in columns]

        cols_str = ", ".join([f"`{c}`" for c in columns])
        vals_str = ", ".join(values)

        update_pairs = ", ".join([f"`{col}`=VALUES(`{col}`)" for col in columns if col != 'year'])
        sql = f"INSERT INTO {table_name} ({cols_str}) VALUES ({vals_str}) ON DUPLICATE KEY UPDATE {update_pairs};"
        sql_statements.append(sql)

    with open("data.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_statements))

    print("\n'data.sql' 파일이 성공적으로 생성되었습니다.")


if __name__ == '__main__':
    generate_insert_sql()

