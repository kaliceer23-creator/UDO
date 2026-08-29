import re
import os

vite_config_path = '/Users/aliceer/UDO/frontend/vite.config.js'

with open(vite_config_path, 'r') as f:
    content = f.read()

# We need to add rollupOptions inside build if it doesn't exist
if 'rollupOptions' not in content:
    # Find build object
    build_str = "build: {"
    if build_str in content:
        replacement = """build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        product: 'product.html',
        category: 'category.html'
      }
    },"""
        content = content.replace(build_str, replacement)
        with open(vite_config_path, 'w') as f:
            f.write(content)
        print("Updated vite.config.js")
    else:
        print("Could not find build object.")
else:
    print("rollupOptions already exists.")
