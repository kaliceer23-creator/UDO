import re

with open("udothai_shop.sql", "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

m = re.search(r"CREATE TABLE [^\n]+products[^\n]+\((.*?)\) ENGINE", sql, re.DOTALL)
if m:
    print("Products table columns:")
    for line in m.group(1).split("\n"):
        if line.strip().startswith("`"):
            col_name = line.strip().split()[0]
            print(" ", col_name)

# Let's inspect a product entry from 1452 in products table
p1452 = re.search(r"\(1452,.*?\)", sql)
if p1452:
    print("\nProduct 1452 raw entry:")
    print(p1452.group(0)[:300])
