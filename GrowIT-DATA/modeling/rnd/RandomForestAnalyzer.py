import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import r2_score, accuracy_score, classification_report, confusion_matrix
import numpy as np
import optuna
from imblearn.over_sampling import SMOTE
import pickle
import os
from datetime import datetime


class RandomForestAnalyzer:
    """
    전처리된 데이터프레임을 입력받아 랜덤 포레스트 회귀 또는 분류 모델을 실행하고 평가하는 클래스.
    """

    def __init__(self, clean_dataframe, config):
        self.data = clean_dataframe
        self.config = config
        self.model_type = self.config.get('model_type', 'regressor')
        self.model = None
        self.features = self.config['features']
        self.target = self.config['target']
        self.X_train, self.X_test, self.y_train, self.y_test = [None] * 4
        self.best_params = None
        self.X, self.y = [None] * 2

    def prepare_modeling_data(self, y=None):
        if self.model_type == 'classifier':
            print("분류 모드: Y값 (productivity_tier)을 생성합니다...")
            quantiles = self.config['tier_quantiles']
            target_column = y if y else self.target
            clean_productivity = self.data[target_column].dropna()
            s_tier = clean_productivity.quantile(quantiles['S'])
            a_tier = clean_productivity.quantile(quantiles['A'])
            b_tier = clean_productivity.quantile(quantiles['B'])

            def assign_productivity_tier(rate):
                if rate >= s_tier:
                    return 'S'
                elif rate >= a_tier:
                    return 'A'
                elif rate >= b_tier:
                    return 'B'
                else:
                    return 'C'

            self.data[self.target] = self.data[target_column].apply(assign_productivity_tier)

        model_df = self.data[self.features + [self.target]].dropna()
        model_df = model_df.replace([np.inf, -np.inf], np.nan).dropna()

        self.X = model_df[self.features]
        self.y = model_df[self.target]

        stratify_option = self.y if self.model_type == 'classifier' else None
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=0.3, random_state=42, stratify=stratify_option
        )

        if self.model_type == 'classifier':
            # 각 클래스별 샘플 수 확인
            class_counts = pd.Series(self.y_train).value_counts()
            print(f"학습 데이터 클래스 분포: {class_counts.to_dict()}")
            
            # 최소 클래스 샘플 수 확인
            min_samples = class_counts.min()
            
            # SMOTE 적용 여부 결정 (최소 클래스 샘플이 6개 이상일 때만 적용)
            if min_samples >= 6:
                smote = SMOTE(random_state=42, k_neighbors=min(5, min_samples-1))
                self.X_train, self.y_train = smote.fit_resample(self.X_train, self.y_train)
                print("SMOTE 적용: 학습용 데이터 클래스 불균형 해결 완료.")
                # 적용 후 클래스 분포 확인
                new_class_counts = pd.Series(self.y_train).value_counts()
                print(f"SMOTE 적용 후 클래스 분포: {new_class_counts.to_dict()}")
            else:
                print(f"경고: 최소 클래스 샘플 수({min_samples})가 너무 적어 SMOTE를 적용하지 않습니다.")
                print("대신 class_weight='balanced' 옵션을 사용합니다.")

        print("모델링 데이터 준비 완료.")
        print(f"학습 데이터 크기: {self.X_train.shape}")
        print(f"테스트 데이터 크기: {self.X_test.shape}")

    def hyperparameter_tuning(self, n_trials=200):
        print("\n하이퍼파라미터 튜닝을 시작합니다...")

        def objective(trial):
            param = {
                'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
                'max_depth': trial.suggest_int('max_depth', 4, 50),
                'min_samples_split': trial.suggest_int('min_samples_split', 2, 20),
                'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 20)
            }
            if self.model_type == 'regressor':
                model = RandomForestRegressor(**param, random_state=42, n_jobs=-1)
                model.fit(self.X_train, self.y_train)
                return r2_score(self.y_test, model.predict(self.X_test))
            else:
                # 분류 모델에서는 항상 class_weight='balanced' 사용
                param['class_weight'] = 'balanced'
                model = RandomForestClassifier(**param, random_state=42, n_jobs=-1)
                model.fit(self.X_train, self.y_train)
                return accuracy_score(self.y_test, model.predict(self.X_test))

        study = optuna.create_study(direction='maximize')
        study.optimize(objective, n_trials=n_trials)
        self.best_params = study.best_params
        print("튜닝 완료.")
        print(f"최고 점수 (Best Score): {study.best_value:.4f}")
        print(f"최적 하이퍼파라미터: {self.best_params}")

    def cross_validation_score(self, cv_folds=5):
        print(f"\n{cv_folds}-fold 교차검증을 실행합니다...")
        params = {'random_state': 42, 'n_jobs': -1}
        if self.best_params:
            params.update(self.best_params)
        else:
            params['n_estimators'] = 100

        if self.model_type == 'regressor':
            model = RandomForestRegressor(**params)
            cv_scores = cross_val_score(model, self.X, self.y, cv=cv_folds, scoring='r2')
            metric_name = "R2 Score"
        else:
            # 분류 모델에서는 class_weight='balanced' 사용
            if 'class_weight' not in params:
                params['class_weight'] = 'balanced'
            model = RandomForestClassifier(**params)
            skf = StratifiedKFold(n_splits=cv_folds, shuffle=True, random_state=42)
            cv_scores = cross_val_score(model, self.X, self.y, cv=skf, scoring='accuracy')
            metric_name = "Accuracy"

        print(f"\n== 교차검증 결과 ({metric_name}) ==")
        print(f"각 fold 점수: {cv_scores}")
        print(f"평균: {cv_scores.mean():.4f} (±{cv_scores.std() * 2:.4f})")
        return cv_scores

    def train(self, use_best_params=False):
        params = {'random_state': 42, 'n_jobs': -1}
        if use_best_params and self.best_params:
            print("\n최적 하이퍼파라미터로 최종 모델을 학습합니다...")
            params.update(self.best_params)
        else:
            print("\n기본 하이퍼파라미터로 모델을 학습합니다...")
            params['n_estimators'] = 100

        if self.model_type == 'regressor':
            self.model = RandomForestRegressor(**params)
        elif self.model_type == 'classifier':
            # 샘플 수가 적은 클래스의 불균형을 위해 class_weight 설정
            if 'class_weight' not in params:
                params['class_weight'] = 'balanced'
            self.model = RandomForestClassifier(**params)

        self.model.fit(self.X_train, self.y_train)
        print("모델 학습 완료.")

    def evaluate(self, detailed=False):
        y_pred = self.model.predict(self.X_test)
        if self.model_type == 'regressor':
            return r2_score(self.y_test, y_pred)
        elif self.model_type == 'classifier':
            accuracy = accuracy_score(self.y_test, y_pred)
            if detailed:
                print(f"\n== 상세 분류 성능 평가 ==")
                print(f"정확도: {accuracy:.4f}")
                print("\n분류 리포트:")
                print(classification_report(self.y_test, y_pred, zero_division=0))
                print("\n혼동 행렬:")
                print(confusion_matrix(self.y_test, y_pred))
            return accuracy

    def get_feature_importances(self):
        importances = self.model.feature_importances_
        return pd.DataFrame(
            importances, index=self.features, columns=['Importance']
        ).sort_values(by='Importance', ascending=False)

    def predict_probabilities(self, data_dict):
        if self.model_type != 'classifier':
            return "확률 예측은 'classifier' 모드에서만 가능합니다."
        new_df = pd.DataFrame([data_dict])[self.features]
        probabilities = self.model.predict_proba(new_df)
        return pd.DataFrame(probabilities, columns=self.model.classes_, index=['Predicted Probability'])

    def predict_single(self, data_dict):
        """단일 데이터에 대한 예측"""
        new_df = pd.DataFrame([data_dict])[self.features]
        prediction = self.model.predict(new_df)
        return prediction[0]
    
    def save_model(self, filepath=None, model_name=None):
        """훈련된 모델과 메타데이터를 저장"""
        if self.model is None:
            raise ValueError("저장할 모델이 없습니다. 먼저 모델을 훈련해주세요.")
        
        # 저장 경로 설정
        if filepath is None:
            # rnd 폴더에 직접 저장
            save_dir = "./"
            
            # 모델명 생성
            if model_name is None:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                model_name = f"{self.model_type}_{self.target}_{timestamp}"
            
            filepath = os.path.join(save_dir, f"{model_name}.pkl")
        
        # 저장할 데이터 구성
        model_data = {
            'model': self.model,
            'features': self.features,
            'target': self.target,
            'model_type': self.model_type,
            'config': self.config,
            'best_params': self.best_params,
            'feature_names': list(self.features),  # 순서 보장
            'classes': getattr(self.model, 'classes_', None),  # 분류 모델의 클래스 정보
            'training_date': datetime.now().isoformat()
        }
        
        # 모델 저장
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        
        print(f"모델이 저장되었습니다: {filepath}")
        return filepath
    
    @classmethod
    def load_model(cls, filepath):
        """저장된 모델 불러오기"""
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"모델 파일을 찾을 수 없습니다: {filepath}")
        
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        # 새 인스턴스 생성
        analyzer = cls.__new__(cls)
        analyzer.model = model_data['model']
        analyzer.features = model_data['features']
        analyzer.target = model_data['target']
        analyzer.model_type = model_data['model_type']
        analyzer.config = model_data['config']
        analyzer.best_params = model_data.get('best_params')
        
        # 훈련 데이터는 없음 (예측만 가능)
        analyzer.X_train = analyzer.X_test = analyzer.y_train = analyzer.y_test = None
        analyzer.X = analyzer.y = None
        analyzer.data = None
        
        print(f"모델이 로드되었습니다: {filepath}")
        print(f"모델 타입: {analyzer.model_type}")
        print(f"타겟 변수: {analyzer.target}")
        print(f"특성 개수: {len(analyzer.features)}")
        if model_data.get('training_date'):
            print(f"훈련 날짜: {model_data['training_date']}")
        
        return analyzer
    
    def predict_with_input(self, **input_values):
        """입력값으로 예측 수행 (키워드 인자 방식)"""
        if self.model is None:
            raise ValueError("모델이 로드되지 않았습니다.")
        
        # 입력값 검증
        missing_features = set(self.features) - set(input_values.keys())
        if missing_features:
            raise ValueError(f"누락된 특성들: {missing_features}")
        
        # 예측용 데이터프레임 생성
        input_df = pd.DataFrame([input_values])[self.features]
        
        # 예측 수행
        if self.model_type == 'classifier':
            prediction = self.model.predict(input_df)[0]
            probabilities = self.model.predict_proba(input_df)[0]
            
            # 결과 정리
            prob_dict = {}
            for i, class_name in enumerate(self.model.classes_):
                prob_dict[class_name] = probabilities[i]
            
            return {
                'prediction': prediction,
                'probabilities': prob_dict,
                'max_probability': max(probabilities)
            }
        else:
            prediction = self.model.predict(input_df)[0]
            return {
                'prediction': prediction
            }
    
    def get_model_info(self):
        """모델 정보 출력"""
        if self.model is None:
            print("로드된 모델이 없습니다.")
            return
        
        print("=== 모델 정보 ===")
        print(f"모델 타입: {self.model_type}")
        print(f"타겟 변수: {self.target}")
        print(f"특성 개수: {len(self.features)}")
        print(f"특성 목록: {self.features}")
        
        if self.model_type == 'classifier' and hasattr(self.model, 'classes_'):
            print(f"클래스: {list(self.model.classes_)}")
        
        if self.best_params:
            print(f"최적 파라미터: {self.best_params}")


if __name__ == '__main__':
    try:
        data_filepath = "../../preprocessing/investing_rnd/master_for_modeling_1995_2025_imputed.csv"
        clean_data = pd.read_csv(data_filepath)
        print(f"'{data_filepath}' 파일을 성공적으로 불러왔습니다.\n")

        # --- 분석 모드 선택 ---
        CHOSEN_MODE = 'regressor'

        if CHOSEN_MODE == 'regressor':
            config = {
                'model_type': 'regressor',
                'target': 'manufacturing_productivity',
                'features': [
                    col for col in clean_data.columns 
                    if col not in ['manufacturing_productivity', 'service_productivity']
                ]
            }
            analyzer = RandomForestAnalyzer(clean_data, config)
            analyzer.prepare_modeling_data()

            # --- 여기가 핵심 실행 흐름 ---
            # 1. 하이퍼파라미터 튜닝 실행
            analyzer.hyperparameter_tuning(n_trials=50)

            # 2. 튜닝으로 찾은 최적의 파라미터로 최종 모델 학습
            analyzer.train(use_best_params=True)

            # 3. 최종 모델 평가 및 결과 확인
            score = analyzer.evaluate()
            importances = analyzer.get_feature_importances()

            print("\n" + "=" * 50)
            print("     랜덤 포레스트 [회귀] 튜닝 후 최종 결과")
            print("=" * 50)
            print(f"\n## 모델 평가 결과 (튜닝 후 R2 Score) ##\n{score:.4f}")
            print("\n## 변수별 영향력 (Feature Importance) ##")
            print(importances)

    except FileNotFoundError:
        print(f"\n[오류] 파일 없음: '{data_filepath}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"\n[오류] 분석 중 예외가 발생했습니다: {e}")
