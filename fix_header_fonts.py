import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Locate the Header section
start_idx = content.find('<!-- 1. แถบสีขาวด้านบน (Main Header) -->')
end_idx = content.find('<!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->')

if start_idx != -1 and end_idx != -1:
    header_html = content[start_idx:end_idx]
    
    # "ทั้งหมด" dropdown
    header_html = header_html.replace('text-[15px] text-gray-700', 'text-[16px] text-gray-700 font-medium')
    
    # Search input
    header_html = header_html.replace('text-[15px] text-black/90', 'text-[16px] text-black/90 font-medium')
    
    # Right side icons container
    header_html = header_html.replace('text-[15px] text-gray-800 gap-5', 'text-[16px] text-gray-800 font-medium gap-5')
    
    # "เข้าสู่ระบบ" text
    header_html = header_html.replace('font-medium text-[15px]', 'font-medium text-[16px]')
    
    # Any other text-[15px] in header
    header_html = header_html.replace('text-[15px]', 'text-[16px]')
    
    content = content[:start_idx] + header_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Header fonts updated successfully.")
else:
    print("Could not find boundaries")
