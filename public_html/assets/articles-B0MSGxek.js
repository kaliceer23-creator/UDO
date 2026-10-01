import"./style-vKMHgEBE.js";import"./dock-D5FaZfiV.js";function e(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function t(e){if(!e)return`บทความวิศวกรรม`;try{let t=new Date(e.replace(/-/g,`/`));return isNaN(t.getTime())?e:`${t.getDate()} ${[`ม.ค.`,`ก.พ.`,`มี.ค.`,`เม.ย.`,`พ.ค.`,`มิ.ย.`,`ก.ค.`,`ส.ค.`,`ก.ย.`,`ต.ค.`,`พ.ย.`,`ธ.ค.`][t.getMonth()]} ${t.getFullYear()+543}`}catch{return e}}async function n(){try{let e=await fetch(`/api/articles.php`);if(e.ok){let t=await e.json();if(t.success&&Array.isArray(t.articles))return t.articles}}catch{}return[]}function r(n){let r=(Array.isArray(n.tags)?n.tags.slice(0,3):[]).map(t=>`
    <a href="/category.html?q=${encodeURIComponent(t)}" class="px-2.5 py-1 bg-[#F5F5F7] hover:bg-gray-200 border border-gray-200/80 rounded-lg text-xs text-gray-700 font-medium transition-colors select-none">
      #${e(t)}
    </a>
  `).join(``);return`
    <article class="group block text-left flex flex-col justify-between">
      <div>
        <a href="/article.html?slug=${encodeURIComponent(n.slug||n.id)}" class="block w-full aspect-[16/10] bg-gray-100 rounded-[8px] overflow-hidden mb-3.5 border border-gray-200/80 shadow-2xs relative">
          <img 
            src="${e(n.cover_image||`/images/banners/backup/BANNER 1.png`)}" 
            alt="${e(n.title)}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
            loading="lazy" 
          />
        </a>

        <div class="text-[11.5px] uppercase tracking-wider text-gray-400 font-medium mb-1.5">
          ${e(n.author||`UDO TECHNICAL TEAM`)} • ${t(n.created_at)}
        </div>

        <h3 class="text-[20px] sm:text-[22px] font-bold text-[#160808] leading-snug line-clamp-2 mb-2 group-hover:text-[#c5161b] transition-colors" title="${e(n.title)}">
          <a href="/article.html?slug=${encodeURIComponent(n.slug||n.id)}">
            ${e(n.title)}
          </a>
        </h3>

        <p class="text-[14.5px] sm:text-[15px] text-[#2c2c2e] leading-relaxed font-normal line-clamp-3 mb-3.5">
          ${e(n.excerpt||``)}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2 pt-1">
        ${r}
      </div>
    </article>
  `}function i(t,n,i=null){if(!n||n.length===0)return``;let a=n.map(r).join(``),o=i?`<a href="/articles.html?category=${encodeURIComponent(i)}" class="text-xs sm:text-[13px] font-semibold text-[#c5161b] hover:underline shrink-0">ดูทั้งหมด &rarr;</a>`:``;return`
    <section class="mb-14 sm:mb-16">
      <div class="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div class="flex items-center gap-4 flex-1">
          <h2 class="text-[20px] sm:text-[24px] md:text-[26px] font-bold uppercase tracking-wider text-[#160808] shrink-0">
            ${e(t)}
          </h2>
          <div class="h-[2px] bg-[#160808] flex-1"></div>
        </div>
        ${o}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${a}
      </div>
    </section>
  `}function a(e,t){if(!t||t===`all`)return e;let n=t.toLowerCase();return e.filter(e=>{let r=(e.category||``).toLowerCase(),i=(e.title||``).toLowerCase(),a=Array.isArray(e.tags)?e.tags.map(e=>String(e).toLowerCase()):[];return t===`TRENDING`?e.sort_priority<=10||e.featured:t===`เทคนิคการเชื่อม`?r.includes(`เทคนิค`)||i.includes(`เชื่อม`)||a.some(e=>e.includes(`เชื่อม`)):t===`เลือกใช้ลวดเชื่อม`?i.includes(`ลวดเชื่อม`)||i.includes(`เลือก`)||a.some(e=>e.includes(`ลวดเชื่อม`)):t===`คู่มือ & ทริคช่าง`?i.includes(`รู้`)||i.includes(`วิธี`)||i.includes(`ทริค`)||i.includes(`ndt`):t===`ความปลอดภัย & มาตรฐาน`?i.includes(`ปลอดภัย`)||i.includes(`มาตรฐาน`)||a.some(e=>e.includes(`qa`)||e.includes(`qc`)):t===`ดูแลรักษาเครื่องมือ`?i.includes(`ใบตัด`)||i.includes(`เครื่องมือ`)||a.some(e=>e.includes(`ใบเจียร`)):t===`สาระวิศวกรรม`?r.includes(`สาระ`)||r.includes(`ข่าว`)||i.includes(`แต่งตั้ง`)||i.includes(`บริษัท`):r===n||i.includes(n)})}function o(){let e=document.getElementById(`nav-sticky-sentinel`),t=document.getElementById(`article-sticky-nav`);if(!t)return;function n(){let e=t.getBoundingClientRect().top<=1||window.scrollY>25;t.classList.toggle(`is-sticky`,e)}window.addEventListener(`scroll`,n,{passive:!0}),window.addEventListener(`resize`,n,{passive:!0}),n(),e&&`IntersectionObserver`in window&&new IntersectionObserver(([e])=>{let n=!e.isIntersecting||window.scrollY>25;t.classList.toggle(`is-sticky`,n)},{threshold:[0,1]}).observe(e)}document.addEventListener(`DOMContentLoaded`,async()=>{o();let t=new URLSearchParams(window.location.search).get(`category`);if(t){document.querySelectorAll(`.nav-cat-link`).forEach(e=>{e.getAttribute(`data-nav-cat`)===t?e.classList.add(`is-active`):e.classList.remove(`is-active`)});let e=document.getElementById(`breadcrumb-category`);e&&(e.textContent=t,e.classList.remove(`hidden`));let n=document.getElementById(`breadcrumb-separator`);n&&n.classList.remove(`hidden`)}let r=await n(),s=document.getElementById(`articles-main-content`);if(s){if(!r||r.length===0){s.innerHTML=`
      <div class="py-20 text-center text-gray-400">
        <p class="text-base">กำลังโหลดบทความหรือยังไม่มีบทความในขณะนี้</p>
      </div>
    `;return}if(t){let n=a(r,t);document.title=`${t} - UDO Insight บทความงานช่าง`,s.innerHTML=n.length===0?`
        <div class="mb-14">
          <div class="flex items-center gap-4 mb-8">
            <h1 class="text-[24px] sm:text-[28px] font-bold uppercase tracking-wider text-[#160808] shrink-0">
              ${e(t)}
            </h1>
            <div class="h-[2px] bg-[#160808] flex-1"></div>
          </div>
          <div class="py-16 text-center text-gray-500">
            <p class="text-base mb-4">ยังไม่มีบทความในหมวดหมู่นี้</p>
            <a href="/articles.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#160808] text-white text-xs font-semibold rounded-lg hover:bg-black transition-all">
              ดูบทความทั้งหมด
            </a>
          </div>
        </div>
      `:i(t,n)}else{document.title=`UDO Insight - นิตยสารและสาระวิชาการงานช่าง`;let e=r.slice(0,3),t=a(r,`เทคนิคการเชื่อม`).slice(0,3),n=a(r,`เลือกใช้ลวดเชื่อม`).slice(0,3),o=a(r,`คู่มือ & ทริคช่าง`).slice(0,3),c=a(r,`ความปลอดภัย & มาตรฐาน`).slice(0,3),l=``;l+=i(`TRENDING`,e,`TRENDING`),l+=i(`เทคนิคการเชื่อม`,t,`เทคนิคการเชื่อม`),l+=i(`เลือกใช้ลวดเชื่อม`,n,`เลือกใช้ลวดเชื่อม`),l+=i(`คู่มือ & ทริคช่าง`,o,`คู่มือ & ทริคช่าง`),l+=i(`ความปลอดภัย & มาตรฐาน`,c,`ความปลอดภัย & มาตรฐาน`),s.innerHTML=l}}});