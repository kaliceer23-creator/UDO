import{n as e}from"./ProductCard-DYuaIsoR.js";import"./dock-Bf_qABMp.js";import{t}from"./markdown_parser-LB3SAXAV.js";function n(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function r(e){if(!e)return``;try{let t=new Date(e.replace(/-/g,`/`));return isNaN(t.getTime())?e:`${t.getDate()} ${[`ม.ค.`,`ก.พ.`,`มี.ค.`,`เม.ย.`,`พ.ค.`,`มิ.ย.`,`ก.ค.`,`ส.ค.`,`ก.ย.`,`ต.ค.`,`พ.ย.`,`ธ.ค.`][t.getMonth()]} ${t.getFullYear()+543}`}catch{return e}}async function i(e,t){try{let n=`/api/articles.php`;n+=e?`?slug=${encodeURIComponent(e)}`:t?`?id=${encodeURIComponent(t)}`:`?limit=1`;let r=await fetch(n);if(r.ok){let e=await r.json();if(e.success){if(e.article)return e.article;if(Array.isArray(e.articles)&&e.articles.length>0)return e.articles[0]}}}catch{}try{let n=await fetch(`/api/articles.json`);if(n.ok){let r=await n.json();if(Array.isArray(r)&&r.length>0)return e?r.find(t=>t.slug===e||t.slug&&t.slug.toLowerCase()===e.toLowerCase())||null:t?r.find(e=>String(e.id)===String(t))||null:r[0]}}catch{}return null}async function a(e){try{let t=await fetch(`/api/articles.php?limit=8`);if(t.ok){let n=await t.json();if(n.success&&Array.isArray(n.articles))return n.articles.filter(t=>t.slug!==e).slice(0,3)}}catch{}try{let t=await fetch(`/api/articles.json`);if(t.ok){let n=await t.json();if(Array.isArray(n))return n.filter(t=>t.slug!==e).slice(0,3)}}catch{}return[]}async function o(e){try{let t=await fetch(`/api/products.php`);if(t.ok){let n=await t.json(),r=Array.isArray(n)?n:n.products||[];if(!r||r.length===0)return[];if(Array.isArray(e)&&e.length>0){let t=r.filter(t=>e.includes(t.id)||e.includes(t.sku));if(t.length>0)return t.slice(0,4)}return r.slice(0,4)}}catch{}return[]}function s(e){if(!e){let e=document.getElementById(`article-title`);e&&(e.textContent=`ไม่พบบทความที่ต้องการ`);let t=document.getElementById(`article-excerpt`);t&&(t.innerHTML=`
        <span class="block mb-4">ขออภัย ไม่พบบทความที่คุณกำลังค้นหา อาจถูกย้ายหรือเปลี่ยนชื่อ</span>
        <a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#160808] text-white text-sm font-semibold rounded-xl hover:bg-black transition-all">
          &larr; กลับหน้าหลัก
        </a>
      `,t.style.display=`block`);let n=document.getElementById(`article-category`);n&&(n.textContent=`UDO Technical Knowledge`);let r=document.getElementById(`article-date`);r&&(r.textContent=``);let i=document.getElementById(`article-read-time`);i&&(i.textContent=``);return}document.title=`${e.title} - UDO เทคนิค & สาระงานช่าง`;let i=document.querySelector(`meta[name="description"]`);i&&(e.meta_description||e.excerpt)&&i.setAttribute(`content`,e.meta_description||e.excerpt);let a=document.getElementById(`breadcrumb-article-title`);a&&(a.textContent=e.title,a.title=e.title);let o=document.getElementById(`article-category`);o&&(o.textContent=e.category||`เทคนิค & สาระงานช่าง`);let s=document.getElementById(`article-date`);s&&(s.textContent=r(e.created_at)||`บทความวิศวกรรม`);let c=document.getElementById(`article-title`);c&&(c.textContent=e.title);let l=document.getElementById(`article-excerpt`);l&&(e.excerpt?(l.textContent=e.excerpt,l.style.display=`block`):l.style.display=`none`);let u=document.getElementById(`article-cover-container`),d=document.getElementById(`article-cover-img`);u&&d&&(e.cover_image?(d.src=e.cover_image,d.alt=e.title,u.classList.remove(`hidden`)):u.classList.add(`hidden`));let f=document.getElementById(`article-author`);f&&(f.textContent=(e.author||`UDO TECHNICAL TEAM`).toUpperCase());let p=document.getElementById(`article-tags-container`);if(p){let t=Array.isArray(e.tags)?e.tags:[];p.innerHTML=t.length>0?t.map(e=>`
        <a href="/category.html?q=${encodeURIComponent(e)}" class="px-2.5 py-1 bg-[#F5F5F7] hover:bg-gray-200 border border-gray-200/80 rounded-lg text-xs text-gray-700 font-medium transition-colors select-none">
          #${n(e)}
        </a>
      `).join(``):``}let m=document.getElementById(`article-quote-callout`),h=document.getElementById(`article-quote-text`);m&&h&&(e.highlight_quote?(h.textContent=`“${e.highlight_quote}”`,m.classList.remove(`hidden`)):e.excerpt&&e.excerpt.trim()?(h.textContent=`“${e.excerpt.trim()}”`,m.classList.remove(`hidden`)):m.classList.add(`hidden`));let g=document.getElementById(`article-story-blocks`);if(g){let n=(e.markdown||e.content||``).trim();if(!n&&Array.isArray(e.content_blocks)&&e.content_blocks.length>0&&(n=e.content_blocks.map(e=>{let t=[];return e.headline&&t.push(`## ${e.headline}`),e.subheadline&&t.push(`### ${e.subheadline}`),e.image&&t.push(`![ภาพประกอบ](${e.image})`),e.paragraph&&t.push(e.paragraph),t.join(`

`)}).join(`

`)),!n)g.innerHTML=`
        <div class="py-12 text-center text-gray-400">
          <p class="text-sm">กำลังเตรียมเนื้อหาฉบับสมบูรณ์</p>
        </div>
      `;else{let{html:e}=t(n);g.innerHTML=e}}}async function c(t){let n=document.getElementById(`article-recommended-products-section`),r=document.getElementById(`article-recommended-products-grid`),i=await o(t.recommended_products||[]);if(n&&r&&(i&&i.length>0?(r.innerHTML=i.map(t=>e(t,!0)).join(``),n.classList.remove(`hidden`)):n.classList.add(`hidden`)),i&&i.length>0){let e=i[0],t=document.getElementById(`sidebar-spotlight-img`),n=document.getElementById(`sidebar-spotlight-title`),r=document.getElementById(`sidebar-spotlight-desc`),a=document.getElementById(`sidebar-spotlight-price`),o=document.getElementById(`sidebar-spotlight-btn`);if(t&&(t.src=e.image||e.thumbnail||`/images/products/welding-sample.png`,t.alt=e.name||e.title),n&&(n.textContent=e.name||e.title,n.title=e.name||e.title),r&&(r.textContent=e.description||e.short_description||`อุปกรณ์งานช่างและงานเชื่อมมาตรฐานอุตสาหกรรม`),a){let t=e.price||e.price_start;a.textContent=t?`฿${Number(t).toLocaleString()}`:`ขอใบเสนอราคา`}o&&(o.href=e.slug?`/product.html?slug=${encodeURIComponent(e.slug)}`:e.id?`/product.html?id=${encodeURIComponent(e.id)}`:`/category.html`)}}async function l(e){let t=document.getElementById(`article-related-articles-grid`),i=document.getElementById(`sidebar-trending-articles`),o=await a(e);if(!o||o.length===0){let e=document.getElementById(`article-related-articles-section`);e&&e.classList.add(`hidden`);return}t&&(t.innerHTML=o.map(e=>`
      <a href="/article.html?slug=${encodeURIComponent(e.slug)}" class="article-card flex flex-col group cursor-pointer">
        <div class="w-full aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden mb-3.5 relative border border-gray-200/70">
          ${e.cover_image?`
            <img 
              src="${n(e.cover_image)}" 
              alt="${n(e.title)}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
              loading="lazy"
            />
          `:`
            <div class="w-full h-full flex items-center justify-center text-gray-300 font-bold text-lg">UDO</div>
          `}
        </div>
        <div class="text-xs text-gray-400 font-medium mb-1">
          ${r(e.created_at)||`บทความวิศวกรรม`}
        </div>
        <h3 class="font-semibold text-[#160808] group-hover:text-[#c5161b] transition-colors text-[16px] sm:text-[17px] leading-[1.38] line-clamp-2 h-[48px] overflow-hidden text-ellipsis mb-1.5" title="${n(e.title)}">
          ${n(e.title)}
        </h3>
        <p class="text-[13.5px] text-[#555555] font-light line-clamp-2 leading-[1.48] h-[40px] overflow-hidden text-ellipsis">
          ${n(e.excerpt||``)}
        </p>
      </a>
    `).join(``)),i&&(i.innerHTML=o.slice(0,3).map((e,t)=>`
      <a href="/article.html?slug=${encodeURIComponent(e.slug)}" class="flex items-start gap-3 py-2.5 group cursor-pointer">
        <span class="text-lg font-black text-gray-300 group-hover:text-[#c5161b] transition-colors shrink-0 w-6">0${t+1}</span>
        <div class="flex-1 min-w-0">
          <h5 class="text-[13px] font-semibold text-[#160808] group-hover:text-[#c5161b] line-clamp-2 leading-snug transition-colors">
            ${n(e.title)}
          </h5>
          <span class="text-[11px] text-gray-400 mt-1 block">
            ${r(e.created_at)||`สาระงานช่าง`}
          </span>
        </div>
      </a>
    `).join(``))}function u(){let e=document.getElementById(`category-menu-btn`),t=document.getElementById(`category-menu-arrow`),n=document.getElementById(`desktop-mega-menu`),r=document.getElementById(`mega-menu-overlay`);if(!e||!n)return;let i=()=>{n.classList.add(`hidden`),n.classList.remove(`flex`),t&&t.classList.remove(`rotate-180`),r&&r.classList.add(`hidden`),e&&e.classList.remove(`bg-white/25`)},a=()=>{n.classList.remove(`hidden`),n.classList.add(`flex`),t&&t.classList.add(`rotate-180`),r&&r.classList.remove(`hidden`),e&&e.classList.add(`bg-white/25`)},o=n.querySelectorAll(`.mega-sidebar-item`),s=n.querySelectorAll(`.mega-panel`),c=e=>{o.forEach(t=>{let n=t.querySelector(`.mega-sidebar-arrow`);t.dataset.megaTab===e?(t.classList.add(`bg-brand-green`,`text-white`),t.classList.remove(`text-[#252525]`),n&&(n.classList.add(`text-white`),n.classList.remove(`text-gray-400`))):(t.classList.remove(`bg-brand-green`,`text-white`),t.classList.add(`text-[#252525]`),n&&(n.classList.remove(`text-white`),n.classList.add(`text-gray-400`)))}),s.forEach(t=>{t.id===`mega-panel-${e}`?(t.classList.remove(`hidden`),t.classList.add(`block`)):(t.classList.add(`hidden`),t.classList.remove(`block`))})};o.forEach(e=>{let t=e.dataset.megaTab;e.addEventListener(`mouseenter`,()=>c(t)),e.addEventListener(`focus`,()=>c(t))}),e.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.contains(`hidden`)?(a(),c(`12`)):i()}),r&&r.addEventListener(`click`,i),document.addEventListener(`click`,t=>{!e.contains(t.target)&&!n.contains(t.target)&&!n.classList.contains(`hidden`)&&i()})}document.addEventListener(`DOMContentLoaded`,async()=>{u();let e=new URLSearchParams(window.location.search),t=await i(e.get(`slug`),e.get(`id`));s(t),t&&(c(t),l(t.slug))});