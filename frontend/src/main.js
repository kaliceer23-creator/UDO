import './style.css'

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
  <div class="sticky top-0 z-[60] w-full shadow-sm">
        <!-- 1. แถบสีขาวด้านบน (Main Header) -->
    <header class="w-full bg-white border-b border-gray-100">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 py-2 md:py-2.5 flex items-center gap-6">
        
        <!-- Hamburger + Logo -->
        <div class="flex items-center gap-0 shrink-0">
          <!-- Hamburger Icon -->
          <button class="text-black/90 hover:text-brand-red transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          
          <!-- Logo -->
          <a href="/" class="hover:opacity-80 transition-opacity -ml-1">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-12 md:h-[60px] w-auto object-contain" />
          </a>
        </div>
        
        <!-- Search Bar Area (BaNANA Style) -->
        <div class="hidden md:flex flex-1 max-w-[460px] lg:max-w-[520px] items-center mx-auto">
          
          <!-- "ทั้งหมด" dropdown -->
          <div class="flex items-center gap-1.5 text-[16px] text-black/90 font-normal cursor-pointer hover:text-brand-red whitespace-nowrap pl-2">
            <span>ทั้งหมด</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          
          <!-- Search Input Container (Bottom Border) -->
          <div class="flex-1 ml-5 mr-3 flex items-center h-[44px] border-b border-gray-300 focus-within:border-brand-red transition-colors">
            <input 
              type="text" 
              placeholder="ค้นหาสินค้าที่ต้องการที่นี่....."
              class="w-full bg-transparent text-[16px] text-black/90 font-normal outline-none placeholder-black/90 h-full px-1"
            />
          </div>
          
          <!-- Search Button (Brand Red instead of Yellow) -->
          <button class="bg-[#E32626] hover:bg-[#C92222] text-white w-[64px] h-[44px] rounded-[4px] flex items-center justify-center transition-colors shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
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
  <nav class="w-full bg-brand-green h-[36px] md:h-[42px] relative z-50 overflow-x-auto lg:overflow-visible no-scrollbar">
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 relative h-full flex items-center justify-between gap-6 whitespace-nowrap text-[15px]">
      
      <!-- หมวดหมู่พิเศษ (โปรโมชั่น - ไม่มีกรอบขาวแล้ว) -->
      <a href="#" class="flex items-center gap-1.5 text-white hover:text-gray-200 font-medium transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
        </svg>
        โปรโมชั่นฮอต
      </a>

      <!-- หมวดหมู่สินค้าหลัก (ปรับตามโครงสร้างสินค้าจริงของ UDO) -->
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors group">
        ตู้เชื่อม/พลาสม่า
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      <!-- เมนู กลุ่มลวดเชื่อม (พร้อม Mega Menu Dropdown) -->
      <div class="h-full flex items-center group cursor-pointer static">
        <a href="#" class="relative text-white group-hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors h-full flex items-center">
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
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมเหล็ก</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซับเมอร์ค (SAW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแก๊ส (Brazing)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมสแตนเลส</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
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
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมอลูมิเนียม</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแก๊ส (Brazing)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมเหล็กหล่อ</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                </ul>
              </div>
            </div>

            <!-- Column 3 -->
            <div class="space-y-8">
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมวัสดุเกรดพิเศษ</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซับเมอร์ค (SAW)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแม่พิมพ์</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมพอกผิวแข็ง</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมฟลักซ์คอร์ส (FCW)</a></li>
                </ul>
              </div>
            </div>

            <!-- Column 4 -->
            <div class="space-y-8">
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมทองเหลืองทองแดงและเงิน</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมอาร์กอน (TIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมซีโอทู (MIG)</a></li>
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมแก๊ส (Brazing)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมตัดเจาะร่อง</h3>
                <ul class="space-y-2 text-[14px] text-gray-600 font-medium mt-3">
                  <li><a href="#" class="hover:text-brand-red transition-colors">เชื่อมไฟฟ้า (MMA)</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-gray-900 font-medium text-[16px] mb-3 border-b-2 border-brand-red inline-block pb-1">เชื่อมทังสเตน</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors group">
        ใบตัด/ใบเจียร
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors group">
        อุปกรณ์เชื่อมตัดแก๊ส
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors group">
        ท่อบรรจุก๊าซและวาล์ว
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      
      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors group">
        อะไหล่สิ้นเปลือง
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>
      

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[15px] xl:text-[16px] transition-colors group">
        เครื่องมือช่าง
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>

    </div>
  </nav>
  </div>

  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
  <main class="w-full bg-white pb-20">
    <!-- Hero Slider Section (ปรับความสูงเพิ่มขึ้นอีกนิดเดียว) -->
    <section class="relative w-full h-[65vh] md:h-[80vh] lg:h-[calc(100vh-160px)] bg-black overflow-hidden group">
      <!-- Slider Container -->
      <div id="heroSlider" class="relative w-full h-full">
        
        <!-- Slide 1 -->
        <div class="absolute inset-0 w-full h-full opacity-100 z-10 transition-opacity duration-300 ease-in-out">
          <!-- Gradient Overlay (ไล่สีดำจากขวามาซ้าย เพื่อให้ตัวหนังสือบนรูปอ่านง่าย) -->
          <div class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent z-0"></div>
          <img src="/images/banners/Banner_0.png" alt="Banner 1" class="w-full h-full object-cover object-center absolute inset-0 -z-10" />
          
          <!-- Text Content (จัดวางชิดขวาแบบ Modern) -->
          <div class="relative z-10 w-full h-full max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center">
            <div class="max-w-2xl ml-auto md:mr-10 lg:mr-20 text-left">
              <h1 class="text-white font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight">
                ผู้เชี่ยวชาญ<br />ด้านงานเชื่อม
              </h1>
              <p class="text-white/95 text-[18px] md:text-[20px] lg:text-[24px] font-medium mb-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-[1.5]">
                รองรับงานโครงการทุกระดับ<br />ช่วยลดต้นทุน เพิ่มประสิทธิภาพ
              </p>
              <a href="#" class="inline-flex items-center justify-center px-6 py-2 md:py-2.5 text-[14px] md:text-[15px] font-bold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-sm">
                ขอใบเสนอราคา
              </a>
            </div>
          </div>
        </div>

        <!-- Slide 2 (จำลองรูปเดียวกัน แต่เปลี่ยนข้อความ) -->
        <div class="absolute inset-0 w-full h-full opacity-0 z-0 transition-opacity duration-300 ease-in-out">
          <div class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent z-0"></div>
          <img src="/images/banners/Banner_0.png" alt="Banner 2" class="w-full h-full object-cover object-center absolute inset-0 -z-10" />
          <div class="relative z-10 w-full h-full max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center">
            <div class="max-w-2xl ml-auto md:mr-10 lg:mr-20 text-left">
              <h1 class="text-white font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight">
                ลวดเชื่อมคุณภาพ<br />ระดับโลก
              </h1>
              <p class="text-white/95 text-[18px] md:text-[20px] lg:text-[24px] font-medium mb-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-[1.5]">
                มาตรฐานอุตสาหกรรมสากล<br />พร้อมสต็อกสินค้าพร้อมส่งทันที
              </p>
              <a href="#" class="inline-flex items-center justify-center px-6 py-2 md:py-2.5 text-[14px] md:text-[15px] font-bold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-sm">
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

    <!-- Section: Bento Categories (Landy Home Style) -->
    <section class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
        
        <!-- Row 1 -->
        <!-- Card 1: 2/3 width (col-span-4) -->
        <a href="#" class="relative block h-[220px] md:h-[300px] md:col-span-4 bg-[#86BFE6] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-white leading-tight">กลุ่มลวดเชื่อม</h3>
          </div>
        </a>
        
        <!-- Card 2: 1/3 width (col-span-2) -->
        <a href="#" class="relative block h-[220px] md:h-[300px] md:col-span-2 bg-[#EBF0F5] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">ท่อบรรจุก๊าซ<br>และวาล์ว</h3>
          </div>
        </a>
        
        <!-- Row 2 -->
        <!-- Card 3: Full width (col-span-6) -->
        <a href="#" class="relative block h-[200px] md:h-[260px] md:col-span-6 bg-[#332E2C] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-white leading-tight">เครื่องเชื่อมและ<br>เครื่องตัดพลาสม่า</h3>
          </div>
        </a>
        
        <!-- Row 3 -->
        <!-- Card 4, 5, 6: 1/3 width each (col-span-2) -->
        <a href="#" class="relative block h-[240px] md:h-[320px] md:col-span-2 bg-[#1A1A1A] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-white leading-tight">วัสดุอุปกรณ์เคมีภัณฑ์<br>สำหรับงานเชื่อม</h3>
          </div>
        </a>
        <a href="#" class="relative block h-[240px] md:h-[320px] md:col-span-2 bg-[#F3F4F6] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">อุปกรณ์เชื่อม<br>ตัดเผาแก๊ส</h3>
          </div>
        </a>
        <a href="#" class="relative block h-[240px] md:h-[320px] md:col-span-2 bg-[#EAE8E3] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">ใบตัดใบเจียร</h3>
          </div>
        </a>
        
        <!-- Row 4 -->
        <!-- Card 7, 8: 1/2 width each (col-span-3) -->
        <a href="#" class="relative block h-[200px] md:h-[260px] md:col-span-3 bg-[#EAF0EC] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">อะไหล่สิ้นเปลือง<br><span class="text-[16px] md:text-[20px] font-medium block mt-1">เครื่องตัดพลาสม่า เครื่องเชื่อม</span></h3>
          </div>
        </a>
        <a href="#" class="relative block h-[200px] md:h-[260px] md:col-span-3 bg-[#F0EBE6] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">เครื่องมือช่าง</h3>
          </div>
        </a>
        
      </div>
    </section>


    <!-- พื้นที่สีขาวด้านล่าง (Main Content Grid - Power Buy Style) -->
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
      
      <!-- Section 1: Brand Slider (3 Items per view, with Dots) -->
      <section id="brandSliderSection" class="mb-10 md:mb-14 relative w-full group/brand pb-6">
        
        <!-- Slider Track -->
        <div class="brand-track flex items-center gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory rounded-xl">
          
          <!-- Brand 1 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/logo-esab.webp" alt="ESAB" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 2 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/hobart-logo.svg" alt="HOBART" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 3 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/fronius-logo.webp" alt="Fronius" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 4 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/hypertherm.webp" alt="HYPERTHERM" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 5 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/kemppi-logo.svg" alt="KEMPPI" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 6 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/lincoln-electric.svg" alt="LINCOLN ELECTRIC" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 7 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/miller-logo.webp" alt="Miller" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
        </div>

        <!-- Indicators (Dots) Bottom Right - Exactly matching product cards -->
        <div class="absolute bottom-1 right-0 flex items-center gap-1.5 brand-dots z-10">
          <!-- Handled by JS -->
        </div>
        <!-- Navigation Buttons (Hover Reveal) -->
        <button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>


      </section>

      
      <!-- Section: Category Shortcuts (Bento Grid 10 Items from old site) -->
      <section class="mb-14 md:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[140px] md:auto-rows-[160px]">
          
          <!-- Item 1: กลุ่มลวดเชื่อม (Big Hero) -->
          <a href="#" class="md:col-span-2 md:row-span-3 relative w-full h-full bg-gray-900 rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-snug text-center px-6">
              กลุ่มลวดเชื่อม
            </h3>
          </a>

          <!-- Item 2: ท่อบรรจุก๊าซ และวาล์ว -->
          <a href="#" class="md:col-span-1 md:row-span-1 relative w-full h-full bg-gray-800 rounded-[16px] lg:rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-snug text-center px-4">
              ท่อบรรจุก๊าซ และวาล์ว
            </h3>
          </a>

          <!-- Item 3: ใบตัดใบเจียร -->
          <a href="#" class="md:col-span-1 md:row-span-1 relative w-full h-full bg-gray-800 rounded-[16px] lg:rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-snug text-center px-4">
              ใบตัดใบเจียร
            </h3>
          </a>

          <!-- Item 4: อุปกรณ์เชื่อมตัดเผาแก๊ส -->
          <a href="#" class="md:col-span-1 md:row-span-1 relative w-full h-full bg-gray-800 rounded-[16px] lg:rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-snug text-center px-4">
              อุปกรณ์เชื่อมตัดเผาแก๊ส
            </h3>
          </a>

          <!-- Item 5: เครื่องเชื่อมและเครื่องตัดพลาสม่า -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              เครื่องเชื่อมและเครื่องตัดพลาสม่า
            </h3>
          </a>

          <!-- Item 6: อะไหล่สิ้นเปลือง -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม
            </h3>
          </a>

          <!-- Item 7: วัสดุอุปกรณ์เคมีภัณฑ์ -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม
            </h3>
          </a>

          <!-- Item 8: เครื่องมือช่าง -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              เครื่องมือช่าง
            </h3>
          </a>

          <!-- Item 9: COMING SOON -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-800/80 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-default pointer-events-none border border-gray-200/20">
            <h3 class="relative z-10 text-white/50 font-bold text-[20px] md:text-[24px] leading-snug text-center px-6 tracking-wider">
              COMING SOON
            </h3>
          </a>

          <!-- Item 10: COMING SOON -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-800/80 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-default pointer-events-none border border-gray-200/20">
            <h3 class="relative z-10 text-white/50 font-bold text-[20px] md:text-[24px] leading-snug text-center px-6 tracking-wider">
              COMING SOON
            </h3>
          </a>

        </div>
      </section>
      
      <!-- Section 2: สินค้าเข้าใหม่ -->
      <section class="mb-14 md:mb-20">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[22px] md:text-[26px] font-bold text-gray-900 tracking-tight">
              สินค้าเข้าใหม่
            </h2>
            <!-- Fire/Hot Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#E32626] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="#" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
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
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿650</span>
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

            <!-- Card 2 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿450</span>
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

            <!-- Card 3 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="MIG ER70S-6" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=MIG+ER70S-6'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อม MIG / MAG (CO2) ER70S-6 ขนาด 0.8 มม. (15 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานเชื่อมแก๊ส | แนวเชื่อมสวย | ทนแรงดึง | สำหรับงานโครงสร้าง
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="1,250" data-unit="ม้วน">ม้วน</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="85,000" data-unit="พาเลท">พาเลท (72 ม้วน)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿1,250</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ม้วน</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ม้วน</span>
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="Gouging" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Gouging'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเซาะร่อง (Gouging) ขนาด 6.4 มม.
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เซาะร่อง | กำจัดรอยร้าว | ทนกระแสไฟสูง | ตัดโลหะรวดเร็ว
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="320" data-unit="กล่อง">กล่อง</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="3,000" data-unit="ลัง">ลัง (10 กล่อง)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿320</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/กล่อง</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">กล่อง</span>
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿650</span>
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
            
            <!-- Card 6 (Duplicated) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿450</span>
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
      <section class="mb-14 md:mb-20">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[22px] md:text-[26px] font-bold text-gray-900 tracking-tight">
              ขายดีประจำเดือน
            </h2>
            <!-- Fire/Hot Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#E32626] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="#" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
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
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿650</span>
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

            <!-- Card 2 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿450</span>
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

            <!-- Card 3 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="MIG ER70S-6" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=MIG+ER70S-6'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อม MIG / MAG (CO2) ER70S-6 ขนาด 0.8 มม. (15 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานเชื่อมแก๊ส | แนวเชื่อมสวย | ทนแรงดึง | สำหรับงานโครงสร้าง
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="1,250" data-unit="ม้วน">ม้วน</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="85,000" data-unit="พาเลท">พาเลท (72 ม้วน)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿1,250</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ม้วน</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ม้วน</span>
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="Gouging" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Gouging'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเซาะร่อง (Gouging) ขนาด 6.4 มม.
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เซาะร่อง | กำจัดรอยร้าว | ทนกระแสไฟสูง | ตัดโลหะรวดเร็ว
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="320" data-unit="กล่อง">กล่อง</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="3,000" data-unit="ลัง">ลัง (10 กล่อง)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿320</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/กล่อง</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">กล่อง</span>
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿650</span>
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
            
            <!-- Card 6 (Duplicated) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿450</span>
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
      <section class="mb-14 md:mb-20">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[22px] md:text-[26px] font-bold text-gray-900 tracking-tight">
              คัดมาเพื่อคุณ
            </h2>
            <!-- Fire/Hot Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#E32626] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="#" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
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
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿650</span>
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

            <!-- Card 2 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿450</span>
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

            <!-- Card 3 -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="MIG ER70S-6" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=MIG+ER70S-6'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อม MIG / MAG (CO2) ER70S-6 ขนาด 0.8 มม. (15 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานเชื่อมแก๊ส | แนวเชื่อมสวย | ทนแรงดึง | สำหรับงานโครงสร้าง
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="1,250" data-unit="ม้วน">ม้วน</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="85,000" data-unit="พาเลท">พาเลท (72 ม้วน)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿1,250</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ม้วน</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">ม้วน</span>
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="Gouging" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Gouging'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเซาะร่อง (Gouging) ขนาด 6.4 มม.
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เซาะร่อง | กำจัดรอยร้าว | ทนกระแสไฟสูง | ตัดโลหะรวดเร็ว
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="320" data-unit="กล่อง">กล่อง</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="3,000" data-unit="ลัง">ลัง (10 กล่อง)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿320</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/กล่อง</span>
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
                        <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">กล่อง</span>
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
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿650</span>
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
            
            <!-- Card 6 (Duplicated) -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="YAWATA FT-51" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=YAWATA+FT-51'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมเหล็กเหนียว YAWATA FT-51 ขนาด 3.2 มม. (5 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                เหล็กเหนียว | เชื่อมท่าตั้งดีเยี่ยม | ควันน้อย | สะเก็ดไฟน้อย
              </p>
              <div class="mt-auto flex flex-col">
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="450" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="1,750" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E32626] font-bold text-[18px] price-display">฿450</span>
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
  </main>

  
    
      <!-- Section: Full Width LINE Banner -->
      <section class="w-full relative mt-16 md:mt-24 h-[120px] md:h-[150px] bg-gray-600 flex items-center overflow-hidden">
        <!-- Background Image -->
        <img src="https://www.landyhome.co.th/images/layout/sec_add_line.webp" alt="Add LINE" class="absolute inset-0 w-full h-full object-cover object-right md:object-center" />
        
        <!-- Content Container -->
        <div class="relative z-10 w-full max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center">
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

<!-- Section: Articles / Portfolio (Landy Home Style) -->
    <section class="w-full bg-white py-14 md:py-20">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12">
        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[22px] md:text-[26px] font-bold text-gray-900 tracking-tight">
              บทความ
            </h2>
          </div>
          <a href="#" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Horizontal Slider (Cut-off style) -->
        <div class="flex items-start gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
          
          <!-- Article 1 -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              แนะนำ 5 เทคนิคการเชื่อม TIG สำหรับมือใหม่ ให้ได้เกล็ดที่สวยงามและแข็งแรง
            </h3>
          </a>

          <!-- Article 2 -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 2" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              การเลือกใช้ลวดเชื่อมฟลักซ์คอร์สให้เหมาะกับเหล็กหนาในงานโครงสร้างขนาดใหญ่
            </h3>
          </a>

          <!-- Article 3 (This one will be cut off on desktop) -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 3" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div class="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                 </div>
              </div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              รีวิวการใช้งานตู้เชื่อมซีโอทู (MIG) ช่วยลดต้นทุนการผลิตในโรงงานอุตสาหกรรม
            </h3>
          </a>
          
          <!-- Article 4 (Extra card to allow scrolling further) -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 4" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              เจาะลึก 3 ข้อควรระวังในการเชื่อมเหล็กหล่อ เพื่อป้องกันรอยแตกร้าว
            </h3>
          </a>

        </div>
      </div>
    </section>

<!-- Footer -->
  <footer class="bg-white w-full mt-10">
    <!-- Features Row -->
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 xl:px-16">
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
    <div class="max-w-[1250px] mx-auto px-4 md:px-8 xl:px-16 py-12">
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
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 xl:px-16 py-4 flex flex-col md:flex-row items-center justify-between text-[13px]">
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

  <!-- Fixed Bottom Dock (UDO Custom) -->
  <div class="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-full px-4 md:px-5 py-1 md:py-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-1 md:gap-2 hover:shadow-[0_20px_40px_rgba(138,195,83,0.2)] transition-shadow duration-500 border border-gray-200/50">
    
    <!-- Item 1: ถาม UDO AI -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#8ac353" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path stroke="#E32626" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#8ac353] transition-colors whitespace-nowrap tracking-tight">ถาม UDO AI</span>
    </a>

    <!-- Item 2: โทรเช็กสต็อก -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#8ac353" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#8ac353] transition-colors whitespace-nowrap tracking-tight">โทรเช็กสต็อก</span>
    </a>

    <!-- Item 3: ขอใบเสนอราคา -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#8ac353" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        <path stroke="#E32626" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#8ac353] transition-colors whitespace-nowrap tracking-tight">ขอใบเสนอราคา</span>
    </a>
  </div>

`;

// Script สำหรับทำ Fade Effect ให้กับช่องค้นหา
const searchPlaceholders = [
  "ค้นหา ตู้เชื่อม MIG / TIG...",
  "ค้นหา ลวดเชื่อมสเตนเลส...",
  "ค้นหา หน้ากากเชื่อมปรับแสงอัตโนมัติ...",
  "ค้นหา ชุดตัดแก๊ส / พลาสม่า...",
  "ค้นหา ใบตัดเหล็ก ใบเจียร...",
  "ค้นหา อะไหล่ปืนเชื่อมต่างๆ...",
  "ค้นหา ถุงมือหนังงานเชื่อม..."
];

const searchInput = document.getElementById('searchInput');
const animatedPlaceholder = document.getElementById('animatedPlaceholder');

if (searchInput && animatedPlaceholder) {
  let wordIndex = 0;
  
  // Set initial word
  animatedPlaceholder.textContent = searchPlaceholders[0];

  // ตั้งเวลาสลับข้อความทุกๆ 3 วินาที
  setInterval(() => {
    // 1. Fade out (ทำให้จางหายไป)
    animatedPlaceholder.style.opacity = '0';
    
    // 2. รอให้จางหายเสร็จ (300ms ตามที่กำหนดใน Tailwind transition-opacity) แล้วเปลี่ยนคำ + Fade in
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % searchPlaceholders.length;
      animatedPlaceholder.textContent = searchPlaceholders[wordIndex];
      animatedPlaceholder.style.opacity = '1';
    }, 300);

  }, 3000);

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


