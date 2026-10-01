// src/components/ProductCard.js

/**
 * Universal Product Card Component
 * Native Vanilla JS Factory function
 * Pure HTML string generator conforming to the project Trojan Horse architecture.
 */

export const formatPrice = (price) => {
  if (price === null || price === undefined || price === '') return '0';
  const num = typeof price === 'number' ? price : parseFloat(String(price).replace(/,/g, ''));
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: (num % 1 === 0 ? 0 : 2),
    maximumFractionDigits: 2
  });
};

export const getStartingPrice = (product) => {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(...product.variants.map(v => v.price));
};

export const getOriginalPriceForStarting = (product, startingPrice) => {
  const matchingVariant = product.variants ? product.variants.find(v => v.price === startingPrice) : null;
  if (matchingVariant && matchingVariant.original_price) {
    return matchingVariant.original_price;
  }
  if (product.flags?.is_promotion && startingPrice > 0) {
    return Math.round(startingPrice * 1.25);
  }
  if ((product.id === 'udo-3144' || product.id === 'udo-3140' || product.id === 'udo-897') && startingPrice > 0) {
    const pct = product.id === 'udo-3140' ? 0.15 : 0.10;
    return Math.round(startingPrice / (1 - pct));
  }
  return null;
};

export const resolveImageSrc = (img, size = 'card') => {
  if (!img) return 'https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image';
  if (typeof img === 'string') return img;
  if (typeof img === 'object') {
    return img[size] || img.card || img.large || img.original || img.thumb || '';
  }
  return 'https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image';
};

/**
 * Generates identical, strictly uniform HTML for a product card.
 * Enforces:
 * 1. Maximum 2 lines of title clamped with ellipsis (...)
 * 2. Fixed title height (h-[44px] md:h-[48px]) so 1-line and 2-line cards match perfectly
 * 3. Fixed description height (h-[36px] md:h-[38px])
 * 4. Fixed price block height (min-h-[42px]) with invisible placeholder for non-discounted items
 * 5. Strict equal card height across all carousel and grid items
 */
export const generateCardHTML = (product, isGrid = false) => {
  if (typeof window !== 'undefined') {
    window.homeProducts = window.homeProducts || {};
    window.homeProducts[product.id] = product;
  }

  const minPrice = getStartingPrice(product);
  const originalPrice = getOriginalPriceForStarting(product, minPrice);
  
  const rawImage = (product.images && product.images.length > 0) ? product.images[0] : null;
  const image = resolveImageSrc(rawImage, 'card');

  // Extract tags (Hashtags separated by |) or fallback to description/material
  const cleanDescription = product.description ? product.description.replace(/<[^>]*>?/gm, '').trim() : '';
  const descText = (product.tags && product.tags.length > 0) 
                   ? product.tags.slice(0, 3).join(' | ') 
                   : (cleanDescription || product.filter_attributes?.material || '');

  // Tags: "ใหม่" (ฝั่งซ้าย)
  const isNew = Boolean(
    product.flags?.is_new || 
    product.is_new || 
    (product.created_at && new Date(product.created_at) >= new Date('2026-04-01'))
  );
  const newBadgeHTML = isNew 
    ? `<div class="absolute top-3 left-3 bg-[#f2f2f2] text-[#160808] text-[15px] font-bold px-2 py-0.5 rounded-[4px] leading-tight z-10 select-none pointer-events-none tracking-tight flex items-center justify-center"><span class="inline-block transform scale-y-[1.05] origin-center">ใหม่</span></div>`
    : '';

  // Discount & Price Logic
  let discountBadgeHTML = '';
  let priceHTML = '';

  if (originalPrice && originalPrice > minPrice) {
    const savings = originalPrice - minPrice;
    const discountPercent = Math.round((savings / originalPrice) * 100);
    discountBadgeHTML = `<div class="absolute top-3 right-3 bg-[#000000] text-white text-[15px] font-semibold px-2 py-0.5 rounded-[4px] leading-tight z-10 select-none pointer-events-none tracking-tight flex items-center justify-center"><span class="inline-block transform scale-y-[1.08] origin-center font-semibold">-${discountPercent}%</span></div>`;
    priceHTML = `
      <div class="flex flex-col text-left justify-end">
        <div class="flex items-baseline">
          <span class="text-[#ff0036] font-semibold text-[18px] md:text-[19.5px] leading-none inline-block transform scale-y-[1.08] origin-bottom tracking-tight">฿${formatPrice(minPrice)}</span>
        </div>
        <div class="flex items-baseline gap-1.5 text-[#a6a0a0] text-[13px] md:text-[13.5px] font-normal leading-none mt-1.5 inline-flex transform scale-y-[1.08] origin-bottom tracking-tight">
          <span class="line-through decoration-[#a6a0a0]">฿${formatPrice(originalPrice)}</span>
          <span>save ฿${formatPrice(savings)}</span>
        </div>
      </div>
    `;
  } else if (minPrice > 0) {
    priceHTML = `
      <div class="flex flex-col text-left justify-end">
        <div class="flex items-baseline">
          <span class="text-[#ff0036] font-semibold text-[18px] md:text-[19.5px] leading-none inline-block transform scale-y-[1.08] origin-bottom tracking-tight">฿${formatPrice(minPrice)}</span>
        </div>
        <div class="flex items-baseline gap-1.5 text-transparent select-none pointer-events-none text-[13px] md:text-[13.5px] font-normal leading-none mt-1.5 inline-flex transform scale-y-[1.08] origin-bottom tracking-tight" aria-hidden="true">
          <span>&nbsp;</span>
        </div>
      </div>
    `;
  } else {
    priceHTML = `
      <div class="flex flex-col text-left justify-end">
        <div class="flex items-baseline">
          <span class="text-gray-500 font-semibold text-[14px] md:text-[15px] leading-none inline-block transform scale-y-[1.08] origin-bottom">ติดต่อสอบถาม</span>
        </div>
        <div class="flex items-baseline gap-1.5 text-transparent select-none pointer-events-none text-[13px] md:text-[13.5px] font-normal leading-none mt-1.5 inline-flex transform scale-y-[1.08] origin-left tracking-tight" aria-hidden="true">
          <span>&nbsp;</span>
        </div>
      </div>
    `;
  }

  const wrapperClass = isGrid 
    ? "w-full flex flex-col bg-white rounded-[8px] p-3 hover:shadow-[0_2px_24px_rgba(0,0,0,0.11)] hover:z-10 transition-all duration-300 group relative self-stretch cursor-pointer select-none"
    : "card-peek-5 snap-start shrink-0 w-[85vw] md:w-[calc(50%-8px)] flex flex-col bg-white rounded-[8px] p-3 hover:shadow-[0_2px_24px_rgba(0,0,0,0.11)] hover:z-10 transition-all duration-300 group relative self-stretch h-full cursor-pointer select-none";

  return `
    <div class="${wrapperClass}">
      <!-- Full Card Clickable Overlay Link (Modern Clickable Card Pattern) -->
      <a href="/product.html?id=${product.id}" class="absolute inset-0 z-[1] rounded-[8px]" aria-label="${product.name}"></a>

      ${newBadgeHTML}
      ${discountBadgeHTML}
      
      <!-- 1. รูปภาพสินค้า (สี่เหลี่ยมจัตุรัสคงที่ทุกการ์ด) -->
      <div class="relative w-full aspect-square bg-white rounded-[8px] overflow-hidden flex justify-center items-center mt-8 mb-6 pointer-events-none">
        <img src="${image}" alt="${product.name}" class="w-full h-full object-contain p-0 scale-[0.88] mix-blend-multiply" loading="lazy" decoding="async" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image'"/>
      </div>

      <!-- 2. ข้อมูลสินค้า: ชื่อ (สูงสุด 2 บรรทัดพร้อม ...), รายละเอียด, ราคา (จัดตำแหน่งเท่ากันเป๊ะ) -->
      <div class="flex flex-col text-left flex-1 justify-between pointer-events-none">
        <div>
          <h3 class="font-semibold text-[#160808] group-hover:text-brand-red transition-colors text-[16px] md:text-[17px] leading-[1.35] line-clamp-2 h-[44px] md:h-[48px] overflow-hidden text-ellipsis" title="${product.name}">
            ${product.name}
          </h3>
          <p class="text-[13px] md:text-[13.5px] font-light text-gray-500 line-clamp-2 mt-2 leading-[1.35] h-[36px] md:h-[38px] overflow-hidden" title="${descText}">
            ${descText || '&nbsp;'}
          </p>
        </div>
        <div class="mt-3 text-left min-h-[42px] flex items-center justify-between">
          ${priceHTML}
          <!-- Wishlist Heart Button (ขวาล่างของการ์ด อยู่เหนือลิงก์หลัก z-10) -->
          <button type="button" class="btn-wishlist relative z-10 pointer-events-auto p-1 text-[#252525] hover:text-brand-red transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shrink-0 ml-auto" title="เพิ่มในรายการโปรด" data-product-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px] transition-transform duration-200 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  `;
};

// Default export alias
export const ProductCard = generateCardHTML;
