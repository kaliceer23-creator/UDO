import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# 1. Update buttons to match product cards
brand_html_start = content.find('<!-- Section 1: Brand Slider (3 Items per view, with Dots) -->')
brand_html_end = content.find('</section>', brand_html_start)

# The current buttons are:
# <button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#E32626] hover:border-[#E32626] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto">
# We will replace them with the product slider style buttons:
old_prev = r'<button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text\[#E32626\] hover:border-\[#E32626\] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto">'
new_prev = '<button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-4 bg-white/90 hover:bg-[#E32626] text-gray-700 hover:text-white border border-gray-200 hover:border-[#E32626] w-9 h-10 md:w-10 md:h-12 flex flex-col items-center justify-center rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm z-20 opacity-0 group-hover/brand:opacity-100 transition-all duration-300 pointer-events-none group-hover/brand:pointer-events-auto">'

old_next = r'<button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text\[#E32626\] hover:border-\[#E32626\] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto">'
new_next = '<button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-4 bg-white/90 hover:bg-[#E32626] text-gray-700 hover:text-white border border-gray-200 hover:border-[#E32626] w-9 h-10 md:w-10 md:h-12 flex flex-col items-center justify-center rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm z-20 opacity-0 group-hover/brand:opacity-100 transition-all duration-300 pointer-events-none group-hover/brand:pointer-events-auto">'

dock_html = content[brand_html_start:brand_html_end]

dock_html = re.sub(old_prev, new_prev, dock_html)
dock_html = re.sub(old_next, new_next, dock_html)

# 2. Move dots higher
# Current dots: <div class="absolute -bottom-2 right-2 flex items-center gap-1.5 brand-dots z-10">
# New dots: <div class="absolute bottom-2 right-2 flex items-center gap-1.5 brand-dots z-10"> (or bottom-4)
# Let's change -bottom-2 to bottom-2 so it's inside the container bounds and clearly belongs to it.
dock_html = dock_html.replace('absolute -bottom-2 right-2', 'absolute bottom-2 right-2')
# Also remove `pb-6` from the section container to make it tighter so dots don't float in empty space, or keep it if we moved dots up
dock_html = dock_html.replace('group/brand pb-6', 'group/brand pb-8') # Make room for dots inside the padding
dock_html = dock_html.replace('absolute bottom-2 right-2', 'absolute bottom-1 right-2') # Match exactly the product card

content = content[:brand_html_start] + dock_html + content[brand_html_end:]
with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Brand buttons and dots updated.")
