import pandas as pd
import numpy as np
import os

if __name__ == '__main__':
    try:
        input_file = 'simulation_master_data_final.csv'
        df = pd.read_csv(input_file, parse_dates=['date'], index_col='date')
        print(f"'{input_file}' 파일을 성공적으로 읽었습니다.")

        print("특성 공학 변수 생성을 시작합니다...")

        # 1. 추세(Trend) 파악: 이동평균
        df['BSI_6M_MA'] = df['BSI_Composite'].rolling(window=6).mean()
        df['GDP_12M_MA'] = df['GDP'].rolling(window=12).mean()

        # 2. 변동성(Volatility) 파악: 리스크 측정
        df['Exchange_Rate_12M_Std'] = df['Exchange_Rate'].rolling(window=12).std()

        # 3. 모멘텀(Momentum) 파악: 변화의 가속도
        df['CCSI_3M_Momentum'] = df['CCSI'].diff(periods=3)
        df['ICT_Prod_6M_Momentum'] = df['ICT_Production'].diff(periods=6)

        # 4. 시차(Lag) 변수: 지연 효과
        df['Loan_Rate_Lag_3M'] = df['Corporate_Loan_Rate'].shift(3)
        print("성공: 6개의 새로운 특성 공학 변수를 생성했습니다.")

        # 5. 계산 과정에서 생긴 앞부분의 빈 값(NaN) 채우기
        df.bfill(inplace=True)
        print("성공: 모든 빈 값을 채웠습니다.")

        # 6. 새로운 파일로 저장
        output_path = 'simulation_data_with_features.csv'
        df.to_csv(output_path)

        print(f"\n모든 작업 완료! 특성 공학이 적용된 최종 데이터가 '{output_path}' 파일로 저장되었습니다.")

    except FileNotFoundError:
        print(f"\n[오류] 입력 파일 '{input_file}'을 찾을 수 없습니다.")
        print("이 스크립트와 'simulation_master_data_final.csv' 파일이 같은 폴더에 있는지 확인해주세요.")
