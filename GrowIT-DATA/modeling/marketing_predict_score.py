import pandas as pd
import joblib
import numpy as np


def predict_tier_probabilities(model_analyzer, new_data):
    """학습된 모델과 새로운 데이터를 받아 등급별 확률을 예측하는 함수"""
    try:
        # 모델이 학습할 때 사용했던 피처의 순서를 그대로 사용
        feature_order = model_analyzer.features
        input_df = pd.DataFrame(new_data, index=[0])[feature_order]

        # 각 등급(S, A, B, C...)에 대한 확률 예측
        probabilities = model_analyzer.model.predict_proba(input_df)

        # 결과값을 등급 이름과 매칭하여 정리
        class_labels = model_analyzer.model.classes_
        result = pd.Series(probabilities[0], index=class_labels)

        return result.sort_values(ascending=False)

    except Exception as e:
        print(f"[오류] 예측 중 문제가 발생했습니다: {e}")
        return None


if __name__ == '__main__':
    try:
        model_filename = 'marketing_tier_model.pkl'
        analyzer = joblib.load(model_filename)
        print(f"저장된 마케팅 AI 모델 '{model_filename}'을 불러왔습니다.")

        # --- 테스트할 가상 시나리오 정의 ---
        # marketing_model_dataset.csv에 포함된 모든 X값을 사용해야 합니다.
        scenarios = {
            "1. 소비/기업 심리가 모두 좋은 '최상의 마케팅 환경'": {
                'GDP': [550000], 'ICT_Production': [70000], 'ICT_Investment': [18000],
                'BSI_Composite': [102], 'Corporate_Loan_Rate': [3.5],
                'Equipment_Investment_Index': [110], 'productivity_index': [115], 'Exchange_Rate': [1100],
                'BSI_6M_MA': [101], 'GDP_12M_MA': [540000], 'Exchange_Rate_12M_Std': [15.0],
                'CCSI_3M_Momentum': [2.5], 'ICT_Prod_6M_Momentum': [3000], 'Loan_Rate_Lag_3M': [3.6],
                # 'Retail_Sales_Index': [115], 'KOSPI': [3200]
            },
            "2. 소비/기업 심리가 모두 얼어붙은 '최악의 마케팅 환경'": {
                'GDP': [480000], 'ICT_Production': [45000], 'ICT_Investment': [13000],
                'BSI_Composite': [88], 'Corporate_Loan_Rate': [6.5],
                'Equipment_Investment_Index': [90], 'productivity_index': [98], 'Exchange_Rate': [1350],
                'BSI_6M_MA': [87], 'GDP_12M_MA': [490000], 'Exchange_Rate_12M_Std': [50.0],
                'CCSI_3M_Momentum': [-3.0], 'ICT_Prod_6M_Momentum': [-1500], 'Loan_Rate_Lag_3M': [6.2],
                'Retail_Sales_Index': [92], 'KOSPI': [2400]
            },
            "3. 기업은 낙관적이나 소비자는 비관적인 '공급과잉' 상황": {
                'GDP': [510000], 'ICT_Production': [80000], 'ICT_Investment': [19000],
                'BSI_Composite': [105], 'Corporate_Loan_Rate': [4.5],
                'Equipment_Investment_Index': [115], 'productivity_index': [108], 'Exchange_Rate': [1200],
                'BSI_6M_MA': [103], 'GDP_12M_MA': [505000], 'Exchange_Rate_12M_Std': [25.0],
                'CCSI_3M_Momentum': [-1.5], 'ICT_Prod_6M_Momentum': [4000], 'Loan_Rate_Lag_3M': [4.2],
                'Retail_Sales_Index': [95], 'KOSPI': [2900]
            },
            "4. 소비는 살아있으나 기업 투자가 위축된 '불안한 호황'": {
                'GDP': [530000], 'ICT_Production': [60000], 'ICT_Investment': [14000],
                'BSI_Composite': [92], 'Corporate_Loan_Rate': [5.8],
                'Equipment_Investment_Index': [95], 'productivity_index': [110], 'Exchange_Rate': [1300],
                'BSI_6M_MA': [94], 'GDP_12M_MA': [525000], 'Exchange_Rate_12M_Std': [40.0],
                'CCSI_3M_Momentum': [1.0], 'ICT_Prod_6M_Momentum': [-500], 'Loan_Rate_Lag_3M': [5.5],
                'Retail_Sales_Index': [110], 'KOSPI': [2700]
            }
        }

        print("\n" + "=" * 50)
        print("          시나리오별 마케팅 등급 확률 예측 결과")
        print("=" * 50)

        for name, data in scenarios.items():
            print(f"\n----- 시나리오: {name} -----")
            prediction_result = predict_tier_probabilities(analyzer, data)
            if prediction_result is not None:
                print(prediction_result)

    except FileNotFoundError:
        print(f"\n[오류] 모델 파일 없음: '{model_filename}' 파일을 찾을 수 없습니다.")
        print("이 스크립트를 실행하기 전에 먼저 'marketing_main.py'를 실행하여 모델을 훈련하고 저장해주세요.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")