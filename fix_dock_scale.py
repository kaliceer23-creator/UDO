import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # 1. Reduce text size from 17/19px to 15/16px
        dock_html = dock_html.replace('text-[17px] md:text-[19px]', 'text-[15px] md:text-[16px]')
        
        # 2. Reduce icon size from 24/26px to 22/24px (w-6 h-6 to w-[22px] h-[22px] md:w-6 md:h-6)
        dock_html = dock_html.replace('w-6 h-6 md:w-[26px] md:h-[26px]', 'w-[22px] h-[22px] md:w-6 md:h-6')
        
        # 3. Reduce container padding
        dock_html = dock_html.replace('px-6 md:px-8 py-2 md:py-3', 'px-5 md:px-6 py-1.5 md:py-2')
        
        # 4. Reduce gap
        dock_html = dock_html.replace('gap-4 md:gap-6', 'gap-3 md:gap-4')
        
        # 5. Reduce separator height
        dock_html = dock_html.replace('h-10 w-[1px]', 'h-8 w-[1px]')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock scaled down.")
