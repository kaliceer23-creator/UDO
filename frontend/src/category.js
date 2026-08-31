import './style.css'

document.querySelector('#app').innerHTML = `
  
  <!-- Mega Menu Overlay (Moved outside to guarantee it sits under header) -->
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

  <!-- Sticky Wrapper สำหรับล็อก Header + Nav ให้อยู่บนสุดตอนไถจอ -->
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
  <main class="w-full bg-white pb-20 min-h-screen">
  <!-- Breadcrumbs -->
  <div class="bg-white">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap border-b border-black/10">
      <a href="/" class="hover:text-brand-red">หน้าหลัก</a>
      <span class="text-gray-400">&gt;</span>
      <a href="#" class="hover:text-brand-red">เครื่องมือช่างและฮาร์ดแวร์</a>
      <span class="text-gray-400">&gt;</span>
      <a href="#" class="hover:text-brand-red">เครื่องเชื่อมและอุปกรณ์</a>
      <span class="text-gray-400">&gt;</span>
      <span class="text-[#252525]">ลวดเชื่อม</span>
    </div>
  </div>


  
  <!-- 1. Filter Bar & Sort By -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-16 md:pt-24 mb-4">
    <!-- Left: 3 Filter Buttons -->
    <div class="flex flex-wrap items-center gap-3">

      <!-- Main Filter Icon Button (Just Icon) -->
      <button class="flex items-center gap-1.5 px-2.5 h-10 text-[#252525] hover:bg-gray-100 rounded-lg transition-colors shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
      </button>

      
      <!-- วัสดุที่เชื่อม Dropdown Pill (Inactive) -->
      <div class="relative ">
        <button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-lg border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          วัสดุที่เชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[240px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden filter-dropdown z-40 overflow-hidden flex flex-col">
          <div class="p-2 max-h-[250px] overflow-y-auto">
            <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all">
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[16px] text-[#252525]">เหล็ก (Steel)</span>
            </label>
            <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all">
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[16px] text-[#252525]">สแตนเลส (Stainless)</span>
            </label>
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 pb-4 pt-2 bg-white">
            <button class="text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">ดูสินค้า</button>
          </div>
        </div>
      </div>
      
      <!-- กระบวนการเชื่อม Dropdown Pill (Inactive) -->
      <div class="relative ">
        <button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-lg border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          กระบวนการเชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[240px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden filter-dropdown z-40 overflow-hidden flex flex-col">
          <div class="p-2 max-h-[250px] overflow-y-auto">
            <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all">
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[16px] text-[#252525]">ธูปเชื่อม (MMA)</span>
            </label>
            <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all">
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[16px] text-[#252525]">ซีโอทู (MIG)</span>
            </label>
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 pb-4 pt-2 bg-white">
            <button class="text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">ดูสินค้า</button>
          </div>
        </div>
      </div>

      <!-- ขนาดลวด Dropdown Pill (ACTIVE) -->
      <div class="relative ">
        <!-- Notice the Active Classes: Green background, green border, green text -->
        <button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-lg border border-brand-green text-[16px] font-semibold text-brand-green bg-[rgba(113,192,76,0.08)] hover:bg-[rgba(113,192,76,0.12)] transition-colors">
          ขนาดลวด (2) <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[240px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden filter-dropdown z-40 overflow-hidden flex flex-col">
          <div class="p-2 max-h-[250px] overflow-y-auto">
            <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all" checked>
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[16px] text-[#252525]">2.6 mm</span>
            </label>
            <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all" checked>
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[16px] text-[#252525]">3.2 mm</span>
            </label>
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 pb-4 pt-2 bg-white">
            <button class="text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">ดูสินค้า</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Sort By -->
    <div class="relative group/sort cursor-pointer z-50">
      <div class="flex items-center gap-2 text-[16px] text-[#252525] hover:text-brand-red transition-colors font-medium">
        เรียงตาม: <span class="font-normal text-gray-600">เกี่ยวข้อง</span> 
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
      <!-- Dropdown -->
      <div class="absolute right-0 top-full mt-2 w-[180px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/sort:block z-50 text-left">
        <a href="#" class="block px-4 py-2 text-[15px] text-[#252525] bg-gray-50 font-medium">เกี่ยวข้อง</a>
        <a href="#" class="block px-4 py-2 text-[15px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: ต่ำไปสูง</a>
        <a href="#" class="block px-4 py-2 text-[15px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: สูงไปต่ำ</a>
      </div>
    </div>
  </div>

  <!-- 2. Active Pills Row -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-3 flex-wrap mb-16 md:mb-20">
    <!-- Clear All (X Circle) -->
    <button class="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-[#252525] hover:border-[#333333] hover:bg-gray-100 transition-colors shrink-0" title="Clear All">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    <!-- Active Pill 1 -->
    <div class="flex items-center gap-2 bg-[#EDEDED] px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#252525]">
      เหล็ก <button class="text-[#252525] hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
    <!-- Active Pill 2 -->
    <div class="flex items-center gap-2 bg-[#EDEDED] px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#252525]">
      2.6 mm <button class="text-[#252525] hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
  </div>

  <!-- 3. Title and Count -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-10">
    <h1 class="text-[26px] font-bold text-[#252525] leading-tight">ลวดเชื่อม (Top Sale)</h1>
    <p class="text-[16px] text-[rgba(0,0,0,0.45)] mt-1">8 รายการ</p>
  </div>

  <!-- 5. Product Grid -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-16">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
<!-- Card 1 -->
            <a href="#" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
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
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ห่อ</span>
                      </div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center bg-brand-green text-white hover:bg-[#8eb543] transition-colors">
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
    
    <!-- Load More Button -->
    <div class="flex justify-center mt-12">
      <button class="px-8 py-3 bg-white border border-black rounded-full text-[14px] font-medium text-black hover:bg-black hover:text-white transition-all">
        LOAD MORE
      </button>
    </div>
  </div>

</main>


  
    
      <!-- Section: Full Width LINE Banner -->
      <section class="w-full relative mt-16 md:mt-24 h-[120px] md:h-[150px] bg-gray-600 flex items-center overflow-hidden">
        <!-- Background Image -->
        <img src="https://www.landyhome.co.th/images/layout/sec_add_line.webp" alt="Add LINE" class="absolute inset-0 w-full h-full object-cover object-right md:object-center" />
        
        <!-- Content Container -->
        <div class="relative z-10 w-full max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center">
          <h2 class="text-white text-[20px] md:text-[24px] lg:text-[30px] font-bold mb-3 drop-shadow-md">
            ปรึกษาเรื่องงานเชื่อมแอดไลน์เลย!
          </h2>
          <a href="#" class="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-[14px] md:text-[15px] px-5 md:px-6 py-1.5 md:py-2 rounded-full w-fit hover:bg-gray-100 hover:scale-105 transition-all shadow-lg gap-1.5">
            <!-- LINE Icon SVG (Green) -->
            <svg viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6" fill="#06C755">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.939 8.922 9.324 9.614.364.077.863.238.989.544.113.277.073.708.035 1.002-.005.039-.047.301-.06.39-.033.242-.162 1.018.895.57 1.055-.448 5.71-3.36 7.828-5.787 1.954-2.222 2.989-4.526 2.989-6.333zm-14.73 2.766h-2.553c-.347 0-.63-.284-.63-.631v-4.144c0-.348.283-.631.63-.631s.631.283.631.631v3.513h1.922c.348 0 .631.283.631.631 0 .347-.283.631-.631.631zm3.843 0h-1.262c-.348 0-.631-.283-.631-.631v-4.144c0-.348.283-.631.631-.631s.631.283.631.631v4.144c0 .347-.283.631-.631.631zm3.957-2.613c0 .248-.145.474-.374.577l-1.92 1.085v.32c0 .347-.283.631-.631.631s-.631-.283-.631-.631v-4.144c0-.247.145-.473.374-.576l1.92-1.085v-.32c0-.348.283-.631.631-.631s.631.283.631.631v4.143zm-1.89-1.29l-1.26-.712v1.93l1.26-.712z"/>
            </svg>
            @UDOWelding
          </a>
        </div>
      </section>

    <!-- Section: Articles / Portfolio (Apple Store Bleed Style) -->
    <section class="w-full bg-[#F8F8F8] pt-18 md:pt-26 lg:pt-32 pb-20 md:pb-28 lg:pb-32 overflow-hidden">
      <!-- Header (Contained in 1360px) -->
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 mb-8 md:mb-10 lg:mb-12">
        <div class="flex items-baseline justify-between">
          <div class="flex items-center gap-2">
            <h2 class="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 tracking-tight">
              บทความ
            </h2>
          </div>
          <a href="/category.html" class="text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[15px] md:text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Horizontal Slider (Bleeds to Right Screen Edge: 2 Large Cards + Peeking Card) -->
      <div class="w-full flex items-start gap-4 md:gap-5 lg:gap-6 overflow-x-auto no-scrollbar pb-6 article-bleed-track">
        
        <!-- Article 1 -->
        <a href="#" class="shrink-0 w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[520px] xl:w-[560px] group cursor-pointer">
          <div class="w-full aspect-[16/10] rounded-[20px] md:rounded-[24px] overflow-hidden mb-5 md:mb-6 relative shadow-sm">
            <img src="/images/banners/Banner_0.png" alt="Article 1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
          <h3 class="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-gray-900 group-hover:text-[#E12427] transition-colors line-clamp-2 leading-snug">
            แนะนำ 5 เทคนิคการเชื่อม TIG สำหรับมือใหม่
          </h3>
          <p class="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 font-normal line-clamp-2 mt-3 md:mt-4 leading-relaxed">
            เรียนรู้พื้นฐานการปรับกระแสไฟ การเลือกใช้ลวดเชื่อม และเทคนิคการเดินแนวเชื่อมให้ได้เกล็ดสวยงาม แข็งแรง ไร้ตามด
          </p>
        </a>

        <!-- Article 2 -->
        <a href="#" class="shrink-0 w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[520px] xl:w-[560px] group cursor-pointer">
          <div class="w-full aspect-[16/10] rounded-[20px] md:rounded-[24px] overflow-hidden mb-5 md:mb-6 relative shadow-sm">
            <img src="/images/banners/Banner_0.png" alt="Article 2" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
          <h3 class="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-gray-900 group-hover:text-[#E12427] transition-colors line-clamp-2 leading-snug">
            การเลือกใช้ลวดเชื่อมฟลักซ์คอร์สในงานโครงสร้าง
          </h3>
          <p class="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 font-normal line-clamp-2 mt-3 md:mt-4 leading-relaxed">
            เจาะลึกความแตกต่างระหว่างลวดเชื่อมแบบใช้แก๊สและไม่ใช้แก๊ส พร้อมข้อดีในการเชื่อมเหล็กหนาสำหรับงานโครงสร้างขนาดใหญ่
          </p>
        </a>

        <!-- Article 3 (Peeking on Right Edge) -->
        <a href="#" class="shrink-0 w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[520px] xl:w-[560px] group cursor-pointer">
          <div class="w-full aspect-[16/10] rounded-[20px] md:rounded-[24px] overflow-hidden mb-5 md:mb-6 relative shadow-sm">
            <img src="/images/banners/Banner_0.png" alt="Article 3" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
          <h3 class="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-gray-900 group-hover:text-[#E12427] transition-colors line-clamp-2 leading-snug">
            รีวิวตู้เชื่อมซีโอทู (MIG) ช่วยลดต้นทุนในโรงงาน
          </h3>
          <p class="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 font-normal line-clamp-2 mt-3 md:mt-4 leading-relaxed">
            เปรียบเทียบประสิทธิภาพและความเร็วในการเชื่อม ช่วยประหยัดเวลา ลดสะเก็ดไฟ และเพิ่มผลผลิตในสายการผลิตจริง
          </p>
        </a>
        
        <!-- Article 4 -->
        <a href="#" class="shrink-0 w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[520px] xl:w-[560px] group cursor-pointer">
          <div class="w-full aspect-[16/10] rounded-[20px] md:rounded-[24px] overflow-hidden mb-5 md:mb-6 relative shadow-sm">
            <img src="/images/banners/Banner_0.png" alt="Article 4" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
          <h3 class="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-gray-900 group-hover:text-[#E12427] transition-colors line-clamp-2 leading-snug">
            เจาะลึก 3 ข้อควรระวังในการเชื่อมเหล็กหล่อ
          </h3>
          <p class="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 font-normal line-clamp-2 mt-3 md:mt-4 leading-relaxed">
            เทคนิคการอุ่นชิ้นงาน (Pre-heat) ก่อนเชื่อม และการควบคุมความร้อนเพื่อป้องกันปัญหารอยแตกร้าวและโครงสร้างเสียหาย
          </p>
        </a>

        <!-- End Spacer Buffer -->
        <div class="shrink-0 w-8 md:w-16 h-1"></div>

      </div>
    </section>

<!-- Footer -->
  <footer class="bg-white w-full mt-0">
    <!-- Features Row -->
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16">
      <div class="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-200">
        <!-- Item 1 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 border-r border-gray-200 lg:last:border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <div>
            <div class="font-bold text-gray-900 text-[15px]">ส่งฟรีทั่วไทย</div>
            <div class="text-gray-600 text-[13px]">เมื่อสั่งซื้อครบ 5,000.- ขึ้นไป</div>
          </div>
        </div>
        <!-- Item 2 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 lg:border-r border-gray-200 lg:last:border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div class="font-bold text-gray-900 text-[15px]">ส่งด่วนภายใน 3 ชั่วโมง</div>
            <div class="text-gray-600 text-[13px]">กรุงเทพฯ และพื้นที่ให้บริการ</div>
          </div>
        </div>
        <!-- Item 3 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 border-t lg:border-t-0 border-r border-gray-200 lg:last:border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
          <div>
            <div class="font-bold text-gray-900 text-[15px]">รับเองที่หน้าโรงงาน</div>
            <div class="text-gray-600 text-[13px]">รับสินค้าและเช็คของทันที</div>
          </div>
        </div>
        <!-- Item 4 -->
        <div class="flex items-center justify-center gap-4 py-8 px-4 border-t lg:border-t-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <div>
            <div class="font-bold text-gray-900 text-[15px]">เปลี่ยน คืน ง่าย</div>
            <div class="text-gray-600 text-[13px]">ภายใน 7 วัน*</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        <!-- Col 1 -->
        <div class="flex flex-col">
          <!-- Logo -->
          <a href="/" class="shrink-0 mb-4 inline-block hover:opacity-80 transition-opacity">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-10 w-auto object-contain" />
          </a>
          <p class="text-[13.5px] text-gray-900 font-semibold mb-5">ช้อปสินค้าอุปกรณ์งานเชื่อมครบวงจร ตลอด 24 ชั่วโมง</p>
          <button class="flex items-center justify-center gap-2 border border-gray-400 text-gray-900 bg-white hover:bg-gray-50 rounded-md py-2 px-4 mb-6 w-fit text-[14px] font-semibold transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            ค้นหาสาขาใกล้คุณ
          </button>
          <div class="flex gap-2">
            <!-- App Store Mock -->
            <div class="bg-black text-white rounded-[4px] flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer hover:bg-gray-800 transition-colors w-[120px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.36 14c.08-.02.2-.02.26 0 .53.22 1.05.52 1.5 1 .64.67 1.05 1.57 1.05 2.5 0 2.27-1.85 4.12-4.13 4.12-1.07 0-2.1-.41-2.88-1.12l-.66-.62-.64.62c-.78.7-1.81 1.12-2.88 1.12-2.28 0-4.13-1.85-4.13-4.12 0-.93.41-1.83 1.05-2.5.45-.48.97-.78 1.5-1 .06-.02.18-.02.26 0 .78.18 1.57.51 2.27.97.7-.46 1.49-.79 2.27-.97zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.68 18.27c-.89-.3-1.68-.78-2.33-1.42l-.35-.35-.35.35c-.65.64-1.44 1.12-2.33 1.42C7.03 19.34 6 18.3 6 17c0-.85.34-1.63.9-2.18.52-.51 1.23-.84 2-.96l.85-.14.28.8c.18.52.47 1 .84 1.4.38.41.86.72 1.41.89l.72.22.72-.22c.55-.17 1.03-.48 1.41-.89.37-.4.66-.88.84-1.4l.28-.8.85.14c.77.12 1.48.45 2 .96.56.55.9 1.33.9 2.18 0 1.3-1.03 2.34-2.32 3.27z"/></svg>
              <div class="flex flex-col leading-none">
                <span class="text-[7px] opacity-90 mt-0.5">Download on the</span>
                <span class="text-[12px] font-semibold -mt-0.5">App Store</span>
              </div>
            </div>
            <!-- Play Store Mock -->
            <div class="bg-black text-white rounded-[4px] flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer hover:bg-gray-800 transition-colors w-[120px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.61 3 21.09 3 20.5zm11.39-7.8L21 16c.39.23.39.61 0 .84l-6.61 3.32-3.23-3.23 3.23-3.23zm0-1.4l-3.23-3.23 3.23-3.23L21 8c.39.23.39.61 0 .84l-6.61 2.46z"/></svg>
              <div class="flex flex-col leading-none">
                <span class="text-[7px] opacity-90 mt-0.5">GET IT ON</span>
                <span class="text-[12px] font-semibold -mt-0.5">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 2 -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">เกี่ยวกับ UDO</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ติดต่อเรา</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">เกี่ยวกับ UDO.co.th</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">สมัครสมาชิก UDO PLUS</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ข้อกำหนดและเงื่อนไข</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ร่วมงานกับเรา</a>
        </div>

        <!-- Col 3 -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการ</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ใช้จ่ายผ่านช่องทางต่างๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">บริการหน้าโรงงาน</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">นโยบายการรับประกันและการเคลม</a>
        </div>

        <!-- Col 4 -->
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

    <!-- LINE Button -->
    <a href="#" class="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-[#E12427] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group border-[1px] border-white/80">
      <!-- LINE SVG Icon แบบสร้างใหม่ (ใช้ Text จริงๆ การันตีว่าอ่านออก 100%) -->
      <svg class="w-7 h-7 md:w-[34px] md:h-[34px] relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ลูกโป่งสีขาว -->
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992z" fill="white"/>
        <!-- ตัวหนังสือ LINE ข้างใน (เปลี่ยนสีตาม hover ได้ด้วย) -->
        <text x="12" y="13.2" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="7.5" fill="#E12427" text-anchor="middle" class="group-hover:fill-[#00B900] transition-colors duration-300">LINE</text>
      </svg>
    </a>
    
  </div>

    <!-- LINE Button -->
    <!-- ขอบขาวบางลง (border-[1px] border-white/80) -->
    <a href="#" class="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-[#E12427] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group border-[1px] border-white/80">
      <!-- LINE SVG Icon (เปลี่ยนมาใช้ FontAwesome Path ที่คมชัดและตัวหนังสือไม่บี้) -->
      <svg class="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" viewBox="0 0 496 512" fill="currentColor">
        <path d="M248 8C111.1 8 0 99.1 0 211.8c0 51.5 22.3 98.4 59.8 135.5 13.9 13.8 15.3 19.3 11.2 37.1-3.6 15.9-10.3 35.8-13.6 47.9-1.9 6.8 5.6 9.8 10.3 7 10.3-6 45.4-26.3 64.9-42.3 10.3-8.4 19.2-12.8 30.6-10.7 27.6 5.1 56.6 7.9 86.8 7.9 136.9 0 248-91.1 248-203.8S384.9 8 248 8zM161.4 274.5c0 6.6-5.4 12-12 12h-47c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h47c6.6 0 12 5.4 12 12v12h-35v19h35c6.6 0 12 5.4 12 12v12zm68.3 0c0 6.6-5.4 12-12 12h-17.7c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h17.7c6.6 0 12 5.4 12 12v88zm81.4 0c0 6.6-5.4 12-12 12h-18l-32.9-46.7v34.7c0 6.6-5.4 12-12 12h-17.7c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h18l32.9 46.7V186.5c0-6.6 5.4-12 12-12h17.7c6.6 0 12 5.4 12 12v88zm83.3-33h-35v19h35c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12h-47c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h47c6.6 0 12 5.4 12 12v12h-35v19h35c6.6 0 12 5.4 12 12v12z"/>
      </svg>
    </a>
    
  </div>

    <!-- LINE Button -->
    <!-- เพิ่มเส้นขอบสีขาว (border-2 border-white) และขยายปุ่มนิดนึง -->
    <a href="#" class="w-[52px] h-[52px] md:w-[60px] md:h-[60px] bg-[#E12427] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group border-[2px] border-white">
      <!-- LINE SVG Icon (ขยายขนาดจาก w-8 เป็น w-10 เพื่อให้คำว่า LINE ข้างในอ่านออกชัดเจนขึ้น) -->
      <svg class="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zM8.344 13.56H6.173c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.171c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H6.697v1.865h1.647c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H8.344zm3.924 0h-1.646c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h1.646c.29 0 .524.234.524.523v4.48c0 .29-.234.524-.524.524zm4.184 0h-1.288l-1.921-2.617v2.093c0 .29-.234.524-.524.524h-1.647c-.289 0-.523-.234-.523-.524v-4.48c0-.289.234-.523.523-.523h1.289l1.92 2.617V8.553c0-.289.234-.523.524-.523h1.647c.289 0 .523.234.523.523v4.48c0 .29-.234.524-.523.524zm4.07 0h-2.17c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.17c.289 0 .523.234.523.523v1.308c0 .29-.234.524-.523.524h-1.646v1.08h1.646c.289 0 .523.234.523.524v1.308c0 .29-.234.524-.523.524h-1.646v1.308c0 .29.234.524.523.524h2.17c.289 0 .524.234.524.524z" />
      </svg>
    </a>
    
  </div>

    <!-- LINE Button -->
    <a href="#" class="w-[48px] h-[48px] md:w-[56px] md:h-[56px] bg-[#E12427] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group">
      <!-- LINE SVG Icon -->
      <svg class="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zM8.344 13.56H6.173c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.171c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H6.697v1.865h1.647c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H8.344zm3.924 0h-1.646c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h1.646c.29 0 .524.234.524.523v4.48c0 .29-.234.524-.524.524zm4.184 0h-1.288l-1.921-2.617v2.093c0 .29-.234.524-.524.524h-1.647c-.289 0-.523-.234-.523-.524v-4.48c0-.289.234-.523.523-.523h1.289l1.92 2.617V8.553c0-.289.234-.523.524-.523h1.647c.289 0 .523.234.523.523v4.48c0 .29-.234.524-.523.524zm4.07 0h-2.17c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.17c.289 0 .523.234.523.523v1.308c0 .29-.234.524-.523.524h-1.646v1.08h1.646c.289 0 .523.234.523.524v1.308c0 .29-.234.524-.523.524h-1.646v1.308c0 .29.234.524.523.524h2.17c.289 0 .524.234.524.524z" />
      </svg>
    </a>
    
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
  
  // Set initial word
  animatedPlaceholder.textContent = searchPlaceholders[0];

  // ตั้งเวลาสลับข้อความแบบทันที (ไม่เฟด) โดยค้างไว้ 4.5 วินาที
  setInterval(() => {
    wordIndex = (wordIndex + 1) % searchPlaceholders.length;
    animatedPlaceholder.textContent = searchPlaceholders[wordIndex];
  }, 4500);

  // ซ่อน Placeholder ทันทีเมื่อผู้ใช้เริ่มพิมพ์ข้อความ
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      animatedPlaceholder.style.display = 'none';
    } else {
      animatedPlaceholder.style.display = 'block';
    }
  });
}


// --- Hero Slider Logic (Fade Transition) ---
const slider = document.getElementById('heroSlider');
if (slider) {
  const slides = slider.children;
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const indicatorsContainer = document.getElementById('sliderIndicators');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Create Indicators (จุดและขีด)
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    // ขีด (active) จะยาว, จุด (inactive) จะสั้น
    dot.className = 'h-1.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm ' + 
                    (i === 0 ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlider();
      resetInterval();
    });
    indicatorsContainer.appendChild(dot);
  }
  const indicators = indicatorsContainer.children;

  function updateSlider() {
    // 1. อัปเดตการแสดงผลของรูป (Fade In/Out)
    Array.from(slides).forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.remove('opacity-0', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'z-0');
      }
    });

    // 2. อัปเดตสถานะของจุดและขีด (Indicators UI)
    Array.from(indicators).forEach((dot, index) => {
      if (index === currentSlide) {
        dot.className = 'h-1.5 rounded-full cursor-pointer transition-all duration-300 w-5 bg-white shadow-sm';
      } else {
        dot.className = 'h-1.5 rounded-full cursor-pointer transition-all duration-300 w-1.5 bg-white/50 hover:bg-white shadow-sm';
      }
    });
  }

  function nextSlideFn() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlideFn() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn.addEventListener('click', () => {
    nextSlideFn();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlideFn();
    resetInterval();
  });

  function startInterval() {
    // ค้างไว้นานๆ 10 วินาที เพื่อให้คนซึมซับภาพและข้อความ
    slideInterval = setInterval(nextSlideFn, 10000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  // Initialize
  startInterval();
}

// --- Cart Control Logic (Instacart Style) ---
document.querySelectorAll('.cart-control').forEach(control => {
  const btnAdd = control.querySelector('.btn-add');
  const expanded = control.querySelector('.control-expanded');
  const btnMinus = control.querySelector('.btn-minus');
  const btnPlus = control.querySelector('.btn-plus');
  const qtyText = control.querySelector('.qty-text');
  
  let qty = 0;
  
  // click + initial
  btnAdd.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation();
    
    qty = 1;
    qtyText.textContent = qty;
    
    btnAdd.classList.add('hidden');
    expanded.classList.remove('hidden');
  });

  // click + (increment)
  btnPlus.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    qty++;
    qtyText.textContent = qty;
  });

  // click - (decrement/trash)
  btnMinus.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    qty--;
    if (qty <= 0) {
      qty = 0;
      expanded.classList.add('hidden');
      btnAdd.classList.remove('hidden');
    } else {
      qtyText.textContent = qty;
    }
  });
});

// --- Unit Toggle Logic ---
document.querySelectorAll('.unit-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove active state from siblings
    const parent = btn.parentElement;
    parent.querySelectorAll('.unit-toggle').forEach(sibling => {
      sibling.classList.remove('active', 'bg-white', 'shadow-sm', 'text-gray-900');
      sibling.classList.add('text-gray-500');
    });

    // Add active state to clicked button
    btn.classList.add('active', 'bg-white', 'shadow-sm', 'text-gray-900');
    btn.classList.remove('text-gray-500');

    // Update Price and Unit Display
    const cardContent = btn.closest('.flex-col'); // get the wrapper
    const priceDisplay = cardContent.querySelector('.price-display');
    const priceUnit = cardContent.querySelector('.price-unit');
    const cartControl = cardContent.querySelector('.cart-control');
    const expandedUnitText = cartControl.querySelector('.unit-text');

    const newPrice = btn.dataset.price;
    const newUnit = btn.dataset.unit;

    priceDisplay.textContent = '฿' + newPrice;
    priceUnit.textContent = '/' + newUnit;
    
    // Update cart control dataset and display
    cartControl.dataset.unit = newUnit;
    if (expandedUnitText) {
      expandedUnitText.textContent = newUnit;
    }
  });
});

// --- Brand Slider Auto-Scroll Logic ---
const brandSection = document.getElementById('brandSliderSection');
if (brandSection) {
  const track = brandSection.querySelector('.brand-track');
  const dotsContainer = brandSection.querySelector('.brand-dots');
  const btnPrev = brandSection.querySelector('.brand-prev');
  const btnNext = brandSection.querySelector('.brand-next');
  
  if (track) {
    let scrollInterval;
    let isHovered = false;

    const updateBrandUI = () => {
      // Calculate how many pages we have
      const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0; // +16 for gap
      if (itemWidth === 0) return;
      
      // Calculate how many items are visible at once
      const visibleItems = Math.round(track.clientWidth / itemWidth) || 1;
      const totalItems = track.children.length;
      
      // Total pages = total slides minus the ones that fit in the last view
      const totalPages = totalItems - visibleItems + 1;
      
      let currentPage = Math.round(track.scrollLeft / itemWidth);
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      if (currentPage < 0) currentPage = 0;

      // Update Dots
      if (dotsContainer) {
        if (dotsContainer.children.length !== totalPages && totalPages > 1) {
          dotsContainer.innerHTML = '';
          for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
            
            // Allow clicking dots to scroll
            dot.addEventListener('click', () => {
               track.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
            });
            
            dotsContainer.appendChild(dot);
          }
        } else if (totalPages > 1) {
          Array.from(dotsContainer.children).forEach((dot, idx) => {
            dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
          });
        } else {
          dotsContainer.innerHTML = '';
        }
      }
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      scrollInterval = setInterval(() => {
        if (!isHovered) {
          const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0;
          if (itemWidth === 0) return;
          
          const maxScroll = track.scrollWidth - track.clientWidth;
          
          // If we are at the end, loop back to start
          if (track.scrollLeft >= maxScroll - 5) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll to next item
            track.scrollBy({ left: itemWidth, behavior: 'smooth' });
          }
        }
      }, 3000); // 3 seconds per scroll
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    track.addEventListener('mouseenter', () => isHovered = true);
    track.addEventListener('mouseleave', () => isHovered = false);

    track.addEventListener('scroll', () => {
      requestAnimationFrame(updateBrandUI);
    });


    if (btnPrev && btnNext) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0;
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        // Reset auto scroll timer on manual click
        startAutoScroll();
      });

      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0;
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        // Loop back manually if at end
        if (track.scrollLeft >= maxScroll - 5) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
        
        // Reset auto scroll timer on manual click
        startAutoScroll();
      });
    }

    startAutoScroll();
    setTimeout(updateBrandUI, 100);
    window.addEventListener('resize', () => setTimeout(updateBrandUI, 100));
  }
}

const productSliders = document.querySelectorAll('.group\\/pslider');
productSliders.forEach(sliderWrapper => {
  const track = sliderWrapper.querySelector('.pslider-track');
  const btnPrev = sliderWrapper.querySelector('.pslider-prev');
  const btnNext = sliderWrapper.querySelector('.pslider-next');
  const dotsContainer = sliderWrapper.querySelector('.pslider-dots');
  
  if (!track || !btnPrev || !btnNext) return;

  const updateUI = () => {
    // Button visibility
    if (track.scrollLeft <= 0) {
      btnPrev.classList.add('opacity-0', 'pointer-events-none');
    } else {
      btnPrev.classList.remove('opacity-0', 'pointer-events-none');
    }

    if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth) {
      btnNext.classList.add('opacity-0', 'pointer-events-none');
    } else {
      btnNext.classList.remove('opacity-0', 'pointer-events-none');
    }

    // Dots calculation
    if (dotsContainer) {
      // Calculate how many pages we have
      const totalPages = Math.ceil(track.scrollWidth / track.clientWidth);
      const currentPage = Math.round(track.scrollLeft / track.clientWidth);
      
      // Generate dots if not created yet or if screen size changed
      if (dotsContainer.children.length !== totalPages && totalPages > 1) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
          const dot = document.createElement('div');
          dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
          dotsContainer.appendChild(dot);
        }
      } else if (totalPages > 1) {
        // Update active dot
        Array.from(dotsContainer.children).forEach((dot, idx) => {
          dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
        });
      } else {
        dotsContainer.innerHTML = ''; // No dots needed if no scroll
      }
    }
  };

  btnPrev.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: -(track.clientWidth * 0.8), behavior: 'smooth' });
  });

  btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  });

  track.addEventListener('scroll', () => {
    // Throttle UI update for performance
    requestAnimationFrame(updateUI);
  });

  // Initial Check
  setTimeout(updateUI, 100);
  window.addEventListener('resize', () => {
    setTimeout(updateUI, 100);
  });
});






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

  // Filter Dropdown Click Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allDropdowns = document.querySelectorAll('.filter-dropdown');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      
      // Close all other dropdowns
      allDropdowns.forEach(dd => {
        if (dd !== dropdown) dd.classList.add('hidden');
      });

      // Toggle current dropdown
      dropdown.classList.toggle('hidden');
    });
  });

  // Prevent dropdown from closing when clicking inside it
  allDropdowns.forEach(dd => {
    dd.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    allDropdowns.forEach(dd => dd.classList.add('hidden'));
  });

}, 100);


