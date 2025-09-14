# preprocessing/manufacturing_productivity_preprocessing.py
import pandas as pd
from pathlib import Path
from typing import List

def read_csv_safely(path: str | Path, encodings: List[str] = ["utf-8-sig", "utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def extract_manufacturing_total_productivity(df: pd.DataFrame) -> pd.DataFrame:
    """
    원본 구조:
      - 0행: 각 연도 컬럼(예: 2007, 2007.1, 2007.2 ...)의 라벨(전체/대기업/중소기업)
      - 이후 행: '산업별(1)' 값과 실제 수치
    목표:
      - '제조업' 행에서 라벨이 '전체'인 값만 연도별로 추출 -> (year, manufacturing_productivity)
    """
    meta = df.iloc[0]                          # 연도-서브컬럼 라벨
    data = df.iloc[1:].reset_index(drop=True)  # 실제 데이터
    value_cols = [c for c in data.columns if c != "산업별(1)"]

    manu = data[data["산업별(1)"] == "제조업"]
    if manu.empty:
        raise ValueError("원본 데이터에서 '제조업' 행을 찾을 수 없습니다.")
    manu_row = manu.iloc[0]

    records = []
    for c in value_cols:
        label = str(meta[c]).strip()
        if label != "전체":
            continue
        parts = str(c).split(".")
        if not parts[0].isdigit():
            continue
        year = int(parts[0])
        val = pd.to_numeric(str(manu_row[c]).replace(",", ""), errors="coerce")
        records.append({"year": year, "manufacturing_productivity": val})

    out = pd.DataFrame.from_records(records).sort_values("year").reset_index(drop=True)
    return out

def preprocess(input_path: str | Path, output_path: str | Path) -> pd.DataFrame:
    df_raw = read_csv_safely(input_path)
    df_tidy = extract_manufacturing_total_productivity(df_raw)

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_tidy.to_csv(output_path, index=False, encoding="utf-8-sig")
    return df_tidy

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent.parent
    input_file = project_root / "rnd_data_file" / "제조업_기업규모별_노동생산성_20250910221553.csv"
    output_file = project_root / "preprocessing" / "investing_rnd" / "manufacturing_productivity_total.csv"

    df_processed = preprocess(input_file, output_file)
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_processed.head(12))
