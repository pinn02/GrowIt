# preprocessing/merge_master_to_modeling.py
import pandas as pd
from pathlib import Path
from typing import List, Optional

def read_csv(path: str | Path, encodings: List[str] = ["utf-8-sig", "utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def coalesce_cols(df: pd.DataFrame, cols: List[str], out_col: str) -> pd.DataFrame:
    present = [c for c in cols if c in df.columns]
    if not present:
        return df
    df[out_col] = df[present[0]]
    for c in present[1:]:
        df[out_col] = df[out_col].fillna(df[c])
    # 중복 후보 컬럼 정리
    for c in present:
        if c != out_col and c in df.columns:
            df.drop(columns=c, inplace=True)
    return df

def recompute_lags(df: pd.DataFrame, base_col: str, lag1: str, lag2: str) -> pd.DataFrame:
    if base_col in df.columns:
        df = df.sort_values("year").reset_index(drop=True)
        df[lag1] = df[base_col].shift(1)
        df[lag2] = df[base_col].shift(2)
    return df

def merge_all_to_modeling(
    wage_path: str | Path,
    appreg_path: str | Path,
    service_path: str | Path,
    manufacturing_path: str | Path,
    blockchain_rnd_path: str | Path,
    loan_path: str | Path,
    rnd_total_path: str | Path,
    output_path: str | Path,
    full_start_year: int = 1995,
    full_end_year: int = 2025,
) -> pd.DataFrame:
    # 0) 연도 프레임(1995~2025) 생성
    year_frame = pd.DataFrame({"year": list(range(full_start_year, full_end_year + 1))})

    # 1) 개별 파일 로드
    wage = read_csv(wage_path)                 # year, regular_avg_wage
    appreg = read_csv(appreg_path)             # year, corp_domestic_applications/registrations(+lags)
    service = read_csv(service_path)           # year, service_productivity
    manu = read_csv(manufacturing_path)        # year, manufacturing_productivity
    block = read_csv(blockchain_rnd_path)      # year, rnd_total_by_industry_* (+ rnd_total, rnd_total_lag1/2 있을 수도)
    loan = read_csv(loan_path)                 # year, bank_loan_avg (+lags)
    rnd = read_csv(rnd_total_path)             # year, rnd_total (+lags)

    # 2) 연도 프레임에 순차 병합(outer)
    merged = year_frame
    for df in [wage, appreg, service, manu, block, loan, rnd]:
        merged = pd.merge(merged, df, on="year", how="left")

    # 3) rnd_total 정리 (중복 방지)
    merged = coalesce_cols(merged, ["rnd_total", "rnd_total_x", "rnd_total_y"], "rnd_total")

    # 4) rnd_total lag 없으면 새로 계산
    has_lag1 = "rnd_total_lag1" in merged.columns
    has_lag2 = "rnd_total_lag2" in merged.columns
    if not (has_lag1 and has_lag2):
        merged = recompute_lags(merged, base_col="rnd_total", lag1="rnd_total_lag1", lag2="rnd_total_lag2")

    # 5) 컬럼 순서 정리 (year 먼저)
    cols = ["year"] + [c for c in sorted(merged.columns) if c != "year"]
    merged = merged[cols]

    # 6) 저장 (모델링 디렉토리)
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    merged.to_csv(output_path, index=False, encoding="utf-8-sig")
    return merged

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent.parent

    # 입력 파일 경로 (전처리 산출물)
    wage_path = project_root / "preprocessing" / "investing_rnd" / "regular_avg_wage_yearly.csv"
    appreg_path = project_root / "preprocessing" / "investing_rnd" / "applications_registrations_imputed.csv"
    service_path = project_root / "preprocessing" / "investing_rnd" / "service_productivity_total.csv"
    manufacturing_path = project_root / "preprocessing" / "investing_rnd" / "manufacturing_productivity_total.csv"
    blockchain_rnd_path = project_root / "preprocessing" / "investing_rnd" / "blockchain_rnd_total_pivot.csv"
    loan_path = project_root / "preprocessing" / "investing_rnd" / "bank_loan_avg_with_lags.csv"
    rnd_total_path = project_root / "preprocessing" / "investing_rnd" / "rnd_total_investment_with_lags.csv"

    # 출력: 모델링 디렉토리에 저장
    modeling_out = project_root / "preprocessing" / "investing_rnd" / "master_for_modeling_1995_2025.csv"

    df_model = merge_all_to_modeling(
        wage_path, appreg_path, service_path, manufacturing_path,
        blockchain_rnd_path, loan_path, rnd_total_path,
        output_path=modeling_out,
        full_start_year=1995,
        full_end_year=2025,
    )
    print(f"✅ 모델링용 병합 완료 → {modeling_out}")
    print(df_model.head(12))
