import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace button classes for both Slide 1 and Slide 2
old_class = 'class="inline-flex items-center justify-center px-6 py-2 md:py-2.5 text-[14px] md:text-[15px] font-bold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-sm"'
new_class = 'class="inline-flex items-center justify-center px-8 py-3 md:py-3.5 text-[16px] md:text-[18px] font-bold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-md hover:scale-105"'

content = content.replace(old_class, new_class)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Increased size of hero buttons")
