import re

# Update style.css
with open('/Users/aliceer/UDO/frontend/src/style.css', 'r') as f:
    css_content = f.read()

css_content = css_content.replace('rgb(118, 184, 63)', 'rgb(138, 195, 83)')
css_content = css_content.replace('#76b83f', '#8ac353')

with open('/Users/aliceer/UDO/frontend/src/style.css', 'w') as f:
    f.write(css_content)

# Update main.js
with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    js_content = f.read()

js_content = js_content.replace('#76b83f', '#8ac353')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(js_content)

print("Reverted brand color back to #8ac353 successfully.")
