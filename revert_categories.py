import re

with open('/tmp/old_main.js', 'r') as f:
    old_content = f.read()

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    current_content = f.read()

# 1. Extract the beautiful old categories
old_cat_start = old_content.find('<!-- Section: Category Shortcuts (Bento Grid 7 Items) -->')
old_cat_end = old_content.find('</section>', old_cat_start) + 10
beautiful_old_categories = old_content[old_cat_start:old_cat_end]

# 2. Remove the Landy Home categories I just added (if it exists)
landy_cat_start = current_content.find('<!-- Section: Bento Categories (Landy Home Style) -->')
if landy_cat_start != -1:
    landy_cat_end = current_content.find('</section>', landy_cat_start) + 10
    current_content = current_content[:landy_cat_start] + current_content[landy_cat_end:]

# 3. Replace the current messed up categories UNDER the brand slider
current_cat_start = current_content.find('<!-- Section: Category Shortcuts (Bento Grid 10 Items from old site) -->')
if current_cat_start != -1:
    current_cat_end = current_content.find('</section>', current_cat_start) + 10
    current_content = current_content[:current_cat_start] + beautiful_old_categories + current_content[current_cat_end:]

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(current_content)
print("Reverted categories to 5efc561 version.")
