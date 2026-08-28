import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # Remove the separators
        # Look for <!-- Separator -->\n    <div class="h-8 w-[1px] bg-gray-300"></div>
        dock_html = re.sub(r'\s*<!-- Separator -->\s*<div class="h-8 w-\[1px\] bg-gray-300"></div>', '', dock_html)
        
        # In case the height is different
        dock_html = re.sub(r'\s*<!-- Separator -->\s*<div class="[^"]+ w-\[1px\] bg-gray-300"></div>', '', dock_html)
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Separators removed.")
