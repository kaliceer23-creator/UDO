import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # Change flex-col to flex-row and update classes
        dock_html = dock_html.replace('flex flex-col items-center gap-1 group w-20 md:w-24', 'flex items-center gap-2 md:gap-2.5 group px-1 md:px-2')
        # Increase text size
        dock_html = dock_html.replace('text-[12px] md:text-[13px]', 'text-[14px] md:text-[15px]')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock updated successfully.")
