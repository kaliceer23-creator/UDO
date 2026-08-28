import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # Enlarge padding of the dock container slightly
        dock_html = dock_html.replace('px-3 md:px-4 py-1.5 md:py-2', 'px-5 md:px-6 py-2 md:py-3')
        
        # Increase icon size just a tiny bit to balance the larger dock (from 24px to 26px)
        dock_html = dock_html.replace('w-[22px] h-[22px] md:w-6 md:h-6', 'w-6 h-6 md:w-[26px] md:h-[26px]')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock enlarged slightly.")
