import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL)
if m_items:
    content = m_items.group(1)
    matches = re.findall(r"\([0-9]+,\s*1087,.*?\)", content)
    print("Matches for 1087 in items:", matches)
    matches_all = re.findall(r"\([0-9]+,\s*108[6-9],.*?\)", content)
    print("Matches for 1086-1089:", matches_all)
