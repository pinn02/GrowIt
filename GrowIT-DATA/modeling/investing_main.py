import pandas as pd
import joblib
import numpy as np  # numpy import 추가
import RandomForestAnalyzer

if __name__ == '__main__':
    try:
        data_filepath = "../preprocessing/investing/merged_data_with_gdp (1).csv"
        clean_data = pd.read_csv(data_filepath)

        # 날짜 컬럼 전처리
        date_column_name = clean_data.columns[0]
        clean_data[date_column_name] = pd.to_datetime(clean_data[date_column_name])
        clean_data['year'] = clean_data[date_column_name].dt.year
        clean_data['month'] = clean_data[date_column_name].dt.month
        clean_data = clean_data.drop(columns=[date_column_name])

        print("Date 컬럼을 'year', 'month' Feature로 변환했습니다.")

        # --- [핵심 수정 부분] Y값(gdp_통신업) 로그 변환 ---
        # 1. Y값에 로그를 취해 새로운 컬럼 생성 (np.log1p는 0이나 음수 값도 안전하게 처리)
        clean_data['gdp_통신업_log'] = np.log1p(clean_data['gdp_통신업'])

        # 2. 원본 Y값 컬럼은 삭제
        clean_data = clean_data.drop(columns=['gdp_통신업'])
        print("Y값('gdp_통신업')에 로그 변환을 적용했습니다.")
        # --- 전처리 완료 ---

        print("데이터를 불러와 모델 훈련을 시작합니다...")

        features = clean_data.columns.tolist()

        config = {
            'model_type': 'classifier',
            'target': 'talent_tier',
            'tier_quantiles': {'S': 0.95, 'A': 0.80, 'B': 0.50},

            # Feature 리스트에서 로그 변환된 Y값만 제외
            'features': [col for col in features if col not in ['gdp_통신업_log']]
        }

        analyzer = RandomForestAnalyzer.RandomForestAnalyzer(clean_data, config)

        # 등급을 나눌 기준 컬럼을 로그 변환된 컬럼으로 변경
        analyzer.prepare_modeling_data('gdp_통신업_log')

        print("X shape:", analyzer.X.shape)
        print("y 분포:\n", analyzer.y.value_counts())

        analyzer.hyperparameter_tuning(n_trials=50)
        analyzer.train(use_best_params=True)

        model_filename = 'facility_investment_model.pkl'
        joblib.dump(analyzer, model_filename)

        print("\n모델 훈련 완료!")
        print(f"학습된 AI 모델을 '{model_filename}' 파일로 저장했습니다.")

    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")