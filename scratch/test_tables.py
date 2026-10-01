import re

with open("/Users/aliceer/UDO/udothai_shop.sql", "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

pos = sql.find("(897,")
end = sql.find("),(898,", pos)
row = sql[pos:end]

# Extract tables
tables = re.findall(r"(<table.*?</table>)", row, re.DOTALL)
print(f"Total tables: {len(tables)}")

for idx, t in enumerate(tables):
    print(f"\n=== TABLE {idx+1} RAW ===")
    print(t[:300])

# Let's see how to transform these into modern clean HTML tables
