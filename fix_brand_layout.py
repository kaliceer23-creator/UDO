import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace the title and brand/SKU block
old_block = """            <!-- Title -->
            <h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>
            
            <div class="text-[14px] text-black/45 mb-5 flex items-center gap-4">
              <span>แบรนด์: <a href="#" class="text-[#252525] font-medium hover:underline">NINTENDO</a></span>
              <span class="text-black/45">|</span>
              <span>SKU: 4902370553451</span>
            </div>"""

new_block = """            <!-- Brand Badge -->
            <div class="mb-3 flex items-center gap-3">
              <a href="#" class="inline-block bg-[#252525] hover:bg-black text-white text-[12px] md:text-[13px] font-medium px-3 py-1 rounded-[3px] tracking-wide transition-colors uppercase">Nintendo</a>
              <span class="text-[13px] text-gray-400">SKU: 4902370553451</span>
            </div>

            <!-- Title -->
            <h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-[1.3] mb-6">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>"""

content = content.replace(old_block, new_block)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Moved brand to a badge above the title.")
