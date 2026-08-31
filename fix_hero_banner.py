import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the section wrapper. Remove fixed heights (h-[65vh] md:h-[80vh] lg:h-[calc(100vh-160px)])
# Wait, let's just find the exact string.
old_section = '    <!-- Hero Slider Section (ปรับความสูงเพิ่มขึ้นอีกนิดเดียว) -->\n    <section class="relative w-full h-[65vh] md:h-[80vh] lg:h-[calc(100vh-160px)] bg-black overflow-hidden group">'
new_section = '    <!-- Hero Slider Section (ปรับเป็น Auto Height โชว์รูปเต็มกว้าง) -->\n    <section class="relative w-full bg-black overflow-hidden group">'
content = content.replace(old_section, new_section)

# 2. Update the slider container to use Grid.
old_slider_container = '      <!-- Slider Container -->\n      <div id="heroSlider" class="relative w-full h-full">'
new_slider_container = '      <!-- Slider Container -->\n      <div id="heroSlider" class="grid w-full">'
content = content.replace(old_slider_container, new_slider_container)

# 3. Replace Slide 1 and Slide 2 completely.
# Let's use regex to replace everything from <!-- Slide 1 --> up to just before <!-- Slider Controls (Arrows) -->
pattern = re.compile(r'<!-- Slide 1 -->.*?<!-- Slider Controls \(Arrows\) -->', re.DOTALL)

new_slides = """<!-- Slide 1 -->
        <div class="col-start-1 row-start-1 w-full opacity-100 z-10 transition-opacity duration-300 ease-in-out">
          <a href="#" class="block w-full">
            <img src="/images/banners/Banner_0.png" alt="Banner 1" class="w-full h-auto block object-contain" />
          </a>
        </div>

        <!-- Slide 2 -->
        <div class="col-start-1 row-start-1 w-full opacity-0 z-0 transition-opacity duration-300 ease-in-out">
          <a href="#" class="block w-full">
            <!-- สมมติว่ามีรูปแบนเนอร์ที่ 2 (ชั่วคราวใช้รูป 0 ไปก่อน) -->
            <img src="/images/banners/Banner_0.png" alt="Banner 2" class="w-full h-auto block object-contain" />
          </a>
        </div>

        <!-- Slider Controls (Arrows) -->"""

content = pattern.sub(new_slides, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Hero Banner updated to Grid-based Auto-Height layout")
