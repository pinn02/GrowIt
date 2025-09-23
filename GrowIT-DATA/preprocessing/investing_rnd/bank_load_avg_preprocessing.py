# preprocessing/bank_loan_avg_preprocessing.py
import pandas as pd
from pathlib import Path
from typing import List, Optional

KOR_TO_ALIAS = {
    "대출평균 1) (연%)": "loan_avg",
    "기업대출 (연리%)": "corp_loan",
    "대기업대출 (연리%)": "large_corp_loan",
    "중소기업대출 (연리%)": "sme_loan",
    "운전자금대출 (연리%)": "working_capital_loan",
    "시설자금대출 (연리%)": "facility_loan",
    "상업어음할인 (연리%)": "commercial_bill_discount",
    "기업일반자금대출 (연리%)": "corp_general_loan",
    "가계대출 (연리%)": "household_loan",
    "소액대출 (500만원 이하) (연리%)": "micro_loan_u5m",
    "주택담보대출 (연리%)": "mortgage_loan",
    "고정형 주택담보대출 3) (연리%)": "mortgage_fixed",
    "변동형 주택담보대출 3) (연리%)": "mortgage_variable",
    "예·적금담보대출 (연리%)": "deposit_secured_loan",
    "보증대출 (연리%)": "guaranteed_loan",
    "전세자금대출 (연리%)": "jeonse_loan",
    "일반신용대출 2) (연리%)": "unsecured_personal_loan",
    "집단대출 2) (연리%)": "group_loan",
    "공공및기타부문대출 (연리%)": "public_other_loan",
}

def read_csv_safely(path: str | Path, encodings: List[str] = ["utf-8", "cp949", "euc-kr"]) -> pd.DataFrame:
    path = Path(path)
    last_err = None
    for enc in encodings:
        try:
            return pd.read_csv(path, encoding=enc)
        except Exception as e:
            last_err = e
    raise last_err

def preprocess_loan_avg(input_path: str | Path, output_path: str | Path,
                        start_year: Optional[int] = None, end_year: Optional[int] = None) -> pd.DataFrame:
    df = read_csv_safely(input_path)

    # wide -> long
    value_cols = [c for c in df.columns if c != "계정항목별"]
    long = df.melt(id_vars=["계정항목별"], value_vars=value_cols,
                   var_name="year", value_name="rate")
    long["year"] = pd.to_numeric(long["year"], errors="coerce").astype("Int64")
    long["rate"] = pd.to_numeric(long["rate"], errors="coerce")
    long["alias"] = long["계정항목별"].map(KOR_TO_ALIAS)

    # loan_avg만 남기기
    loan = long[long["alias"] == "loan_avg"][["year", "rate"]].dropna(subset=["year"]).copy()
    loan = loan.sort_values("year").reset_index(drop=True)
    loan.rename(columns={"rate": "loan_avg"}, inplace=True)

    # 연도 범위(옵션)
    if start_year is not None:
        loan = loan[loan["year"] >= start_year]
    if end_year is not None:
        loan = loan[loan["year"] <= end_year]

    # lag 추가
    loan["loan_avg_lag1"] = loan["loan_avg"].shift(1)
    loan["loan_avg_lag2"] = loan["loan_avg"].shift(2)

    # 저장
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    loan.to_csv(output_path, index=False, encoding="utf-8-sig")
    return loan

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent
    input_file = project_root.parent / "rnd_data_file" / "예금은행_대출금리_신규취급액_기준__20250910221622.csv"
    output_file = project_root.parent / "preprocessing" / "investing_rnd" / "bank_loan_avg_with_lags.csv"

    df_out = preprocess_loan_avg(input_file, output_file)
    print(f"✅ 전처리 완료 → {output_file}")
    print(df_out.head(12))
