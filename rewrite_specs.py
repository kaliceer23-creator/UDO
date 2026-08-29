import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# We need to find the entire Specs Section and rewrite it to be clean.
start_marker = '<!-- Specs Section -->'
end_marker = '<!-- End of Specs Section -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    end_idx += len(end_marker)
    
    new_specs_html = """<!-- Specs Section -->
      <div class="w-full bg-white py-12 border-b border-gray-200">
        <div class="max-w-[1250px] mx-auto px-4 md:px-8">
          <h2 class="text-[22px] font-bold text-[#252525] mb-8">คุณสมบัติสินค้า</h2>
          
          <div class="w-full flex flex-col text-[14px] text-[#252525]">
            <!-- Row 1 -->
            <div class="flex bg-[#F8F8F8] py-3.5 px-6 rounded-t-sm">
              <div class="w-[40%] md:w-[30%]">Type</div>
              <div class="w-[60%] md:w-[70%]">Nintendo Switch 2</div>
            </div>
            <!-- Row 2 -->
            <div class="flex bg-white py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Wireless technology</div>
              <div class="w-[60%] md:w-[70%]">Wireless LAN (Wi-Fi 6), Bluetooth</div>
            </div>
            <!-- Row 3 -->
            <div class="flex bg-[#F8F8F8] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Wireless Operating Distance</div>
              <div class="w-[60%] md:w-[70%]">N/A</div>
            </div>
            <!-- Row 4 -->
            <div class="flex bg-white py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Connection Wired</div>
              <div class="w-[60%] md:w-[70%]">Audio jack 3.5mm. 4-contact stereo mini-plug (CTIA Standard)</div>
            </div>
            <!-- Row 5 -->
            <div class="flex bg-[#F8F8F8] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Battery Type</div>
              <div class="w-[60%] md:w-[70%]">Lithium-ion / 5220mAh</div>
            </div>
            <!-- Row 6 -->
            <div class="flex bg-white py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Battery Life</div>
              <div class="w-[60%] md:w-[70%]">Approx. 2-6.5 Hours</div>
            </div>
            <!-- Row 7 -->
            <div class="flex bg-[#F8F8F8] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Interface</div>
              <div class="w-[60%] md:w-[70%]">2x USB-C</div>
            </div>
            <!-- Row 8 -->
            <div class="flex bg-white py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Number of buttons</div>
              <div class="w-[60%] md:w-[70%]">N/A</div>
            </div>
            <!-- Row 9 -->
            <div class="flex bg-[#F8F8F8] py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Color</div>
              <div class="w-[60%] md:w-[70%]">Black</div>
            </div>
            <!-- Row 10 -->
            <div class="flex bg-white py-3.5 px-6">
              <div class="w-[40%] md:w-[30%]">Warranty</div>
              <div class="w-[60%] md:w-[70%]">18 Months</div>
            </div>
            <!-- Row 11 -->
            <div class="flex bg-[#F8F8F8] py-3.5 px-6 rounded-b-sm">
              <div class="w-[40%] md:w-[30%]">Option</div>
              <div class="w-[60%] md:w-[70%]">Mario Kart World Bundle</div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Specs Section -->"""
    
    new_content = content[:start_idx] + new_specs_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_content)
    print("Rewrote specs section.")
else:
    print("Could not find start/end markers.")
