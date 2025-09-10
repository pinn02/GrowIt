import RandomForestAnalyzer
import pandas as pd
import joblib

if __name__ == '__main__':
    try:
        data_filepath = "../preprocessing/project/simulation_data_with_features.csv"
        clean_data = pd.read_csv(data_filepath, index_col='date', parse_dates=True)

        print("데이터를 불러와 모델 훈련을 시작합니다...")

        features = clean_data.columns.tolist()
        config = {
            'model_type': 'classifier',
            'target': 'talent_tier',
            'tier_quantiles': {'S': 0.85, 'A': 0.60, 'B': 0.30},
            'features': [col for col in features if col not in ['BSI_Composite', 'talent_tier']]
        }
        analyzer = RandomForestAnalyzer.RandomForestAnalyzer(clean_data, config)
        analyzer.prepare_modeling_data('BSI_Composite')

        analyzer.hyperparameter_tuning(n_trials=50)
        analyzer.train(use_best_params=True)

        model_filename = 'talent_tier_model.pkl'
        joblib.dump(analyzer, model_filename)

        print("\n모델 훈련 완료!")
        print(f"학습된 AI 모델을 '{model_filename}' 파일로 저장했습니다.")

    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")
