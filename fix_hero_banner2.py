import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace everything from <!-- Slide 1 --> up to <!-- Slide 2 --> and beyond up to </div>
# Actually, I will replace the entire #heroSlider contents.
pattern = re.compile(r'<!-- Slide 1 -->.*?</div>\s+</div>\s+</div>', re.DOTALL)

new_slides = """<!-- Slide 1 -->
        <div class="col-start-1 row-start-1 w-full opacity-100 z-10 transition-opacity duration-300 ease-in-out">
          <a href="#" class="block w-full">
            <img src="/images/banners/Banner_0.png" alt="Banner 1" class="w-full h-auto block object-contain" />
          </a>
        </div>

        <!-- Slide 2 -->
        <div class="col-start-1 row-start-1 w-full opacity-0 z-0 transition-opacity duration-300 ease-in-out">
          <a href="#" class="block w-full">
            <img src="/images/banners/Banner_0.png" alt="Banner 2" class="w-full h-auto block object-contain" />
          </a>
        </div>"""

# Let's be safer. Find Slide 1 and Slide 2
# I'll manually slice the string.
start_marker = "<!-- Slide 1 -->"
end_marker = "      <!-- Navigation Arrows"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_slides + "\n        \n      </div>\n\n" + content[end_idx:]
else:
    print("Could not find markers!")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Hero Banner slides replaced correctly")
