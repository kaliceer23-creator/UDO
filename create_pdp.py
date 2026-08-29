import os

# Create product.html
product_html = """<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>เครื่องเล่นเกม Nintendo Switch 2 - UDO</title>
    <!-- Prompt Font for Windows fallback -->
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/product.js"></script>
  </body>
</html>
"""
with open('/Users/aliceer/UDO/frontend/product.html', 'w') as f:
    f.write(product_html)


# Extract header, footer, sticky from main.js
with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    lines = f.readlines()

header_lines = lines[28:101] # 29 to 101 in 1-based is 28 to 101 in 0-based
footer_lines = lines[1610:1766] # 1611 to 1766
sticky_lines = lines[1767:] # 1768 onwards

# Build the PDP content
pdp_content = """
    <!-- Breadcrumb -->
    <div class="bg-[#e9e9e9] border-b border-gray-200">
      <div class="max-w-[1300px] mx-auto px-4 md:px-8 py-3 text-[13px] text-gray-700 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <a href="/" class="hover:text-[#8ac353]">หน้าหลัก</a>
        <span class="text-gray-400">&gt;</span>
        <a href="#" class="hover:text-[#8ac353]">เกม & สตรีมมิ่งและอุปกรณ์เสริม</a>
        <span class="text-gray-400">&gt;</span>
        <a href="#" class="hover:text-[#8ac353]">เครื่องเล่นเกมคอนโซล</a>
        <span class="text-gray-400">&gt;</span>
        <a href="#" class="hover:text-[#8ac353]">Nintendo Switch</a>
        <span class="text-gray-400">&gt;</span>
        <span class="text-gray-900 font-medium">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</span>
      </div>
    </div>

    <main class="bg-[#e9e9e9] min-h-screen pb-24 pt-6">
      <div class="max-w-[1300px] mx-auto px-4 md:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- LEFT COLUMN: Images -->
          <div class="lg:col-span-5">
            <!-- Main Image Box -->
            <div class="bg-white rounded-[24px] border-[6px] border-[#c92020] relative overflow-hidden flex flex-col shadow-sm">
              <div class="relative w-full aspect-square flex items-center justify-center p-8 bg-[#f5f5f5]">
                <img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-contain">
                
                <!-- Arrows -->
                <button class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white flex items-center justify-center rounded transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white flex items-center justify-center rounded transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              
              <!-- Best Seller Ribbon -->
              <div class="bg-[#c92020] text-white py-2.5 text-center text-[22px] font-bold flex items-center justify-center gap-2">
                <span class="text-3xl">👑</span> ขายดีประจำเดือน
              </div>
            </div>

            <!-- Thumbnails -->
            <div class="grid grid-cols-5 gap-2 mt-4">
              <div class="aspect-square bg-white border-2 border-yellow-400 rounded-lg overflow-hidden cursor-pointer p-1"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 p-1"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 p-1"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 p-1"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 p-1"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Details -->
          <div class="lg:col-span-7">
            <!-- Title -->
            <h1 class="text-[26px] md:text-[32px] font-semibold text-gray-900 leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>
            
            <div class="text-[14px] text-gray-600 mb-6 flex items-center gap-4">
              <span>แบรนด์: <a href="#" class="text-gray-900 font-medium hover:underline">NINTENDO</a></span>
              <span class="text-gray-300">|</span>
              <span>SKU: 4902370553451</span>
            </div>

            <!-- Pricing -->
            <div class="flex items-end gap-3 mb-2">
              <div class="text-[36px] md:text-[42px] font-bold text-[#c92020] leading-none">฿18,412</div>
              <div class="text-[18px] text-gray-500 line-through mb-1">฿18,000</div>
              <div class="text-[#c92020] text-[13px] border border-[#c92020] rounded px-2 py-0.5 mb-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                ราคาหลังหักส่วนลด
              </div>
            </div>

            <!-- Warranty -->
            <div class="flex items-center gap-2 text-[14px] text-gray-700 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              รับประกัน 1 ปี 6 เดือน
            </div>

            <!-- Installment & Gifts Badge -->
            <div class="flex items-center gap-4 mb-8">
              <div class="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-200 transition-colors">
                <div class="bg-yellow-400 text-[#003399] font-bold text-[12px] px-2 py-0.5 rounded flex items-center justify-center">ผ่อนสบาย<br>0%</div>
                <span class="text-[13px] text-gray-700">ดูเพิ่มเติม</span>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-200 transition-colors">
                <div class="bg-yellow-400 text-gray-900 font-bold text-[12px] px-2 py-0.5 rounded flex items-center justify-center">ของ<br>แถม</div>
                <span class="text-[13px] text-gray-700">ดูเพิ่มเติม</span>
              </div>
            </div>

            <!-- Coupons Section -->
            <div class="mb-8">
              <div class="flex items-center gap-2 text-[15px] font-semibold text-gray-900 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                คูปองส่วนลด
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <!-- Coupon 1 -->
                <div class="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 w-full sm:w-[320px] relative">
                  <div class="bg-[#2a2a2a] text-yellow-400 w-[70px] flex items-center justify-center font-bold text-[14px] shrink-0 border-r border-dashed border-gray-400 relative">
                    ของแถม
                    <!-- Dotted cutouts -->
                    <div class="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#e9e9e9] rounded-full"></div>
                    <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#e9e9e9] rounded-full"></div>
                  </div>
                  <div class="flex-1 p-3 flex flex-col justify-center bg-gray-50/50">
                    <div class="text-[#b78a3c] font-bold text-[15px] leading-tight">BBBNBFBPF</div>
                    <div class="text-[11px] text-gray-600 mb-1">รับฟรี! ของแถมพิเศษ</div>
                    <div class="text-[11px] text-gray-500">หมด: 31 ธ.ค. 2569, ...</div>
                  </div>
                  <div class="flex items-center justify-center p-3">
                    <button class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-[12px] font-bold px-3 py-1.5 rounded transition-colors">เก็บโค้ด</button>
                  </div>
                </div>

                <!-- Coupon 2 -->
                <div class="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 w-full sm:w-[320px] relative">
                  <div class="bg-[#2a2a2a] text-yellow-400 w-[70px] flex items-center justify-center font-bold text-[14px] shrink-0 border-r border-dashed border-gray-400 relative">
                    ของแถม
                    <!-- Dotted cutouts -->
                    <div class="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#e9e9e9] rounded-full"></div>
                    <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#e9e9e9] rounded-full"></div>
                  </div>
                  <div class="flex-1 p-3 flex flex-col justify-center bg-gray-50/50">
                    <div class="text-[#b78a3c] font-bold text-[15px] leading-tight">BB8NBFBC</div>
                    <div class="text-[11px] text-gray-600 mb-1">รับฟรี! ของแถมพิเศษ</div>
                    <div class="text-[11px] text-gray-500">หมด: 31 ธ.ค. 2569, ...</div>
                  </div>
                  <div class="flex items-center justify-center p-3">
                    <button class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-[12px] font-bold px-3 py-1.5 rounded transition-colors">เก็บโค้ด</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Must Have Accessories (Cross-selling) -->
            <div class="bg-gray-50/80 border border-yellow-400 rounded-xl p-4 mb-8">
              <div class="flex items-center gap-2 mb-3">
                <input type="checkbox" class="w-4 h-4 text-[#8ac353] rounded border-gray-300 focus:ring-[#8ac353]" checked>
                <span class="font-bold text-gray-900 text-[15px]">สินค้าต้องมี</span>
              </div>
              <div class="border-t border-gray-200 pt-3 flex items-start gap-4">
                <div class="w-16 h-12 bg-white rounded border border-gray-200 p-1 flex items-center justify-center shrink-0">
                  <img src="/images/bg-welding.jpeg" class="max-w-full max-h-full object-contain">
                </div>
                <div>
                  <div class="text-[14px] text-gray-800 mb-1 leading-tight">เคส Nintendo Switch 2 Carrying Case & Screen Protector</div>
                  <div class="font-bold text-[16px]">฿990</div>
                </div>
              </div>
            </div>

            <!-- Free Gifts -->
            <div>
              <div class="flex items-center gap-2 text-[15px] font-semibold text-gray-900 mb-1">
                <span class="text-xl">🎁</span> ของแถม
              </div>
              <div class="text-[12px] text-gray-500 mb-3">ขอสงวนสิทธิ์ในการเปลี่ยนแปลงของแถมโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</div>
              
              <div class="bg-gray-200 rounded-xl overflow-hidden max-w-md">
                <div class="bg-[#d29b22] text-gray-900 font-bold text-[13px] px-4 py-2 flex justify-between items-center">
                  ฟรี! ของแถมพิเศษ
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div class="p-4 grid grid-cols-3 gap-3">
                  <div class="bg-white/80 rounded border border-gray-300 p-2 flex flex-col items-center">
                    <div class="w-10 h-10 mb-2"><img src="/images/bg-welding.jpeg" class="w-full h-full object-contain"></div>
                    <div class="text-[#c92020] text-[11px] font-bold text-center">สินค้าหมด</div>
                  </div>
                  <div class="bg-white/80 rounded border border-gray-300 p-2 flex flex-col items-center">
                    <div class="w-10 h-10 mb-2"><img src="/images/bg-welding.jpeg" class="w-full h-full object-contain"></div>
                    <div class="text-[#c92020] text-[11px] font-bold text-center">฿490</div>
                  </div>
                  <div class="bg-white/80 rounded border border-gray-300 p-2 flex flex-col items-center">
                    <div class="w-10 h-10 mb-2"><img src="/images/bg-welding.jpeg" class="w-full h-full object-contain"></div>
                    <div class="text-[#c92020] text-[11px] font-bold text-center">สินค้าหมด</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
"""

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write("import './style.css'\n\n")
    f.write("document.querySelector('#app').innerHTML = `\n")
    f.write("".join(header_lines))
    f.write(pdp_content)
    f.write("".join(footer_lines))
    f.write("".join(sticky_lines))
    f.write("\n`;\n")

print("Created product.html and src/product.js successfully.")
