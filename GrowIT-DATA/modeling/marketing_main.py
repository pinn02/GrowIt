import RandomForestAnalyzer
import pandas as pd
import joblib

if __name__ == '__main__':
    try:
        data_filepath = "../preprocessing/marketing/final_dataset_with_exchange_rate.csv"

        # --- 데이터 불러오기 ---
        clean_data = pd.read_csv(data_filepath, index_col='date', parse_dates=True)

        print("데이터를 불러와 모델 훈련을 시작합니다...")

        # 전체 컬럼
        features = clean_data.columns.tolist()

        # --- 설정 ---
        config = {
            'model_type': 'classifier',
            'target': 'talent_tier',
            'tier_quantiles': {'S': 0.85, 'A': 0.60, 'B': 0.30},  # prepare_modeling_data에서 사용

            # --- 수정된 부분 ---
            # Feature 리스트에서 CCSI(새로운 Y)와 불필요해진 Ad_Sentiment_DI(이전 Y)를 모두 제외
            'features': [col for col in features if col not in ['CCSI', 'Ad_Sentiment_DI', 'talent_tier']]
        }

        analyzer = RandomForestAnalyzer.RandomForestAnalyzer(clean_data, config)

        # 등급을 나눌 기준 컬럼을 'CCSI'로 변경
        analyzer.prepare_modeling_data('CCSI')

        print("X shape:", analyzer.X.shape)
        print("y 분포:\n", analyzer.y.value_counts())

        # --- 학습 ---
        analyzer.hyperparameter_tuning(n_trials=50)
        analyzer.train(use_best_params=True)

        # --- 모델 저장 ---
        model_filename = 'marketing_tier_model.pkl'
        joblib.dump(analyzer, model_filename)

        print("\n모델 훈련 완료!")
        print(f"학습된 AI 모델을 '{model_filename}' 파일로 저장했습니다.")

    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")