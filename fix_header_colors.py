import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Locate the Header section
start_idx = content.find('<!-- 1. แถบสีขาวด้านบน (Main Header) -->')
end_idx = content.find('<!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->')

if start_idx != -1 and end_idx != -1:
    header_html = content[start_idx:end_idx]
    
    # Replace gray text classes with text-black/90
    header_html = header_html.replace('text-gray-700', 'text-black/90')
    header_html = header_html.replace('text-gray-800', 'text-black/90')
    header_html = header_html.replace('text-black/80', 'text-black/90')
    
    content = content[:start_idx] + header_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Header colors updated successfully.")
else:
    print("Could not find boundaries")
