import{n as e}from"./ProductCard-Gn3WbKmY.js";import{n as t}from"./mock_database-BsdioX22.js";import{a as n,i as r,n as i,o as a,t as o}from"./ai_overview-Br5Rto7f.js";var s=`udo_ai_chat_threads`,c=`udo_ai_current_thread_id`,l=`udo_ai_sidebar_collapsed`,u=[],d=null,f=!1,p=null,m=null;function h(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function g(e=Date.now()){let t=new Date(e);return`${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}function _(){try{let e=localStorage.getItem(s);u=e?JSON.parse(e):[],u.forEach(e=>{if(e.title===`New thread`&&(e.title=`แชทใหม่`),!e.updatedAt){let t=e.messages&&e.messages.length>0?e.messages[e.messages.length-1]:null;e.updatedAt=t&&t.timestamp||e.createdAt||Date.now()}})}catch{u=[]}try{d=localStorage.getItem(c)||(u[0]?u[0].id:null)}catch{d=null}}function v(){try{localStorage.setItem(s,JSON.stringify(u)),d?localStorage.setItem(c,d):localStorage.removeItem(c)}catch(e){console.warn(`Failed to save chat threads to localStorage:`,e)}}function y(){return u.find(e=>e.id===d)||null}function b(e=`แชทใหม่`){document.documentElement.classList.remove(`is-chat-handoff`);let t=`thread_`+Date.now(),n={id:t,title:e,createdAt:Date.now(),updatedAt:Date.now(),messages:[]};return u.unshift(n),d=t,v(),S(),M(),n}function x(e,t){t&&t.stopPropagation(),u=u.filter(t=>t.id!==e),d===e&&(d=u.length>0?u[0].id:null),v(),S(),M()}function S(e=``){let t=document.getElementById(`recentThreadsList`);if(!t)return;let n=(e||``).trim().toLowerCase(),r=n?u.filter(e=>(e.title||``).toLowerCase().includes(n)):[...u];if(r.sort((e,t)=>{if(e.pinned&&!t.pinned)return-1;if(!e.pinned&&t.pinned)return 1;let n=e.updatedAt||e.createdAt||0;return(t.updatedAt||t.createdAt||0)-n}),r.length===0){t.innerHTML=`
      <div class="px-3 py-4 text-center text-[12.5px] text-gray-400">
        ${n?`ไม่พบบทสนทนาที่ค้นหา`:`ยังไม่มีประวัติการสนทนา`}
      </div>
    `;return}t.innerHTML=r.map(e=>{let t=e.id===d,n=e.id===p;return e.id===m?`
        <div class="relative flex items-center rounded-full bg-white border border-[#e7151a] shadow-xs px-2.5 py-1 my-0.5 transition-all">
          <form class="form-rename-thread flex items-center w-full gap-1.5" data-rename-id="${e.id}">
            <input 
              type="text" 
              class="input-rename-thread flex-1 min-w-0 px-1.5 py-0.5 text-[13px] bg-transparent outline-none text-gray-900 font-medium" 
              value="${h(e.title)}"
              data-initial-val="${h(e.title)}"
            />
            <button type="submit" class="btn-save-rename w-6 h-6 rounded-full hover:bg-green-100 text-green-600 flex items-center justify-center shrink-0 cursor-pointer transition-colors" title="บันทึก">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
            <button type="button" class="btn-cancel-rename w-6 h-6 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center shrink-0 cursor-pointer transition-colors" title="ยกเลิก">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </form>
        </div>
      `:`
      <div class="group relative flex items-center justify-between rounded-full transition-all ${t?`bg-[#e8eaed] text-gray-900 font-medium`:`text-gray-700 hover:bg-gray-200/60 font-normal`}">
        <button type="button" class="btn-thread-select flex-1 text-left px-3.5 py-2 text-[13.5px] truncate cursor-pointer select-none flex items-center gap-1.5" data-thread-id="${e.id}" title="${h(e.title)}">
          ${e.pinned?`
            <svg class="w-3 h-3 text-gray-500 shrink-0 rotate-45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
            </svg>
          `:``}
          <span class="truncate">${h(e.title)}</span>
        </button>

        <!-- Vertical 3-Dots Button: Visible only on hover, or when menu is open -->
        <button type="button" class="btn-thread-menu ${n?`flex`:`hidden group-hover:flex`} items-center justify-center w-7 h-7 mr-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-300/60 rounded-full transition-colors cursor-pointer shrink-0" data-menu-id="${e.id}" title="ตัวเลือกเพิ่มเติม">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.6"></circle>
            <circle cx="12" cy="12" r="1.6"></circle>
            <circle cx="12" cy="19" r="1.6"></circle>
          </svg>
        </button>

        <!-- Dropdown Menu: Red on hover as requested -->
        ${n?`
          <div class="thread-dropdown-menu absolute right-1 top-full mt-1 w-44 bg-white rounded-2xl shadow-xl border border-gray-200/90 p-1.5 z-50 flex flex-col text-[13px] select-none">
            
            <!-- 1. ปักหมุด -->
            <button type="button" class="btn-menu-pin group/item flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[#e7151a] text-left cursor-pointer transition-colors" data-pin-id="${e.id}">
              <svg class="w-4 h-4 text-gray-500 group-hover/item:text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
              <span>${e.pinned?`ถอนหมุด`:`ปักหมุด`}</span>
            </button>

            <!-- 2. เปลี่ยนชื่อ -->
            <button type="button" class="btn-menu-rename group/item flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[#e7151a] text-left cursor-pointer transition-colors" data-rename-id="${e.id}">
              <svg class="w-4 h-4 text-gray-500 group-hover/item:text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
              <span>เปลี่ยนชื่อ</span>
            </button>

            <!-- 3. ลบ -->
            <button type="button" class="btn-menu-delete group/item flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[#e7151a] text-left cursor-pointer transition-colors" data-delete-id="${e.id}">
              <svg class="w-4 h-4 text-gray-500 group-hover/item:text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>ลบ</span>
            </button>

          </div>
        `:``}
      </div>
    `}).join(``),t.querySelectorAll(`.btn-thread-select`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-thread-id`);n&&n!==d&&(d=n,p=null,m=null,v(),S(e),M())})}),t.querySelectorAll(`.btn-thread-menu`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.getAttribute(`data-menu-id`);p=p===r?null:r,S(e)})}),t.querySelectorAll(`.btn-menu-pin`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.getAttribute(`data-pin-id`),i=u.find(e=>e.id===r);i&&(i.pinned=!i.pinned,v()),p=null,S(e)})}),t.querySelectorAll(`.btn-menu-rename`).forEach(n=>{n.addEventListener(`click`,r=>{r.stopPropagation();let i=n.getAttribute(`data-rename-id`);p=null,m=i,S(e);let a=t.querySelector(`.form-rename-thread[data-rename-id="${i}"] input`);a&&(a.focus(),a.select())})}),t.querySelectorAll(`.btn-menu-delete`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-delete-id`);p=null,x(n,t)})}),t.querySelectorAll(`.form-rename-thread`).forEach(t=>{t.addEventListener(`submit`,n=>{n.preventDefault();let r=t.getAttribute(`data-rename-id`),i=t.querySelector(`input`),a=(i?i.value:``).trim();if(r&&a){let e=u.find(e=>e.id===r);e&&(e.title=a,v())}m=null,S(e)})}),t.querySelectorAll(`.btn-cancel-rename`).forEach(t=>{t.addEventListener(`click`,t=>{t.stopPropagation(),m=null,S(e)})}),t.querySelectorAll(`.input-rename-thread`).forEach(t=>{t.addEventListener(`keydown`,t=>{t.key===`Escape`&&(t.preventDefault(),m=null,S(e))})})}function C(e={},n={}){let r=e.matched_products||n.matched_products||[];if(!Array.isArray(r)||r.length===0)return[];let i=[],a=new Set;return r.forEach(e=>{let n=String(e).toLowerCase().trim();if(!n)return;let r=t.find(e=>{if(a.has(e.id))return!1;let t=(e.sku||``).toLowerCase(),r=(e.name||``).toLowerCase(),i=(e.brand||``).toLowerCase();return t.includes(n)||r.includes(n)||i.includes(n)});r&&(a.add(r.id),i.push(r))}),i}function w(e=[],t={}){let i=e&&e.length>0?e:t&&t.sources&&t.sources.length>0?t.sources:[],a=[],o=new Set;return i.forEach(e=>{let t=e.id||``,r=e.title||``;if(!r||r.toLowerCase().includes(`catalog product`))return;let i=n(t)||n(r)||e,s=i.id||i.title||String(Math.random());o.has(s)||(o.add(s),a.push(i))}),a.length===0&&a.push(r[0]),a}function T(e){let t=document.getElementById(`citationPreviewModal`),i=document.getElementById(`citationModalCard`),a=document.getElementById(`citationModalBadge`),o=document.getElementById(`citationModalBody`);if(!t||!o)return;let s=n(e)||r[0];if(!s)return;a&&(a.innerHTML=`
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-red-50 text-[#e7151a]">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"/></svg>
        <span>${h(s.category||`UDO Engineering Knowledge`)}</span>
      </span>
      <span class="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">${h(s.badge||`Verified`)}</span>
    `);let c=(s.content||s.summary||``).split(`

`).map(e=>`<p class="text-[#212121] text-[15px] leading-relaxed">${h(e).replace(/\n/g,`<br/>`)}</p>`).join(``);o.innerHTML=`
    <div class="space-y-4 text-left">
      <!-- Title -->
      <h3 class="text-[20px] font-bold text-[#160808] leading-snug">
        ${h(s.title)}
      </h3>

      <!-- Hero Banner / Image -->
      ${s.image?`
        <div class="w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
          <img src="${s.image}" alt="Article Hero" class="w-full h-full object-cover" onerror="this.src='/images/logos/logo.svg'" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white text-[12px] font-medium flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            <span>แหล่งข้อมูลทางการ: ${h(s.source||`UDO Engineering Knowledge`)}</span>
          </div>
        </div>
      `:``}

      <!-- Key Summary Box -->
      <div class="bg-red-50/60 border border-red-100 p-4 rounded-2xl">
        <h4 class="text-[13px] font-bold text-[#c5161b] mb-1">สรุปประเด็นสำคัญ (Key Summary):</h4>
        <p class="text-[14px] text-[#252525] leading-relaxed">${h(s.summary||``)}</p>
      </div>

      <!-- Main Content -->
      <div class="space-y-3 pt-2">
        ${c}
      </div>

      <!-- Target Problems / Symptoms solved -->
      ${s.target_problems&&s.target_problems.length>0?`
        <div class="pt-3 border-t border-gray-100">
          <h5 class="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">อาการและปัญหาหน้างานที่เกี่ยวข้อง:</h5>
          <div class="flex flex-wrap gap-1.5">
            ${s.target_problems.map(e=>`<span class="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11.5px] rounded-lg">${h(e)}</span>`).join(``)}
          </div>
        </div>
      `:``}
    </div>
  `,t.classList.remove(`opacity-0`,`pointer-events-none`),t.classList.add(`opacity-100`,`pointer-events-auto`),i&&(i.classList.remove(`scale-95`),i.classList.add(`scale-100`))}function E(){let e=document.getElementById(`citationPreviewModal`),t=document.getElementById(`citationModalCard`);e&&(e.classList.remove(`opacity-100`,`pointer-events-auto`),e.classList.add(`opacity-0`,`pointer-events-none`),t&&(t.classList.remove(`scale-100`),t.classList.add(`scale-95`)))}function D(){let e=document.getElementById(`citationPreviewModal`),t=document.getElementById(`btnCloseCitationModal`),n=document.getElementById(`btnFooterCloseModal`);t&&t.addEventListener(`click`,E),n&&n.addEventListener(`click`,E),e&&e.addEventListener(`click`,t=>{t.target===e&&E()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&E()})}function O(e=[],t={}){let n=C(t,t),r=w(e,t),i=r.length,a=n.length,o=i>1||a>2,s=``;if(i>0){let e=r[0];s=`
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300" data-citation-card-index="1">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-[#4a4a4a] truncate">บทความวิศวกรรม (${i})</span>
          </div>
          <button type="button" class="text-gray-400 hover:text-gray-600 p-0.5 shrink-0 transition-colors" title="ตัวเลือกเพิ่มเติม">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>

        <!-- Middle & Bottom row: Text on left + Single relevant image on right -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0 text-left">
            <h4 class="text-[13.5px] font-semibold text-[#160808] group-hover:text-[#e7151a] leading-snug line-clamp-2 transition-colors cursor-pointer btn-open-article-modal" data-article-id="${e.id}" title="${h(e.title)}">
              ${h(e.title)}
            </h4>
            <p class="text-[12px] text-[#4a4a4a] line-clamp-2 mt-1 leading-relaxed">
              ${h(e.summary||e.desc||`คู่มือและคำแนะนำทางวิศวกรรมมาตรฐานจากฝ่ายเทคนิค UDO`)}
            </p>
          </div>
          ${e.image?`
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer btn-open-article-modal" data-article-id="${e.id}">
              <img src="${e.image}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          `:``}
        </div>
      </div>
    `}let c=``;if(a>0){let e=n[0],t=e.images&&e.images[0]&&(e.images[0].thumb||e.images[0].card)?e.images[0].thumb||e.images[0].card:`/images/logos/logo.svg`;c=`
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300" data-citation-card-index="2">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-[#4a4a4a] truncate">แคตตาล็อกสินค้า (${a})</span>
          </div>
          <button type="button" class="text-gray-400 hover:text-gray-600 p-0.5 shrink-0 transition-colors" title="ตัวเลือกเพิ่มเติม">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>

        <!-- Middle & Bottom row: Text on left + Thumbnail on right -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0 text-left">
            <div class="text-[13px] font-medium text-[#160808] leading-snug line-clamp-2">
              ${n.slice(0,2).map(e=>`<a href="/product.html?id=${e.id}" target="_blank" rel="noopener noreferrer" class="text-[#160808] hover:text-[#e7151a] hover:underline font-semibold inline-block">${h(e.brand||``)} ${h(e.name||``)}</a>`).join(`<span class="text-gray-400 font-normal">, </span>`)}${a>2?`<span class="text-gray-500 font-normal"> และอีก ${a-2} รายการ</span>`:``}
            </div>
            <p class="text-[12px] text-[#4a4a4a] line-clamp-2 mt-1 leading-relaxed">
              ${e.category?`สเปกทางการ ${h(e.category)} พร้อมข้อมูลมาตรฐานและสต็อกส่งตรงจาก UDO`:`สเปกทางการและสต็อกพร้อมส่งตรงจากคลังสินค้า UDO Trading`}
            </p>
          </div>
          ${t?`
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center">
              <img src="${t}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          `:``}
        </div>
      </div>
    `}let l=``;i>1&&(l=`
      <div class="citations-expanded-group citations-expanded-articles hidden">
        ${r.slice(1,3).map(e=>`
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-200 border-t border-gray-100/90 pt-2.5 mt-2">
        <div class="flex items-center gap-1.5 mb-1">
          <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
          <span class="text-[12px] font-medium text-[#4a4a4a]">บทความวิศวกรรม</span>
        </div>
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0 text-left">
            <h5 class="text-[13.5px] font-semibold text-[#160808] group-hover:text-[#e7151a] leading-snug line-clamp-2 transition-colors cursor-pointer btn-open-article-modal" data-article-id="${e.id}">
              ${h(e.title)}
            </h5>
            <p class="text-[12px] text-[#4a4a4a] line-clamp-2 mt-0.5 leading-relaxed">
              ${h(e.summary||e.desc||``)}
            </p>
          </div>
          ${e.image?`
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer btn-open-article-modal" data-article-id="${e.id}">
              <img src="${e.image}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          `:``}
        </div>
      </div>
    `).join(``)}
      </div>
    `);let u=``;return a>2&&(u=`
      <div class="citations-expanded-group citations-expanded-products hidden">
        ${n.slice(2,6).map(e=>{let t=e.images&&e.images[0]&&(e.images[0].thumb||e.images[0].card)||`/images/logos/logo.svg`;return`
        <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-200 border-t border-gray-100/90 pt-2.5 mt-2">
          <div class="flex items-center gap-1.5 mb-1">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-[#4a4a4a]">แคตตาล็อกสินค้า · ${h(e.brand||`UDO`)}</span>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0 text-left">
              <a href="/product.html?id=${e.id}" target="_blank" rel="noopener noreferrer" class="text-[13.5px] font-semibold text-[#160808] hover:text-[#e7151a] hover:underline leading-snug line-clamp-2 block">
                ${h(e.brand||``)} ${h(e.name||``)}
              </a>
              <p class="text-[12px] text-[#4a4a4a] line-clamp-1 mt-0.5 leading-relaxed">
                ${e.sku?`รหัส: ${h(e.sku)} · `:``}${h(e.category||`อุปกรณ์ช่าง`)}
              </p>
            </div>
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center">
              <img src="${t}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          </div>
        </div>
      `}).join(``)}
      </div>
    `),`
    <div class="w-full text-left">
      <!-- Article Section (All articles grouped at the top) -->
      <div class="citations-section-articles">
        ${s}
        ${l}
      </div>

      <!-- Divider between Article Section and Catalog Section -->
      ${s&&c?`<div class="border-t border-gray-100 my-2.5"></div>`:``}

      <!-- Catalog Section (All catalog items grouped at the bottom) -->
      <div class="citations-section-products">
        ${c}
        ${u}
      </div>

      <!-- Toggle Button -->
      ${o?`
    <button type="button" class="btn-toggle-all-citations w-full mt-3 py-2 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-[13px] font-semibold text-center transition-all select-none cursor-pointer flex items-center justify-center gap-1.5">
      <span class="btn-toggle-label font-semibold">แสดงทั้งหมด</span>
      <svg class="w-3.5 h-3.5 transition-transform duration-200 btn-toggle-icon text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
  `:``}
    </div>
  `}function k(n=[],r=``,i=null){let a=Array.isArray(n)&&n.length>0;if(!a&&!r)return``;let o=[],s=new Set;if(a&&n.forEach(e=>{let n=String(e).toLowerCase().trim();if(!n)return;let r=t.find(e=>{if(s.has(e.id))return!1;let t=(e.sku||``).toLowerCase(),r=(e.name||``).toLowerCase(),i=(e.brand||``).toLowerCase();return t.includes(n)||r.includes(n)||i.includes(n)});r&&(s.add(r.id),o.push(r))}),o.length===0&&i){let e=i.id,n=i.slug||(e?`cat-${e}`:``),r=(i.name||``).toLowerCase();t.filter(t=>!s.has(t.id)&&t.categories&&t.categories.some(t=>e&&(Number(t.id)===Number(e)||t.url_slug===`cat-${e}`)||n&&t.url_slug===n||r&&t.name&&t.name.toLowerCase().includes(r))).slice(0,6).forEach(e=>{s.add(e.id),o.push(e)})}if(o.length===0&&r){let e=r.toLowerCase().trim();t.filter(t=>{if(s.has(t.id))return!1;let n=(t.name||``).toLowerCase(),r=(t.brand||``).toLowerCase();return n.includes(e)||r.includes(e)}).slice(0,6).forEach(e=>{s.add(e.id),o.push(e)})}if(o.length===0)return``;let c=o.slice(0,3),l=o.slice(3,6),u=l.length>0,d=r?`/category.html?q=${encodeURIComponent(r.trim())}`:`/category.html`;if(i&&(i.id||i.slug)){let e=i.id||i.slug;d=`/category.html?type=category&cat=${encodeURIComponent(e)}&q=${encodeURIComponent(r?r.trim():``)}`}return`
    <div class="matched-products-section mt-8 pt-6 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-[15px] font-semibold text-gray-800 tracking-tight flex items-center gap-2">
          <span>รายการสินค้าและสเปกที่ตรงกัน:</span>
        </h3>
        <a href="${d}" class="text-[13px] text-gray-500 hover:text-black font-medium transition-colors">
          ดูในแคตตาล็อกร้านค้า &rarr;
        </a>
      </div>
      
      <!-- Primary 3 Products Grid (Initial View) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${c.map(t=>e(t,!0)).join(``)}
      </div>

      <!-- Extra Products Grid (Up to 6 total, revealed on click) -->
      ${u?`
        <div class="matched-products-extra hidden mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 transition-all">
          ${l.map(t=>e(t,!0)).join(``)}
        </div>

        <!-- Subtle Pill Toggle for Extra Products -->
        <div class="flex justify-center mt-5">
          <button type="button" class="btn-toggle-matched-products inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200/90 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-[13px] font-medium transition-all shadow-2xs cursor-pointer select-none" data-extra-count="${l.length}">
            <span class="btn-matched-label">ดูเพิ่มอีก ${l.length} รายการ</span>
            <svg class="w-3.5 h-3.5 text-gray-500 transition-transform duration-200 btn-matched-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      `:``}
    </div>
  `}function A(e={},t=``){return e&&e.intent===`contact_sales`||/(ติดต่อ|ฝ่ายขาย|เจ้าหน้าที่|ใบเสนอราคา|สั่งซื้อจำนวนมาก|ราคาส่ง|ขอเบอร์|โทร|เซลส์|แอดมิน|พนักงาน)/i.test(t)?`
    <div class="mt-6 p-4.5 rounded-2xl bg-gradient-to-r from-emerald-50/90 to-green-50/60 border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#06C755] text-white shrink-0">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 10.3c0-4.6-4.5-8.3-10-8.3S4 5.7 4 10.3c0 4.1 3.6 7.6 8.5 8.2.3.1.8.2.9.6.1.4.1.9 0 1.2l-.4 1.7c-.1.4-.3 1.1 1 .6 1.3-.5 6.9-4.1 7.9-5.7 1.4-1.7 2.1-3.7 2.1-6z"/></svg>
          </span>
          <h4 class="text-[15px] font-bold text-gray-900">ต้องการติดต่อฝ่ายขาย หรือขอใบเสนอราคาด่วน?</h4>
        </div>
        <p class="text-[13px] text-gray-600 sm:pl-8">ทีมวิศวกรเทคนิคและฝ่ายขาย UDO พร้อมให้บริการ ให้คำปรึกษา และออกใบเสนอราคาทันที</p>
      </div>
      <a href="https://line.me/ti/p/@udothai" target="_blank" rel="noopener noreferrer" class="shrink-0 px-4.5 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white text-[13.5px] font-semibold rounded-full shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer select-none">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 10.3c0-4.6-4.5-8.3-10-8.3S4 5.7 4 10.3c0 4.1 3.6 7.6 8.5 8.2.3.1.8.2.9.6.1.4.1.9 0 1.2l-.4 1.7c-.1.4-.3 1.1 1 .6 1.3-.5 6.9-4.1 7.9-5.7 1.4-1.7 2.1-3.7 2.1-6z"/></svg>
        <span>คุยกับเจ้าหน้าที่ทาง LINE</span>
      </a>
    </div>
  `:``}function j(e,t=``){if(!e)return``;let n=``,r=e.metadata||{};e.followUps||r.followUps;let i=r.matched_products||e.matched_products||[];if(typeof e==`string`)n=e;else if(e.markdown||e.content)n=e.markdown||e.content;else if(e.lead||e.sections){let t=e.lead||{},r=e.sections||[];(t.keyword||t.summary)&&(n+=`## ${t.keyword||``}\n${t.summary||``}\n\n`),r.forEach(e=>{n+=`### ${e.title}\n`,(e.items||[]).forEach(e=>{e.title?n+=`- **${e.title}**: ${e.desc}\n`:n+=`- ${e.desc}\n`}),n+=`
`}),!i.length&&e.citations&&(i=e.citations.map(e=>e.brand).filter(Boolean))}let o=a(n),s=o.html;o.metadata&&(r=Object.assign({},r,o.metadata),o.metadata.matched_products&&(i=o.metadata.matched_products),o.metadata.followUps&&o.metadata.followUps);let c=r.is_out_of_scope===!0||typeof e==`string`&&e.trim()===`ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้`||e&&e.markdown&&e.markdown.trim()===`ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้`,l=r.related_category||e&&e.related_category||null;return`
    <div class="ai-turn-left-document w-full">
      <!-- Main Markdown Content -->
      <div class="ai-markdown-body text-[16px] leading-[1.7] text-[#212121]">
        ${s}
      </div>

      <!-- LINE Contact Card (Triggers when sales/staff intent detected and NOT out of scope) -->
      ${c?``:A(r,t)}

      <!-- Matched Product Cards (Rendered ONLY if products match and NOT out of scope) -->
      ${c?``:k(i,t,l)}

      <!-- Toolbar -->
      
    <div class="mt-6 flex items-center gap-1 text-gray-500 pt-2 border-t border-gray-100">
      <button type="button" class="btn-action-copy p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="คัดลอกคำตอบ">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>
      <button type="button" class="btn-action-share p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="แชร์">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </button>
      <button type="button" class="btn-action-like p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="มีประโยชน์">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      </button>
      <button type="button" class="btn-action-dislike p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="ไม่ตรงที่ต้องการ">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
        </svg>
      </button>
      <button type="button" class="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="เพิ่มเติม">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
    </div>
  
    </div>
  `}function M(e={}){let t=document.getElementById(`chatMessagesContainer`),n=document.getElementById(`welcomeContainer`),r=document.getElementById(`chatBottomBarContainer`),i=document.getElementById(`chatLandingGreeting`),a=document.getElementById(`chatAmbientAura`),o=document.getElementById(`chatBottomBarRow`),s=document.getElementById(`chatBottomBarRightSpacer`),c=document.getElementById(`chatBottomBarDisclaimer`),l=document.getElementById(`chatGlassFrame`),u=document.getElementById(`chatBeamContainer`),d=document.getElementById(`chatGlassBezel`),f=document.getElementById(`chatForm`);if(!t)return;let p=y();if(!p||!p.messages||p.messages.length===0){t.innerHTML=``,n&&n.classList.add(`hidden`),document.documentElement.classList.remove(`is-chat-handoff`);let e=document.getElementById(`btnScrollToBottom`);e&&e.classList.add(`hidden`),r&&(r.className=`absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pb-24 sm:pb-32 md:pb-36 z-20 pointer-events-none transition-all duration-300`),i&&i.classList.remove(`hidden`),a&&a.classList.remove(`hidden`),l&&(l.className=`landing-glass-frame relative p-[6px] sm:p-[7px] rounded-[36px] sm:rounded-[38px] transition-all duration-300`),u&&u.classList.remove(`hidden`),d&&d.classList.remove(`hidden`),f&&(f.className=`chat-form-grid relative z-10 w-full bg-white rounded-[28px] sm:rounded-[30px] border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] px-4 sm:px-5 py-2.5 sm:py-3 transition-all ${f.classList.contains(`is-multiline`)?`is-multiline`:``}`),o&&(o.className=`max-w-[760px] mx-auto flex flex-col items-center w-full pointer-events-auto transition-all duration-300 relative`),s&&(s.classList.add(`hidden`),s.classList.remove(`lg:block`)),c&&c.classList.add(`hidden`);return}n&&n.classList.add(`hidden`),r&&(r.className=`absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-8 lg:px-12 pb-5 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-20 transition-all duration-300`),i&&i.classList.add(`hidden`),a&&a.classList.add(`hidden`),l&&(l.className=`w-full transition-all duration-300`),u&&u.classList.add(`hidden`),d&&d.classList.add(`hidden`),f&&(f.className=`chat-form-grid w-full bg-white rounded-[28px] border border-gray-300/80 hover:border-gray-400/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] px-4 sm:px-5 py-2.5 sm:py-3 transition-all ${f.classList.contains(`is-multiline`)?`is-multiline`:``}`),o&&(o.className=`max-w-[1240px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20 w-full pointer-events-none transition-all duration-300`),s&&(s.classList.remove(`hidden`),s.classList.add(`hidden`,`lg:block`)),c&&(c.classList.remove(`hidden`),c.className=`text-center text-[11.5px] text-gray-400 mt-2`);let m=[],_=null;p.messages.forEach(e=>{e.role===`user`?(_={userMsg:e,assistantMsg:null},m.push(_)):e.role===`assistant`&&_&&(_.assistantMsg=e)}),t.innerHTML=m.map((e,t)=>{let n=e.userMsg?e.userMsg.text:``,r=e.userMsg?g(e.userMsg.timestamp):`21:23`,i=e.assistantMsg?e.assistantMsg.data:null;return`
      <section class="ai-turn-section w-full" data-turn-index="${t+1}">
        
        <!-- 2-Column Responsive Layout: Left Chat Stream (User Bubble + AI Doc) + Right Sticky Card -->
        <div class="ai-turn-content-row flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20 w-full">
          
          <!-- Left Column (ฝั่งซ้าย: User Bubble + AI Document) -->
          <div class="flex-1 min-w-0 w-full flex flex-col">
            
            <!-- User Question Bubble: Stays strictly within the Left Column, max-width bounded as in reference image -->
            <div class="flex flex-col items-end self-end max-w-[85%] sm:max-w-[560px] md:max-w-[620px] mb-5 w-fit">
              <div class="ai-turn-user-bubble relative bg-[#F3F3F6] text-[#160808] rounded-[22px] px-5 py-3 text-[16px] font-medium leading-relaxed shadow-xs transition-all w-fit">
                <!-- User text with preserved line breaks (pre-wrap) - Keep on a single line to prevent whitespace bugs -->
                <div class="ai-turn-user-text whitespace-pre-wrap break-words font-medium text-[#160808]">${h(n)}</div>

                <!-- Down-arrow expand button: ONLY visible when content exceeds 4 lines -->
                <div class="ai-turn-user-toggle-row hidden justify-end mt-1.5 -mb-0.5">
                  <button type="button" class="btn-bubble-toggle w-6 h-6 rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all cursor-pointer focus:outline-none" title="ดูข้อความทั้งหมด">
                    <svg class="w-3.5 h-3.5 transition-transform duration-200 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              </div>
              <span class="text-[11.5px] text-gray-400 mt-1 mr-2 select-none">${r}</span>
            </div>

            <!-- AI Answer Document (No bubble, clean document layout) -->
            ${i?`
              <div class="w-full text-left">
                ${j(i,n)}
              </div>
            `:``}

          </div>

          <!-- Right Column (ฝั่งขวา: การ์ด Sticky แหล่งอ้างอิงประจำเทิร์นนี้ หรือ Spacer รักษาสมดุล) -->
          ${i?`
            <div class="w-full lg:w-[330px] xl:w-[360px] shrink-0 lg:sticky lg:top-[85px] self-start transition-all duration-300">
              <div class="citation-card-wrapper bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-3.5 sm:p-4">
                ${O(i.citations,i.metadata||i)}
              </div>
            </div>
          `:`
            <div class="hidden lg:block w-[330px] xl:w-[360px] shrink-0 pointer-events-none"></div>
          `}

        </div>

      </section>
    `}).join(``),N(),e.skipScroll||P()}function N(){document.querySelectorAll(`.btn-chat-followup`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-query`);t&&L(t)})}),document.querySelectorAll(`.btn-action-copy`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.ai-turn-left-document`);t&&navigator.clipboard.writeText(t.innerText).then(()=>{alert(`คัดลอกเนื้อหาเรียบร้อยแล้ว`)}).catch(()=>{})})}),document.querySelectorAll(`.btn-action-like`).forEach(e=>{e.addEventListener(`click`,()=>{e.classList.toggle(`text-emerald-600`),e.classList.toggle(`bg-emerald-50`)})}),document.querySelectorAll(`.btn-action-dislike`).forEach(e=>{e.addEventListener(`click`,()=>{e.classList.toggle(`text-red-600`),e.classList.toggle(`bg-red-50`)})}),document.querySelectorAll(`.btn-action-share`).forEach(e=>{e.addEventListener(`click`,()=>{navigator.clipboard.writeText(window.location.href).then(()=>{alert(`คัดลอกลิงก์ผลการค้นหา AI เรียบร้อยแล้ว`)}).catch(()=>{})})}),document.querySelectorAll(`.btn-open-article-modal`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-article-id`);t&&T(t)})}),document.querySelectorAll(`.btn-citation-ref`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-cite-index`),r=e.closest(`.ai-turn-section`);if(!r||!n)return;let i=r.querySelector(`[data-citation-card-index="${n}"]`);i&&(i.scrollIntoView({behavior:`smooth`,block:`nearest`}),i.classList.add(`ring-2`,`ring-[#e7151a]/70`,`bg-red-50/60`),setTimeout(()=>{i.classList.remove(`ring-2`,`ring-[#e7151a]/70`,`bg-red-50/60`)},1800))})}),document.querySelectorAll(`.btn-toggle-all-citations`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.closest(`.citation-card-wrapper`)||e.parentElement;if(!n)return;let r=n.querySelectorAll(`.citations-expanded-group`),i=e.querySelector(`.btn-toggle-label`),a=e.querySelector(`.btn-toggle-icon`);if(r.length===0)return;let o=r[0].classList.contains(`hidden`);r.forEach(e=>{o?e.classList.remove(`hidden`):e.classList.add(`hidden`)}),o?(i&&(i.textContent=`ย่อลง`),a&&a.classList.add(`rotate-180`)):(i&&(i.textContent=`แสดงทั้งหมด`),a&&a.classList.remove(`rotate-180`))})}),document.querySelectorAll(`.btn-toggle-matched-products`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.closest(`.matched-products-section`);if(!n)return;let r=n.querySelector(`.matched-products-extra`),i=e.querySelector(`.btn-matched-label`),a=e.querySelector(`.btn-matched-chevron`),o=e.getAttribute(`data-extra-count`)||`3`;r&&(r.classList.contains(`hidden`)?(r.classList.remove(`hidden`),i&&(i.textContent=`ย่อรายการสินค้า`),a&&a.classList.add(`rotate-180`)):(r.classList.add(`hidden`),i&&(i.textContent=`ดูเพิ่มอีก ${o} รายการ`),a&&a.classList.remove(`rotate-180`)))})}),requestAnimationFrame(()=>{document.querySelectorAll(`.ai-turn-user-bubble`).forEach(e=>{let t=e.querySelector(`.ai-turn-user-text`),n=e.querySelector(`.ai-turn-user-toggle-row`),r=e.querySelector(`.btn-bubble-toggle`);!t||!n||!r||(t.classList.add(`is-clamped`),t.scrollHeight>t.clientHeight+3?(n.classList.remove(`hidden`),n.classList.add(`flex`),r.onclick=n=>{n.stopPropagation();let i=e.classList.toggle(`is-expanded`),a=r.querySelector(`svg`);i?(t.classList.remove(`is-clamped`),a&&a.classList.add(`rotate-180`),r.setAttribute(`title`,`ย่อข้อความ`)):(t.classList.add(`is-clamped`),a&&a.classList.remove(`rotate-180`),r.setAttribute(`title`,`ดูข้อความทั้งหมด`))}):(t.classList.remove(`is-clamped`),n.classList.add(`hidden`),n.classList.remove(`flex`)))})})}function P(e=`smooth`){let t=document.getElementById(`chatScrollArea`);t&&setTimeout(()=>{t.scrollTo({top:t.scrollHeight,behavior:e})},60)}function F(e=`latest`,t=`auto`){let n=document.getElementById(`chatScrollArea`);if(!n)return;let r=()=>{let r=n.querySelectorAll(`.ai-turn-section`);if(!r||r.length===0)return;let i=null;if(i=e===`latest`?r[r.length-1]:typeof e==`number`&&e>0&&e<=r.length?r[e-1]:r[r.length-1],i){let e=i.getBoundingClientRect(),r=n.getBoundingClientRect(),a=e.top-r.top+n.scrollTop;n.scrollTo({top:Math.max(0,a-16),behavior:t})}};r(),setTimeout(r,50),setTimeout(r,180)}function I(){let e=document.getElementById(`chatScrollArea`),t=document.getElementById(`btnScrollToBottom`);if(!e||!t)return;function n(){let n=e.scrollHeight-e.scrollTop-e.clientHeight,r=y();r&&r.messages&&r.messages.length>0&&n>160?t.classList.remove(`hidden`):t.classList.add(`hidden`)}e.addEventListener(`scroll`,n,{passive:!0}),t.addEventListener(`click`,()=>{t.classList.add(`hidden`),e.scrollTo({top:e.scrollHeight,behavior:`smooth`})})}async function L(e){let t=(e||``).trim();if(!t||f)return;f=!0;let n=document.getElementById(`chatInput`),r=document.getElementById(`btnChatSubmit`),a=document.getElementById(`chatPendingSkeleton`);if(n){n.value=``,n.style.height=`28px`,n.style.overflowY=`hidden`,n.disabled=!0;let e=document.getElementById(`chatForm`);e&&e.classList.remove(`is-multiline`)}r&&(r.classList.add(`hidden`),r.classList.remove(`flex`));let s=y();s?(s.messages.length===0||s.title===`แชทใหม่`||s.title===`New thread`)&&(s.title=t):s=b(t);let c=Date.now();s.updatedAt=c,s.messages.push({role:`user`,text:t,timestamp:c});let l=u.findIndex(e=>e.id===s.id);l>0&&(u.splice(l,1),u.unshift(s)),v(),S(),M(),a&&(a.classList.remove(`hidden`),P());let d=s.messages.slice(0,-1).slice(-4).map(e=>{let t=e.text||``;return!t&&e.data&&(t=e.data.markdown||(e.data.lead?`${e.data.lead.keyword||``} ${e.data.lead.summary||``}`:``)),{role:e.role===`assistant`?`model`:`user`,text:String(t).trim()}}).filter(e=>e.text.length>0),p=await o(t,d);p||=i(t),a&&a.classList.add(`hidden`);let m=Date.now();s.updatedAt=m,s.messages.push({role:`assistant`,data:p,timestamp:m}),v(),S(),M(),n&&(n.disabled=!1,n.focus()),f=!1,P()}function R(){let e=document.getElementById(`chatSidebar`),t=document.getElementById(`btnToggleSidebar`);if(!e)return;let n=t=>{t?e.classList.add(`is-collapsed`):e.classList.remove(`is-collapsed`);try{localStorage.setItem(l,t?`1`:`0`)}catch{}};localStorage.getItem(l)===`1`&&n(!0),t&&t.addEventListener(`click`,()=>{let t=e.classList.contains(`is-collapsed`);n(!t)})}function z(){let e=document.getElementById(`chatForm`),t=document.getElementById(`chatInput`),n=document.getElementById(`btnChatSubmit`),r=document.getElementById(`btnChatMic`),i=document.getElementById(`btnChatPlus`),a=null,o=document.getElementById(`chatBottomBarRow`);function s(){if(!t||!e)return;t.style.height=`auto`;let n=t.scrollHeight;if((t.value.includes(`
`)||n>34)&&t.value.trim().length>0){e.classList.add(`is-multiline`);let r=Math.min(n,180);t.style.height=`${r}px`,t.style.overflowY=n>180?`auto`:`hidden`}else e.classList.remove(`is-multiline`),t.style.height=`28px`,t.style.overflowY=`hidden`}t&&(t.addEventListener(`focus`,()=>{o&&o.classList.add(`is-focused`)}),t.addEventListener(`blur`,()=>{o&&o.classList.remove(`is-focused`,`is-typing`),a&&clearTimeout(a)})),t&&n&&(t.addEventListener(`input`,()=>{s(),o&&(o.classList.add(`is-typing`),a&&clearTimeout(a),a=setTimeout(()=>{o&&o.classList.remove(`is-typing`)},2e3)),t.value.trim().length>0?(n.classList.remove(`hidden`),n.classList.add(`flex`),r&&r.classList.add(`hidden`)):(n.classList.add(`hidden`),n.classList.remove(`flex`),r&&r.classList.remove(`hidden`))}),t.addEventListener(`keydown`,e=>{if((e.metaKey||e.ctrlKey)&&e.key===`Enter`){e.preventDefault();let n=t.selectionStart,r=t.selectionEnd;t.value=t.value.substring(0,n)+`
`+t.value.substring(r),t.selectionStart=t.selectionEnd=n+1,s(),t.dispatchEvent(new Event(`input`));return}if(e.key===`Enter`&&e.shiftKey){setTimeout(s,0);return}if(e.key===`Enter`&&!e.shiftKey&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();let n=t.value.trim();n.length>0&&(o&&o.classList.remove(`is-focused`,`is-typing`),a&&clearTimeout(a),L(n),setTimeout(()=>{s()},10))}})),e&&t&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=t.value.trim();n.length>0&&(o&&o.classList.remove(`is-focused`,`is-typing`),a&&clearTimeout(a),L(n))}),r&&r.addEventListener(`click`,()=>{alert(`ระบบค้นหาด้วยเสียงกำลังเชื่อมต่อกับไมโครโฟนของคุณ`)}),i&&i.addEventListener(`click`,()=>{alert(`สามารถแนบรูปภาพรอยเชื่อมหรืออัปโหลดสเปกชีตเพื่อวิเคราะห์เพิ่มเติม (เร็วๆ นี้)`)})}function B(){let e=document.querySelectorAll(`.chat-tab-btn`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>{e.classList.remove(`active`,`text-gray-900`,`border-gray-900`,`font-semibold`),e.classList.add(`text-gray-600`,`border-transparent`,`font-normal`)}),t.classList.add(`active`,`text-gray-900`,`border-gray-900`,`font-semibold`),t.classList.remove(`text-gray-600`,`border-transparent`,`font-normal`)})})}function V(){document.querySelectorAll(`.welcome-chip`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-prompt`);t&&L(t)})})}function H(){let e=document.getElementById(`chatSidebar`),t=()=>{document.documentElement.classList.remove(`is-chat-handoff`);try{window.location.search&&window.history.replaceState({},``,window.location.pathname)}catch{}b(`แชทใหม่`);let e=document.getElementById(`chatInput`);if(e){e.value=``,e.style.height=`28px`,e.style.overflowY=`hidden`;let t=document.getElementById(`chatForm`);t&&t.classList.remove(`is-multiline`),e.focus()}},n=document.getElementById(`btnNewThread`);n&&n.addEventListener(`click`,t);let r=document.getElementById(`btnNewThreadMini`);r&&r.addEventListener(`click`,t);let i=document.getElementById(`btnNavAiMode`);i&&i.addEventListener(`click`,t);let a=document.getElementById(`btnSearchThreadsTrigger`),o=document.getElementById(`inputSearchThreads`),s=document.getElementById(`btnSearchThreadsMini`),c=()=>{if(e&&e.classList.contains(`is-collapsed`)){e.classList.remove(`is-collapsed`);try{localStorage.setItem(l,`0`)}catch{}}a&&a.classList.add(`hidden`),o&&(o.classList.remove(`hidden`),o.focus())};a&&a.addEventListener(`click`,c),s&&s.addEventListener(`click`,c),o&&(o.addEventListener(`input`,()=>{S(o.value)}),o.addEventListener(`blur`,()=>{o.value.trim().length===0&&(o.classList.add(`hidden`),a&&a.classList.remove(`hidden`),S(``))}));let u=()=>{alert(`UDO AI Workspace Settings
- โมเดลปัจจุบัน: Gemini 3.5 Flash Lite
- การเชื่อมต่อ: Vertex AI Global Microservice
- สถาปัตยกรรม: Trojan Horse Native PHP 8.1 API`)},d=document.getElementById(`btnSettingsModal`);d&&d.addEventListener(`click`,u);let f=document.getElementById(`btnSettingsModalMini`);f&&f.addEventListener(`click`,u)}document.addEventListener(`DOMContentLoaded`,()=>{_(),R(),z(),B(),V(),H(),D(),I(),document.body.classList.add(`page-fade-in`);let e=new URLSearchParams(window.location.search),t=e.get(`q`);e.get(`handoff`);let n=null;try{let e=sessionStorage.getItem(`udo_ai_chat_handoff`);e&&(n=JSON.parse(e),sessionStorage.removeItem(`udo_ai_chat_handoff`))}catch{n=null}if(n&&n.followUpQuery){let e=n.initialQuery||`ลวดเชื่อม`,t=n.followUpQuery,r=b(t.length>30?t.substring(0,30)+`...`:t);n.initialAnswer&&(r.messages.push({role:`user`,text:e,timestamp:(n.timestamp||Date.now())-4e3}),r.messages.push({role:`assistant`,data:n.initialAnswer,timestamp:(n.timestamp||Date.now())-2e3})),n.followUpAnswer?(r.messages.push({role:`user`,text:t,timestamp:(n.timestamp||Date.now())-1e3}),r.messages.push({role:`assistant`,data:n.followUpAnswer,timestamp:Date.now()}),v(),S(),M({skipScroll:!0}),F(`latest`,`auto`)):(v(),S(),M(),setTimeout(()=>{L(t)},80));try{window.history.replaceState({},``,window.location.pathname)}catch{}}else if(t&&t.trim().length>0){let e=t.trim();try{window.history.replaceState({},``,window.location.pathname)}catch{}b(e),L(e)}else u.length>0&&(!d||!u.find(e=>e.id===d))&&(d=u[0].id),S(),M();document.addEventListener(`click`,e=>{p&&!e.target.closest(`.thread-dropdown-menu`)&&!e.target.closest(`.btn-thread-menu`)&&(p=null,S())})});