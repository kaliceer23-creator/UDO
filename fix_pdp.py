import os

# Extract header, footer, sticky from main.js correctly
with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    lines = f.readlines()

header_lines = lines[28:101] # 29 to 101
footer_lines = lines[1610:1766] # 1611 to 1766
sticky_lines = lines[1767:1861] # 1768 to 1861 (excluding the backtick and JS)

# Read the PDP content we generated before from product.js
with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    old_product_js = f.read()

# Extract just the <main> part (the PDP specific content)
start_idx = old_product_js.find('    <!-- Breadcrumb -->')
end_idx = old_product_js.find('    </main>') + len('    </main>\n')
pdp_content = old_product_js[start_idx:end_idx]

# Rewrite product.js cleanly
with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write("import './style.css'\n\n")
    f.write("document.querySelector('#app').innerHTML = `\n")
    f.write("".join(header_lines))
    f.write(pdp_content)
    f.write("".join(footer_lines))
    f.write("".join(sticky_lines))
    f.write("\n`;\n")

print("Fixed product.js successfully.")
