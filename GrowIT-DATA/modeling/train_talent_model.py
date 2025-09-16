import pandas as pd
import joblib
import RandomForestAnalyzer

if __name__ == '__main__':
    try:
        # --- 데이터 파일 경로 설정 ---
        # 이 스크립트가 'modeling' 폴더에 있고, 데이터가 'preprocessing/project'에 있다고 가정
        data_filepath = "../preprocessing/project/simulation_data_with_features.csv"

        # --- 데이터 불러오기 ---
        clean_data = pd.read_csv(data_filepath, index_col='date', parse_dates=True)
        print(f"'{data_filepath}' 파일을 성공적으로 불러왔습니다.\n")

        # --- 모델 설정 ---
        features = clean_data.columns.tolist()
        config = {
            'model_type': 'classifier',
            'target': 'talent_tier',
            'tier_quantiles': {'S': 0.85, 'A': 0.60, 'B': 0.30},  # BSI를 기준으로 등급을 나눌 분위수
            'features': [col for col in features if col not in ['BSI_Composite', 'talent_tier']]
        }

        # --- 분석기 생성 및 데이터 준비 ---
        analyzer = RandomForestAnalyzer.RandomForestAnalyzer(clean_data, config)
        # 'BSI_Composite'를 기준으로 'talent_tier' (Y값) 생성 및 데이터 분할
        analyzer.prepare_modeling_data('BSI_Composite')
        print("모델링을 위한 데이터 준비가 완료되었습니다.")

        # --- 하이퍼파라미터 튜닝 및 최종 모델 훈련 ---
        print("하이퍼파라미터 튜닝을 시작합니다 (n_trials=50)...")
        analyzer.hyperparameter_tuning(n_trials=50)

        print("최적 파라미터로 최종 모델을 훈련합니다...")
        analyzer.train(use_best_params=True)

        # --- 모델 저장 ---
        model_filename = 'talent_tier_model.pkl'
        joblib.dump(analyzer, model_filename)

        print("\n" + "=" * 40)
        print("      모델 훈련 및 저장 완료")
        print("=" * 40)
        print(f"\n학습된 AI 모델을 '{model_filename}' 파일로 성공적으로 저장했습니다.")

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

            onnx_filename = 'talent_tier_model.onnx'
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

        # --- (선택) 최종 모델 성능 확인 ---
        score = analyzer.evaluate()
        importances = analyzer.get_feature_importances()
        print(f"\n최종 모델 평가 점수 (정확도): {score:.4f}")
        print("\n상위 10개 변수 영향력:")
        print(importances.head(10))


    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
        print("스크립트와 데이터 파일의 상대 경로가 올바른지 확인해주세요.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")
