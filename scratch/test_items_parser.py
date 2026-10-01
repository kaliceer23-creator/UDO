import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL)
if m_items:
    content = m_items.group(1)

    # Let's count total tuples
    tuples = re.findall(r"\(([0-9]+),\s*([0-9]+|NULL),\s*('(?:\\'|[^'])*'|NULL),\s*([0-9\.]+),\s*([^,]+),\s*([0-9]+),\s*([0-9]+|NULL),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*('(?:\\'|[^'])*'|NULL),", content)
    print(f"Total matched items with robust pattern: {len(tuples)}")

    # Let's check products matching in root 298
    pids_found = set()
    for row in tuples:
        if row[1] != 'NULL':
            pids_found.add(int(row[1]))
    print(f"Distinct products in items: {len(pids_found)}")
