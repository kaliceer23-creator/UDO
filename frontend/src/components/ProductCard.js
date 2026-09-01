// src/components/ProductCard.js

/**
 * JS Factory Function สำหรับสร้าง HTML ของการ์ดสินค้า
 * ตรงตามสถาปัตยกรรม Vanilla JS (ไม่มี React) และพร้อมรับข้อมูลจาก API
 */
export function ProductCard(product) {
  // ค่าเริ่มต้นกรณีไม่มีข้อมูล
  const name = product.name || 'ชื่อสินค้า';
  const desc = product.desc || 'รายละเอียดสินค้า';
  const image = product.image || '/images/products/product_placeholder.png';
  const price1 = product.price1 || '0';
  const unit1 = product.unit1 || 'ห่อ';
  const price2 = product.price2 || '0';
  const unit2 = product.unit2 || 'ลัง';
  const href = product.href || '#';

  return `
    <a href="${href}" class="snap-start shrink-0 w-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group relative">
      <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
         <img src="${image}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=Product'"/>
      </div>
      <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
        ${name}
      </h3>
      <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
        ${desc}
      </p>
      <div class="mt-auto flex flex-col">
        <!-- Unit Toggle -->
        <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
          <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="${price1}" data-unit="${unit1}">${unit1}</button>
          <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="${price2}" data-unit="${unit2}">${unit2}</button>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-baseline gap-1">
            <span class="text-[#E12427] font-bold text-[18px] price-display">฿${price1}</span>
            <span class="text-gray-500 text-[12px] font-medium price-unit">/${unit1}</span>
          </div>
          <div class="cart-control flex justify-end" data-unit="${unit1}">
            <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-[#5EBB1E] hover:bg-[#4a9618] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <div class="control-expanded hidden bg-white border border-[#5EBB1E] rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
              <button class="btn-minus w-8 h-full flex items-center justify-center text-[#5EBB1E] hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
              </button>
              <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">
                <span class="qty-text">1</span> <span class="ml-1 text-[11px] text-gray-500 font-medium unit-text">${unit1}</span>
              </div>
              <button class="btn-plus w-8 h-full flex items-center justify-center bg-[#5EBB1E] text-white hover:bg-[#4a9618] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}
