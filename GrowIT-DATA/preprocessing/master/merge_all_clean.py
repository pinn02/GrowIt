import pandas as pd

# 파일 경로
file_path = "merged_all.csv"

# CSV 읽기
df = pd.read_csv(file_path)

# === 중복 컬럼 정리 (file1 우선) ===
cols = list(df.columns)
for col in cols:
    if col.endswith("_file1"):
        base = col[:-6]   # "_file1" 제거
        other = base + "_file2"
        if other in df.columns:
            # file1을 base 이름으로 바꾸고 file2는 제거
            df.rename(columns={col: base}, inplace=True)
            df.drop(columns=[other], inplace=True)

# 결과 저장
output_path = "merged_all_clean.csv"
df.to_csv(output_path, index=False)

print(f"✅ 정리 완료! file1 우선으로 중복 제거 후 저장 위치: {output_path}")
