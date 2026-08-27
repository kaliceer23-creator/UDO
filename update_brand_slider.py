import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace the gap in the track
content = content.replace(
    '<div class="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">',
    '<div class="brand-track flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">'
)

# Replace the card classes
old_class = 'snap-start shrink-0 w-[calc(50%-6px)] md:w-[calc(33.333%-10.66px)] lg:w-[calc(25%-12px)] h-[120px] md:h-[140px] lg:h-[160px] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 hover:shadow-md transition-all'
new_class = 'snap-start shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] aspect-[2/1] md:aspect-[16/7] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 hover:shadow-lg transition-all overflow-hidden relative'

content = content.replace(old_class, new_class)

# Add an ID to the brand slider wrapper so we can auto-scroll it
content = content.replace(
    '<section class="mb-10 md:mb-14 relative w-full group/brand">',
    '<section id="brandSliderSection" class="mb-10 md:mb-14 relative w-full group/brand">'
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
