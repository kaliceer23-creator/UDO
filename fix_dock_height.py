import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # 1. Reduce padding of container
        dock_html = dock_html.replace('py-4 md:py-5', 'py-2 md:py-3')
        
        # 2. Reduce gap between icon and text
        dock_html = dock_html.replace('gap-1 md:gap-2', 'gap-0.5 md:gap-1')
        
        # 3. Reduce icon size slightly to save vertical space (32px to 26px)
        dock_html = dock_html.replace('w-6 h-6 md:w-8 md:h-8', 'w-6 h-6 md:w-[26px] md:h-[26px]')
        
        # 4. Reduce separator height
        dock_html = dock_html.replace('h-16 w-[1px]', 'h-10 w-[1px]')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock height reduced.")
