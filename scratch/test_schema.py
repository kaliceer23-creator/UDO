import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

m = re.search(r"CREATE TABLE `items` \((.*?)\) ENGINE", sql_text, re.DOTALL)
if m:
    print(m.group(1))
