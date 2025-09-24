import pandas as pd
import numpy as np

# 파일 경로
file1 = "../investing/merged_data_with_gdp (1).csv"
file2 = "merged_invest_rnd_and_project.csv"

def load_and_normalize_date(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    # 컬럼 공백 제거
    df.columns = [c.strip() for c in df.columns]

    # 날짜 후보 컬럼
    candidates = ["Date", "date", "Unnamed: 0", "기준일자", "기준월", "기준일"]
    date_col = next((c for c in candidates if c in df.columns), None)

    if date_col is None:
        raise KeyError(f"[{path}]에서 날짜 컬럼을 찾지 못했습니다. 후보: {candidates}")

    # Date로 통일
    if date_col != "Date":
        df = df.rename(columns={date_col: "Date"})

    # pandas datetime 변환 (yyyy-mm-dd/yyyymm 등 자동 파싱)
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce", infer_datetime_format=True)
    if df["Date"].isna().all():
        raise ValueError(f"[{path}]의 날짜 파싱에 실패했습니다. Date 컬럼 예시: {df['Date'].head().tolist()}")

    return df

# CSV 읽기 + 날짜 정규화
df1 = load_and_normalize_date(file1)
df2 = load_and_normalize_date(file2)

# 병합 (공통 키 = Date)
merged = pd.merge(df1, df2, on="Date", how="inner", suffixes=("_file1", "_file2"))

# === 중복 컬럼 정리: 값이 같으면 하나만 남김 (NaN 동일 취급) ===
def series_equal(a: pd.Series, b: pd.Series) -> bool:
    # dtype 다르면 비교 전 맞춤
    if a.dtype != b.dtype:
        try:
            b = b.astype(a.dtype)
        except Exception:
            try:
                a = a.astype(b.dtype)
            except Exception:
                pass
    # NaN 동일 취급해서 비교
    return np.all((a.values == b.values) | (pd.isna(a.values) & pd.isna(b.values)))

cols = list(merged.columns)  # 반복 중 변경 대비 사본
for col in cols:
    if col.endswith("_file1"):
        base = col[:-6]  # remove "_file1"
        other = base + "_file2"
        if other in merged.columns:
            if series_equal(merged[col], merged[other]):
                # 동일하면 _file1을 기본 이름으로, _file2는 제거
                merged.rename(columns={col: base}, inplace=True)
                merged.drop(columns=[other], inplace=True)
            # 다르면 둘 다 유지 (아무 것도 안 함)

# 결과 저장
output_path = "merged_invest_rnd_and_project_invest.csv"
merged.to_csv(output_path, index=False)

print(f"✅ 병합 완료! 중복 정리 후 저장 위치: {output_path}")
