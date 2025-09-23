import pandas as pd
from pathlib import Path
from typing import Optional, Iterable

def read_csv_safely(path: str | Path, encodings: Iterable[str] = ("utf-8-sig","utf-8","cp949","euc-kr")) -> pd.DataFrame:
    path = Path(path)
    last = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last = e
    raise last

def impute_numeric_timeseries(
    df: pd.DataFrame,
    year_col: str = "year",
    short_gap_limit: int = 2,     # ffill/bfill 허용 최대 길이(연)
    drop_col_missing_thresh: float = 0.6,  # 관측 비율 < 60% 이면 컬럼 드랍 (선택)
) -> pd.DataFrame:
    """
    단계:
      1) 연도 정렬
      2) 선형보간(limit_area='inside') → 범위 내부만 보간(가장자리는 안 건드림)
      3) ffill/bfill로 짧은 구멍 메우기(limit=short_gap_limit)
      4) 남은 결측(주로 가장자리)은 컬럼 중앙값으로 대체
      5) 관측 비율이 너무 낮은 컬럼은 드랍(옵션)
    """
    out = df.sort_values(year_col).reset_index(drop=True).copy()

    # 대상 수치 컬럼
    num_cols = out.select_dtypes(include=["number"]).columns.tolist()
    if year_col in num_cols:
        num_cols.remove(year_col)

    # (선택) 관측 비율이 너무 낮은 컬럼은 제거
    if drop_col_missing_thresh is not None:
        keep = []
        for c in num_cols:
            obs_ratio = out[c].notna().mean()
            if obs_ratio >= drop_col_missing_thresh:
                keep.append(c)
        drop_cols = [c for c in num_cols if c not in keep]
        if drop_cols:
            out.drop(columns=drop_cols, inplace=True)
            num_cols = keep

    # 1) 내부 선형 보간 (가장자리 외삽 방지)
    for c in num_cols:
        out[c] = out[c].interpolate(method="linear", limit_area="inside")

    # 2) 짧은 구멍은 ffill/bfill (연속 결측 길이 <= short_gap_limit)
    if short_gap_limit and short_gap_limit > 0:
        for c in num_cols:
            out[c] = out[c].ffill(limit=short_gap_limit)
            out[c] = out[c].bfill(limit=short_gap_limit)

    # 3) 그래도 남은 결측은 중앙값으로 최종 대체 (모델 입력 안정화)
    for c in num_cols:
        if out[c].isna().any():
            median_val = out[c].median(skipna=True)
            out[c] = out[c].fillna(median_val)

    return out

def main():
    project_root = Path(__file__).resolve().parent.parent.parent
    input_path  = project_root / "preprocessing" / "investing_rnd" / "master_for_modeling_1995_2025.csv"
    output_path = project_root / "preprocessing" / "investing_rnd" / "master_for_modeling_1995_2025_imputed.csv"

    df = read_csv_safely(input_path)

    # year 보장 및 정수화
    if "year" not in df.columns:
        raise ValueError("입력 파일에 'year' 컬럼이 없습니다.")
    df["year"] = pd.to_numeric(df["year"], errors="coerce").astype("Int64")

    df_imp = impute_numeric_timeseries(
        df,
        year_col="year",
        short_gap_limit=2,             # 2년 이하 구멍은 앞/뒤값으로 메움
        drop_col_missing_thresh=None,   # 관측률 60% 미만 컬럼 드랍 (원치 않으면 None)
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_imp.to_csv(output_path, index=False, encoding="utf-8-sig")
    print(f"✅ 보간 완료 → {output_path}")

if __name__ == "__main__":
    main()
