import pandas as pd
import numpy as np
import os
from statsmodels.tsa.arima.model import ARIMA
import warnings

warnings.filterwarnings('ignore')


def find_best_arima_order(series):
    best_aic = np.inf
    best_order = None
    # 모델 탐색 범위를 줄여 속도 향상
    p_values, d_values, q_values = range(2), range(2), range(2)

    for p in p_values:
        for d in d_values:
            for q in q_values:
                try:
                    model = ARIMA(series, order=(p, d, q))
                    model_fit = model.fit()
                    if model_fit.aic < best_aic:
                        best_aic = model_fit.aic
                        best_order = (p, d, q)
                except:
                    continue
    return best_order or (1, 1, 1)


class TimeAligner:
    def __init__(self, start_date: str = '1995-01', end_date: str = '2025-12', freq: str = 'MS'):
        self.start_date = start_date
        self.end_date = end_date
        self.freq = freq
        self.master_index = pd.date_range(start=self.start_date, end=self.end_date, freq=self.freq)
        self.datasets = {}

    def add_df(self, df: pd.DataFrame, dataset_name: str, date_col: str, data_col: str, data_type: str = 'monthly'):
        if df is None or df.empty:
            print(f"   [정보] '{dataset_name}' 데이터프레임이 비어있어 건너뜁니다.")
            return

        temp_df = df[[date_col, data_col]].copy()
        temp_df.rename(columns={date_col: 'date', data_col: dataset_name}, inplace=True)
        temp_df['date'] = pd.to_datetime(temp_df['date'], errors='coerce')
        temp_df.dropna(subset=['date'], inplace=True)
        temp_df[dataset_name] = pd.to_numeric(temp_df[dataset_name], errors='coerce')

        if data_type == 'yearly':
            temp_df['date'] = temp_df['date'].dt.to_period('A').dt.to_timestamp()
        else:
            temp_df['date'] = temp_df['date'].dt.to_period('M').dt.to_timestamp()

        temp_df.set_index('date', inplace=True)
        if not temp_df.index.is_unique:
            temp_df = temp_df.groupby('date').mean()

        if data_type == 'yearly':
            temp_df = temp_df.resample('MS').asfreq().interpolate(method='linear')

        self.datasets[dataset_name] = temp_df
        print(f"-> '{dataset_name}' ({data_type}) 데이터가 처리 목록에 추가되었습니다.")

    def _backcast_with_arima(self, series_to_forecast: pd.Series) -> pd.Series:
        series_to_forecast = series_to_forecast.asfreq('MS').interpolate()
        print(f"\n'{series_to_forecast.name}' ARIMA 후방예측 수행...")

        best_order = find_best_arima_order(series_to_forecast)
        print(f"   - 최적 ARIMA order: {best_order}")

        model = ARIMA(series_to_forecast, order=best_order, seasonal_order=(1, 1, 0, 12))
        fitted_model = model.fit()
        backcast_start = self.master_index[0]
        backcast_end = series_to_forecast.index[0] - pd.DateOffset(months=1)
        if backcast_start > backcast_end: return None
        return fitted_model.predict(start=backcast_start, end=backcast_end)

    def _fallback_impute(self, master_df: pd.DataFrame, col: str, series: pd.Series):
        print(f"   '{col}' ARIMA 예측 실패 또는 데이터 부족. 단순 보간법을 적용합니다.")
        master_df[col].bfill(inplace=True)

    def _merge_and_impute(self) -> pd.DataFrame:
        master_df = pd.DataFrame(index=self.master_index)
        for name, df in self.datasets.items():
            master_df = master_df.join(df, how='outer')

        master_df = master_df.loc[self.start_date:self.end_date]
        master_df.interpolate(method='linear', limit_direction='both', inplace=True)

        for col in master_df.columns:
            if pd.isnull(master_df[col].iloc[0]):
                series = master_df[col].dropna()
                if not series.empty and len(series) > 36:
                    try:
                        backcast = self._backcast_with_arima(series)
                        if backcast is not None: master_df[col].update(backcast)
                    except Exception as e:
                        print(f"   ARIMA 오류 발생 ({col}): {e}")
                        self._fallback_impute(master_df, col, series)
                elif not series.empty:
                    self._fallback_impute(master_df, col, series)

        master_df.ffill(inplace=True)
        master_df.bfill(inplace=True)
        return master_df

    def process_and_save(self, output_path: str) -> pd.DataFrame:
        if not self.datasets:
            print("오류: 처리할 데이터셋이 없습니다.")
            return None
        print("\n--- 데이터 병합 및 보간 시작 ---")
        final_data = self._merge_and_impute()
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        final_data.to_csv(output_path)
        print(f"\n데이터를 '{output_path}' 경로에 CSV 파일로 저장했습니다.")
        return final_data


def preprocess_ad_sentiment(filepath_old, filepath_new):
    print("전처리: 광고경기 체감도")
    df_old = pd.read_csv(filepath_old)
    df_old.columns = [str(col).strip() for col in df_old.columns]
    cat_cols = [df_old.columns[0], df_old.columns[2]]
    for col in cat_cols: df_old[col] = df_old[col].str.strip()
    filtered_old = df_old[(df_old.iloc[:, 0] == '전체') & (df_old.iloc[:, 2] == '광고경기전망지수')]
    processed_old = filtered_old.iloc[:, 4:].melt(var_name='date', value_name='Ad_Sentiment_Index')
    processed_old['date'] = pd.to_datetime(processed_old['date'], format='%Y')
    processed_old['Ad_Sentiment_Index'] = pd.to_numeric(processed_old['Ad_Sentiment_Index'], errors='coerce')
    processed_old.dropna(inplace=True)

    df_new = pd.read_csv(filepath_new, header=[0, 1])
    df_new.columns = df_new.columns.set_levels(df_new.columns.levels[0].str.strip(), level=0)
    df_new.columns = df_new.columns.set_levels(df_new.columns.levels[1].str.strip(), level=1)
    total_row = df_new[df_new.iloc[:, 0] == '전체'].iloc[0]

    di_scores = []
    for year in range(2013, 2022):
        year_str = str(year)
        try:
            p = (pd.to_numeric(total_row.get((year_str, '100점 이상'), 0)) + pd.to_numeric(
                total_row.get((year_str, '80~99점'), 0)))
            n = pd.to_numeric(total_row.get((year_str, '60점 미만'), 0))
            p, n = np.nan_to_num([p, n])
            di_scores.append({'date': pd.to_datetime(f'{year}-01-01'), 'Ad_Sentiment_DI': p - n})
        except:
            continue
    processed_new = pd.DataFrame(di_scores)

    last_old = processed_old.sort_values('date').iloc[-1]
    first_new = processed_new.sort_values('date').iloc[0]
    scale = first_new['Ad_Sentiment_DI'] / (last_old['Ad_Sentiment_Index'] - 100) if (last_old[
                                                                                          'Ad_Sentiment_Index'] - 100) != 0 else 0
    processed_old['Ad_Sentiment_DI'] = (processed_old['Ad_Sentiment_Index'] - 100) * scale

    final_df = pd.concat([processed_old[['date', 'Ad_Sentiment_DI']], processed_new])
    final_df.drop_duplicates(subset=['date'], keep='last', inplace=True)
    return final_df.sort_values('date').reset_index(drop=True)


if __name__ == '__main__':
    try:
        ### <<< 수정된 부분: 모든 파일이 현재 폴더에 있다고 가정 >>> ###
        # 스크립트가 실행되는 위치를 기준으로 파일 경로를 설정합니다.
        current_directory = os.path.dirname(os.path.abspath(__file__))

        master_data_path = os.path.join(current_directory, 'simulation_master_data_final.csv')
        ad_old_path = os.path.join(current_directory, '사업체정보별_광고경기_체감도_20250910155647.csv')
        ad_new_path = os.path.join(current_directory, '광고경기_체감도__업체정보별_20250910155622.csv')
        retail_path = os.path.join(current_directory, '소매판매액지수(2020=100)_20250911014526.csv')
        kospi_path = os.path.join(current_directory, 'kospi_1995_2025.csv')

        # 각 파일이 있는지 확인
        required_files = [master_data_path, ad_old_path, ad_new_path, retail_path, kospi_path]
        for f in required_files:
            if not os.path.exists(f):
                raise FileNotFoundError(f)

        df_master = pd.read_csv(master_data_path)
        df_ad_sentiment = preprocess_ad_sentiment(ad_old_path, ad_new_path)
        df_retail_sales = pd.read_csv(retail_path)
        df_kospi = pd.read_csv(kospi_path)

        aligner = TimeAligner()

        aligner.add_df(df_ad_sentiment, 'Ad_Sentiment', 'date', 'Ad_Sentiment_DI', 'yearly')

        for col in [c for c in df_master.columns if c != 'date']:
            aligner.add_df(df_master, col, 'date', col, 'monthly')

        aligner.add_df(df_retail_sales, 'Retail_Sales_Index', '시점', '계절조정지수', 'monthly')
        aligner.add_df(df_kospi, 'KOSPI', 'Date', 'Close', 'monthly')

        final_output_path = os.path.join(current_directory, 'marketing_model_dataset.csv')
        final_df = aligner.process_and_save(final_output_path)

        if final_df is not None:
            print("\n모든 마케팅 데이터가 성공적으로 통합되었습니다.")
            print(final_df.head())

    except FileNotFoundError as e:
        print(f"\n[오류] 필수 파일을 찾을 수 없습니다: {os.path.basename(str(e))}")
        print("이 스크립트와 모든 CSV 파일이 같은 폴더 안에 있는지 확인해주세요.")
    except Exception as e:
        print(f"\n[오류] 분석 중 예외가 발생했습니다: {e}")

