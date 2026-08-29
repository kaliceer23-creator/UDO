import re

vite_config_path = '/Users/aliceer/UDO/frontend/vite.config.js'

with open(vite_config_path, 'r') as f:
    content = f.read()

# Remove the category line from rollupOptions
content = content.replace("category: 'category.html'", "")
# Clean up any trailing commas or empty lines if necessary, but leaving it empty or with a comma is valid JS for Vite config usually.
# Let's just do a clean replace of the whole rollupOptions block back to how it was (just main and product)
replacement = """build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        product: 'product.html'
      }
    },"""

# Use regex to replace the entire rollupOptions block
content = re.sub(r'build: \{\s*rollupOptions: \{\s*input: \{[^}]+\}\s*\},', replacement, content)

with open(vite_config_path, 'w') as f:
    f.write(content)

print("Cleaned up vite.config.js")
