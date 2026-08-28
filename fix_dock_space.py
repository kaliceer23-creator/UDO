import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # 1. Reduce gap between the 3 buttons
        dock_html = dock_html.replace('gap-3 md:gap-4', 'gap-1 md:gap-2')
        
        # 2. Reduce padding of the dock container
        dock_html = dock_html.replace('px-5 md:px-6', 'px-3 md:px-4')
        
        # 3. Reduce vertical gap between icon and text inside each button
        dock_html = dock_html.replace('gap-0.5 md:gap-1', 'gap-0 md:gap-0.5')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock space reduced.")
