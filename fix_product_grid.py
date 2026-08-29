import re

with open('/Users/aliceer/UDO/frontend/src/category.js', 'r') as f:
    content = f.read()

# We need to replace the entire Product Grid block.
# Let's find the start of the Product Grid
start_marker = '<!-- Product Grid -->'
end_marker = '<!-- Pagination Placeholder -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find grid markers.")
    exit(1)

# Card Template (based on exact main.js design system)
def create_card(title, desc, price, unit_alt, price_alt, brand_tag):
    return f"""
        <a href="/product.html" class="flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group h-full">
          <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
             <img src="/images/bg-welding.jpeg" alt="{title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
             <!-- Brand Badge -->
             <div class="absolute top-2 left-2 bg-[#252525] text-white text-[10px] md:text-[11px] font-bold px-2 py-1 rounded">
               {brand_tag}
             </div>
          </div>
          <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
            {title}
          </h3>
          <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
            {desc}
          </p>
          <div class="mt-auto flex flex-col">
            <!-- Unit Toggle -->
            <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
              <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="{price}" data-unit="ห่อ">ห่อ</button>
              <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="{price_alt}" data-unit="{unit_alt}">{unit_alt}</button>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-baseline gap-1">
                <span class="text-[#E12427] font-bold text-[18px] price-display">฿{price}</span>
                <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
              </div>
              <div class="cart-control flex justify-end" data-unit="ห่อ">
                <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </a>
"""

new_grid_html = f"""<!-- Product Grid -->
    <div class="max-w-[1250px] mx-auto px-4 md:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {create_card('ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)', 'งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม', '650', 'ลัง (4 ห่อ)', '2,500', 'KOBE')}
        {create_card('ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)', 'เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย', '315', 'ลัง (4 ห่อ)', '1,200', 'YAWATA')}
        {create_card('ลวดเชื่อมเหล็กหล่อ GEMINI Ni98 ขนาด 3.2 มม.', 'เหล็กหล่อ | เชื่อมไม่ร้าว | ทนแรงดึงสูง', '1,800', 'ลัง (4 ห่อ)', '7,000', 'GEMINI')}
        {create_card('ลวดเชื่อม TIG KOBE TG-S50 ขนาด 2.4 มม.', 'ลวดเติม TIG | สำหรับเหล็กเหนียว | รอยเชื่อมสวย', '450', 'กล่อง (5 กก.)', '2,100', 'KOBE')}
        {create_card('ลวดเชื่อมอลูมิเนียม YAWATA 4043 ขนาด 2.4 มม.', 'เชื่อมอลูมิเนียมทั่วไป | ซึมลึก | รอยเชื่อมสะอาด', '950', 'ลัง', '3,500', 'YAWATA')}
        {create_card('ลวดเชื่อมเหล็กแข็ง KOBE HF-600 ขนาด 3.2 มม.', 'พอกผิวแข็ง | ทนการเสียดสี | เหมาะกับงานซ่อมบำรุง', '850', 'ลัง', '3,200', 'KOBE')}
        {create_card('ลวดเชื่อมสเตนเลส YAWATA 309L-16 ขนาด 3.2 มม.', 'เชื่อมต่อโลหะต่างชนิด | เหล็กติดสเตนเลส', '780', 'ลัง (4 ห่อ)', '3,000', 'YAWATA')}
        {create_card('ลวดเชื่อมทังสเตน สีแดง (WT20) ขนาด 2.4 มม.', 'ทังสเตน 2% ธอเรียม | อาร์กนิ่ง | ทนกระแสสูง', '150', 'กล่อง (10 เส้น)', '1,200', 'UDO')}
      </div>
      
      """

new_content = content[:start_idx] + new_grid_html + content[end_idx:]

with open('/Users/aliceer/UDO/frontend/src/category.js', 'w') as f:
    f.write(new_content)

print("Updated product grid to exactly match main.js design system.")
