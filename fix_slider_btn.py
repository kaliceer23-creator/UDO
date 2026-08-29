import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Make the wrapper a group to support opacity-0 group-hover:opacity-100
content = content.replace(
    '<div class="relative w-full aspect-square flex items-center justify-center p-8 bg-[#f5f5f5]">',
    '<div class="relative w-full aspect-square flex items-center justify-center p-8 bg-[#f5f5f5] group">'
)

old_buttons = """                <!-- Arrows -->
                <button class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white flex items-center justify-center rounded transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white flex items-center justify-center rounded transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </button>"""

new_buttons = """                <!-- Arrows (Matching Home Page Slider) -->
                <button class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>"""

content = content.replace(old_buttons, new_buttons)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated product slider buttons to match home page.")
