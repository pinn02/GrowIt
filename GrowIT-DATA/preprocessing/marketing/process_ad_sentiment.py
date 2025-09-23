import pandas as pd
import numpy as np


def process_old_data(filepath):
    print(f"-> 과거 데이터 처리 시작: {filepath}")
    df = pd.read_csv(filepath, encoding='utf-8')
    df.columns = [str(col).strip() for col in df.columns]

    cat_cols = [df.columns[0], df.columns[1], df.columns[2], df.columns[3]]
    for col in cat_cols:
        df[col] = df[col].str.strip()

    filtered = df[(df.iloc[:, 0] == '전체') & (df.iloc[:, 2] == '광고경기전망지수')]
    if filtered.empty:
        raise ValueError("과거 데이터에서 '전체' 및 '광고경기전망지수' 행을 찾을 수 없습니다.")

    processed = filtered.iloc[:, 4:].melt(var_name='date', value_name='Ad_Sentiment_Index')
    processed['date'] = pd.to_datetime(processed['date'], format='%Y')
    processed['Ad_Sentiment_Index'] = pd.to_numeric(processed['Ad_Sentiment_Index'], errors='coerce')
    processed.dropna(subset=['Ad_Sentiment_Index'], inplace=True)
    print("   ...과거 데이터 처리 완료.")
    return processed


def process_new_data(filepath):
    print(f"-> 최신 데이터 처리 시작: {filepath}")
    df = pd.read_csv(filepath, header=[0, 1], low_memory=False)

    # 멀티 헤더의 레벨별 공백 제거
    df.columns = df.columns.set_levels(df.columns.levels[0].str.strip(), level=0)
    df.columns = df.columns.set_levels(df.columns.levels[1].str.strip(), level=1)

    total_row = df[df.iloc[:, 0] == '전체'].iloc[0]

    years = range(2013, 2022)
    di_scores = []

    for year in years:
        year_str = str(year)
        try:
            # === 최종 수정: 실제 컬럼 이름으로 확산지수(DI) 계산 ===
            # 긍정 응답: 100점 이상 + 80~99점
            positive_responses = (pd.to_numeric(total_row.get((year_str, '100점 이상'), 0), errors='coerce') +
                                  pd.to_numeric(total_row.get((year_str, '80~99점'), 0), errors='coerce'))

            # 부정 응답: 60점 미만
            negative_responses = pd.to_numeric(total_row.get((year_str, '60점 미만'), 0), errors='coerce')

            # NaN 값을 0으로 변환
            positive_responses, negative_responses = np.nan_to_num([positive_responses, negative_responses])

            di = positive_responses - negative_responses
            di_scores.append({'date': pd.to_datetime(f'{year}-01-01'), 'Ad_Sentiment_DI': di})
        except Exception as e:
            print(f"   [경고] {year}년 데이터 처리 중 문제 발생: {e}")
            continue

    processed = pd.DataFrame(di_scores)
    print("   ...최신 데이터 처리 및 확산지수(DI) 계산 완료.")
    return processed


if __name__ == '__main__':
    try:
        df_old_processed = process_old_data('사업체정보별_광고경기_체감도_20250910155647.csv')
        df_new_processed = process_new_data('광고경기_체감도__업체정보별_20250910155622.csv')

        print("-> 두 데이터 연결 및 스케일 보정 시작...")

        last_old_data = df_old_processed.sort_values('date').iloc[-1]
        first_new_data = df_new_processed.sort_values('date').iloc[0]

        val_old_last = last_old_data['Ad_Sentiment_Index']
        val_new_first = first_new_data['Ad_Sentiment_DI']

        denominator = val_old_last - 100
        scale_factor = val_new_first / denominator if denominator != 0 else 0
        df_old_processed['Ad_Sentiment_DI'] = (df_old_processed['Ad_Sentiment_Index'] - 100) * scale_factor

        df_final = pd.concat([df_old_processed[['date', 'Ad_Sentiment_DI']], df_new_processed], ignore_index=True)
        df_final.drop_duplicates(subset=['date'], keep='last', inplace=True)
        df_final = df_final.sort_values('date').reset_index(drop=True)
        print("   ...데이터 연결 완료.")

        output_filename = 'ad_sentiment_index_2004_2021_final.csv'
        df_final.to_csv(output_filename, index=False)

        print(f"\n모든 작업 완료! 최종 데이터가 '{output_filename}' 파일로 저장되었습니다.")

    except FileNotFoundError as e:
        print(f"\n[오류] 파일을 찾을 수 없습니다: {e.filename}")
        print("이 스크립트와 2개의 CSV 파일이 같은 폴더에 있는지 확인해주세요.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")