import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Inspect products
# Extract all products rows
prod_rows = []
for line in text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        # Match each row
        # (id, name, short_description, description, catalog_download, created_at, updated_at, thumb_image, images, band_id, slug, tags, promotion, recommended, seo_title, meta_description, meta_keywords, good_sales, sortp, sort_cate, name_en, canonical)
        # We can extract with finditer
        # Find all (id, ...)
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*'([^']*)',\s*'(.*?)',\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*'([^']*)',\s*(?:'([^']*)'|NULL),\s*([0-9]+|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*([0-9]+),\s*([0-9]+),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*([0-9]+)", line):
            pid = int(m.group(1))
            name = m.group(2)
            cr_at = m.group(6)
            up_at = m.group(7)
            tags_val = m.group(12)
            promo = int(m.group(13))
            rec = int(m.group(14))
            good_sales = int(m.group(15))
            prod_rows.append({
                'id': pid, 'name': name, 'created_at': cr_at, 'updated_at': up_at,
                'tags': tags_val, 'promotion': promo, 'recommended': rec, 'good_sales': good_sales
            })

print(f"Total parsed products: {len(prod_rows)}")

promo_count = sum(1 for p in prod_rows if p['promotion'] > 0)
rec_count = sum(1 for p in prod_rows if p['recommended'] > 0)
sales_count = sum(1 for p in prod_rows if p['good_sales'] > 0)
tags_count = sum(1 for p in prod_rows if p['tags'] and p['tags'] != 'NULL' and p['tags'].strip())

print(f"- สินค้าติดธง Promotion (โปรโมชั่น): {promo_count} รายการ")
print(f"- สินค้าติดธง Recommended (สินค้าแนะนำ): {rec_count} รายการ")
print(f"- สินค้าติดธง Good Sales (สินค้าขายดี): {sales_count} รายการ")
print(f"- สินค้าที่มี Tags ในตาราง: {tags_count} รายการ")

# Sample tags
tags_samples = [p['tags'] for p in prod_rows if p['tags'] and p['tags'] != 'NULL' and p['tags'].strip()][:5]
print("\nตัวอย่าง Tags ที่พบ:")
for t in tags_samples:
    print(" ", t)

# Inspect stock in items
stock_items = []
m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", text, re.DOTALL)
if m_items:
    it_pattern = re.compile(r"\(([0-9]+),\s*([0-9]+),\s*'([^']*)',\s*([0-9\.]+),\s*([^,]+),\s*([0-9]+),\s*([0-9]+),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL)")
    for m in it_pattern.finditer(m_items.group(1)):
        stock_items.append(int(m.group(6)))

in_stock = sum(1 for s in stock_items if s > 0)
zero_stock = sum(1 for s in stock_items if s <= 0)
print(f"\nรายการ Variants ในตาราง items ทั้งหมด: {len(stock_items)}")
print(f"- สต็อก > 0 (พร้อมส่ง In-stock): {in_stock} รายการ")
print(f"- สต็อก 0 (สินค้าหมด Out-of-stock): {zero_stock} รายการ")
