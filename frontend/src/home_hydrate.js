import { mockDatabase } from './mock_database.js';

window.homeProducts = {};

const formatPrice = (price) => {
  return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const getStartingPrice = (product) => {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(...product.variants.map(v => v.price));
};

const getOriginalPriceForStarting = (product, startingPrice) => {
   const matchingVariant = product.variants.find(v => v.price === startingPrice);
   if (matchingVariant && matchingVariant.original_price) {
       return matchingVariant.original_price;
   }
   return null;
};

const extractNumberSize = (sizeStr) => {
    const match = sizeStr.match(/^[0-9.]+/);
    return match ? match[0] : sizeStr;
};

export const generateCardHTML = (product, isGrid = false) => {
  window.homeProducts[product.id] = product;
  const minPrice = getStartingPrice(product);
  const originalPrice = getOriginalPriceForStarting(product, minPrice);
  
  const image = (product.images && product.images.length > 0 && product.images[0]) 
                ? product.images[0] 
                : 'https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image';

  // Extract tags (Hastags separated by |)
  const descText = (product.tags && product.tags.length > 0) 
                   ? product.tags.slice(0, 3).join(' | ') 
                   : product.filter_attributes?.material || '';

  // Discount & Price Logic (Matches reference image)
  let discountBadgeHTML = '';
  let priceHTML = `<div class="flex flex-col justify-end"><span class="text-[#FF3B30] font-semibold text-[19px]">฿${formatPrice(minPrice)}</span></div>`;
  
  if (originalPrice && originalPrice > minPrice) {
     const savings = originalPrice - minPrice;
     const discountPercent = Math.round((savings / originalPrice) * 100);
     discountBadgeHTML = `<div class="absolute top-3 left-3 bg-[#E12427] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm z-10">-${discountPercent}%</div>`;
     priceHTML = `
       <div class="flex flex-col justify-end">
          <span class="text-[#FF3B30] font-semibold text-[19px] leading-none">฿${formatPrice(minPrice)}</span>
          <span class="text-gray-400 text-[11.5px] mt-1.5 leading-none">ประหยัดไป ฿${formatPrice(savings)}</span>
       </div>
     `;
  }

  // Size Pills (The Minimalist Dots + Dynamic Island)
  let sizeHTML = '';
  const uniqueSizes = [...new Set((product.variants || []).map(v => v.size))]
                      .filter(s => s !== 'มาตรฐาน' && s !== 'ฟรีไซส์' && s !== '');
  
  if (uniqueSizes.length > 0) {
      const dots = uniqueSizes.map(size => {
          const numSize = extractNumberSize(size);
          return `<button class="size-dot shrink-0 w-[24px] h-[24px] rounded-full bg-gray-100 border border-gray-200 text-[10.5px] font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-sm" data-size="${size}" title="ขนาด ${size}">${numSize}</button>`;
      }).join('');
      
      sizeHTML = `
          <div class="size-container relative mt-5 mb-6 h-[38px] flex justify-center items-center w-full" data-pid="${product.id}">
              <div class="dots-row flex justify-center items-center gap-1.5 transition-all duration-300 w-full">
                  <span class="text-gray-400 text-[11px] font-medium mr-0.5">Ø</span>
                  ${dots}
              </div>
              <div class="dynamic-island absolute inset-0 m-auto h-full w-[36px] bg-gray-900 rounded-full opacity-0 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center px-1.5 overflow-hidden shadow-lg z-20">
                  <button class="di-close w-6 h-6 shrink-0 flex items-center justify-center text-gray-400 hover:text-white rounded-full transition-colors mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  <span class="di-size-label text-white text-[11px] font-bold shrink-0 mr-1.5"></span>
                  <div class="di-packages flex items-center gap-1 overflow-x-auto no-scrollbar flex-1"></div>
                  <button class="di-cart w-7 h-7 shrink-0 bg-brand-green hover:bg-[#8eb543] text-white rounded-full flex items-center justify-center transition-colors shadow-md ml-1" title="เพิ่มลงตะกร้า">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                  </button>
              </div>
          </div>
      `;
  } else {
      sizeHTML = `
         <div class="mt-5 mb-6 h-[38px] flex justify-center items-center w-full">
            <button class="btn-direct-add w-[80%] h-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[13px] font-medium rounded-full flex items-center justify-center transition-colors shadow-sm gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                เพิ่มลงตะกร้า
            </button>
         </div>
      `;
  }

  const wrapperClass = isGrid 
    ? "w-full h-full flex flex-col bg-white rounded-[16px] p-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow border border-gray-100 group relative"
    : "snap-start shrink-0 w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex flex-col bg-white rounded-[16px] p-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow border border-gray-100 group relative h-full";

  return `
    <div class="${wrapperClass}">
      ${discountBadgeHTML}
      
      <!-- 1. รูปภาพ -->
      <a href="/product.html?id=${product.id}" class="block relative w-full aspect-square bg-white rounded-lg overflow-hidden flex justify-center items-center">
         <img src="${image}" alt="${product.name}" class="w-full h-full object-contain p-4 mix-blend-multiply" loading="lazy" decoding="async" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image'"/>
      </a>
      
      <!-- 2. Dynamic Island Size Dots -->
      ${sizeHTML}

      <!-- 3. ชื่อสินค้า & รายละเอียด (ชิดซ้ายตามแบบ) -->
      <div class="flex flex-col text-left px-1 h-[90px]">
          <a href="/product.html?id=${product.id}" class="block">
              <h3 class="font-medium text-gray-900 text-[17px] leading-tight line-clamp-2" title="${product.name}">
                ${product.name}
              </h3>
          </a>
          ${descText ? `<p class="text-[14px] text-gray-900 line-clamp-2 mt-1.5 leading-snug">${descText}</p>` : ''}
      </div>
      
      <!-- 4. ราคา (ชิดซ้าย มีคำว่าประหยัดไปตามแบบ) -->
      <div class="pb-1 text-left px-1">
         ${priceHTML}
      </div>

    </div>
  `;
};

const injectTrack = (id, filterSortFn) => {
  const track = document.getElementById(id);
  if (track) {
    const products = filterSortFn([...mockDatabase]);
    track.innerHTML = products.map(p => generateCardHTML(p, false)).join('');
  }
};

injectTrack('new-arrivals-track', (db) => db.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8));
injectTrack('best-sellers-track', (db) => db.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0)).slice(0, 8));
injectTrack('recommended-track', (db) => {
  let rec = db.filter(p => p.collections && p.collections.includes('popular')).sort(() => 0.5 - Math.random()).slice(0, 8);
  return rec.length < 4 ? db.slice(0, 8) : rec;
});

// Animations & Interactions
document.addEventListener('click', (e) => {
    // Add to Cart Interaction
    const addToCartBtn = e.target.closest('.di-cart') || e.target.closest('.btn-direct-add');
    if (addToCartBtn) {
        e.preventDefault();
        
        // Update Navbar Badge
        const badge = document.getElementById('cart-badge');
        if (badge) {
            let count = parseInt(badge.textContent || '0');
            badge.textContent = count + 1;
            badge.style.transform = 'scale(1.6)';
            badge.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 250);
        }
        
        // Change button briefly for feedback (Minimalist)
        const originalContent = addToCartBtn.innerHTML;
        const isDirect = addToCartBtn.classList.contains('btn-direct-add');
        
        if (isDirect) {
            addToCartBtn.innerHTML = 'เพิ่มสำเร็จ';
            addToCartBtn.classList.add('text-brand-green');
        } else {
            addToCartBtn.innerHTML = '✓';
        }
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalContent;
            if (isDirect) addToCartBtn.classList.remove('text-brand-green');
            
            // Close dynamic island if open
            const container = addToCartBtn.closest('.size-container');
            if (container) closeDynamicIsland(container);
        }, 800);
        
        return;
    }



    const sizeDot = e.target.closest('.size-dot');
    if (sizeDot) {
        e.preventDefault();
        const container = sizeDot.closest('.size-container');
        const pid = container.dataset.pid;
        const size = sizeDot.dataset.size;
        openDynamicIsland(container, pid, size);
        return;
    }

    const closeBtn = e.target.closest('.di-close');
    if (closeBtn) {
        e.preventDefault();
        const container = closeBtn.closest('.size-container');
        closeDynamicIsland(container);
        return;
    }
    
    const pkgBtn = e.target.closest('.di-pkg');
    if (pkgBtn) {
        e.preventDefault();
        const island = pkgBtn.closest('.dynamic-island');
        island.querySelectorAll('.di-pkg').forEach(p => {
            p.classList.remove('bg-white', 'text-gray-900', 'font-bold');
            p.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
        });
        pkgBtn.classList.remove('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
        pkgBtn.classList.add('bg-white', 'text-gray-900', 'font-bold');
    }
});

function openDynamicIsland(container, pid, size) {
    const product = window.homeProducts[pid];
    const dotsRow = container.querySelector('.dots-row');
    const island = container.querySelector('.dynamic-island');
    const pkgContainer = island.querySelector('.di-packages');
    const sizeLabel = island.querySelector('.di-size-label');
    
    dotsRow.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
    
    const numSize = extractNumberSize(size);
    sizeLabel.textContent = `Ø ${numSize}`;
    
    const availableVariants = product.variants.filter(v => v.size === size);
    
    pkgContainer.innerHTML = availableVariants.map((v, idx) => `
        <button class="di-pkg shrink-0 text-[10.5px] px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${idx === 0 ? 'bg-white text-gray-900 font-bold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}" data-pkg="${v.package}">
            ${v.package.split('(')[0].trim()} <span class="opacity-80 font-normal">฿${formatPrice(v.price)}</span>
        </button>
    `).join('');

    island.classList.remove('w-[36px]', 'opacity-0', 'pointer-events-none');
    island.classList.add('w-[96%]', 'opacity-100', 'pointer-events-auto');
}

function closeDynamicIsland(container) {
    const dotsRow = container.querySelector('.dots-row');
    const island = container.querySelector('.dynamic-island');
    
    island.classList.remove('w-[96%]', 'opacity-100', 'pointer-events-auto');
    island.classList.add('w-[36px]', 'opacity-0', 'pointer-events-none');
    
    setTimeout(() => {
        dotsRow.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
    }, 150);
}
