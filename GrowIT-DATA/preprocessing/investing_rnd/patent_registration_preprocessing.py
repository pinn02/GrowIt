# preprocessing/patent_registration_preprocessing.py
import pandas as pd
from pathlib import Path
from typing import List, Optional

# -----------------------------
# 0) 공통 유틸
# -----------------------------
def read_csv_safely(path: str | Path, encodings: List[str] = ["utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    """인코딩 문제 없이 CSV 읽기"""
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def to_number(s: pd.Series) -> pd.Series:
    """쉼표/하이픈 제거 후 숫자 변환"""
    return pd.to_numeric(
        s.astype(str).str.replace(",", "", regex=False).str.replace("-", "", regex=False).str.strip(),
        errors="coerce"
    )

# -----------------------------
# 1) wide -> long 변환
# -----------------------------
def wide_to_long(df: pd.DataFrame) -> pd.DataFrame:
    df_long = df.melt(
        id_vars=["권리별(1)", "권리별(2)"],
        var_name="year_raw",
        value_name="value"
    )
    # 연도, metric 분리
    ym = df_long["year_raw"].astype(str).str.split(".", n=1, expand=True)
    df_long["year"] = pd.to_numeric(ym[0], errors="coerce").astype("Int64")
    df_long["metric"] = ym[1].fillna("main")

    # 값 숫자화
    df_long["value"] = to_number(df_long["value"])
    return df_long

# -----------------------------
# 2) 특허 · 법인 · 내국인 등록 수 추출
# -----------------------------
def filter_corp_domestic(df_long: pd.DataFrame) -> pd.DataFrame:
    df_f = df_long[
        (df_long["권리별(1)"] == "특허") &
        (df_long["권리별(2)"] == "소계") &
        (df_long["metric"] == "5")  # .5 열 → 법인 내국인
    ][["year", "value"]].copy()
    df_f.rename(columns={"value": "corp_domestic_registrations"}, inplace=True)
    return df_f

# -----------------------------
# 3) Lag 추가
# -----------------------------
def add_lags(df: pd.DataFrame) -> pd.DataFrame:
    df = df.sort_values("year").reset_index(drop=True)
    df["registration_lag1"] = df["corp_domestic_registrations"].shift(1)
    df["registration_lag2"] = df["corp_domestic_registrations"].shift(2)
    return df

# -----------------------------
# 4) 메인 파이프라인
# -----------------------------
def preprocess(input_path: str | Path, output_path: str | Path) -> pd.DataFrame:
    df_raw = read_csv_safely(input_path)
    df_long = wide_to_long(df_raw)
    df_filtered = filter_corp_domestic(df_long)
    df_final = add_lags(df_filtered)

    # 저장
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_final.to_csv(output_path, index=False, encoding="utf-8-sig")
    return df_final

# -----------------------------
# 실행부
# -----------------------------
if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent.parent
    input_file = project_root / "rnd_data_file" / "개인·법인별_등록_20250910221505.csv"
    output_file = project_root / "preprocessing" / "investing_rnd" / "corp_domestic_registrations.csv"

    df_processed = preprocess(input_file, output_file)
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_processed.head())
