import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

brand_html_start = content.find('<!-- Section 1: Brand Slider (3 Items per view, with Dots) -->')
brand_html_end = content.find('</section>', brand_html_start)
dock_html = content[brand_html_start:brand_html_end]

# Current prev button (which I messed up)
# We will just replace the whole <button> tags with the exact ones from product slider

old_prev = r'<button class="brand-prev[^>]+>.*?</svg>\s*</button>'
new_prev = """<button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center opacity-0 group-hover/brand:opacity-100 pointer-events-none group-hover/brand:pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>"""

old_next = r'<button class="brand-next[^>]+>.*?</svg>\s*</button>'
new_next = """<button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center opacity-0 group-hover/brand:opacity-100 pointer-events-none group-hover/brand:pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>"""

dock_html = re.sub(old_prev, new_prev, dock_html, flags=re.DOTALL)
dock_html = re.sub(old_next, new_next, dock_html, flags=re.DOTALL)

# Dots: "เอาขึ้นด้านบนอีก" (move them up higher). Right now they are bottom-3 right-4.
# Product cards have bottom-1 right-2, but the track goes all the way to the bottom.
# Brand track also goes to the bottom. Let's make it bottom-3 right-4 so it's clearly inside the banner over the image.
# If they want it even higher, maybe bottom-4 or bottom-5 right-4.
dock_html = dock_html.replace('bottom-3 right-4', 'bottom-4 right-4')

content = content[:brand_html_start] + dock_html + content[brand_html_end:]

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Replaced with EXACT product card buttons.")
