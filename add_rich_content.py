import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

rich_content_html = """
      <!-- Rich Content (A+ Content) Section -->
      <div class="w-full bg-white py-16 border-b border-gray-200">
        <div class="max-w-[900px] mx-auto px-4 text-center">
          
          <!-- Headline -->
          <h3 class="text-[24px] md:text-[28px] font-bold text-[#252525] mb-8">
            เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle (TH)
          </h3>
          
          <!-- Image 1 -->
          <div class="w-full rounded-xl overflow-hidden mb-12 shadow-sm border border-gray-100">
            <!-- Using existing placeholder image -->
            <img src="/images/bg-welding.jpeg" alt="Product Detail 1" class="w-full h-auto object-cover aspect-[2/1]">
          </div>
          
          <!-- Image 2 -->
          <div class="w-full rounded-xl overflow-hidden mb-12 shadow-sm border border-gray-100">
            <img src="/images/bg-welding.jpeg" alt="Product Detail 2" class="w-full h-auto object-cover aspect-[2/1]">
          </div>
          
          <!-- Feature Text Block -->
          <div class="mb-12">
            <h4 class="text-[20px] md:text-[22px] font-bold text-[#252525] mb-4">เมื่อเป็น 2 ทุกอย่างก็ใหม่หมด</h4>
            <p class="text-[16px] text-[#252525] leading-relaxed max-w-[800px] mx-auto">
              New Nintendo Switch พัฒนาขึ้นอีกขั้นเป็น "2" หน้าจอใหญ่ขึ้น สีสันสดใส และลื่นไหล Joy-Con รุ่นใหม่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก และใช้เป็นเมาส์ได้ สนุกไปกับเกมใหม่ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2 รวมถึงเล่นเกม Nintendo Switch ได้ด้วย
            </p>
          </div>
          
          <!-- Image 3 -->
          <div class="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/bg-welding.jpeg" alt="Product Detail 3" class="w-full h-auto object-cover aspect-[2/1]">
          </div>
          
        </div>
      </div>
"""

# Insert after "<!-- End of Specs Section -->"
target_str = '<!-- End of Specs Section -->'
insert_pos = content.find(target_str) + len(target_str)

new_content = content[:insert_pos] + rich_content_html + content[insert_pos:]

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(new_content)

print("Added Rich Content section successfully.")
