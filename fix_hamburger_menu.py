import re

def update_hamburger(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The current block is:
    # <!-- Hamburger + Logo -->
    # <div class="flex items-center gap-0 shrink-0">
    #   <!-- Hamburger Icon -->
    #   <button class="text-black/90 hover:text-brand-red transition-colors flex items-center justify-center">
    #     <svg ...>
    #   </button>
    #   
    #   <!-- Logo -->
    #   <a href="/" class="hover:opacity-80 transition-opacity -ml-1">
    #     <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-12 md:h-[60px] w-auto object-contain" />
    #   </a>
    # </div>
    
    pattern = r'<!-- Hamburger \+ Logo -->.*?</a>\s*</div>'
    
    new_block = """<!-- Hamburger + Logo -->
        <div class="flex items-center gap-0 shrink-0 group static">
          <!-- Hamburger Icon (Turns to X on hover) -->
          <div class="cursor-pointer text-black/90 hover:text-brand-red transition-colors flex items-center justify-center p-2 -ml-2">
            <!-- Normal Hamburger (Hidden on hover) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- X icon (Shows on hover) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 hidden group-hover:block text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <!-- Mega Menu Dropdown (BaNANA Style but Green) -->
          <div class="hidden lg:group-hover:flex absolute top-[100%] left-1/2 -translate-x-1/2 w-full max-w-[1250px] h-[480px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-t-[3px] border-brand-green cursor-default rounded-b-md overflow-hidden z-[60]">
            
            <!-- Left Sidebar (Main Categories) -->
            <div class="w-[280px] bg-white border-r border-gray-200 overflow-y-auto no-scrollbar flex flex-col">
              <!-- Active Item (Green highlight) -->
              <a href="#" class="flex items-center justify-between px-5 py-3.5 bg-brand-green text-white font-semibold text-[14px]">
                <span class="flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px] border-b border-gray-100">
                ตู้เชื่อม/พลาสม่า
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px] border-b border-gray-100">
                กลุ่มลวดเชื่อม
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px] border-b border-gray-100">
                อุปกรณ์เชื่อม
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px] border-b border-gray-100">
                อะไหล่/วัสดุสิ้นเปลือง
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px] border-b border-gray-100">
                อุปกรณ์นิรภัยส่วนบุคคล (PPE)
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px] border-b border-gray-100">
                น้ำยาเคมี/ตรวจสอบรอยร้าว
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" class="flex items-center justify-between px-5 py-3.5 text-[#252525] hover:bg-gray-50 font-normal text-[14px]">
                แบรนด์สินค้าทั้งหมด
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>

            <!-- Right Content Area (Subcategories) -->
            <div class="flex-1 bg-white p-8 overflow-y-auto no-scrollbar">
              <!-- Section Header (Green text matching UDO brand) -->
              <h2 class="text-brand-green font-semibold text-[16px] mb-8 flex items-center gap-2 border-b border-gray-100 pb-4">
                🔥 โปรโมชั่นพิเศษ ทั้งหมด
              </h2>
              
              <!-- Grid 4 Columns -->
              <div class="grid grid-cols-4 gap-x-8 gap-y-10">
                
                <!-- Block 1 -->
                <div>
                  <h3 class="text-[#252525] font-bold text-[14px] mb-4">โปรโมชั่นลวดเชื่อม</h3>
                  <ul class="space-y-3 text-[13.5px] text-gray-600 font-normal">
                    <li><a href="#" class="hover:text-brand-red transition-colors">ลดล้างสต็อก ลวดเชื่อม KOBE</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">ซื้อ 10 ลัง แถม 1 ลัง</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมสแตนเลส ลด 15%</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">โปรโมชั่นลวดฟลักซ์คอร์ส</a></li>
                  </ul>
                </div>

                <!-- Block 2 -->
                <div>
                  <h3 class="text-[#252525] font-bold text-[14px] mb-4">โปรโมชั่นตู้เชื่อม</h3>
                  <ul class="space-y-3 text-[13.5px] text-gray-600 font-normal">
                    <li><a href="#" class="hover:text-brand-red transition-colors">ตู้เชื่อม JASIC ลดสูงสุด 20%</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">แถมฟรี สายเชื่อม 10 เมตร</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">ผ่อน 0% นาน 10 เดือน</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">ตู้พลาสม่า คุ้มสุดๆ</a></li>
                  </ul>
                </div>

                <!-- Block 3 -->
                <div>
                  <h3 class="text-[#252525] font-bold text-[14px] mb-4">อุปกรณ์เซฟตี้</h3>
                  <ul class="space-y-3 text-[13.5px] text-gray-600 font-normal">
                    <li><a href="#" class="hover:text-brand-red transition-colors">หน้ากากเชื่อมปรับแสงอัตโนมัติ</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">ถุงมือหนังเชื่อม 1 แถม 1</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">เอี๊ยมหนังกันสะเก็ดไฟ</a></li>
                  </ul>
                </div>

                <!-- Block 4 -->
                <div>
                  <h3 class="text-[#252525] font-bold text-[14px] mb-4">แบรนด์ยอดฮิต</h3>
                  <ul class="space-y-3 text-[13.5px] text-gray-600 font-normal">
                    <li><a href="#" class="hover:text-brand-red transition-colors">KOBE</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">JASIC</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">YAWATA</a></li>
                    <li><a href="#" class="hover:text-brand-red transition-colors">LINCOLN</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Logo (Restoring size 50px/64px) -->
          <a href="/" class="hover:opacity-80 transition-opacity ml-1">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[50px] md:h-[64px] w-auto object-contain" />
          </a>
        </div>"""

    content = re.sub(pattern, new_block, content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)

update_hamburger('/Users/aliceer/UDO/frontend/src/main.js')
update_hamburger('/Users/aliceer/UDO/frontend/src/product.js')

print("Injected hamburger mega menu.")
