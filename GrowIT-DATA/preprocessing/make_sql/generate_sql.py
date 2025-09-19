import pandas as pd
import numpy as np
import re


def to_snake_case(name):
    # 밑줄이 이미 있는 경우, 전체 소문자 변환만 수행
    if '_' in name:
        return name.lower()
    # CamelCase를 snake_case로 변환
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    name = re.sub('([a-z0-9])([A-Z])', r'\1_\2', name)
    return name.lower()


def generate_insert_sql():
    # Java 엔티티 필드명 기준
    ENTITY_FIELDS = [
        "unemployment_rate", "BSI_Composite", "real_wage_growth", "growth_rate_qoq_lag1",
        "population", "GFCF_ICT_Real", "unemployment_rate_MA3", "BSI_Composite_MA3",
        "unemployment_rate_change3", "BSI_Composite_change3", "unemployment_rate_MA6",
        "BSI_Composite_MA12", "real_wage_growth_change12", "unemployment_rate_std3",
        "BSI_Composite_std6", "GDP", "ICT_Production", "ICT_Investment", "CCSI",
        "Corporate_Loan_Rate", "Equipment_Investment_Index", "productivity_index",
        "Exchange_Rate", "BSI_6M_MA", "GDP_12M_MA", "Exchange_Rate_12M_Std",
        "CCSI_3M_Momentum", "ICT_Prod_6M_Momentum", "Loan_Rate_Lag_3M",
        "Ad_Sentiment_DI", "manufacturing_productivity"
    ]

    DB_COLUMNS = [to_snake_case(field) for field in ENTITY_FIELDS]

    # CSV의 특이한 컬럼명과 DB 컬럼명을 직접 매핑
    COLUMN_MAPPING = {
        "corporate_loans_lagged_금리(연리%)": "corporate_loan_rate",
        "ict_수출액 (백만US$)": "ict_production"
    }

    try:
        df = pd.read_csv("merged_all_clean.csv", encoding='utf-8')

        df = df.rename(columns=COLUMN_MAPPING)

        df.columns = [to_snake_case(col) for col in df.columns]

        df = df.loc[:, ~df.columns.duplicated(keep='first')]

        final_columns_to_use = ['date'] + [col for col in DB_COLUMNS if col in df.columns]
        df_filtered = df[final_columns_to_use]

        df_filtered['time_idx'] = pd.to_datetime(df_filtered['date'])
        df_filtered = df_filtered.set_index('time_idx').drop(columns=['date'])

    except FileNotFoundError:
        print("[오류] 'merged_all_clean.csv' 파일을 찾을 수 없습니다.")
        return
    except Exception as e:
        print(f"파일 처리 중 오류: {e}")
        return

    annual_df = df_filtered.resample('YE').mean()

    full_range_index = pd.date_range(start='1995-12-31', end='2025-12-31', freq='YE')
    final_df = annual_df.reindex(full_range_index)

    final_df = final_df.interpolate(method='linear', limit_direction='both')
    final_df['year'] = final_df.index.year

    table_name = "annual_data"
    sql_statements = []

    db_columns_for_sql = [col for col in DB_COLUMNS if col in final_df.columns]

    for index, row in final_df.iterrows():
        columns_for_insert = ['`year`'] + [f"`{c}`" for c in db_columns_for_sql]

        values = [str(int(row['year']))]
        for col in db_columns_for_sql:
            if pd.notna(row[col]):
                values.append(f"{row[col]:.4f}")
            else:
                values.append("NULL")

        cols_str = ", ".join(columns_for_insert)
        vals_str = ", ".join(values)

        update_pairs = ", ".join([f"`{col}`=VALUES(`{col}`)" for col in db_columns_for_sql])

        sql = f"INSERT INTO `{table_name}` ({cols_str}) VALUES ({vals_str}) ON DUPLICATE KEY UPDATE {update_pairs};"
        sql_statements.append(sql)

    with open("data.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_statements))

    print("\n'data.sql' 파일이 성공적으로 생성되었습니다.")


if __name__ == '__main__':
    generate_insert_sql()