import pandas as pd
import joblib


def predict_tier_probabilities(model_analyzer, new_data):
    try:
        feature_order = model_analyzer.features
        input_df = pd.DataFrame(new_data, index=[0])[feature_order]

        probabilities = model_analyzer.model.predict_proba(input_df)

        class_labels = model_analyzer.model.classes_
        result = pd.Series(probabilities[0], index=class_labels)

        return result.sort_values(ascending=False)

    except Exception as e:
        print(f"[오류] 예측 중 문제가 발생했습니다: {e}")
        return None


if __name__ == '__main__':
    try:
        model_filename = 'talent_tier_model.pkl'
        analyzer = joblib.load(model_filename)
        print(f"저장된 AI 모델 '{model_filename}'을 불러왔습니다.")

        scenarios = {
            "1. 전반적인 경제 호황기": {
                'GDP': [550000], 'ICT_Production': [70000], 'ICT_Investment': [18000],
                'CCSI': [105], 'Corporate_Loan_Rate': [3.5], 'Equipment_Investment_Index': [110],
                'productivity_index': [115], 'Exchange_Rate': [1100],
                'BSI_6M_MA': [102], 'GDP_12M_MA': [540000], 'Exchange_Rate_12M_Std': [15.0],
                'CCSI_3M_Momentum': [2.5], 'ICT_Prod_6M_Momentum': [3000], 'Loan_Rate_Lag_3M': [3.6]
            },
            "2. 전반적인 경제 불황기": {
                'GDP': [480000], 'ICT_Production': [45000], 'ICT_Investment': [13000],
                'CCSI': [85], 'Corporate_Loan_Rate': [6.5], 'Equipment_Investment_Index': [90],
                'productivity_index': [98], 'Exchange_Rate': [1350],
                'BSI_6M_MA': [88], 'GDP_12M_MA': [490000], 'Exchange_Rate_12M_Std': [50.0],
                'CCSI_3M_Momentum': [-3.0], 'ICT_Prod_6M_Momentum': [-1500], 'Loan_Rate_Lag_3M': [6.2]
            },
            "3. 다른건 보통, ICT 산업만 특수 호황": {
                'GDP': [500000], 'ICT_Production': [95000], 'ICT_Investment': [22000],
                'CCSI': [100], 'Corporate_Loan_Rate': [5.0], 'Equipment_Investment_Index': [100],
                'productivity_index': [105], 'Exchange_Rate': [1250],
                'BSI_6M_MA': [95], 'GDP_12M_MA': [500000], 'Exchange_Rate_12M_Std': [30.0],
                'CCSI_3M_Momentum': [0.5], 'ICT_Prod_6M_Momentum': [8000], 'Loan_Rate_Lag_3M': [5.1]
            },
            "4. 안정적 경제 상황 속 갑작스런 금융 위기": {
                'GDP': [520000], 'ICT_Production': [60000], 'ICT_Investment': [16000],
                'CCSI': [101], 'Corporate_Loan_Rate': [7.8], 'Equipment_Investment_Index': [105],
                'productivity_index': [110], 'Exchange_Rate': [1500],
                'BSI_6M_MA': [99], 'GDP_12M_MA': [510000], 'Exchange_Rate_12M_Std': [85.0],
                'CCSI_3M_Momentum': [-1.0], 'ICT_Prod_6M_Momentum': [500], 'Loan_Rate_Lag_3M': [4.5]
            }
        }

        print("\n" + "=" * 50)
        print("          시나리오별 등급 확률 예측 결과")
        print("=" * 50)

        for name, data in scenarios.items():
            print(f"\n----- 시나리오: {name} -----")
            prediction_result = predict_tier_probabilities(analyzer, data)
            if prediction_result is not None:
                print(prediction_result)

    except FileNotFoundError:
        print(f"\n[오류] 모델 파일 없음: '{model_filename}' 파일을 찾을 수 없습니다.")
        print("먼저 'train_and_save_model.py'를 실행하여 모델을 저장해주세요.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")
