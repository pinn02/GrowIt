import pandas as pd
import numpy as np
import os
import warnings

warnings.filterwarnings('ignore')


def read_csv_robust(filepath):
    """파일을 안정적으로 읽는 함수 (인코딩, 공백 처리)"""
    try:
        df = pd.read_csv(filepath, encoding='cp949')
    except (UnicodeDecodeError, FileNotFoundError):
        try:
            df = pd.read_csv(filepath, encoding='utf-8')
        except (UnicodeDecodeError, FileNotFoundError):
            df = pd.read_csv(filepath, encoding='euc-kr')
    df.columns = [str(col).strip() for col in df.columns]
    return df


def preprocess_ad_sentiment(filepath_old, filepath_new):
    """두 개의 광고경기 체감도 파일을 합쳐 연간 Y값을 생성하는 함수"""
    print("전처리: 광고경기 체감도 (Y값 생성)")
    df_old = read_csv_robust(filepath_old)
    cat_cols = [df_old.columns[0], df_old.columns[2]]
    for col in cat_cols: df_old[col] = df_old[col].str.strip()
    filtered_old = df_old[(df_old.iloc[:, 0] == '전체') & (df_old.iloc[:, 2] == '광고경기전망지수')]
    processed_old = filtered_old.iloc[:, 4:].melt(var_name='date', value_name='Ad_Sentiment_Index')
    processed_old['date'] = pd.to_datetime(processed_old['date'], format='%Y')
    processed_old['Ad_Sentiment_Index'] = pd.to_numeric(processed_old['Ad_Sentiment_Index'], errors='coerce')
    processed_old.dropna(inplace=True)

    df_new = pd.read_csv(filepath_new, header=[0, 1], encoding='utf-8')
    df_new.columns = df_new.columns.set_levels(df_new.columns.levels[0].str.strip(), level=0)
    df_new.columns = df_new.columns.set_levels(df_new.columns.levels[1].str.strip(), level=1)
    total_row = df_new[df_new.iloc[:, 0] == '전체'].iloc[0]

    di_scores = []
    for year in range(2013, 2022):
        year_str = str(year)
        try:
            p1 = pd.to_numeric(total_row.get((year_str, '100점 이상')), errors='coerce')
            p2 = pd.to_numeric(total_row.get((year_str, '80~99점')), errors='coerce')
            n1 = pd.to_numeric(total_row.get((year_str, '60점 미만')), errors='coerce')
            p = np.nansum([p1, p2])
            n = np.nansum([n1])
            di_scores.append({'date': pd.to_datetime(f'{year}-01-01'), 'Ad_Sentiment_DI': p - n})
        except Exception as e:
            print(f"   [경고] {year_str}년 데이터 처리 중 문제 발생: {e}")
            continue

    if not di_scores:
        raise ValueError("최신 광고 경기 데이터(2013-2021)를 처리하는 데 실패했습니다.")

    processed_new = pd.DataFrame(di_scores)
    last_old = processed_old.sort_values('date').iloc[-1]
    first_new = processed_new.sort_values('date').iloc[0]
    scale_factor = first_new['Ad_Sentiment_DI'] / (last_old['Ad_Sentiment_Index'] - 100) if (
                                                                                                    last_old[
                                                                                                        'Ad_Sentiment_Index'] - 100) != 0 else 0
    processed_old['Ad_Sentiment_DI'] = (processed_old['Ad_Sentiment_Index'] - 100) * scale_factor
    final_df = pd.concat([processed_old[['date', 'Ad_Sentiment_DI']], processed_new])
    final_df.drop_duplicates(subset=['date'], keep='last', inplace=True)
    return final_df.sort_values('date').reset_index(drop=True)


def impute_with_trend_and_noise(series):
    """선형 추세 기반 보간/보외 및 노이즈 추가 함수"""
    print("Y값에 대한 선형 추세 기반 보간/보외 및 노이즈 추가...")
    series_out = series.copy()

    # 1. 중간의 빈 값들을 선형 보간
    series_out.interpolate(method='linear', inplace=True)

    # 2. 실제 데이터 구간과 변동성 파악
    real_data = series.dropna()
    volatility = real_data.diff().std()
    if pd.isna(volatility) or volatility == 0: volatility = abs(real_data.mean() * 0.05)

    # 3. 과거 데이터 보외 (Backcasting)
    first_valid_index = real_data.index[0]
    past_indices = series_out[series_out.index < first_valid_index].index
    if not past_indices.empty:
        initial_slope = real_data.iloc[:5].diff().mean()
        if pd.isna(initial_slope): initial_slope = 0

        num_past = len(past_indices)
        first_val = real_data.iloc[0]
        past_values = first_val - np.arange(num_past, 0, -1) * initial_slope

        np.random.seed(42)
        past_noise = np.random.normal(0, volatility, num_past)
        series_out.loc[past_indices] = past_values + past_noise

    # 4. 미래 데이터 보외 (Forecasting)
    last_valid_index = real_data.index[-1]
    future_indices = series_out[series_out.index > last_valid_index].index
    if not future_indices.empty:
        final_slope = real_data.iloc[-5:].diff().mean()
        if pd.isna(final_slope): final_slope = 0

        num_future = len(future_indices)
        last_val = real_data.iloc[-1]
        future_values = last_val + np.arange(1, num_future + 1) * final_slope

        future_noise = np.random.normal(0, volatility, num_future)
        series_out.loc[future_indices] = future_values + future_noise

    return series_out


if __name__ == '__main__':
    try:
        current_dir = '.'
        features_path = os.path.join(current_dir, 'simulation_data_with_features.csv')
        ad_old_path = os.path.join(current_dir, '사업체정보별_광고경기_체감도_20250910155647.csv')
        ad_new_path = os.path.join(current_dir, '광고경기_체감도__업체정보별_20250910155622.csv')

        df_features = read_csv_robust(features_path)
        df_ad_sentiment_Y_yearly = preprocess_ad_sentiment(ad_old_path, ad_new_path)

        print("\n입력(X) 데이터와 결과(Y) 데이터를 병합합니다...")
        df_features['date'] = pd.to_datetime(df_features['date'])

        # 연간 데이터인 Y를 월별 X 데이터에 병합 (Y값은 연초에만 존재)
        final_dataset = pd.merge(df_features, df_ad_sentiment_Y_yearly, on='date', how='left')
        final_dataset.set_index('date', inplace=True)

        # <<< 최종 수정: ffill/bfill 대신 요청하신 보외법 적용 >>>
        final_dataset['Ad_Sentiment_DI'] = impute_with_trend_and_noise(final_dataset['Ad_Sentiment_DI'])

        print("...병합 및 보외/보간 완료.")

        final_dataset.reset_index(inplace=True)
        output_filename = 'marketing_model_dataset.csv'
        final_dataset.to_csv(output_filename, index=False)
        print(f"\n모든 작업 완료! 최종 마케팅 모델 데이터셋이 '{output_filename}' 파일로 저장되었습니다.")

    except FileNotFoundError as e:
        print(f"\n[오류] 필수 파일을 찾을 수 없습니다: {e}")
    except Exception as e:
        print(f"\n[오류] 분석 중 예외가 발생했습니다: {e}")

