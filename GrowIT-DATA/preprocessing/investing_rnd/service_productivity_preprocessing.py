# preprocessing/service_productivity_preprocessing.py
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

def extract_service_total_productivity(df: pd.DataFrame) -> pd.DataFrame:
    """
    원본 구조:
      - 첫 번째 행(인덱스 0)에 각 연도 컬럼의 '소분류 라벨'(전체/대기업/중소기업)이 들어있음.
      - 이후 행들에 실제 값. '산업별(1)' 컬럼에서 '서비스업' 행 선택.
      - 연도 컬럼명은 2007, 2007.1, 2007.2 형태 ('.1=대기업, .2=중소기업' 등)
    목표:
      - 서비스업의 '전체' 값만 연도별로 추출 → (year, service_productivity)
    """
    meta = df.iloc[0]                 # 각 연도-서브컬럼의 라벨(전체/대기업/중소기업)
    data = df.iloc[1:].reset_index(drop=True)
    value_cols = [c for c in data.columns if c != "산업별(1)"]

    # 서비스업 행 선택
    service = data[data["산업별(1)"] == "서비스업"]
    if service.empty:
        raise ValueError("원본 데이터에서 '서비스업' 행을 찾을 수 없습니다.")
    service_row = service.iloc[0]

    # '전체' 라벨만 골라서 연도와 값 추출
    records = []
    for c in value_cols:
        label = str(meta[c]).strip()  # 전체/대기업/중소기업
        if label != "전체":
            continue
        parts = str(c).split(".")
        if not parts[0].isdigit():
            continue
        year = int(parts[0])
        val = pd.to_numeric(str(service_row[c]).replace(",", ""), errors="coerce")
        records.append({"year": year, "service_productivity": val})

    out = pd.DataFrame.from_records(records).sort_values("year").reset_index(drop=True)
    return out

def preprocess(input_path: str | Path, output_path: str | Path) -> pd.DataFrame:
    df_raw = read_csv_safely(input_path)
    df_tidy = extract_service_total_productivity(df_raw)

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_tidy.to_csv(output_path, index=False, encoding="utf-8-sig")
    return df_tidy

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent.parent
    input_file = project_root / "rnd_data_file" / "서비스업_기업규모별_노동생산성_20250910221539.csv"
    output_file = project_root / "preprocessing" / "investing_rnd" / "service_productivity_total.csv"

    df_processed = preprocess(input_file, output_file)
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_processed.head(12))
