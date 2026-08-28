import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # Change flex-row layout back to flex-col for the links
        # Currently: class="flex items-center gap-2 md:gap-2.5 group px-1 md:px-2"
        # We will replace it with: class="flex flex-col items-center justify-center gap-1.5 group px-2"
        dock_html = re.sub(
            r'class="flex items-center gap-2 md:gap-2\.5 group px-1 md:px-2"',
            'class="flex flex-col items-center justify-center gap-1 md:gap-2 group px-2 md:px-4"',
            dock_html
        )
        
        # We should make the separator line a bit taller to match the new vertical height
        # Right now it's h-10 w-[1px], let's make it h-14
        dock_html = dock_html.replace('h-10 w-[1px]', 'h-16 w-[1px]')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock updated to vertical layout.")
