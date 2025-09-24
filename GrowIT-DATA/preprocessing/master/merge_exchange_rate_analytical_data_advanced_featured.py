import pandas as pd

# 파일 경로
file1 = "../investing/merged_data_with_gdp (1).csv"
file2 = "merged_invest_rnd_and_project.csv"

# CSV 읽기
df1 = pd.read_csv(file1)
df2 = pd.read_csv(file2)

# 컬럼명 정규화 (date/Date 맞추기)
df1.rename(columns={"date": "Date"}, inplace=True)

# 병합 (공통 키 = Date)
merged = pd.merge(df1, df2, on="Date", how="inner", suffixes=("_file1", "_file2"))

# 중복 컬럼 정리
for col in merged.columns:
    if col.endswith("_file1"):
        base_col = col.replace("_file1", "")
        other_col = base_col + "_file2"
        if other_col in merged.columns:
            # 두 컬럼이 완전히 동일하면 하나만 남기기
            if merged[col].equals(merged[other_col]):
                merged.rename(columns={col: base_col}, inplace=True)
                merged.drop(columns=[other_col], inplace=True)
            else:
                # 다르면 두 컬럼 다 유지
                pass

# 결과 저장
output_path = "merged_marketing_and_hiring_and_invest.csv"
merged.to_csv(output_path, index=False)

print(f"✅ 병합 완료! 중복 제거 후 저장 위치: {output_path}")
