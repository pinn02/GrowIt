import pandas as pd
import joblib

def predict_tier_from_real_data(model_analyzer, data_row):
    try:
        input_df = pd.DataFrame(data_row).T
        features = model_analyzer.features

        probabilities = model_analyzer.model.predict_proba(input_df[features])

        class_labels = model_analyzer.model.classes_
        result = pd.Series(probabilities[0], index=class_labels)

        return result.sort_values(ascending=False)
    except Exception as e:
        print(f"[오류] 예측 중 문제가 발생했습니다: {e}")
        return None


if __name__ == '__main__':
    try:
        model_filename = 'facility_investment_model.pkl'
        analyzer = joblib.load(model_filename)
        print(f"저장된 투자 AI 모델 '{model_filename}'을 불러왔습니다.")

        data_filepath = '../preprocessing/investing/merged_data_with_gdp (1).csv'
        df_full = pd.read_csv(data_filepath)
        print(f"'{data_filepath}' 파일에서 테스트 데이터를 불러왔습니다.")

        # --- [핵심 수정 부분] 훈련 스크립트와 동일한 전처리 적용 ---
        date_column_name = df_full.columns[0]
        df_full[date_column_name] = pd.to_datetime(df_full[date_column_name])
        df_full['year'] = df_full[date_column_name].dt.year
        df_full['month'] = df_full[date_column_name].dt.month
        df_full = df_full.drop(columns=[date_column_name])
        print("예측 데이터에 'year', 'month' Feature를 생성했습니다.\n")
        # --- 전처리 완료 ---

        row_index_to_test = 150

        if row_index_to_test >= len(df_full):
            raise IndexError(f"'{data_filepath}' 파일에 {row_index_to_test}번째 행이 없습니다.")

        test_data_row = df_full.iloc[row_index_to_test]

        print("=" * 50)
        print(f"   '{data_filepath}' 파일의 {row_index_to_test}번째 행 데이터로 예측")
        print("=" * 50)

        prediction_result = predict_tier_from_real_data(analyzer, test_data_row)

        if prediction_result is not None:
            print(f"\n[예측 결과]\n{prediction_result}")

    except FileNotFoundError as e:
        print(f"\n[오류] 필수 파일을 찾을 수 없습니다: {e}")
    except IndexError as e:
        print(f"\n[오류] {e}")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")