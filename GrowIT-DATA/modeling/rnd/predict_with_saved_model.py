import RandomForestAnalyzer
import pandas as pd
import os


def predict_talent_tier():
    """저장된 모델을 사용하여 talent tier 예측"""
    
    # 모델 파일 경로
    model_path = "./rnd_tier_classifier.pkl"
    
    if not os.path.exists(model_path):
        print(f"모델 파일을 찾을 수 없습니다: {model_path}")
        print("먼저 rnd_productivity_analysis.py를 실행하여 모델을 훈련하고 저장해주세요.")
        return
    
    try:
        # 저장된 모델 로드
        print("저장된 모델을 불러오는 중...")
        analyzer = RandomForestAnalyzer.RandomForestAnalyzer.load_model(model_path)
        
        print("\n" + "="*60)
        print("           R&D 생산성 기반 인재 등급 예측 시스템")
        print("="*60)
        
        # 모델 정보 출력
        analyzer.get_model_info()
        
        print("\n" + "="*60)
        print("필요한 입력 변수들:")
        for i, feature in enumerate(analyzer.features, 1):
            print(f"{i:2d}. {feature}")
        print("="*60)
        
        # 실제 데이터 통계를 기반으로 한 현실적인 예시 예측
        print("\n=== 현실적인 예시 예측 ===")
        
        # 실제 데이터 로드하여 평균값 사용
        try:
            data_filepath = "../../preprocessing/investing_rnd/master_for_modeling_1995_2025_imputed.csv"
            sample_data = pd.read_csv(data_filepath, index_col='year', parse_dates=True)
            
            # 각 특성의 평균값 계산 (현실적인 샘플)
            realistic_sample = {}
            for feature in analyzer.features:
                if feature in sample_data.columns:
                    mean_value = sample_data[feature].mean()
                    realistic_sample[feature] = mean_value
                else:
                    realistic_sample[feature] = 0.0
            
            print("현실적인 샘플 입력값 (각 특성의 평균값):")
            for key, value in realistic_sample.items():
                print(f"  {key}: {value:.2f}")
            
            # 현실적인 예측 수행
            realistic_result = analyzer.predict_with_input(**realistic_sample)
            
            print(f"\n현실적인 예측 결과:")
            print(f"  예측된 등급: {realistic_result['prediction']}")
            print(f"  최대 확률: {realistic_result['max_probability']:.3f}")
            print(f"\n각 등급별 확률:")
            for class_name, prob in sorted(realistic_result['probabilities'].items(), key=lambda x: x[1], reverse=True):
                print(f"  {class_name}: {prob:.3f} ({prob*100:.1f}%)")
            
            # 다양한 시나리오 예측
            print(f"\n{'='*60}")
            print("다양한 시나리오별 예측 결과:")
            print(f"{'='*60}")
            
            scenarios = {
                "고성과 기업": {factor: value * 1.5 for factor, value in realistic_sample.items()},
                "평균 기업": realistic_sample.copy(),
                "저성과 기업": {factor: value * 0.6 for factor, value in realistic_sample.items()},
                "R&D 집약적 기업": realistic_sample.copy()
            }
            
            # R&D 집약적 기업 시나리오 조정
            rnd_features = [f for f in analyzer.features if 'rnd' in f.lower()]
            for feature in rnd_features:
                scenarios["R&D 집약적 기업"][feature] *= 2.0
            
            for scenario_name, scenario_data in scenarios.items():
                try:
                    result = analyzer.predict_with_input(**scenario_data)
                    print(f"\n{scenario_name}:")
                    print(f"  예측 등급: {result['prediction']} (확률: {result['max_probability']:.3f})")
                    # 상위 2개 클래스만 표시
                    sorted_probs = sorted(result['probabilities'].items(), key=lambda x: x[1], reverse=True)[:2]
                    for class_name, prob in sorted_probs:
                        print(f"    {class_name}: {prob:.3f} ({prob*100:.1f}%)")
                except Exception as e:
                    print(f"  {scenario_name} 예측 오류: {e}")
                    
        except FileNotFoundError:
            print("원본 데이터 파일을 찾을 수 없어 기본 예시만 표시합니다.")
            print("실제 사용시에는 의미 있는 데이터 값을 입력해주세요.")
        
        # 사용자 정의 예측 함수
        print(f"\n{'='*60}")
        print("사용자 정의 예측을 원하시면 아래 함수를 사용하세요:")
        print(f"{'='*60}")
        print("""
def custom_predict(**input_values):
    # 모델 로드
    analyzer = RandomForestAnalyzer.RandomForestAnalyzer.load_model('./talent_tier_classifier.pkl')
    
    # 예측 수행
    result = analyzer.predict_with_input(**input_values)
    
    print(f"예측된 등급: {result['prediction']}")
    print("각 등급별 확률:")
    for class_name, prob in result['probabilities'].items():
        print(f"  {class_name}: {prob:.3f} ({prob*100:.1f}%)")
    
    return result

# 사용 예시:
# result = custom_predict(
#     total_rnd_personnel=1500,
#     rnd_budget_billion=75.2,
#     patents_applied=120,
#     # ... 모든 필요한 특성 값들
# )
        """)
        
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")


def interactive_prediction():
    """대화형 예측 인터페이스"""
    model_path = "./talent_tier_classifier.pkl"
    
    if not os.path.exists(model_path):
        print(f"모델 파일을 찾을 수 없습니다: {model_path}")
        return
    
    try:
        analyzer = RandomForestAnalyzer.RandomForestAnalyzer.load_model(model_path)
        
        print("\n" + "="*50)
        print("     대화형 인재 등급 예측")
        print("="*50)
        
        # 사용자로부터 입력받기
        input_values = {}
        print("\n각 특성값을 입력해주세요 (숫자만 입력):")
        
        for feature in analyzer.features:
            while True:
                try:
                    value = input(f"{feature}: ")
                    input_values[feature] = float(value)
                    break
                except ValueError:
                    print("숫자를 입력해주세요.")
        
        # 예측 수행
        result = analyzer.predict_with_input(**input_values)
        
        print(f"\n{'='*30}")
        print("      예측 결과")
        print(f"{'='*30}")
        print(f"예측된 등급: {result['prediction']}")
        print(f"확신도: {result['max_probability']:.3f}")
        print(f"\n각 등급별 확률:")
        for class_name, prob in sorted(result['probabilities'].items(), key=lambda x: x[1], reverse=True):
            print(f"  {class_name}: {prob:.3f} ({prob*100:.1f}%)")
        
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")


if __name__ == '__main__':
    # 기본 예측 실행
    predict_talent_tier()
    
    # 대화형 예측을 원하는 경우 아래 주석 해제
    # print("\n" + "="*60)
    # response = input("대화형 예측을 실행하시겠습니까? (y/N): ").strip().lower()
    # if response in ['y', 'yes']:
    #     interactive_prediction()
