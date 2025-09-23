# pip install pandas statsmodels

import pandas as pd
from pathlib import Path
from statsmodels.tsa.seasonal import seasonal_decompose

def build_monthly_with_decomposition(
    src_path: str | Path,
    out_suffix: str = "_monthly_spline_seasonal_all.csv",
    spline_order: int = 3,
    period: int = 12,
) -> Path:
    """
    연간 데이터(csv, year 컬럼 포함)를 월간으로 확장하고,
    모든 수치형 컬럼에 대해 '스플라인 보간 → 계절분해(Trend+Seasonal)' 값을 *_decomposed 로 추가.

    Parameters
    ----------
    src_path : str | Path
        입력 CSV 경로. 반드시 'year' 열이 있어야 함 (예: 1995, 1996, ...)
    out_suffix : str
        출력 파일명 접미사
    spline_order : int
        스플라인 보간 차수 (3 = cubic)
    period : int
        계절 길이(월단위). 월간 계절성은 12가 일반적

    Returns
    -------
    Path
        저장된 CSV 경로
    """
    src = Path(src_path)
    df = pd.read_csv(src)

    if "year" not in df.columns:
        raise ValueError("CSV에 'year' 열이 없습니다.")

    # 1) 연도 → 날짜(해당 연도 1월 1일) 변환 및 정렬
    df["date"] = pd.to_datetime(df["year"].astype(str) + "-01-01")
    df = df.set_index("date").sort_index()

    # 2) 월간 인덱스 생성 후 재인덱싱
    monthly_idx = pd.date_range(df.index.min(), df.index.max(), freq="MS")
    base = df.drop(columns=["year"]).reindex(monthly_idx)

    # 3) 수치형/비수치형 분리
    num_cols = base.select_dtypes(include="number").columns.tolist()
    non_num_cols = [c for c in base.columns if c not in num_cols]

    # 4) 스플라인 보간(수치형), 비수치형은 ffill
    if num_cols:
        base[num_cols] = base[num_cols].interpolate(method="spline", order=spline_order)
    if non_num_cols:
        base[non_num_cols] = base[non_num_cols].ffill()

    # 5) 각 수치형 컬럼에 대해 계절분해 적용 → *_decomposed 생성
    result_df = base.copy()
    for col in num_cols:
        series = result_df[col]
        # 분해 최소 길이(대략 2*period 이상 권장) 충족 여부
        if series.dropna().shape[0] < period * 2:
            result_df[f"{col}_decomposed"] = series
            continue
        try:
            dec = seasonal_decompose(
                series.dropna(),
                model="additive",
                period=period,
                extrapolate_trend="freq"
            )
            # Trend + Seasonal (Residual 제외)
            decomposed = (dec.trend + dec.seasonal).reindex(result_df.index)
            # 양끝단 trend NaN 구간은 원본 보간값으로 보완
            result_df[f"{col}_decomposed"] = decomposed.fillna(series)
        except Exception:
            # 실패 시 원본 보간값 그대로 사용
            result_df[f"{col}_decomposed"] = series

    result_df.index.name = "date"
    out_path = src.with_name(src.stem + out_suffix)
    result_df.reset_index().to_csv(out_path, index=False)
    return out_path


# ---- 예시 실행 ----
if __name__ == "__main__":
    src_csv = "master_for_modeling_1995_2025_imputed.csv"  # 네 파일 경로로 바꿔도 됨
    out = build_monthly_with_decomposition(
        src_csv,
        out_suffix="_monthly_spline_seasonal_all.csv",
        spline_order=3,
        period=12
    )
    print("Saved to:", out)
