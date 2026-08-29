import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_desc = """            <p class="text-[16px] text-[#252525] mb-8 leading-[1.6]">
              <span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2
            </p>

            <hr class="border-black/5 mb-8" />

            <!-- Capacity / บรรจุ -->"""

new_desc = """            <p class="text-[16px] text-[#252525] mb-6 leading-[1.6]">
              <span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2
            </p>

            <!-- Capacity / บรรจุ -->"""

content = content.replace(old_desc, new_desc)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Removed separator line and reverted spacing.")
