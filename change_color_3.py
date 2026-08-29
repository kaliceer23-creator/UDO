import re

# Update style.css
with open('/Users/aliceer/UDO/frontend/src/style.css', 'r') as f:
    css_content = f.read()

css_content = css_content.replace('rgb(117, 158, 72)', 'rgb(118, 184, 63)')
css_content = css_content.replace('#759e48', '#76b83f')

with open('/Users/aliceer/UDO/frontend/src/style.css', 'w') as f:
    f.write(css_content)

# Update main.js
with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    js_content = f.read()

js_content = js_content.replace('#759e48', '#76b83f')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(js_content)

print("Updated brand color to #76b83f successfully.")
