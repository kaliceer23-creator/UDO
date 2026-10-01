import re
import json

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Locate INSERT INTO `bands`
start_marker = "INSERT INTO `bands` VALUES"
idx = sql.find(start_marker)
if idx != -1:
    end_idx = sql.find(";\n", idx)
    bands_sql = sql[idx + len(start_marker):end_idx]
    
    # Each row is enclosed in parentheses
    # Let's extract values accurately using a simple state-machine tokenizer or regex
    # Columns:
    # 0: id
    # 1: name_band
    # 2: slug
    # 3: description
    # 4: created_at
    # 5: updated_at
    # 6: thumb_image
    # 7: cover_image
    # 8: seo_title
    # 9: seo_description
    # 10: seo_keywords
    # 11: canonical
    # 12: sort

    # Let's parse with SQL row parser
    rows = []
    i = 0
    n = len(bands_sql)
    while i < n:
        if bands_sql[i] == '(':
            i += 1
            fields = []
            curr = []
            in_str = False
            escape = False
            while i < n:
                ch = bands_sql[i]
                if in_str:
                    if escape:
                        curr.append(ch)
                        escape = False
                    elif ch == '\\':
                        escape = True
                    elif ch == "'":
                        if i + 1 < n and bands_sql[i + 1] == "'":
                            curr.append("'")
                            i += 1
                        else:
                            in_str = False
                    else:
                        curr.append(ch)
                else:
                    if ch == "'":
                        in_str = True
                    elif ch == ',':
                        val = "".join(curr).strip()
                        fields.append(None if val == 'NULL' else val)
                        curr = []
                    elif ch == ')':
                        val = "".join(curr).strip()
                        fields.append(None if val == 'NULL' else val)
                        rows.append(fields)
                        break
                    else:
                        curr.append(ch)
                i += 1
        i += 1

    print(f"Extracted {len(rows)} bands from database")
    bands = []
    for r in rows:
        if len(r) >= 13:
            bands.append({
                "id": r[0],
                "name": r[1],
                "slug": r[2],
                "thumb_image": r[6],
                "cover_image": r[7],
                "sort": int(r[12]) if r[12] and r[12].isdigit() else 999
            })

    # Sort by sort order
    bands.sort(key=lambda x: (x["sort"], x["name"]))
    print("\n--- ALL BANDS IN OLD DATABASE (SORTED) ---")
    for b in bands:
        print(f"ID: {b['id']}, Sort: {b['sort']}, Name: {b['name']}, Thumb: {b['thumb_image']}, Cover: {b['cover_image']}")

    with open('scratch/all_bands.json', 'w', encoding='utf-8') as out:
        json.dump(bands, out, ensure_ascii=False, indent=2)
else:
    print("Could not find INSERT INTO `bands`")
