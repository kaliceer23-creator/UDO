import re

# Test unpacking SQL tuple into fields
entry = "(903,'Name with , comma','Short desc','Full desc','catalog.pdf','2018-06-25 23:50:14','2026-05-23 02:35:12','thumb.jpg','[\"img1.jpg\"]',1,'slug','tags',0,1,'seo_title','meta_desc','meta_kw',5,313,0,NULL,'canonical_url')"

# Let's write a robust parser for the tail of entry
def parse_flags_from_entry(entry):
    # The tail has: tags, promotion, recommended, seo_title, meta_description, meta_keywords, good_sales, sortp, sort_cate, name_en, canonical)
    # We can match: ,(\d+),(\d+),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(\d+)
    # Where the first two \d+ are promotion, recommended, and the last \d+ is good_sales
    m = re.search(r",\s*([0-1])\s*,\s*([0-1])\s*,\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(\d+)", entry)
    if m:
        promo = int(m.group(1))
        rec = int(m.group(2))
        good_sales = int(m.group(3))
        return promo, rec, good_sales
    return 0, 0, 0

print("Test parse:", parse_flags_from_entry(entry))
