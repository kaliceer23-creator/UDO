import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    main_content = f.read()

# Extract from '<div class="sticky' to the start of '<main'
start_idx_main = main_content.find('<div class="sticky top-0')
end_idx_main = main_content.find('<main', start_idx_main)
if start_idx_main == -1 or end_idx_main == -1:
    print("Could not extract header from main.js")
    exit(1)
    
header_html = main_content[start_idx_main:end_idx_main]

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    product_content = f.read()

# In product.js, find the existing header to replace.
# The existing header starts with <header class="w-full bg-white border-b border-gray-100"> 
# or maybe it has a sticky wrapper too. Let's find '<header class="w-full'
# And replace everything from there until <main

# Check if product.js has the sticky wrapper
start_idx_prod = product_content.find('<div class="sticky top-0')
if start_idx_prod == -1:
    start_idx_prod = product_content.find('<header class="w-full bg-white')

end_idx_prod = product_content.find('<!-- Breadcrumb -->', start_idx_prod)
if end_idx_prod == -1:
    end_idx_prod = product_content.find('<div class="bg-white">', start_idx_prod) # the breadcrumb wrapper

# We should replace up to just before the Breadcrumb.
# Let's ensure we are replacing the exact header area.
if start_idx_prod != -1 and end_idx_prod != -1:
    new_product_content = product_content[:start_idx_prod] + header_html + product_content[end_idx_prod:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_product_content)
    print("Copied header successfully.")
else:
    print("Could not find insertion points in product.js")

