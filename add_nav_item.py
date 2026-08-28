import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

new_item = """<a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-bold text-[15px] xl:text-[16px] transition-colors group">
        ท่อบรรจุก๊าซและวาล์ว
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      """

target = """<a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-bold text-[15px] xl:text-[16px] transition-colors group">
        อะไหล่สิ้นเปลือง"""

content = content.replace(target, new_item + target)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

print("Added item back.")
