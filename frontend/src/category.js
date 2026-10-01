import './style.css'
import { mockDatabase } from './mock_database.js'
import { generateCardHTML } from './home_hydrate.js'
import { resolveCategory, renderCategoryBreadcrumbs, renderBreadcrumbsHTML } from './category_taxonomy.js'
import { createAiOverviewHTML, initAiOverviewInteractions, loadAndRenderAiOverview } from './ai_overview.js'

document.querySelector('#category-content').innerHTML = `
<main class="w-full bg-white pb-20 min-h-screen relative">
  <!-- Filter Drawer Backdrop -->
  <div id="filter-drawer-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[110] hidden opacity-0 transition-opacity duration-300 pointer-events-none"></div>

  <!-- Left Slide-Over Filter Drawer -->
  <aside id="filter-drawer" class="fixed inset-y-0 left-0 z-[120] w-full max-w-[360px] md:max-w-[400px] bg-white shadow-2xl flex flex-col -translate-x-full transition-transform duration-300 ease-in-out" aria-label="ตัวกรองสินค้า" role="dialog" aria-modal="true" aria-hidden="true">
    <!-- Drawer Header -->
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
      <button id="btn-close-drawer" class="w-8 h-8 flex items-center justify-center -ml-1 text-gray-700 hover:text-black cursor-pointer transition-colors" aria-label="ปิดตัวกรอง">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="text-[17px] font-semibold text-[#111111]">ตัวกรอง</h2>
      <button id="drawer-clear-all" class="text-[14px] text-gray-700 hover:text-black underline underline-offset-2 cursor-pointer transition-colors">ล้างทั้งหมด</button>
    </div>

    <!-- Scrollable Facets Body -->
    <div class="flex-1 overflow-y-auto px-5 py-1 divide-y divide-gray-100 overscroll-contain">
      <!-- 1. Brand Accordion (Starts closed) -->
      <div class="drawer-accordion py-3.5" data-accordion="brand">
        <button type="button" class="drawer-accordion-btn flex items-center justify-between w-full text-left font-medium text-[15px] text-[#252525] hover:text-black transition-colors cursor-pointer">
          <span class="flex items-center gap-1.5">
            <span>แบรนด์</span>
            <span id="drawer-brand-count" class="text-xs text-brand-red font-semibold hidden"></span>
          </span>
          <svg class="drawer-accordion-arrow w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
        <div class="drawer-accordion-content pt-3 pb-2 hidden">
          <div id="drawer-brand-list">
            <!-- Injected by JS -->
          </div>
        </div>
      </div>

      <!-- 2. Dynamic Category Facets Container -->
      <div id="drawer-category-facets" class="divide-y divide-gray-100">
        <!-- Dynamic category accordions injected by JS -->
      </div>
    </div>

    <!-- Sticky Footer -->
    <div class="p-4 border-t border-gray-100 bg-white shrink-0">
      <button id="drawer-apply-btn" class="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors text-[15px] flex items-center justify-center gap-1.5 cursor-pointer">
        <span>แสดง <span id="drawer-count">0</span> สินค้า</span>
      </button>
    </div>
  </aside>

  <!-- Breadcrumbs -->
  <div class="w-full bg-white">
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <div id="category-breadcrumbs" class="w-full border-b border-gray-200 pt-3.5 pb-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
        <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
        <span class="text-gray-400">&gt;</span>
        <span class="text-[#252525]">ลวดเชื่อม</span>
      </div>
    </div>
  </div>

  <!-- Filter Section Wrapper -->
  <div id="filter-sticky-wrapper" class="sticky top-[96px] md:top-[116px] lg:top-[120px] z-[45] bg-white/95 backdrop-blur-md py-4 md:py-5 mb-2 md:mb-4 border-b border-transparent transition-all duration-300">
    <!-- 1. Filter Bar & Sort By -->
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <!-- Left: Filter Buttons -->
      <div id="filter-buttons-wrapper" class="flex flex-wrap items-center gap-2.5 md:gap-3">
        <!-- Main Filter Pill Button (Opens Left Drawer) -->
        <button id="btn-open-filter-drawer" class="filter-main-btn flex items-center gap-2 px-4 md:px-4.5 h-[38px] md:h-[40px] rounded-full border border-gray-300 text-[13.5px] md:text-[14px] text-gray-800 hover:bg-gray-100 hover:border-gray-400 bg-white transition-all whitespace-nowrap shrink-0 cursor-pointer" title="ตัวกรองทั้งหมด">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="w-4 h-4 text-gray-800 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          <span class="filter-main-btn-text">ตัวกรอง</span>
          <span id="active-filter-badge" class="hidden text-gray-800 font-normal"></span>
        </button>

        <!-- Dynamic Dropdown Pills Container -->
        <div id="dynamic-top-pills" class="flex flex-wrap items-center gap-2.5 md:gap-3"></div>
      </div>

      <!-- Right: Sort By -->
      <div class="relative z-50">
        <div id="sort-trigger" class="flex items-center justify-between gap-3 px-4 md:px-4.5 h-[38px] md:h-[40px] rounded-full border border-gray-300 text-[13.5px] md:text-[14px] text-gray-800 hover:bg-gray-100 hover:border-gray-400 bg-white transition-colors cursor-pointer select-none min-w-[215px]">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span id="sort-selected-text">การจัดเรียง: สินค้าแนะนำ</span>
          </div>
          <svg id="sort-arrow" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <!-- Dropdown -->
        <div id="sort-dropdown" class="absolute right-0 top-full mt-2 w-full min-w-[220px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] rounded-xl hidden z-50 text-left border border-gray-100 overflow-hidden">
          <button class="sort-option flex items-center justify-between w-full px-5 py-3.5 text-[14px] bg-[#F3F3F6] text-[#1e293b] transition-colors cursor-pointer text-left" data-value="สินค้าแนะนำ">
            <svg class="w-4 h-4 text-[#1e293b] checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span class="font-semibold text-[#1e293b] ml-auto text-right">สินค้าแนะนำ</span>
          </button>
          <button class="sort-option flex items-center justify-between w-full px-5 py-3.5 text-[14px] bg-white hover:bg-[#F3F3F6]/60 text-gray-700 transition-colors cursor-pointer text-left" data-value="สินค้าขายดี">
            <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span class="font-normal text-gray-700 ml-auto text-right">สินค้าขายดี</span>
          </button>
          <button class="sort-option flex items-center justify-between w-full px-5 py-3.5 text-[14px] bg-white hover:bg-[#F3F3F6]/60 text-gray-700 transition-colors cursor-pointer text-left" data-value="สินค้ามาใหม่">
            <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span class="font-normal text-gray-700 ml-auto text-right">สินค้ามาใหม่</span>
          </button>
          <button class="sort-option flex items-center justify-between w-full px-5 py-3.5 text-[14px] bg-white hover:bg-[#F3F3F6]/60 text-gray-700 transition-colors cursor-pointer text-left" data-value="ราคา: ต่ำ-สูง">
            <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span class="font-normal text-gray-700 ml-auto text-right">ราคา: ต่ำ-สูง</span>
          </button>
          <button class="sort-option flex items-center justify-between w-full px-5 py-3.5 text-[14px] bg-white hover:bg-[#F3F3F6]/60 text-gray-700 transition-colors cursor-pointer text-left" data-value="ราคา: สูง-ต่ำ">
            <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span class="font-normal text-gray-700 ml-auto text-right">ราคา: สูง-ต่ำ</span>
          </button>
          <button class="sort-option flex items-center justify-between w-full px-5 py-3.5 text-[14px] bg-white hover:bg-[#F3F3F6]/60 text-gray-700 transition-colors cursor-pointer text-left" data-value="ชื่อสินค้า: A - Z">
            <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span class="font-normal text-gray-700 ml-auto text-right">ชื่อสินค้า: A - Z</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Active Pills Row -->
    <div id="active-pills-container" class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full flex items-center gap-3 flex-wrap mt-3 hidden">
      <!-- Injected by JS -->
    </div>
  </div> <!-- End Filter Section Wrapper -->

  <!-- AI Overview Container -->
  <div id="category-ai-overview-container" class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full pt-4 hidden"></div>

  <!-- SEO Hidden Title -->
  <h1 id="category-title" class="sr-only">ลวดเชื่อม</h1>

  <!-- Product Grid & Count Section -->
  <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full mb-20 md:mb-24">
    <!-- Centered Count above 1st row of products -->
    <div class="text-center py-4 md:py-6">
      <span id="category-count" class="text-[13.5px] md:text-[14px] text-[#9b9b9b] font-normal">0 รายการ</span>
    </div>

    <!-- 5. Product Grid -->
    <div id="category-product-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      <!-- Injected by JS -->
    </div>

    <!-- 6. Load More Section -->
    <div id="load-more-container" class="mt-10 md:mt-14 flex justify-center w-full hidden">
      <button id="btn-load-more" type="button" class="w-full sm:w-auto min-w-[200px] md:min-w-[220px] px-8 py-3.5 border border-black rounded-[4px] bg-white text-black font-medium text-[15px] hover:bg-[#F3F3F6] hover:border-black active:scale-[0.98] transition-all cursor-pointer select-none text-center">
        ดูเพิ่มเติม
      </button>
    </div>
  </div>

</main>
`;


// --- Category Dynamic Hydration & Filter Logic ---
setTimeout(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'category'; 
  const rawSub = (urlParams.get('sub') || '').trim();
  const rawCat = (urlParams.get('cat') || urlParams.get('slug') || rawSub || urlParams.get('name') || '').trim();
  const rawName = (urlParams.get('name') || '').trim();
  const query = (urlParams.get('q') || urlParams.get('query') || '').trim();

  // Resolve category from taxonomy (defaults to root welding wire if not specified)
  const resolvedCat = resolveCategory(rawCat || '12') || resolveCategory('12');
  const categoryName = rawSub || resolvedCat.name;

  const hasMat = (p, target) => {
    const m = p.filter_attributes?.material;
    if (Array.isArray(m)) return m.includes(target);
    return m === target || (typeof m === 'string' && m.includes(target));
  };

  const weldingSubgroups = {
    'เชื่อมเหล็ก': {
      title: 'ลวดเชื่อมเหล็ก',
      cid: 269,
      filter: (p) => hasMat(p, 'เหล็ก') || /(RB-26|LB-52|KOBE-30|FT-51|L-55|TG-S50|SM-70|ER70S-6|E6013|E7016|E7018|71T|S-12|S-14|S-6013|YW-71|MG-50|MG-51|SUPERWELD|GEMINI G-303|เหล็กเหนียว)/i.test(p.name)
    },
    'เชื่อมสแตนเลส': {
      title: 'ลวดเชื่อมสแตนเลส',
      cid: 263,
      filter: (p) => hasMat(p, 'สแตนเลส') || /(สแตนเลส|สเตนเลส|308|309|310|312|316|347|410|430|680)/i.test(p.name)
    },
    'เชื่อมอลูมิเนียม': {
      title: 'ลวดเชื่อมอลูมิเนียม',
      cid: 278,
      filter: (p) => hasMat(p, 'อลูมิเนียม') || /(อลูมิเนียม|Zinal|ZINAL|4043|5356)/i.test(p.name)
    },
    'เชื่อมเหล็กหล่อ': {
      title: 'ลวดเชื่อมเหล็กหล่อ',
      cid: 265,
      filter: (p) => hasMat(p, 'เหล็กหล่อ') || /(เหล็กหล่อ|NICAST|Ni-CI|NiFe-CI)/i.test(p.name)
    },
    'เชื่อมทองเหลือง-ทองแดงและเงิน': {
      title: 'ลวดเชื่อมทองเหลือง ทองแดง เงิน',
      cid: 293,
      filter: (p) => hasMat(p, 'ทองเหลือง / ทองแดง') || hasMat(p, 'เงินประสาน') || /(ทองเหลือง|ทองแดง|เงิน|Bronze|BRONZE|ERCu|Cu 112|Cu 114|NCS-M|MC-Cu|PHOSBRAZ|BRAZARGENT|BCuP|BAg)/i.test(p.name)
    },
    'เชื่อมทองเหลืองทองแดงและเงิน': {
      title: 'ลวดเชื่อมทองเหลือง ทองแดง เงิน',
      cid: 293,
      filter: (p) => hasMat(p, 'ทองเหลือง / ทองแดง') || hasMat(p, 'เงินประสาน') || /(ทองเหลือง|ทองแดง|เงิน|Bronze|BRONZE|ERCu|Cu 112|Cu 114|NCS-M|MC-Cu|PHOSBRAZ|BRAZARGENT|BCuP|BAg)/i.test(p.name)
    },
    'เชื่อมพอกผิวแข็ง': {
      title: 'ลวดเชื่อมพอกผิวแข็ง',
      cid: 273,
      filter: (p) => hasMat(p, 'พอกผิวแข็ง') || /(พอกแข็ง|พอกผิวแข็ง|HARDFACING|TUBUROD|HF-|H-250|H-350|H-450|H-600|H-800|SC-450|SC-600|SC-700|HB68|HBA|Fe14|Fe15|CrCW|CrC)/i.test(p.name)
    },
    'เชื่อมตัดเซาะร่อง': {
      title: 'ลวดเชื่อมตัดเซาะร่อง',
      cid: 267,
      filter: (p) => hasMat(p, 'ตัดเซาะร่อง') || /(เซาะร่อง|ตัดเซาะร่อง|CHAMFERTRODE|C&G)/i.test(p.name)
    },
    'เชื่อมวัสดุเกรดพิเศษ': {
      title: 'ลวดเชื่อมวัสดุเกรดพิเศษ',
      cid: 271,
      filter: (p) => hasMat(p, 'โลหะเกรดพิเศษ (นิเกิล/โคบอลต์)') || (/(นิเกิล|Cobalt|Stellite|สเตลไลท์|INCONEL|FM 82|FM 625|FM C-276|FM 622|NI59|ST-82|ST-276|ST-9010|KW-T82)/i.test(p.name) && !/ทังสเตน/i.test(p.name))
    },
    'เชื่อมทังสเตน': {
      title: 'ลวดเชื่อมทังสเตน',
      cid: 296,
      filter: (p) => (p.categories && p.categories.some(c => c.name === 'เชื่อมทังสเตน' || c.url_slug === 'cat-296')) || (/ลวดเชื่อมทังสเตน/i.test(p.name) || (/(ทังสเตน|Tungsten)/i.test(p.name) && !/(ด้ามเชื่อม|ปืนเชื่อม|ถ้วย|สลิป|อินซูเรเตอร์|BACK CAP)/i.test(p.name)))
    },
    'ลวดเชื่อมทังสเตน': {
      title: 'ลวดเชื่อมทังสเตน',
      cid: 296,
      filter: (p) => (p.categories && p.categories.some(c => c.name === 'เชื่อมทังสเตน' || c.url_slug === 'cat-296')) || (/ลวดเชื่อมทังสเตน/i.test(p.name) || (/(ทังสเตน|Tungsten)/i.test(p.name) && !/(ด้ามเชื่อม|ปืนเชื่อม|ถ้วย|สลิป|อินซูเรเตอร์|BACK CAP)/i.test(p.name)))
    }
  };

  const displayTitle = (weldingSubgroups[categoryName] && weldingSubgroups[categoryName].title) || resolvedCat.title || resolvedCat.name;

  const rootId = (resolvedCat.path && resolvedCat.path.length > 0)
    ? resolvedCat.path[0].id
    : (resolvedCat.root_id || resolvedCat.id);

  const isSubgroup = weldingSubgroups[categoryName] !== undefined;
  const isMachines = rootId === 339 || resolvedCat.id === 339 || categoryName.includes('เครื่องเชื่อมและเครื่องตัดพลาสม่า');
  const isConsumables = rootId === 344 || resolvedCat.id === 344 || categoryName.includes('อะไหล่สิ้นเปลือง');
  const isGasEquipment = rootId === 312 || resolvedCat.id === 312 || categoryName.includes('อุปกรณ์เชื่อมตัดเผาแก๊ส');
  const isAbrasives = rootId === 298 || resolvedCat.id === 298 || categoryName.includes('ใบตัด') || categoryName.includes('ใบเจียร');
  const isGasCylinders = rootId === 327 || resolvedCat.id === 327 || categoryName.includes('ท่อบรรจุก๊าซ');
  const isChemicals = rootId === 382 || resolvedCat.id === 382 || categoryName.includes('เคมีภัณฑ์');
  const isTools = rootId === 398 || resolvedCat.id === 398 || categoryName.includes('เครื่องมือช่าง');
  const isWeldingWire = rootId === 12 || resolvedCat.id === 12 || isSubgroup;

  const titleEl = document.getElementById('category-title');
  const countEl = document.getElementById('category-count');
  const breadcrumbsEl = document.getElementById('category-breadcrumbs');
  const gridEl = document.getElementById('category-product-grid');
  
  // 1. Initial Filter of mockDatabase based on URL
  let applyFilters;
  let baseProducts = [];
  if (type === 'search' || type === 'ai_search') {
    const qLower = query.toLowerCase();
    baseProducts = mockDatabase.filter(p => 
      p.name.toLowerCase().includes(qLower) || 
      p.brand.toLowerCase().includes(qLower) ||
      (p.description && p.description.toLowerCase().includes(qLower))
    );
    // Prioritize MIG / Welpro / Kobelco if query relates to MIG / Flux-cored
    if (qLower.includes('มิก') || qLower.includes('mig') || qLower.includes('ฟลักซ์คอร์') || qLower.includes('co2')) {
      const migMatched = mockDatabase.filter(p => 
        p.name.toLowerCase().includes('mig') || 
        p.name.toLowerCase().includes('มิก') || 
        p.name.toLowerCase().includes('ฟลักซ์คอร์') || 
        (p.filter_attributes?.process && p.filter_attributes.process.includes('MIG')) ||
        (p.brand && (p.brand.toUpperCase() === 'WELPRO' || p.brand.toUpperCase() === 'KOVET' || p.brand.toUpperCase() === 'KOBELCO'))
      );
      if (migMatched.length > 0) baseProducts = migMatched;
    }
    if (baseProducts.length === 0) {
      baseProducts = mockDatabase.filter(p => p.categories && p.categories.some(c => c.name.includes('ลวดเชื่อม')));
    }
  } else if (type === 'collection') {
     const colMapping = { 'new-arrivals': 'new_arrival', 'top-sale': 'popular', 'for-you': 'just_for_you' };
     const mapKey = colMapping[rawName] || rawName;
     if (rawName === 'promotion' || rawName === 'promo' || rawName === 'โปรโมชั่น') {
       baseProducts = mockDatabase.filter(p => p.flags?.is_promotion || p.promotion === 1 || (p.variants && p.variants.some(v => v.original_price && v.original_price > v.price)));
     } else {
       baseProducts = mockDatabase.filter(p => p.collections && p.collections.includes(mapKey));
     }
  } else if (type === 'brand') {
     baseProducts = mockDatabase.filter(p => p.brand.toLowerCase() === rawName.toLowerCase());
  } else {
     // Category Filter across all 8 root categories & subcategories
     if (isSubgroup) {
       const allWire = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.name.includes('ลวดเชื่อม') || c.url_slug.includes('wire') || c.url_slug === 'cat-12' || c.url_slug === 'cat-296')
       );
       const subMatched = allWire.filter(p => 
         (p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.name === resolvedCat.name)) ||
         (weldingSubgroups[categoryName] && weldingSubgroups[categoryName].filter(p))
       );
       baseProducts = subMatched.length > 0 ? subMatched : allWire;
     } else if (resolvedCat.id === 12) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-12' || c.name.includes('ลวดเชื่อม'))
       );
     } else if (resolvedCat.id === 339) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-339' || c.name.includes('เครื่องเชื่อมและเครื่องตัดพลาสม่า'))
       );
     } else if (resolvedCat.id === 344) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-344' || c.name.includes('อะไหล่สิ้นเปลือง'))
       );
     } else if (resolvedCat.id === 312) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-312' || c.name.includes('อุปกรณ์เชื่อมตัดเผาแก๊ส'))
       );
     } else if (resolvedCat.id === 298) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-298' || c.name.includes('ใบตัดใบเจียร'))
       );
     } else if (resolvedCat.id === 327) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-327' || c.name.includes('ท่อบรรจุก๊าซ'))
       );
     } else if (resolvedCat.id === 382) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-382' || c.name.includes('เคมีภัณฑ์'))
       );
     } else if (resolvedCat.id === 398) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === 'cat-398' || c.name.includes('เครื่องมือช่าง'))
       );
     } else if (isMachines) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-339'));
     } else if (isConsumables) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-344'));
     } else if (isGasEquipment) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-312'));
     } else if (isAbrasives) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-298'));
     } else if (isGasCylinders) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-327'));
     } else if (isChemicals) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-382'));
     } else if (isTools) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-398'));
     } else if (isWeldingWire) {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.url_slug === `cat-${resolvedCat.id}` || c.url_slug === resolvedCat.slug || c.name.toLowerCase() === resolvedCat.name.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-12'));
     } else {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => 
           c.url_slug === `cat-${resolvedCat.id}` || 
           c.url_slug === resolvedCat.slug || 
           c.name.toLowerCase() === resolvedCat.name.toLowerCase()
         )
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase;
     }
  }

  // 2. Update Breadcrumbs, Title and AI Overview
  if (type === 'ai_search' || type === 'search') {
    const displayQuery = query || 'ลวดเชื่อมมิก';
    if (titleEl) titleEl.textContent = `ค้นหาด้วย AI "${displayQuery}"`;
    if (breadcrumbsEl) breadcrumbsEl.innerHTML = renderBreadcrumbsHTML([], `ค้นหาด้วย AI "${displayQuery}"`);
    
    // Render AI Overview Component with Asynchronous Dynamic Hydration
    const aiOverviewContainer = document.getElementById('category-ai-overview-container');
    if (aiOverviewContainer) {
      loadAndRenderAiOverview(aiOverviewContainer, displayQuery).then(aiData => {
        if (aiData && aiData.is_out_of_scope) {
          baseProducts = [];
          if (typeof applyFilters === 'function') {
            applyFilters();
          }
          if (breadcrumbsEl) {
            breadcrumbsEl.innerHTML = renderBreadcrumbsHTML([], `ค้นหาด้วย AI "${displayQuery}"`);
          }
          const productCountEl = document.getElementById('category-product-count');
          if (productCountEl) productCountEl.textContent = '0';
          return;
        }

        if (aiData && !aiData.is_out_of_scope && aiData.related_category) {
          const relCat = aiData.related_category;
          const catId = relCat.id;
          const catSlug = relCat.slug || (catId ? `cat-${catId}` : '');
          const catName = (relCat.name || '').toLowerCase();
          const catTitle = relCat.title || relCat.name || '';

          const matchedCatProducts = mockDatabase.filter(p => 
            (p.categories && p.categories.some(c => 
              (catId && (Number(c.id) === Number(catId) || c.url_slug === `cat-${catId}`)) ||
              (catSlug && c.url_slug === catSlug) ||
              (catName && c.name && c.name.toLowerCase().includes(catName))
            )) ||
            (weldingSubgroups[relCat.name] && weldingSubgroups[relCat.name].filter(p))
          );

          if (matchedCatProducts.length > 0) {
            if (Array.isArray(aiData.matched_products) && aiData.matched_products.length > 0) {
              const matchedSkus = aiData.matched_products.map(s => String(s).toLowerCase());
              matchedCatProducts.sort((a, b) => {
                const aSku = String(a.sku || '').toLowerCase();
                const bSku = String(b.sku || '').toLowerCase();
                const aMatch = matchedSkus.some(s => aSku.includes(s) || (a.name && a.name.toLowerCase().includes(s)));
                const bMatch = matchedSkus.some(s => bSku.includes(s) || (b.name && b.name.toLowerCase().includes(s)));
                if (aMatch && !bMatch) return -1;
                if (!aMatch && bMatch) return 1;
                return 0;
              });
            }
            baseProducts = matchedCatProducts;
            if (typeof applyFilters === 'function') {
              applyFilters();
            }
            if (breadcrumbsEl) {
              breadcrumbsEl.innerHTML = renderBreadcrumbsHTML([], `ค้นหาด้วย AI "${displayQuery}" &gt; ${catTitle}`);
            }
          }
        }
      }).catch(err => {
        console.warn('AI Overview auto category filter error:', err);
      });
    }
  } else if (type === 'collection') {
    const colName = rawName === 'new-arrivals' ? 'สินค้าเข้าใหม่' : rawName === 'top-sale' ? 'ขายดีประจำเดือน' : (rawName === 'promotion' || rawName === 'promo' || rawName === 'โปรโมชั่น') ? 'โปรโมชั่นพิเศษ' : 'คัดมาเพื่อคุณ';
    if (titleEl) titleEl.textContent = colName;
    if (breadcrumbsEl) breadcrumbsEl.innerHTML = renderBreadcrumbsHTML([], colName);
  } else if (type === 'brand') {
    if (titleEl) titleEl.textContent = `แบรนด์ ${rawName}`;
    if (breadcrumbsEl) breadcrumbsEl.innerHTML = renderBreadcrumbsHTML([], `แบรนด์ ${rawName}`);
  } else {
    // Standard category view
    if (titleEl) titleEl.textContent = displayTitle;
    if (breadcrumbsEl) breadcrumbsEl.innerHTML = renderCategoryBreadcrumbs(resolvedCat);
  }

  // 3. Dynamic Filtering Setup
  let activeFilters = {
    brand: [],
    material: [],
    process: [],
    size: [],
    package: [],
    standard: [],
    welding_position: [],
    voltage: [],
    amperage: [],
    torch_category: [],
    torch_series: [],
    part_type: [],
    gas_type: [],
    equipment_type: [],
    feature_type: [],
    disc_type: [],
    diameter: [],
    grit: [],
    target_material: [],
    capacity: [],
    item_type: [],
    chemical_type: [],
    function_type: [],
    form: [],
    tool_type: [],
    power_system: [],
    instock_only: false,
    price_min: null,
    price_max: null
  };

  const ALL_FILTER_KEYS = [
    'brand', 'material', 'process', 'size', 'package', 'standard',
    'welding_position', 'voltage', 'amperage', 'torch_category', 'torch_series', 'part_type',
    'gas_type', 'equipment_type', 'feature_type', 'disc_type', 'diameter', 'grit', 'target_material',
    'capacity', 'item_type', 'chemical_type', 'function_type', 'form', 'tool_type', 'power_system'
  ];

  const activePillsContainer = document.getElementById('active-pills-container');

  // Facet count helper
  const getFacetCount = (filterKey, val) => {
    if (filterKey === 'brand') {
      return baseProducts.filter(p => p.brand === val).length;
    }
    if (filterKey === 'material') {
      return baseProducts.filter(p => {
        const mat = p.filter_attributes?.material;
        if (Array.isArray(mat)) return mat.includes(val);
        return mat === val;
      }).length;
    }
    if (filterKey === 'process') {
      return baseProducts.filter(p => {
        const proc = p.filter_attributes?.process;
        if (Array.isArray(proc)) return proc.includes(val);
        return proc === val;
      }).length;
    }
    if (filterKey === 'size') {
      const targetNum = parseFloat(val);
      return baseProducts.filter(p => {
        const hasAttrSize = p.filter_attributes?.sizes && p.filter_attributes.sizes.some(s => parseFloat(s) === targetNum);
        const hasVariantMatch = p.variants && p.variants.some(v => {
          if (!v.size) return false;
          const m = v.size.match(/(?:^|[^\d\.])(\d+(?:\.\d+)?)\s*(?:mm|มม|มมง|x|X|\.|\s|$)/);
          return m && parseFloat(m[1]) === targetNum;
        });
        return hasAttrSize || hasVariantMatch;
      }).length;
    }
    if (filterKey === 'package') {
      return baseProducts.filter(p => {
        const pkgs = p.filter_attributes?.packages || [];
        return pkgs.includes(val);
      }).length;
    }
    if (filterKey === 'standard') {
      return baseProducts.filter(p => {
        return p.filter_attributes?.standards && p.filter_attributes.standards.map(s => s.trim()).includes(val);
      }).length;
    }
    if (filterKey === 'welding_position') {
      return baseProducts.filter(p => {
        if (!p.filter_attributes?.welding_positions) return false;
        return p.filter_attributes.welding_positions.some(pos => {
          const clean = pos.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
          return clean === val;
        });
      }).length;
    }
    if (filterKey === 'voltage') {
      return baseProducts.filter(p => p.filter_attributes?.voltage === val).length;
    }
    if (filterKey === 'amperage') {
      return baseProducts.filter(p => p.filter_attributes?.amperage === val).length;
    }
    if (filterKey === 'torch_category') {
      return baseProducts.filter(p => p.filter_attributes?.torch_category === val).length;
    }
    if (filterKey === 'torch_series') {
      return baseProducts.filter(p => {
        const ts = p.filter_attributes?.torch_series;
        if (Array.isArray(ts)) return ts.includes(val);
        return ts === val;
      }).length;
    }
    if (filterKey === 'part_type') {
      return baseProducts.filter(p => p.filter_attributes?.part_type === val).length;
    }
    if (filterKey === 'gas_type') {
      return baseProducts.filter(p => p.filter_attributes?.gas_type === val).length;
    }
    if (filterKey === 'equipment_type') {
      return baseProducts.filter(p => p.filter_attributes?.equipment_type === val).length;
    }
    if (filterKey === 'feature_type') {
      return baseProducts.filter(p => p.filter_attributes?.feature_type === val).length;
    }
    if (filterKey === 'disc_type') {
      return baseProducts.filter(p => p.filter_attributes?.disc_type === val).length;
    }
    if (filterKey === 'diameter') {
      return baseProducts.filter(p => p.filter_attributes?.diameter === val).length;
    }
    if (filterKey === 'grit') {
      return baseProducts.filter(p => p.filter_attributes?.grit === val).length;
    }
    if (filterKey === 'target_material') {
      return baseProducts.filter(p => {
        const tm = p.filter_attributes?.target_material;
        if (Array.isArray(tm)) return tm.includes(val);
        return tm === val;
      }).length;
    }
    if (filterKey === 'capacity') {
      return baseProducts.filter(p => p.filter_attributes?.capacity === val).length;
    }
    if (filterKey === 'item_type') {
      return baseProducts.filter(p => p.filter_attributes?.item_type === val).length;
    }
    if (filterKey === 'chemical_type') {
      return baseProducts.filter(p => p.filter_attributes?.chemical_type === val).length;
    }
    if (filterKey === 'function_type') {
      return baseProducts.filter(p => p.filter_attributes?.function_type === val).length;
    }
    if (filterKey === 'form') {
      return baseProducts.filter(p => p.filter_attributes?.form === val).length;
    }
    if (filterKey === 'tool_type') {
      return baseProducts.filter(p => p.filter_attributes?.tool_type === val).length;
    }
    if (filterKey === 'power_system') {
      return baseProducts.filter(p => p.filter_attributes?.power_system === val).length;
    }
    return 0;
  };

  // Extract Available Facets from baseProducts
  const availableBrands = [...new Set(baseProducts.map(p => p.brand).filter(Boolean))].sort();

  let allMaterials = new Set();
  baseProducts.forEach(p => {
    const mat = p.filter_attributes?.material;
    if (Array.isArray(mat)) {
      mat.forEach(m => { if (m) allMaterials.add(m.trim()); });
    } else if (mat) {
      allMaterials.add(mat.trim());
    }
  });
  const availableMaterials = [...allMaterials].sort((a, b) => {
    const countA = getFacetCount('material', a);
    const countB = getFacetCount('material', b);
    if (countB !== countA) return countB - countA;
    return a.localeCompare(b, 'th');
  });

  let allProcesses = new Set();
  baseProducts.forEach(p => {
    const proc = p.filter_attributes?.process;
    if (Array.isArray(proc)) {
      proc.forEach(pr => { if (pr) allProcesses.add(pr.trim()); });
    } else if (proc) {
      allProcesses.add(proc.trim());
    }
  });
  const availableProcesses = [...allProcesses].sort((a, b) => {
    const countA = getFacetCount('process', a);
    const countB = getFacetCount('process', b);
    if (countB !== countA) return countB - countA;
    return a.localeCompare(b, 'th');
  });

  let allSizes = new Set();
  baseProducts.forEach(p => {
    const rawSizes = [
      ...(p.filter_attributes?.sizes || []),
      ...(p.variants || []).map(v => v.size).filter(Boolean)
    ];
    rawSizes.forEach(s => {
      if (!s || s === 'มาตรฐาน' || s === 'ฟรีไซส์') return;
      if (/(ราคากิโลกรัม|กก\.|FLUX|Flux|แพ๊ค|กล่อง|ลัง|ห่อ)/i.test(s) && !/(mm|มม)/i.test(s)) return;
      const m = s.match(/(?:^|[^\d\.])(\d+(?:\.\d+)?)\s*(?:mm|มม|มมง|x|X|\.|\s|$)/);
      if (m) {
        const num = parseFloat(m[1]);
        if (!isNaN(num) && num >= 0.2 && num <= 12.0) {
          allSizes.add(`${num.toFixed(1)} mm`);
        }
      }
    });
  });
  const availableSizes = [...allSizes].sort((a, b) => parseFloat(a) - parseFloat(b));

  let allPackages = new Set();
  baseProducts.forEach(p => {
    const pkgs = p.filter_attributes?.packages;
    if (Array.isArray(pkgs)) {
      pkgs.forEach(pkg => { if (pkg && pkg !== 'มาตรฐาน') allPackages.add(pkg.trim()); });
    }
  });
  const availablePackages = [...allPackages].sort((a, b) => {
    const countA = getFacetCount('package', a);
    const countB = getFacetCount('package', b);
    if (countB !== countA) return countB - countA;
    return a.localeCompare(b, 'th');
  });

  let allStandards = new Set();
  baseProducts.forEach(p => {
    const stds = p.filter_attributes?.standards;
    if (Array.isArray(stds)) {
      stds.forEach(std => { if (std) allStandards.add(std.trim()); });
    }
  });
  const availableStandards = [...allStandards].sort((a, b) => {
    const countA = getFacetCount('standard', a);
    const countB = getFacetCount('standard', b);
    if (countB !== countA) return countB - countA;
    return a.localeCompare(b, 'th');
  });

  let allPositions = new Set();
  baseProducts.forEach(p => {
    const posList = p.filter_attributes?.welding_positions;
    if (Array.isArray(posList)) {
      posList.forEach(pos => {
        if (pos) {
          const cleanPos = pos.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
          if (cleanPos) allPositions.add(cleanPos);
        }
      });
    }
  });
  const availablePositions = [...allPositions].sort();

  // Machine Facets (Voltages, Amperages)
  let allVoltages = new Set();
  baseProducts.forEach(p => {
    const v = p.filter_attributes?.voltage;
    if (v) allVoltages.add(v.trim());
  });
  const availableVoltages = [...allVoltages].sort();

  let allAmps = new Set();
  baseProducts.forEach(p => {
    const a = p.filter_attributes?.amperage;
    if (a) allAmps.add(a.trim());
  });
  const availableAmperages = [...allAmps].sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));

  // Consumables Facets (Torch Categories, Torch Series, Part Types)
  let allTorchCats = new Set();
  baseProducts.forEach(p => {
    const tc = p.filter_attributes?.torch_category;
    if (tc) allTorchCats.add(tc.trim());
  });
  const availableTorchCategories = [...allTorchCats].sort((a, b) => {
    const countA = getFacetCount('torch_category', a);
    const countB = getFacetCount('torch_category', b);
    return countB - countA;
  });

  let allTorchSeries = new Set();
  baseProducts.forEach(p => {
    const ts = p.filter_attributes?.torch_series;
    if (Array.isArray(ts)) {
      ts.forEach(s => { if (s) allTorchSeries.add(s.trim()); });
    } else if (ts) {
      allTorchSeries.add(ts.trim());
    }
  });
  const availableTorchSeries = [...allTorchSeries].sort((a, b) => {
    const countA = getFacetCount('torch_series', a);
    const countB = getFacetCount('torch_series', b);
    return countB - countA;
  });

  let allPartTypes = new Set();
  baseProducts.forEach(p => {
    const pt = p.filter_attributes?.part_type;
    if (pt) allPartTypes.add(pt.trim());
  });
  const availablePartTypes = [...allPartTypes].sort((a, b) => {
    const countA = getFacetCount('part_type', a);
    const countB = getFacetCount('part_type', b);
    return countB - countA;
  });

  // Gas Equipment Facets (Gas Types, Equipment Types)
  let allGasTypes = new Set();
  baseProducts.forEach(p => {
    const gt = p.filter_attributes?.gas_type;
    if (gt) allGasTypes.add(gt.trim());
  });
  const availableGasTypes = [...allGasTypes].sort((a, b) => getFacetCount('gas_type', b) - getFacetCount('gas_type', a));

  let allEquipmentTypes = new Set();
  baseProducts.forEach(p => {
    const et = p.filter_attributes?.equipment_type;
    if (et) allEquipmentTypes.add(et.trim());
  });
  const availableEquipmentTypes = [...allEquipmentTypes].sort((a, b) => getFacetCount('equipment_type', b) - getFacetCount('equipment_type', a));

  let allFeatureTypes = new Set();
  baseProducts.forEach(p => {
    const ft = p.filter_attributes?.feature_type;
    if (ft && !['อุปกรณ์มาตรฐาน', 'ทั่วไป', 'หัวตัด/หัวเผามาตรฐาน', 'หัวตัด/เชื่อมมาตรฐาน'].includes(ft)) {
      allFeatureTypes.add(ft.trim());
    }
  });
  const availableFeatureTypes = [...allFeatureTypes].sort((a, b) => getFacetCount('feature_type', b) - getFacetCount('feature_type', a));

  // Abrasives Facets (Disc Types, Diameters, Grits, Target Materials)
  let allDiscTypes = new Set();
  baseProducts.forEach(p => {
    const dt = p.filter_attributes?.disc_type;
    if (dt) allDiscTypes.add(dt.trim());
  });
  const availableDiscTypes = [...allDiscTypes].sort((a, b) => getFacetCount('disc_type', b) - getFacetCount('disc_type', a));

  let allDiameters = new Set();
  baseProducts.forEach(p => {
    const dia = p.filter_attributes?.diameter;
    if (dia) allDiameters.add(dia.trim());
  });
  const availableDiameters = [...allDiameters].sort((a, b) => {
    const isInchA = a.includes('นิ้ว');
    const isInchB = b.includes('นิ้ว');
    if (isInchA && isInchB) {
      return (parseFloat(a) || 0) - (parseFloat(b) || 0);
    }
    if (isInchA && !isInchB) return -1;
    if (!isInchA && isInchB) return 1;
    return a.localeCompare(b, 'th');
  });

  let allGrits = new Set();
  baseProducts.forEach(p => {
    const g = p.filter_attributes?.grit;
    if (g && g !== 'มาตรฐาน') allGrits.add(g.trim());
  });
  const availableGrits = [...allGrits].sort((a, b) => (parseInt((a || '').replace(/\D/g, '')) || 0) - (parseInt((b || '').replace(/\D/g, '')) || 0));

  let allTargetMaterials = new Set();
  baseProducts.forEach(p => {
    const tm = p.filter_attributes?.target_material;
    if (Array.isArray(tm)) {
      tm.forEach(m => m && allTargetMaterials.add(m.trim()));
    } else if (tm) {
      allTargetMaterials.add(tm.trim());
    }
  });
  const availableTargetMaterials = [...allTargetMaterials].sort((a, b) => getFacetCount('target_material', b) - getFacetCount('target_material', a));

  // Gas Cylinders Facets (Capacities, Item Types)
  let allCapacities = new Set();
  baseProducts.forEach(p => {
    const cap = p.filter_attributes?.capacity;
    if (cap) allCapacities.add(cap.trim());
  });
  const capacityPriorityOrder = [
    '6 คิว (40L)',
    '2 คิว (13.4L)',
    '1.5 คิว (10L)',
    '0.5 คิว (4L ทรงอ้วน)',
    '0.5 คิว (3.4L ทรงผอม)',
    '0.5 คิว (3.4-4L)',
    '5 กก.',
    '3 กก.',
    'มาตรฐาน CGA-540',
    'มาตรฐาน CGA-580',
    'มาตรฐาน CGA-320',
    'มาตรฐาน CGA-300',
    'ขนาดมาตรฐาน'
  ];
  const availableCapacities = [...allCapacities].sort((a, b) => {
    const idxA = capacityPriorityOrder.indexOf(a);
    const idxB = capacityPriorityOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return getFacetCount('capacity', b) - getFacetCount('capacity', a);
  });

  let allItemTypes = new Set();
  baseProducts.forEach(p => {
    const it = p.filter_attributes?.item_type;
    if (it) allItemTypes.add(it.trim());
  });
  const itemTypePriorityOrder = [
    'ท่อบรรจุก๊าซ (Cylinder)',
    'รถเข็นท่อบรรจุก๊าซ (Trolley)',
    'หัววาล์วท่อก๊าซ (Valve)',
    'แก๊สกระป๋อง',
    'ถังกำเนิดแก๊ส (Carbide Generator)',
    'สายอัดก๊าซและอุปกรณ์เสริม',
    'แก๊สก้อน (Carbide)',
    'อุปกรณ์ท่อก๊าซ'
  ];
  const availableItemTypes = [...allItemTypes].sort((a, b) => {
    const idxA = itemTypePriorityOrder.indexOf(a);
    const idxB = itemTypePriorityOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return getFacetCount('item_type', b) - getFacetCount('item_type', a);
  });

  // Chemical Facets (Chemical Types, Functions, Packaging Forms)
  let allChemTypes = new Set();
  baseProducts.forEach(p => {
    const ct = p.filter_attributes?.chemical_type;
    if (ct) allChemTypes.add(ct.trim());
  });
  const chemTypePriorityOrder = [
    'น้ำยาตรวจสอบแนวเชื่อม (N.D.T. Crack Checker)',
    'น้ำยาป้องกันสะเก็ดไฟเชื่อม (Anti-Spatter)',
    'น้ำยาล้างแนวเชื่อมสแตนเลส (Pickling & Passivation)',
    'สเปรย์กัลวาไนซ์เคลือบกันสนิม (Cold Galvanize Spray)',
    'สเปรย์ทำความสะอาดและเคลือบเงาสแตนเลส (Stainless Care)',
    'น้ำยาประสานและฟลักซ์เชื่อม (Welding Flux)',
    'สเปรย์ทำความสะอาดหน้ากากเชื่อม (Welding Mask Cleaner)'
  ];
  const availableChemicalTypes = [...allChemTypes].sort((a, b) => {
    const idxA = chemTypePriorityOrder.indexOf(a);
    const idxB = chemTypePriorityOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return getFacetCount('chemical_type', b) - getFacetCount('chemical_type', a);
  });

  let allFuncTypes = new Set();
  baseProducts.forEach(p => {
    const ft = p.filter_attributes?.function_type;
    if (ft) allFuncTypes.add(ft.trim());
  });
  const availableFunctionTypes = [...allFuncTypes].sort((a, b) => getFacetCount('function_type', b) - getFacetCount('function_type', a));

  let allForms = new Set();
  baseProducts.forEach(p => {
    const f = p.filter_attributes?.form;
    if (f) allForms.add(f.trim());
  });
  const formPriorityOrder = [
    'สเปรย์กระป๋อง (Aerosol Spray)',
    'ถัง / แกลลอน (Liquid)',
    'เจล / ครีมทา (Paste / Gel)',
    'ชนิดผง (Powder)',
    'ชุดเซ็ตครบชุด (Set 3 กระป๋อง)'
  ];
  const availableForms = [...allForms].sort((a, b) => {
    const idxA = formPriorityOrder.indexOf(a);
    const idxB = formPriorityOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return getFacetCount('form', b) - getFacetCount('form', a);
  });

  // Tool Facets (Tool Types, Power Systems)
  let allToolTypes = new Set();
  baseProducts.forEach(p => {
    const tt = p.filter_attributes?.tool_type;
    if (tt) allToolTypes.add(tt.trim());
  });
  const availableToolTypes = [...allToolTypes].sort((a, b) => getFacetCount('tool_type', b) - getFacetCount('tool_type', a));

  let allPowerSystems = new Set();
  baseProducts.forEach(p => {
    const ps = p.filter_attributes?.power_system;
    if (ps) allPowerSystems.add(ps.trim());
  });
  const availablePowerSystems = [...allPowerSystems].sort((a, b) => getFacetCount('power_system', b) - getFacetCount('power_system', a));

  // Size / Amperage Box Chips Grid Generator (3 Columns, Multi-select Box Tiles)
  const generateSizeGridHTML = (values, filterKey = 'size') => {
    return `
      <div class="grid grid-cols-3 gap-2 py-1 size-grid-box">
        ${values.map(val => {
          return `
            <label class="size-box-chip relative flex items-center justify-center py-2.5 px-2 rounded-[4px] border border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-100 cursor-pointer transition-all duration-150 select-none text-center" data-facet-key="${filterKey}">
              <input type="checkbox" data-filter-key="${filterKey}" value="${val}" class="filter-checkbox filter-size-checkbox sr-only peer">
              <div class="flex items-center justify-center gap-0.5 peer-checked:text-brand-red peer-checked:font-semibold">
                <span class="text-[13.5px] font-medium text-[#252525] peer-checked:text-brand-red transition-colors">${val}</span>
              </div>
              <div class="absolute inset-0 rounded-[4px] border border-transparent pointer-events-none peer-checked:border-brand-red peer-checked:bg-brand-red/5 transition-all"></div>
              <svg class="absolute top-1 right-1 w-2.5 h-2.5 text-brand-red hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </label>
          `;
        }).join('')}
      </div>
    `;
  };

  // Basic Checkbox List for Top Quick Pills and Dropdowns (Clean: no count badge, brand-red checkmark)
  const generateCheckboxList = (values, filterKey) => {
    return values.map(val => {
      return `
        <label class="flex items-center gap-2 px-1.5 py-2.5 mb-1 hover:bg-gray-100 rounded-[4px] cursor-pointer transition-colors select-none" data-facet-key="${filterKey}">
          <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
            <input type="checkbox" data-filter-key="${filterKey}" value="${val}" class="filter-checkbox peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-red checked:border-brand-red cursor-pointer transition-all">
            <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span class="text-[14px] text-[#252525] truncate" title="${val}">${val}</span>
        </label>
      `;
    }).join('');
  };

  // Standard In-Accordion Generator (Top 8 Popular + Search Filter + Expandable Niche Standards)
  const generateStandardFacetHTML = (values, filterKey = 'standard') => {
    const topLimit = 8;
    const topValues = values.slice(0, topLimit);
    const moreValues = values.slice(topLimit);

    const renderItem = (val) => {
      return `
        <label class="flex items-center gap-2.5 px-2.5 py-2 hover:bg-gray-100 rounded-[4px] cursor-pointer transition-colors select-none" data-facet-key="${filterKey}">
          <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
            <input type="checkbox" data-filter-key="${filterKey}" value="${val}" class="filter-checkbox peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-red checked:border-brand-red cursor-pointer transition-all">
            <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span class="text-[14px] text-[#252525] truncate font-mono text-[13.5px]" title="${val}">${val}</span>
        </label>
      `;
    };

    return `
      <div id="drawer-${filterKey}-wrapper" class="space-y-1">
        <div class="px-1 pb-1.5">
          <div class="relative flex items-center">
            <input type="text" id="drawer-standard-search" placeholder="ค้นหาเกรด เช่น 308, 6013..." class="w-full text-[12.5px] pl-7 pr-3 py-1.5 rounded-[4px] border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-brand-green transition-all" />
            <svg class="w-3.5 h-3.5 text-gray-400 absolute left-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z" />
            </svg>
          </div>
        </div>

        <div id="drawer-${filterKey}-list" class="space-y-1">
          ${topValues.map(renderItem).join('')}
          ${moreValues.length > 0 ? `
            <div id="drawer-standard-more" class="hidden space-y-0.5">
              ${moreValues.map(renderItem).join('')}
            </div>
            <button type="button" id="btn-toggle-standard-more" class="w-full py-1.5 text-center text-[12.5px] text-brand-green font-medium hover:underline flex items-center justify-center gap-1 transition-colors">
              <span id="text-toggle-standard">ดูมาตรฐานทั้งหมด (+${moreValues.length} รายการ)</span>
              <svg id="arrow-toggle-standard" class="w-3.5 h-3.5 text-brand-green transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Brand Box Chips Grid Generator (2 Columns, Highlighted Brand Tiles)
  const generateBrandGridHTML = (values) => {
    return `
      <div class="grid grid-cols-2 gap-2 py-1 brand-grid-box">
        ${values.map(val => {
          return `
            <label class="brand-box-chip relative flex items-center justify-between py-2.5 px-3 rounded-[4px] border border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-100 cursor-pointer transition-all duration-150 select-none" data-facet-key="brand">
              <input type="checkbox" data-filter-key="brand" value="${val}" class="filter-checkbox filter-brand-checkbox sr-only peer">
              <span class="text-[13.5px] font-medium text-[#252525] peer-checked:text-black peer-checked:font-semibold truncate transition-colors pr-1" title="${val}">${val}</span>
              <div class="absolute inset-0 rounded-[4px] border border-transparent pointer-events-none peer-checked:border-black peer-checked:bg-neutral-50/70 transition-all"></div>
              <svg class="w-3.5 h-3.5 text-brand-red hidden peer-checked:block ml-1 shrink-0 z-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </label>
          `;
        }).join('')}
      </div>
    `;
  };

  // Drawer Facet Content: Specialized Grid for Brand, Size/Amps, Standard Curation, Clean Checkbox Lists for Others
  const generateDrawerFacetContent = (cfg) => {
    if (cfg.key === 'brand' || cfg.type === 'brand_grid') {
      return generateBrandGridHTML(cfg.values);
    }
    if (cfg.key === 'size' || cfg.type === 'grid') {
      return generateSizeGridHTML(cfg.values, cfg.key);
    }
    if (cfg.key === 'standard' || cfg.type === 'standard') {
      return generateStandardFacetHTML(cfg.values, cfg.key);
    }

    return `
      <div id="drawer-${cfg.key}-list" class="space-y-1">
        ${cfg.values.map(val => {
          return `
            <label class="flex items-center gap-2.5 px-2.5 py-2 hover:bg-gray-100 rounded-[4px] cursor-pointer transition-colors select-none" data-facet-key="${cfg.key}">
              <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" data-filter-key="${cfg.key}" value="${val}" class="filter-checkbox peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-red checked:border-brand-red cursor-pointer transition-all">
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-[14px] text-[#252525] truncate" title="${val}">${val}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  };

  // Dynamic Facets Configuration for Top Quick Pills (Top 3 core spec filters without brand)
  const topFilterConfigs = isMachines ? [
    { key: 'process', label: 'ประเภทเครื่อง', values: availableProcesses, type: 'list' },
    { key: 'voltage', label: 'ระบบไฟ', values: availableVoltages, type: 'list' },
    { key: 'amperage', label: 'กระแสไฟ', values: availableAmperages, type: 'grid' }
  ] : isConsumables ? [
    { key: 'torch_category', label: 'ระบบงาน', values: availableTorchCategories, type: 'list' },
    { key: 'part_type', label: 'ประเภทอะไหล่', values: availablePartTypes, type: 'list' },
    { key: 'torch_series', label: 'รุ่นหัวเชื่อม / ตัด', values: availableTorchSeries, type: 'list' }
  ] : isGasEquipment ? [
    { key: 'equipment_type', label: 'ประเภทอุปกรณ์', values: availableEquipmentTypes, type: 'list' },
    { key: 'gas_type', label: 'ระบบแก๊ส', values: availableGasTypes, type: 'list' },
    { key: 'feature_type', label: 'คุณสมบัติ', values: availableFeatureTypes, type: 'list' }
  ] : isAbrasives ? [
    { key: 'disc_type', label: 'ประเภทใบ', values: availableDiscTypes, type: 'list' },
    { key: 'diameter', label: 'ขนาดใบ', values: availableDiameters, type: 'list' },
    { key: 'target_material', label: 'วัสดุที่ใช้งาน', values: availableTargetMaterials, type: 'list' }
  ] : isGasCylinders ? [
    { key: 'item_type', label: 'ประเภทสินค้า', values: availableItemTypes, type: 'list' },
    { key: 'gas_type', label: 'ชนิดก๊าซ', values: availableGasTypes, type: 'list' },
    { key: 'capacity', label: 'ขนาดบรรจุ', values: availableCapacities, type: 'list' }
  ] : isChemicals ? [
    { key: 'chemical_type', label: 'ชนิดเคมีภัณฑ์', values: availableChemicalTypes, type: 'list' },
    { key: 'function_type', label: 'หน้าที่การทำงาน', values: availableFunctionTypes, type: 'list' },
    { key: 'form', label: 'รูปแบบบรรจุภัณฑ์', values: availableForms, type: 'list' }
  ] : isTools ? [
    { key: 'tool_type', label: 'ประเภทเครื่องมือ', values: availableToolTypes, type: 'list' },
    { key: 'power_system', label: 'ระบบกำลังไฟ', values: availablePowerSystems, type: 'list' }
  ] : isWeldingWire ? [
    { key: 'material', label: 'วัสดุที่เชื่อม', values: availableMaterials, type: 'list' },
    { key: 'process', label: 'กระบวนการเชื่อม', values: availableProcesses, type: 'list' },
    { key: 'size', label: 'ขนาดลวด', values: availableSizes, type: 'grid' }
  ] : [
    { key: 'material', label: 'วัสดุ', values: availableMaterials, type: 'list' },
    { key: 'process', label: 'ประเภทการใช้งาน', values: availableProcesses, type: 'list' },
    { key: 'size', label: 'ขนาด', values: availableSizes, type: 'grid' }
  ];

  // Dynamic Facets Configuration for Left Drawer
  let categoryFacetConfigs = [];
  if (isMachines) {
    categoryFacetConfigs = [
      { key: 'process', title: 'ประเภทเครื่อง / กระบวนการ', values: availableProcesses, open: false, type: 'list' },
      { key: 'voltage', title: 'ระบบไฟ (แรงดัน)', values: availableVoltages, open: false, type: 'list' },
      { key: 'amperage', title: 'กระแสไฟเชื่อม (Amp)', values: availableAmperages, open: false, type: 'grid' }
    ];
  } else if (isConsumables) {
    categoryFacetConfigs = [
      { key: 'torch_category', title: 'ระบบงาน', values: availableTorchCategories, open: false, type: 'list' },
      { key: 'part_type', title: 'ประเภทอะไหล่', values: availablePartTypes, open: false, type: 'list' },
      { key: 'torch_series', title: 'รุ่นหัวเชื่อม / หัวตัด', values: availableTorchSeries, open: false, type: 'list' }
    ];
  } else if (isGasEquipment) {
    categoryFacetConfigs = [
      { key: 'equipment_type', title: 'ประเภทอุปกรณ์', values: availableEquipmentTypes, open: false, type: 'list' },
      { key: 'gas_type', title: 'ระบบแก๊ส', values: availableGasTypes, open: false, type: 'list' }
    ];
    if (availableFeatureTypes.length > 0) {
      categoryFacetConfigs.push({ key: 'feature_type', title: 'คุณสมบัติ / การติดตั้ง', values: availableFeatureTypes, open: false, type: 'list' });
    }
  } else if (isAbrasives) {
    categoryFacetConfigs = [
      { key: 'disc_type', title: 'ประเภทใบตัด / ใบเจียร', values: availableDiscTypes, open: false, type: 'list' },
      { key: 'diameter', title: 'ขนาดใบ', values: availableDiameters, open: false, type: 'list' },
      { key: 'target_material', title: 'วัสดุที่ใช้งาน', values: availableTargetMaterials, open: false, type: 'list' }
    ];
    if (availableGrits.length > 0) {
      categoryFacetConfigs.push({ key: 'grit', title: 'เบอร์ความละเอียด (Grit)', values: availableGrits, open: false, type: 'list' });
    }
  } else if (isGasCylinders) {
    categoryFacetConfigs = [
      { key: 'item_type', title: 'ประเภทสินค้า', values: availableItemTypes, open: false, type: 'list' },
      { key: 'gas_type', title: 'ชนิดก๊าซ', values: availableGasTypes, open: false, type: 'list' },
      { key: 'capacity', title: 'ขนาดบรรจุ / ปริมาตร', values: availableCapacities, open: false, type: 'list' }
    ];
  } else if (isChemicals) {
    categoryFacetConfigs = [
      { key: 'chemical_type', title: 'ชนิดเคมีภัณฑ์', values: availableChemicalTypes, open: false, type: 'list' },
      { key: 'function_type', title: 'หน้าที่การทำงาน / สเต็ปการใช้งาน', values: availableFunctionTypes, open: false, type: 'list' },
      { key: 'form', title: 'รูปแบบบรรจุภัณฑ์', values: availableForms, open: false, type: 'list' }
    ];
  } else if (isTools) {
    categoryFacetConfigs = [
      { key: 'tool_type', title: 'ประเภทเครื่องมือ', values: availableToolTypes, open: false, type: 'list' },
      { key: 'power_system', title: 'ระบบกำลังไฟ', values: availablePowerSystems, open: false, type: 'list' },
      { key: 'brand', title: 'แบรนด์ผู้ผลิต', values: availableBrands, open: false, type: 'list' }
    ];
  } else if (isWeldingWire) {
    categoryFacetConfigs = [
      { key: 'material', title: 'วัสดุที่เชื่อม', values: availableMaterials, open: false, type: 'list' },
      { key: 'process', title: 'กระบวนการเชื่อม', values: availableProcesses, open: false, type: 'list' },
      { key: 'size', title: 'ขนาดลวด', values: availableSizes, open: false, type: 'grid' },
      { key: 'package', title: 'รูปแบบบรรจุภัณฑ์', values: availablePackages, open: false, type: 'list' },
      { key: 'standard', title: 'มาตรฐาน AWS', values: availableStandards, open: false, type: 'standard' }
    ];
  } else {
    categoryFacetConfigs = [
      { key: 'material', title: 'วัสดุ', values: availableMaterials, open: false, type: 'list' },
      { key: 'process', title: 'ประเภทการใช้งาน', values: availableProcesses, open: false, type: 'list' },
      { key: 'size', title: 'ขนาด', values: availableSizes, open: false, type: 'grid' }
    ];
  }

  // Populate Top Dropdowns dynamically
  const dynamicTopPillsContainer = document.getElementById('dynamic-top-pills');
  if (dynamicTopPillsContainer) {
    dynamicTopPillsContainer.innerHTML = topFilterConfigs
      .filter(cfg => cfg.values.length > 0)
      .map(cfg => {
        const contentHTML = cfg.type === 'grid'
          ? generateSizeGridHTML(cfg.values, cfg.key)
          : generateCheckboxList(cfg.values, cfg.key);

        return `
          <div class="relative inline-block text-left" data-top-pill="${cfg.key}">
            <button data-filter-type="${cfg.key}" class="filter-btn flex items-center gap-2 px-4 md:px-4.5 h-[38px] md:h-[40px] rounded-full border border-gray-300 text-[13.5px] md:text-[14px] text-gray-800 hover:bg-gray-100 hover:border-gray-400 bg-white transition-all whitespace-nowrap">
              <span class="filter-btn-text">${cfg.label}</span>
              <svg class="filter-arrow w-3.5 h-3.5 text-gray-500 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="filter-dropdown absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-3 hidden z-50">
              <div class="max-h-80 overflow-y-auto pr-1">
                ${contentHTML}
              </div>
              <div class="flex items-center justify-between pt-2.5 px-1 mt-1.5">
                <button class="btn-clear-filter text-[14px] text-gray-700 hover:text-black underline underline-offset-2 transition-colors cursor-pointer" data-filter-key="${cfg.key}">ล้าง</button>
                <button class="btn-view-products px-5 py-2 bg-[#252525] text-white text-[14px] font-medium rounded-[4px] hover:bg-black transition-colors cursor-pointer">ดูสินค้า</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
  }

  // Populate Drawer Brand List
  const drawerBrandList = document.getElementById('drawer-brand-list');
  if (drawerBrandList) {
    drawerBrandList.innerHTML = generateDrawerFacetContent({ key: 'brand', title: 'แบรนด์', values: availableBrands, type: 'brand_grid' });
  }

  // Populate Drawer Category Facets
  const categoryFacetsContainer = document.getElementById('drawer-category-facets');
  if (categoryFacetsContainer) {
    categoryFacetsContainer.innerHTML = categoryFacetConfigs
      .filter(cfg => cfg.values.length > 0)
      .map(cfg => {
        const isOpen = cfg.open;
        const arrowClass = isOpen ? 'rotate-90' : '';
        const contentClass = isOpen ? '' : 'hidden';
        return `
          <div class="drawer-accordion py-3.5" data-accordion="${cfg.key}">
            <button type="button" class="drawer-accordion-btn flex items-center justify-between w-full text-left font-medium text-[15px] text-[#252525] hover:text-black transition-colors cursor-pointer">
              <span class="flex items-center gap-1.5">
                <span>${cfg.title}</span>
                <span class="drawer-facet-count text-xs text-brand-red font-semibold hidden" data-count-key="${cfg.key}"></span>
              </span>
              <svg class="drawer-accordion-arrow w-4 h-4 text-gray-400 transition-transform duration-200 ${arrowClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div class="drawer-accordion-content pt-3 pb-2 ${contentClass}">
              ${generateDrawerFacetContent(cfg)}
            </div>
          </div>
        `;
      }).join('');
  }

  // Universal Search inside Drawer Header (Single Search Box at Top of Drawer)
  const universalSearchInput = document.getElementById('drawer-universal-search');
  const universalSearchClear = document.getElementById('drawer-search-clear');

  if (universalSearchInput) {
    const handleUniversalSearch = (queryText) => {
      const q = queryText.toLowerCase().trim();
      if (universalSearchClear) {
        if (q) {
          universalSearchClear.classList.remove('hidden');
        } else {
          universalSearchClear.classList.add('hidden');
        }
      }

      const allDrawerItems = document.querySelectorAll('#filter-drawer label[data-facet-key]');
      const matchCounts = {};

      allDrawerItems.forEach(item => {
        const key = item.getAttribute('data-facet-key');
        const textSpan = item.querySelector('span.text-\\[14px\\], span.text-\\[13px\\]');
        const text = textSpan ? textSpan.textContent.toLowerCase() : '';
        const isMatch = q === '' || text.includes(q);

        item.style.display = isMatch ? '' : 'none';
        if (isMatch) {
          matchCounts[key] = (matchCounts[key] || 0) + 1;
        }
      });

      // Show/Hide or Auto-expand accordions based on matches
      document.querySelectorAll('#filter-drawer .drawer-accordion').forEach(acc => {
        const accKey = acc.getAttribute('data-accordion');
        if (accKey === 'price') return;

        const content = acc.querySelector('.drawer-accordion-content');
        const arrow = acc.querySelector('.drawer-accordion-arrow');

        if (q === '') {
          acc.style.display = '';
        } else {
          const count = matchCounts[accKey] || 0;
          if (count > 0) {
            acc.style.display = '';
            if (content) content.classList.remove('hidden');
            if (arrow) arrow.classList.add('rotate-180');
          } else {
            acc.style.display = 'none';
          }
        }
      });
    };

    universalSearchInput.addEventListener('input', (e) => {
      handleUniversalSearch(e.target.value);
    });

    if (universalSearchClear) {
      universalSearchClear.addEventListener('click', () => {
        universalSearchInput.value = '';
        handleUniversalSearch('');
        universalSearchInput.focus();
      });
    }
  }

  // Standard In-Accordion Search & Toggle
  const standardSearchInput = document.getElementById('drawer-standard-search');
  const standardMoreDiv = document.getElementById('drawer-standard-more');
  const toggleStandardBtn = document.getElementById('btn-toggle-standard-more');
  const textToggleStandard = document.getElementById('text-toggle-standard');
  const arrowToggleStandard = document.getElementById('arrow-toggle-standard');

  if (toggleStandardBtn && standardMoreDiv) {
    toggleStandardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = !standardMoreDiv.classList.contains('hidden');
      if (isExpanded) {
        standardMoreDiv.classList.add('hidden');
        if (textToggleStandard) textToggleStandard.textContent = `ดูมาตรฐานทั้งหมด (+${availableStandards.length - 8} รายการ)`;
        if (arrowToggleStandard) arrowToggleStandard.classList.remove('rotate-180');
      } else {
        standardMoreDiv.classList.remove('hidden');
        if (textToggleStandard) textToggleStandard.textContent = 'ย่อรายการมาตรฐาน';
        if (arrowToggleStandard) arrowToggleStandard.classList.add('rotate-180');
      }
    });
  }

  if (standardSearchInput) {
    standardSearchInput.addEventListener('input', (e) => {
      const sq = e.target.value.toLowerCase().trim();
      const standardItems = document.querySelectorAll('#drawer-standard-wrapper label[data-facet-key="standard"]');
      
      if (sq) {
        if (standardMoreDiv) standardMoreDiv.classList.remove('hidden');
        if (toggleStandardBtn) toggleStandardBtn.classList.add('hidden');
      } else {
        if (standardMoreDiv) standardMoreDiv.classList.add('hidden');
        if (toggleStandardBtn) {
          toggleStandardBtn.classList.remove('hidden');
          if (textToggleStandard) textToggleStandard.textContent = `ดูมาตรฐานทั้งหมด (+${availableStandards.length - 8} รายการ)`;
          if (arrowToggleStandard) arrowToggleStandard.classList.remove('rotate-180');
        }
      }

      standardItems.forEach(item => {
        const textSpan = item.querySelector('span');
        const text = textSpan ? textSpan.textContent.toLowerCase() : '';
        item.style.display = (sq === '' || text.includes(sq)) ? '' : 'none';
      });
    });
  }

  // Accordion Toggle Interactivity (Single-Open / Exclusive Accordion)
  const bindAccordionEvents = () => {
    document.querySelectorAll('.drawer-accordion-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentAccordion = btn.closest('.drawer-accordion');
        const content = btn.nextElementSibling;
        const arrow = btn.querySelector('.drawer-accordion-arrow');
        const isCurrentlyOpen = content && !content.classList.contains('hidden');

        // Close all other accordions in the drawer
        document.querySelectorAll('#filter-drawer .drawer-accordion').forEach(acc => {
          if (acc !== currentAccordion) {
            const otherContent = acc.querySelector('.drawer-accordion-content');
            const otherArrow = acc.querySelector('.drawer-accordion-arrow');
            if (otherContent) otherContent.classList.add('hidden');
            if (otherArrow) otherArrow.classList.remove('rotate-90');
          }
        });

        // Toggle clicked accordion
        if (content) {
          if (isCurrentlyOpen) {
            content.classList.add('hidden');
            if (arrow) arrow.classList.remove('rotate-90');
          } else {
            content.classList.remove('hidden');
            if (arrow) arrow.classList.add('rotate-90');
          }
        }
      });
    });
  };
  bindAccordionEvents();

  // Drawer Open / Close Functions
  const filterDrawer = document.getElementById('filter-drawer');
  const filterDrawerBackdrop = document.getElementById('filter-drawer-backdrop');
  const btnOpenDrawer = document.getElementById('btn-open-filter-drawer');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const btnApplyDrawer = document.getElementById('drawer-apply-btn');

  const closeAllDropdowns = () => {
    document.querySelectorAll('.filter-dropdown').forEach(dd => dd.classList.add('hidden'));
    document.querySelectorAll('.filter-arrow').forEach(arrow => arrow.classList.remove('rotate-180'));
    const sortDropdown = document.getElementById('sort-dropdown');
    const sortArrow = document.getElementById('sort-arrow');
    if (sortDropdown) sortDropdown.classList.add('hidden');
    if (sortArrow) sortArrow.classList.remove('-rotate-180');
  };

  const openDrawer = () => {
    if (!filterDrawer || !filterDrawerBackdrop) return;
    closeAllDropdowns();
    filterDrawerBackdrop.classList.remove('hidden', 'pointer-events-none');
    requestAnimationFrame(() => {
      filterDrawerBackdrop.classList.remove('opacity-0');
      filterDrawerBackdrop.classList.add('opacity-100');
      filterDrawer.classList.remove('-translate-x-full');
      filterDrawer.classList.add('translate-x-0');
      filterDrawer.setAttribute('aria-hidden', 'false');
    });
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!filterDrawer || !filterDrawerBackdrop) return;
    filterDrawer.classList.remove('translate-x-0');
    filterDrawer.classList.add('-translate-x-full');
    filterDrawer.setAttribute('aria-hidden', 'true');
    filterDrawerBackdrop.classList.remove('opacity-100');
    filterDrawerBackdrop.classList.add('opacity-0');
    filterDrawerBackdrop.classList.add('pointer-events-none');
    setTimeout(() => {
      filterDrawerBackdrop.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  };

  if (btnOpenDrawer) btnOpenDrawer.addEventListener('click', openDrawer);
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);
  if (filterDrawerBackdrop) filterDrawerBackdrop.addEventListener('click', closeDrawer);
  if (btnApplyDrawer) btnApplyDrawer.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterDrawer && !filterDrawer.classList.contains('-translate-x-full')) {
      closeDrawer();
    }
  });

  // In-Stock Toggle Switch
  const inStockToggle = document.getElementById('toggle-instock-only');
  if (inStockToggle) {
    inStockToggle.addEventListener('change', (e) => {
      activeFilters.instock_only = e.target.checked;
      applyFilters();
    });
  }

  // Price Range Inputs
  const priceMinInput = document.getElementById('drawer-price-min');
  const priceMaxInput = document.getElementById('drawer-price-max');
  const btnApplyPrice = document.getElementById('btn-apply-price');

  const handlePriceApply = () => {
    const minVal = parseFloat(priceMinInput.value);
    const maxVal = parseFloat(priceMaxInput.value);
    activeFilters.price_min = !isNaN(minVal) && minVal >= 0 ? minVal : null;
    activeFilters.price_max = !isNaN(maxVal) && maxVal >= 0 ? maxVal : null;
    applyFilters();
  };

  if (btnApplyPrice) {
    btnApplyPrice.addEventListener('click', (e) => {
      e.preventDefault();
      handlePriceApply();
    });
  }
  [priceMinInput, priceMaxInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handlePriceApply();
        }
      });
    }
  });

  // Two-Way Sync for all Checkboxes
  const handleCheckboxChange = (e) => {
    const key = e.target.getAttribute('data-filter-key');
    const val = e.target.value;
    const isChecked = e.target.checked;

    if (!key || !activeFilters[key]) return;

    // Synchronize matching checkboxes in top dropdown and drawer
    document.querySelectorAll(`.filter-checkbox[data-filter-key="${key}"]`).forEach(cb => {
      if (cb.value === val) cb.checked = isChecked;
    });

    if (isChecked) {
      if (!activeFilters[key].includes(val)) activeFilters[key].push(val);
      if (key === 'standard' && standardMoreDiv && standardMoreDiv.querySelector(`input[value="${val}"]`)) {
        standardMoreDiv.classList.remove('hidden');
        if (textToggleStandard) textToggleStandard.textContent = 'ย่อรายการมาตรฐาน';
        if (arrowToggleStandard) arrowToggleStandard.classList.add('rotate-180');
      }
    } else {
      activeFilters[key] = activeFilters[key].filter(v => v !== val);
    }
    applyFilters();
  };

  const bindCheckboxEvents = () => {
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
      cb.removeEventListener('change', handleCheckboxChange);
      cb.addEventListener('change', handleCheckboxChange);
    });
  };
  bindCheckboxEvents();

  // Clear All Filters Helper
  const resetAllFilters = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    ALL_FILTER_KEYS.forEach(k => {
      activeFilters[k] = [];
    });
    activeFilters.instock_only = false;
    activeFilters.price_min = null;
    activeFilters.price_max = null;

    document.querySelectorAll('.filter-checkbox').forEach(cb => { cb.checked = false; });
    if (inStockToggle) inStockToggle.checked = false;
    if (priceMinInput) priceMinInput.value = '';
    if (priceMaxInput) priceMaxInput.value = '';
    if (standardSearchInput) {
      standardSearchInput.value = '';
      document.querySelectorAll('#drawer-standard-wrapper label[data-facet-key="standard"]').forEach(item => { item.style.display = ''; });
      if (standardMoreDiv) standardMoreDiv.classList.add('hidden');
      if (toggleStandardBtn) {
        toggleStandardBtn.classList.remove('hidden');
        if (textToggleStandard) textToggleStandard.textContent = `ดูมาตรฐานทั้งหมด (+${availableStandards.length - 8} รายการ)`;
        if (arrowToggleStandard) arrowToggleStandard.classList.remove('rotate-180');
      }
    }
    applyFilters();
  };

  const drawerClearAll = document.getElementById('drawer-clear-all');
  if (drawerClearAll) drawerClearAll.addEventListener('click', resetAllFilters);

  // Render Active Pills Row
  const renderActivePills = () => {
    let pillsHTML = '';
    let hasFilters = false;

    ALL_FILTER_KEYS.forEach(k => {
      if ((activeFilters[k] || []).length > 0) hasFilters = true;
    });
    if (activeFilters.instock_only) hasFilters = true;
    if (activeFilters.price_min !== null || activeFilters.price_max !== null) hasFilters = true;

    if (hasFilters) {
      pillsHTML += `
        <button id="clear-all-filters" class="flex items-center justify-center w-[32px] h-[32px] md:w-[34px] md:h-[34px] rounded-full border border-gray-300 text-[#252525] hover:border-gray-500 hover:bg-gray-100 transition-colors shrink-0 cursor-pointer" title="ล้างตัวกรองทั้งหมด">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      `;
    }

    if (activeFilters.instock_only) {
      pillsHTML += `
        <div class="flex items-center gap-2 bg-[#EDEDED] px-3.5 h-[32px] md:h-[34px] rounded-full text-[13.5px] md:text-[14px] font-normal text-[#252525]">
          <span>พร้อมส่ง</span>
          <button id="remove-instock-pill" class="text-[#252525] hover:text-red-500 transition-colors flex items-center justify-center p-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
      `;
    }

    if (activeFilters.price_min !== null || activeFilters.price_max !== null) {
      const minText = activeFilters.price_min !== null ? `฿${activeFilters.price_min.toLocaleString()}` : '฿0';
      const maxText = activeFilters.price_max !== null ? `฿${activeFilters.price_max.toLocaleString()}` : '...';
      pillsHTML += `
        <div class="flex items-center gap-2 bg-[#EDEDED] px-3.5 h-[32px] md:h-[34px] rounded-full text-[13.5px] md:text-[14px] font-normal text-[#252525]">
          <span>${minText} - ${maxText}</span>
          <button id="remove-price-pill" class="text-[#252525] hover:text-red-500 transition-colors flex items-center justify-center p-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
      `;
    }

    ALL_FILTER_KEYS.forEach(key => {
      (activeFilters[key] || []).forEach(val => {
        pillsHTML += `
          <div class="flex items-center gap-2 bg-[#EDEDED] px-3.5 h-[32px] md:h-[34px] rounded-full text-[13.5px] md:text-[14px] font-normal text-[#252525]">
            <span>${val}</span>
            <button data-filter-key="${key}" data-value="${val}" class="remove-pill-btn text-[#252525] hover:text-red-500 transition-colors flex items-center justify-center p-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
        `;
      });
    });

    if (activePillsContainer) {
      activePillsContainer.innerHTML = pillsHTML;
      if (hasFilters) activePillsContainer.classList.remove('hidden');
      else activePillsContainer.classList.add('hidden');
    }

    document.querySelectorAll('.remove-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-filter-key');
        const val = e.currentTarget.getAttribute('data-value');
        if (key && activeFilters[key]) {
          activeFilters[key] = activeFilters[key].filter(v => v !== val);
          document.querySelectorAll(`.filter-checkbox[data-filter-key="${key}"]`).forEach(cb => {
            if (cb.value === val) cb.checked = false;
          });
          applyFilters();
        }
      });
    });

    const removeInstockPill = document.getElementById('remove-instock-pill');
    if (removeInstockPill) {
      removeInstockPill.addEventListener('click', () => {
        activeFilters.instock_only = false;
        if (inStockToggle) inStockToggle.checked = false;
        applyFilters();
      });
    }

    const removePricePill = document.getElementById('remove-price-pill');
    if (removePricePill) {
      removePricePill.addEventListener('click', () => {
        activeFilters.price_min = null;
        activeFilters.price_max = null;
        if (priceMinInput) priceMinInput.value = '';
        if (priceMaxInput) priceMaxInput.value = '';
        applyFilters();
      });
    }

    const clearAllBtn = document.getElementById('clear-all-filters');
    if (clearAllBtn) clearAllBtn.addEventListener('click', resetAllFilters);
  };

  // Update Badges & Active Indicators
  const updateFilterBadges = (filteredCount) => {
    let totalActive = 0;
    ALL_FILTER_KEYS.forEach(k => {
      totalActive += (activeFilters[k] || []).length;
    });
    if (activeFilters.instock_only) totalActive += 1;
    if (activeFilters.price_min !== null || activeFilters.price_max !== null) totalActive += 1;

    // Active Badge on Main Filter Pill Button (Keep clean border-gray-300, update only number inside)
    const badgeEl = document.getElementById('active-filter-badge');
    if (badgeEl) {
      if (totalActive > 0) {
        badgeEl.textContent = `(${totalActive})`;
        badgeEl.classList.remove('hidden');
      } else {
        badgeEl.classList.add('hidden');
      }
    }

    // Drawer CTA button count
    const drawerCountEl = document.getElementById('drawer-count');
    if (drawerCountEl) drawerCountEl.textContent = filteredCount;

    // Drawer Brand badge
    const drawerBrandCountEl = document.getElementById('drawer-brand-count');
    if (drawerBrandCountEl) {
      if (activeFilters.brand.length > 0) {
        drawerBrandCountEl.textContent = `(${activeFilters.brand.length})`;
        drawerBrandCountEl.classList.remove('hidden');
      } else {
        drawerBrandCountEl.classList.add('hidden');
      }
    }

    // Drawer Facet count badges
    document.querySelectorAll('.drawer-facet-count').forEach(el => {
      const k = el.getAttribute('data-count-key');
      if (activeFilters[k] && activeFilters[k].length > 0) {
        el.textContent = `(${activeFilters[k].length})`;
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Drawer Price badge
    const priceBadgeEl = document.getElementById('drawer-price-badge');
    if (priceBadgeEl) {
      if (activeFilters.price_min !== null || activeFilters.price_max !== null) {
        priceBadgeEl.textContent = '(เลือกแล้ว)';
        priceBadgeEl.classList.remove('hidden');
      } else {
        priceBadgeEl.classList.add('hidden');
      }
    }

    // Top Filter Buttons Styling (Selected: black border without count; Unselected: gray-300 border)
    topFilterConfigs.forEach(cfg => {
      const btn = document.querySelector(`button[data-filter-type="${cfg.key}"]`);
      if (!btn) return;
      const textSpan = btn.querySelector('.filter-btn-text');
      const arrow = btn.querySelector('.filter-arrow');
      const count = (activeFilters[cfg.key] || []).length;
      if (count > 0) {
        // อันที่เลือก: เป็นเส้นขอบดำบาง และไม่ขึ้นจำนวน (จำนวนไปขึ้นที่ตัวกรองหลัก)
        textSpan.textContent = cfg.label;
        btn.classList.remove('border-gray-300', 'text-gray-800');
        btn.classList.add('border-black', 'text-black', 'font-medium');
        if (arrow) {
          arrow.classList.remove('text-gray-500');
          arrow.classList.add('text-black');
        }
      } else {
        // อันที่ไม่ได้เลือก: เส้นขอบเทาบางปกติ
        textSpan.textContent = cfg.label;
        btn.classList.remove('border-black', 'text-black', 'font-medium');
        btn.classList.add('border-gray-300', 'text-gray-800');
        if (arrow) {
          arrow.classList.remove('text-black');
          arrow.classList.add('text-gray-500');
        }
      }
    });
  };

  let currentSortMode = 'สินค้าแนะนำ';
  const PAGE_SIZE = 20;
  let currentVisibleCount = PAGE_SIZE;
  let currentFilteredProducts = [];

  const updateLoadMoreVisibility = () => {
    const loadMoreContainer = document.getElementById('load-more-container');
    if (!loadMoreContainer) return;
    if (currentFilteredProducts.length > currentVisibleCount) {
      loadMoreContainer.classList.remove('hidden');
    } else {
      loadMoreContainer.classList.add('hidden');
    }
  };

  const getStartingPrice = (product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map(v => v.price));
  };

  // Main Filter Evaluation
  applyFilters = () => {
    let filtered = baseProducts.filter(p => {
      // 1. Brand
      if (activeFilters.brand.length > 0 && !activeFilters.brand.includes(p.brand)) {
        return false;
      }

      // 2. Material
      if (activeFilters.material.length > 0) {
        const pMat = p.filter_attributes?.material;
        const pMatArr = Array.isArray(pMat) ? pMat : (pMat ? [pMat] : []);
        const matched = pMatArr.some(m => activeFilters.material.includes(m));
        if (!matched) return false;
      }

      // 3. Process
      if (activeFilters.process.length > 0) {
        const proc = p.filter_attributes?.process;
        const pProcArr = Array.isArray(proc) ? proc : (proc ? [proc] : []);
        const matched = pProcArr.some(pr => activeFilters.process.includes(pr));
        if (!matched) return false;
      }

      // 4. Size
      if (activeFilters.size.length > 0) {
        const selectedSizeNums = activeFilters.size.map(s => parseFloat(s)).filter(n => !isNaN(n));
        const hasAttrSize = p.filter_attributes?.sizes && p.filter_attributes.sizes.some(s => {
          const num = parseFloat(s);
          return !isNaN(num) && selectedSizeNums.includes(num);
        });
        const hasVariantSize = p.variants && p.variants.some(v => {
          if (!v.size) return false;
          const m = v.size.match(/(?:^|[^\d\.])(\d+(?:\.\d+)?)\s*(?:mm|มม|มมง|x|X|\.|\s|$)/);
          return m && selectedSizeNums.includes(parseFloat(m[1]));
        });
        if (!hasVariantSize && !hasAttrSize) return false;
      }

      // 5. Package
      if (activeFilters.package.length > 0) {
        const pkgs = p.filter_attributes?.packages || [];
        const matched = pkgs.some(pkg => activeFilters.package.includes(pkg.trim()));
        if (!matched) return false;
      }

      // 6. Standard (AWS)
      if (activeFilters.standard.length > 0) {
        const hasAttrStd = p.filter_attributes?.standards && p.filter_attributes.standards.some(std => activeFilters.standard.includes(std.trim()));
        if (!hasAttrStd) return false;
      }

      // 7. Welding Position
      if (activeFilters.welding_position.length > 0) {
        if (!p.filter_attributes?.welding_positions) return false;
        const matched = p.filter_attributes.welding_positions.some(pos => {
          const clean = pos.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
          return activeFilters.welding_position.includes(clean);
        });
        if (!matched) return false;
      }

      // 8. Voltage (Machines)
      if (activeFilters.voltage.length > 0) {
        const pVolt = p.filter_attributes?.voltage;
        if (!pVolt || !activeFilters.voltage.includes(pVolt)) return false;
      }

      // 9. Amperage (Machines)
      if (activeFilters.amperage.length > 0) {
        const pAmp = p.filter_attributes?.amperage;
        if (!pAmp || !activeFilters.amperage.includes(pAmp)) return false;
      }

      // 10. Torch Category (Consumables)
      if (activeFilters.torch_category.length > 0) {
        const pTc = p.filter_attributes?.torch_category;
        if (!pTc || !activeFilters.torch_category.includes(pTc)) return false;
      }

      // 11. Torch Series (Consumables)
      if (activeFilters.torch_series.length > 0) {
        const pTs = p.filter_attributes?.torch_series;
        const pTsArr = Array.isArray(pTs) ? pTs : (pTs ? [pTs] : []);
        const matched = pTsArr.some(s => activeFilters.torch_series.includes(s));
        if (!matched) return false;
      }

      // 12. Part Type (Consumables)
      if (activeFilters.part_type.length > 0) {
        const pPt = p.filter_attributes?.part_type;
        if (!pPt || !activeFilters.part_type.includes(pPt)) return false;
      }

      // 13. Gas Type (Gas Equipment & Cylinders)
      if (activeFilters.gas_type.length > 0) {
        const pGt = p.filter_attributes?.gas_type;
        if (!pGt || !activeFilters.gas_type.includes(pGt)) return false;
      }

      // 14. Equipment Type (Gas Equipment)
      if (activeFilters.equipment_type.length > 0) {
        const pEt = p.filter_attributes?.equipment_type;
        if (!pEt || !activeFilters.equipment_type.includes(pEt)) return false;
      }

      // 14.1. Feature Type (Gas Equipment)
      if (activeFilters.feature_type.length > 0) {
        const pFt = p.filter_attributes?.feature_type;
        if (!pFt || !activeFilters.feature_type.includes(pFt)) return false;
      }

      // 15. Disc Type (Abrasives)
      if (activeFilters.disc_type.length > 0) {
        const pDt = p.filter_attributes?.disc_type;
        if (!pDt || !activeFilters.disc_type.includes(pDt)) return false;
      }

      // 16. Diameter (Abrasives)
      if (activeFilters.diameter.length > 0) {
        const pDia = p.filter_attributes?.diameter;
        if (!pDia || !activeFilters.diameter.includes(pDia)) return false;
      }

      // 17. Grit (Abrasives)
      if (activeFilters.grit.length > 0) {
        const pGrit = p.filter_attributes?.grit;
        if (!pGrit || !activeFilters.grit.includes(pGrit)) return false;
      }

      // 18. Target Material (Abrasives)
      if (activeFilters.target_material.length > 0) {
        const pTm = p.filter_attributes?.target_material;
        if (!pTm) return false;
        if (Array.isArray(pTm)) {
          if (!pTm.some(m => activeFilters.target_material.includes(m))) return false;
        } else {
          if (!activeFilters.target_material.includes(pTm)) return false;
        }
      }

      // 19. Capacity (Gas Cylinders)
      if (activeFilters.capacity.length > 0) {
        const pCap = p.filter_attributes?.capacity;
        if (!pCap || !activeFilters.capacity.includes(pCap)) return false;
      }

      // 20. Item Type (Gas Cylinders)
      if (activeFilters.item_type.length > 0) {
        const pIt = p.filter_attributes?.item_type;
        if (!pIt || !activeFilters.item_type.includes(pIt)) return false;
      }

      // 21. Chemical Type (Chemicals)
      if (activeFilters.chemical_type.length > 0) {
        const pCt = p.filter_attributes?.chemical_type;
        if (!pCt || !activeFilters.chemical_type.includes(pCt)) return false;
      }

      // 21.1 Function Type (Chemicals)
      if (activeFilters.function_type.length > 0) {
        const pFt = p.filter_attributes?.function_type;
        if (!pFt || !activeFilters.function_type.includes(pFt)) return false;
      }

      // 22. Form (Chemicals)
      if (activeFilters.form.length > 0) {
        const pForm = p.filter_attributes?.form;
        if (!pForm || !activeFilters.form.includes(pForm)) return false;
      }

      // 23. Tool Type (Tools)
      if (activeFilters.tool_type.length > 0) {
        const pTt = p.filter_attributes?.tool_type;
        if (!pTt || !activeFilters.tool_type.includes(pTt)) return false;
      }

      // 24. Power System (Tools)
      if (activeFilters.power_system.length > 0) {
        const pPs = p.filter_attributes?.power_system;
        if (!pPs || !activeFilters.power_system.includes(pPs)) return false;
      }

      // 25. In-Stock Only
      if (activeFilters.instock_only) {
        const inStockFlag = p.flags?.is_in_stock !== false;
        const hasStockVariants = p.variants && p.variants.length > 0
          ? p.variants.some(v => (v.stock || 0) > 0)
          : true;
        if (!inStockFlag || !hasStockVariants) return false;
      }

      // 14. Price Range
      const startingPrice = getStartingPrice(p);
      if (activeFilters.price_min !== null && !isNaN(activeFilters.price_min)) {
        if (startingPrice < activeFilters.price_min) return false;
      }
      if (activeFilters.price_max !== null && !isNaN(activeFilters.price_max)) {
        if (startingPrice > activeFilters.price_max) return false;
      }

      return true;
    });

    renderActivePills();
    updateFilterBadges(filtered.length);

    // Grid Rendering & Sorting
    if (gridEl) {
      if (filtered.length > 0) {
        if (currentSortMode === 'สินค้ามาใหม่') {
          filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        } else if (currentSortMode === 'สินค้าขายดี') {
          filtered.sort((a, b) => (b.flags?.is_best_seller ? 1 : 0) - (a.flags?.is_best_seller ? 1 : 0) || (b.sold_count || 0) - (a.sold_count || 0));
        } else if (currentSortMode === 'ราคา: ต่ำ-สูง') {
          filtered.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
        } else if (currentSortMode === 'ราคา: สูง-ต่ำ') {
          filtered.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
        } else if (currentSortMode === 'ชื่อสินค้า: A - Z') {
          filtered.sort((a, b) => a.name.localeCompare(b.name, 'th'));
        } else {
          // Default: สินค้าแนะนำ
          filtered.sort((a, b) => (b.flags?.is_recommended ? 1 : 0) - (a.flags?.is_recommended ? 1 : 0));
        }
        currentFilteredProducts = filtered;
        currentVisibleCount = PAGE_SIZE;
        const visibleProducts = currentFilteredProducts.slice(0, currentVisibleCount);
        gridEl.innerHTML = visibleProducts.map(product => generateCardHTML(product, true)).join('');
        updateLoadMoreVisibility();
      } else {
        currentFilteredProducts = [];
        currentVisibleCount = PAGE_SIZE;
        gridEl.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500 text-[18px]">ไม่พบสินค้าที่ตรงกับเงื่อนไข</div>`;
        updateLoadMoreVisibility();
      }
    }

    if (countEl) countEl.textContent = `${filtered.length} รายการ`;
  };

  // Bind Top Dropdown and Pill Events
  const bindDropdownAndPillEvents = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allDropdowns = document.querySelectorAll('.filter-dropdown');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.nextElementSibling;
        const arrow = btn.querySelector('.filter-arrow');
        const isHidden = dropdown.classList.contains('hidden');

        closeAllDropdowns();

        if (isHidden && dropdown) {
          dropdown.classList.remove('hidden');
          if (arrow) arrow.classList.add('rotate-180');
        }
      });
    });

    allDropdowns.forEach(dd => {
      dd.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    document.querySelectorAll('.btn-clear-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.getAttribute('data-filter-key') || btn.closest('.filter-dropdown')?.previousElementSibling?.getAttribute('data-filter-type');
        if (type && activeFilters[type]) {
          document.querySelectorAll(`.filter-checkbox[data-filter-key="${type}"]`).forEach(cb => { cb.checked = false; });
          activeFilters[type] = [];
          applyFilters();
        }
      });
    });

    document.querySelectorAll('.btn-view-products').forEach(btn => {
      btn.addEventListener('click', () => {
        closeAllDropdowns();
      });
    });
  };
  bindDropdownAndPillEvents();

  document.addEventListener('click', (e) => {
    // Wishlist Heart Interaction
    const wishlistBtn = e.target.closest('.btn-wishlist');
    if (wishlistBtn) {
      e.preventDefault();
      e.stopPropagation();

      const svg = wishlistBtn.querySelector('svg');
      const isLiked = wishlistBtn.classList.toggle('active');

      if (isLiked) {
        wishlistBtn.classList.add('text-brand-red');
        wishlistBtn.classList.remove('text-[#252525]');
        if (svg) {
          svg.setAttribute('fill', 'currentColor');
          svg.classList.add('scale-125');
          setTimeout(() => svg.classList.remove('scale-125'), 200);
        }
      } else {
        wishlistBtn.classList.remove('text-brand-red');
        wishlistBtn.classList.add('text-[#252525]');
        if (svg) {
          svg.setAttribute('fill', 'none');
        }
      }
      return;
    }

    closeAllDropdowns();
  });

  // Sort Dropdown Click Logic
  const sortDropdown = document.getElementById('sort-dropdown');
  const sortArrow = document.getElementById('sort-arrow');
  const sortTrigger = document.getElementById('sort-trigger');

  if (sortTrigger) {
    sortTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = sortDropdown.classList.contains('hidden');
      closeAllDropdowns();
      if (isHidden) {
        sortDropdown.classList.remove('hidden');
        if (sortArrow) sortArrow.classList.add('-rotate-180');
      }
    });
  }

  if (sortDropdown) {
    sortDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Handle Sort Option Selection
  document.querySelectorAll('.sort-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const val = btn.getAttribute('data-value');

      const textSpan = document.getElementById('sort-selected-text');
      if (textSpan) textSpan.textContent = 'การจัดเรียง: ' + val;

      document.querySelectorAll('.sort-option').forEach(opt => {
        opt.classList.remove('bg-[#F3F3F6]', 'text-[#1e293b]');
        opt.classList.add('bg-white', 'text-gray-700');
        const check = opt.querySelector('.checkmark');
        const span = opt.querySelector('span');
        if (check) {
          check.classList.remove('text-[#1e293b]');
          check.classList.add('text-transparent');
        }
        if (span) {
          span.classList.remove('font-semibold', 'text-[#1e293b]');
          span.classList.add('font-normal', 'text-gray-700');
        }
      });

      currentSortMode = val;
      applyFilters();

      btn.classList.remove('bg-white', 'text-gray-700');
      btn.classList.add('bg-[#F3F3F6]', 'text-[#1e293b]');
      const activeCheck = btn.querySelector('.checkmark');
      const activeSpan = btn.querySelector('span');
      if (activeCheck) {
        activeCheck.classList.remove('text-transparent');
        activeCheck.classList.add('text-[#1e293b]');
      }
      if (activeSpan) {
        activeSpan.classList.remove('font-normal', 'text-gray-700');
        activeSpan.classList.add('font-semibold', 'text-[#1e293b]');
      }

      closeAllDropdowns();
    });
  });

  // Load More Interaction
  const btnLoadMore = document.getElementById('btn-load-more');
  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      if (!gridEl || currentFilteredProducts.length <= currentVisibleCount) return;
      const startIndex = currentVisibleCount;
      currentVisibleCount += PAGE_SIZE;
      const nextProducts = currentFilteredProducts.slice(startIndex, currentVisibleCount);
      gridEl.insertAdjacentHTML('beforeend', nextProducts.map(product => generateCardHTML(product, true)).join(''));
      updateLoadMoreVisibility();
    });
  }

  // Sticky Filter Alignment & Shadow Logic
  const stickyWrapper = document.getElementById('filter-sticky-wrapper');
  if (stickyWrapper) {
    const updateStickyFilterTop = () => {
      const stickyNav = document.querySelector('.sticky.top-0');
      if (stickyNav) {
        const navHeight = Math.round(stickyNav.getBoundingClientRect().height);
        if (navHeight > 0) {
          stickyWrapper.style.top = `${navHeight}px`;
        }
      }
    };
    updateStickyFilterTop();
    window.addEventListener('resize', updateStickyFilterTop, { passive: true });
    window.addEventListener('load', updateStickyFilterTop, { passive: true });

    const checkStickyShadow = () => {
      if (window.scrollY > 30) {
        stickyWrapper.classList.add('shadow-[0_4px_20px_rgba(0,0,0,0.06)]', 'border-gray-200/80');
        stickyWrapper.classList.remove('border-transparent');
      } else {
        stickyWrapper.classList.remove('shadow-[0_4px_20px_rgba(0,0,0,0.06)]', 'border-gray-200/80');
        stickyWrapper.classList.add('border-transparent');
      }
    };
    checkStickyShadow();
    window.addEventListener('scroll', checkStickyShadow, { passive: true });
  }

  applyFilters();

  window.addEventListener('udo:catalog_updated', () => {
    if (typeof applyFilters === 'function') {
      applyFilters();
    }
  });
}, 150);
