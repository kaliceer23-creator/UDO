import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# The exact old card text to replace
old_card = """          <!-- Card 2: เครื่องเชื่อมและเครื่องตัดพลาสม่า (Span 1, Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อมและ<br />เครื่องตัดพลาสม่า
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>"""

new_card = """          <!-- Card 2: เครื่องเชื่อมและเครื่องตัดพลาสม่า (Span 1, Premium Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <!-- Background Image with Hover Zoom Effect -->
            <div class="absolute inset-0 bg-[url('/images/bg-welding.jpeg')] bg-cover bg-right-bottom bg-no-repeat group-hover:scale-110 transition-transform duration-700"></div>
            <!-- Gradient Overlay (Dark Top-Left for Text Readability) -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/20 to-transparent z-0"></div>
            
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300 shadow-black/50 drop-shadow-md">
                เครื่องเชื่อมและ<br />เครื่องตัดพลาสม่า
              </h3>
            </div>
          </a>"""

if old_card in content:
    content = content.replace(old_card, new_card)
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Successfully replaced the card with the new premium image style.")
else:
    print("Could not find the exact old card HTML. Please check the structure.")
