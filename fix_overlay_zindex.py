import re

def fix_overlay(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the overlay and remove it from its current position
    overlay_str = '    <!-- Mega Menu Overlay -->\n    <div id="mega-menu-overlay" class="hidden fixed inset-0 bg-black/30 z-[50] cursor-pointer"></div>\n'
    if overlay_str in content:
        content = content.replace(overlay_str, '')
    else:
        # Fallback if opacity was changed to 30 or something else
        content = re.sub(r'\s*<!-- Mega Menu Overlay -->\s*<div id="mega-menu-overlay".*?</div>\n', '\n', content)

    # Insert it right after <div id="app"> or at the very end of innerHTML.
    # But since this is a string literal inside main.js: document.querySelector('#app').innerHTML = `...`
    # The end is before `\n` backtick.
    
    # Actually, placing it right before the closing backtick of innerHTML is perfectly safe.
    # Let's find the end of the HTML block.
    # Usually it's `\n` followed by `\n// --- Mega Menu Click Logic` or similar.
    
    # We can just put it at the very top of #app, BEFORE the Utility bar.
    # The utility bar starts with: <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
    
    new_overlay = '\n  <!-- Mega Menu Overlay (Moved outside to guarantee it sits under header) -->\n  <div id="mega-menu-overlay" class="hidden fixed inset-0 bg-black/30 z-[40] cursor-pointer"></div>\n  '
    
    utility_str = '<!-- 0. แถบ Utility ด้านบนสุด'
    if utility_str in content:
        content = content.replace(utility_str, new_overlay + utility_str)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Moved overlay in {filepath}")
    else:
        print(f"Could not find utility bar in {filepath}")

fix_overlay('/Users/aliceer/UDO/frontend/src/main.js')
fix_overlay('/Users/aliceer/UDO/frontend/src/product.js')

