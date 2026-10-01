/**
 * UDO AI Chat Workspace Controller (chat.js)
 * 1:1 match with Google Search AI / Gemini Canvas UI
 * 
 * Features:
 * - Left Sidebar: Original design, colors (#f8f9fa), hover (#e8eaed / #dfe1e5)
 * - Main Chat Area: 2-Column Layout
 *   - Left Sub-column: User Bubble (positioned within left column) + AI Answer Document (no bubble)
 *   - Right Sub-column: Dedicated Sticky Citation Card for each chat turn
 * - Video Tutorial Cards Grid under AI Answer
 * - Pinned bottom input bar with Plus (+) button on left and Green submit button on right
 * - LocalStorage thread management
 * - Zero emojis in source code, comments, or output.
 */

import { fetchAiData, getCuratedFallbackData } from './ai_overview.js';
import { renderMarkdownToHTML, extractMetadata } from './markdown_parser.js';
import { generateCardHTML } from './components/ProductCard.js';
import { mockDatabase, fetchLiveDatabase } from './mock_database.js';
import { UDO_ARTICLES, findArticle } from './udo_articles.js';

const STORAGE_THREADS_KEY = 'udo_ai_chat_threads';
const STORAGE_CURRENT_THREAD_KEY = 'udo_ai_current_thread_id';
const STORAGE_SIDEBAR_COLLAPSED_KEY = 'udo_ai_sidebar_collapsed';

let threads = [];
let currentThreadId = null;
let isGenerating = false;
let activeMenuThreadId = null;
let renamingThreadId = null;

// HTML escaping
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
 * Format timestamp e.g. "21:23"
 */
function formatTime(timestamp = Date.now()) {
  const d = new Date(timestamp);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Load threads from localStorage
 */
function loadThreadsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_THREADS_KEY);
    threads = raw ? JSON.parse(raw) : [];
    // Ensure every thread has updatedAt and translate legacy 'New thread' to 'แชทใหม่'
    threads.forEach(t => {
      if (t.title === 'New thread') {
        t.title = 'แชทใหม่';
      }
      if (!t.updatedAt) {
        const lastMsg = t.messages && t.messages.length > 0 ? t.messages[t.messages.length - 1] : null;
        t.updatedAt = (lastMsg && lastMsg.timestamp) || t.createdAt || Date.now();
      }
    });
  } catch (e) {
    threads = [];
  }

  try {
    currentThreadId = localStorage.getItem(STORAGE_CURRENT_THREAD_KEY) || (threads[0] ? threads[0].id : null);
  } catch (e) {
    currentThreadId = null;
  }
}

/**
 * Save threads to localStorage
 */
function saveThreadsToStorage() {
  try {
    localStorage.setItem(STORAGE_THREADS_KEY, JSON.stringify(threads));
    if (currentThreadId) {
      localStorage.setItem(STORAGE_CURRENT_THREAD_KEY, currentThreadId);
    } else {
      localStorage.removeItem(STORAGE_CURRENT_THREAD_KEY);
    }
  } catch (e) {
    console.warn('Failed to save chat threads to localStorage:', e);
  }
}

/**
 * Get active thread object
 */
function getCurrentThread() {
  return threads.find(t => t.id === currentThreadId) || null;
}

/**
 * Create a new thread and set as active
 */
function createNewThread(initialTitle = 'แชทใหม่') {
  document.documentElement.classList.remove('is-chat-handoff');
  const newId = 'thread_' + Date.now();
  const thread = {
    id: newId,
    title: initialTitle,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: []
  };
  threads.unshift(thread);
  currentThreadId = newId;
  saveThreadsToStorage();
  renderSidebarRecentThreads();
  renderChatMessages();
  return thread;
}

/**
 * Delete a thread
 */
function deleteThread(id, event) {
  if (event) event.stopPropagation();
  threads = threads.filter(t => t.id !== id);
  if (currentThreadId === id) {
    currentThreadId = threads.length > 0 ? threads[0].id : null;
  }
  saveThreadsToStorage();
  renderSidebarRecentThreads();
  renderChatMessages();
}

/**
 * Render Left Sidebar Recent Threads List with 3-Dots Menu & Inline Rename
 */
function renderSidebarRecentThreads(filterQuery = '') {
  const listEl = document.getElementById('recentThreadsList');
  if (!listEl) return;

  const q = (filterQuery || '').trim().toLowerCase();
  let filtered = q ? threads.filter(t => (t.title || '').toLowerCase().includes(q)) : [...threads];

  // Pinned items stay on top, then sorted by updatedAt descending (latest activity first)
  filtered.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    const timeA = a.updatedAt || a.createdAt || 0;
    const timeB = b.updatedAt || b.createdAt || 0;
    return timeB - timeA;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="px-3 py-4 text-center text-[12.5px] text-gray-400">
        ${q ? 'ไม่พบบทสนทนาที่ค้นหา' : 'ยังไม่มีประวัติการสนทนา'}
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(t => {
    const isActive = t.id === currentThreadId;
    const isMenuOpen = t.id === activeMenuThreadId;
    const isRenaming = t.id === renamingThreadId;

    if (isRenaming) {
      return `
        <div class="relative flex items-center rounded-full bg-white border border-[#e7151a] shadow-xs px-2.5 py-1 my-0.5 transition-all">
          <form class="form-rename-thread flex items-center w-full gap-1.5" data-rename-id="${t.id}">
            <input 
              type="text" 
              class="input-rename-thread flex-1 min-w-0 px-1.5 py-0.5 text-[13px] bg-transparent outline-none text-gray-900 font-medium" 
              value="${escapeHtml(t.title)}"
              data-initial-val="${escapeHtml(t.title)}"
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
      `;
    }

    return `
      <div class="group relative flex items-center justify-between rounded-full transition-all ${isActive ? 'bg-[#e8eaed] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-200/60 font-normal'}">
        <button type="button" class="btn-thread-select flex-1 text-left px-3.5 py-2 text-[13.5px] truncate cursor-pointer select-none flex items-center gap-1.5" data-thread-id="${t.id}" title="${escapeHtml(t.title)}">
          ${t.pinned ? `
            <svg class="w-3 h-3 text-gray-500 shrink-0 rotate-45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
            </svg>
          ` : ''}
          <span class="truncate">${escapeHtml(t.title)}</span>
        </button>

        <!-- Vertical 3-Dots Button: Visible only on hover, or when menu is open -->
        <button type="button" class="btn-thread-menu ${isMenuOpen ? 'flex' : 'hidden group-hover:flex'} items-center justify-center w-7 h-7 mr-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-300/60 rounded-full transition-colors cursor-pointer shrink-0" data-menu-id="${t.id}" title="ตัวเลือกเพิ่มเติม">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.6"></circle>
            <circle cx="12" cy="12" r="1.6"></circle>
            <circle cx="12" cy="19" r="1.6"></circle>
          </svg>
        </button>

        <!-- Dropdown Menu: Red on hover as requested -->
        ${isMenuOpen ? `
          <div class="thread-dropdown-menu absolute right-1 top-full mt-1 w-44 bg-white rounded-2xl shadow-xl border border-gray-200/90 p-1.5 z-50 flex flex-col text-[13px] select-none">
            
            <!-- 1. ปักหมุด -->
            <button type="button" class="btn-menu-pin group/item flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[#e7151a] text-left cursor-pointer transition-colors" data-pin-id="${t.id}">
              <svg class="w-4 h-4 text-gray-500 group-hover/item:text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
              <span>${t.pinned ? 'ถอนหมุด' : 'ปักหมุด'}</span>
            </button>

            <!-- 2. เปลี่ยนชื่อ -->
            <button type="button" class="btn-menu-rename group/item flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[#e7151a] text-left cursor-pointer transition-colors" data-rename-id="${t.id}">
              <svg class="w-4 h-4 text-gray-500 group-hover/item:text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
              <span>เปลี่ยนชื่อ</span>
            </button>

            <!-- 3. ลบ -->
            <button type="button" class="btn-menu-delete group/item flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[#e7151a] text-left cursor-pointer transition-colors" data-delete-id="${t.id}">
              <svg class="w-4 h-4 text-gray-500 group-hover/item:text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>ลบ</span>
            </button>

          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  // 1. Bind thread selection
  listEl.querySelectorAll('.btn-thread-select').forEach(btn => {
    btn.addEventListener('click', () => {
      const tid = btn.getAttribute('data-thread-id');
      if (tid && tid !== currentThreadId) {
        currentThreadId = tid;
        activeMenuThreadId = null;
        renamingThreadId = null;
        saveThreadsToStorage();
        renderSidebarRecentThreads(filterQuery);
        renderChatMessages();
      }
    });
  });

  // 2. Bind 3-dots menu toggle
  listEl.querySelectorAll('.btn-thread-menu').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tid = btn.getAttribute('data-menu-id');
      activeMenuThreadId = activeMenuThreadId === tid ? null : tid;
      renderSidebarRecentThreads(filterQuery);
    });
  });

  // 3. Bind Pin toggle
  listEl.querySelectorAll('.btn-menu-pin').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tid = btn.getAttribute('data-pin-id');
      const target = threads.find(t => t.id === tid);
      if (target) {
        target.pinned = !target.pinned;
        saveThreadsToStorage();
      }
      activeMenuThreadId = null;
      renderSidebarRecentThreads(filterQuery);
    });
  });

  // 4. Bind Rename trigger
  listEl.querySelectorAll('.btn-menu-rename').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tid = btn.getAttribute('data-rename-id');
      activeMenuThreadId = null;
      renamingThreadId = tid;
      renderSidebarRecentThreads(filterQuery);
      const renameInput = listEl.querySelector(`.form-rename-thread[data-rename-id="${tid}"] input`);
      if (renameInput) {
        renameInput.focus();
        renameInput.select();
      }
    });
  });

  // 5. Bind Delete trigger
  listEl.querySelectorAll('.btn-menu-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tid = btn.getAttribute('data-delete-id');
      activeMenuThreadId = null;
      deleteThread(tid, e);
    });
  });

  // 6. Bind Rename form submit
  listEl.querySelectorAll('.form-rename-thread').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const tid = form.getAttribute('data-rename-id');
      const inputEl = form.querySelector('input');
      const newTitle = (inputEl ? inputEl.value : '').trim();
      if (tid && newTitle) {
        const target = threads.find(t => t.id === tid);
        if (target) {
          target.title = newTitle;
          saveThreadsToStorage();
        }
      }
      renamingThreadId = null;
      renderSidebarRecentThreads(filterQuery);
    });
  });

  // 7. Bind Rename form cancel
  listEl.querySelectorAll('.btn-cancel-rename').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      renamingThreadId = null;
      renderSidebarRecentThreads(filterQuery);
    });
  });

  // 8. Bind Rename Escape key
  listEl.querySelectorAll('.input-rename-thread').forEach(inp => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        renamingThreadId = null;
        renderSidebarRecentThreads(filterQuery);
      }
    });
  });
}

/**
 * Resolve matched products from mockDatabase (1,307 authentic items)
 */
function getMatchedProductsList(meta = {}, data = {}) {
  const tokens = meta.matched_products || data.matched_products || [];
  if (!Array.isArray(tokens) || tokens.length === 0) return [];
  
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
  return matched;
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
 * Open Article Quick Preview Modal
 */
function openArticleModal(articleId) {
  const modal = document.getElementById('citationPreviewModal');
  const modalCard = document.getElementById('citationModalCard');
  const badgeEl = document.getElementById('citationModalBadge');
  const bodyEl = document.getElementById('citationModalBody');
  if (!modal || !bodyEl) return;

  const art = findArticle(articleId) || UDO_ARTICLES[0];
  if (!art) return;

  if (badgeEl) {
    badgeEl.innerHTML = `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-red-50 text-[#e7151a]">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"/></svg>
        <span>${escapeHtml(art.category || 'UDO Engineering Knowledge')}</span>
      </span>
      <span class="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">${escapeHtml(art.badge || 'Verified')}</span>
    `;
  }

  // Format content paragraphs
  const rawContent = art.content || art.summary || '';
  const paragraphs = rawContent.split('\n\n').map(p => {
    return `<p class="text-[#212121] text-[15px] leading-relaxed">${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`;
  }).join('');

  bodyEl.innerHTML = `
    <div class="space-y-4 text-left">
      <!-- Title -->
      <h3 class="text-[20px] font-bold text-[#160808] leading-snug">
        ${escapeHtml(art.title)}
      </h3>

      <!-- Hero Banner / Image -->
      ${art.image ? `
        <div class="w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
          <img src="${art.image}" alt="Article Hero" class="w-full h-full object-cover" onerror="this.src='/images/logos/logo.svg'" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white text-[12px] font-medium flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            <span>แหล่งข้อมูลทางการ: ${escapeHtml(art.source || 'UDO Engineering Knowledge')}</span>
          </div>
        </div>
      ` : ''}

      <!-- Key Summary Box -->
      <div class="bg-red-50/60 border border-red-100 p-4 rounded-2xl">
        <h4 class="text-[13px] font-bold text-[#c5161b] mb-1">สรุปประเด็นสำคัญ (Key Summary):</h4>
        <p class="text-[14px] text-[#252525] leading-relaxed">${escapeHtml(art.summary || '')}</p>
      </div>

      <!-- Main Content -->
      <div class="space-y-3 pt-2">
        ${paragraphs}
      </div>

      <!-- Target Problems / Symptoms solved -->
      ${art.target_problems && art.target_problems.length > 0 ? `
        <div class="pt-3 border-t border-gray-100">
          <h5 class="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">อาการและปัญหาหน้างานที่เกี่ยวข้อง:</h5>
          <div class="flex flex-wrap gap-1.5">
            ${art.target_problems.map(tp => `<span class="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11.5px] rounded-lg">${escapeHtml(tp)}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Full Article Reader Link -->
      ${art.slug || art.id ? `
        <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span class="text-xs text-gray-400">บทความวิศวกรรมฉบับเต็ม</span>
          <a href="/article.html?slug=${encodeURIComponent(art.slug || art.id)}" target="_blank" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#160808] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-2xs">
            <span>อ่านฉบับเต็ม</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      ` : ''}
    </div>
  `;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  if (modalCard) {
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
  }
}

/**
 * Close Article Quick Preview Modal
 */
function closeCitationModal() {
  const modal = document.getElementById('citationPreviewModal');
  const modalCard = document.getElementById('citationModalCard');
  if (!modal) return;
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
  if (modalCard) {
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
  }
}

/**
 * Initialize Modal Event Listeners
 */
function initCitationModal() {
  const modal = document.getElementById('citationPreviewModal');
  const btnClose = document.getElementById('btnCloseCitationModal');
  const btnFooterClose = document.getElementById('btnFooterCloseModal');
  
  if (btnClose) btnClose.addEventListener('click', closeCitationModal);
  if (btnFooterClose) btnFooterClose.addEventListener('click', closeCitationModal);
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCitationModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCitationModal();
  });
}

/**
 * Render Right Sticky Citations Card for an individual turn
 * Shows dual-zone provenance:
 * - Zone 1: Authentic UDO Engineering Knowledge Articles with thumbnails & quick modal
 * - Zone 2: Referenced Catalog Products with images, SKU, brand & links
 */
/**
 * Render Right Sticky Citations Card for an individual turn
 * 1:1 match with Google Search AI UI (media_1790623849586.png)
 * - Single outer card, containing exactly 2 items in default state:
 *   1. บทความวิศวกรรม (X) with authentic UDO knowledge title, snippet, thumbnail & quick modal
 *   2. แคตตาล็อกสินค้า (Y) with top 2 matched products as clickable links, spec note, & product image
 * - Clean full-width pill button at bottom: "แสดงทั้งหมด"
 * - Expands to reveal full list (capped to safety max 6 items) and toggles to "ย่อลง"
 */
function renderTurnCitationsCardHTML(citations = [], meta = {}) {
  const matchedProducts = getMatchedProductsList(meta, meta);
  const matchedArticles = getMatchedArticlesList(citations, meta);

  const articlesCount = matchedArticles.length;
  const productsCount = matchedProducts.length;
  const hasMore = (articlesCount > 1 || productsCount > 2);

  // Item 1: Authentic UDO Article
  let articleCardHTML = '';
  if (articlesCount > 0) {
    const art = matchedArticles[0];
    articleCardHTML = `
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300" data-citation-card-index="1">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-[#4a4a4a] truncate">บทความวิศวกรรม (${articlesCount})</span>
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
            <h4 class="text-[13.5px] font-semibold text-[#160808] group-hover:text-[#e7151a] leading-snug line-clamp-2 transition-colors cursor-pointer btn-open-article-modal" data-article-id="${art.id}" title="${escapeHtml(art.title)}">
              ${escapeHtml(art.title)}
            </h4>
            <p class="text-[12px] text-[#4a4a4a] line-clamp-2 mt-1 leading-relaxed">
              ${escapeHtml(art.summary || art.desc || 'คู่มือและคำแนะนำทางวิศวกรรมมาตรฐานจากฝ่ายเทคนิค UDO')}
            </p>
          </div>
          ${art.image ? `
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer btn-open-article-modal" data-article-id="${art.id}">
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
      return `<a href="/product.html?id=${p.id}" target="_blank" rel="noopener noreferrer" class="text-[#160808] hover:text-[#e7151a] hover:underline font-semibold inline-block">${escapeHtml(p.brand || '')} ${escapeHtml(p.name || '')}</a>`;
    }).join('<span class="text-gray-400 font-normal">, </span>');
    const moreText = productsCount > 2 ? `<span class="text-gray-500 font-normal"> และอีก ${productsCount - 2} รายการ</span>` : '';

    const prodSnippet = primaryProd.category 
      ? `สเปกทางการ ${escapeHtml(primaryProd.category)} พร้อมข้อมูลมาตรฐานและสต็อกส่งตรงจาก UDO`
      : 'สเปกทางการและสต็อกพร้อมส่งตรงจากคลังสินค้า UDO Trading';

    catalogCardHTML = `
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300" data-citation-card-index="2">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-[#4a4a4a] truncate">แคตตาล็อกสินค้า (${productsCount})</span>
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
              ${prodLinks}${moreText}
            </div>
            <p class="text-[12px] text-[#4a4a4a] line-clamp-2 mt-1 leading-relaxed">
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

  // Expanded Articles (placed directly under Article 1 at the top)
  let expandedArticlesHTML = '';
  if (articlesCount > 1) {
    const extraArticles = matchedArticles.slice(1, 3);
    const extraArtItems = extraArticles.map(art => `
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-200 border-t border-gray-100/90 pt-2.5 mt-2">
        <div class="flex items-center gap-1.5 mb-1">
          <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
          <span class="text-[12px] font-medium text-[#4a4a4a]">บทความวิศวกรรม</span>
        </div>
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0 text-left">
            <h5 class="text-[13.5px] font-semibold text-[#160808] group-hover:text-[#e7151a] leading-snug line-clamp-2 transition-colors cursor-pointer btn-open-article-modal" data-article-id="${art.id}">
              ${escapeHtml(art.title)}
            </h5>
            <p class="text-[12px] text-[#4a4a4a] line-clamp-2 mt-0.5 leading-relaxed">
              ${escapeHtml(art.summary || art.desc || '')}
            </p>
          </div>
          ${art.image ? `
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer btn-open-article-modal" data-article-id="${art.id}">
              <img src="${art.image}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    expandedArticlesHTML = `
      <div class="citations-expanded-group citations-expanded-articles hidden">
        ${extraArtItems}
      </div>
    `;
  }

  // Expanded Catalog Products (placed directly under Catalog 1 at the bottom)
  let expandedProductsHTML = '';
  if (productsCount > 2) {
    const extraProducts = matchedProducts.slice(2, 6);
    const extraProdItems = extraProducts.map(p => {
      const pImg = (p.images && p.images[0] && (p.images[0].thumb || p.images[0].card)) || '/images/logos/logo.svg';
      return `
        <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-200 border-t border-gray-100/90 pt-2.5 mt-2">
          <div class="flex items-center gap-1.5 mb-1">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-[#4a4a4a]">แคตตาล็อกสินค้า · ${escapeHtml(p.brand || 'UDO')}</span>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0 text-left">
              <a href="/product.html?id=${p.id}" target="_blank" rel="noopener noreferrer" class="text-[13.5px] font-semibold text-[#160808] hover:text-[#e7151a] hover:underline leading-snug line-clamp-2 block">
                ${escapeHtml(p.brand || '')} ${escapeHtml(p.name || '')}
              </a>
              <p class="text-[12px] text-[#4a4a4a] line-clamp-1 mt-0.5 leading-relaxed">
                ${p.sku ? `รหัส: ${escapeHtml(p.sku)} · ` : ''}${escapeHtml(p.category || 'อุปกรณ์ช่าง')}
              </p>
            </div>
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center">
              <img src="${pImg}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          </div>
        </div>
      `;
    }).join('');

    expandedProductsHTML = `
      <div class="citations-expanded-group citations-expanded-products hidden">
        ${extraProdItems}
      </div>
    `;
  }

  // Bottom Pill Button (Show all / Show less matching Google Search AI Mode)
  const toggleBtnHTML = hasMore ? `
    <button type="button" class="btn-toggle-all-citations w-full mt-3 py-2 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-[13px] font-semibold text-center transition-all select-none cursor-pointer flex items-center justify-center gap-1.5">
      <span class="btn-toggle-label font-semibold">แสดงทั้งหมด</span>
      <svg class="w-3.5 h-3.5 transition-transform duration-200 btn-toggle-icon text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
  ` : '';

  return `
    <div class="w-full text-left">
      <!-- Article Section (All articles grouped at the top) -->
      <div class="citations-section-articles">
        ${articleCardHTML}
        ${expandedArticlesHTML}
      </div>

      <!-- Divider between Article Section and Catalog Section -->
      ${articleCardHTML && catalogCardHTML ? '<div class="border-t border-gray-100 my-2.5"></div>' : ''}

      <!-- Catalog Section (All catalog items grouped at the bottom) -->
      <div class="citations-section-products">
        ${catalogCardHTML}
        ${expandedProductsHTML}
      </div>

      <!-- Toggle Button -->
      ${toggleBtnHTML}
    </div>
  `;
}

/**
 * Render Matched UDO Product Cards Grid
 * If matched products exist, renders cards matching the homepage & catalog design 1:1.
 * If NO products matched, returns an empty string (renders NOTHING).
 */
function renderMatchedProductCardsHTML(matchedTokens = [], userQuery = '', relatedCategory = null) {
  const hasTokens = Array.isArray(matchedTokens) && matchedTokens.length > 0;
  if (!hasTokens && !userQuery) {
    return '';
  }

  const matched = [];
  const seenIds = new Set();

  if (hasTokens) {
    matchedTokens.forEach(token => {
      const t = String(token).toLowerCase().trim();
      if (!t) return;
      const found = mockDatabase.find(p => {
        if (seenIds.has(p.id)) return false;
        const pSku = (p.sku || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        const pBrand = (p.brand || '').toLowerCase();
        return pSku.includes(t) || pName.includes(t) || pBrand.includes(t);
      });
      if (found) {
        seenIds.add(found.id);
        matched.push(found);
      }
    });
  }

  // If no exact token found but relatedCategory is available, match products from that category
  if (matched.length === 0 && relatedCategory) {
    const catId = relatedCategory.id;
    const catSlug = relatedCategory.slug || (catId ? `cat-${catId}` : '');
    const catName = (relatedCategory.name || '').toLowerCase();
    const catMatched = mockDatabase.filter(p => {
      if (seenIds.has(p.id)) return false;
      return (p.categories && p.categories.some(c => 
        (catId && (Number(c.id) === Number(catId) || c.url_slug === `cat-${catId}`)) ||
        (catSlug && c.url_slug === catSlug) ||
        (catName && c.name && c.name.toLowerCase().includes(catName))
      ));
    });
    catMatched.slice(0, 6).forEach(p => {
      seenIds.add(p.id);
      matched.push(p);
    });
  }

  // If still no exact match, fallback to query matching
  if (matched.length === 0 && userQuery) {
    const qLower = userQuery.toLowerCase().trim();
    const fallback = mockDatabase.filter(p => {
      if (seenIds.has(p.id)) return false;
      const pName = (p.name || '').toLowerCase();
      const pBrand = (p.brand || '').toLowerCase();
      return pName.includes(qLower) || pBrand.includes(qLower);
    });
    fallback.slice(0, 6).forEach(p => {
      seenIds.add(p.id);
      matched.push(p);
    });
  }

  if (matched.length === 0) {
    return '';
  }

  const initialProducts = matched.slice(0, 3);
  const extraProducts = matched.slice(3, 6);
  const hasExtra = extraProducts.length > 0;

  // Use precise emitted category if available, otherwise search query
  let catalogSearchUrl = userQuery ? `/category.html?q=${encodeURIComponent(userQuery.trim())}` : '/category.html';
  if (relatedCategory && (relatedCategory.id || relatedCategory.slug)) {
    const catParam = relatedCategory.id || relatedCategory.slug;
    catalogSearchUrl = `/category.html?type=category&cat=${encodeURIComponent(catParam)}&q=${encodeURIComponent(userQuery ? userQuery.trim() : '')}`;
  }

  return `
    <div class="matched-products-section mt-8 pt-6 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-[15px] font-semibold text-gray-800 tracking-tight flex items-center gap-2">
          <span>รายการสินค้าและสเปกที่ตรงกัน:</span>
        </h3>
        <a href="${catalogSearchUrl}" class="text-[13px] text-gray-500 hover:text-black font-medium transition-colors">
          ดูในแคตตาล็อกร้านค้า &rarr;
        </a>
      </div>
      
      <!-- Primary 3 Products Grid (Initial View) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${initialProducts.map(p => generateCardHTML(p, true)).join('')}
      </div>

      <!-- Extra Products Grid (Up to 6 total, revealed on click) -->
      ${hasExtra ? `
        <div class="matched-products-extra hidden mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 transition-all">
          ${extraProducts.map(p => generateCardHTML(p, true)).join('')}
        </div>

        <!-- Subtle Pill Toggle for Extra Products -->
        <div class="flex justify-center mt-5">
          <button type="button" class="btn-toggle-matched-products inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200/90 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-[13px] font-medium transition-all shadow-2xs cursor-pointer select-none" data-extra-count="${extraProducts.length}">
            <span class="btn-matched-label">ดูเพิ่มอีก ${extraProducts.length} รายการ</span>
            <svg class="w-3.5 h-3.5 text-gray-500 transition-transform duration-200 btn-matched-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Render LINE Official Contact Card when sales/staff contact intent is detected
 */
function renderLineContactCardHTML(meta = {}, userText = '') {
  const isContactIntent = (meta && meta.intent === 'contact_sales') || 
    /(ติดต่อ|ฝ่ายขาย|เจ้าหน้าที่|ใบเสนอราคา|สั่งซื้อจำนวนมาก|ราคาส่ง|ขอเบอร์|โทร|เซลส์|แอดมิน|พนักงาน)/i.test(userText);

  if (!isContactIntent) {
    return '';
  }

  return `
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
  `;
}

/**
 * Render Assistant Left Document Content
 * Native Markdown Rendering with Phase 1 Dialect Support.
 * Zero emojis, clean typography, responsive tables, callout blocks, and product shelf.
 */
function renderAssistantDocumentHTML(data, userText = '') {
  if (!data) return '';

  let markdownContent = '';
  let meta = data.metadata || {};
  let followUps = data.followUps || meta.followUps || [];
  let matchedTokens = meta.matched_products || data.matched_products || [];

  if (typeof data === 'string') {
    markdownContent = data;
  } else if (data.markdown || data.content) {
    markdownContent = data.markdown || data.content;
  } else if (data.lead || data.sections) {
    // Transform legacy JSON schema into clean, structured Markdown
    const lead = data.lead || {};
    const sections = data.sections || [];
    
    if (lead.keyword || lead.summary) {
      markdownContent += `## ${lead.keyword || ''}\n${lead.summary || ''}\n\n`;
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

    if (!matchedTokens.length && data.citations) {
      matchedTokens = data.citations.map(c => c.brand).filter(Boolean);
    }
  }

  // Parse Markdown to semantic HTML and extract metadata if embedded
  const parsed = renderMarkdownToHTML(markdownContent);
  const renderedHTML = parsed.html;
  if (parsed.metadata) {
    meta = Object.assign({}, meta, parsed.metadata);
    if (parsed.metadata.matched_products) {
      matchedTokens = parsed.metadata.matched_products;
    }
    if (parsed.metadata.followUps) {
      followUps = parsed.metadata.followUps;
    }
  }

  // Action toolbar matching Google Search AI
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
      <button type="button" class="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="เพิ่มเติม">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
    </div>
  `;

  const isOutOfScope = meta.is_out_of_scope === true || 
    (typeof data === 'string' && data.trim() === 'ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้') ||
    (data && data.markdown && data.markdown.trim() === 'ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้');

  const relatedCategory = meta.related_category || (data && data.related_category) || null;

  return `
    <div class="ai-turn-left-document w-full">
      <!-- Main Markdown Content -->
      <div class="ai-markdown-body text-[16px] leading-[1.7] text-[#212121]">
        ${renderedHTML}
      </div>

      <!-- LINE Contact Card (Triggers when sales/staff intent detected and NOT out of scope) -->
      ${!isOutOfScope ? renderLineContactCardHTML(meta, userText) : ''}

      <!-- Matched Product Cards (Rendered ONLY if products match and NOT out of scope) -->
      ${!isOutOfScope ? renderMatchedProductCardsHTML(matchedTokens, userText, relatedCategory) : ''}

      <!-- Toolbar -->
      ${toolbarHTML}
    </div>
  `;
}

/**
 * Render Complete Conversation Thread
 * Groups each (user message + assistant message) into a modular Turn Block!
 * User Bubble stays strictly inside the Left Column, aligned with the left column's right edge!
 * Right Column has its own dedicated sticky citation card!
 */
function renderChatMessages(options = {}) {
  const container = document.getElementById('chatMessagesContainer');
  const welcomeEl = document.getElementById('welcomeContainer');
  const bottomBarContainer = document.getElementById('chatBottomBarContainer');
  const landingGreeting = document.getElementById('chatLandingGreeting');
  const ambientAura = document.getElementById('chatAmbientAura');
  const bottomBarRow = document.getElementById('chatBottomBarRow');
  const bottomBarSpacer = document.getElementById('chatBottomBarRightSpacer');
  const bottomBarDisclaimer = document.getElementById('chatBottomBarDisclaimer');
  const glassFrame = document.getElementById('chatGlassFrame');
  const beamContainer = document.getElementById('chatBeamContainer');
  const glassBezel = document.getElementById('chatGlassBezel');
  const chatForm = document.getElementById('chatForm');
  if (!container) return;

  const current = getCurrentThread();

  if (!current || !current.messages || current.messages.length === 0) {
    container.innerHTML = '';
    if (welcomeEl) welcomeEl.classList.add('hidden');

    // Remove anti-FOUC handoff override so landing canvas and orbiting beam appear
    document.documentElement.classList.remove('is-chat-handoff');

    const btnScroll = document.getElementById('btnScrollToBottom');
    if (btnScroll) btnScroll.classList.add('hidden');

    // New Chat Landing Mode: Centered in canvas with Greeting, Glass Frame & Laser Beam
    if (bottomBarContainer) {
      bottomBarContainer.className = 'absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pb-24 sm:pb-32 md:pb-36 z-20 pointer-events-none transition-all duration-300';
    }
    if (landingGreeting) landingGreeting.classList.remove('hidden');
    if (ambientAura) ambientAura.classList.remove('hidden');

    if (glassFrame) {
      glassFrame.className = 'landing-glass-frame relative p-[6px] sm:p-[7px] rounded-[36px] sm:rounded-[38px] transition-all duration-300';
    }
    if (beamContainer) beamContainer.classList.remove('hidden');
    if (glassBezel) glassBezel.classList.remove('hidden');

    if (chatForm) {
      const isMulti = chatForm.classList.contains('is-multiline');
      chatForm.className = `chat-form-grid relative z-10 w-full bg-white rounded-[28px] sm:rounded-[30px] border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] px-4 sm:px-5 py-2.5 sm:py-3 transition-all ${isMulti ? 'is-multiline' : ''}`;
    }

    if (bottomBarRow) {
      bottomBarRow.className = 'max-w-[760px] mx-auto flex flex-col items-center w-full pointer-events-auto transition-all duration-300 relative';
    }
    if (bottomBarSpacer) {
      bottomBarSpacer.classList.add('hidden');
      bottomBarSpacer.classList.remove('lg:block');
    }
    // Disclaimer hidden on landing screen as requested
    if (bottomBarDisclaimer) {
      bottomBarDisclaimer.classList.add('hidden');
    }
    return;
  }

  if (welcomeEl) welcomeEl.classList.add('hidden');

  // Active Conversation Mode: Docked at bottom, aligned with chat column
  if (bottomBarContainer) {
    bottomBarContainer.className = 'absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-8 lg:px-12 pb-5 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-20 transition-all duration-300';
  }
  if (landingGreeting) landingGreeting.classList.add('hidden');
  if (ambientAura) ambientAura.classList.add('hidden');

  if (glassFrame) {
    glassFrame.className = 'w-full transition-all duration-300';
  }
  if (beamContainer) beamContainer.classList.add('hidden');
  if (glassBezel) glassBezel.classList.add('hidden');

  if (chatForm) {
    const isMulti = chatForm.classList.contains('is-multiline');
    chatForm.className = `chat-form-grid w-full bg-white rounded-[28px] border border-gray-300/80 hover:border-gray-400/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] px-4 sm:px-5 py-2.5 sm:py-3 transition-all ${isMulti ? 'is-multiline' : ''}`;
  }

  if (bottomBarRow) {
    bottomBarRow.className = 'max-w-[1240px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20 w-full pointer-events-none transition-all duration-300';
  }
  if (bottomBarSpacer) {
    bottomBarSpacer.classList.remove('hidden');
    bottomBarSpacer.classList.add('hidden', 'lg:block');
  }
  // Disclaimer visible during active conversation
  if (bottomBarDisclaimer) {
    bottomBarDisclaimer.classList.remove('hidden');
    bottomBarDisclaimer.className = 'text-center text-[11.5px] text-gray-400 mt-2';
  }

  // Group messages into turns [ { userMsg, assistantMsg } ]
  const turns = [];
  let currentTurn = null;

  current.messages.forEach(msg => {
    if (msg.role === 'user') {
      currentTurn = { userMsg: msg, assistantMsg: null };
      turns.push(currentTurn);
    } else if (msg.role === 'assistant' && currentTurn) {
      currentTurn.assistantMsg = msg;
    }
  });

  container.innerHTML = turns.map((turn, turnIdx) => {
    const userText = turn.userMsg ? turn.userMsg.text : '';
    const userTime = turn.userMsg ? formatTime(turn.userMsg.timestamp) : '21:23';
    const assistantData = turn.assistantMsg ? turn.assistantMsg.data : null;

    return `
      <section class="ai-turn-section w-full" data-turn-index="${turnIdx + 1}">
        
        <!-- 2-Column Responsive Layout: Left Chat Stream (User Bubble + AI Doc) + Right Sticky Card -->
        <div class="ai-turn-content-row flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20 w-full">
          
          <!-- Left Column (ฝั่งซ้าย: User Bubble + AI Document) -->
          <div class="flex-1 min-w-0 w-full flex flex-col">
            
            <!-- User Question Bubble: Stays strictly within the Left Column, max-width bounded as in reference image -->
            <div class="flex flex-col items-end self-end max-w-[85%] sm:max-w-[560px] md:max-w-[620px] mb-5 w-fit">
              <div class="ai-turn-user-bubble relative bg-[#F3F3F6] text-[#160808] rounded-[22px] px-5 py-3 text-[16px] font-medium leading-relaxed shadow-xs transition-all w-fit">
                <!-- User text with preserved line breaks (pre-wrap) - Keep on a single line to prevent whitespace bugs -->
                <div class="ai-turn-user-text whitespace-pre-wrap break-words font-medium text-[#160808]">${escapeHtml(userText)}</div>

                <!-- Down-arrow expand button: ONLY visible when content exceeds 4 lines -->
                <div class="ai-turn-user-toggle-row hidden justify-end mt-1.5 -mb-0.5">
                  <button type="button" class="btn-bubble-toggle w-6 h-6 rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all cursor-pointer focus:outline-none" title="ดูข้อความทั้งหมด">
                    <svg class="w-3.5 h-3.5 transition-transform duration-200 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              </div>
              <span class="text-[11.5px] text-gray-400 mt-1 mr-2 select-none">${userTime}</span>
            </div>

            <!-- AI Answer Document (No bubble, clean document layout) -->
            ${assistantData ? `
              <div class="w-full text-left">
                ${renderAssistantDocumentHTML(assistantData, userText)}
              </div>
            ` : ''}

          </div>

          <!-- Right Column (ฝั่งขวา: การ์ด Sticky แหล่งอ้างอิงประจำเทิร์นนี้ หรือ Spacer รักษาสมดุล) -->
          ${assistantData ? `
            <div class="w-full lg:w-[330px] xl:w-[360px] shrink-0 lg:sticky lg:top-[85px] self-start transition-all duration-300">
              <div class="citation-card-wrapper bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-3.5 sm:p-4">
                ${renderTurnCitationsCardHTML(assistantData.citations, assistantData.metadata || assistantData)}
              </div>
            </div>
          ` : `
            <div class="hidden lg:block w-[330px] xl:w-[360px] shrink-0 pointer-events-none"></div>
          `}

        </div>

      </section>
    `;
  }).join('');

  bindChatMessageEvents();
  if (!options.skipScroll) {
    scrollToBottom();
  }
}

/**
 * Bind interactive events in rendered messages
 */
function bindChatMessageEvents() {
  // Follow-up question click
  document.querySelectorAll('.btn-chat-followup').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      if (q) {
        handleUserSubmit(q);
      }
    });
  });

  // Copy button
  document.querySelectorAll('.btn-action-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.ai-turn-left-document');
      if (parent) {
        navigator.clipboard.writeText(parent.innerText).then(() => {
          alert('คัดลอกเนื้อหาเรียบร้อยแล้ว');
        }).catch(() => {});
      }
    });
  });

  // Like / Dislike
  document.querySelectorAll('.btn-action-like').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('text-emerald-600');
      btn.classList.toggle('bg-emerald-50');
    });
  });

  document.querySelectorAll('.btn-action-dislike').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('text-red-600');
      btn.classList.toggle('bg-red-50');
    });
  });

  // Share button
  document.querySelectorAll('.btn-action-share').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('คัดลอกลิงก์ผลการค้นหา AI เรียบร้อยแล้ว');
      }).catch(() => {});
    });
  });

  // Open Article Quick Preview Modal
  document.querySelectorAll('.btn-open-article-modal').forEach(card => {
    card.addEventListener('click', () => {
      const artId = card.getAttribute('data-article-id');
      if (artId) {
        openArticleModal(artId);
      }
    });
  });

  // In-text citation badges [1], [2] click to highlight right citation card
  document.querySelectorAll('.btn-citation-ref').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const citeIdx = btn.getAttribute('data-cite-index');
      const turnSection = btn.closest('.ai-turn-section');
      if (!turnSection || !citeIdx) return;
      const targetCard = turnSection.querySelector(`[data-citation-card-index="${citeIdx}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        targetCard.classList.add('ring-2', 'ring-[#e7151a]/70', 'bg-red-50/60');
        setTimeout(() => {
          targetCard.classList.remove('ring-2', 'ring-[#e7151a]/70', 'bg-red-50/60');
        }, 1800);
      }
    });
  });

  // Toggle Show All / Show Less citations
  document.querySelectorAll('.btn-toggle-all-citations').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.citation-card-wrapper') || btn.parentElement;
      if (!parent) return;
      const expandedGroups = parent.querySelectorAll('.citations-expanded-group');
      const label = btn.querySelector('.btn-toggle-label');
      const icon = btn.querySelector('.btn-toggle-icon');
      if (expandedGroups.length === 0) return;

      const isHidden = expandedGroups[0].classList.contains('hidden');
      expandedGroups.forEach(group => {
        if (isHidden) {
          group.classList.remove('hidden');
        } else {
          group.classList.add('hidden');
        }
      });

      if (isHidden) {
        if (label) label.textContent = 'ย่อลง';
        if (icon) icon.classList.add('rotate-180');
      } else {
        if (label) label.textContent = 'แสดงทั้งหมด';
        if (icon) icon.classList.remove('rotate-180');
      }
    });
  });

  // Toggle Matched Products (Show 3 -> Show 6)
  document.querySelectorAll('.btn-toggle-matched-products').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.matched-products-section');
      if (!parent) return;
      const extraGrid = parent.querySelector('.matched-products-extra');
      const label = btn.querySelector('.btn-matched-label');
      const chevron = btn.querySelector('.btn-matched-chevron');
      const extraCount = btn.getAttribute('data-extra-count') || '3';
      if (!extraGrid) return;

      const isHidden = extraGrid.classList.contains('hidden');
      if (isHidden) {
        extraGrid.classList.remove('hidden');
        if (label) label.textContent = 'ย่อรายการสินค้า';
        if (chevron) chevron.classList.add('rotate-180');
      } else {
        extraGrid.classList.add('hidden');
        if (label) label.textContent = `ดูเพิ่มอีก ${extraCount} รายการ`;
        if (chevron) chevron.classList.remove('rotate-180');
      }
    });
  });

  // Toggle User Bubble Expand / Collapse (Only for messages exceeding 4 lines)
  requestAnimationFrame(() => {
    document.querySelectorAll('.ai-turn-user-bubble').forEach(bubble => {
      const textEl = bubble.querySelector('.ai-turn-user-text');
      const toggleRow = bubble.querySelector('.ai-turn-user-toggle-row');
      const toggleBtn = bubble.querySelector('.btn-bubble-toggle');
      if (!textEl || !toggleRow || !toggleBtn) return;

      // Temporarily apply clamp to measure height difference
      textEl.classList.add('is-clamped');
      
      // If scrollHeight exceeds clientHeight by more than subpixel threshold, it has > 4 lines
      const isOverflowing = textEl.scrollHeight > (textEl.clientHeight + 3);

      if (isOverflowing) {
        toggleRow.classList.remove('hidden');
        toggleRow.classList.add('flex');
        toggleBtn.onclick = (e) => {
          e.stopPropagation();
          const expanded = bubble.classList.toggle('is-expanded');
          const chevronSvg = toggleBtn.querySelector('svg');
          if (expanded) {
            textEl.classList.remove('is-clamped');
            if (chevronSvg) chevronSvg.classList.add('rotate-180');
            toggleBtn.setAttribute('title', 'ย่อข้อความ');
          } else {
            textEl.classList.add('is-clamped');
            if (chevronSvg) chevronSvg.classList.remove('rotate-180');
            toggleBtn.setAttribute('title', 'ดูข้อความทั้งหมด');
          }
        };
      } else {
        // Fits within 1-4 lines: keep clamp off and button hidden
        textEl.classList.remove('is-clamped');
        toggleRow.classList.add('hidden');
        toggleRow.classList.remove('flex');
      }
    });
  });
}

/**
 * Scroll chat area to bottom
 */
function scrollToBottom(behavior = 'smooth') {
  const scrollArea = document.getElementById('chatScrollArea');
  if (scrollArea) {
    setTimeout(() => {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: behavior
      });
    }, 60);
  }
}

/**
 * Scroll to specific conversation turn (ensures latest user bubble is at the top, Turn 1 strictly hidden)
 */
function scrollToTurn(turnIndex = 'latest', behavior = 'auto') {
  const scrollArea = document.getElementById('chatScrollArea');
  if (!scrollArea) return;

  const performScroll = () => {
    const turns = scrollArea.querySelectorAll('.ai-turn-section');
    if (!turns || turns.length === 0) return;

    let targetSection = null;
    if (turnIndex === 'latest') {
      targetSection = turns[turns.length - 1];
    } else if (typeof turnIndex === 'number' && turnIndex > 0 && turnIndex <= turns.length) {
      targetSection = turns[turnIndex - 1];
    } else {
      targetSection = turns[turns.length - 1];
    }

    if (targetSection) {
      const rect = targetSection.getBoundingClientRect();
      const parentRect = scrollArea.getBoundingClientRect();
      const relativeTop = rect.top - parentRect.top + scrollArea.scrollTop;
      scrollArea.scrollTo({
        top: Math.max(0, relativeTop - 16),
        behavior: behavior
      });
    }
  };

  performScroll();
  setTimeout(performScroll, 50);
  setTimeout(performScroll, 180);
}

/**
 * Initialize Floating Scroll-to-Bottom Button
 */
function initScrollToBottomButton() {
  const scrollArea = document.getElementById('chatScrollArea');
  const btnScroll = document.getElementById('btnScrollToBottom');
  if (!scrollArea || !btnScroll) return;

  function checkScrollPosition() {
    const distFromBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight;
    const current = getCurrentThread();
    const hasMessages = current && current.messages && current.messages.length > 0;

    if (hasMessages && distFromBottom > 160) {
      btnScroll.classList.remove('hidden');
    } else {
      btnScroll.classList.add('hidden');
    }
  }

  scrollArea.addEventListener('scroll', checkScrollPosition, { passive: true });

  btnScroll.addEventListener('click', () => {
    btnScroll.classList.add('hidden');
    scrollArea.scrollTo({
      top: scrollArea.scrollHeight,
      behavior: 'smooth'
    });
  });
}

/**
 * Handle User Query Submission
 */
async function handleUserSubmit(queryText) {
  const cleanQ = (queryText || '').trim();
  if (!cleanQ || isGenerating) return;

  isGenerating = true;

  const chatInput = document.getElementById('chatInput');
  const chatSubmitBtn = document.getElementById('btnChatSubmit');
  const skeletonEl = document.getElementById('chatPendingSkeleton');

  if (chatInput) {
    chatInput.value = '';
    chatInput.style.height = '28px';
    chatInput.style.overflowY = 'hidden';
    chatInput.disabled = true;
    const form = document.getElementById('chatForm');
    if (form) form.classList.remove('is-multiline');
  }
  if (chatSubmitBtn) {
    chatSubmitBtn.classList.add('hidden');
    chatSubmitBtn.classList.remove('flex');
  }

  // 1. Get or create active thread
  let current = getCurrentThread();
  if (!current) {
    current = createNewThread(cleanQ);
  } else if (current.messages.length === 0 || current.title === 'แชทใหม่' || current.title === 'New thread') {
    current.title = cleanQ;
  }

  // 2. Add user message
  const now = Date.now();
  current.updatedAt = now;
  current.messages.push({
    role: 'user',
    text: cleanQ,
    timestamp: now
  });

  // Move current thread to top of array (LRU ordering)
  const currentIdx = threads.findIndex(t => t.id === current.id);
  if (currentIdx > 0) {
    threads.splice(currentIdx, 1);
    threads.unshift(current);
  }

  saveThreadsToStorage();
  renderSidebarRecentThreads();
  renderChatMessages();

  // 3. Show loading skeleton
  if (skeletonEl) {
    skeletonEl.classList.remove('hidden');
    scrollToBottom();
  }

  // Extract previous conversation history (Sliding Window: last 4 messages before this new one)
  const previousMessages = current.messages.slice(0, -1);
  const historyPayload = previousMessages.slice(-4).map(m => {
    let msgText = m.text || '';
    if (!msgText && m.data) {
      msgText = m.data.markdown || (m.data.lead ? `${m.data.lead.keyword || ''} ${m.data.lead.summary || ''}` : '');
    }
    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      text: String(msgText).trim()
    };
  }).filter(h => h.text.length > 0);

  // 4. Fetch AI response with conversation history and synchronize catalog concurrently
  let [aiResult] = await Promise.all([
    fetchAiData(cleanQ, historyPayload),
    mockDatabase.length === 0 ? fetchLiveDatabase() : Promise.resolve()
  ]);
  if (!aiResult) {
    aiResult = getCuratedFallbackData(cleanQ);
  }

  // 5. Hide skeleton
  if (skeletonEl) {
    skeletonEl.classList.add('hidden');
  }

  // 6. Add assistant message
  const replyTime = Date.now();
  current.updatedAt = replyTime;
  current.messages.push({
    role: 'assistant',
    data: aiResult,
    timestamp: replyTime
  });
  saveThreadsToStorage();
  renderSidebarRecentThreads();
  renderChatMessages();

  // 7. Re-enable input
  if (chatInput) {
    chatInput.disabled = false;
    chatInput.focus();
  }
  isGenerating = false;
  scrollToBottom();
}

/**
 * Initialize Sidebar Toggle (Expand / Collapse under the header)
 */
function initSidebarToggle() {
  const sidebar = document.getElementById('chatSidebar');
  const btnToggle = document.getElementById('btnToggleSidebar');
  if (!sidebar) return;

  const setCollapsed = (collapsed) => {
    if (collapsed) {
      sidebar.classList.add('is-collapsed');
    } else {
      sidebar.classList.remove('is-collapsed');
    }
    try {
      localStorage.setItem(STORAGE_SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch (e) {}
  };

  const isInitiallyCollapsed = localStorage.getItem(STORAGE_SIDEBAR_COLLAPSED_KEY) === '1';
  if (isInitiallyCollapsed) {
    setCollapsed(true);
  }

  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      const isCurrentlyCollapsed = sidebar.classList.contains('is-collapsed');
      setCollapsed(!isCurrentlyCollapsed);
    });
  }
}

/**
 * Initialize Input Controls & Submit Listeners
 */
function initInputForm() {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const submitBtn = document.getElementById('btnChatSubmit');
  const micBtn = document.getElementById('btnChatMic');
  const plusBtn = document.getElementById('btnChatPlus');

  let typingTimer = null;
  const bottomBarRow = document.getElementById('chatBottomBarRow');

  function adjustTextareaHeight() {
    if (!input || !form) return;
    input.style.height = 'auto';
    const scrollH = input.scrollHeight;
    const hasNewline = input.value.includes('\n');
    const isMulti = (hasNewline || scrollH > 34) && input.value.trim().length > 0;

    if (isMulti) {
      form.classList.add('is-multiline');
      const targetH = Math.min(scrollH, 180);
      input.style.height = `${targetH}px`;
      input.style.overflowY = scrollH > 180 ? 'auto' : 'hidden';
    } else {
      form.classList.remove('is-multiline');
      input.style.height = '28px';
      input.style.overflowY = 'hidden';
    }
  }

  if (input) {
    input.addEventListener('focus', () => {
      if (bottomBarRow) {
        bottomBarRow.classList.add('is-focused');
      }
    });

    input.addEventListener('blur', () => {
      if (bottomBarRow) {
        bottomBarRow.classList.remove('is-focused', 'is-typing');
      }
      if (typingTimer) clearTimeout(typingTimer);
    });
  }

  if (input && submitBtn) {
    input.addEventListener('input', () => {
      adjustTextareaHeight();
      if (bottomBarRow) {
        bottomBarRow.classList.add('is-typing');
        if (typingTimer) clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          if (bottomBarRow) {
            bottomBarRow.classList.remove('is-typing');
          }
        }, 2000);
      }

      if (input.value.trim().length > 0) {
        submitBtn.classList.remove('hidden');
        submitBtn.classList.add('flex');
        if (micBtn) micBtn.classList.add('hidden');
      } else {
        submitBtn.classList.add('hidden');
        submitBtn.classList.remove('flex');
        if (micBtn) micBtn.classList.remove('hidden');
      }
    });

    input.addEventListener('keydown', (e) => {
      // Cmd + Enter (Mac) or Ctrl + Enter: Insert newline and expand
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        const start = input.selectionStart;
        const end = input.selectionEnd;
        input.value = input.value.substring(0, start) + '\n' + input.value.substring(end);
        input.selectionStart = input.selectionEnd = start + 1;
        adjustTextareaHeight();
        input.dispatchEvent(new Event('input'));
        return;
      }

      // Shift + Enter: inserts newline naturally in textarea, adjust height on next tick
      if (e.key === 'Enter' && e.shiftKey) {
        setTimeout(adjustTextareaHeight, 0);
        return;
      }

      // Enter alone (without Shift, Cmd, Ctrl, Alt): Submit message
      if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const val = input.value.trim();
        if (val.length > 0) {
          if (bottomBarRow) bottomBarRow.classList.remove('is-focused', 'is-typing');
          if (typingTimer) clearTimeout(typingTimer);
          handleUserSubmit(val);
          setTimeout(() => {
            adjustTextareaHeight();
          }, 10);
        }
      }
    });
  }

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (val.length > 0) {
        if (bottomBarRow) bottomBarRow.classList.remove('is-focused', 'is-typing');
        if (typingTimer) clearTimeout(typingTimer);
        handleUserSubmit(val);
      }
    });
  }

  // Voice Mic button
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      alert('ระบบค้นหาด้วยเสียงกำลังเชื่อมต่อกับไมโครโฟนของคุณ');
    });
  }

  // Plus button
  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      alert('สามารถแนบรูปภาพรอยเชื่อมหรืออัปโหลดสเปกชีตเพื่อวิเคราะห์เพิ่มเติม (เร็วๆ นี้)');
    });
  }
}

/**
 * Initialize Header Filter Tabs
 */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.chat-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'text-gray-900', 'border-gray-900', 'font-semibold');
        t.classList.add('text-gray-600', 'border-transparent', 'font-normal');
      });
      tab.classList.add('active', 'text-gray-900', 'border-gray-900', 'font-semibold');
      tab.classList.remove('text-gray-600', 'border-transparent', 'font-normal');
    });
  });
}

/**
 * Initialize Welcome Suggestion Chips
 */
function initWelcomeChips() {
  document.querySelectorAll('.welcome-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        handleUserSubmit(prompt);
      }
    });
  });
}

/**
 * Initialize Sidebar Actions
 */
function initSidebarActions() {
  const sidebar = document.getElementById('chatSidebar');

  // New thread action (both expanded and mini button)
  const triggerNewThread = () => {
    document.documentElement.classList.remove('is-chat-handoff');
    try {
      if (window.location.search) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (e) {}
    createNewThread('แชทใหม่');
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = '';
      input.style.height = '28px';
      input.style.overflowY = 'hidden';
      const form = document.getElementById('chatForm');
      if (form) form.classList.remove('is-multiline');
      input.focus();
    }
  };

  const btnNewThread = document.getElementById('btnNewThread');
  if (btnNewThread) {
    btnNewThread.addEventListener('click', triggerNewThread);
  }

  const btnNewThreadMini = document.getElementById('btnNewThreadMini');
  if (btnNewThreadMini) {
    btnNewThreadMini.addEventListener('click', triggerNewThread);
  }

  const btnNavAiMode = document.getElementById('btnNavAiMode');
  if (btnNavAiMode) {
    btnNavAiMode.addEventListener('click', triggerNewThread);
  }

  // Search threads action
  const triggerBtn = document.getElementById('btnSearchThreadsTrigger');
  const searchInput = document.getElementById('inputSearchThreads');
  const btnSearchMini = document.getElementById('btnSearchThreadsMini');

  const openSearch = () => {
    if (sidebar && sidebar.classList.contains('is-collapsed')) {
      sidebar.classList.remove('is-collapsed');
      try {
        localStorage.setItem(STORAGE_SIDEBAR_COLLAPSED_KEY, '0');
      } catch (e) {}
    }
    if (triggerBtn) triggerBtn.classList.add('hidden');
    if (searchInput) {
      searchInput.classList.remove('hidden');
      searchInput.focus();
    }
  };

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openSearch);
  }
  if (btnSearchMini) {
    btnSearchMini.addEventListener('click', openSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderSidebarRecentThreads(searchInput.value);
    });

    searchInput.addEventListener('blur', () => {
      if (searchInput.value.trim().length === 0) {
        searchInput.classList.add('hidden');
        if (triggerBtn) triggerBtn.classList.remove('hidden');
        renderSidebarRecentThreads('');
      }
    });
  }

  // Settings button (expanded & mini)
  const showSettings = () => {
    alert('UDO AI Workspace Settings\n- โมเดลปัจจุบัน: Gemini 3.5 Flash Lite\n- การเชื่อมต่อ: Vertex AI Global Microservice\n- สถาปัตยกรรม: Trojan Horse Native PHP 8.1 API');
  };

  const btnSettings = document.getElementById('btnSettingsModal');
  if (btnSettings) {
    btnSettings.addEventListener('click', showSettings);
  }

  const btnSettingsMini = document.getElementById('btnSettingsModalMini');
  if (btnSettingsMini) {
    btnSettingsMini.addEventListener('click', showSettings);
  }
}

/**
 * Main Controller Bootstrapper
 */
document.addEventListener('DOMContentLoaded', () => {
  loadThreadsFromStorage();
  initSidebarToggle();
  initInputForm();
  initFilterTabs();
  initWelcomeChips();
  initSidebarActions();
  initCitationModal();
  initScrollToBottomButton();

  // Apply smooth page fade in
  document.body.classList.add('page-fade-in');

  // Check URL query parameters & handoff from category overview
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  const isHandoff = urlParams.get('handoff') === 'true';

  let handoffData = null;
  try {
    const raw = sessionStorage.getItem('udo_ai_chat_handoff');
    if (raw) {
      handoffData = JSON.parse(raw);
      sessionStorage.removeItem('udo_ai_chat_handoff');
    }
  } catch (e) {
    handoffData = null;
  }

  if (handoffData && handoffData.followUpQuery) {
    const initialQ = handoffData.initialQuery || 'ลวดเชื่อม';
    const followUpQ = handoffData.followUpQuery;
    const threadTitle = followUpQ.length > 30 ? followUpQ.substring(0, 30) + '...' : followUpQ;

    // Create new active thread
    const current = createNewThread(threadTitle);

    // Pre-populate Turn 1 if initial answer was captured
    if (handoffData.initialAnswer) {
      current.messages.push({
        role: 'user',
        text: initialQ,
        timestamp: (handoffData.timestamp || Date.now()) - 4000
      });
      current.messages.push({
        role: 'assistant',
        data: handoffData.initialAnswer,
        timestamp: (handoffData.timestamp || Date.now()) - 2000
      });
    }

    // Check if Turn 2 answer was already prefetched in the background
    if (handoffData.followUpAnswer) {
      current.messages.push({
        role: 'user',
        text: followUpQ,
        timestamp: (handoffData.timestamp || Date.now()) - 1000
      });
      current.messages.push({
        role: 'assistant',
        data: handoffData.followUpAnswer,
        timestamp: Date.now()
      });
      saveThreadsToStorage();
      renderSidebarRecentThreads();
      // Render without auto-scrolling to bottom, and lock onto Turn 2 user bubble at the top
      renderChatMessages({ skipScroll: true });
      scrollToTurn('latest', 'auto');
    } else {
      // Fallback if background prefetch wasn't completed
      saveThreadsToStorage();
      renderSidebarRecentThreads();
      renderChatMessages();
      setTimeout(() => {
        handleUserSubmit(followUpQ);
      }, 80);
    }
    try {
      window.history.replaceState({}, '', window.location.pathname);
    } catch (e) {}
  } else if (qParam && qParam.trim().length > 0) {
    const cleanParam = qParam.trim();
    try {
      window.history.replaceState({}, '', window.location.pathname);
    } catch (e) {}
    createNewThread(cleanParam);
    handleUserSubmit(cleanParam);
  } else {
    if (threads.length > 0) {
      if (!currentThreadId || !threads.find(t => t.id === currentThreadId)) {
        currentThreadId = threads[0].id;
      }
    }
    renderSidebarRecentThreads();
    renderChatMessages();
  }

  // Close recent threads 3-dots dropdown menu when clicking outside
  document.addEventListener('click', (e) => {
    if (activeMenuThreadId) {
      if (!e.target.closest('.thread-dropdown-menu') && !e.target.closest('.btn-thread-menu')) {
        activeMenuThreadId = null;
        renderSidebarRecentThreads();
      }
    }
  });
});

