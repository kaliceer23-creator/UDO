import './style.css'

document.querySelector('#app').innerHTML = `
    <div class="sticky top-0 z-[60] w-full">
        <!-- 1. แถบสีขาวด้านบน (Main Header) -->
    <header class="w-full bg-white border-b border-black/5 relative z-[55] bg-white">
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
          <button class="bg-[#76b83f] hover:bg-[#76b83f]/70 text-white w-[64px] h-[44px] rounded-[4px] flex items-center justify-center transition-colors shrink-0 shadow-sm">
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
  <!-- Breadcrumb -->
    <div class="bg-white">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
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
      <div class="max-w-[1250px] mx-auto px-4 md:px-8">
        
        <div class="flex flex-col lg:flex-row justify-between gap-10">
          
          <!-- LEFT COLUMN: Images -->
          <div class="w-full lg:w-[40%]">
            <!-- Main Image Box -->
            <div class="bg-white rounded-[24px] border border-gray-200 relative overflow-hidden flex flex-col shadow-sm">
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
              <div class="aspect-square bg-white border-2 border-[#76b83f] rounded-lg overflow-hidden cursor-pointer"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
              <div class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100"><img src="/images/bg-welding.jpeg" class="w-full h-full object-cover rounded"></div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Details -->
          <div class="w-full lg:w-[49%]">
            <!-- Title -->
            <h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>
            
            <div class="text-[14px] text-black/45 mb-5 flex items-center gap-4">
              <span>แบรนด์: <a href="#" class="text-[#252525] font-medium hover:underline">NINTENDO</a></span>
              <span class="text-black/45">|</span>
              <span>SKU: 4902370553451</span>
            </div>

            <!-- Pricing -->
            <div class="flex items-end gap-3 mb-5">
              <div class="flex items-baseline gap-1.5">
                <div class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>
                <span class="text-black/45 text-[15px] font-medium">/ห่อ</span>
              </div>
              <div class="text-[18px] text-black/45 line-through mb-1">฿18,000</div>
              <div class="text-[#E12427] text-[13px] font-medium bg-[#E12427]/10 border border-[#E12427] rounded px-2 py-0.5 mb-1 flex items-center gap-1">
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

            <!-- Badges -->
            <div class="flex gap-2 mb-8">
              <div class="bg-[#F8F9FA] rounded px-3 py-1 flex items-center gap-2 border border-black/5">
                <span class="text-[13px] font-medium text-[#252525]">ดูเพิ่มเติม</span>
              </div>
              <div class="bg-[#F8F9FA] rounded px-3 py-1 flex items-center gap-2 border border-black/5">
                <span class="text-[13px] font-medium text-[#252525]">iCare</span>
              </div>
            </div>

            <p class="text-[16px] text-[#252525] mb-6 leading-[1.6]">
              <span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2
            </p>

            <!-- Capacity / บรรจุ -->
            <div class="mb-10">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex items-center gap-3">
                <button class="px-4 py-1 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>
                <button class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>
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
              <button class="border border-[#76b83f] bg-[#76b83f]/10 hover:bg-[#76b83f]/70 hover:text-white text-[#76b83f] font-medium text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า</button>
              <button class="bg-[#76b83f] hover:bg-[#76b83f]/70 text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>
            </div>

            <!-- Social Links -->
            <div class="flex items-center justify-between text-[16px] font-medium text-[#252525] border-t border-gray-200 pt-4">
              <button class="flex items-center gap-2 hover:text-[#E12427] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black group-hover:text-[#E12427] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                เพิ่มเป็นรายการโปรด
              </button>
              <button class="flex items-center gap-2 hover:text-[#76b83f] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black group-hover:text-[#76b83f] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                แชร์
              </button>
            </div>


          </div>

        </div>
      </div>

      <!-- Sticky Tab Bar -->
      <div class="w-full bg-white mt-16">
        <div class="max-w-[1250px] mx-auto px-4 md:px-8 flex items-center gap-10 overflow-x-auto whitespace-nowrap">
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">ภาพรวม</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">คุณสมบัติ</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">รายละเอียดสินค้า</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">ชื่อสินค้า</a>
        </div>
      </div>

      <!-- Specs Section -->
      <div class="w-full bg-[#F8F8F8] py-16 border-b border-gray-200">
        <div class="max-w-[1250px] mx-auto px-4 md:px-8">
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
      <div class="w-full bg-white py-16 border-b border-gray-200">
        <div class="max-w-[900px] mx-auto px-4 text-center">
          
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
      </div>


    </main>
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
  <div class="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-full px-4 md:px-5 py-1 md:py-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-1 md:gap-2 hover:shadow-[0_20px_40px_rgba(138,195,83,0.2)] transition-shadow duration-500 border border-gray-200/50">
    
    <!-- Item 1: ถาม UDO AI -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#76b83f" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#76b83f] transition-colors whitespace-nowrap tracking-tight">ถาม UDO AI</span>
    </a>

    <!-- Item 2: โทรเช็กสต็อก -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#76b83f" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#76b83f] transition-colors whitespace-nowrap tracking-tight">โทรเช็กสต็อก</span>
    </a>

    <!-- Item 3: ขอใบเสนอราคา -->
    <a href="#" class="flex flex-col items-center justify-center gap-0 md:gap-0.5 group px-2 md:px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#76b83f" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
      </svg>
      <span class="text-[16px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#76b83f] transition-colors whitespace-nowrap tracking-tight">ขอใบเสนอราคา</span>
    </a>
  </div>


`;


// Smart Header Logic: Hide green bar on scroll down, show on scroll up
const greenNav = document.querySelector('nav.bg-brand-green');
if (greenNav) {
  // Use a premium easing curve (like iOS) and animate both margin and opacity for ultimate smoothness
  greenNav.style.transition = 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Anti-stutter: require at least 5px scroll difference to trigger
    if (Math.abs(currentScrollY - lastScrollY) < 5) return;
    
    // If scrolled down past 100px and scrolling down
    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      greenNav.style.marginTop = `-${greenNav.offsetHeight}px`;
      greenNav.style.opacity = '0';
    } else {
      greenNav.style.marginTop = '0px';
      greenNav.style.opacity = '1';
    }
    lastScrollY = currentScrollY;
  });
}

