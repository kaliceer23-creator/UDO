import './style.css'

document.querySelector('#app').innerHTML = `
    
  <!-- Mega Menu Overlay -->
  <div id="mega-menu-overlay" class="hidden fixed inset-0 bg-black/30 z-[40] cursor-pointer"></div>
  
  <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
  <div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-end text-[12px] text-black/90 font-medium gap-4">
      <a href="#" class="hover:text-brand-red transition-all">เกี่ยวกับเรา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">ติดต่อเรา</a>
      <span class="text-gray-400 font-light">|</span>
      
      <!-- ตัวเลือกภาษา (Language Switcher) -->
      <div class="flex items-center gap-1 cursor-pointer hover:text-brand-red group">
        <span class="font-medium text-black/90 group-hover:text-brand-red">TH</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>

  <div class="sticky top-0 z-[60] w-full">
    <!-- 1. แถบสีขาวด้านบน (Main Header) -->
    <header class="w-full bg-white border-b border-black/5 relative z-[55]">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 py-2.5 md:py-3.5 lg:py-4 flex items-center gap-6">
        
        <!-- Logo -->
        <div class="flex items-center shrink-0">
          <a href="/" class="hover:opacity-80 transition-opacity">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain" />
          </a>
        </div>
        
        <!-- Search Bar Area (Clean Thin Border, No Shadow, Refined Small Red AI Mode Button) -->
        <div class="hidden md:flex flex-1 max-w-[680px] lg:max-w-[800px] xl:max-w-[860px] items-center mx-4 lg:mx-8 bg-white rounded-2xl h-[48px] md:h-[50px] lg:h-[52px] pl-5 pr-4 border border-gray-200 focus-within:border-brand-red transition-all duration-200 relative">
          
          <!-- Search Input Container with Animated Placeholder -->
          <div class="flex-1 mr-3 flex items-center h-full relative">
            <span id="animatedPlaceholder" class="absolute left-0 text-[15px] md:text-[16px] text-[#373737] font-normal pointer-events-none transition-opacity duration-300 select-none">
              อุปกรณ์เสริม
            </span>
            <input 
              id="searchInput"
              type="text" 
              class="w-full bg-transparent text-[15px] md:text-[16px] text-gray-900 font-medium outline-none focus:outline-none border-none focus:border-none focus:ring-0 h-full relative z-10"
            />
          </div>
          
          <!-- Refined Small Red AI Button (Ultra Compact Pill) -->
          <button class="bg-brand-red hover:bg-[#c91d20] text-white px-3 md:px-3.5 py-0.5 h-[26px] md:h-[28px] rounded-full flex items-center justify-center gap-1 transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98]">
            <!-- Fine Stroke AI Sparkles Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z"/>
            </svg>
            <span class="font-medium text-[11.5px] md:text-[12px] tracking-tight">โหมด AI</span>
          </button>
          
        </div>

        <!-- Right Side Actions -->
        <div class="shrink-0 flex items-center justify-end text-[16px] text-black/90 font-medium gap-5 lg:gap-6">
          
          <!-- Login -->
          <a href="#" class="hidden lg:flex items-center gap-2 hover:text-brand-red cursor-pointer transition-colors text-black/90">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span class="font-medium text-[16px]">เข้าสู่ระบบ</span>
          </a>

          <!-- Divider -->
          <div class="w-[1px] h-[24px] bg-gray-200 hidden lg:block"></div>

          <!-- Cart -->
          <a href="#" class="text-black/90 hover:text-brand-red transition-colors flex items-center relative pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <!-- Badge (Optional, you can remove if not needed, but standard for carts) -->
            <span class="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white leading-none">0</span>
          </a>

        </div>
      </div>
    </header>

  <!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->
  <nav class="w-full bg-brand-green h-[38px] md:h-[44px] relative z-50 overflow-x-auto lg:overflow-visible no-scrollbar">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 relative h-full flex items-center justify-between gap-4 lg:gap-6 whitespace-nowrap text-[13.5px] md:text-[14px]">
      
      <!-- ปุ่มเลือกตามหมวดหมู่ (App Launcher 4 Squares Grid Icon) -->
      <div id="category-menu-btn" class="h-full flex items-center gap-2 text-white font-semibold text-[13.5px] md:text-[14px] cursor-pointer hover:bg-white/15 px-3 md:px-4 -ml-3 md:-ml-4 rounded-md transition-all shrink-0 select-none group">
        <!-- 4-Square App Grid Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[17px] h-[17px] text-white transition-transform duration-200 group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
        </svg>
        <span>เลือกตามหมวดหมู่</span>
        <svg id="category-menu-arrow" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white/80 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <!-- หมวดหมู่พิเศษ (โปรโมชั่น - ไม่มีกรอบขาวแล้ว) -->
      <a href="#" class="flex items-center gap-1.5 text-white hover:text-gray-200 font-medium transition-colors text-[13.5px] md:text-[14px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
        </svg>
        โปรโมชั่นฮอต
      </a>

      <!-- หมวดหมู่สินค้าหลัก (ปรับตามโครงสร้างสินค้าจริงของ UDO) -->
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        ตู้เชื่อม/พลาสม่า
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      <!-- เมนู กลุ่มลวดเชื่อม (พร้อม Mega Menu Dropdown) -->
      <div class="h-full flex items-center group cursor-pointer static">
        <a href="#" class="relative text-white group-hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors h-full flex items-center">
          กลุ่มลวดเชื่อม
          <!-- สามเหลี่ยมชี้ขึ้น (สีแดงแบรนด์) -->
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity z-10"></span>
        </a>
        
        <!-- Mega Menu (ซ่อนอยู่ จะโชว์ตอน Hover) - จำกัดขนาดให้อยู่ในกรอบแบบ Power Buy -->
        <div class="hidden lg:group-hover:block absolute top-full left-4 md:left-8 lg:left-12 right-4 md:right-8 lg:right-12 bg-white shadow-2xl border-t-[3px] border-brand-red cursor-default rounded-b-md">
          <div class="p-10 grid grid-cols-4 gap-10 text-left whitespace-normal">
            
            <!-- Column 1 -->
            <div class="space-y-8">
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมเหล็ก</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซับเมอร์ค (SAW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแก๊ส (Brazing)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมสแตนเลส</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซับเมอร์ค (SAW)</a></li>
                </ul>
              </div>
            </div>

            <!-- Column 2 -->
            <div class="space-y-8">
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมอลูมิเนียม</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแก๊ส (Brazing)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมเหล็กหล่อ</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                </ul>
              </div>
            </div>

            <!-- Column 3 -->
            <div class="space-y-8">
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมวัสดุเกรดพิเศษ</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซับเมอร์ค (SAW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแม่พิมพ์</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมพอกผิวแข็ง</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                </ul>
              </div>
            </div>

            <!-- Column 4 -->
            <div class="space-y-8">
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมทองเหลืองทองแดงและเงิน</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแก๊ส (Brazing)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมตัดเจาะร่อง</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-semibold mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-semibold text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมทังสเตน</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        ใบตัด/ใบเจียร
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        อุปกรณ์เชื่อมตัดแก๊ส
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        ท่อบรรจุก๊าซและวาล์ว
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        อะไหล่สิ้นเปลือง
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        เครื่องมือช่าง
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>

    </div>
  </nav>

  <!-- Mega Menu Dropdown (BaNANA Exact Style) -->
  <div id="desktop-mega-menu" class="hidden absolute top-[100%] left-0 w-screen bg-white border-t border-gray-100 shadow-2xl cursor-default z-[60]">
    <!-- Centered Content Wrapper (1360px) -->
    <div class="w-full max-w-[1360px] mx-auto flex h-[480px]">
      
      <!-- Left Sidebar (Main Categories) -->
      <div class="w-[280px] bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar py-6 pr-4 pl-4 md:pl-8 lg:pl-12">
        <!-- Active Item (Green rounded rectangle) -->
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 bg-brand-green text-white font-semibold text-[16px] rounded-lg">
          <span class="flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        
        <!-- Normal Items (No border, plain text, rounded hover effect) -->
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          ตู้เชื่อม/พลาสม่า
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          กลุ่มลวดเชื่อม
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          อุปกรณ์เชื่อม
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          อะไหล่/วัสดุสิ้นเปลือง
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          อุปกรณ์นิรภัยส่วนบุคคล (PPE)
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          น้ำยาเคมี/ตรวจสอบรอยร้าว
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-gray-100 font-normal text-[16px] rounded-lg transition-colors">
          แบรนด์สินค้าทั้งหมด
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
            <div class="border-b border-gray-200 pb-7 mb-7">
              <h3 class="text-[#252525] font-semibold text-[16px] mb-3">โปรโมชั่นลวดเชื่อม</h3>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">ลดล้างสต็อก ลวดเชื่อม KOBE</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ซื้อ 10 ลัง แถม 1 ลัง</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมสแตนเลส ลด 15%</a></li>
              </ul>
            </div>
            <div class="border-b border-gray-200 pb-7 mb-7">
              <h3 class="text-[#252525] font-semibold text-[16px] mb-3">ลวดเชื่อมลดราคา</h3>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมอลูมิเนียม</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมเหล็กหล่อ</a></li>
              </ul>
            </div>
          </div>

          <!-- Column 2 -->
          <div class="flex flex-col">
            <div class="border-b border-gray-200 pb-7 mb-7">
              <h3 class="text-[#252525] font-semibold text-[16px] mb-3">โปรโมชั่นตู้เชื่อม</h3>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">ตู้เชื่อม JASIC ลดสูงสุด 20%</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">แถมฟรี สายเชื่อม 10 เมตร</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ผ่อน 0% นาน 10 เดือน</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ตู้พลาสม่า คุ้มสุดๆ</a></li>
              </ul>
            </div>
            <div class="border-b border-gray-200 pb-7 mb-7">
              <h3 class="text-[#252525] font-semibold text-[16px] mb-3">แบรนด์ยอดฮิต</h3>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">KOBE</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">JASIC</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">YAWATA</a></li>
              </ul>
            </div>
          </div>

          <!-- Column 3 -->
          <div class="flex flex-col">
            <div class="border-b border-gray-200 pb-7 mb-7">
              <h3 class="text-[#252525] font-semibold text-[16px] mb-3">อุปกรณ์เซฟตี้</h3>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">หน้ากากเชื่อมปรับแสงอัตโนมัติ</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ถุงมือหนังเชื่อม 1 แถม 1</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">เอี๊ยมหนังกันสะเก็ดไฟ</a></li>
              </ul>
            </div>
            <div class="pb-7 mb-7">
              <h3 class="text-[#252525] font-semibold text-[16px] mb-3">สินค้าอื่นๆ</h3>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">อะไหล่หัวเชื่อม</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">เกจ์ลม เกจ์แก๊ส</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
  <!-- Breadcrumb -->
    <div class="bg-white">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap border-b border-black/10">
        <a href="/" class="hover:text-[#8ac353]">หน้าหลัก</a>
        <span class="text-gray-400">&gt;</span>
        <a href="#" class="hover:text-[#8ac353]">เกม & สตรีมมิ่งและอุปกรณ์เสริม</a>
        <span class="text-gray-400">&gt;</span>
        <a href="#" class="hover:text-[#8ac353]">เครื่องเล่นเกมคอนโซล</a>
        <span class="text-gray-400">&gt;</span>
        <a href="#" class="hover:text-[#8ac353]">Nintendo Switch</a>
        <span class="text-gray-400">&gt;</span>
        <span class="text-[#252525]">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</span>
      </div>
    </div>

    <main class="bg-white min-h-screen pb-24 pt-[44px]">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8">
        
        <div class="flex flex-col lg:flex-row justify-between gap-10">
          
          <!-- LEFT COLUMN: Images -->
          <div class="w-full lg:w-[40%]">
            <!-- Main Image Box -->
            <div class="bg-white rounded-[24px] relative overflow-hidden flex flex-col shadow-sm">
              <div class="relative w-full aspect-square flex items-center justify-center p-8 bg-[#f5f5f5] group">
                <img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-contain">
                
                <!-- Arrows (Matching Home Page Slider) -->
                <button class="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button class="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              
              </div>

            <!-- Thumbnails -->
            <div class="grid grid-cols-5 gap-2 mt-4">
              <div class="aspect-square bg-white border-2 border-[#71C04C] rounded-lg overflow-hidden cursor-pointer"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Details -->
          <div class="w-full lg:w-[49%]">
            <!-- Top Row: Brand & Call -->
            <div class="mb-3 flex items-center justify-between">
              <!-- Left: Brand & SKU -->
              <div class="flex items-center gap-3">
                <a href="#" class="inline-block bg-[#333333] hover:bg-black text-white text-[12px] md:text-[13px] font-medium px-3 py-1 rounded-[3px] tracking-wide transition-colors uppercase">NINTENDO</a>
                <span class="text-[13px] text-gray-400 hidden sm:inline-block">SKU: 4902370553451</span>
              </div>
              
              <!-- Right: Call Button -->
              <a href="tel:021234567" class="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#71C04C] text-[#71C04C] hover:bg-[#71C04C] hover:text-white rounded-[4px] text-[12px] md:text-[13px] font-medium transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                โทรสอบถาม
              </a>
            </div>

            <!-- Title -->
            <h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-[1.3] mb-6">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>

            <!-- Pricing -->
            <div class="flex items-end gap-3 mb-5">
              <div class="flex items-baseline gap-1.5">
                <div class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>
                <span class="text-black/45 text-[15px] font-medium">/ห่อ</span>
              </div>
              <div class="text-[18px] text-black/45 line-through mb-1">฿18,000</div>
              <div class="text-[#E12427] text-[13px] font-medium border border-[#E12427] rounded px-2 py-0.5 mb-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                ราคาหลังหักส่วนลด
              </div>
            </div>

            <!-- Installment -->
            <div class="flex items-center gap-2 mb-6 text-[13px] text-black/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              รับประกัน 1 ปี
            </div>



            <p class="text-[16px] text-[#252525] mb-6 leading-[1.6]">
              <span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2
            </p>

            <!-- Capacity / บรรจุ -->
            <div class="mb-10">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex items-center gap-3">
                <button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>
                <button class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">ลัง (4 ห่อ)</button>
              </div>
            </div>

            <!-- Color Selection (Mockup) -->
            <div class="mb-12">
              <div class="flex items-baseline gap-4 mb-5">
                <span class="text-[16px] text-[#252525]">สี</span>
                <span class="text-[16px] font-bold text-[#252525]">ดำ</span>
              </div>
              <div class="flex items-center gap-5">
                <button class="w-[24px] h-[24px] rounded-full bg-[#1c1c1c] ring-[1.5px] ring-offset-[4px] ring-[#252525]"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#efefef] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#a9b9cc] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#beb6c8] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#aab38d] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="flex items-center gap-6 mb-12">
              <span class="text-[16px] font-medium text-[#252525]">จำนวน</span>
              <div class="flex items-center gap-4">
                <!-- Minus Button (Disabled state) -->
                <button class="flex items-center justify-center text-gray-300 hover:text-gray-400 transition-colors cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>
                </button>
                
                <!-- Number Box -->
                <div class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">
                  1
                </div>
                
                <!-- Plus Button -->
                <button class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button class="border border-[#71C04C] bg-[#71C04C]/10 hover:bg-[#71C04C]/70 hover:text-white text-[#71C04C] font-medium text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า</button>
              <button class="bg-brand-green hover:bg-[#71C04C]/70 text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>
            </div>

            <!-- Social Links -->
            <div class="flex items-center justify-between text-[16px] font-medium text-[#252525] border-t border-gray-200 pt-4">
              <button class="flex items-center gap-2 hover:text-[#E12427] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black group-hover:text-[#E12427] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                เพิ่มเป็นรายการโปรด
              </button>
              <button class="flex items-center gap-2 hover:text-[#71C04C] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black group-hover:text-[#71C04C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                แชร์
              </button>
            </div>


          </div>

        </div>
      </div>

      <!-- Sticky Tab Bar -->
      <div class="w-full bg-white mt-16">
        <div class="max-w-[1360px] mx-auto px-4 md:px-8 flex items-center gap-10 overflow-x-auto whitespace-nowrap">
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">ภาพรวม</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">คุณสมบัติ</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">รายละเอียดสินค้า</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">ชื่อสินค้า</a>
        </div>
      </div>

      <!-- Specs Section -->
      <div class="w-full bg-[#F8F8F8] py-16 border-b border-gray-200">
        <div class="max-w-[1360px] mx-auto px-4 md:px-8">
          <h2 class="text-[22px] font-bold text-[#252525] mb-6">คุณสมบัติสินค้า</h2>
          
          <div class="w-full flex flex-col text-[16px] text-[#252525]">
            <!-- Row 1 -->
            <div class="flex bg-white py-2 px-6 rounded-t-sm">
              <div class="w-[40%] md:w-[30%]">Type</div>
              <div class="w-[60%] md:w-[70%]">Nintendo Switch 2</div>
            </div>
            <!-- Row 2 -->
            <div class="flex bg-[#F8F8F8] py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Wireless technology</div>
              <div class="w-[60%] md:w-[70%]">Wireless LAN (Wi-Fi 6), Bluetooth</div>
            </div>
            <!-- Row 3 -->
            <div class="flex bg-white py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Wireless Operating Distance</div>
              <div class="w-[60%] md:w-[70%]">N/A</div>
            </div>
            <!-- Row 4 -->
            <div class="flex bg-[#F8F8F8] py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Connection Wired</div>
              <div class="w-[60%] md:w-[70%]">Audio jack 3.5mm. 4-contact stereo mini-plug (CTIA Standard)</div>
            </div>
            <!-- Row 5 -->
            <div class="flex bg-white py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Battery Type</div>
              <div class="w-[60%] md:w-[70%]">Lithium-ion / 5220mAh</div>
            </div>
            <!-- Row 6 -->
            <div class="flex bg-[#F8F8F8] py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Battery Life</div>
              <div class="w-[60%] md:w-[70%]">Approx. 2-6.5 Hours</div>
            </div>
            <!-- Row 7 -->
            <div class="flex bg-white py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Interface</div>
              <div class="w-[60%] md:w-[70%]">2x USB-C</div>
            </div>
            <!-- Row 8 -->
            <div class="flex bg-[#F8F8F8] py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Number of buttons</div>
              <div class="w-[60%] md:w-[70%]">N/A</div>
            </div>
            <!-- Row 9 -->
            <div class="flex bg-white py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Color</div>
              <div class="w-[60%] md:w-[70%]">Black</div>
            </div>
            <!-- Row 10 -->
            <div class="flex bg-[#F8F8F8] py-2 px-6">
              <div class="w-[40%] md:w-[30%]">Warranty</div>
              <div class="w-[60%] md:w-[70%]">18 Months</div>
            </div>
            <!-- Row 11 -->
            <div class="flex bg-white py-2 px-6 rounded-b-sm">
              <div class="w-[40%] md:w-[30%]">Option</div>
              <div class="w-[60%] md:w-[70%]">Mario Kart World Bundle</div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Specs Section -->
      <!-- Rich Content (A+ Content) Section -->
      <div class="w-full bg-white pt-16 pb-0 relative">
        <div id="rich-content-container" class="max-w-[900px] mx-auto px-4 text-center relative overflow-hidden transition-[max-height] duration-500 ease-in-out max-h-[500px]">
          
          <!-- Headline -->
          <h3 class="text-[24px] font-semibold text-[#252525] mb-8">
            เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle (TH)
          </h3>
          
          <!-- Image 1 -->
          <div class="w-full rounded-xl overflow-hidden mb-12 shadow-sm border border-gray-100">
            <!-- Using existing placeholder image -->
            <img src="/images/bg-welding.jpeg" alt="Product Detail 1" class="w-full h-auto object-cover aspect-[2/1]">
          </div>
          
          <!-- Image 2 -->
          <div class="w-full rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
            <img src="/images/bg-welding.jpeg" alt="Product Detail 2" class="w-full h-auto object-cover aspect-[2/1]">
          </div>
          
          <!-- Feature Text Block -->
          <div class="mb-8">
            <h4 class="text-[19px] font-semibold text-[#252525] mb-4">เมื่อเป็น 2 ทุกอย่างก็ใหม่หมด</h4>
            <p class="text-[16px] text-[#252525] leading-relaxed max-w-[800px] mx-auto">
              New Nintendo Switch พัฒนาขึ้นอีกขั้นเป็น "2" หน้าจอใหญ่ขึ้น สีสันสดใส และลื่นไหล Joy-Con รุ่นใหม่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก และใช้เป็นเมาส์ได้ สนุกไปกับเกมใหม่ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2 รวมถึงเล่นเกม Nintendo Switch ได้ด้วย
            </p>
          </div>
          
          <!-- Image 3 -->
          <div class="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/bg-welding.jpeg" alt="Product Detail 3" class="w-full h-auto object-cover aspect-[2/1]">
          </div>
          
        </div>
        
        <!-- Fade & Read More -->
        <div id="rich-content-fade" class="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-0 pointer-events-none transition-all duration-300">
          <button id="btn-read-more" class="pointer-events-auto text-[#252525] font-semibold text-[16px] flex items-center gap-2 hover:text-brand-red transition-colors bg-white px-8 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.1)] border border-gray-100 translate-y-1/2 z-10">
            <span id="read-more-text">อ่านรายละเอียดเพิ่มเติม</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300" id="read-more-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>


    
      <!-- Related Products Section (BaNANA Style Slider) -->
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 mt-16 mb-8">
        <h2 class="text-[20px] md:text-[22px] font-semibold text-[#252525] mb-8">ตัวเลือกอื่นที่คุณอาจชอบ</h2>
        <div class="relative group">
          <!-- Horizontal Scroll Container -->
          <div class="flex gap-4 overflow-x-auto custom-scrollbar pb-6 snap-x hide-scroll-indicator">
            
            <!-- Product Card -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E12427] font-bold text-[18px] price-display">฿650</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                  <div class="cart-control flex justify-end" data-unit="ห่อ">
                    <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <div class="control-expanded hidden bg-white border border-brand-green rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
                      <button class="btn-minus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">1</div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <!-- Product Card -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E12427] font-bold text-[18px] price-display">฿650</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                  <div class="cart-control flex justify-end" data-unit="ห่อ">
                    <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <div class="control-expanded hidden bg-white border border-brand-green rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
                      <button class="btn-minus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">1</div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <!-- Product Card -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E12427] font-bold text-[18px] price-display">฿650</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                  <div class="cart-control flex justify-end" data-unit="ห่อ">
                    <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <div class="control-expanded hidden bg-white border border-brand-green rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
                      <button class="btn-minus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">1</div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <!-- Product Card -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E12427] font-bold text-[18px] price-display">฿650</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                  <div class="cart-control flex justify-end" data-unit="ห่อ">
                    <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <div class="control-expanded hidden bg-white border border-brand-green rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
                      <button class="btn-minus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">1</div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <!-- Product Card -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E12427] font-bold text-[18px] price-display">฿650</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                  <div class="cart-control flex justify-end" data-unit="ห่อ">
                    <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <div class="control-expanded hidden bg-white border border-brand-green rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
                      <button class="btn-minus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">1</div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

          </div>
          <!-- Next Arrow -->
          <button class="absolute -right-4 md:-right-8 top-1/2 -translate-y-[calc(50%+12px)] flex items-center justify-center text-[#252525] hover:text-brand-red transition-colors z-10 hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

    </main>
  <footer class="bg-white w-full mt-10">
    <!-- Features Row -->
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16">
      <div class="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-200">
        <!-- Item 1 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 border-r border-gray-200 lg:last:border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <div>
            <div class="font-bold text-[#252525] text-[15px]">ส่งฟรีทั่วไทย</div>
            <div class="text-gray-600 text-[13px]">เมื่อสั่งซื้อครบ 5,000.- ขึ้นไป</div>
          </div>
        </div>
        <!-- Item 2 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 lg:border-r border-gray-200 lg:last:border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div class="font-bold text-[#252525] text-[15px]">ส่งด่วนภายใน 3 ชั่วโมง</div>
            <div class="text-gray-600 text-[13px]">กรุงเทพฯ และพื้นที่ให้บริการ</div>
          </div>
        </div>
        <!-- Item 3 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 border-t lg:border-t-0 border-r border-gray-200 lg:last:border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
          <div>
            <div class="font-bold text-[#252525] text-[15px]">รับเองที่หน้าโรงงาน</div>
            <div class="text-gray-600 text-[13px]">รับสินค้าและเช็คของทันที</div>
          </div>
        </div>
        <!-- Item 4 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 border-t lg:border-t-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <div>
            <div class="font-bold text-[#252525] text-[15px]">เปลี่ยน คืน ง่าย</div>
            <div class="text-gray-600 text-[13px]">ภายใน 7 วัน*</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
        
        <!-- Col 1 -->
        <div class="flex flex-col">
          <!-- Logo -->
          <a href="/" class="shrink-0 mb-4 inline-block group">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" />
          </a>
          <!-- Operating Hours -->
          <div class="mt-2 text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
            <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span><br>วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
            <p class="mb-0 mt-3"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span><br>จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          </div>
        </div>

        <!-- Col 2: หมวดหมู่สินค้า -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">หมวดหมู่สินค้า</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ลวดเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">เครื่องเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">อุปกรณ์งานเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">อะไหล่ปืนเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">น้ำยาเคมีภัณฑ์</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">อุปกรณ์เซฟตี้</a>
        </div>

        <!-- Col 3 (เดิม Col 2) -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">เกี่ยวกับ UDO</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ติดต่อเรา</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">เกี่ยวกับ UDO.co.th</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">สมัครสมาชิก UDO PLUS</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ข้อกำหนดและเงื่อนไข</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ร่วมงานกับเรา</a>
        </div>

        <!-- Col 4 (เดิม Col 3) -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการ</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ใช้จ่ายผ่านช่องทางต่างๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">บริการหน้าโรงงาน</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">นโยบายการรับประกันและการเคลม</a>
        </div>

        <!-- Col 5 (เดิม Col 4) -->
        <div class="flex flex-col">
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">Verified by</h3>
          <div class="flex items-center gap-3 mb-8">
            <div class="flex flex-col items-center justify-center gap-0">
              <span class="text-[#3b5998] font-black text-lg italic leading-none">DBD</span>
              <span class="text-[#3b5998] text-[8px] font-bold">Registered</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="flex">
                <div class="w-4 h-4 rounded-full bg-[#eb001b] -mr-1.5 opacity-90 mix-blend-multiply"></div>
                <div class="w-4 h-4 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply"></div>
              </div>
              <span class="text-[8px] font-bold text-gray-800 mt-1">Mastercard</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-[#1434CB] font-black text-xl italic leading-none mt-1">VISA</span>
            </div>
          </div>

          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2 mb-8">
            <a href="#" class="w-7 h-7 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
            <a href="#" class="w-7 h-7 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg></a>
            <a href="#" class="w-7 h-7 bg-[#00B900] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity font-bold text-[12px]">L</a>
            <a href="#" class="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.37-1.92 1.62-4.52 2.27-6.94 1.83-2.93-.53-5.32-2.73-6.19-5.61-.83-2.72-.11-5.83 1.81-7.91 1.71-1.85 4.32-2.77 6.81-2.5v4.06c-1.37-.15-2.8.21-3.79 1.14-.99.93-1.45 2.37-1.19 3.7.25 1.28 1.25 2.35 2.5 2.73 1.65.5 3.51-.01 4.54-1.35.83-1.07 1.22-2.45 1.19-3.79-.06-4.99-.03-9.98-.03-14.97-.01-.48.01-.96 0-1.44z"/></svg></a>
            <a href="#" class="w-7 h-7 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>

          <h3 class="font-bold text-gray-900 text-[14px] mb-2">บริการจัดส่ง</h3>
          <div class="flex items-center gap-4">
            <span class="text-[#F37021] font-black text-lg italic tracking-tighter">KERRY</span>
            <div class="bg-[#FFCC00] text-[#D40511] font-black text-sm px-1.5 py-0.5 tracking-tight italic">DHL</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Info -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-8">
        <div class="text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
          <p class="mb-0 text-gray-600">Copyright © 2026 UDO จัดจำหน่ายสินค้าและบริการ โดย บริษัท ยู.ดี.โอ. จำกัด (สำนักงานใหญ่) 61,63,65 ซอยพระราม 3 ซอย 54 แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120</p>
          <p class="mb-0 text-gray-600">เบอร์โทร. : 02-123-4567 | อีเมล : contact@udo.co.th | เลขทะเบียนพาณิชย์อิเล็กทรอนิกส์ : 0101234567890</p>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="bg-black text-white w-full border-t border-gray-800">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-4 flex flex-col md:flex-row items-center justify-between text-[13px]">
        <div class="text-gray-300 mb-3 md:mb-0">
          © Copyright 2026 UDO Public Company Limited All Rights Reserved.
        </div>
        <div class="flex items-center gap-3 text-gray-300">
          <a href="#" class="hover:text-white transition-colors">ข้อกำหนดการใช้</a>
          <span class="text-gray-600">|</span>
          <a href="#" class="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
          <span class="text-gray-600">|</span>
          <a href="#" class="hover:text-white transition-colors">การจัดการ Cookies</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Sticky Right Buttons (Why UDO & LINE) -->
  <div class="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[100] flex flex-col items-center gap-3 md:gap-4">
    
    <!-- Why UDO Button -->
    <div class="relative group cursor-pointer" id="whyUdoBtnContainer">
      <!-- Close Button (X) -->
      <button onclick="document.getElementById('whyUdoBtnContainer').style.display='none'" class="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-6 h-6 md:w-8 md:h-8 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors z-10 border-[1.5px] border-white/30 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Main Circle Button (ย่อลงมานิดนึง เป็น 108px) -->
      <a href="#" class="w-[90px] h-[90px] md:w-[108px] md:h-[108px] bg-[#E12427] hover:bg-[#c41f22] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(181,56,50,0.25)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[14px] md:text-[17px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>
  </div>
  
  <!-- Fixed Bottom Dock (UDO Custom) -->
  <div class="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur-md rounded-full px-4 md:px-5 py-1 md:py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-1 md:gap-2 hover:shadow-[0_12px_40px_rgba(138,195,83,0.25)] transition-all duration-500">
    
    <!-- Item 1: ถาม UDO AI -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#71C04C] transition-colors whitespace-nowrap tracking-tight">ถาม UDO AI</span>
    </a>

    <!-- Item 2: โทรเช็กสต็อก -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#71C04C] transition-colors whitespace-nowrap tracking-tight">โทรเช็กสต็อก</span>
    </a>

    <!-- Item 3: ขอใบเสนอราคา -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#71C04C] transition-colors whitespace-nowrap tracking-tight">ขอใบเสนอราคา</span>
    </a>
  </div>


`;





// --- Mega Menu Click Logic ---
setTimeout(() => {
  const menuBtn = document.getElementById('category-menu-btn');
  const menuArrow = document.getElementById('category-menu-arrow');
  const megaMenu = document.getElementById('desktop-mega-menu');
  const overlay = document.getElementById('mega-menu-overlay');

  const closeMenu = () => {
    megaMenu.classList.add('hidden');
    megaMenu.classList.remove('flex');
    if (menuArrow) menuArrow.classList.remove('rotate-180');
    if (overlay) overlay.classList.add('hidden');
  };

  const openMenu = () => {
    megaMenu.classList.remove('hidden');
    megaMenu.classList.add('flex');
    if (menuArrow) menuArrow.classList.add('rotate-180');
    if (overlay) overlay.classList.remove('hidden');
  };

  if (menuBtn && megaMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = megaMenu.classList.contains('hidden');
      if (isHidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !megaMenu.contains(e.target) && !megaMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }
}, 100);



// --- Read More Logic ---
setTimeout(() => {
  const container = document.getElementById('rich-content-container');
  const fade = document.getElementById('rich-content-fade');
  const btn = document.getElementById('btn-read-more');
  const icon = document.getElementById('read-more-icon');
  const text = document.getElementById('read-more-text');

  if (btn && container && fade) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = container.style.maxHeight !== '' && container.style.maxHeight !== '500px';
      
      if (isExpanded) {
        // Collapse
        container.style.maxHeight = '500px';
        fade.classList.remove('h-[80px]', 'from-transparent', 'via-transparent');
        fade.classList.add('h-[200px]', 'from-white', 'via-white/80');
        text.innerText = 'อ่านรายละเอียดเพิ่มเติม';
        icon.classList.remove('rotate-180');
      } else {
        // Expand
        container.style.maxHeight = container.scrollHeight + 'px';
        fade.classList.remove('h-[200px]', 'from-white', 'via-white/80');
        fade.classList.add('h-[80px]', 'from-transparent', 'via-transparent');
        // After transition, set to none so it responds to window resize
        setTimeout(() => {
          if(container.style.maxHeight !== '500px') {
             container.style.maxHeight = 'none';
          }
        }, 500);
      }
    });
  }
}, 100);

// Script สำหรับทำ Fade Effect ให้กับช่องค้นหา
const searchPlaceholders = [
  "อุปกรณ์เสริม",
  "ตู้เชื่อม MIG / TIG...",
  "ลวดเชื่อมสเตนเลส...",
  "หน้ากากเชื่อมปรับแสงอัตโนมัติ...",
  "ชุดตัดแก๊ส / พลาสม่า...",
  "ใบตัดเหล็ก ใบเจียร...",
  "อะไหล่ปืนเชื่อมต่างๆ...",
  "ถุงมือหนังงานเชื่อม..."
];

const searchInput = document.getElementById('searchInput');
const animatedPlaceholder = document.getElementById('animatedPlaceholder');

if (searchInput && animatedPlaceholder) {
  let wordIndex = 0;
  animatedPlaceholder.textContent = searchPlaceholders[0];

  setInterval(() => {
    wordIndex = (wordIndex + 1) % searchPlaceholders.length;
    animatedPlaceholder.textContent = searchPlaceholders[wordIndex];
  }, 4500);

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      animatedPlaceholder.style.display = 'none';
    } else {
      animatedPlaceholder.style.display = 'block';
    }
  });
}

