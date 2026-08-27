(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.querySelector(`#app`).innerHTML=`
  <!-- 1. แถบสีขาวด้านบน (Top Header) เพิ่มความสูงและพื้นที่ว่างให้ดูโปร่งธรรมชาติ -->
  <header class="w-full bg-white border-b border-gray-100">
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-5 md:py-6 flex items-center justify-between gap-6">
      
      <!-- โลโก้บริษัท -->
      <a href="/" class="shrink-0 hover:opacity-80 transition-opacity">
        <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-11 md:h-12 w-auto" />
      </a>
      
      <!-- กล่องค้นหาตรงกลาง สไตล์ Power Buy แบบมินิมอล -->
      <div class="hidden md:flex flex-1 max-w-xl mx-6 relative items-center">
        <div class="w-full relative flex items-center bg-gray-100 hover:bg-gray-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-green/30 focus-within:border-brand-green border border-transparent rounded-full transition-all">
          
          <input 
            type="text" 
            id="global-search-input"
            class="w-full bg-transparent pl-5 pr-12 py-3 text-[14.5px] text-gray-800 outline-none" 
            autocomplete="off"
          />

          <!-- ข้อความหมวดหมู่ย่อยหมุนเวียนแบบมีชีวิตชีวา -->
          <div id="placeholder-container" class="pointer-events-none absolute left-5 flex items-center text-[14.5px] text-gray-400 transition-opacity duration-300">
            <span class="mr-1.5 text-gray-400">ค้นหา</span>
            <span id="placeholder-text" class="text-gray-500 font-medium transition-all duration-300 inline-block">ลวดเชื่อมสแตนเลส</span>
          </div>

          <!-- ปุ่มแว่นขยายฝั่งขวา -->
          <button type="button" class="absolute right-2 p-2 text-gray-600 hover:text-brand-red rounded-full hover:bg-gray-200/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- พื้นที่ฝั่งขวา (เตรียมไว้สำหรับเมนูผู้ใช้ / ไอคอนในสเต็ปถัดไป) -->
      <div id="header-right-actions" class="flex items-center gap-4 shrink-0">
      </div>

    </div>
  </header>

  <!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->
  <nav class="w-full bg-brand-green h-10 md:h-11 overflow-x-auto no-scrollbar">
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-full flex items-center justify-between gap-6 whitespace-nowrap">
      
      <!-- หมวดหมู่พิเศษ (โปรโมชั่น) -->
      <a href="#" class="flex items-center gap-1.5 bg-white text-brand-red px-3 py-0.5 rounded-full hover:bg-gray-100 font-bold text-[14px] transition-colors shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
        </svg>
        โปรโมชั่นฮอต
      </a>

      <!-- หมวดหมู่สินค้าหลัก -->
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">เครื่องเชื่อม</a>
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">ลวดเชื่อม</a>
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">อุปกรณ์ตัดแก๊ส/พลาสม่า</a>
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">ใบขัด/ใบตัด/เจียร</a>
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">อุปกรณ์เซฟตี้</a>
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">อะไหล่เครื่องเชื่อม</a>
      <a href="#" class="text-white hover:text-gray-200 font-bold text-[15px] transition-colors">เครื่องมือช่าง</a>

    </div>
  </nav>

  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
  <main class="w-full min-h-[calc(100vh-120px)] bg-muji-bg">
  </main>
`;var e=[`ลวดเชื่อมสแตนเลส 308L / 316L`,`ตู้เชื่อมอาร์กอน TIG Inverter`,`หน้ากากเชื่อมออโต้ ปรับแสงอัตโนมัติ`,`ใบตัดสแตนเลส 4 นิ้ว คมพิเศษ`,`ชุดตัดแก๊ส LPG / AC คุณภาพสูง`,`เกจ์ปรับแรงดันแก๊ส CO2 / Argon`,`ถุงมือช่างเชื่อม หนังแท้กันความร้อน`,`ลวดเชื่อมเหล็กเหนียว E6013`],t=0,n=document.querySelector(`#global-search-input`),r=document.querySelector(`#placeholder-container`),i=document.querySelector(`#placeholder-text`);n&&r&&i&&(setInterval(()=>{document.activeElement!==n&&n.value.trim()===``&&(i.style.opacity=`0`,i.style.transform=`translateY(-4px)`,setTimeout(()=>{t=(t+1)%e.length,i.textContent=e[t],i.style.transform=`translateY(4px)`,setTimeout(()=>{i.style.opacity=`1`,i.style.transform=`translateY(0)`},50)},250))},3e3),n.addEventListener(`focus`,()=>{r.style.opacity=`0`}),n.addEventListener(`blur`,()=>{n.value.trim()===``&&(r.style.opacity=`1`)}),n.addEventListener(`input`,()=>{n.value.trim()===``?r.style.opacity=`1`:r.style.opacity=`0`}));