# preprocessing/regular_wage_preprocessing.py
import pandas as pd
from pathlib import Path
from typing import List

def read_csv_safely(path: str | Path, encodings: List[str] = ["utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def monthly_to_yearly_regular_avg_wage(df: pd.DataFrame) -> pd.DataFrame:
    """
    원본 구조:
      - 첫 행(인덱스 0): 각 컬럼(예: 2004.08, 2004.08.1, ...)의 '지표명'이 들어있음
      - 이후 행: '근로형태별' (임금근로자/정규직/비정규직)별 값
    목표:
      - '정규직' & '월평균임금(만원)'만 추출
      - 월 단위 → 연 단위 평균으로 집계
    """
    # 1) 메타/데이터 분리
    meta_row = df.iloc[0]                 # 각 컬럼의 지표명
    data = df.iloc[1:].reset_index(drop=True)  # 실제 데이터
    data_cols = [c for c in data.columns if c != "근로형태별"]

    # 2) long 테이블 구성
    records = []
    for c in data_cols:
        metric_name = meta_row[c]
        parts = str(c).split(".")
        if len(parts) >= 2:
            year = int(parts[0])
            month = int(parts[1])
        else:
            # 월 정보가 없으면 스킵
            continue
        # 각 근로형태별 행 수집
        for _, row in data.iterrows():
            val = pd.to_numeric(str(row[c]).replace(",", ""), errors="coerce")
            records.append({
                "근로형태별": row["근로형태별"],
                "year": year,
                "month": month,
                "metric": metric_name,
                "value": val,
            })
    long = pd.DataFrame.from_records(records)

    # 3) 정규직 & 월평균임금(만원)만 추출
    regular_wage = long[
        (long["근로형태별"] == "정규직") & (long["metric"] == "월평균임금(만원)")
    ][["year", "month", "value"]]

    # 4) 연도 평균으로 집계
    yearly = (
        regular_wage
        .groupby("year", as_index=False)["value"]
        .mean()
        .rename(columns={"value": "regular_avg_wage"})
        .sort_values("year")
        .reset_index(drop=True)
    )
    return yearly

def preprocess(input_path: str | Path, output_path: str | Path) -> pd.DataFrame:
    df_raw = read_csv_safely(input_path)
    df_yearly = monthly_to_yearly_regular_avg_wage(df_raw)

    # 저장
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_yearly.to_csv(output_path, index=False, encoding="utf-8-sig")
    return df_yearly


if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent.parent
    input_file = project_root / "rnd_data_file" / "근로형태별_임금근로자_특성_총괄__20250910221655.csv"
    output_file = project_root / "preprocessing" / "investing_rnd" / "regular_avg_wage_yearly.csv"

    df_processed = preprocess(input_file, output_file)
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_processed.head(12))
