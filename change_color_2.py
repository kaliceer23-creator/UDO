import re

# Update style.css
with open('/Users/aliceer/UDO/frontend/src/style.css', 'r') as f:
    css_content = f.read()

css_content = css_content.replace('rgb(138, 195, 83)', 'rgb(177, 158, 72)')
css_content = css_content.replace('#8ac353', '#b19e48')

with open('/Users/aliceer/UDO/frontend/src/style.css', 'w') as f:
    f.write(css_content)

# Update main.js
with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    js_content = f.read()

js_content = js_content.replace('#8ac353', '#b19e48')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(js_content)

print("Updated brand color to 177, 158, 72 successfully.")
