import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Size buttons
size_block_old = """<div class="flex flex-wrap items-center gap-3">
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">2.0 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">2.6 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">3.2 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">4.0 mm</button>
              </div>"""

size_block_new = """<div class="flex flex-wrap items-center gap-3">
                <button data-size="2.0" class="size-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">2.0 mm</button>
                <button data-size="2.6" class="size-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">2.6 mm</button>
                <button data-size="3.2" class="size-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">3.2 mm</button>
                <button data-size="4.0" class="size-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">4.0 mm</button>
              </div>"""
content = content.replace(size_block_old, size_block_new)

# Packaging buttons
pkg_block_old = """<div class="flex flex-wrap items-center gap-3">
                <button id="btn-unit-pack" data-price="330" data-original="450" class="unit-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อละ 1 กก.</button>
                <button id="btn-unit-box" data-price="1,600" data-original="2,200" class="unit-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ห่อละ 5 กก.</button>
              </div>"""

pkg_block_new = """<div class="flex flex-wrap items-center gap-3">
                <button data-pkg="1" class="pkg-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อละ 1 กก.</button>
                <button data-pkg="5" class="pkg-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ห่อละ 5 กก.</button>
              </div>"""
content = content.replace(pkg_block_old, pkg_block_new)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated HTML attributes successfully.")
