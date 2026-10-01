import re
import json

with open('/Users/aliceer/UDO/udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Let's find matches of products
# products structure: (id, name, short_desc, desc, catalog, created_at, updated_at, thumb_image, images, ...)
# Find INSERT INTO `products`
insert_idx = sql.find("INSERT INTO `products` VALUES")
if insert_idx != -1:
    end_idx = sql.find(";\n", insert_idx)
    chunk = sql[insert_idx:end_idx]
    
    # Let's see some samples of thumb_image vs images
    # We can search for pattern 'products/...jpg'
    matches = re.findall(r"'products/([^']+)'", chunk)
    print("Found total products image paths:", len(matches))
    print("First 10 sample paths:", matches[:10])

    # Check for brackets json strings like '["products/..."]'
    json_matches = re.findall(r"'(\[\"products/[^\]]+\])'", chunk)
    print("Found products with multiple images array:", len(json_matches))
    if json_matches:
        print("Sample multiple images array:", json_matches[0])
