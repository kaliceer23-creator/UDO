import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Make gap consistent
content = content.replace(
    '<div class="brand-track flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">',
    '<div class="brand-track flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">'
)

# Update the cards to be 6 columns
old_class = 'snap-start shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] aspect-[2/1] md:aspect-[16/7] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 hover:shadow-lg transition-all overflow-hidden relative'
new_class = 'snap-start shrink-0 w-[calc(50%-8px)] md:w-[calc(25%-12px)] lg:w-[calc(16.666%-13.33px)] h-[90px] md:h-[110px] lg:h-[130px] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-4 hover:shadow-md transition-all'

content = content.replace(old_class, new_class)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
