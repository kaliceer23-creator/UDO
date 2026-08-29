import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    product_content = f.read()

# Extract header
header_match = re.search(r'<div class="sticky top-0 z-\[60\] w-full">.*?</nav>\n  </div>', product_content, re.DOTALL)
header_html = header_match.group(0) if header_match else "<!-- Header Not Found -->"

# Extract footer
footer_match = re.search(r'<footer class="bg-white w-full mt-10">.*</footer>', product_content, re.DOTALL)
footer_html = footer_match.group(0) if footer_match else "<!-- Footer Not Found -->"

# Extract smart header logic
logic_match = re.search(r'// Smart Header Logic.*$', product_content, re.DOTALL)
smart_logic = logic_match.group(0) if logic_match else ""

# Generate the Smart Filter and Product Grid HTML
category_html = f"""import './style.css'

document.querySelector('#app').innerHTML = `
  <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
  <div class="w-full bg-[#F5F5F5] hidden md:block">
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-end text-[13px] text-black/90 font-medium gap-4">
      <a href="#" class="hover:text-brand-red transition-all">เกี่ยวกับเรา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">ติดต่อเรา</a>
      <span class="text-gray-400 font-light">|</span>
      
      <!-- ตัวเลือกภาษา -->
      <div class="flex items-center gap-1 cursor-pointer hover:text-brand-red group">
        <span class="font-medium text-black/90 group-hover:text-brand-red">TH</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>

  {header_html}

  <main class="w-full pb-16 min-h-[80vh]">
    <!-- Breadcrumb -->
    <div class="bg-white">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 pt-[44px] pb-6 text-[14px]">
        <div class="flex items-center gap-2 text-black/45">
          <a href="/" class="hover:text-[#76b83f] transition-colors">หน้าแรก</a>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          <a href="#" class="hover:text-[#76b83f] transition-colors">สินค้าทั้งหมด</a>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span class="text-[#252525] font-semibold">ลวดเชื่อม</span>
        </div>
      </div>
    </div>

    <!-- Title Area -->
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 mb-6">
      <h1 class="text-[28px] font-bold text-[#252525]">ลวดเชื่อม (Welding Wires)</h1>
    </div>

    <!-- Smart Filter Bar (เขียวอ่อนพาสเทล) -->
    <div class="w-full bg-[#76b83f]/10 border-y border-[#76b83f]/20 py-4 mb-4">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <!-- Filter Dropdowns (กล่องขาว) -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- กล่อง 1: วัสดุ -->
          <div class="relative group">
            <button class="bg-white border border-gray-200 text-[#252525] px-4 py-2 rounded shadow-sm text-[15px] font-medium flex items-center gap-2 hover:border-[#76b83f] transition-colors min-w-[140px] justify-between">
              วัสดุที่เชื่อม
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-[#76b83f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          
          <!-- กล่อง 2: กระบวนการเชื่อม -->
          <div class="relative group">
            <button class="bg-white border border-gray-200 text-[#252525] px-4 py-2 rounded shadow-sm text-[15px] font-medium flex items-center gap-2 hover:border-[#76b83f] transition-colors min-w-[160px] justify-between">
              กระบวนการเชื่อม
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-[#76b83f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          
          <!-- กล่อง 3: ขนาด -->
          <div class="relative group">
            <button class="bg-white border border-gray-200 text-[#252525] px-4 py-2 rounded shadow-sm text-[15px] font-medium flex items-center gap-2 hover:border-[#76b83f] transition-colors min-w-[120px] justify-between">
              ขนาดลวด
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-[#76b83f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </div>

        <!-- Sort By -->
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[14px] text-gray-600">จัดเรียง:</span>
          <button class="bg-white border border-gray-200 text-[#252525] px-4 py-2 rounded shadow-sm text-[14px] font-medium flex items-center gap-2 hover:border-gray-300 transition-colors">
            สินค้าแนะนำ
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Active Filter Pills Area -->
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 mb-8 flex flex-wrap items-center gap-2">
      <!-- Example Active Pill -->
      <span class="bg-[#76b83f] text-white text-[14px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
        เหล็กเหนียว (Mild Steel)
        <button class="hover:bg-[#65a332] rounded-full p-0.5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </span>
      <span class="bg-[#76b83f] text-white text-[14px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
        2.6 mm
        <button class="hover:bg-[#65a332] rounded-full p-0.5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </span>
      
      <button class="text-[14px] text-gray-500 hover:text-[#E12427] font-medium ml-2 underline transition-colors">
        ล้างทั้งหมด
      </button>
    </div>

    <!-- Product Grid -->
    <div class="max-w-[1250px] mx-auto px-4 md:px-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        
        <!-- Product Item 1 -->
        <a href="/product.html" class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
          <!-- Image -->
          <div class="w-full aspect-square relative bg-white p-4">
            <img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-cover rounded" />
            <!-- Badges -->
            <div class="absolute top-2 left-2 bg-[#E12427] text-white text-[10px] md:text-[12px] font-bold px-2 py-1 rounded">
              ขายดี
            </div>
          </div>
          <!-- Info -->
          <div class="p-3 md:p-4 border-t border-gray-100 flex-1 flex flex-col">
            <!-- Brand -->
            <div class="text-[12px] md:text-[13px] text-gray-500 mb-1 font-medium">KOBE</div>
            <!-- Title -->
            <h3 class="text-[#252525] text-[14px] md:text-[15px] font-semibold leading-snug mb-2 group-hover:text-[#76b83f] transition-colors line-clamp-2">
              ลวดเชื่อมเหล็กเหนียว KOBE-30 ขนาด 2.6 มม.
            </h3>
            <!-- Spacer to push price to bottom -->
            <div class="mt-auto">
              <!-- Price -->
              <div class="text-[#E12427] font-bold text-[18px] md:text-[20px] mb-1">
                ฿320 <span class="text-gray-500 text-[12px] md:text-[14px] font-normal">/ ห่อ</span>
              </div>
              <!-- Added to cart mini button -->
              <div class="flex items-center gap-1 text-[12px] text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9 (120 ขายแล้ว)
              </div>
            </div>
          </div>
        </a>

        <!-- Product Item 2 -->
        <a href="/product.html" class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
          <div class="w-full aspect-square relative bg-white p-4">
            <img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-cover rounded" />
          </div>
          <div class="p-3 md:p-4 border-t border-gray-100 flex-1 flex flex-col">
            <div class="text-[12px] md:text-[13px] text-gray-500 mb-1 font-medium">YAWATA</div>
            <h3 class="text-[#252525] text-[14px] md:text-[15px] font-semibold leading-snug mb-2 group-hover:text-[#76b83f] transition-colors line-clamp-2">
              ลวดเชื่อมสแตนเลส YAWATA 308L-16 ขนาด 2.0 มม.
            </h3>
            <div class="mt-auto">
              <div class="text-[#E12427] font-bold text-[18px] md:text-[20px] mb-1">
                ฿1,250 <span class="text-gray-500 text-[12px] md:text-[14px] font-normal">/ ลัง</span>
              </div>
            </div>
          </div>
        </a>
        
        <!-- Product Item 3 -->
        <a href="/product.html" class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
          <div class="w-full aspect-square relative bg-white p-4">
            <img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-cover rounded" />
          </div>
          <div class="p-3 md:p-4 border-t border-gray-100 flex-1 flex flex-col">
            <div class="text-[12px] md:text-[13px] text-gray-500 mb-1 font-medium">GEMINI</div>
            <h3 class="text-[#252525] text-[14px] md:text-[15px] font-semibold leading-snug mb-2 group-hover:text-[#76b83f] transition-colors line-clamp-2">
              ลวดเชื่อมเหล็กหล่อ GEMINI Ni98 ขนาด 3.2 มม.
            </h3>
            <div class="mt-auto">
              <div class="text-[#E12427] font-bold text-[18px] md:text-[20px] mb-1">
                ฿1,800 <span class="text-gray-500 text-[12px] md:text-[14px] font-normal">/ ห่อ</span>
              </div>
            </div>
          </div>
        </a>

        <!-- Product Item 4 -->
        <a href="/product.html" class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
          <div class="w-full aspect-square relative bg-white p-4">
            <img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-cover rounded" />
          </div>
          <div class="p-3 md:p-4 border-t border-gray-100 flex-1 flex flex-col">
            <div class="text-[12px] md:text-[13px] text-gray-500 mb-1 font-medium">KOBE</div>
            <h3 class="text-[#252525] text-[14px] md:text-[15px] font-semibold leading-snug mb-2 group-hover:text-[#76b83f] transition-colors line-clamp-2">
              ลวดเชื่อมเหล็กเหนียว KOBE-30 ขนาด 3.2 มม.
            </h3>
            <div class="mt-auto">
              <div class="text-[#E12427] font-bold text-[18px] md:text-[20px] mb-1">
                ฿315 <span class="text-gray-500 text-[12px] md:text-[14px] font-normal">/ ห่อ</span>
              </div>
            </div>
          </div>
        </a>

      </div>
      
      <!-- Pagination Placeholder -->
      <div class="flex items-center justify-center gap-2 mt-12">
        <button class="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button class="w-10 h-10 rounded bg-[#76b83f] text-white font-medium flex items-center justify-center shadow-sm">1</button>
        <button class="w-10 h-10 rounded border border-gray-200 text-[#252525] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">2</button>
        <button class="w-10 h-10 rounded border border-gray-200 text-[#252525] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">3</button>
        <span class="text-gray-400 px-1">...</span>
        <button class="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </main>

  {footer_html}
`;

{smart_logic}
"""

with open('/Users/aliceer/UDO/frontend/src/category.js', 'w') as f:
    f.write(category_html)

print("Generated category.js successfully.")
