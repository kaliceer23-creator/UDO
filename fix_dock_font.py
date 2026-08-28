import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # Increase text size from 14/15 to 16/17
        dock_html = dock_html.replace('text-[14px] md:text-[15px]', 'text-[16px] md:text-[17px]')
        
        # Decrease font weight from font-bold to font-medium
        dock_html = dock_html.replace('font-bold', 'font-medium')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock font updated.")
