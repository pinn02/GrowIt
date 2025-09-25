import pandas as pd
import numpy as np
import os
from statsmodels.tsa.arima.model import ARIMA
import warnings

warnings.filterwarnings('ignore')


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
                        master_df[col].bfill(inplace=True)
                elif not series.empty:
                    master_df[col].bfill(inplace=True)
        master_df.ffill(inplace=True)
        master_df.bfill(inplace=True)
        return master_df

    def process_and_save(self, output_path):
        print("\n--- 데이터 병합 및 보간 시작 ---")
        final_data = self._merge_and_impute()
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        final_data.to_csv(output_path)
        print(f"\n데이터를 '{output_path}' 경로에 저장했습니다.")
        return final_data


def read_csv_with_encoding(fp):
    try:
        return pd.read_csv(fp, encoding='cp949')
    except:
        return pd.read_csv(fp, encoding='utf-8')


def preprocess_quarterly(fp, val_col, cat_name):
    df = read_csv_with_encoding(fp)
    df.rename(columns={df.columns[0]: 'Category'}, inplace=True)
    df['Category'] = df['Category'].str.strip()
    df_filtered = df[df['Category'] == cat_name]
    if df_filtered.empty: return None

    df_long = df_filtered.melt(id_vars='Category', var_name='date_raw', value_name=val_col)
    df_long['date'] = pd.to_datetime(df_long['date_raw'].str.replace(r'.(\d)/\d', r'-Q\1', regex=True), errors='coerce')
    df_long.dropna(subset=['date'], inplace=True)

    df_long.set_index('date', inplace=True)
    df_monthly = df_long[val_col].resample('MS').interpolate()
    return df_monthly.reset_index()


def preprocess_ccsi(fp1, fp2):
    df1 = read_csv_with_encoding(fp1)
    df2 = read_csv_with_encoding(fp2)
    df1['CSI코드별'] = df1['CSI코드별'].str.strip()
    df2['CSI코드별'] = df2['CSI코드별'].str.strip()

    df_q = df2[df2['CSI코드별'] == '소비자심리지수'].iloc[:, 4:].T.rename(columns=lambda x: 'CCSI')
    df_q.index = pd.to_datetime(df_q.index.str.replace(r'.(\d)/\d', r'-Q\1', regex=True), errors='coerce')
    df_q.dropna(inplace=True)
    df_q_m = df_q.resample('MS').interpolate()

    df_m = df1[df1['CSI코드별'] == '소비자심리지수'].iloc[:, 4:].T.rename(columns=lambda x: 'CCSI')
    df_m.index = pd.to_datetime(df_m.index.str.replace(' 월', ''), format='%Y.%m', errors='coerce')
    df_m.dropna(inplace=True)

    final_df = pd.concat([df_q_m, df_m])
    final_df = final_df[~final_df.index.duplicated(keep='last')].sort_index()
    return final_df.reset_index().rename(columns={'index': 'date'})


if __name__ == '__main__':
    try:
        current_dir = '.'

        df_gdp = preprocess_quarterly(os.path.join(current_dir, '경제활동별_GDP_및_GNI_계절조정__실질__분기__20250908011659.csv'),
                                      'GDP', '국내총생산(시장가격, GDP)')
        df_ict_prod = preprocess_quarterly(os.path.join(current_dir, '정보통신산업_계절조정__실질__분기__20250909152422.csv'),
                                           'ICT_Production', '정보통신산업')
        df_ict_inv = preprocess_quarterly(os.path.join(current_dir, '정보통신산업_계절조정__실질__분기__20250909152422.csv'),
                                          'ICT_Investment', '정보통신부문 설비투자')
        df_ccsi = preprocess_ccsi(os.path.join(current_dir, '소비자심리지수1.csv'), os.path.join(current_dir, '소비자심리지수2.csv'))

        df_bsi = read_csv_with_encoding(os.path.join(current_dir, 'BSI_long.csv'))
        df_loans = read_csv_with_encoding(os.path.join(current_dir, 'corporate_loans_long.csv'))
        # df_prod = read_csv_with_encoding(os.path.join(current_dir, 'productivity_all_long.csv'))
        df_ex = read_csv_with_encoding(os.path.join(current_dir, 'korea_exchange_rate_long.csv'))

        # <<< 최종 수정: investment_final_data_all_categories.csv 관련 코드 제거 >>>
        # df_inv_raw = read_csv_with_encoding(os.path.join(current_dir, 'investment_final_data_all_categories.csv'))
        # df_inv = df_inv_raw[df_inv_raw['지수종류'].str.strip() == '계절조정지수 (2020=100)'].copy()
        # df_inv = df_inv.groupby('날짜')['돈'].mean().reset_index()

        aligner = TimeAligner()
        aligner.add_df(df_gdp, 'GDP', 'date', 'GDP')
        aligner.add_df(df_ict_prod, 'ICT_Production', 'date', 'ICT_Production')
        aligner.add_df(df_ict_inv, 'ICT_Investment', 'date', 'ICT_Investment')
        aligner.add_df(df_ccsi, 'CCSI', 'date', 'CCSI')
        aligner.add_df(df_bsi, 'BSI_Composite', 'Date', 'BSI_Composite')
        aligner.add_df(df_loans, 'Corporate_Loan_Rate', '날짜', '금리(연리%)')
        # aligner.add_df(df_inv, 'Equipment_Investment_Index', '날짜', '돈') # 이 줄도 제거
        # aligner.add_df(df_prod, 'productivity_index', 'date', 'productivity_index')
        aligner.add_df(df_ex, 'Exchange_Rate', '연도', '환율', 'yearly')

        aligner.process_and_save('simulation_master_data_final.csv')
        print("\n'Equipment_Investment_Index'를 제외하고 데이터 생성을 완료했습니다.")

    except FileNotFoundError as e:
        print(f"\n[오류] 필수 파일을 찾을 수 없습니다: {e.filename}")
        print("이 스크립트와 나머지 CSV 파일들이 같은 폴더 안에 있는지 확인해주세요.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")