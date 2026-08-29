import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# I will use string replace. Let's extract the exact current buttons.
old_buttons = """                <button class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-r-lg transition-all duration-300 z-20 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button class="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-l-lg transition-all duration-300 z-20 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>"""

new_buttons = """                <button class="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button class="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>"""

content = content.replace(old_buttons, new_buttons)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated slider arrows to exactly match home page product cards.")
