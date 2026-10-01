/**
 * UDO AI Overview Component
 * 1:1 match with Google AI Overview UI:
 * Pure white canvas, no outer box, clean typography & standard bullets,
 * action bar with 3-dots feedback, floating search pill with plus & mic,
 * right citation card, and ephemeral orbiting green glow beam.
 * 
 * Native Modern Architecture:
 * - Dynamic asynchronous hydration from Native PHP 8.1 API (/api/ai_search.php)
 * - Google-style pulsating skeleton loading state
 * - Strict rule: NO emojis anywhere in source code or output.
 */

import { renderMarkdownToHTML } from './markdown_parser.js';
import { mockDatabase } from './mock_database.js';
import { UDO_ARTICLES, findArticle } from './udo_articles.js';

let currentLoadedQuery = '';
let currentLoadedAiData = null;

/**
 * Render Google-style Skeleton Loading State
 */
export function createAiOverviewSkeletonHTML(query = 'ลวดเชื่อมมิก') {
  return `
  <section id="udo-ai-overview-wrapper" class="relative w-full bg-white pt-4 pb-8 mb-4">
    <div class="relative z-20 w-full bg-white">
      
      <!-- AI Header (Sparkle Icon + Title) -->
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
        </svg>
        <h2 class="text-[17px] font-semibold text-gray-900 tracking-tight">
          ข้อมูลภาพรวมโดย UDO AI
        </h2>
      </div>

      <!-- 2-Column Responsive Layout: Left Content + Right Citation Card -->
      <div class="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 xl:gap-24 2xl:gap-28">
        
        <!-- Left Column: Skeleton Loading Lines -->
        <div class="flex-1 w-full min-w-0 max-w-[730px]">
          <!-- Lead sentence skeleton -->
          <div class="space-y-3 mb-6 animate-pulse">
            <div class="h-4 bg-gray-200/90 rounded-full w-full"></div>
            <div class="h-4 bg-gray-200/75 rounded-full w-[94%]"></div>
            <div class="h-4 bg-gray-200/60 rounded-full w-[78%]"></div>
          </div>

          <!-- Section 1 skeleton -->
          <div class="mt-6 mb-5 animate-pulse">
            <div class="h-4.5 bg-gray-200/90 rounded-md w-44 mb-3.5"></div>
            <div class="space-y-2.5 pl-4">
              <div class="h-3.5 bg-gray-200/75 rounded-full w-[92%]"></div>
              <div class="h-3.5 bg-gray-200/65 rounded-full w-[84%]"></div>
            </div>
          </div>

          <!-- Section 2 skeleton -->
          <div class="mt-5 mb-5 animate-pulse">
            <div class="h-4.5 bg-gray-200/90 rounded-md w-36 mb-3.5"></div>
            <div class="space-y-2.5 pl-4">
              <div class="h-3.5 bg-gray-200/75 rounded-full w-[80%]"></div>
              <div class="h-3.5 bg-gray-200/60 rounded-full w-[65%]"></div>
            </div>
          </div>

        </div>

        <!-- Right Column: Citation Card Skeleton (Sticky in viewport) -->
        <div class="w-full lg:w-[350px] xl:w-[390px] 2xl:w-[410px] shrink-0 lg:sticky lg:top-[125px] self-start transition-all duration-300">
          <div class="bg-white rounded-[24px] border border-gray-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-4 sm:p-5 animate-pulse">
            <div class="flex items-start justify-between gap-3 py-1.5">
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200/80 rounded w-24 mb-1"></div>
                <div class="h-3.5 bg-gray-200/90 rounded w-[90%]"></div>
                <div class="h-3 bg-gray-200/60 rounded w-[75%]"></div>
              </div>
              <div class="w-14 h-14 rounded-lg bg-gray-200/70 shrink-0"></div>
            </div>
            <div class="border-t border-gray-100 my-3"></div>
            <div class="flex items-start justify-between gap-3 py-1.5">
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200/80 rounded w-20 mb-1"></div>
                <div class="h-3.5 bg-gray-200/90 rounded w-[88%]"></div>
                <div class="h-3 bg-gray-200/60 rounded w-[70%]"></div>
              </div>
              <div class="w-14 h-14 rounded-lg bg-gray-200/70 shrink-0"></div>
            </div>
            <div class="w-full mt-4 h-9 bg-gray-100 rounded-full"></div>
          </div>
        </div>

      </div>

    </div>

    <!-- Clean Bottom Divider -->
    <div class="w-full border-b border-gray-200 mt-8 mb-4"></div>
  </section>
  `;
}

/**
 * Render Floating Conversational Question Box (1:1 with chat.html)
 */
function renderFloatingQuestionBoxHTML(query = '', placeholder = 'ลองถามอะไรก็ได้') {
  return `
  <div class="mt-6 relative inline-block w-full">
    <!-- Main Form Card (Auto-expanding Multiline Pill matching chat.html) -->
    <form id="aiFloatingForm" class="chat-form-grid relative z-10 w-full bg-white rounded-[28px] sm:rounded-[30px] border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] px-4 sm:px-5 py-2.5 sm:py-3 transition-all">
      <!-- Left Action: Plus Button (+) -->
      <div class="chat-plus-wrapper">
        <button type="button" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer" title="เพิ่มข้อมูล">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      <!-- Text Input (Auto-resizing Textarea) -->
      <div class="chat-input-wrapper">
        <textarea 
          id="aiFloatingInput"
          rows="1"
          placeholder="${placeholder}" 
          autocomplete="off"
          class="w-full bg-transparent text-[15px] sm:text-[15.5px] text-gray-900 placeholder-gray-500 outline-none border-none focus:ring-0 px-2 py-0.5 resize-none leading-relaxed transition-all"
        ></textarea>
      </div>

      <!-- Right Actions: Mic & Submit Arrow Button -->
      <div class="chat-actions-right">
        <button type="button" id="btnAiMic" class="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors cursor-pointer" title="ค้นหาด้วยเสียง">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3v6a3 3 0 003 3z" />
          </svg>
        </button>

        <!-- Submit Button: Appears with green #90DE3C when typing -->
        <button type="submit" id="btnAiSubmit" class="hidden w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#90DE3C] hover:bg-[#82c936] text-black items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0" title="ส่งคำถาม">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      </div>
    </form>
  </div>
  `;
}

/**
 * Escape HTML to prevent XSS in user messages
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Resolve matched products from mockDatabase
 */
function getMatchedProductsList(meta = {}, data = {}) {
  const tokens = meta.matched_products || data.matched_products || [];
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return mockDatabase.slice(0, 2);
  }
  
  const matched = [];
  const seenIds = new Set();
  
  tokens.forEach(tok => {
    const t = String(tok).toLowerCase().trim();
    if (!t) return;
    const found = mockDatabase.find(p => {
      if (seenIds.has(p.id)) return false;
      const sku = (p.sku || '').toLowerCase();
      const name = (p.name || '').toLowerCase();
      const brand = (p.brand || '').toLowerCase();
      return sku.includes(t) || name.includes(t) || brand.includes(t);
    });
    if (found) {
      seenIds.add(found.id);
      matched.push(found);
    }
  });

  return matched.length > 0 ? matched : mockDatabase.slice(0, 2);
}

/**
 * Resolve authentic articles list from citations or UDO knowledge
 */
function getMatchedArticlesList(citations = [], meta = {}) {
  const sourceList = (citations && citations.length > 0)
    ? citations
    : (meta && meta.sources && meta.sources.length > 0)
      ? meta.sources
      : [];
  
  const matched = [];
  const seenKeys = new Set();
  
  sourceList.forEach(s => {
    const sId = s.id || '';
    const sTitle = s.title || '';
    if (!sTitle || sTitle.toLowerCase().includes('catalog product')) return;
    const found = findArticle(sId) || findArticle(sTitle) || s;
    const key = found.id || found.title || String(Math.random());
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      matched.push(found);
    }
  });

  if (matched.length === 0) {
    matched.push(UDO_ARTICLES[0]);
  }
  return matched;
}

/**
 * Render Inner Content of the Right Sticky Citation Card (1:1 with chat.html)
 */
export function renderCitationsCardContentHTML(citations = [], meta = {}) {
  const matchedProducts = getMatchedProductsList(meta, meta);
  const matchedArticles = getMatchedArticlesList(citations, meta);

  const articlesCount = matchedArticles.length;
  const productsCount = matchedProducts.length;

  // Item 1: Authentic UDO Article
  let articleCardHTML = '';
  if (articlesCount > 0) {
    const art = matchedArticles[0];
    articleCardHTML = `
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-gray-500 truncate">บทความวิศวกรรม (${articlesCount})</span>
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
            <h4 class="text-[13px] font-semibold text-gray-900 group-hover:text-[#e7151a] leading-snug line-clamp-2 transition-colors cursor-pointer" title="${escapeHtml(art.title)}">
              ${escapeHtml(art.title)}
            </h4>
            <p class="text-[11.5px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              ${escapeHtml(art.summary || art.desc || 'คู่มือและคำแนะนำทางวิศวกรรมมาตรฐานจากฝ่ายเทคนิค UDO')}
            </p>
          </div>
          ${art.image ? `
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer">
              <img src="${art.image}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Item 2: Authentic UDO Products (Catalog)
  let catalogCardHTML = '';
  if (productsCount > 0) {
    const primaryProd = matchedProducts[0];
    const prodImg = (primaryProd.images && primaryProd.images[0] && (primaryProd.images[0].thumb || primaryProd.images[0].card)) 
      ? (primaryProd.images[0].thumb || primaryProd.images[0].card) 
      : '/images/logos/logo.svg';

    const topTwo = matchedProducts.slice(0, 2);
    const prodLinks = topTwo.map(p => {
      return `<a href="/product.html?id=${p.id}" target="_blank" rel="noopener noreferrer" class="text-gray-900 hover:text-[#e7151a] hover:underline font-semibold inline-block">${escapeHtml(p.brand || '')} ${escapeHtml(p.name || '')}</a>`;
    }).join('<span class="text-gray-400 font-normal">, </span>');
    const moreText = productsCount > 2 ? `<span class="text-gray-500 font-normal"> และอีก ${productsCount - 2} รายการ</span>` : '';

    const prodSnippet = primaryProd.category 
      ? `สเปกทางการ ${escapeHtml(primaryProd.category)} พร้อมข้อมูลมาตรฐานและสต็อกส่งตรงจาก UDO`
      : 'สเปกทางการและสต็อกพร้อมส่งตรงจากคลังสินค้า UDO Trading';

    catalogCardHTML = `
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300 mt-2.5 pt-2.5 border-t border-gray-100">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-gray-500 truncate">แคตตาล็อกสินค้า (${productsCount})</span>
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
            <div class="text-[12.5px] font-medium text-gray-800 leading-snug line-clamp-2">
              ${prodLinks}${moreText}
            </div>
            <p class="text-[11.5px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              ${prodSnippet}
            </p>
          </div>
          ${prodImg ? `
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center">
              <img src="${prodImg}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  return `
    ${articleCardHTML}
    ${catalogCardHTML}

    <!-- Full-width Pill Button: แสดงทั้งหมด (1:1 with chat.html) -->
    <button type="button" id="btnShowAllSources" class="btn-toggle-all-citations w-full mt-3 py-2 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-[13px] font-semibold text-center transition-all select-none cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.99]">
      <span class="btn-toggle-label font-semibold">แสดงทั้งหมด</span>
      <svg class="w-3.5 h-3.5 transition-transform duration-200 btn-toggle-icon text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  `;
}

/**
 * Render Assistant Answer Content for a Turn
 */
export function renderTurnAnswerHTML(data) {
  const query = data.query || '';
  let markdownContent = '';
  let meta = data.metadata || {};
  let followUps = data.followUps || meta.followUps || [];

  if (typeof data === 'string') {
    markdownContent = data;
  } else if (data.markdown || data.content) {
    markdownContent = data.markdown || data.content;
  } else if (data.lead || data.sections) {
    const lead = data.lead || {};
    const sections = data.sections || [];
    
    if (lead.keyword || lead.summary) {
      markdownContent += `## ${lead.keyword || ''}\n${lead.highlight ? `**${lead.highlight}** ` : ''}${lead.summary || ''}\n\n`;
    }
    
    sections.forEach(sec => {
      markdownContent += `### ${sec.title}\n`;
      (sec.items || []).forEach(item => {
        if (item.title) {
          markdownContent += `- **${item.title}**: ${item.desc}\n`;
        } else {
          markdownContent += `- ${item.desc}\n`;
        }
      });
      markdownContent += '\n';
    });
  }

  const parsed = renderMarkdownToHTML(markdownContent);
  const renderedHTML = parsed.html;
  if (parsed.metadata && parsed.metadata.followUps) {
    followUps = parsed.metadata.followUps;
  }

  const followUpsHTML = followUps && followUps.length > 0 ? `
    <div class="mt-5 mb-4">
      <p class="text-[14.5px] text-gray-800 font-normal mb-2">
        หากคุณต้องการคำแนะนำเพิ่มเติม ช่วยบอกหน่อยว่า:
      </p>
      <ul class="space-y-1.5 list-disc pl-5 marker:text-gray-800 text-[14.5px] text-gray-800">
        ${followUps.map(f => `
          <li class="cursor-pointer hover:text-[#e7151a] transition-colors ai-followup-bullet" data-query="${escapeHtml(f)}">
            ${escapeHtml(f)}
          </li>
        `).join('')}
      </ul>
    </div>` : '';

  // Action toolbar matching chat.html 1:1
  const toolbarHTML = `
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
      <button type="button" class="btn-action-more p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="เพิ่มเติม">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
    </div>
  `;

  return `
    <div class="ai-turn-body text-[15px] sm:text-[15.5px] leading-[1.8] text-gray-800">
      <div class="ai-markdown-content space-y-4">
        ${renderedHTML}
      </div>
      ${followUpsHTML}
      ${toolbarHTML}
    </div>
  `;
}

/**
 * Render Dynamic Content from Grounded API Data (Initial Full Layout with Collapsible State)
 */
export function createAiOverviewDynamicHTML(data) {
  const query = data.query || 'ลวดเชื่อมมิก';
  const citations = data.citations || [];

  // Out-of-Scope Guardrail: Return exact refusal text without product clutter
  if (data.is_out_of_scope || (data.markdown && data.markdown.trim() === 'ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้')) {
    return `
    <section id="udo-ai-overview-wrapper" class="relative w-full bg-white pt-4 pb-4 mb-2">
      <div class="relative z-20 w-full bg-white">
        <!-- AI Header (Sparkle Icon + Title) -->
        <div class="flex items-center gap-2 mb-3">
          <svg class="w-5 h-5 text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
          </svg>
          <h2 class="text-[17px] font-semibold text-gray-900 tracking-tight">
            ข้อมูลภาพรวมโดย UDO AI
          </h2>
        </div>

        <!-- Clean Out-of-Scope Refusal Card -->
        <div class="rounded-2xl border border-gray-200/90 bg-[#fafafa] p-5 sm:p-6 max-w-[730px]">
          <p class="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed">
            ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้
          </p>
          <p class="text-[13px] text-gray-500 mt-2 leading-relaxed">
            ระบบ UDO AI ให้บริการข้อมูลและคำแนะนำเฉพาะผลิตภัณฑ์งานเชื่อม อุปกรณ์ช่าง และวิศวกรรมของ UDO เท่านั้น
          </p>
        </div>
      </div>
      <!-- Clean Bottom Divider -->
      <div class="w-full border-b border-gray-200 mt-6 mb-2"></div>
    </section>
    `;
  }

  return `
  <section id="udo-ai-overview-wrapper" class="relative w-full bg-white pt-4 pb-8 mb-4">
    <div class="relative z-20 w-full bg-white">
      
      <!-- AI Header (Sparkle Icon + Title) -->
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
        </svg>
        <h2 class="text-[17px] font-semibold text-gray-900 tracking-tight">
          ข้อมูลภาพรวมโดย UDO AI
        </h2>
      </div>

      <!-- 2-Column Responsive Layout: Left Multi-Turn Thread + Right Sticky Citation Card -->
      <div class="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 xl:gap-24 2xl:gap-28">
        
        <!-- Left Column: Multi-turn Conversation Thread (Optimal Reading Width ~730px) -->
        <div class="flex-1 w-full min-w-0 max-w-[730px]">
          
          <!-- Collapsible Container for Initial Truncated Preview (Default Collapsed) -->
          <div id="ai-overview-collapsible" class="relative max-h-[260px] overflow-hidden transition-all duration-500 ease-in-out">
            <!-- Continuous Conversation Thread Container -->
            <div id="ai-conversation-thread" class="space-y-6">
              <div class="ai-turn-item" data-turn="1">
                ${renderTurnAnswerHTML(data)}
              </div>
            </div>

            <!-- Floating Question Box (Sits naturally inside the expanded view) -->
            ${renderFloatingQuestionBoxHTML(query)}

            <!-- Gradient Fade Mask for Collapsed State -->
            <div id="ai-overview-fade-mask" class="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300 z-10"></div>
          </div>

          <!-- Pill Button: แสดงเพิ่มเติม (Show More) -->
          <div id="ai-expand-wrapper" class="w-full flex justify-center mt-3 mb-3">
            <button type="button" id="btnToggleAiExpand" class="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200/90 bg-white hover:bg-gray-50 text-gray-800 text-[13.5px] font-medium shadow-xs hover:border-gray-300 transition-all cursor-pointer active:scale-98">
              <span id="aiExpandBtnText">แสดงเพิ่มเติม</span>
              <svg id="aiExpandIcon" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          <!-- Pending Turn Loading Skeleton Container -->
          <div id="ai-pending-turn-container" class="hidden"></div>

        </div>

        <!-- Right Column: Sticky Citation & Product Card Container -->
        <div class="w-full lg:w-[350px] xl:w-[390px] 2xl:w-[410px] shrink-0 lg:sticky lg:top-[125px] self-start transition-all duration-300">
          <div id="udo-ai-citations-list" class="bg-white rounded-[24px] border border-gray-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-4 sm:p-5 transition-all duration-300">
            ${renderCitationsCardContentHTML(citations, data.metadata || {})}
          </div>
        </div>

      </div>

    </div>

    <!-- Clean Bottom Divider separating AI section from Product Catalog -->
    <div class="w-full border-b border-gray-200 mt-8 mb-4"></div>
  </section>
  `;
}

/**
 * Default wrapper for backwards compatibility
 */
/**
 * Detect if a user query is outside UDO's business scope
 * In Pure AI architecture, scope decision is delegated to LLM structured output.
 */
export function isOutOfScopeQuery(query = '') {
  return false;
}

/**
 * Neutral circuit breaker data if all remote AI endpoints are unreachable
 */
export function getCuratedFallbackData(query = 'ลวดเชื่อมมิก') {
  return {
    query: query,
    is_out_of_scope: false,
    markdown: `## ข้อมูลภาพรวมเกี่ยวกับ ${query}
ระบบกำลังปรับปรุงการเชื่อมต่อกับ UDO AI ชั่วคราว ท่านสามารถค้นหาและเลือกดูผลิตภัณฑ์จริงจากแคตตาล็อกด้านล่าง หรือติดต่อสอบถามเจ้าหน้าที่ผู้เชี่ยวชาญผ่านทาง LINE ได้ตลอดเวลา`,
    lead: {
      keyword: query,
      highlight: 'ผู้เชี่ยวชาญผลิตภัณฑ์งานเชื่อมและเครื่องมือช่าง',
      summary: 'สามารถเลือกดูผลิตภัณฑ์จริงได้จากหมวดหมู่และรายการสินค้าด้านล่าง'
    },
    sections: [],
    followUps: [],
    citations: [],
    related_category: null,
    matched_products: []
  };
}

/**
 * Default wrapper for backwards compatibility
 */
export function createAiOverviewHTML(data) {
  if (data && data.lead) {
    return createAiOverviewDynamicHTML(data);
  }
  return createAiOverviewDynamicHTML(getCuratedFallbackData(data ? data.query : ''));
}

let isFollowUpLoading = false;
let turnCounter = 1;

/**
 * Asynchronous Data Fetcher with multi-tier failover
 */
export async function fetchAiData(query, history = []) {
  let aiData = null;

  const payload = {
    q: query,
    history: Array.isArray(history) ? history : []
  };

  // 1. Fetch from Native PHP REST API
  try {
    const res = await fetch('/api/ai_search.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (json.success && json.data) {
          aiData = json.data;
        }
      } catch (e) {
        // Raw text response or Vite serving static php
      }
    }
  } catch (err) {
    console.warn('Native PHP API search unreachable:', err);
  }

  // 2. Fallback directly to Cloud Run Vertex AI
  if (!aiData) {
    try {
      const cloudRunUrl = 'https://udo-ai-service-330377476882.asia-southeast1.run.app/api/ai-search';
      const res = await fetch(cloudRunUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          aiData = json.data;
        }
      }
    } catch (crErr) {
      console.warn('Cloud Run direct fetch error:', crErr);
    }
  }

  // 3. Fallback to curated catalog overview if API unreachable
  if (!aiData) {
    aiData = getCuratedFallbackData(query);
  }

  return aiData;
}

/**
 * Handle in-place continuous follow-up conversation
 */
/**
 * Show Centered Frosted Glass Loading Overlay (strictly no text, purely visual)
 */
function showHandoffLoadingOverlay() {
  let overlay = document.getElementById('aiHandoffLoadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'aiHandoffLoadingOverlay';
    overlay.className = 'fixed inset-0 z-[200] flex items-center justify-center bg-black/10 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 pointer-events-auto';
    overlay.innerHTML = `
      <div class="relative inline-flex items-center transform scale-110 sm:scale-125 transition-transform duration-300">
        <!-- Ambient Glow Aura behind the Pill -->
        <div class="absolute -inset-3 -z-10 pointer-events-none overflow-hidden rounded-full flex items-center justify-center">
          <div class="pill-ambient-laser-glow pointer-events-none"></div>
        </div>

        <!-- Outer Glass Frame with Orbiting Laser Beam -->
        <div class="relative p-[3.5px] rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <!-- Orbiting Light Beam Layer -->
          <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div class="pill-beam-laser-spinner pointer-events-none"></div>
          </div>

          <!-- Frosted Glass Trench / Bevel Layer -->
          <div class="absolute inset-[1px] rounded-full bg-white/30 backdrop-blur-md border border-white/70 pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]"></div>

          <!-- Inner White Pill Content: 3 Animated Typing Dots (NO text) -->
          <div class="relative z-10 px-5 py-3 bg-white/95 rounded-full flex items-center justify-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span class="w-2.5 h-2.5 rounded-full bg-gray-600 udo-dot-1"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-gray-600 udo-dot-2"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-gray-600 udo-dot-3"></span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
  });
}

/**
 * Smooth Handoff: Background prefetch Turn 2, then redirect seamlessly to chat.html
 */
export async function triggerHandoffToChat(followUpQuery) {
  const cleanQ = (followUpQuery || '').trim();
  if (!cleanQ) return;

  const floatingInput = document.getElementById('aiFloatingInput');
  const submitBtn = document.getElementById('btnAiSubmit');
  if (floatingInput) floatingInput.disabled = true;
  if (submitBtn) submitBtn.classList.add('opacity-50', 'pointer-events-none');

  // 1. Show centered indicator immediately
  showHandoffLoadingOverlay();

  // 2. Build history payload from current conversation
  const historyPayload = [];
  if (currentLoadedQuery) {
    historyPayload.push({ role: 'user', text: currentLoadedQuery });
  }
  if (currentLoadedAiData) {
    const ansText = currentLoadedAiData.markdown || (currentLoadedAiData.lead ? `${currentLoadedAiData.lead.keyword || ''} ${currentLoadedAiData.lead.summary || ''}` : '');
    if (ansText) {
      historyPayload.push({ role: 'model', text: ansText });
    }
  }

  // 3. Background Prefetch Turn 2 AI Response
  let followUpAiResult = null;
  try {
    followUpAiResult = await fetchAiData(cleanQ, historyPayload);
  } catch (err) {
    console.warn('Background prefetch failed, will fallback in chat:', err);
  }

  // 4. Package complete handoff data with both turns
  const handoffData = {
    initialQuery: currentLoadedQuery || 'ค้นหา',
    initialAnswer: currentLoadedAiData || null,
    followUpQuery: cleanQ,
    followUpAnswer: followUpAiResult || null,
    timestamp: Date.now()
  };

  try {
    sessionStorage.setItem('udo_ai_chat_handoff', JSON.stringify(handoffData));
  } catch (e) {
    console.warn('Failed to save handoff data to sessionStorage:', e);
  }

  // 5. Smooth page fade out and seamless transition to chat
  document.body.classList.add('page-fade-out');

  setTimeout(() => {
    window.location.href = `/chat.html?handoff=true`;
  }, 220);
}

export async function handleFollowUpSubmit(userQuery) {
  triggerHandoffToChat(userQuery);
}

/**
 * Initialize Collapsible Overview & Expand Toggle
 */
export function initCollapsibleOverview() {
  const collapsible = document.getElementById('ai-overview-collapsible');
  const fadeMask = document.getElementById('ai-overview-fade-mask');
  const toggleBtn = document.getElementById('btnToggleAiExpand');
  const expandBtnText = document.getElementById('aiExpandBtnText');
  const expandIcon = document.getElementById('aiExpandIcon');
  const floatingInput = document.getElementById('aiFloatingInput');

  if (!collapsible || !toggleBtn) return;

  let isExpanded = false;

  const setExpanded = (expanded) => {
    isExpanded = expanded;
    if (isExpanded) {
      collapsible.style.maxHeight = `${collapsible.scrollHeight + 60}px`;
      if (fadeMask) {
        fadeMask.classList.add('opacity-0', 'pointer-events-none');
      }
      if (expandBtnText) expandBtnText.textContent = 'ย่อเนื้อหา';
      if (expandIcon) expandIcon.classList.add('rotate-180');
    } else {
      collapsible.style.maxHeight = '260px';
      if (fadeMask) {
        fadeMask.classList.remove('opacity-0', 'pointer-events-none');
      }
      if (expandBtnText) expandBtnText.textContent = 'แสดงเพิ่มเติม';
      if (expandIcon) expandIcon.classList.remove('rotate-180');

      const overviewEl = document.getElementById('udo-ai-overview-wrapper');
      if (overviewEl) {
        overviewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  toggleBtn.onclick = (e) => {
    e.preventDefault();
    setExpanded(!isExpanded);
  };

  // If user focuses on question input, expand view smoothly
  if (floatingInput) {
    floatingInput.addEventListener('focus', () => {
      if (!isExpanded) {
        setExpanded(true);
      }
    });
  }
}

/**
 * Dynamic Asynchronous Controller (Entry Point)
 */
export async function loadAndRenderAiOverview(container, query = 'ลวดเชื่อมมิก') {
  if (!container) return null;

  currentLoadedQuery = query;
  turnCounter = 1;

  // 1. Render Google AI Skeleton immediately
  container.innerHTML = createAiOverviewSkeletonHTML(query);
  container.classList.remove('hidden');
  initAiOverviewInteractions();

  // 2. Fetch Initial Response
  const aiData = await fetchAiData(query);
  currentLoadedAiData = aiData || getCuratedFallbackData(query);

  // 3. Hydrate dynamic result
  container.innerHTML = createAiOverviewDynamicHTML(currentLoadedAiData);
  initAiOverviewInteractions();
  initCollapsibleOverview();
  return currentLoadedAiData;
}

/**
 * Bind citation card and product scroll events
 */
export function bindCitationCardEvents() {
  const scrollToProducts = (brandFilter) => {
    const gridEl = document.getElementById('category-product-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (brandFilter) {
        const cards = gridEl.querySelectorAll('[data-product-id]');
        cards.forEach(card => {
          if (card.textContent.toLowerCase().includes(brandFilter.toLowerCase())) {
            card.classList.add('ring-2', 'ring-[#90DE3C]', 'transition-all');
            setTimeout(() => {
              card.classList.remove('ring-2', 'ring-[#90DE3C]');
            }, 2500);
          }
        });
      }
    }
  };

  document.querySelectorAll('.udo-citation-pill').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const brand = btn.getAttribute('data-target-brand');
        scrollToProducts(brand);
      });
    }
  });

  document.querySelectorAll('.udo-citation-card').forEach(card => {
    if (!card.dataset.bound) {
      card.dataset.bound = 'true';
      card.addEventListener('click', () => {
        const brand = card.getAttribute('data-brand');
        scrollToProducts(brand);
      });
    }
  });

  const btnShowAllSources = document.getElementById('btnShowAllSources');
  if (btnShowAllSources && !btnShowAllSources.dataset.bound) {
    btnShowAllSources.dataset.bound = 'true';
    btnShowAllSources.addEventListener('click', () => {
      scrollToProducts();
    });
  }
}

/**
 * Initialize interactions and ephemeral glow fade-out
 */
export function initAiOverviewInteractions() {
  // 1. Google-style swift green border beam
  const beam = document.getElementById('ai-input-beam-glow');
  if (beam) {
    setTimeout(() => {
      beam.style.opacity = '0';
      setTimeout(() => {
        beam.remove();
      }, 400);
    }, 850);
  }

  // 2. Follow-up bullets: click to continue in-place conversation
  document.querySelectorAll('.ai-followup-bullet').forEach(bullet => {
    if (!bullet.dataset.bound) {
      bullet.dataset.bound = 'true';
      bullet.addEventListener('click', (e) => {
        e.preventDefault();
        const q = bullet.getAttribute('data-query');
        if (q) {
          handleFollowUpSubmit(q);
        }
      });
    }
  });

  // 3. Floating search form & dynamic green submit button
  const floatingForm = document.getElementById('aiFloatingForm');
  const floatingInput = document.getElementById('aiFloatingInput');
  const submitBtn = document.getElementById('btnAiSubmit');
  const micBtn = document.getElementById('btnAiMic');

  function adjustFloatingTextareaHeight() {
    if (!floatingInput || !floatingForm) return;
    floatingInput.style.height = 'auto';
    const scrollH = floatingInput.scrollHeight;
    const hasNewline = floatingInput.value.includes('\n');
    const isMulti = (hasNewline || scrollH > 34) && floatingInput.value.trim().length > 0;

    if (isMulti) {
      floatingForm.classList.add('is-multiline');
      const targetH = Math.min(scrollH, 180);
      floatingInput.style.height = `${targetH}px`;
      floatingInput.style.overflowY = scrollH > 180 ? 'auto' : 'hidden';
    } else {
      floatingForm.classList.remove('is-multiline');
      floatingInput.style.height = '28px';
      floatingInput.style.overflowY = 'hidden';
    }
  }

  if (floatingInput) {
    floatingInput.addEventListener('input', () => {
      adjustFloatingTextareaHeight();
      if (floatingInput.value.trim().length > 0) {
        if (submitBtn) {
          submitBtn.classList.remove('hidden');
          submitBtn.classList.add('flex');
        }
        if (micBtn) micBtn.classList.add('hidden');
      } else {
        if (submitBtn) {
          submitBtn.classList.add('hidden');
          submitBtn.classList.remove('flex');
        }
        if (micBtn) micBtn.classList.remove('hidden');
      }
    });

    floatingInput.addEventListener('keydown', (e) => {
      // Cmd + Enter (Mac) or Ctrl + Enter: Insert newline and expand
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        const start = floatingInput.selectionStart;
        const end = floatingInput.selectionEnd;
        floatingInput.value = floatingInput.value.substring(0, start) + '\n' + floatingInput.value.substring(end);
        floatingInput.selectionStart = floatingInput.selectionEnd = start + 1;
        adjustFloatingTextareaHeight();
        floatingInput.dispatchEvent(new Event('input'));
        return;
      }

      // Shift + Enter: inserts newline naturally in textarea, adjust height on next tick
      if (e.key === 'Enter' && e.shiftKey) {
        setTimeout(adjustFloatingTextareaHeight, 0);
        return;
      }

      // Enter alone (without Shift, Cmd, Ctrl, Alt): Submit message
      if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const val = floatingInput.value.trim();
        if (val.length > 0) {
          handleFollowUpSubmit(val);
        }
      }
    });
  }

  if (floatingForm && floatingInput) {
    floatingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = floatingInput.value.trim();
      if (val.length > 0) {
        handleFollowUpSubmit(val);
      }
    });
  }

  if (submitBtn && floatingInput) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = floatingInput.value.trim();
      if (val.length > 0) {
        handleFollowUpSubmit(val);
      }
    });
  }

  // 4. Citation pills & cards click
  bindCitationCardEvents();

  // 5. Copy button (1:1 with chat.html)
  document.querySelectorAll('.btn-action-copy').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const parent = btn.closest('.ai-turn-body') || btn.closest('.ai-markdown-content') || btn.closest('#udo-ai-overview-wrapper');
        const textToCopy = parent ? parent.innerText : '';
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            alert('คัดลอกเนื้อหาเรียบร้อยแล้ว');
          }).catch(() => {});
        }
      });
    }
  });

  // 6. Thumbs up / down feedback across all turns (1:1 with chat.html)
  document.querySelectorAll('.btn-action-like, .btnAiLike').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        btn.classList.toggle('text-emerald-600');
        btn.classList.toggle('bg-emerald-50');
      });
    }
  });

  document.querySelectorAll('.btn-action-dislike, .btnAiDislike').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        btn.classList.toggle('text-red-600');
        btn.classList.toggle('bg-red-50');
      });
    }
  });

  // 7. Share Button (1:1 with chat.html)
  document.querySelectorAll('.btn-action-share, .btnAiShare').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('คัดลอกลิงก์ผลการค้นหา AI เรียบร้อยแล้ว');
        }).catch(() => {});
      });
    }
  });

  // 8. 3-dots More Options button (1:1 with chat.html)
  document.querySelectorAll('.btn-action-more, .btnAiMore').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        alert('ขอบคุณสำหรับข้อเสนอแนะ ระบบจะนำข้อมูลไปพัฒนาคุณภาพของคำตอบ AI ต่อไป');
      });
    }
  });
}
