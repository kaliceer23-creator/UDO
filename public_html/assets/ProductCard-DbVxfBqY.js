var e=e=>{if(e==null||e===``)return`0`;let t=typeof e==`number`?e:parseFloat(String(e).replace(/,/g,``));return isNaN(t)?`0`:t.toLocaleString(`en-US`,{minimumFractionDigits:t%1==0?0:2,maximumFractionDigits:2})},t=e=>!e.variants||e.variants.length===0?0:Math.min(...e.variants.map(e=>e.price)),n=(e,t)=>{let n=e.variants?e.variants.find(e=>e.price===t):null;if(n&&n.original_price)return n.original_price;if(e.flags?.is_promotion&&t>0)return Math.round(t*1.25);if((e.id===`udo-3144`||e.id===`udo-3140`||e.id===`udo-897`)&&t>0){let n=e.id===`udo-3140`?.15:.1;return Math.round(t/(1-n))}return null},r=(e,t=`card`)=>e?typeof e==`string`?e:typeof e==`object`?e[t]||e.card||e.large||e.original||e.thumb||``:`https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image`:`https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image`,i=(i,a=!1)=>{typeof window<`u`&&(window.homeProducts=window.homeProducts||{},window.homeProducts[i.id]=i);let o=t(i),s=n(i,o),c=r(i.images&&i.images.length>0?i.images[0]:null,`card`),l=i.description?i.description.replace(/<[^>]*>?/gm,``).trim():``,u=i.tags&&i.tags.length>0?i.tags.slice(0,3).join(` | `):l||i.filter_attributes?.material||``,d=i.flags?.is_new||i.is_new||i.created_at&&new Date(i.created_at)>=new Date(`2026-04-01`)?`<div class="absolute top-3 left-3 bg-[#f2f2f2] text-[#160808] text-[15px] font-bold px-2 py-0.5 rounded-[4px] leading-tight z-10 select-none pointer-events-none tracking-tight flex items-center justify-center"><span class="inline-block transform scale-y-[1.05] origin-center">ใหม่</span></div>`:``,f=``,p=``;if(s&&s>o){let t=s-o;f=`<div class="absolute top-3 right-3 bg-[#000000] text-white text-[15px] font-semibold px-2 py-0.5 rounded-[4px] leading-tight z-10 select-none pointer-events-none tracking-tight flex items-center justify-center"><span class="inline-block transform scale-y-[1.08] origin-center font-semibold">-${Math.round(t/s*100)}%</span></div>`,p=`
      <div class="flex flex-col text-left justify-end">
        <div class="flex items-baseline">
          <span class="text-[#ff0036] font-semibold text-[18px] md:text-[19.5px] leading-none inline-block transform scale-y-[1.08] origin-bottom tracking-tight">฿${e(o)}</span>
        </div>
        <div class="flex items-baseline gap-1.5 text-[#a6a0a0] text-[13px] md:text-[13.5px] font-normal leading-none mt-1.5 inline-flex transform scale-y-[1.08] origin-bottom tracking-tight">
          <span class="line-through decoration-[#a6a0a0]">฿${e(s)}</span>
          <span>save ฿${e(t)}</span>
        </div>
      </div>
    `}else p=o>0?`
      <div class="flex flex-col text-left justify-end">
        <div class="flex items-baseline">
          <span class="text-[#ff0036] font-semibold text-[18px] md:text-[19.5px] leading-none inline-block transform scale-y-[1.08] origin-bottom tracking-tight">฿${e(o)}</span>
        </div>
        <div class="flex items-baseline gap-1.5 text-transparent select-none pointer-events-none text-[13px] md:text-[13.5px] font-normal leading-none mt-1.5 inline-flex transform scale-y-[1.08] origin-bottom tracking-tight" aria-hidden="true">
          <span>&nbsp;</span>
        </div>
      </div>
    `:`
      <div class="flex flex-col text-left justify-end">
        <div class="flex items-baseline">
          <span class="text-gray-500 font-semibold text-[14px] md:text-[15px] leading-none inline-block transform scale-y-[1.08] origin-bottom">ติดต่อสอบถาม</span>
        </div>
        <div class="flex items-baseline gap-1.5 text-transparent select-none pointer-events-none text-[13px] md:text-[13.5px] font-normal leading-none mt-1.5 inline-flex transform scale-y-[1.08] origin-left tracking-tight" aria-hidden="true">
          <span>&nbsp;</span>
        </div>
      </div>
    `;return`
    <div class="${a?`w-full flex flex-col bg-white rounded-[8px] p-3 hover:shadow-[0_2px_24px_rgba(0,0,0,0.11)] hover:z-10 transition-all duration-300 group relative self-stretch cursor-pointer select-none`:`card-peek-5 snap-start shrink-0 w-[85vw] md:w-[calc(50%-8px)] flex flex-col bg-white rounded-[8px] p-3 hover:shadow-[0_2px_24px_rgba(0,0,0,0.11)] hover:z-10 transition-all duration-300 group relative self-stretch h-full cursor-pointer select-none`}">
      <!-- Full Card Clickable Overlay Link (Modern Clickable Card Pattern) -->
      <a href="/product.html?id=${i.id}" class="absolute inset-0 z-[1] rounded-[8px]" aria-label="${i.name}"></a>

      ${d}
      ${f}
      
      <!-- 1. รูปภาพสินค้า (สี่เหลี่ยมจัตุรัสคงที่ทุกการ์ด) -->
      <div class="relative w-full aspect-square bg-white rounded-[8px] overflow-hidden flex justify-center items-center mt-8 mb-6 pointer-events-none">
        <img src="${c}" alt="${i.name}" class="w-full h-full object-contain p-0 scale-[0.88] mix-blend-multiply" loading="lazy" decoding="async" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image'"/>
      </div>

      <!-- 2. ข้อมูลสินค้า: ชื่อ (สูงสุด 2 บรรทัดพร้อม ...), รายละเอียด, ราคา (จัดตำแหน่งเท่ากันเป๊ะ) -->
      <div class="flex flex-col text-left flex-1 justify-between pointer-events-none">
        <div>
          <h3 class="font-semibold text-[#160808] group-hover:text-brand-red transition-colors text-[16px] md:text-[17px] leading-[1.35] line-clamp-2 h-[44px] md:h-[48px] overflow-hidden text-ellipsis" title="${i.name}">
            ${i.name}
          </h3>
          <p class="text-[13px] md:text-[13.5px] font-light text-gray-500 line-clamp-2 mt-2 leading-[1.35] h-[36px] md:h-[38px] overflow-hidden" title="${u}">
            ${u||`&nbsp;`}
          </p>
        </div>
        <div class="mt-3 text-left min-h-[42px] flex items-center justify-between">
          ${p}
          <!-- Wishlist Heart Button (ขวาล่างของการ์ด อยู่เหนือลิงก์หลัก z-10) -->
          <button type="button" class="btn-wishlist relative z-10 pointer-events-auto p-1 text-[#252525] hover:text-brand-red transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shrink-0 ml-auto" title="เพิ่มในรายการโปรด" data-product-id="${i.id}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px] transition-transform duration-200 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  `},a=(e=!1)=>`
    <div class="${e?`w-full bg-[#f8f9fa] rounded-[16px] p-4 flex flex-col justify-between relative border border-gray-100/80 animate-pulse select-none`:`w-[260px] md:w-[280px] shrink-0 bg-[#f8f9fa] rounded-[16px] p-4 flex flex-col justify-between relative border border-gray-100/80 animate-pulse select-none snap-start`}" aria-hidden="true">
      <!-- 1. Skeleton Image Box -->
      <div class="relative w-full aspect-square bg-gray-200/70 rounded-[10px] overflow-hidden flex justify-center items-center mt-8 mb-6"></div>

      <!-- 2. Skeleton Info & Typography -->
      <div class="flex flex-col text-left flex-1 justify-between">
        <div>
          <!-- Title Lines -->
          <div class="h-4 bg-gray-200/80 rounded-md w-11/12 mb-2"></div>
          <div class="h-4 bg-gray-200/80 rounded-md w-3/4 mb-3"></div>
          <!-- Description Lines -->
          <div class="h-3 bg-gray-200/60 rounded-md w-5/6 mb-1.5"></div>
          <div class="h-3 bg-gray-200/60 rounded-md w-1/2"></div>
        </div>
        <!-- Price & Action -->
        <div class="mt-4 pt-1 flex items-center justify-between min-h-[42px]">
          <div class="h-5 bg-gray-200/90 rounded-md w-24"></div>
          <div class="w-6 h-6 bg-gray-200/60 rounded-full"></div>
        </div>
      </div>
    </div>
  `;export{r as i,i as n,a as r,e as t};