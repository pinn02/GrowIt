import pandas as pd
import joblib
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np


def predict_batch_probabilities(model_analyzer, data_df):
    """
    데이터프레임 전체를 받아 등급별 확률을 반환하는 함수
    """
    try:
        features = model_analyzer.features
        # 훈련에 사용된 feature만 선택하여 예측
        probabilities = model_analyzer.model.predict_proba(data_df[features])
        return probabilities
    except Exception as e:
        print(f"[오류] 일괄 예측 중 문제가 발생했습니다: {e}")
        return None


if __name__ == '__main__':
    try:
        # 1. 한글 폰트 설정 (그래프 깨짐 방지)
        try:
            plt.rcParams['font.family'] = 'AppleGothic'
        except RuntimeError:
            try:
                plt.rcParams['font.family'] = 'Malgun Gothic'
            except RuntimeError:
                print("[경고] 한글 폰트(AppleGothic, Malgun Gothic)가 없어 기본 폰트로 출력합니다. 그래프의 한글이 깨질 수 있습니다.")
        plt.rcParams['axes.unicode_minus'] = False

        # 2. 모델 및 데이터 불러오기
        model_filename = 'facility_investment_model.pkl'
        analyzer = joblib.load(model_filename)
        print(f"저장된 투자 AI 모델 '{model_filename}'을 불러왔습니다.")

        data_filepath = '../preprocessing/investing/merged_data_with_gdp (1).csv'
        df_full = pd.read_csv(data_filepath)
        print(f"'{data_filepath}' 파일에서 전체 데이터를 불러왔습니다.")

        # 3. 훈련 스크립트와 동일한 전처리 적용
        date_column_name = df_full.columns[0]
        # 그래프 X축으로 사용하기 위해 날짜 인덱스 저장
        date_index = pd.to_datetime(df_full[date_column_name])

        df_full['year'] = date_index.dt.year
        df_full['month'] = date_index.dt.month
        df_full = df_full.drop(columns=[date_column_name])
        print("예측 데이터에 'year', 'month' Feature를 생성했습니다.")

        # 4. 전체 데이터에 대해 일괄 예측 수행
        print("전체 데이터에 대한 예측을 시작합니다...")
        all_probabilities = predict_batch_probabilities(analyzer, df_full)

        if all_probabilities is not None:
            # 5. 예측 결과를 DataFrame으로 변환
            results_df = pd.DataFrame(all_probabilities, columns=analyzer.model.classes_, index=date_index)
            print("예측 완료. 이제 그래프를 생성합니다.")

            # 6. 결과 그래프 생성 및 저장
            plt.style.use('seaborn-v0_8-whitegrid')
            fig, ax = plt.subplots(figsize=(16, 8))

            results_df.plot(ax=ax, linewidth=2)

            ax.set_title('시간에 따른 등급별 예측 확률 변화', fontsize=18, pad=20)
            ax.set_xlabel('날짜', fontsize=12)
            ax.set_ylabel('예측 확률', fontsize=12)
            ax.legend(title='등급', fontsize=10)
            ax.set_ylim(0, 1)  # Y축 범위를 0~1로 고정

            output_filename = 'prediction_graph.png'
            plt.savefig(output_filename, dpi=150)
            plt.close()

            print(f"\n[성공] 예측 결과 그래프를 '{output_filename}' 파일로 저장했습니다. 파일을 확인해주세요.")

    except FileNotFoundError as e:
        print(f"\n[오류] 필수 파일을 찾을 수 없습니다: {e}")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")