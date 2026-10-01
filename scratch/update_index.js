const fs = require('fs');

const indexPath = 'frontend/index.html';
const content = fs.readFileSync(indexPath, 'utf8');

const startMarker = '<!-- โซน 2: สินค้าเข้าใหม่และโปรโมชั่น (พื้นหลังสีขาว) -->';
const endMarker = '<!-- Section: Article Banner -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newZone2 = `<!-- โซน 2: ลวดเชื่อมขายดี, สินค้าขายดี, สินค้าใหม่, สำหรับคุณ (พื้นหลังสีขาว) -->
    <div class="w-full bg-white pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      
      <!-- Section 1: ลวดเชื่อมขายดี (คละประเภทลวดเชื่อม) -->
      <section class="mb-12 md:mb-16 lg:mb-20">
        <!-- Header -->
        <div class="flex items-center mb-6 md:mb-8">
          <div class="flex items-center gap-2">
            <h2 class="text-[28px] md:text-[36px] font-semibold text-gray-900 tracking-tight">
              ลวดเชื่อมขายดี
            </h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#ff0036] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html?cat=cat-12" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          <div id="welding-bestsellers-track" class="pslider-track flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar pt-3 md:pt-4 pb-6 md:pb-8 snap-x snap-mandatory">
            <!-- Injected dynamically via home_hydrate.js -->
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
        </div>
      </section>

      <!-- Section 2: สินค้าขายดี (คละหมวดหมู่ทั้งร้าน) -->
      <section class="mb-12 md:mb-16 lg:mb-20">
        <!-- Header -->
        <div class="flex items-center mb-6 md:mb-8">
          <div class="flex items-center gap-2">
            <h2 class="text-[28px] md:text-[36px] font-semibold text-gray-900 tracking-tight">
              สินค้าขายดี
            </h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#ff0036] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html?type=collection&name=top-sale" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          <div id="best-sellers-track" class="pslider-track flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar pt-3 md:pt-4 pb-6 md:pb-8 snap-x snap-mandatory">
            <!-- Injected dynamically via home_hydrate.js -->
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
        </div>
      </section>

      <!-- Section 3: สินค้าใหม่ -->
      <section class="mb-12 md:mb-16 lg:mb-20">
        <!-- Header -->
        <div class="flex items-center mb-6 md:mb-8">
          <div class="flex items-center gap-2">
            <h2 class="text-[28px] md:text-[36px] font-semibold text-gray-900 tracking-tight">
              สินค้าใหม่
            </h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#ff0036] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html?type=collection&name=new-arrivals" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          <div id="new-arrivals-track" class="pslider-track flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar pt-3 md:pt-4 pb-6 md:pb-8 snap-x snap-mandatory">
            <!-- Injected dynamically via home_hydrate.js -->
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
        </div>
      </section>

      <!-- Section 4: สำหรับคุณ -->
      <section class="mb-6 md:mb-10">
        <!-- Header -->
        <div class="flex items-center mb-6 md:mb-8">
          <div class="flex items-center gap-2">
            <h2 class="text-[28px] md:text-[36px] font-semibold text-gray-900 tracking-tight">
              สำหรับคุณ
            </h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#ff0036] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>
          <a href="/category.html?type=collection&name=for-you" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-2">
          <div id="for-you-track" class="pslider-track flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar pt-3 md:pt-4 pb-6 md:pb-8 snap-x snap-mandatory">
            <!-- Injected dynamically via home_hydrate.js -->
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
        </div>
      </section>

      </div>
    </div>
  </main>
  
  `;

const updatedContent = content.slice(0, startIndex) + newZone2 + content.slice(endIndex);
fs.writeFileSync(indexPath, updatedContent, 'utf8');
console.log('Successfully updated index.html with the 4 sections in order!');
