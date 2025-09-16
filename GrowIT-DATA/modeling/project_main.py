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

        model_filename = 'project_tier_model.pkl'
        joblib.dump(analyzer, model_filename)

        print("\n모델 훈련 완료!")
        print(f"학습된 AI 모델을 '{model_filename}' 파일로 저장했습니다.")

        # --- [ONNX 변환 파트 시작] ---
        print("\n" + "=" * 50)
        print("         ONNX 모델 변환 시작")
        print("=" * 50)

        try:
            from skl2onnx import convert_sklearn
            from skl2onnx.common.data_types import FloatTensorType

            sklearn_model = analyzer.model

            n_features = analyzer.X.shape[1]
            initial_type = [('float_input', FloatTensorType([None, n_features]))]

            onnx_model = convert_sklearn(sklearn_model, initial_types=initial_type)

            onnx_filename = 'project_tier_model.onnx'
            with open(onnx_filename, "wb") as f:
                f.write(onnx_model.SerializeToString())

            print(f"ONNX 모델을 '{onnx_filename}' 파일로 성공적으로 저장했습니다.")
            print(f"이제 이 '{onnx_filename}' 파일을 Java 프로젝트에서 사용하면 됩니다.")

        except ImportError:
            print("\n[오류] ONNX 변환에 필요한 라이브러리가 설치되지 않았습니다.")
            print("터미널에서 'pip install skl2onnx onnx onnxruntime' 명령어를 실행해주세요.")
        except Exception as e:
            print(f"\n[오류] ONNX 변환 중 문제가 발생했습니다: {e}")
        # --- [ONNX 변환 파트 끝] ---

    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")

