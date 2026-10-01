import{n as e}from"./ProductCard-Bvd8vJqM.js";function t(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function n(e){if(!e)return``;try{let t=new Date(e.replace(/-/g,`/`));return isNaN(t.getTime())?e:`${t.getDate()} ${[`ม.ค.`,`ก.พ.`,`มี.ค.`,`เม.ย.`,`พ.ค.`,`มิ.ย.`,`ก.ค.`,`ส.ค.`,`ก.ย.`,`ต.ค.`,`พ.ย.`,`ธ.ค.`][t.getMonth()]} ${t.getFullYear()+543}`}catch{return e}}async function r(e,t){try{let n=`/api/articles.php`;n+=e?`?slug=${encodeURIComponent(e)}`:t?`?id=${encodeURIComponent(t)}`:`?limit=1`;let r=await fetch(n);if(r.ok){let e=await r.json();if(e.success){if(e.article)return e.article;if(Array.isArray(e.articles)&&e.articles.length>0)return e.articles[0]}}}catch{}try{let n=await fetch(`/api/articles.json`);if(n.ok){let r=await n.json();if(Array.isArray(r)&&r.length>0)return e?r.find(t=>t.slug===e||t.slug&&t.slug.toLowerCase()===e.toLowerCase())||null:t?r.find(e=>String(e.id)===String(t))||null:r[0]}}catch{}return null}async function i(e){try{let t=await fetch(`/api/articles.php?limit=8`);if(t.ok){let n=await t.json();if(n.success&&Array.isArray(n.articles))return n.articles.filter(t=>t.slug!==e).slice(0,3)}}catch{}try{let t=await fetch(`/api/articles.json`);if(t.ok){let n=await t.json();if(Array.isArray(n))return n.filter(t=>t.slug!==e).slice(0,3)}}catch{}return[]}async function a(e){try{let t=await fetch(`/api/products.php`);if(t.ok){let n=await t.json(),r=Array.isArray(n)?n:n.products||[];if(!r||r.length===0)return[];if(Array.isArray(e)&&e.length>0){let t=r.filter(t=>e.includes(t.id)||e.includes(t.sku));if(t.length>0)return t.slice(0,4)}return r.slice(0,4)}}catch{}return[]}function o(e){if(!e){let e=document.getElementById(`article-title`);e&&(e.textContent=`ไม่พบบทความที่ต้องการ`);let t=document.getElementById(`article-excerpt`);t&&(t.innerHTML=`
        <span class="block mb-4">ขออภัย ไม่พบบทความที่คุณกำลังค้นหา อาจถูกย้ายหรือเปลี่ยนชื่อ</span>
        <a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#160808] text-white text-sm font-semibold rounded-xl hover:bg-black transition-all">
          &larr; กลับหน้าหลัก
        </a>
      `,t.style.display=`block`);let n=document.getElementById(`article-category`);n&&(n.textContent=`UDO Technical Knowledge`);let r=document.getElementById(`article-date`);r&&(r.textContent=``);let i=document.getElementById(`article-read-time`);i&&(i.textContent=``);return}document.title=`${e.title} - UDO เทคนิค & สาระงานช่าง`;let r=document.querySelector(`meta[name="description"]`);r&&(e.meta_description||e.excerpt)&&r.setAttribute(`content`,e.meta_description||e.excerpt);let i=document.getElementById(`breadcrumb-article-title`);i&&(i.textContent=e.title,i.title=e.title);let a=document.getElementById(`article-category`);a&&(a.textContent=e.category||`เทคนิค & สาระงานช่าง`);let o=document.getElementById(`article-date`);o&&(o.textContent=n(e.created_at)||`บทความวิศวกรรม`);let s=document.getElementById(`article-read-time`);s&&(s.textContent=`อ่าน ${e.read_time_minutes||3} นาที`);let c=document.getElementById(`article-title`);c&&(c.textContent=e.title);let l=document.getElementById(`article-excerpt`);l&&(e.excerpt?(l.textContent=e.excerpt,l.style.display=`block`):l.style.display=`none`);let u=document.getElementById(`article-cover-container`),d=document.getElementById(`article-cover-img`);u&&d&&(e.cover_image?(d.src=e.cover_image,d.alt=e.title,u.classList.remove(`hidden`)):u.classList.add(`hidden`));let f=document.getElementById(`article-author`);f&&e.author&&(f.textContent=e.author);let p=document.getElementById(`article-tags-container`);if(p){let n=Array.isArray(e.tags)?e.tags:[];p.innerHTML=n.length>0?n.map(e=>`
        <span class="px-2.5 py-1 bg-[#F5F5F7] border border-gray-200/70 rounded-lg text-xs text-gray-700 font-medium">
          #${t(e)}
        </span>
      `).join(``):``}let m=document.getElementById(`article-story-blocks`);if(m){let n=(Array.isArray(e.content_blocks)?e.content_blocks:[]).filter(e=>e&&(e.headline||e.subheadline||e.paragraph||e.image));m.innerHTML=n.length===0?`
        <div class="py-12 text-center text-gray-400">
          <p class="text-sm">กำลังเตรียมเนื้อหาฉบับสมบูรณ์</p>
        </div>
      `:n.map((e,n)=>{let r=!!(e.headline||e.subheadline||e.paragraph),i=!!e.image;return`
          <section class="story-block">
            ${r?`
              <div class="w-full max-w-[1040px] mx-auto px-2 sm:px-0 mb-6 sm:mb-8">
                ${e.headline?`
                  <h2 class="text-[22px] sm:text-[26px] font-semibold text-[#160808] mb-4 sm:mb-6 leading-snug">
                    ${t(e.headline)}
                  </h2>
                `:``}
                ${e.subheadline?`
                  <h3 class="text-[18px] sm:text-[20px] font-semibold text-[#160808] mb-2 sm:mb-2.5 leading-snug">
                    ${t(e.subheadline)}
                  </h3>
                `:``}
                ${e.paragraph?`
                  <p class="text-[15.5px] sm:text-[16.5px] text-[#252525] leading-relaxed whitespace-pre-line w-full">
                    ${t(e.paragraph)}
                  </p>
                `:``}
              </div>
            `:``}

            ${i?`
              <div class="w-full max-w-[1040px] mx-auto px-2 sm:px-0 flex justify-center mb-8">
                <img 
                  src="${t(e.image)}" 
                  alt="ภาพประกอบเนื้อหา ${n+1}" 
                  class="max-w-full h-auto object-contain rounded-xl mx-auto border border-gray-200/80 shadow-2xs"
                  loading="lazy"
                />
              </div>
            `:``}
          </section>
        `}).join(``)}}async function s(t){let n=document.getElementById(`article-recommended-products-section`),r=document.getElementById(`article-recommended-products-grid`);if(!n||!r)return;let i=await a(t.recommended_products||[]);i&&i.length>0?(r.innerHTML=i.map(t=>e(t,!0)).join(``),n.classList.remove(`hidden`)):n.classList.add(`hidden`)}async function c(e){let r=document.getElementById(`article-related-articles-grid`);if(!r)return;let a=await i(e);if(!a||a.length===0){let e=document.getElementById(`article-related-articles-section`);e&&e.classList.add(`hidden`);return}r.innerHTML=a.map(e=>`
    <a href="/article.html?slug=${encodeURIComponent(e.slug)}" class="article-card flex flex-col group cursor-pointer">
      <div class="w-full aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden mb-3.5 relative border border-gray-200/70">
        ${e.cover_image?`
          <img 
            src="${t(e.cover_image)}" 
            alt="${t(e.title)}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            loading="lazy"
          />
        `:`
          <div class="w-full h-full flex items-center justify-center text-gray-300 font-bold text-lg">UDO</div>
        `}
      </div>
      <div class="text-xs text-gray-400 font-medium mb-1">
        ${n(e.created_at)||`บทความวิศวกรรม`} • อ่าน ${e.read_time_minutes||3} นาที
      </div>
      <h3 class="font-semibold text-[#160808] group-hover:text-brand-red transition-colors text-[17px] sm:text-[18px] leading-[1.38] line-clamp-2 h-[50px] overflow-hidden text-ellipsis mb-1.5" title="${t(e.title)}">
        ${t(e.title)}
      </h3>
      <p class="text-[14px] text-[#555555] font-light line-clamp-2 leading-[1.48] h-[42px] overflow-hidden text-ellipsis">
        ${t(e.excerpt||``)}
      </p>
    </a>
  `).join(``)}document.addEventListener(`DOMContentLoaded`,async()=>{let e=new URLSearchParams(window.location.search),t=await r(e.get(`slug`),e.get(`id`));o(t),t&&(s(t),c(t.slug))});