filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Add pt-10 to the filter bar container
old_filter_div = '<!-- 2. Filter Bar -->\n  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-6">'
new_filter_div = '<!-- 2. Filter Bar -->\n  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-10 mb-6">'

content = content.replace(old_filter_div, new_filter_div)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed top spacing")
