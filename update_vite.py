import re

filepath = '/Users/aliceer/UDO/frontend/vite.config.js'
with open(filepath, 'r') as f:
    content = f.read()

# Add category: 'category.html' to the input object
if "category: 'category.html'" not in content:
    content = content.replace("product: 'product.html'", "product: 'product.html',\n        category: 'category.html'")
    with open(filepath, 'w') as f:
        f.write(content)
    print("Updated vite.config.js")
else:
    print("vite.config.js already updated")

