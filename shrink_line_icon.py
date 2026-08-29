import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Current SVG line:
# <svg class="w-9 h-9 md:w-11 md:h-11 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
old_svg_tag = '<svg class="w-9 h-9 md:w-11 md:h-11 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
new_svg_tag = '<svg class="w-7 h-7 md:w-[34px] md:h-[34px] relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'

if old_svg_tag in content:
    content = content.replace(old_svg_tag, new_svg_tag)
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Shrunk LINE icon successfully.")
else:
    print("Could not find the SVG tag.")
