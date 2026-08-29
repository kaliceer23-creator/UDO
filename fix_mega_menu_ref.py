import re

mega_menu_html = """
          <!-- Mega Menu Dropdown (BaNANA Exact Style) -->
          <div class="hidden lg:group-hover:flex absolute top-[100%] left-0 w-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t-[1px] border-gray-100 cursor-default z-[60]">
            <!-- Centered Content Wrapper (1250px) -->
            <div class="w-full max-w-[1250px] mx-auto flex h-[480px]">
              
              <!-- Left Sidebar (Main Categories) -->
              <div class="w-[280px] bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar py-6 pr-4 pl-4 md:pl-8 lg:pl-12">
                <!-- Active Item (Green rounded rectangle) -->
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 bg-brand-green text-white font-semibold text-[14px] rounded-lg">
                  <span class="flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                
                <!-- Normal Items (No border, plain text, rounded hover effect) -->
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[14px] rounded-lg transition-colors">
                  ตู้เชื่อม/พลาสม่า
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[14px] rounded-lg transition-colors">
                  กลุ่มลวดเชื่อม
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[14px] rounded-lg transition-colors">
                  อุปกรณ์เชื่อม
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[14px] rounded-lg transition-colors">
                  อะไหล่/วัสดุสิ้นเปลือง
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[14px] rounded-lg transition-colors">
                  อุปกรณ์นิรภัยส่วนบุคคล (PPE)
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[14px] rounded-lg transition-colors">
                  น้ำยาเคมี/ตรวจสอบรอยร้าว
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>

              <!-- Right Content Area (Subcategories) -->
              <div class="flex-1 bg-white pl-10 pr-4 md:pr-8 lg:pr-12 py-8 overflow-y-auto custom-scrollbar">
                <!-- Section Header (Green text) -->
                <h2 class="text-brand-green font-semibold text-[16px] mb-8 flex items-center gap-2">
                  🔥 โปรโมชั่นพิเศษ ทั้งหมด
                </h2>
                
                <!-- Grid 3 Columns -->
                <div class="grid grid-cols-3 gap-x-12">
                  
                  <!-- Column 1 -->
                  <div class="flex flex-col">
                    <div class="border-b border-gray-200 pb-5 mb-5">
                      <h3 class="text-[#252525] font-bold text-[14px] mb-3">โปรโมชั่นลวดเชื่อม</h3>
                      <ul class="space-y-2.5 text-[13.5px] text-gray-600 font-normal">
                        <li><a href="#" class="hover:text-brand-red transition-colors">ลดล้างสต็อก ลวดเชื่อม KOBE</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">ซื้อ 10 ลัง แถม 1 ลัง</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมสแตนเลส ลด 15%</a></li>
                      </ul>
                    </div>
                    <div class="border-b border-gray-200 pb-5 mb-5">
                      <h3 class="text-[#252525] font-bold text-[14px] mb-3">ลวดเชื่อมลดราคา</h3>
                      <ul class="space-y-2.5 text-[13.5px] text-gray-600 font-normal">
                        <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมอลูมิเนียม</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมเหล็กหล่อ</a></li>
                      </ul>
                    </div>
                  </div>

                  <!-- Column 2 -->
                  <div class="flex flex-col">
                    <div class="border-b border-gray-200 pb-5 mb-5">
                      <h3 class="text-[#252525] font-bold text-[14px] mb-3">โปรโมชั่นตู้เชื่อม</h3>
                      <ul class="space-y-2.5 text-[13.5px] text-gray-600 font-normal">
                        <li><a href="#" class="hover:text-brand-red transition-colors">ตู้เชื่อม JASIC ลดสูงสุด 20%</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">แถมฟรี สายเชื่อม 10 เมตร</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">ผ่อน 0% นาน 10 เดือน</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">ตู้พลาสม่า คุ้มสุดๆ</a></li>
                      </ul>
                    </div>
                    <div class="border-b border-gray-200 pb-5 mb-5">
                      <h3 class="text-[#252525] font-bold text-[14px] mb-3">แบรนด์ยอดฮิต</h3>
                      <ul class="space-y-2.5 text-[13.5px] text-gray-600 font-normal">
                        <li><a href="#" class="hover:text-brand-red transition-colors">KOBE</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">JASIC</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">YAWATA</a></li>
                      </ul>
                    </div>
                  </div>

                  <!-- Column 3 -->
                  <div class="flex flex-col">
                    <div class="border-b border-gray-200 pb-5 mb-5">
                      <h3 class="text-[#252525] font-bold text-[14px] mb-3">อุปกรณ์เซฟตี้</h3>
                      <ul class="space-y-2.5 text-[13.5px] text-gray-600 font-normal">
                        <li><a href="#" class="hover:text-brand-red transition-colors">หน้ากากเชื่อมปรับแสงอัตโนมัติ</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">ถุงมือหนังเชื่อม 1 แถม 1</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">เอี๊ยมหนังกันสะเก็ดไฟ</a></li>
                      </ul>
                    </div>
                    <div class="pb-5 mb-5">
                      <h3 class="text-[#252525] font-bold text-[14px] mb-3">สินค้าอื่นๆ</h3>
                      <ul class="space-y-2.5 text-[13.5px] text-gray-600 font-normal">
                        <li><a href="#" class="hover:text-brand-red transition-colors">อะไหล่หัวเชื่อม</a></li>
                        <li><a href="#" class="hover:text-brand-red transition-colors">เกจ์ลม เกจ์แก๊ส</a></li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>"""

def update_menu(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The current block we want to replace is the mega menu we just added in the previous turn.
    # WAIT! The previous turn was WIPPED OUT by the user's `git reset`!!
    # The current code in main.js is from commit d708469 ! There is NO mega menu currently in main.js !!
    # I need to match the original Hamburger + Logo block from d708469 and replace it.
    pass

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    c = f.read()
    if "Mega Menu Dropdown (BaNANA Style but Green)" in c:
        print("Wait, the old mega menu is still there?!")
    else:
        print("Old mega menu not there. Need to replace original hamburger block.")

