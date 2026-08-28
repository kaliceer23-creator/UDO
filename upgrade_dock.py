import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # 1. Update container: More padding, bigger shadow, larger gap
        dock_html = re.sub(
            r'px-6 md:px-10 py-3 shadow-\[0_8px_30px_rgb\(0,0,0,0\.15\)\] flex items-center gap-6 md:gap-8', 
            'px-8 md:px-12 py-4 md:py-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-8 md:gap-14 hover:shadow-[0_20px_50px_rgba(138,195,83,0.3)] transition-shadow duration-500', 
            dock_html
        )
        
        # 2. Update Icons: larger size
        dock_html = dock_html.replace('w-5 h-5 md:w-6 md:h-6', 'w-6 h-6 md:w-8 md:h-8')
        
        # 3. Update Text: larger size, slightly bolder for the larger size (semibold)
        dock_html = dock_html.replace('text-[16px] md:text-[17px] font-medium', 'text-[17px] md:text-[19px] font-semibold')
        
        # 4. Make separator taller
        dock_html = dock_html.replace('h-6 w-[1px]', 'h-10 w-[1px]')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock upgraded to Hero CTA style.")
