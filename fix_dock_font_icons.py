import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # 1. Enlarge font slightly
        dock_html = dock_html.replace('text-[15px] md:text-[16px]', 'text-[16px] md:text-[17px]')
        
        # 2. Enlarge icons slightly
        dock_html = dock_html.replace('w-[22px] h-[22px] md:w-6 md:h-6', 'w-6 h-6 md:w-[26px] md:h-[26px]')
        
        # 3. Remove the red part from the phone icon (Item 2)
        # We look for the red path in Item 2.
        # It's `<path stroke="#E32626" stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`
        phone_red_path_pattern = r'<path stroke="#E32626"[^>]+d="M12 9v2m0 4h\.01m-6\.938 4h13\.856[^"]+" />'
        dock_html = re.sub(phone_red_path_pattern, '', dock_html)
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock icons and fonts enlarged, phone red removed.")
