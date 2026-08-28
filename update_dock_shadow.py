import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('</div>', content.find('<!-- Item 3:', dock_start)) + 6
    if dock_end != -1:
        dock_html = content[dock_start:dock_end]
        
        # Replace the current shadow with a softer, premium shadow
        # Current: shadow-[0_20px_50px_rgba(0,0,0,0.2)]
        # New: shadow-[0_15px_60px_-15px_rgba(0,0,0,0.2)] or shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        # I'll use shadow-[0_20px_40px_rgba(0,0,0,0.08)] for that ultra-soft glow
        dock_html = dock_html.replace('shadow-[0_20px_50px_rgba(0,0,0,0.2)]', 'shadow-[0_20px_40px_rgba(0,0,0,0.08)]')
        
        # For the hover shadow, also make it softer
        dock_html = dock_html.replace('hover:shadow-[0_20px_50px_rgba(138,195,83,0.3)]', 'hover:shadow-[0_20px_40px_rgba(138,195,83,0.2)]')
        
        # Change border to be softer too
        dock_html = dock_html.replace('border border-gray-100', 'border border-gray-200/50')
        
        content = content[:dock_start] + dock_html + content[dock_end:]
        with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
            f.write(content)
        print("Dock shadow softened.")
