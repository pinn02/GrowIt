import pandas as pd
import joblib
import numpy as np
import RandomForestAnalyzer

if __name__ == '__main__':
    try:
        data_filepath = "../preprocessing/investing/merged_data_with_gdp (1).csv"
        clean_data = pd.read_csv(data_filepath)

        # 1. 날짜 컬럼을 'year', 'month' Feature로 변환
        date_column_name = clean_data.columns[0]
        clean_data[date_column_name] = pd.to_datetime(clean_data[date_column_name])
        clean_data['year'] = clean_data[date_column_name].dt.year
        clean_data['month'] = clean_data[date_column_name].dt.month
        clean_data = clean_data.drop(columns=[date_column_name])
        print("Date 컬럼을 'year', 'month' Feature로 변환했습니다.")

        # --- [핵심 수정 부분] Y값 변경 ---
        # 2. 파일에 실제 존재하는 'GFCF_ICT_Real_long_GFCF_Real'을 새로운 Y값으로 사용합니다.
        NEW_Y_VARIABLE = 'GFCF_ICT_Real_long_GFCF_Real'
        print(f"모델의 목표(Y값)를 '{NEW_Y_VARIABLE}'으로 변경합니다.")

        features = clean_data.columns.tolist()

        config = {
            'model_type': 'classifier',
            'target': 'talent_tier',
            'tier_quantiles': {'S': 0.80, 'A': 0.50, 'B': 0.25},
            # Feature 리스트에서 새로운 Y값만 제외합니다.
            'features': [col for col in features if col != NEW_Y_VARIABLE]
        }

        analyzer = RandomForestAnalyzer.RandomForestAnalyzer(clean_data, config)

        # 등급을 나눌 기준 컬럼을 새로운 Y값으로 지정
        analyzer.prepare_modeling_data(NEW_Y_VARIABLE)

        print("X shape:", analyzer.X.shape)
        print("y 분포:\n", analyzer.y.value_counts())

        analyzer.hyperparameter_tuning(n_trials=50)
        analyzer.train(use_best_params=True)

        importances = analyzer.get_feature_importances()
        print("\n" + "=" * 50)
        print("         새로운 모델의 변수별 영향력")
        print("=" * 50)
        print(importances)

        # 3. 새로운 모델 이름으로 저장
        model_filename = 'facility_investment_model.pkl'
        joblib.dump(analyzer, model_filename)

        print(f"\n학습된 AI 모델을 '{model_filename}' 파일로 저장했습니다.")

    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
    except KeyError as e:
        print(f"\n[오류] 컬럼 이름 확인 필요: {e} 컬럼이 파일에 존재하지 않습니다.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")