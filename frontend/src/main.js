import './style.css'

document.querySelector('#app').innerHTML = `
  
  <!-- Mega Menu Overlay (Moved outside to guarantee it sits under header) -->
  <div id="mega-menu-overlay" class="hidden fixed inset-0 bg-black/30 z-[40] cursor-pointer"></div>
  <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
  <div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-end text-[12px] text-black/90 font-medium gap-4">
      
      <!-- Phone Number (Minimalist) -->
      <a href="tel:0628159999" class="flex items-center gap-1.5 hover:text-brand-red transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        <span class="font-semibold tracking-wide">062 815 9999</span>
      </a>
      
      <span class="text-gray-400 font-light">|</span>

      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
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
        <div class="hidden md:flex flex-1 max-w-[680px] lg:max-w-[800px] xl:max-w-[860px] items-center mx-4 lg:mx-8 bg-white rounded-2xl h-[48px] md:h-[50px] lg:h-[52px] pl-5 pr-4 border border-gray-200 focus-within:border-[#ff8585] focus-within:ring-[1.5px] focus-within:ring-[#ff8585] transition-all duration-200 relative">
          
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
            <!-- AI Search Icon (Magnifying Glass + Sparkle) -->
            <div class="relative flex items-center justify-center w-3.5 h-3.5 mr-0.5">
              <!-- Magnifying Glass -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[13px] h-[13px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <!-- Sparkle (Top Right) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[8px] h-[8px] text-white absolute -top-1 -right-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span class="font-medium text-[11.5px] md:text-[12px] tracking-tight">โหมด AI</span>
          </button>
          
        </div>

        <!-- Right Side Actions -->
        <div class="shrink-0 flex items-center justify-end text-[16px] text-black/90 font-medium gap-6 lg:gap-8">
          
          <!-- Auth Links -->
          <div class="hidden lg:flex items-center gap-1.5 font-normal text-[15px] text-[#252525]">
            <a href="#" class="flex items-center gap-1.5 hover:text-brand-red transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              เข้าสู่ระบบ
            </a>
            <span class="text-black mx-1">|</span>
            <a href="#" class="hover:text-brand-red transition-colors">ลงทะเบียน</a>
          </div>

          <!-- Icons Group (Heart + Cart) -->
          <div class="flex items-center gap-4">
            <!-- Heart Icon -->
            <a href="#" class="text-black/90 hover:text-brand-red transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[25px] h-[25px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <!-- Geometric Heart with straight V bottom -->
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </a>

            <!-- Cart (Unchanged SVG and Badge as requested) -->
            <a href="#" class="text-black/90 hover:text-brand-red transition-colors flex items-center relative pr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <!-- Badge -->
              <span class="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white leading-none">0</span>
            </a>
          </div>

        </div>
      </div>
    </header>

  <!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->
  <nav class="w-full bg-brand-green h-[38px] md:h-[44px] relative z-50 overflow-x-auto lg:overflow-visible no-scrollbar">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 relative h-full flex items-center justify-between">
      
      <!-- ปุ่มเลือกตามหมวดหมู่ (ฝั่งซ้าย) -->
      <div id="category-menu-btn" class="h-full flex items-center gap-2 text-white font-semibold text-[13.5px] md:text-[14px] cursor-pointer hover:bg-white/15 px-3 md:px-4 -ml-3 md:-ml-4 rounded-md transition-all shrink-0 select-none group">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[17px] h-[17px] text-white transition-transform duration-200 group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
        </svg>
        <span>เลือกตามหมวดหมู่</span>
        <svg id="category-menu-arrow" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white/80 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <!-- เมนูตรงกลาง (Center Aligned) -->
      <div class="hidden lg:flex flex-1 justify-center h-full items-center gap-8 lg:gap-10 xl:gap-12 whitespace-nowrap">
        
        <!-- มี V (Dropdown): เปลี่ยนตัวหนังสือเป็นสีแดง + เส้นใต้หนาสีแดงชิดขอบล่าง -->
        <div class="relative h-full flex items-center group cursor-pointer" tabindex="0">
          <!-- Text and Arrow -->
          <div class="flex items-center gap-1 text-white group-hover:text-brand-red font-medium text-[13.5px] md:text-[14px] transition-colors h-full px-1">
            กลุ่มลวดเชื่อม
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white group-hover:text-brand-red transition-all duration-300 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
          
          <!-- Dropdown Box (8 Categories) -->
          <div class="hidden group-hover:block absolute top-[100%] left-1/2 -translate-x-1/2 w-[220px] bg-white rounded-b-lg shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 z-[60]">
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมเหล็ก</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมสแตนเลส</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมอลูมิเนียม</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมเหล็กหล่อ</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมทองเหลือง-ทองแดงและเงิน</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมพอกผิวแข็ง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมตัดเซาะร่อง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมวัสดุเกรดพิเศษ</a>
          </div>
          
          <!-- Thick Red Underline -->
          <span class="absolute bottom-0 left-0 w-full h-[3px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity z-[61]"></span>
        </div>

        <!-- ไม่มี V: เปลี่ยนตัวหนังสือเป็นสีแดง ไม่มีเส้นใต้ -->
        <a href="#" class="h-full flex items-center gap-1.5 text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
          </svg>
          โปรโมชั่น
        </a>

        <a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          เกี่ยวกับเรา
        </a>

        <a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          ข่าวสารอัปเดต
        </a>

        <a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          ติดต่อเรา
        </a>

      </div>

      <!-- บล็อกสมดุลฝั่งขวา (Invisible Spacer) เพื่อให้เมนูกลางอยู่ตรงกลางจริงๆ -->
      <div class="hidden lg:block w-[140px] xl:w-[160px] shrink-0 pointer-events-none"></div>

    </div>
  </nav>

  <!-- Mega Menu Dropdown (BaNANA Exact Style) -->
  <div id="desktop-mega-menu" class="hidden absolute flex-col top-[100%] left-0 w-screen bg-white border-t border-gray-100 shadow-2xl cursor-default z-[60]">
    <!-- Centered Content Wrapper (1360px) -->
    <div class="w-full max-w-[1360px] mx-auto flex h-[480px]">
      
      <!-- Left Sidebar (Main Categories) -->
      <div class="w-[280px] bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar py-6 pr-4 pl-4 md:pl-8 lg:pl-12 group/sidebar">
        <!-- Active Item (Green rounded rectangle) -->
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 font-semibold text-[16px] rounded-lg transition-colors bg-brand-green text-white group-hover/sidebar:bg-transparent group-hover/sidebar:text-[#252525] hover:!bg-brand-green hover:!text-white group">
          <span class="flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white group-hover/sidebar:text-gray-400 hover:!text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        
        <!-- Normal Items (No border, plain text, rounded hover effect) -->
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          กลุ่มลวดเชื่อม
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          เครื่องเชื่อมและเครื่องตัดพลาสม่า
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          อุปกรณ์เชื่อมตัดเผาแก๊ส
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          ท่อบรรจุก๊าซและวาล์ว
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          ใบตัดใบเจียร
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          อะไหล่สิ้นเปลือง เครื่องเชื่อม-พลาสม่า
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          เครื่องมือช่าง
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      <!-- Right Content Area (Subcategories) -->
      <div class="flex-1 bg-white pl-10 pr-4 md:pr-8 lg:pr-12 py-8 overflow-y-auto custom-scrollbar">
        <!-- Section Header (Green text) -->
        <a href="#" class="text-brand-green font-semibold text-[16px] mb-8 flex items-center gap-2 w-fit hover:opacity-80 transition-all">
          🔥 โปรโมชั่นพิเศษ ทั้งหมด
        </a>
        
        <!-- Grid 3 Columns -->
        <div class="grid grid-cols-3 gap-x-12">
          
          <!-- Column 1 -->
          <div class="flex flex-col">
            <div class="border-b border-gray-200 pb-7 mb-7">
              <a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">โปรโมชั่นลวดเชื่อม</a>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">ลดล้างสต็อก ลวดเชื่อม KOBE</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ซื้อ 10 ลัง แถม 1 ลัง</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมสแตนเลส ลด 15%</a></li>
              </ul>
            </div>
            <div class="border-b border-gray-200 pb-7 mb-7">
              <a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">ลวดเชื่อมลดราคา</a>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมอลูมิเนียม</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ลวดเชื่อมเหล็กหล่อ</a></li>
              </ul>
            </div>
          </div>

          <!-- Column 2 -->
          <div class="flex flex-col">
            <div class="border-b border-gray-200 pb-7 mb-7">
              <a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">โปรโมชั่นตู้เชื่อม</a>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">ตู้เชื่อม JASIC ลดสูงสุด 20%</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">แถมฟรี สายเชื่อม 10 เมตร</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ผ่อน 0% นาน 10 เดือน</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ตู้พลาสม่า คุ้มสุดๆ</a></li>
              </ul>
            </div>
            <div class="border-b border-gray-200 pb-7 mb-7">
              <a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">แบรนด์ยอดฮิต</a>
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
              <a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">อุปกรณ์เซฟตี้</a>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">หน้ากากเชื่อมปรับแสงอัตโนมัติ</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">ถุงมือหนังเชื่อม 1 แถม 1</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">เอี๊ยมหนังกันสะเก็ดไฟ</a></li>
              </ul>
            </div>
            <div class="pb-7 mb-7">
              <a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">สินค้าอื่นๆ</a>
              <ul class="space-y-2.5 text-[16px] text-gray-600 font-normal">
                <li><a href="#" class="hover:text-brand-red transition-colors">อะไหล่หัวเชื่อม</a></li>
                <li><a href="#" class="hover:text-brand-red transition-colors">เกจ์ลม เกจ์แก๊ส</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Mega Menu Trust Bar (Bottom Footer of Dropdown) -->
    <div class="w-full bg-white border-t border-gray-100">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-200 py-5">
          
          <!-- 1. Expertise (Trust) -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">สินค้าคุณภาพมาตรฐาน</div>
              <div class="text-[13px] text-gray-800 leading-snug">ทีมงานผู้เชี่ยวชาญให้คำปรึกษา</div>
            </div>
          </div>

          <!-- 2. Shipping -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 19H2v-9a2 2 0 012-2h10a2 2 0 012 2v3m4 0h-4v6h4a2 2 0 002-2v-3l-2.5-3.5H16"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">จัดส่งทั่วประเทศ</div>
              <div class="text-[13px] text-gray-800 leading-snug">รวดเร็ว ทันใจ ปลอดภัย</div>
            </div>
          </div>

          <!-- 3. Contact (Phone) -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">062-815-9999</div>
              <div class="text-[13px] text-gray-800 leading-snug">บริการทุกวัน 09.00 - 18.00 น.</div>
            </div>
          </div>

          <!-- 4. Email -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">ส่งอีเมล</div>
              <div class="text-[13px] text-gray-800 leading-snug">ถึงเรา</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
  <main class="w-full bg-white">
    <!-- Hero Slider Section (ปรับเป็น Auto Height โชว์รูปเต็มกว้าง) -->
    <section class="relative w-full bg-black overflow-hidden group">
      <!-- Slider Container -->
      <div id="heroSlider" class="grid w-full">
        
        <!-- Slide 1 -->
        <div class="col-start-1 row-start-1 w-full opacity-100 z-10 transition-opacity duration-300 ease-in-out relative">
          <img src="/images/banners/Banner_0.png" alt="Banner 1" class="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] object-cover object-center block" />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent z-0"></div>
          
          <!-- Text Content -->
          <div class="absolute inset-0 z-10 w-full h-full max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center pointer-events-none">
            <div class="max-w-2xl ml-auto md:mr-10 lg:mr-20 text-left pointer-events-auto">
              <h1 class="text-white font-bold text-[36px] md:text-[48px] lg:text-[56px] leading-[1.12] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight">
                ผู้เชี่ยวชาญ<br />ด้านงานเชื่อม
              </h1>
              <p class="text-white/95 text-[18px] md:text-[20px] lg:text-[24px] font-medium mb-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-[1.5]">
                รองรับงานโครงการทุกระดับ<br />ช่วยลดต้นทุน เพิ่มประสิทธิภาพ
              </p>
              <a href="#" class="inline-flex items-center justify-center px-6 md:px-7 h-[44px] md:h-[48px] text-[18px] md:text-[20px] font-semibold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-md hover:scale-105">
                ขอใบเสนอราคา
              </a>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="col-start-1 row-start-1 w-full opacity-0 z-0 transition-opacity duration-300 ease-in-out relative">
          <img src="/images/banners/Banner_0.png" alt="Banner 2" class="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] object-cover object-center block" />
          
          <div class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent z-0"></div>
          
          <div class="absolute inset-0 z-10 w-full h-full max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center pointer-events-none">
            <div class="max-w-2xl ml-auto md:mr-10 lg:mr-20 text-left pointer-events-auto">
              <h1 class="text-white font-bold text-[36px] md:text-[48px] lg:text-[56px] leading-[1.12] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight">
                ลวดเชื่อมคุณภาพ<br />ระดับโลก
              </h1>
              <p class="text-white/95 text-[18px] md:text-[20px] lg:text-[24px] font-medium mb-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-[1.5]">
                มาตรฐานอุตสาหกรรมสากล<br />พร้อมสต็อกสินค้าพร้อมส่งทันที
              </p>
              <a href="#" class="inline-flex items-center justify-center px-6 md:px-7 h-[44px] md:h-[48px] text-[18px] md:text-[20px] font-semibold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-md hover:scale-105">
                ดูสินค้าทั้งหมด
              </a>
            </div>
          </div>
        </div>

        
      </div>

      <!-- Navigation Arrows (สไตล์สี่เหลี่ยมโปร่งแสงขอบมนทุกด้าน ขนาดเล็กลง) -->
      <button id="prevSlide" class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button id="nextSlide" class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-7 h-12 md:w-8 md:h-14 bg-black/10 hover:bg-black/20 backdrop-blur-sm shadow-md flex items-center justify-center text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Indicators (จุดและขีด) ย้ายไปตรงกลางจอ และติดบนหน่อยตามรูปเรฟ -->
      <div class="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20" id="sliderIndicators">
        <!-- JS จะสร้างจุดและขีดตรงนี้ -->
      </div>
    
      </section>

    


    <!-- โซน 1: แบรนด์และหมวดหมู่หลัก (พื้นหลังสีขาว เพื่อแยกส่วน) -->
    <div class="w-full bg-white pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12">
      
      <!-- Section 1: Brand Strip (Apple Style Minimal Icons with Labels) -->
      <section class="mt-1 md:mt-2 lg:mt-2 mb-16 md:mb-24 lg:mb-28">
        <h2 class="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 tracking-tight mb-10 md:mb-14 lg:mb-18">
          แบรนด์ชั้นนำ
        </h2>
        
        <!-- Brand Icons Strip -->
        <div class="flex items-start justify-between gap-4 md:gap-8 overflow-x-auto no-scrollbar py-3 md:py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          
          <!-- Brand 1: ESAB -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/logo-esab.webp" alt="ESAB" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              ESAB
            </span>
          </a>
          
          <!-- Brand 2: HOBART -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/hobart-logo.svg" alt="HOBART" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              HOBART
            </span>
          </a>
          
          <!-- Brand 3: Fronius -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/fronius-logo.webp" alt="Fronius" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              Fronius
            </span>
          </a>
          
          <!-- Brand 4: Hypertherm -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/hypertherm.webp" alt="HYPERTHERM" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              Hypertherm
            </span>
          </a>
          
          <!-- Brand 5: Kemppi -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/kemppi-logo.svg" alt="KEMPPI" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              Kemppi
            </span>
          </a>
          
          <!-- Brand 6: Lincoln Electric -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/lincoln-electric.svg" alt="Lincoln Electric" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              Lincoln Electric
            </span>
          </a>
          
          <!-- Brand 7: Miller -->
          <a href="#" class="group flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[120px] text-center">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-110">
              <img src="/images/brands/miller-logo.webp" alt="Miller" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" />
            </div>
            <span class="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              Miller
            </span>
          </a>
          
        </div>
      </section>

      <!-- Section: Category Highlight (Gradient Block - Welding Wires) -->
      <section class="mt-16 md:mt-24 lg:mt-32 mb-4 md:mb-6">
        <h2 class="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 tracking-tight mb-10 md:mb-14 lg:mb-16">
          ลวดเชื่อมยอดนิยม
        </h2>
        <div class="w-full rounded-[24px] lg:rounded-[32px] bg-gradient-to-r from-[#d1f2de] via-[#e6f9cd] to-[#ecfccb] p-6 md:p-8 lg:p-10 shadow-[0_4px_20px_rgba(113,192,76,0.08)] relative overflow-hidden">
          
          <!-- Decorative Elements -->
          <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-[#71C04C] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div class="absolute bottom-0 left-10 w-[200px] h-[200px] bg-[#71C04C] opacity-10 rounded-full blur-2xl translate-y-1/3 pointer-events-none"></div>

          <!-- 2x4 Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 relative z-10">
             
             <!-- Card 1 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/steel.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมเหล็ก">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมเหล็ก</h3>
             </a>

             <!-- Card 2 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/stainless.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมสแตนเลส">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมสแตนเลส</h3>
             </a>

             <!-- Card 3 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/aluminum.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมอลูมิเนียม">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมอลูมิเนียม</h3>
             </a>

             <!-- Card 4 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/cast-iron.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมเหล็กหล่อ">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมเหล็กหล่อ</h3>
             </a>

             <!-- Card 5 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/brass-copper.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมทองเหลือง-ทองแดงและเงิน">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)] pr-4">เชื่อมทองเหลือง<br>ทองแดงและเงิน</h3>
             </a>

             <!-- Card 6 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/hardfacing.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมพอกผิวแข็ง">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมพอกผิวแข็ง</h3>
             </a>

             <!-- Card 7 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/gouging.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมตัดเซาะร่อง">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมตัดเซาะร่อง</h3>
             </a>

             <!-- Card 8 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/special-alloys.png" class="absolute inset-0 w-full h-full object-cover object-center" alt="เชื่อมวัสดุเกรดพิเศษ">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[20px] md:text-[22px] lg:text-[24px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">เชื่อมวัสดุเกรดพิเศษ</h3>
             </a>
             
          </div>
        </div>
      </section>

      <!-- Section: Category Shortcuts (Bento Grid 8 Items) -->
      <section class="mt-16 md:mt-28 lg:mt-36 mb-4 md:mb-6">
        <h2 class="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 tracking-tight mb-10 md:mb-14 lg:mb-16">
          เลือกตามหมวดหมู่
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          
          <!-- Row 1 -->
          <!-- Card 1: กลุ่มลวดเชื่อม (Span 2, Dark Style) -->
          <a href="#" class="md:col-span-2 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                กลุ่มลวดเชื่อม
              </h3>
            </div>
            <!-- Mock Image Placeholder -->
            <div class="absolute bottom-0 right-0 w-[50%] h-[80%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 2: เครื่องเชื่อมและเครื่องตัดพลาสม่า (Span 1, Premium Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <!-- Background Image with Hover Zoom Effect -->
            <div class="absolute inset-0 bg-[url('/images/bg-welding.jpeg')] bg-cover bg-right-bottom bg-no-repeat"></div>
            <!-- Gradient Overlay (Dark Top-Left for Text Readability) -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/20 to-transparent z-0"></div>
            
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300 shadow-black/50 drop-shadow-md">
                เครื่องเชื่อมและ<br />เครื่องตัดพลาสม่า
              </h3>
            </div>
          </a>

          <!-- Row 2 -->
          <!-- Card 3: อุปกรณ์เชื่อมตัดเผาแก๊ส (Span 1, Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อุปกรณ์เชื่อม<br />ตัดเผาแก๊ส
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 4: ท่อบรรจุก๊าซและวาล์ว (Span 1, Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                ท่อบรรจุก๊าซ<br />และวาล์ว
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[70%] h-[70%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 5: ใบตัดใบเจียร (Span 1, Dark Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                ใบตัดใบเจียร
              </h3>
            </div>
            <div class="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Row 3 -->
          <!-- Card 6: อะไหล่สิ้นเปลือง เครื่องเชื่อม-พลาสม่า (Span 1, Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อะไหล่สิ้นเปลือง<br />เครื่องเชื่อม-พลาสม่า
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 7: วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม (Span 1, Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                วัสดุอุปกรณ์เคมีภัณฑ์<br />สำหรับงานเชื่อม
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 8: เครื่องมือช่าง (Span 1, Dark Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องมือช่าง
              </h3>
            </div>
            <div class="absolute bottom-0 right-0 w-[70%] h-[70%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

        </div>
      </section>
      </div>
    </div>

    <!-- โซน 2: สินค้าเข้าใหม่และโปรโมชั่น (พื้นหลังสีเทาอ่อน #F8F8F8 เพื่อให้การ์ดสินค้าสีขาวเด่น) -->
    <div class="w-full bg-[#F8F8F8] pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-20 lg:pb-24">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12">
      
      <!-- Section 2: สินค้าเข้าใหม่ -->
      <section class="mb-6 md:mb-8">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[24px] md:text-[28px] font-semibold text-gray-900 tracking-tight">
              สินค้าเข้าใหม่
            </h2>
            <!-- Fire/Hot Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#E12427] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          
          <div class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
            
            <!-- Card 1 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿650</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

            <!-- Card 2 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿450</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

            <!-- Card 3 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="MIG ER70S-6" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=MIG+ER70S-6'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อม MIG / MAG (CO2) ER70S-6 ขนาด 0.8 มม. (15 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานเชื่อมแก๊ส | แนวเชื่อมสวย | ทนแรงดึง | สำหรับงานโครงสร้าง
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿1,250</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ม้วน</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="1,250" data-unit="ม้วน">ม้วน</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="85,000" data-unit="พาเลท">พาเลท (72 ม้วน)</button>
                </div>
                  <div class="cart-control flex justify-end" data-unit="ม้วน">
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ม้วน</span>
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

            <!-- Card 4 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="Gouging" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Gouging'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเซาะร่อง (Gouging) ขนาด 6.4 มม.
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เซาะร่อง | กำจัดรอยร้าว | ทนกระแสไฟสูง | ตัดโลหะรวดเร็ว
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿320</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/กล่อง</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="320" data-unit="กล่อง">กล่อง</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="3,000" data-unit="ลัง">ลัง (10 กล่อง)</button>
                </div>
                  <div class="cart-control flex justify-end" data-unit="กล่อง">
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">กล่อง</span>
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
            
            <!-- Card 5 (Duplicated to allow scrolling on Desktop) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿650</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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
            
            <!-- Card 6 (Duplicated) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿450</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

          <!-- Navigation Buttons -->
          <button class="pslider-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center opacity-0 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="pslider-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicators (Dots) Bottom Right -->
          <div class="absolute bottom-1 right-2 flex items-center gap-1.5 pslider-dots z-10">
            <!-- Handled by JS -->
          </div>
        </div>

      </section>

      <!-- Section 3: ขายดีประจำเดือน -->
      <section class="mb-6 md:mb-8">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[24px] md:text-[28px] font-semibold text-gray-900 tracking-tight">
              ขายดีประจำเดือน
            </h2>
            <!-- Fire/Hot Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#E12427] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          
          <div class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
            
            <!-- Card 1 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿650</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

            <!-- Card 2 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿450</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

            <!-- Card 3 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="MIG ER70S-6" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=MIG+ER70S-6'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อม MIG / MAG (CO2) ER70S-6 ขนาด 0.8 มม. (15 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานเชื่อมแก๊ส | แนวเชื่อมสวย | ทนแรงดึง | สำหรับงานโครงสร้าง
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿1,250</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ม้วน</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="1,250" data-unit="ม้วน">ม้วน</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="85,000" data-unit="พาเลท">พาเลท (72 ม้วน)</button>
                </div>
                  <div class="cart-control flex justify-end" data-unit="ม้วน">
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ม้วน</span>
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

            <!-- Card 4 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="Gouging" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Gouging'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเซาะร่อง (Gouging) ขนาด 6.4 มม.
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เซาะร่อง | กำจัดรอยร้าว | ทนกระแสไฟสูง | ตัดโลหะรวดเร็ว
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿320</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/กล่อง</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="320" data-unit="กล่อง">กล่อง</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="3,000" data-unit="ลัง">ลัง (10 กล่อง)</button>
                </div>
                  <div class="cart-control flex justify-end" data-unit="กล่อง">
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">กล่อง</span>
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
            
            <!-- Card 5 (Duplicated to allow scrolling on Desktop) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿650</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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
            
            <!-- Card 6 (Duplicated) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿450</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

          <!-- Navigation Buttons -->
          <button class="pslider-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center opacity-0 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="pslider-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicators (Dots) Bottom Right -->
          <div class="absolute bottom-1 right-2 flex items-center gap-1.5 pslider-dots z-10">
            <!-- Handled by JS -->
          </div>
        </div>

      </section>

      <!-- Section 4: คัดมาเพื่อคุณ -->
      <section class="mb-4 md:mb-6">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[24px] md:text-[28px] font-semibold text-gray-900 tracking-tight">
              คัดมาเพื่อคุณ
            </h2>
            <!-- Fire/Hot Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#E12427] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          
          <div class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
            
            <!-- Card 1 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿650</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

            <!-- Card 2 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿450</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

            <!-- Card 3 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="MIG ER70S-6" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=MIG+ER70S-6'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อม MIG / MAG (CO2) ER70S-6 ขนาด 0.8 มม. (15 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานเชื่อมแก๊ส | แนวเชื่อมสวย | ทนแรงดึง | สำหรับงานโครงสร้าง
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿1,250</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ม้วน</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="1,250" data-unit="ม้วน">ม้วน</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="85,000" data-unit="พาเลท">พาเลท (72 ม้วน)</button>
                </div>
                  <div class="cart-control flex justify-end" data-unit="ม้วน">
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ม้วน</span>
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

            <!-- Card 4 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="Gouging" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Gouging'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเซาะร่อง (Gouging) ขนาด 6.4 มม.
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เซาะร่อง | กำจัดรอยร้าว | ทนกระแสไฟสูง | ตัดโลหะรวดเร็ว
              </p>
              <div class="mt-auto flex flex-col">
                
                <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿320</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/กล่อง</span>
                  </div>
                <div class="flex items-center justify-between mt-2.5">
                  <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="320" data-unit="กล่อง">กล่อง</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="3,000" data-unit="ลัง">ลัง (10 กล่อง)</button>
                </div>
                  <div class="cart-control flex justify-end" data-unit="กล่อง">
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">กล่อง</span>
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
            
            <!-- Card 5 (Duplicated to allow scrolling on Desktop) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿650</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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
            
            <!-- Card 6 (Duplicated) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[14px] text-gray-900 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1 mt-2.5">
                    <span class="text-[#FF3B30] font-bold text-[19px] price-display">฿450</span>
                    <span class="text-gray-900 text-[12px] font-medium price-unit">/ห่อ</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-900 font-medium unit-text">ห่อ</span>
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

          <!-- Navigation Buttons -->
          <button class="pslider-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center opacity-0 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="pslider-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicators (Dots) Bottom Right -->
          <div class="absolute bottom-1 right-2 flex items-center gap-1.5 pslider-dots z-10">
            <!-- Handled by JS -->
          </div>
        </div>

      </section>

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
    <section class="w-full bg-[#F8F8F8] pt-12 md:pt-16 lg:pt-24 pb-20 md:pb-28 lg:pb-32 overflow-hidden">
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
    <!-- Main Footer Content -->
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-12">
            <!-- Trust Bar (Top Footer) -->
      <div class="border-b border-gray-200 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-200 pt-16 pb-8">
          
          <!-- 1. Expertise (Trust) -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">สินค้าคุณภาพมาตรฐาน</div>
              <div class="text-[13px] text-gray-800 leading-snug">ทีมงานผู้เชี่ยวชาญให้คำปรึกษา</div>
            </div>
          </div>

          <!-- 2. Shipping -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 19H2v-9a2 2 0 012-2h10a2 2 0 012 2v3m4 0h-4v6h4a2 2 0 002-2v-3l-2.5-3.5H16"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">จัดส่งทั่วประเทศ</div>
              <div class="text-[13px] text-gray-800 leading-snug">รวดเร็ว ทันใจ ปลอดภัย</div>
            </div>
          </div>

          <!-- 3. Contact (Phone) -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">062-815-9999</div>
              <div class="text-[13px] text-gray-800 leading-snug">บริการทุกวัน 09.00 - 18.00 น.</div>
            </div>
          </div>

          <!-- 4. Email -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">ส่งอีเมล</div>
              <div class="text-[13px] text-gray-800 leading-snug">ถึงเรา</div>
            </div>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
        
        <!-- Col 1 -->
        <div class="flex flex-col lg:col-span-2 pr-0 lg:pr-8">
          <!-- Logo -->
          <a href="/" class="shrink-0 mb-4 inline-block hover:opacity-80 transition-opacity w-fit">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain object-left" />
          </a>
          
          <!-- Brand Description -->
          <p class="text-gray-900 text-[13.5px] md:text-[14.5px] leading-relaxed mb-4">
            ผู้จัดจำหน่ายลวดเชื่อมและอุปกรณ์งานเชื่อม สำหรับโรงงานอุตสาหกรรมและช่างเชื่อมทั่วไป
          </p>



        </div>

        <!-- Col 2: หมวดหมู่สินค้า -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">หมวดหมู่สินค้า</h3>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">กลุ่มลวดเชื่อม</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">เครื่องเชื่อมและเครื่องตัดพลาสม่า</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">อุปกรณ์เชื่อมตัดเผาแก๊ส</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ท่อบรรจุก๊าซและวาล์ว</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ใบตัดใบเจียร</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">อะไหล่สิ้นเปลือง เครื่องเชื่อม-พลาสม่า</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">เครื่องมือช่าง</a>
        </div>

        <!-- Col 3 -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">เกี่ยวกับ UDO</h3>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">เกี่ยวกับเรา</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ติดต่อเรา</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ข้อตกลงและเงื่อนไข</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">นโยบายความเป็นส่วนตัว</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">นโยบายคุกกี้</a>
        </div>

        <!-- Col 4 -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการลูกค้า</h3>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ขอใบเสนอราคา</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">คำถามที่พบบ่อย</a>
        </div>

        <!-- Col 5 -->
        <div class="flex flex-col">
          <!-- Verified By -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">Verified by</h3>
          <div class="flex items-center gap-3.5 mb-8">
            <img src="/images/footer-logos/dbd.png" alt="DBD Registered" class="h-6 md:h-[30px] w-auto object-contain" />
            <img src="/images/footer-logos/mastercard.png" alt="Mastercard" class="h-4 md:h-[22px] w-auto object-contain" />
            <img src="/images/footer-logos/visa.png" alt="Visa" class="h-4 md:h-[22px] w-auto object-contain" />
          </div>

          <!-- ติดตามเรา -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2.5 mb-8 flex-wrap">
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/facebook.webp" alt="Facebook" class="w-6 h-6 md:w-7 md:h-7 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/instagram.webp" alt="Instagram" class="w-6 h-6 md:w-7 md:h-7 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/line.webp" alt="Line" class="w-6 h-6 md:w-7 md:h-7 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/tiktok.webp" alt="TikTok" class="w-6 h-6 md:w-7 md:h-7 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/x.webp" alt="X" class="w-6 h-6 md:w-7 md:h-7 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/youtube.webp" alt="YouTube" class="w-6 h-6 md:w-7 md:h-7 object-contain" /></a>
          </div>

          <!-- บริการจัดส่ง -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">บริการจัดส่ง</h3>
          <div class="flex items-center gap-4">
            <img src="/images/footer-logos/kerry.webp" alt="Kerry Express" class="h-5 md:h-[24px] w-auto object-contain" />
            <img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-[18px] md:h-[22px] w-auto object-contain" />
            <img src="/images/footer-logos/thai-post.png" alt="Thailand Post" class="h-6 md:h-[30px] w-auto object-contain" />
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="bg-black text-white w-full border-t border-gray-800">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-4 flex flex-col md:flex-row items-center justify-between text-[13px] gap-2 md:gap-0">
        <div class="text-gray-300 text-center md:text-left">
          &copy; Copyright 2019 UDO Welding Wire Center. All Rights Reserved.
        </div>
        <div class="text-gray-300 text-center md:text-right">
          149 ถ. จันทน์ แขวงทุ่งวัดดอน เขตสาทร กรุงเทพมหานคร 10120
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
        <!-- Magnifying Glass -->
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        <!-- AI Sparkle (Top Right) -->
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight">ถาม UDO AI</span>
    </a>

    <!-- Item 2: โทรเช็กสต็อก -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight">โทรเช็กสต็อก</span>
    </a>

    <!-- Item 3: ขอใบเสนอราคา -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight">ขอใบเสนอราคา</span>
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
      sibling.classList.add('text-gray-900');
    });

    // Add active state to clicked button
    btn.classList.add('active', 'bg-white', 'shadow-sm', 'text-gray-900');
    btn.classList.remove('text-gray-900');

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


