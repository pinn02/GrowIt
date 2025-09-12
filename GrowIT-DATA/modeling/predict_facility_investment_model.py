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
        model_filename = 'facility_investment_model.pkl'
        analyzer = joblib.load(model_filename)
        print(f"저장된 투자 AI 모델 '{model_filename}'을 불러왔습니다.")

        # --- [핵심 수정 부분] base_scenario에 year와 month 추가 ---
        base_scenario = {
            'year': 2025, 'month': 9,  # <-- year와 month 값을 추가했습니다.
            'corporate_loans_lagged_금리(연리%)': 5.0, 'corporate_loans_lagged_금리(연리%)_lag_6': 5.1,
            'corporate_loans_long_금리(연리%)': 5.05, 'GFCF_ICT_Real_long_GFCF_Real': 35000,
            'GFCF_Real_ma6_GFCF_Real': 34000, 'GFCF_Real_ma6_GFCF_Real_6년_이동평균': 33500,
            'ict_수입액 (백만US$)': 11000, 'ict_수출액 (백만US$)': 18000, 'info_comm_value': 950000,
            'investment_final_전기기기 및 장치_계절조정지수 (2020=100)': 105,
            'investment_final_전기기기 및 장치_원지수 (2020=100)': 106,
            'investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)': 110,
            'investment_final_컴퓨터사무용기계_원지수 (2020=100)': 112,
            'investment_final_특수산업용기계_계절조정지수 (2020=100)': 102,
            'investment_final_특수산업용기계_원지수 (2020=100)': 103,
            'investment_lagged_계절조정지수 (2020=100)_전기기기 및 장치': 104,
            'investment_lagged_계절조정지수 (2020=100)_컴퓨터사무용기계': 109,
            'investment_lagged_계절조정지수 (2020=100)_특수산업용기계': 101,
            'investment_lagged_원지수 (2020=100)_전기기기 및 장치': 105,
            'investment_lagged_원지수 (2020=100)_컴퓨터사무용기계': 111,
            'investment_lagged_원지수 (2020=100)_특수산업용기계': 102,
            'investment_lagged_계절조정지수 (2020=100)_lag_1_전기기기 및 장치': 103,
            'investment_lagged_계절조정지수 (2020=100)_lag_1_컴퓨터사무용기계': 108,
            'investment_lagged_계절조정지수 (2020=100)_lag_1_특수산업용기계': 100,
            'investment_lagged_계절조정지수 (2020=100)_lag_3_전기기기 및 장치': 102,
            'investment_lagged_계절조정지수 (2020=100)_lag_3_컴퓨터사무용기계': 107,
            'investment_lagged_계절조정지수 (2020=100)_lag_3_특수산업용기계': 99,
            'investment_lagged_계절조정지수 (2020=100)_lag_6_전기기기 및 장치': 101,
            'investment_lagged_계절조정지수 (2020=100)_lag_6_컴퓨터사무용기계': 106,
            'investment_lagged_계절조정지수 (2020=100)_lag_6_특수산업용기계': 98,
            'investment_lagged_계절조정지수 (2020=100)_lag_12_전기기기 및 장치': 100,
            'investment_lagged_계절조정지수 (2020=100)_lag_12_컴퓨터사무용기계': 105,
            'investment_lagged_계절조정지수 (2020=100)_lag_12_특수산업용기계': 97,
            'investment_lagged_원지수 (2020=100)_lag_1_전기기기 및 장치': 104,
            'investment_lagged_원지수 (2020=100)_lag_1_컴퓨터사무용기계': 110,
            'investment_lagged_원지수 (2020=100)_lag_1_특수산업용기계': 101,
            'investment_lagged_원지수 (2020=100)_lag_3_전기기기 및 장치': 103,
            'investment_lagged_원지수 (2020=100)_lag_3_컴퓨터사무용기계': 109,
            'investment_lagged_원지수 (2020=100)_lag_3_특수산업용기계': 100,
            'investment_lagged_원지수 (2020=100)_lag_6_전기기기 및 장치': 102,
            'investment_lagged_원지수 (2020=100)_lag_6_컴퓨터사무용기계': 108,
            'investment_lagged_원지수 (2020=100)_lag_6_특수산업용기계': 99,
            'investment_lagged_원지수 (2020=100)_lag_12_전기기기 및 장치': 101,
            'investment_lagged_원지수 (2020=100)_lag_12_컴퓨터사무용기계': 107,
            'investment_lagged_원지수 (2020=100)_lag_12_특수산업용기계': 98,
            'investment_ma_돈_전기기기 및 장치_원지수 (2020=100)': 105.5,
            'investment_ma_돈_전기기기 및 장치_계절조정지수 (2020=100)': 104.5,
            'investment_ma_돈_컴퓨터사무용기계_원지수 (2020=100)': 111.5,
            'investment_ma_돈_컴퓨터사무용기계_계절조정지수 (2020=100)': 109.5,
            'investment_ma_돈_특수산업용기계_원지수 (2020=100)': 102.5,
            'investment_ma_돈_특수산업용기계_계절조정지수 (2020=100)': 101.5,
            'investment_ma_이동평균_3개월_전기기기 및 장치_원지수 (2020=100)': 105,
            'investment_ma_이동평균_3개월_전기기기 및 장치_계절조정지수 (2020=100)': 104,
            'investment_ma_이동평균_3개월_컴퓨터사무용기계_원지수 (2020=100)': 111,
            'investment_ma_이동평균_3개월_컴퓨터사무용기계_계절조정지수 (2020=100)': 109,
            'investment_ma_이동평균_3개월_특수산업용기계_원지수 (2020=100)': 102,
            'investment_ma_이동평균_3개월_특수산업용기계_계절조정지수 (2020=100)': 101,
            'investment_ma_이동평균_6개월_전기기기 및 장치_원지수 (2020=100)': 104,
            'investment_ma_이동평균_6개월_전기기기 및 장치_계절조정지수 (2020=100)': 103,
            'investment_ma_이동평균_6개월_컴퓨터사무용기계_원지수 (2020=100)': 110,
            'investment_ma_이동평균_6개월_컴퓨터사무용기계_계절조정지수 (2020=100)': 108,
            'investment_ma_이동평균_6개월_특수산업용기계_원지수 (2020=100)': 101,
            'investment_ma_이동평균_6개월_특수산업용기계_계절조정지수 (2020=100)': 100,
            'investment_ma_이동평균_12개월_전기기기 및 장치_원지수 (2020=100)': 103,
            'investment_ma_이동평균_12개월_전기기기 및 장치_계절조정지수 (2020=100)': 102,
            'investment_ma_이동평균_12개월_컴퓨터사무용기계_원지수 (2020=100)': 109,
            'investment_ma_이동평균_12개월_컴퓨터사무용기계_계절조정지수 (2020=100)': 107,
            'investment_ma_이동평균_12개월_특수산업용기계_원지수 (2020=100)': 100,
            'investment_ma_이동평균_12개월_특수산업용기계_계절조정지수 (2020=100)': 99,
            'exchange_rate_lagged_환율': 1200, 'exchange_rate_lagged_환율_lag_1': 1190,
            'exchange_rate_lagged_환율_lag_6': 1180, 'exchange_rate_long_환율': 1210,
            'software_expenditure': 500
        }

        s1 = base_scenario.copy()
        s1.update({
            'corporate_loans_long_금리(연리%)': 3.5, 'GFCF_ICT_Real_long_GFCF_Real': 45000,
            'ict_수출액 (백만US$)': 25000, 'investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)': 130,
            'software_expenditure': 700
        })

        s2 = base_scenario.copy()
        s2.update({
            'corporate_loans_long_금리(연리%)': 7.5, 'GFCF_ICT_Real_long_GFCF_Real': 25000,
            'ict_수출액 (백만US$)': 12000, 'investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)': 90,
            'software_expenditure': 300
        })

        s3 = base_scenario.copy()
        s3.update({
            'corporate_loans_long_금리(연리%)': 4.0, 'GFCF_ICT_Real_long_GFCF_Real': 55000,
            'ict_수출액 (백만US$)': 30000, 'investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)': 150,
            'info_comm_value': 1200000, 'software_expenditure': 800
        })

        s4 = base_scenario.copy()
        s4.update({
            'corporate_loans_long_금리(연리%)': 8.0, 'exchange_rate_long_환율': 1500,
            'GFCF_ICT_Real_long_GFCF_Real': 30000,
            'investment_final_컴퓨터사무용기계_계절조정지수 (2020=100)': 95,
        })

        scenarios = {
            "1. 전반적인 경제 호황": s1,
            "2. 전반적인 경제 불황": s2,
            "3. ICT 산업 특수 호황 (언택트)": s3,
            "4. 고금리/고환율 금융 위기": s4
        }

        scenarios_df = {name: {k: [v] for k, v in data.items()} for name, data in scenarios.items()}

        print("\n" + "=" * 50)
        print("     시나리오별 통신업 GDP 등급 확률 예측 결과")
        print("=" * 50)

        for name, data in scenarios_df.items():
            print(f"\n----- 시나리오: {name} -----")
            prediction_result = predict_tier_probabilities(analyzer, data)
            if prediction_result is not None:
                print(prediction_result)

    except FileNotFoundError:
        print(f"\n[오류] 모델 파일 없음: '{model_filename}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"\n[오류] 처리 중 문제가 발생했습니다: {e}")