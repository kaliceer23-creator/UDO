import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace Left Button
content = content.replace(
    'class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"',
    'class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-r-lg transition-all duration-300 z-20 cursor-pointer"'
)

# Replace Right Button
content = content.replace(
    'class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"',
    'class="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-l-lg transition-all duration-300 z-20 cursor-pointer"'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated slider arrows to be flush and always visible.")
