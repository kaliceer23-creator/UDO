import './style.css'
import { mockDatabase } from './mock_database.js'
import { generateCardHTML } from './home_hydrate.js'

document.querySelector('#category-content').innerHTML = `
<main class="w-full bg-[#F5F5F5] pb-20 min-h-screen">
  <!-- Breadcrumbs -->
  <div class="bg-transparent">
    <div id="category-breadcrumbs" class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 pt-3.5 pb-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
      <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
      <span class="text-gray-400">&gt;</span>
      <a href="#" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">เครื่องมือช่างและฮาร์ดแวร์</a>
      <span class="text-gray-400">&gt;</span>
      <a href="#" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">เครื่องเชื่อมและอุปกรณ์</a>
      <span class="text-gray-400">&gt;</span>
      <span class="text-[#252525]">ลวดเชื่อม</span>
    </div>
  </div>


  
  <!-- Filter Section Wrapper -->
  <div id="filter-sticky-wrapper" class="sticky top-[100px] md:top-[124px] lg:top-[128px] z-[45] bg-[#F5F5F5] py-4 md:py-5 mb-2 md:mb-4 border-b border-transparent transition-shadow duration-200">
    <!-- 1. Filter Bar & Sort By -->
    <div class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    <!-- Left: 3 Filter Buttons -->
    <div class="flex flex-wrap items-center gap-3">

      <!-- Main Filter Icon Button (Just Icon) -->
      <button class="flex items-center gap-1.5 px-2.5 h-10 text-[#252525] hover:bg-gray-100 rounded-lg transition-colors shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
      </button>

      
      <!-- วัสดุที่เชื่อม Dropdown Pill (Inactive) -->
      <div class="relative ">
        <button data-filter-type="material" class="filter-btn flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#252525] text-[14px] font-normal text-[#252525] transition-colors bg-transparent">
          <span class="filter-btn-text">วัสดุที่เชื่อม</span> <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 filter-arrow transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[280px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden filter-dropdown z-40 overflow-hidden flex flex-col">
          <div id="filter-material-list" class="p-2 max-h-[250px] overflow-y-auto">
            <!-- Injected by JS -->
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 pb-4 pt-2 bg-white">
            <button class="btn-clear-filter text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="btn-view-products px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">ดูสินค้า</button>
          </div>
        </div>
      </div>
      
      <!-- กระบวนการเชื่อม Dropdown Pill (Inactive) -->
      <div class="relative ">
        <button data-filter-type="process" class="filter-btn flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#252525] text-[14px] font-normal text-[#252525] transition-colors bg-transparent">
          <span class="filter-btn-text">กระบวนการเชื่อม</span> <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 filter-arrow transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[280px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden filter-dropdown z-40 overflow-hidden flex flex-col">
          <div id="filter-process-list" class="p-2 max-h-[250px] overflow-y-auto">
            <!-- Injected by JS -->
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 pb-4 pt-2 bg-white">
            <button class="btn-clear-filter text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="btn-view-products px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">ดูสินค้า</button>
          </div>
        </div>
      </div>

      <!-- ขนาดลวด Dropdown Pill (ACTIVE) -->
      <div class="relative ">
        <!-- Notice the Active Classes: Green background, green border, green text -->
        <button data-filter-type="size" class="filter-btn flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#252525] text-[14px] font-normal text-[#252525] transition-colors bg-transparent">
          <span class="filter-btn-text">ขนาดลวด</span> <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 filter-arrow transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[280px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden filter-dropdown z-40 overflow-hidden flex flex-col">
          <div id="filter-size-list" class="p-2 max-h-[250px] overflow-y-auto">
            <!-- Injected by JS -->
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 pb-4 pt-2 bg-white">
            <button class="btn-clear-filter text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="btn-view-products px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">ดูสินค้า</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Sort By -->
    <div class="relative z-50">
      <div id="sort-trigger" class="flex items-center justify-between gap-3 px-3 py-1.5 rounded-full border border-[#252525] text-[14px] text-[#252525] bg-transparent transition-colors cursor-pointer select-none min-w-[220px]">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#252525]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span id="sort-selected-text">การจัดเรียง: สินค้าแนะนำ</span>
        </div>
        <svg id="sort-arrow" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#252525] transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
      <!-- Dropdown -->
      <div id="sort-dropdown" class="absolute right-0 top-full mt-2 w-full min-w-[220px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-lg py-2 hidden z-50 text-left border border-gray-100">
        
        <button class="sort-option flex items-center w-full px-4 py-2.5 text-[14px] text-[#252525] hover:bg-gray-100 transition-colors text-left" data-value="สินค้าแนะนำ">
          <svg class="w-4 h-4 text-[#252525] checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span class="font-medium ml-auto text-right">สินค้าแนะนำ</span>
        </button>

        <button class="sort-option flex items-center w-full px-4 py-2.5 text-[14px] text-[#252525] hover:bg-gray-100 transition-colors text-left" data-value="สินค้ามาใหม่">
          <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span class="font-normal ml-auto text-right">สินค้ามาใหม่</span>
        </button>

        <button class="sort-option flex items-center w-full px-4 py-2.5 text-[14px] text-[#252525] hover:bg-gray-100 transition-colors text-left" data-value="ราคา: ต่ำ-สูง">
          <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span class="font-normal ml-auto text-right">ราคา: ต่ำ-สูง</span>
        </button>

        <button class="sort-option flex items-center w-full px-4 py-2.5 text-[14px] text-[#252525] hover:bg-gray-100 transition-colors text-left" data-value="ราคา: สูง-ต่ำ">
          <svg class="w-4 h-4 text-transparent checkmark shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span class="font-normal ml-auto text-right">ราคา: สูง-ต่ำ</span>
        </button>

      </div>
    </div>
  </div>

  <!-- 2. Active Pills Row -->
    <div id="active-pills-container" class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 w-full flex items-center gap-3 flex-wrap mt-3 hidden">
      <!-- Injected by JS -->
    </div>
  </div> <!-- End Filter Section Wrapper -->

  <!-- 3. Title and Count -->
  <div class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 w-full mb-5">
    <h1 id="category-title" class="text-[36px] font-semibold text-[#252525] leading-tight">ลวดเชื่อม</h1>
    <p id="category-count" class="text-[18px] font-normal text-[#424245] mt-1">0 รายการ</p>
  </div>

  <!-- 5. Product Grid -->
  <div class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 w-full mb-16">
    <div id="category-product-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      <!-- Injected by JS -->
    </div>
  

  </div>

</main>
`;


// --- Category Dynamic Hydration & Filter Logic ---
setTimeout(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'category'; 
  const rawName = urlParams.get('name') || '';
  const slug = urlParams.get('slug') || '';
  const query = urlParams.get('q') || '';

  const categoryName = rawName ? rawName.trim() : 'ลวดเชื่อม';
  const isCuttingGrinding = categoryName === 'ใบตัดใบเจียร' || categoryName.includes('ใบตัด') || categoryName.includes('ใบเจียร') || slug === 'cutting-grinding-discs' || slug === 'cutting-discs' || slug === 'grinding-discs';
  const isWeldingWire = categoryName === 'กลุ่มลวดเชื่อม' || categoryName === 'ลวดเชื่อม' || slug.includes('wire') || (!rawName && type === 'category');

  const titleEl = document.getElementById('category-title');
  const countEl = document.getElementById('category-count');
  const breadcrumbsEl = document.getElementById('category-breadcrumbs');
  const gridEl = document.getElementById('category-product-grid');
  
  // 1. Initial Filter of mockDatabase based on URL
  let baseProducts = [];
  if (type === 'search') {
    baseProducts = mockDatabase.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()));
  } else if (type === 'collection') {
     const colMapping = { 'new-arrivals': 'new_arrival', 'top-sale': 'popular', 'for-you': 'just_for_you' };
     const mapKey = colMapping[categoryName] || categoryName;
     baseProducts = mockDatabase.filter(p => p.collections && p.collections.includes(mapKey));
  } else if (type === 'brand') {
     baseProducts = mockDatabase.filter(p => p.brand.toLowerCase() === categoryName.toLowerCase());
  } else {
     // Category Filter
     if (isCuttingGrinding) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.name === 'ใบตัดใบเจียร' || c.url_slug === 'cutting-grinding-discs' || c.url_slug === 'cutting-discs' || c.url_slug === 'grinding-discs')
       );
     } else if (isWeldingWire) {
       baseProducts = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.name.includes('ลวดเชื่อม') || c.url_slug.includes('wire'))
       );
     } else {
       const matched = mockDatabase.filter(p => 
         p.categories && p.categories.some(c => c.name.toLowerCase() === categoryName.toLowerCase() || c.url_slug.toLowerCase() === categoryName.toLowerCase())
       );
       baseProducts = matched.length > 0 ? matched : mockDatabase;
     }
  }

  // 2. Update Breadcrumbs and Title
  if (type === 'search') {
    if(titleEl) titleEl.textContent = `ผลการค้นหา "${query}"`;
    if (breadcrumbsEl) {
      breadcrumbsEl.innerHTML = `
        <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
        <span class="text-gray-400">&gt;</span>
        <span class="text-[#252525]">ผลการค้นหา</span>
      `;
    }
  } else if (type === 'collection') {
    const colName = categoryName === 'new-arrivals' ? 'สินค้าเข้าใหม่' : categoryName === 'top-sale' ? 'ขายดีประจำเดือน' : 'คัดมาเพื่อคุณ';
    if(titleEl) titleEl.textContent = colName;
    if (breadcrumbsEl) {
      breadcrumbsEl.innerHTML = `
        <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
        <span class="text-gray-400">&gt;</span>
        <span class="text-[#252525]">${colName}</span>
      `;
    }
  } else if (type === 'brand') {
    if(titleEl) titleEl.textContent = `แบรนด์ ${categoryName}`;
    if (breadcrumbsEl) {
      breadcrumbsEl.innerHTML = `
        <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
        <span class="text-gray-400">&gt;</span>
        <span class="text-[#252525]">${categoryName}</span>
      `;
    }
  } else {
    // Category type
    const displayTitle = (categoryName === 'กลุ่มลวดเชื่อม' || categoryName === 'ลวดเชื่อม') ? 'ลวดเชื่อม' : categoryName;
    if(titleEl) titleEl.textContent = displayTitle;

    if (breadcrumbsEl) {
      if (isCuttingGrinding) {
        breadcrumbsEl.innerHTML = `
          <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
          <span class="text-gray-400">&gt;</span>
          <a href="/category.html?type=category&name=เครื่องมือช่างและฮาร์ดแวร์" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">เครื่องมือช่างและฮาร์ดแวร์</a>
          <span class="text-gray-400">&gt;</span>
          <span class="text-[#252525]">ใบตัดใบเจียร</span>
        `;
      } else if (isWeldingWire) {
        breadcrumbsEl.innerHTML = `
          <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
          <span class="text-gray-400">&gt;</span>
          <a href="/category.html?type=category&name=เครื่องมือช่างและฮาร์ดแวร์" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">เครื่องมือช่างและฮาร์ดแวร์</a>
          <span class="text-gray-400">&gt;</span>
          <a href="/category.html?type=category&name=เครื่องเชื่อมและอุปกรณ์" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">เครื่องเชื่อมและอุปกรณ์</a>
          <span class="text-gray-400">&gt;</span>
          <span class="text-[#252525]">ลวดเชื่อม</span>
        `;
      } else {
        const sample = baseProducts[0];
        if (sample && sample.categories && sample.categories.length > 0) {
          let bHtml = `<a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>`;
          sample.categories.forEach((c, idx) => {
            bHtml += `<span class="text-gray-400">&gt;</span>`;
            if (idx === sample.categories.length - 1) {
              bHtml += `<span class="text-[#252525]">${c.name}</span>`;
            } else {
              bHtml += `<a href="/category.html?type=category&name=${encodeURIComponent(c.name)}" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">${c.name}</a>`;
            }
          });
          breadcrumbsEl.innerHTML = bHtml;
        } else {
          breadcrumbsEl.innerHTML = `
            <a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2">หน้าหลัก</a>
            <span class="text-gray-400">&gt;</span>
            <span class="text-[#252525]">${displayTitle}</span>
          `;
        }
      }
    }
  }

  // 3. Dynamic Filtering Setup
  let activeFilters = { brand: [], material: [], process: [], size: [] };
  const activePillsContainer = document.getElementById('active-pills-container');

  const availableBrands = [...new Set(baseProducts.map(p => p.brand).filter(Boolean))];

  let allMaterials = new Set();
  baseProducts.forEach(p => {
    const mat = p.filter_attributes?.material;
    if (Array.isArray(mat)) {
      mat.forEach(m => allMaterials.add(m.trim()));
    } else if (mat) {
      if (mat.includes(' / ')) {
        mat.split(' / ').forEach(m => allMaterials.add(m.trim()));
      } else {
        allMaterials.add(mat.replace(/\s*\(.*?\)\s*/g, '').trim());
      }
    }
  });
  const availableMaterials = [...allMaterials];
  const availableProcesses = [...new Set(baseProducts.map(p => p.filter_attributes?.process).filter(Boolean))];
  
  let allSizes = new Set();
  baseProducts.forEach(p => {
    if(p.variants) {
      p.variants.forEach(v => {
        if(v.size && v.size !== 'มาตรฐาน' && v.size !== 'ฟรีไซส์') allSizes.add(v.size);
      });
    }
  });
  const availableSizes = [...allSizes];

  const defaultLabels = isCuttingGrinding ? {
    'material': 'วัสดุที่ใช้งาน',
    'process': 'ลักษณะงาน',
    'size': 'ขนาด'
  } : isWeldingWire ? {
    'material': 'วัสดุที่เชื่อม',
    'process': 'กระบวนการเชื่อม',
    'size': 'ขนาดลวด'
  } : {
    'material': 'วัสดุ',
    'process': 'ประเภทการใช้งาน',
    'size': 'ขนาด'
  };

  ['material', 'process', 'size'].forEach(type => {
    const btn = document.querySelector(`button[data-filter-type="${type}"]`);
    if (!btn) return;
    const textSpan = btn.querySelector('.filter-btn-text');
    if (textSpan) textSpan.textContent = defaultLabels[type];
  });

  const sizeFilterWrapper = document.querySelector('button[data-filter-type="size"]')?.parentElement;
  if (sizeFilterWrapper) {
    sizeFilterWrapper.style.display = availableSizes.length === 0 ? 'none' : '';
  }

  const matFilterWrapper = document.querySelector('button[data-filter-type="material"]')?.parentElement;
  if (matFilterWrapper) {
    matFilterWrapper.style.display = availableMaterials.length === 0 ? 'none' : '';
  }

  const procFilterWrapper = document.querySelector('button[data-filter-type="process"]')?.parentElement;
  if (procFilterWrapper) {
    procFilterWrapper.style.display = availableProcesses.length === 0 ? 'none' : '';
  }

  const generateCheckboxList = (values, filterKey) => {
    return values.map(val => `
      <label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
        <div class="relative flex items-center justify-center w-4 h-4 shrink-0">
          <input type="checkbox" data-filter-key="${filterKey}" value="${val}" class="filter-checkbox peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all">
          <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <span class="text-[14px] text-[#252525]">${val}</span>
      </label>
    `).join('');
  };

  const brandList = document.getElementById('filter-brand-list');
  const materialList = document.getElementById('filter-material-list');
  const processList = document.getElementById('filter-process-list');
  const sizeList = document.getElementById('filter-size-list');

  if(brandList) brandList.innerHTML = generateCheckboxList(availableBrands, 'brand');
  if(materialList) materialList.innerHTML = generateCheckboxList(availableMaterials, 'material');
  if(processList) processList.innerHTML = generateCheckboxList(availableProcesses, 'process');
  if(sizeList) sizeList.innerHTML = generateCheckboxList(availableSizes, 'size');

  const renderActivePills = () => {
    let pillsHTML = '';
    let hasFilters = false;
    Object.values(activeFilters).forEach(arr => { if (arr.length > 0) hasFilters = true; });

    if (hasFilters) {
      pillsHTML += `
        <button id="clear-all-filters" class="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-[#252525] hover:border-[#333333] hover:bg-gray-100 transition-colors shrink-0" title="Clear All">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      `;
    }

    Object.keys(activeFilters).forEach(key => {
      activeFilters[key].forEach(val => {
        pillsHTML += `
          <div class="flex items-center gap-2 bg-[#EDEDED] px-3 py-1 rounded-full text-[14px] font-normal text-[#252525]">
            ${val} <button data-filter-key="${key}" data-value="${val}" class="remove-pill-btn text-[#252525] hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
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
        activeFilters[key] = activeFilters[key].filter(v => v !== val);
        const cb = document.querySelector(`.filter-checkbox[data-filter-key="${key}"][value="${val}"]`);
        if (cb) cb.checked = false;
        applyFilters();
      });
    });

    const clearAllBtn = document.getElementById('clear-all-filters');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        activeFilters = { brand: [], material: [], process: [], size: [] };
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        applyFilters();
      });
    }
  };

  
  let currentSortMode = 'สินค้าแนะนำ';

  const getStartingPrice = (product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map(v => v.price));
  };

  const applyFilters = () => {
    let filtered = baseProducts.filter(p => {
      let matchBrand = activeFilters.brand.length === 0 || activeFilters.brand.includes(p.brand);
      let matchMaterial = activeFilters.material.length === 0;
      if (!matchMaterial) {
        const pMat = p.filter_attributes?.material;
        const pMatArr = Array.isArray(pMat) 
          ? pMat 
          : (pMat ? pMat.split(' / ').map(m => m.replace(/\s*\(.*?\)\s*/g, '').trim()) : []);
        matchMaterial = pMatArr.some(m => activeFilters.material.includes(m));
      }
      let matchProcess = activeFilters.process.length === 0 || activeFilters.process.includes(p.filter_attributes?.process);
      let matchSize = activeFilters.size.length === 0;
      if (!matchSize && p.variants) matchSize = p.variants.some(v => activeFilters.size.includes(v.size));
      return matchBrand && matchMaterial && matchProcess && matchSize;
    });

    renderActivePills();

    // Update main filter buttons UI
    ['material', 'process', 'size'].forEach(type => {
      const btn = document.querySelector(`button[data-filter-type="${type}"]`);
      if (!btn) return;
      const textSpan = btn.querySelector('.filter-btn-text');
      const count = activeFilters[type].length;
      
      if (count > 0) {
        textSpan.textContent = `${defaultLabels[type]} (${count})`;
        btn.classList.remove('border-[#252525]', 'text-[#252525]', 'bg-transparent');
        btn.classList.add('border-brand-green', 'text-brand-green', 'bg-[rgba(113,192,76,0.08)]');
      } else {
        textSpan.textContent = defaultLabels[type];
        btn.classList.remove('border-brand-green', 'text-brand-green', 'bg-[rgba(113,192,76,0.08)]');
        btn.classList.add('border-[#252525]', 'text-[#252525]', 'bg-transparent');
      }
    });

    
    if (gridEl) {
      if (filtered.length > 0) {
        
    if (currentSortMode === 'สินค้ามาใหม่') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (currentSortMode === 'ราคา: ต่ำ-สูง') {
      filtered.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
    } else if (currentSortMode === 'ราคา: สูง-ต่ำ') {
      filtered.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
    }
        gridEl.innerHTML = filtered.map(product => generateCardHTML(product, true)).join('');
      } else {
        gridEl.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500 text-[18px]">ไม่พบสินค้าที่ตรงกับเงื่อนไข</div>`;
      }
    }

    if (countEl) countEl.textContent = `${filtered.length} รายการ`;
  };

  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const key = e.target.getAttribute('data-filter-key');
      const val = e.target.value;
      if (e.target.checked) {
        if (!activeFilters[key].includes(val)) activeFilters[key].push(val);
      } else {
        activeFilters[key] = activeFilters[key].filter(v => v !== val);
      }
      applyFilters();
    });
  });

  
  // Filter Dropdown Click Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allDropdowns = document.querySelectorAll('.filter-dropdown');
  const allArrows = document.querySelectorAll('.filter-arrow');

  const sortDropdown = document.getElementById('sort-dropdown');
  const sortArrow = document.getElementById('sort-arrow');
  const sortTrigger = document.getElementById('sort-trigger');

  const closeAllDropdowns = () => {
    allDropdowns.forEach(dd => dd.classList.add('hidden'));
    allArrows.forEach(arrow => arrow.classList.remove('rotate-180'));
    if (sortDropdown) sortDropdown.classList.add('hidden');
    if (sortArrow) sortArrow.classList.remove('-rotate-180');
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      const arrow = btn.querySelector('.filter-arrow');
      
      const isHidden = dropdown.classList.contains('hidden');

      // Close all
      closeAllDropdowns();

      // Toggle current
      if (isHidden && dropdown) {
        dropdown.classList.remove('hidden');
        if (arrow) arrow.classList.add('rotate-180');
      }
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
    closeAllDropdowns();
  });

  // Sort Dropdown Click Logic
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
      
      // Update Trigger Text
      const textSpan = document.getElementById('sort-selected-text');
      if (textSpan) textSpan.textContent = 'การจัดเรียง: ' + val;
      
      // Reset all options
      document.querySelectorAll('.sort-option').forEach(opt => {
        const check = opt.querySelector('.checkmark');
        const span = opt.querySelector('span');
        if (check) {
          check.classList.remove('text-[#252525]');
          check.classList.add('text-transparent');
        }
        if (span) {
          span.classList.remove('font-medium');
          span.classList.add('font-normal');
        }
      });
      
      
      currentSortMode = val;
      applyFilters();
      
      // Set active option
      const activeCheck = btn.querySelector('.checkmark');
      const activeSpan = btn.querySelector('span');
      if (activeCheck) {
        activeCheck.classList.remove('text-transparent');
        activeCheck.classList.add('text-[#252525]');
      }
      if (activeSpan) {
        activeSpan.classList.remove('font-normal');
        activeSpan.classList.add('font-medium');
      }
      
      // Close dropdown
      closeAllDropdowns();
    });
  });

  
  // Sticky Filter Shadow Logic
  const stickyWrapper = document.getElementById('filter-sticky-wrapper');
  if (stickyWrapper) {
    window.addEventListener('scroll', () => {
      // The breadcrumb is about 40-50px. Add shadow when scrolled past it.
      if (window.scrollY > 40) {
        stickyWrapper.classList.add('shadow-[0_8px_30px_rgba(0,0,0,0.04)]');
        
      } else {
        stickyWrapper.classList.remove('shadow-[0_8px_30px_rgba(0,0,0,0.04)]');
        
      }
    }, { passive: true });
  }


  // Handle Dropdown Footer Buttons
  document.querySelectorAll('.btn-clear-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dropdown = e.target.closest('.filter-dropdown');
      const filterBtn = dropdown.previousElementSibling;
      const type = filterBtn.getAttribute('data-filter-type');
      
      if (type) {
        // Uncheck all checkboxes in this dropdown
        const checkboxes = dropdown.querySelectorAll('.filter-checkbox');
        checkboxes.forEach(cb => cb.checked = false);
        
        // Clear active array and apply
        activeFilters[type] = [];
        applyFilters();
      }
    });
  });

  document.querySelectorAll('.btn-view-products').forEach(btn => {
    btn.addEventListener('click', (e) => {
      closeAllDropdowns();
    });
  });

  applyFilters();

}, 150);
