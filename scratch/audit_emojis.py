import os
import re

# Comprehensive Unicode Emoji ranges
EMOJI_REGEX = re.compile(
    "["
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F680-\U0001F6FF"  # transport & map
    "\U0001F1E0-\U0001F1FF"  # flags (iOS)
    "\U00002702-\U000027B0"
    "\U0001F100-\U0001F251"  # enclosed alphanumeric supplement
    "\U0001F900-\U0001F9FF"  # supplemental symbols and pictographs
    "\U0001FA70-\U0001FAFF"  # symbols and pictographs extended-a
    "\U00002600-\U000026FF"  # misc symbols
    "]+",
    flags=re.UNICODE
)

CHECK_FILES = [
    'udo_migration_engine.py',
    'frontend/src/category.js',
    'frontend/src/category_taxonomy.js',
    'frontend/src/home_hydrate.js',
    'frontend/src/product_hydrate.js',
    'frontend/src/mock_database.js',
    'frontend/src/welding_products.json',
    'frontend/src/pilot_products_5.json'
]

found_emojis = []

for fpath in CHECK_FILES:
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        for idx, line in enumerate(f, 1):
            matches = EMOJI_REGEX.findall(line)
            if matches:
                found_emojis.append((fpath, idx, matches, line.strip()[:60]))

print(f"Audit completed across {len(CHECK_FILES)} core files.")
if found_emojis:
    print(f"FAILED: Found {len(found_emojis)} lines with emojis:")
    for f, l, m, s in found_emojis:
        print(f"  {f}:{l} -> {m} in '{s}'")
else:
    print("SUCCESS: 0 emojis found! Repository is 100% emoji-free.")
