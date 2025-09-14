# preprocessing/blockchain_rnd_preprocessing.py
import pandas as pd
from pathlib import Path
from typing import List

# -----------------------------
# 0) 공통 유틸
# -----------------------------
def read_csv_safely(path: str | Path, encodings: List[str] = ["utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def coerce_numeric(s: pd.Series) -> pd.Series:
    # 쉼표/하이픈/공백 제거 후 숫자화
    return pd.to_numeric(
        s.astype(str).str.replace(",", "", regex=False).str.replace("-", "", regex=False).str.strip(),
        errors="coerce"
    )

# -----------------------------
# 1) wide → long
# -----------------------------
def wide_to_long(df: pd.DataFrame) -> pd.DataFrame:
    df_long = df.melt(
        id_vars=["특성별(1)", "특성별(2)"],
        var_name="year_raw",
        value_name="value"
    )
    # year, metric 분리 (예: 2019.4 -> year=2019, metric=4 / 2019 -> year=2019, metric=main)
    year_metric = df_long["year_raw"].astype(str).str.split(".", n=1, expand=True)
    df_long["year"] = pd.to_numeric(year_metric[0], errors="coerce").astype("Int64")
    df_long["metric"] = year_metric[1].fillna("main")
    df_long.drop(columns=["year_raw"], inplace=True)

    # 값 숫자화
    df_long["value"] = coerce_numeric(df_long["value"])
    return df_long

# -----------------------------
# 2) 관심 데이터 필터
#    - 블록체인 주력산업 분야(대분류)
#    - metric == "4" (R&D 투자액 총액(백만원))
# -----------------------------
def filter_blockchain_total(df_long: pd.DataFrame) -> pd.DataFrame:
    return df_long[
        (df_long["특성별(1)"] == "블록체인 주력산업 분야(대분류)") &
        (df_long["metric"] == "4")
    ][["특성별(2)", "year", "value"]].copy()

# -----------------------------
# 3) year를 행, 산업을 열로 pivot
# -----------------------------
def pivot_by_industry(df_filt: pd.DataFrame) -> pd.DataFrame:
    df_pivot = df_filt.pivot_table(
        index="year",
        columns="특성별(2)",   # 산업명
        values="value",
        aggfunc="sum"
    ).sort_index().reset_index()
    return df_pivot

# -----------------------------
# 4) 산업명을 영어 alias로 변환 (rnd_total_by_industry_*)
# -----------------------------
def rename_industry_columns(df_pivot: pd.DataFrame) -> pd.DataFrame:
    mapping = {
        "블록체인 기반 시스템  소프트웨어 개발 및  공급업": "rnd_total_by_industry_system_sw",
        "블록체인 기반 시스템 소프트웨어 개발 및  공급업": "rnd_total_by_industry_system_sw",
        "블록체인 기반 시스템 소프트웨어 개발 및 공급업": "rnd_total_by_industry_system_sw",
        "블록체인 기반  응용 소프트웨어  개발 및 공급업": "rnd_total_by_industry_app_sw",
        "블록체인 기반 응용 소프트웨어  개발 및 공급업": "rnd_total_by_industry_app_sw",
        "블록체인 기반 응용 소프트웨어 개발 및 공급업": "rnd_total_by_industry_app_sw",
        "블록체인 기반  임베디드 소프트웨어  개발 및 공급업": "rnd_total_by_industry_embedded_sw",
        "블록체인 기반 임베디드 소프트웨어  개발 및 공급업": "rnd_total_by_industry_embedded_sw",
        "블록체인 기반 임베디드 소프트웨어 개발 및 공급업": "rnd_total_by_industry_embedded_sw",
        "블록체인 기반  프로그래밍 시스템  통합 및 관리 서비스업": "rnd_total_by_industry_programming_svc",
        "블록체인 기반 프로그래밍 시스템  통합 및 관리 서비스업": "rnd_total_by_industry_programming_svc",
        "블록체인 기반 프로그래밍 시스템 통합 및 관리 서비스업": "rnd_total_by_industry_programming_svc",
        "블록체인 기반  정보서비스업": "rnd_total_by_industry_info_svc",
        "블록체인 기반 정보서비스업": "rnd_total_by_industry_info_svc",
        "가상자산 매매 및 중개업": "rnd_total_by_industry_virtual_asset",
        "블록체인 교육 및  컨설팅 서비스업": "rnd_total_by_industry_consulting",
        "블록체인 교육 및 컨설팅 서비스업": "rnd_total_by_industry_consulting",
    }

    # year 외의 컬럼에만 매핑 적용
    new_cols = {}
    for c in df_pivot.columns:
        if c == "year":
            new_cols[c] = c
        else:
            new_cols[c] = mapping.get(c, None)
            if new_cols[c] is None:
                # 매핑에 없으면 안전한 축약 규칙 적용
                # 한글 제거/공백→_ 치환 후 앞부분만 사용
                alias = (
                    "rnd_total_by_industry_" +
                    "".join(ch if ch.isalnum() else "_" for ch in c)
                    .lower()
                    .replace("__", "_")
                )
                # 너무 길면 일부만
                new_cols[c] = alias[:60].rstrip("_")
    return df_pivot.rename(columns=new_cols)

# -----------------------------
# 5) 합계(rnd_total) & Lag 생성
# -----------------------------
def add_total_and_lags(df: pd.DataFrame) -> pd.DataFrame:
    industry_cols = [c for c in df.columns if c.startswith("rnd_total_by_industry_")]
    df = df.copy()
    df["rnd_total"] = df[industry_cols].sum(axis=1, min_count=1)
    df = df.sort_values("year").reset_index(drop=True)
    df["rnd_total_lag1"] = df["rnd_total"].shift(1)
    df["rnd_total_lag2"] = df["rnd_total"].shift(2)
    return df

# -----------------------------
# 6) 연도 범위 필터 (옵션)
# -----------------------------
def filter_year_range(df: pd.DataFrame, start_year: int | None, end_year: int | None) -> pd.DataFrame:
    if start_year is not None:
        df = df[df["year"] >= start_year]
    if end_year is not None:
        df = df[df["year"] <= end_year]
    return df

# -----------------------------
# 7) 메인 파이프라인
# -----------------------------
def preprocess(
    input_path: str | Path,
    output_path: str | Path,
    start_year: int | None = None,   # 예: 2019 또는 2015
    end_year: int | None = 2023
) -> pd.DataFrame:
    df_raw = read_csv_safely(input_path)
    df_long = wide_to_long(df_raw)
    df_filt = filter_blockchain_total(df_long)
    df_pivot = pivot_by_industry(df_filt)
    df_renamed = rename_industry_columns(df_pivot)  # 산업명→영문 alias 적용
    df_final = add_total_and_lags(df_renamed)
    df_final = filter_year_range(df_final, start_year, end_year)

    # 저장
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_final.to_csv(output_path, index=False, encoding="utf-8-sig")
    return df_final

# -----------------------------
# 실행부
# -----------------------------
if __name__ == "__main__":
    # 프로젝트 루트 추정: preprocessing/ 상위
    project_root = Path(__file__).resolve().parent.parent
    input_file = project_root.parent / "rnd_data_file" / "RD_투자_금액_규모_및_총액_20250910221439.csv"
    output_file = project_root.parent / "preprocessing" / "investing_rnd" / "blockchain_rnd_total_pivot.csv"

    # 원하는 연도 범위:
    # 1) 2019~2023 => start_year=2019, end_year=2023
    # 2) 2015~2023 => start_year=2015, end_year=2023
    df_processed = preprocess(
        input_path=input_file,
        output_path=output_file,
        start_year=2019,
        end_year=2023
    )
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_processed.head())
