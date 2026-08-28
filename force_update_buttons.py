with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# We need to replace the classes on brand-prev and brand-next
import re

# For brand-prev
old_prev_class = 'class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#E32626] hover:border-[#E32626] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto"'
new_prev_class = 'class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-4 bg-white/90 hover:bg-[#E32626] text-gray-700 hover:text-white border border-gray-200 hover:border-[#E32626] w-9 h-10 md:w-10 md:h-12 flex flex-col items-center justify-center rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm z-20 opacity-0 group-hover/brand:opacity-100 transition-all duration-300 pointer-events-none group-hover/brand:pointer-events-auto"'

# For brand-next
old_next_class = 'class="brand-next absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#E32626] hover:border-[#E32626] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto"'
new_next_class = 'class="brand-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-4 bg-white/90 hover:bg-[#E32626] text-gray-700 hover:text-white border border-gray-200 hover:border-[#E32626] w-9 h-10 md:w-10 md:h-12 flex flex-col items-center justify-center rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm z-20 opacity-0 group-hover/brand:opacity-100 transition-all duration-300 pointer-events-none group-hover/brand:pointer-events-auto"'

content = content.replace(old_prev_class, new_prev_class)
content = content.replace(old_next_class, new_next_class)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Replaced buttons.")
