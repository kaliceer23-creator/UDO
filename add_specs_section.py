import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# We need to insert this section after the end of the top flex layout.
# The top flex layout is inside <div class="max-w-[1250px] mx-auto px-4 md:px-8">
# Let's find the closing tags:
#         </div>
#       </div>
#     </main>
# We will insert it right before </main>

specs_html = """
        </div>
      </div>

      <!-- Sticky Tab Bar -->
      <div class="w-full bg-[#f2f2f2] border-y border-gray-200 mt-16 sticky top-[64px] z-40">
        <div class="max-w-[1250px] mx-auto px-4 md:px-8 flex items-center gap-10 overflow-x-auto whitespace-nowrap">
          <a href="#" class="py-4 text-[#252525] font-semibold">ภาพรวม</a>
          <a href="#" class="py-4 text-[#252525] font-semibold">คุณสมบัติ</a>
          <a href="#" class="py-4 text-[#252525] font-semibold">รายละเอียดสินค้า</a>
          <a href="#" class="py-4 text-[#252525] font-semibold">ชื่อสินค้า</a>
        </div>
      </div>

      <!-- Specs Section -->
      <div class="w-full bg-[#e3e3e3] py-12">
        <div class="max-w-[1250px] mx-auto px-4 md:px-8">
          <h2 class="text-[22px] font-bold text-[#252525] mb-8">คุณสมบัติสินค้า</h2>
          
          <div class="w-full flex flex-col text-[14px] text-[#252525]">
            <!-- Row 1 -->
            <div class="flex bg-[#d4d4d4] py-3.5 px-6 rounded-t-sm">
              <div class="w-[40%] md:w-[30%]">Type</div>
              <div class="w-[60%] md:w-[70%]">Nintendo Switch 2</div>
            </div>
            <!-- Row 2 -->
            <div class="flex bg-[#dedede] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Wireless technology</div>
              <div class="w-[60%] md:w-[70%]">Wireless LAN (Wi-Fi 6), Bluetooth</div>
            </div>
            <!-- Row 3 -->
            <div class="flex bg-[#d4d4d4] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Wireless Operating Distance</div>
              <div class="w-[60%] md:w-[70%]">N/A</div>
            </div>
            <!-- Row 4 -->
            <div class="flex bg-[#dedede] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Connection Wird</div>
              <div class="w-[60%] md:w-[70%]">Audio jack 3.5mm. 4-contact stereo mini-plug (CTIA Standard)</div>
            </div>
            <!-- Row 5 -->
            <div class="flex bg-[#d4d4d4] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Battery Type</div>
              <div class="w-[60%] md:w-[70%]">Lithium-ion / 5220mAh</div>
            </div>
            <!-- Row 6 -->
            <div class="flex bg-[#dedede] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Battery Life</div>
              <div class="w-[60%] md:w-[70%]">Approx. 2-6.5 Hours</div>
            </div>
            <!-- Row 7 -->
            <div class="flex bg-[#d4d4d4] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Interface</div>
              <div class="w-[60%] md:w-[70%]">2x USB-C</div>
            </div>
            <!-- Row 8 -->
            <div class="flex bg-[#dedede] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Number of buttons</div>
              <div class="w-[60%] md:w-[70%]">N/A</div>
            </div>
            <!-- Row 9 -->
            <div class="flex bg-[#d4d4d4] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Color</div>
              <div class="w-[60%] md:w-[70%]">Black</div>
            </div>
            <!-- Row 10 -->
            <div class="flex bg-[#dedede] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Warranty</div>
              <div class="w-[60%] md:w-[70%]">18 Months</div>
            </div>
            <!-- Row 11 -->
            <div class="flex bg-[#d4d4d4] py-3.5 px-6 rounded-b-sm">
              <div class="w-[40%] md:w-[30%]">Option</div>
              <div class="w-[60%] md:w-[70%]">Mario Kart World Bundle</div>
            </div>
          </div>
        </div>
      <!-- End of Specs Section -->
"""

# Replace the end of the flex container to inject our new full-width sections inside main
target_end = '        </div>\n      </div>\n    </main>'

content = content.replace(target_end, specs_html + '\n    </main>')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Added Specifications section successfully.")
