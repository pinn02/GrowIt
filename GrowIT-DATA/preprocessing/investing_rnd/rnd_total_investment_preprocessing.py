# preprocessing/invest_total_preprocessing.py
import pandas as pd
from pathlib import Path
from typing import List, Optional

# -----------------------------
# 0) 공통 유틸
# -----------------------------
def read_csv_safely(path: str | Path, encodings: List[str] = ["utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    """인코딩 이슈 없이 CSV 읽기"""
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def to_number(s: pd.Series) -> pd.Series:
    """쉼표/하이픈/공백 제거 후 숫자 변환"""
    return pd.to_numeric(
        s.astype(str).str.replace(",", "", regex=False).str.replace("-", "", regex=False).str.strip(),
        errors="coerce"
    )

# -----------------------------
# 1) wide -> long
# -----------------------------
def wide_to_long(df: pd.DataFrame) -> pd.DataFrame:
    """
    - 식별자: 특성별(1), 특성별(2)
    - 컬럼: 2015, 2015.x, 2016, 2016.x ...
    - .3 가 '전체 투자금액 (백만원)'인 구조
    """
    df_long = df.melt(
        id_vars=["특성별(1)", "특성별(2)"],
        var_name="year_raw",
        value_name="value"
    )
    # year / metric 분리
    ym = df_long["year_raw"].astype(str).str.split(".", n=1, expand=True)
    df_long["year"] = pd.to_numeric(ym[0], errors="coerce").astype("Int64")
    df_long["metric"] = ym[1].fillna("main")
    df_long.drop(columns=["year_raw"], inplace=True)

    # 값 숫자화
    df_long["value"] = to_number(df_long["value"])
    return df_long

# -----------------------------
# 2) 전체/소계의 '전체 투자금액(백만원)'만 추출
#    - metric == "3" 이 '전체 투자금액 (백만원)' 열
# -----------------------------
def filter_total_investment(df_long: pd.DataFrame) -> pd.DataFrame:
    df_f = df_long[
        (df_long["특성별(1)"] == "전체") &
        (df_long["특성별(2)"] == "소계") &
        (df_long["metric"] == "3")
    ][["year", "value"]].copy()
    df_f.rename(columns={"value": "rnd_total"}, inplace=True)
    return df_f

# -----------------------------
# 3) Lag 컬럼 추가 (1년/2년)
# -----------------------------
def add_lags(df: pd.DataFrame) -> pd.DataFrame:
    df = df.sort_values("year").reset_index(drop=True)
    df["rnd_total_lag1"] = df["rnd_total"].shift(1)
    df["rnd_total_lag2"] = df["rnd_total"].shift(2)
    return df

# -----------------------------
# 4) 연도 범위 필터(옵션)
# -----------------------------
def filter_year_range(df: pd.DataFrame, start_year: Optional[int], end_year: Optional[int]) -> pd.DataFrame:
    if start_year is not None:
        df = df[df["year"] >= start_year]
    if end_year is not None:
        df = df[df["year"] <= end_year]
    return df

# -----------------------------
# 5) 메인 파이프라인
# -----------------------------
def preprocess(
    input_path: str | Path,
    output_path: str | Path,
    start_year: Optional[int] = None,  # 예: 2015 또는 2019
    end_year: Optional[int] = 2023
) -> pd.DataFrame:
    df_raw = read_csv_safely(input_path)
    df_long = wide_to_long(df_raw)
    df_total = filter_total_investment(df_long)
    df_total = add_lags(df_total)
    df_total = filter_year_range(df_total, start_year, end_year)

    # 저장
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_total.to_csv(output_path, index=False, encoding="utf-8-sig")
    return df_total

# -----------------------------
# 실행부
# -----------------------------
if __name__ == "__main__":
    # 프로젝트 루트 기준 경로 가정: PythonProject/
    project_root = Path(__file__).resolve().parent.parent.parent
    input_file = project_root / "rnd_data_file" / "RD_투자실적_20250910221453.csv"
    output_file = project_root / "preprocessing" / "investing_rnd" / "rnd_total_investment_with_lags.csv"

    # 원하는 범위: 2015~2023 또는 2019~2023 등
    df_processed = preprocess(
        input_path=input_file,
        output_path=output_file,
        start_year=2015,
        end_year=2023
    )
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_processed.head())
