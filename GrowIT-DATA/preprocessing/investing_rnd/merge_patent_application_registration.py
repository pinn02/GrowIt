# preprocessing/merge_and_impute.py
import pandas as pd
from pathlib import Path
from typing import Literal

def merge_applications_registrations(
    apps_path: str | Path,
    regs_path: str | Path,
    output_path: str | Path
) -> pd.DataFrame:
    apps = pd.read_csv(apps_path)
    regs = pd.read_csv(regs_path)

    merged = (
        pd.merge(apps, regs, on="year", how="outer")
        .sort_values("year")
        .reset_index(drop=True)
    )

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    merged.to_csv(output_path, index=False, encoding="utf-8-sig")
    return merged


def impute_registrations_overwrite(
    df: pd.DataFrame,
    method: Literal["regression", "ratio"] = "regression",
    round_to_int: bool = True,
    clip_min_zero: bool = True,
) -> pd.DataFrame:
    """
    corp_domestic_registrations의 NaN을 보간 값으로 '직접 덮어쓰기' 하고
    registration_lag1/lag2를 재계산한다.
    method:
      - "regression": 등록 ≈ a + b * 출원 (2015~2023 공통 구간에서 추정)
      - "ratio":      등록 ≈ 출원 * 평균(등록/출원)
    """
    out = df.copy()

    # 공통 구간(둘 다 값 있는 연도) 확보
    train = out.dropna(subset=["corp_domestic_applications", "corp_domestic_registrations"])
    if train.empty:
        raise ValueError("학습/비율 계산용 공통 구간이 없습니다. 입력 데이터를 확인하세요.")

    miss = out["corp_domestic_registrations"].isna()
    if not miss.any():
        # 채울 게 없으면 lag만 정리
        return _recompute_registration_lags(out)

    X_app_train = train["corp_domestic_applications"].values
    y_reg_train = train["corp_domestic_registrations"].values

    if method == "regression":
        # 최소제곱으로 a, b 추정 (y = a + b x)
        import numpy as np
        X = np.vstack([np.ones_like(X_app_train), X_app_train]).T
        a, b = np.linalg.lstsq(X, y_reg_train, rcond=None)[0]
        preds = a + b * out.loc[miss, "corp_domestic_applications"].values

    elif method == "ratio":
        ratio = (train["corp_domestic_registrations"] / train["corp_domestic_applications"]).mean()
        preds = out.loc[miss, "corp_domestic_applications"].values * float(ratio)

    else:
        raise ValueError("method는 'regression' 또는 'ratio'만 지원합니다.")

    preds = pd.Series(preds, index=out.index[miss])
    if clip_min_zero:
        preds = preds.clip(lower=0)
    if round_to_int:
        preds = preds.round()

    # ✅ 원본 컬럼 직접 덮어쓰기
    out.loc[miss, "corp_domestic_registrations"] = preds

    # lag 재계산
    out = _recompute_registration_lags(out)
    return out


def _recompute_registration_lags(df: pd.DataFrame) -> pd.DataFrame:
    out = df.sort_values("year").reset_index(drop=True).copy()
    out["registration_lag1"] = out["corp_domestic_registrations"].shift(1)
    out["registration_lag2"] = out["corp_domestic_registrations"].shift(2)
    return out


if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent.parent

    apps_file = project_root / "preprocessing" / "investing_rnd" / "corp_domestic_applications.csv"
    regs_file = project_root / "preprocessing" / "investing_rnd" / "corp_domestic_registrations.csv"
    merged_out = project_root / "preprocessing" / "investing_rnd" / "applications_registrations_merged.csv"
    imputed_out = project_root / "preprocessing" / "investing_rnd" / "applications_registrations_imputed.csv"

    # 1) 병합
    df_merged = merge_applications_registrations(apps_file, regs_file, merged_out)
    print(f"✅ 병합 완료 → {merged_out}")

    # 2) 보간(원본 덮어쓰기) — 필요시 method="ratio"로 변경 가능
    df_imputed = impute_registrations_overwrite(
        df_merged,
        method="regression",   # "ratio" 로 바꿔서 비교 가능
        round_to_int=True,
        clip_min_zero=True,
    )

    # 저장
    imputed_out.parent.mkdir(parents=True, exist_ok=True)
    df_imputed.to_csv(imputed_out, index=False, encoding="utf-8-sig")
    print(f"✅ 보간(덮어쓰기) 완료 → {imputed_out}")
    print(df_imputed.head(12))
