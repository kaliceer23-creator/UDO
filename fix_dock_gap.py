import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # 1. Reduce horizontal gap
        dock_html = dock_html.replace('gap-8 md:gap-14', 'gap-4 md:gap-6')
        
        # 2. Reduce horizontal padding of the pill
        dock_html = dock_html.replace('px-8 md:px-12', 'px-6 md:px-8')
        
        # Also let's tighten the text and icon gap just to be safe, currently gap-0.5 md:gap-1
        # It's already small enough, but let's make sure it's tight
        dock_html = dock_html.replace('gap-0.5 md:gap-1', 'gap-0 md:gap-0.5')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock gap reduced.")
