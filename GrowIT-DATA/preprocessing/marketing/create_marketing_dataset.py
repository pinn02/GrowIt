# 파일 이름: create_marketing_dataset.py
import pandas as pd
import numpy as np
import os
from statsmodels.tsa.arima.model import ARIMA
import warnings

warnings.filterwarnings('ignore')


# --- 위와 동일한 TimeAligner 클래스 및 find_best_arima_order 함수 ---
# (코드 재사용을 위해 동일한 내용을 한 번 더 포함합니다)
def find_best_arima_order(series):
    best_aic = np.inf
    best_order = None
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
        self.start_date, self.end_date, self.freq = start_date, end_date, freq
        self.master_index = pd.date_range(start=self.start_date, end=self.end_date, freq=self.freq)
        self.datasets = {}

    def add_df(self, df, dataset_name, date_col, data_col, data_type='monthly'):
        if df is None or df.empty: return
        temp_df = df[[date_col, data_col]].copy()
        temp_df.rename(columns={date_col: 'date', data_col: dataset_name}, inplace=True)
        temp_df['date'] = pd.to_datetime(temp_df['date'], errors='coerce')
        temp_df.dropna(subset=['date'], inplace=True)
        temp_df[dataset_name] = pd.to_numeric(temp_df[dataset_name], errors='coerce')

        period = 'A' if data_type == 'yearly' else 'M'
        temp_df['date'] = temp_df['date'].dt.to_period(period).dt.to_timestamp()

        temp_df.set_index('date', inplace=True)
        if not temp_df.index.is_unique: temp_df = temp_df.groupby('date').mean()
        if data_type == 'yearly': temp_df = temp_df.resample('MS').asfreq().interpolate(method='linear')

        self.datasets[dataset_name] = temp_df
        print(f"-> '{dataset_name}' ({data_type}) 데이터 추가 완료.")

    def _backcast_with_arima(self, series):
        series = series.asfreq('MS').interpolate()
        print(f"\n'{series.name}' ARIMA 후방예측 수행...")
        order = find_best_arima_order(series)
        print(f"   - 최적 ARIMA order: {order}")
        model = ARIMA(series, order=order, seasonal_order=(1, 1, 0, 12)).fit()
        start, end = self.master_index[0], series.index[0] - pd.DateOffset(months=1)
        return model.predict(start=start, end=end) if start <= end else None

    def _merge_and_impute(self):
        master_df = pd.DataFrame(index=self.master_index)
        for name, df in self.datasets.items(): master_df = master_df.join(df, how='outer')
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
                        print(f"   ARIMA 오류 ({col}): {e}. 단순 보간법 적용.")
                        master_df[col].bfill(inplace=True)
                elif not series.empty:
                    master_df[col].bfill(inplace=True)
        master_df.ffill(inplace=True).bfill(inplace=True)
        return master_df

    def process_and_save(self, output_path):
        print("\n--- 데이터 병합 및 보간 시작 ---")
        final_data = self._merge_and_impute()
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        final_data.to_csv(output_path)
        print(f"\n데이터를 '{output_path}' 경로에 저장했습니다.")
        return final_data


def preprocess_ad_sentiment(filepath_old, filepath_new):
    print("전처리: 광고경기 체감도")
    df_old = pd.read_csv(filepath_old, encoding='euc-kr')
    df_old.columns = [str(col).strip() for col in df_old.columns]
    cat_cols = [df_old.columns[0], df_old.columns[2]]
    for col in cat_cols: df_old[col] = df_old[col].str.strip()
    filtered_old = df_old[(df_old.iloc[:, 0] == '전체') & (df_old.iloc[:, 2] == '광고경기전망지수')]
    processed_old = filtered_old.iloc[:, 4:].melt(var_name='date', value_name='Ad_Sentiment_Index')
    processed_old['date'] = pd.to_datetime(processed_old['date'], format='%Y')
    processed_old['Ad_Sentiment_Index'] = pd.to_numeric(processed_old['Ad_Sentiment_Index'], errors='coerce')
    processed_old.dropna(inplace=True)

    df_new = pd.read_csv(filepath_new, header=[0, 1], encoding='euc-kr')
    df_new.columns = df_new.columns.set_levels(df_new.columns.levels[0].str.strip(), level=0)
    df_new.columns = df_new.columns.set_levels(df_new.columns.levels[1].str.strip(), level=1)
    total_row = df_new[df_new.iloc[:, 0] == '전체'].iloc[0]

    di_scores = []
    for year in range(2013, 2022):
        year_str = str(year)
        try:
            p = (pd.to_numeric(total_row.get((year_str, '100점 이상')), 0)) + (
                pd.to_numeric(total_row.get((year_str, '80~99점')), 0))
            n = pd.to_numeric(total_row.get((year_str, '60점 미만')), 0)
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
        current_dir = '.'
        master_data_path = os.path.join(current_dir, 'simulation_master_data_final.csv')
        ad_old_path = os.path.join(current_dir, '사업체정보별_광고경기_체감도_20250910155647.csv')
        ad_new_path = os.path.join(current_dir, '광고경기_체감도__업체정보별_20250910155622.csv')
        retail_path = os.path.join(current_dir, '소매판매액지수(2020=100)_20250911014526.csv')
        kospi_path = os.path.join(current_dir, 'kospi_1995_2025.csv')

        df_master = pd.read_csv(master_data_path)
        df_ad_sentiment = preprocess_ad_sentiment(ad_old_path, ad_new_path)
        df_retail_sales = pd.read_csv(retail_path, encoding='euc-kr')
        df_kospi = pd.read_csv(kospi_path)

        aligner = TimeAligner()

        # Y값 추가
        aligner.add_df(df_ad_sentiment, 'Ad_Sentiment', 'date', 'Ad_Sentiment_DI', 'yearly')

        # X값들 추가
        for col in [c for c in df_master.columns if c != 'date']:
            aligner.add_df(df_master, col, 'date', col, 'monthly')
        aligner.add_df(df_retail_sales, 'Retail_Sales_Index', '시점', '계절조정지수')
        aligner.add_df(df_kospi, 'KOSPI', 'Date', 'Close')

        # 최종 파일 생성
        aligner.process_and_save('marketing_model_dataset.csv')

    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")