// Nav Search & Recent Searches Dropdown Management

const STORAGE_KEY = 'udo_recent_searches';
const DEFAULT_RECENT = [
  'ลวดเชื่อมเหล็กหล่อ',
  'ลวดเชื่อมสแตนเลส 308L',
  'เครื่องเชื่อม TIG 200A',
  'หน้ากากเชื่อมปรับแสงอัตโนมัติ'
];

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECENT));
      return [...DEFAULT_RECENT];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

export function saveRecentSearch(query) {
  if (!query || typeof query !== 'string') return;
  const trimmed = query.trim();
  if (!trimmed) return;

  let list = getRecentSearches();
  list = list.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
  list.unshift(trimmed);
  if (list.length > 6) {
    list = list.slice(0, 6);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // ignore quota errors
  }
}

export function deleteRecentSearch(query) {
  let list = getRecentSearches();
  list = list.filter((item) => item !== query);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // ignore quota errors
  }
}

export function initNavSearch() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const aiModeBtn = document.getElementById('aiModeBtn');
  const dropdown = document.getElementById('navRecentSearchesDropdown');
  const listEl = document.getElementById('navRecentSearchesList');

  if (!searchForm || !searchInput) return;

  function renderDropdown(filterText = '') {
    if (!listEl) return;
    listEl.innerHTML = '';

    const allItems = getRecentSearches();
    const query = filterText.toLowerCase();
    const filtered = query
      ? allItems.filter((item) => item.toLowerCase().includes(query))
      : allItems;

    if (filtered.length === 0) {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'py-3 px-4 text-center text-xs text-gray-400 select-none';
      emptyEl.textContent = 'ไม่มีประวัติการค้นหาล่าสุด';
      listEl.appendChild(emptyEl);
      return;
    }

    filtered.forEach((term) => {
      const itemRow = document.createElement('div');
      itemRow.className = 'nav-recent-item flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-100/70 transition-colors cursor-pointer group';
      itemRow.dataset.query = term;

      itemRow.innerHTML = `
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-[13.5px] text-gray-700 group-hover:text-gray-900 font-normal truncate select-none">${escapeHtml(term)}</span>
        </div>
        <button type="button" class="nav-recent-del-btn w-6 h-6 rounded-full hover:bg-gray-200/80 text-gray-400 hover:text-gray-600 flex items-center justify-center shrink-0 ml-2 transition-colors cursor-pointer" aria-label="ลบ" title="ลบ">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      `;

      itemRow.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.nav-recent-del-btn');
        if (delBtn) {
          e.preventDefault();
          e.stopPropagation();
          deleteRecentSearch(term);
          renderDropdown(searchInput.value.trim());
          return;
        }

        searchInput.value = term;
        saveRecentSearch(term);
        closeDropdown();
        window.location.href = '/category.html?type=ai_search&q=' + encodeURIComponent(term);
      });

      listEl.appendChild(itemRow);
    });
  }

  function openDropdown() {
    if (!dropdown) return;
    renderDropdown(searchInput.value.trim());
    dropdown.classList.remove('hidden');
  }

  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.add('hidden');
  }

  function toggleDropdown() {
    if (!dropdown) return;
    if (dropdown.classList.contains('hidden')) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  // Input events
  searchInput.addEventListener('focus', () => {
    openDropdown();
  });

  searchInput.addEventListener('click', () => {
    openDropdown();
  });

  searchInput.addEventListener('input', () => {
    renderDropdown(searchInput.value.trim());
    if (dropdown && dropdown.classList.contains('hidden')) {
      openDropdown();
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = searchInput.value.trim();
      if (val.length === 0) {
        openDropdown();
        return;
      }
      saveRecentSearch(val);
      closeDropdown();
      window.location.href = '/category.html?type=ai_search&q=' + encodeURIComponent(val);
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  // Search form submit
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (val.length === 0) {
      openDropdown();
      return;
    }
    saveRecentSearch(val);
    closeDropdown();
    window.location.href = '/category.html?type=ai_search&q=' + encodeURIComponent(val);
  });

  // AI Mode Button click
  if (aiModeBtn) {
    aiModeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const val = searchInput.value.trim();
      if (val.length === 0) {
        // Empty query: Do not navigate. Open/toggle recent searches dropdown
        toggleDropdown();
        searchInput.focus();
      } else {
        // With query: Save and navigate to chat
        saveRecentSearch(val);
        closeDropdown();
        window.location.href = '/chat.html?q=' + encodeURIComponent(val);
      }
    });
  }

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
      closeDropdown();
    }
  });
}

// Auto initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavSearch);
} else {
  initNavSearch();
}
