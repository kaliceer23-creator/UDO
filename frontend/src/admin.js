// src/admin.js
/**
 * UDO Admin CMS & Inventory Control System
 * Pure Native Modern JavaScript (Vanilla ES Modules)
 * Strictly conforms to GEMINI.md Trojan Horse architecture:
 * - DirectAdmin / Apache / PHP 8.1 REST API communication
 * - Real-time WYSIWYG Storefront Preview
 * - Inline Stock Quick Editing & Audit Trail Tracking
 * - NO EMOJIS in code, logs, or UI
 */

import { generateCardHTML, formatPrice, getStartingPrice, resolveImageSrc } from './components/ProductCard.js';

// Cross-tab real-time catalog synchronization channel
const adminSyncChannel = (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function')
  ? new BroadcastChannel('udo_catalog_sync')
  : null;

function broadcastCatalogUpdate() {
  if (adminSyncChannel) {
    try {
      adminSyncChannel.postMessage({
        type: 'catalog_updated',
        timestamp: Date.now()
      });
    } catch (err) {
      console.warn('Catalog broadcast notice:', err.message);
    }
  }
}

// Application State
const state = {
  activeTab: 'inventory', // 'inventory' | 'merchandising' | 'logs'
  products: [],
  allProductsCache: [],
  totalProducts: 0,
  currentPage: 1,
  limit: 20,
  totalPages: 1,
  searchQuery: '',
  statusFilter: 'all',
  categoryFilter: 'all',
  sortOrder: 'sort_priority',
  summary: {
    total: 0,
    in_stock: 0,
    out_of_stock: 0,
    best_seller: 0,
    recommended: 0,
    promotion: 0
  },
  activeProduct: null,
  inlineStockTarget: null,

  // Brand Taxonomy & Category Scoping
  brandTaxonomy: {
    all: [],
    byCategory: {}
  },
  brandScopeMode: 'category', // 'category' | 'all'
  activeProductCategory: '',

  // Visual Merchandising 4 Storefront Shelves
  curationTargetScope: 'best_seller', // 'best_seller' | 'new_arrival' | 'recommended' | 'promotion'
  expandedShelves: new Set(), // Set of shelf IDs that are currently expanded

  // Collection Curation Multi-Select Picker State
  pickerSelectedIds: new Set(),
  pickerSearchQuery: '',
  pickerCategoryFilter: 'all',
  pickerFilterUnselected: false,

  // Authentication & Current User State
  currentUser: null,

  // Audit Logs State
  auditSearchQuery: '',
  auditRoleFilter: 'all',
  auditActionFilter: 'all',
  auditCurrentPage: 1,

  // Multi-Criteria Filtering State
  filterCategories: new Set(),
  filterStatuses: new Set(),
  filterAvailabilities: new Set(),
  filterBadges: new Set(),

  // Progressive Disclosure Batch Selection State
  isSelectionMode: false,
  selectedProductIds: new Set(),

  // 1-Click Status Popover Dropdown State
  statusPopoverTarget: null,

  // Shelf Rank Quick Move Popover State
  shelfRankPopoverTarget: null,

  // Create Product Mode
  isCreateMode: false
};

// DOM Element Cache
const dom = {
  // Navigation Tabs
  navInventory: document.getElementById('nav-tab-inventory'),
  navMerchandising: document.getElementById('nav-tab-merchandising'),
  navLogs: document.getElementById('nav-tab-logs'),

  // Search & Global Action
  searchInput: document.getElementById('admin-search-input'),
  refreshBtn: document.getElementById('admin-refresh-btn'),

  // Filter & Batch Selection Controls
  btnOpenFilters: document.getElementById('btn-open-filters'),
  filterChevronIcon: document.getElementById('filter-chevron-icon'),
  activeFilterBadge: document.getElementById('active-filter-badge'),
  btnToggleSelectMode: document.getElementById('btn-toggle-select-mode'),
  btnSelectModeLabel: document.getElementById('btn-select-mode-label'),
  activeFilterPillsContainer: document.getElementById('active-filter-pills-container'),
  activeFilterPillsList: document.getElementById('active-filter-pills-list'),
  btnClearAllFilters: document.getElementById('btn-clear-all-filters'),
  colHeaderSelectAll: document.getElementById('col-header-select-all'),
  inventorySelectAll: document.getElementById('inventory-select-all'),

  // Inline Collapsible Filter Panel
  inlineFilterPanel: document.getElementById('inline-filter-panel'),
  filterInlineCategoriesList: document.getElementById('filter-inline-categories-list'),
  btnResetFilterModal: document.getElementById('btn-reset-filter-modal'),
  btnCloseFilterPanel: document.getElementById('btn-close-filter-panel'),

  // 1-Click Status Popover Dropdown (Singleton)
  globalStatusPopover: document.getElementById('global-status-popover'),

  // Shelf Rank Quick Move Popover (Singleton)
  shelfRankPopover: document.getElementById('shelf-rank-popover'),
  rankPopoverProductName: document.getElementById('rank-popover-product-name'),
  rankPopoverCurrentInfo: document.getElementById('rank-popover-current-info'),
  shelfRankForm: document.getElementById('shelf-rank-form'),
  rankPopoverInput: document.getElementById('rank-popover-input'),
  btnCloseRankPopover: document.getElementById('btn-close-rank-popover'),
  btnCancelRankPopover: document.getElementById('btn-cancel-rank-popover'),

  // Floating Batch Action Dock
  floatingBatchDock: document.getElementById('floating-batch-dock'),
  batchSelectedCountLabel: document.getElementById('batch-selected-count-label'),
  btnCancelBatchSelection: document.getElementById('btn-cancel-batch-selection'),

  // Admin Auth Header Elements
  adminAuthHeaderSection: document.getElementById('admin-auth-header-section'),
  headerAdminName: document.getElementById('header-admin-name'),
  headerAdminRoleBadge: document.getElementById('header-admin-role-badge'),
  adminLogoutBtn: document.getElementById('admin-logout-btn'),

  // Admin Login Modal Elements
  loginModal: document.getElementById('admin-login-modal'),
  loginForm: document.getElementById('admin-login-form'),
  loginUsername: document.getElementById('login-username'),
  loginPassword: document.getElementById('login-password'),
  loginErrorMsg: document.getElementById('login-error-msg'),
  loginSubmitBtn: document.getElementById('login-submit-btn'),

  // Bento Summary Stats
  statTotal: document.getElementById('stat-total'),
  statInStock: document.getElementById('stat-in-stock'),
  statOutOfStock: document.getElementById('stat-out-of-stock'),
  statBestSeller: document.getElementById('stat-best-seller'),
  statRecommended: document.getElementById('stat-recommended'),
  statPromotion: document.getElementById('stat-promotion'),
  filteredCount: document.getElementById('filtered-count'),

  // Filter Pills & Selects
  statusPills: document.querySelectorAll('.status-filter-pill'),
  categorySelect: document.getElementById('category-filter-select'),
  sortSelect: document.getElementById('sort-select'),

  // Containers
  inventoryViewWrapper: document.getElementById('inventory-view-wrapper'),
  inventoryWrapper: document.getElementById('inventory-list-wrapper'),
  productRowsContainer: document.getElementById('product-rows-container'),
  paginationWrapper: document.getElementById('pagination-wrapper'),
  paginationInfo: document.getElementById('pagination-info'),
  paginationButtons: document.getElementById('pagination-buttons'),
  auditLogsWrapper: document.getElementById('audit-logs-wrapper'),
  auditLogsTbody: document.getElementById('audit-logs-tbody'),
  refreshLogsBtn: document.getElementById('refresh-logs-btn'),
  auditSearchInput: document.getElementById('audit-search-input'),
  auditRoleFilter: document.getElementById('audit-role-filter'),
  auditActionFilter: document.getElementById('audit-action-filter'),
  auditLogsCount: document.getElementById('audit-logs-count'),

  // Visual Merchandising 4 Shelves Container
  merchandisingWrapper: document.getElementById('merchandising-wrapper'),
  merchandisingShelvesContainer: document.getElementById('merchandising-shelves-container'),

  // Collection Curation Picker Modal Controls
  pickerModal: document.getElementById('curation-picker-modal'),
  pickerModalTitle: document.getElementById('picker-modal-title'),
  pickerCloseBtn: document.getElementById('picker-close-btn'),
  pickerCancelBtn: document.getElementById('picker-cancel-btn'),
  pickerSubmitBtn: document.getElementById('picker-submit-btn'),
  pickerSearchInput: document.getElementById('picker-search-input'),
  pickerCategoryFilter: document.getElementById('picker-category-filter'),
  pickerFilterUnselected: document.getElementById('picker-filter-unselected'),
  pickerSelectAll: document.getElementById('picker-select-all'),
  pickerClearBtn: document.getElementById('picker-clear-btn'),
  pickerProductList: document.getElementById('picker-product-list'),
  pickerSelectedCount: document.getElementById('picker-selected-count'),
  pickerBtnCount: document.getElementById('picker-btn-count'),

  // Inline Stock Edit Modal
  inlineModal: document.getElementById('inline-stock-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCancelBtn: document.getElementById('modal-cancel-btn'),
  modalSaveBtn: document.getElementById('modal-save-btn'),
  modalProductName: document.getElementById('modal-product-name'),
  modalVariantInfo: document.getElementById('modal-variant-info'),
  modalStockInput: document.getElementById('modal-stock-input'),
  modalReasonSelect: document.getElementById('modal-reason-select'),

  // Add Product Buttons
  btnAddProduct: document.getElementById('btn-add-product'),
  headerBtnAddProduct: document.getElementById('header-btn-add-product'),

  // WYSIWYG Drawer
  drawerBackdrop: document.getElementById('drawer-backdrop'),
  productDrawer: document.getElementById('product-drawer'),
  drawerTitle: document.getElementById('drawer-title'),
  drawerCloseBtn: document.getElementById('drawer-close-btn'),
  drawerCancelBtn: document.getElementById('drawer-cancel-btn'),
  drawerSaveBtn: document.getElementById('drawer-save-btn'),
  drawerSkuLabel: document.getElementById('drawer-sku-label'),
  drawerPreviewCard: document.getElementById('drawer-preview-card'),
  drawerPid: document.getElementById('drawer-pid'),
  drawerName: document.getElementById('drawer-name'),
  drawerNameEn: document.getElementById('drawer-name-en'),
  drawerCategory: document.getElementById('drawer-category'),
  drawerBrand: document.getElementById('drawer-brand'),
  drawerBrandSearch: document.getElementById('drawer-brand-search'),
  drawerBrandDropdown: document.getElementById('drawer-brand-dropdown'),
  drawerBrandChevron: document.getElementById('drawer-brand-chevron'),
  drawerBrandChevronBtn: document.getElementById('drawer-brand-chevron-btn'),
  drawerBrandClearBtn: document.getElementById('drawer-brand-clear-btn'),
  drawerBrandScopeToggle: document.getElementById('drawer-brand-scope-toggle'),
  drawerBrandScopeDot: document.getElementById('drawer-brand-scope-dot'),
  drawerBrandScopeText: document.getElementById('drawer-brand-scope-text'),
  drawerBrandCategoryName: document.getElementById('drawer-brand-category-name'),
  drawerBrandCountBadge: document.getElementById('drawer-brand-count-badge'),
  drawerBrandList: document.getElementById('drawer-brand-list'),
  drawerBrandAddSection: document.getElementById('drawer-brand-add-section'),
  btnAddNewBrand: document.getElementById('btn-add-new-brand'),
  btnAddNewBrandText: document.getElementById('btn-add-new-brand-text'),
  drawerSortPriority: document.getElementById('drawer-sort-priority'),
  drawerFlagBest: document.getElementById('drawer-flag-best'),
  drawerFlagNew: document.getElementById('drawer-flag-new'),
  drawerFlagRec: document.getElementById('drawer-flag-rec'),
  drawerFlagPromo: document.getElementById('drawer-flag-promo'),
  drawerFlagCategoryPinned: document.getElementById('drawer-flag-category-pinned'),
  drawerVariantsList: document.getElementById('drawer-variants-list'),
  drawerSizePresetsBar: document.getElementById('drawer-size-presets-bar'),
  btnAddCustomSize: document.getElementById('btn-add-custom-size'),
  btnAddSpecRow: document.getElementById('btn-add-spec-row'),
  drawerSpecPresetsBar: document.getElementById('drawer-spec-presets-bar'),
  drawerSpecsTbody: document.getElementById('drawer-specs-tbody'),
  drawerDesc: document.getElementById('drawer-desc'),
  drawerRichIsDocument: document.getElementById('drawer-rich-is-document'),
  drawerRichBlocksContainer: document.getElementById('drawer-rich-blocks-container'),
  btnAddRichBlock: document.getElementById('btn-add-rich-block'),
  btnOpenShowcasePreview: document.getElementById('btn-open-showcase-preview'),
  showcasePreviewModal: document.getElementById('showcase-preview-modal'),
  showcasePreviewContent: document.getElementById('showcase-preview-content'),
  showcasePreviewFrame: document.getElementById('showcase-preview-frame'),
  btnShowcaseViewDesktop: document.getElementById('btn-showcase-view-desktop'),
  btnShowcaseViewMobile: document.getElementById('btn-showcase-view-mobile'),
  btnCloseShowcasePreview: document.getElementById('btn-close-showcase-preview'),
  btnOpenImageFraming: document.getElementById('btn-open-image-framing'),
  drawerImageStatus: document.getElementById('drawer-image-status'),

  // Product Image Framing Modal
  imageFramingModal: document.getElementById('image-framing-modal'),
  framingModalCard: document.getElementById('framing-modal-card'),
  btnCloseFramingModal: document.getElementById('btn-close-framing-modal'),
  btnFramingCancel: document.getElementById('btn-framing-cancel'),
  btnFramingBrowse: document.getElementById('btn-framing-browse'),
  framingFileInput: document.getElementById('framing-file-input'),
  framingCanvasViewport: document.getElementById('framing-canvas-viewport'),
  framingDisplayCanvas: document.getElementById('framing-display-canvas'),
  framingExportCanvas: document.getElementById('framing-export-canvas'),
  framingZoomSlider: document.getElementById('framing-zoom-slider'),
  framingZoomLabel: document.getElementById('framing-zoom-label'),
  btnFramingZoomOut: document.getElementById('btn-framing-zoom-out'),
  btnFramingZoomIn: document.getElementById('btn-framing-zoom-in'),
  btnFramingSnapCenter: document.getElementById('btn-framing-snap-center'),
  btnFramingRotate: document.getElementById('btn-framing-rotate'),
  btnFramingApplyUpload: document.getElementById('btn-framing-apply-upload'),
  framingUploadSpinner: document.getElementById('framing-upload-spinner'),
  framingApplyText: document.getElementById('framing-apply-text'),

  // Showcase Image Framing Modal (Flexible Free Height & Multi-Aspect Ratio)
  showcaseFramingModal: document.getElementById('showcase-framing-modal'),
  showcaseFramingCard: document.getElementById('showcase-framing-card'),
  btnCloseShowcaseFraming: document.getElementById('btn-close-showcase-framing'),
  btnShowcaseFramingCancel: document.getElementById('btn-showcase-framing-cancel'),
  btnShowcaseFramingBrowse: document.getElementById('btn-showcase-framing-browse'),
  showcaseFramingFileInput: document.getElementById('showcase-framing-file-input'),
  btnShowcaseFramingUsePrimary: document.getElementById('btn-showcase-framing-use-primary'),
  showcaseFramingViewportWrapper: document.getElementById('showcase-framing-viewport-wrapper'),
  showcaseFramingViewport: document.getElementById('showcase-framing-viewport'),
  showcaseCropHandleTop: document.getElementById('showcase-crop-handle-top'),
  showcaseCropHandleBottom: document.getElementById('showcase-crop-handle-bottom'),
  btnShowcasePresetAuto: document.getElementById('btn-showcase-preset-auto'),
  btnShowcasePreset169: document.getElementById('btn-showcase-preset-16-9'),
  btnShowcasePreset43: document.getElementById('btn-showcase-preset-4-3'),
  btnShowcasePreset11: document.getElementById('btn-showcase-preset-1-1'),
  showcaseFramingHeightInput: document.getElementById('showcase-framing-height-input'),
  showcaseSafezoneRatioLabel: document.getElementById('showcase-safezone-ratio-label'),
  showcaseSafezoneDimLabel: document.getElementById('showcase-safezone-dim-label'),
  showcaseFramingDisplayCanvas: document.getElementById('showcase-framing-display-canvas'),
  showcaseFramingExportCanvas: document.getElementById('showcase-framing-export-canvas'),
  showcaseDropOverlay: document.getElementById('showcase-drop-overlay'),
  showcaseFramingZoomSlider: document.getElementById('showcase-framing-zoom-slider'),
  showcaseFramingZoomLabel: document.getElementById('showcase-framing-zoom-label'),
  btnShowcaseFramingZoomOut: document.getElementById('btn-showcase-framing-zoom-out'),
  btnShowcaseFramingZoomIn: document.getElementById('btn-showcase-framing-zoom-in'),
  btnShowcaseFramingSnapCenter: document.getElementById('btn-showcase-framing-snap-center'),
  btnShowcaseFramingRotate: document.getElementById('btn-showcase-framing-rotate'),
  btnShowcaseFramingApplyUpload: document.getElementById('btn-showcase-framing-apply-upload'),
  showcaseFramingUploadSpinner: document.getElementById('showcase-framing-upload-spinner'),
  showcaseFramingApplyText: document.getElementById('showcase-framing-apply-text'),

  // Gallery Management Elements
  drawerGalleryContainer: document.getElementById('drawer-gallery-container'),
  drawerGalleryDropOverlay: document.getElementById('drawer-gallery-drop-overlay'),
  drawerGalleryGrid: document.getElementById('drawer-gallery-grid'),
  drawerGalleryCountBadge: document.getElementById('drawer-gallery-count-badge'),
  drawerGalleryFileInput: document.getElementById('drawer-gallery-file-input'),
  btnBrowseGalleryImg: document.getElementById('btn-browse-gallery-img'),
  btnAddGalleryUrl: document.getElementById('btn-add-gallery-url'),
  drawerGalleryUrlBar: document.getElementById('drawer-gallery-url-bar'),
  drawerGalleryUrlInput: document.getElementById('drawer-gallery-url-input'),
  btnSubmitGalleryUrl: document.getElementById('btn-submit-gallery-url'),
  btnCancelGalleryUrl: document.getElementById('btn-cancel-gallery-url'),

  // Danger Zone & Safe Deletion
  drawerDangerZone: document.getElementById('drawer-danger-zone'),
  btnDrawerDeleteProduct: document.getElementById('btn-drawer-delete-product'),
  btnBatchDeleteProducts: document.getElementById('btn-batch-delete-products'),
  deleteConfirmModal: document.getElementById('delete-confirm-modal'),
  deleteModalTitle: document.getElementById('delete-modal-title'),
  deleteModalSingleInfo: document.getElementById('delete-modal-single-info'),
  deleteModalBatchInfo: document.getElementById('delete-modal-batch-info'),
  deleteModalBatchCount: document.getElementById('delete-modal-batch-count'),
  deleteModalImg: document.getElementById('delete-modal-img'),
  deleteModalName: document.getElementById('delete-modal-name'),
  deleteModalSku: document.getElementById('delete-modal-sku'),
  deleteModalCat: document.getElementById('delete-modal-cat'),
  deleteModalCancelBtn: document.getElementById('delete-modal-cancel-btn'),
  deleteModalConfirmBtn: document.getElementById('delete-modal-confirm-btn'),

  // Toast
  toast: document.getElementById('admin-toast'),
  toastMessage: document.getElementById('toast-message')
};

/**
 * Toast Notification Utility
 */
let toastTimeout = null;
function showToast(message, type = 'success') {
  if (!dom.toast || !dom.toastMessage) return;
  dom.toastMessage.textContent = message;

  if (toastTimeout) clearTimeout(toastTimeout);

  dom.toast.classList.remove('translate-y-20', 'opacity-0');
  dom.toast.classList.add('translate-y-0', 'opacity-100');

  toastTimeout = setTimeout(() => {
    dom.toast.classList.remove('translate-y-0', 'opacity-100');
    dom.toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

/**
 * Load Full Catalog from MariaDB into Cache for Brand Taxonomy & Shelves
 */
async function loadAllProductsCatalog() {
  try {
    const res = await fetch('/api/admin/products.php?all=1', { credentials: 'include' });
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && Array.isArray(data.products)) {
      state.allProductsCache = data.products;
      if (data.summary) {
        state.summary = data.summary;
        renderMetrics();
      }
      buildBrandTaxonomy(state.allProductsCache);
    }
  } catch (err) {
    console.warn('Failed to load full catalog cache:', err.message);
  }
}

/**
 * Fetch Products from Native PHP 8.1 API (with Local Fallback)
 */
async function fetchProducts(page = 1) {
  state.currentPage = page;

  // Show loading indicator
  if (dom.productRowsContainer) {
    dom.productRowsContainer.innerHTML = `
      <div class="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-200/70">
        <div class="inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mb-3"></div>
        <p class="text-sm font-medium">กำลังโหลดข้อมูลสินค้า UDO...</p>
      </div>
    `;
  }

  const queryParams = new URLSearchParams({
    page: String(state.currentPage),
    limit: String(state.limit),
    q: state.searchQuery,
    sort: state.sortOrder
  });

  if (state.filterCategories.size > 0) {
    queryParams.set('categories', Array.from(state.filterCategories).join(','));
  } else if (state.categoryFilter && state.categoryFilter !== 'all') {
    queryParams.set('category', state.categoryFilter);
  }

  if (state.filterStatuses.size > 0) {
    queryParams.set('statuses', Array.from(state.filterStatuses).join(','));
  } else if (state.statusFilter && state.statusFilter !== 'all') {
    queryParams.set('status', state.statusFilter);
  }

  if (state.filterAvailabilities.size > 0) {
    queryParams.set('availabilities', Array.from(state.filterAvailabilities).join(','));
  }

  if (state.filterBadges.size > 0) {
    queryParams.set('badges', Array.from(state.filterBadges).join(','));
  }

  try {
    const res = await fetch(`/api/admin/products.php?${queryParams.toString()}`, {
      credentials: 'include'
    });
    if (!res.ok) {
      throw new Error(`API responded with HTTP status ${res.status}`);
    }

    const data = await res.json();
    if (!data.success || !Array.isArray(data.products)) {
      throw new Error(data.error || 'Invalid API data format');
    }

    // Update State from API
    state.products = data.products;
    state.totalProducts = data.total_products || data.total || 0;
    state.totalPages = data.total_pages || 1;
    state.currentPage = data.current_page || data.page || 1;

    if (data.summary) {
      state.summary = data.summary;
    }

    renderMetrics();
    updateStatusPillVisuals();
    renderProductRows();
    renderPagination();
  } catch (err) {
    console.error('API fetch error from MariaDB:', err.message);
    state.products = [];
    state.totalProducts = 0;
    state.totalPages = 1;
    if (dom.productRowsContainer) {
      dom.productRowsContainer.innerHTML = `
        <div class="bg-white rounded-2xl p-12 text-center text-red-500 border border-red-200">
          <p class="text-sm font-semibold mb-1">ไม่สามารถเชื่อมต่อฐานข้อมูลสินค้า MariaDB</p>
          <p class="text-xs text-gray-500 mb-4">${err.message}</p>
          <button onclick="window.fetchProducts && window.fetchProducts(1)" class="px-4 py-2 text-xs font-medium text-white bg-black rounded-lg hover:bg-neutral-800 transition">
            ลองใหม่อีกครั้ง
          </button>
        </div>
      `;
    }
    renderMetrics();
    renderPagination();
    showToast('เกิดข้อผิดพลาดในการโหลดสินค้า: ' + err.message, 'error');
  }
}

/**
 * Render Bento Metric Summaries
 */
function renderMetrics() {
  if (dom.statTotal) dom.statTotal.textContent = Number(state.summary.total).toLocaleString();
  if (dom.statInStock) dom.statInStock.textContent = Number(state.summary.in_stock).toLocaleString();
  if (dom.statOutOfStock) dom.statOutOfStock.textContent = Number(state.summary.out_of_stock).toLocaleString();
  if (dom.statBestSeller) dom.statBestSeller.textContent = Number(state.summary.best_seller).toLocaleString();
  if (dom.statRecommended) dom.statRecommended.textContent = Number(state.summary.recommended).toLocaleString();
  if (dom.statPromotion) dom.statPromotion.textContent = Number(state.summary.promotion).toLocaleString();
  if (dom.filteredCount) dom.filteredCount.textContent = Number(state.totalProducts).toLocaleString();
}

/**
 * Helper to Compute Price Display
 */
function computePriceRange(product) {
  if (!product.variants || product.variants.length === 0) return 'ติดต่อสอบถาม';
  const prices = product.variants.map(v => v.price).filter(p => p > 0);
  if (prices.length === 0) return 'ติดต่อสอบถาม';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) {
    return `฿${formatPrice(min)}`;
  }
  return `฿${formatPrice(min)} - ฿${formatPrice(max)}`;
}

/**
 * Render Product Rows in Bento Table Layout
 */
function renderProductRows() {
  if (!dom.productRowsContainer) return;

  if (state.products.length === 0) {
    dom.productRowsContainer.innerHTML = `
      <div class="bg-white rounded-2xl p-12 text-center border border-gray-200/70">
        <p class="text-sm font-semibold text-gray-700">ไม่พบรายการสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
        <p class="text-xs text-gray-400 mt-1">ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองสถานะ</p>
        <button id="reset-filters-btn" class="mt-4 px-4 py-2 bg-black text-white hover:bg-neutral-800 rounded-full text-xs font-semibold cursor-pointer transition-all">
          รีเซ็ตตัวกรองทั้งหมด
        </button>
      </div>
    `;

    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.statusFilter = 'all';
        state.categoryFilter = 'all';
        state.sortOrder = 'sort_priority';
        if (dom.searchInput) dom.searchInput.value = '';
        if (dom.categorySelect) dom.categorySelect.value = 'all';
        if (dom.sortSelect) dom.sortSelect.value = 'sort_priority';
        updateStatusPillVisuals();
        fetchProducts(1);
      });
    }
    return;
  }

  const rowsHTML = state.products.map(product => {
    const rawImage = (product.images && product.images.length > 0) ? product.images[0] : null;
    const thumb = resolveImageSrc(rawImage, 'thumb');

    // Calculate Stock
    const variants = product.variants || [];
    const totalStock = variants.reduce((acc, v) => acc + (Number(v.stock) || 0), 0);
    const primarySku = variants[0]?.sku || product.id;

    // Clean Apple iOS Stock Pill Styling (Soft pastel tones, razor-sharp text)
    const avail = product.availability || (totalStock > 0 ? 'in_stock' : 'out_of_stock');
    let stockPillClass = 'bg-[#E8F8EE] text-[#0E7A3A] hover:bg-[#D6F4DF]';
    let stockStatusText = 'พร้อมส่ง';

    if (avail === 'special_order') {
      stockPillClass = 'bg-[#F3E8FF] text-[#6B21A8] hover:bg-[#E9D5FF]';
      stockStatusText = 'สั่งพิเศษ';
    } else if (totalStock === 0 || avail === 'out_of_stock') {
      stockPillClass = 'bg-[#FDE8E8] text-[#9B1C1C] hover:bg-[#FCD2D2]';
      stockStatusText = 'หมดสต็อก';
    } else if (totalStock <= 10) {
      stockPillClass = 'bg-[#FFF4E5] text-[#B25E00] hover:bg-[#FFE7C7]';
      stockStatusText = 'ใกล้หมด';
    }

    // Clean Brand Display
    const brandName = product.brand || 'UDO';

    // Marketing & Storefront Badges
    const badges = [];

    const curShelves = product.storefront_shelves || {};
    if (curShelves.best_seller) {
      badges.push(`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF4E5] text-[#9A3412] border border-amber-200">ขายดี #${curShelves.best_seller}</span>`);
    }
    if (curShelves.new_arrival) {
      badges.push(`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F8EE] text-[#0E7A3A] border border-emerald-200">สินค้าใหม่ #${curShelves.new_arrival}</span>`);
    }
    if (curShelves.recommended) {
      badges.push(`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F3E8FF] text-[#6B21A8] border border-purple-200">แนะนำ #${curShelves.recommended}</span>`);
    }
    if (curShelves.promotion) {
      badges.push(`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E0F2FE] text-[#0369A1] border border-sky-200">โปรโมชั่น #${curShelves.promotion}</span>`);
    }
    if (product.sold_count && product.sold_count > 0) {
      badges.push(`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAEAEF] text-[#424245]">ขายแล้ว ${Number(product.sold_count).toLocaleString()}</span>`);
    }

    // Publication Status Pill Styling
    const prodStatus = product.status || 'publish';
    let statusPillClass = 'bg-[#E8F8EE] text-[#0E7A3A] hover:bg-[#D6F4DF] border border-emerald-200/60';
    let statusDotClass = 'bg-[#0E7A3A]';
    let statusLabel = 'เผยแพร่';

    if (prodStatus === 'draft') {
      statusPillClass = 'bg-[#F2F2F7] text-[#636366] hover:bg-[#E5E5EA] border border-gray-200/80';
      statusDotClass = 'bg-gray-400';
      statusLabel = 'ฉบับร่าง';
    } else if (prodStatus === 'suspended') {
      statusPillClass = 'bg-[#FDE8E8] text-[#9B1C1C] hover:bg-[#FCD2D2] border border-rose-200/60';
      statusDotClass = 'bg-rose-500';
      statusLabel = 'ระงับจำหน่าย';
    }

    const priceRangeText = computePriceRange(product);

    // English Subtitle: Only show when actually present, NO hyphen clutter
    const englishSubtitleHTML = product.name_en ? `<p class="text-[13px] text-[#424245] truncate mt-0.5 font-normal" title="${product.name_en}">${product.name_en}</p>` : '';

    const isSelected = state.selectedProductIds.has(product.id);

    return `
      <div class="product-row hover:bg-[#F9F9FB] ${isSelected ? 'bg-neutral-100/70' : ''} transition-colors px-6 py-4 flex flex-col md:flex md:flex-row gap-3 md:gap-4 items-start md:items-center" data-product-id="${product.id}">
        
        <!-- Selection Checkbox Column (Shown only in Selection Mode) -->
        <div class="row-select-col ${state.isSelectionMode ? 'flex' : 'hidden'} items-center shrink-0 pr-1">
          <input 
            type="checkbox" 
            data-product-id="${product.id}" 
            class="row-select-checkbox w-4 h-4 rounded accent-black cursor-pointer" 
            ${isSelected ? 'checked' : ''}
          >
        </div>

        <!-- Col 1: Product Info & Thumbnail -->
        <div class="flex-1 min-w-0 flex items-center gap-3.5 w-full">
          <div class="w-13 h-13 rounded-xl bg-[#F2F2F7] flex items-center justify-center p-1 shrink-0 overflow-hidden border border-black/[0.04]">
            <img src="${thumb}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply" loading="lazy" onerror="this.src='https://via.placeholder.com/100x100/F2F2F7/8E8E93?text=UDO'">
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-mono text-[12px] font-semibold text-[#160808] bg-[#EAEAEF] px-2.5 py-0.5 rounded-md">
                ${primarySku}
              </span>
              ${badges.join(' ')}
            </div>
            <h3 class="text-[15.5px] sm:text-[16px] font-semibold text-[#160808] truncate mt-1 tracking-tight leading-snug" title="${product.name}">
              ${product.name}
            </h3>
            ${englishSubtitleHTML}
          </div>
        </div>

        <!-- Col 2: Brand -->
        <div class="w-32 shrink-0 hidden md:block">
          <span class="text-[13.5px] sm:text-[14px] font-semibold text-[#160808]">
            ${brandName}
          </span>
        </div>

        <!-- Col 3: Publication Status Quick Pill -->
        <div class="w-32 shrink-0 flex items-center justify-start md:justify-center">
          <button 
            type="button" 
            class="btn-quick-status-pill px-3 py-1.5 rounded-full text-[12px] font-semibold ${statusPillClass} transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            data-product-id="${product.id}"
            data-current-status="${prodStatus}"
            title="คลิกเพื่อเปลี่ยนสถานะแสดงผล"
          >
            <span class="w-1.5 h-1.5 rounded-full ${statusDotClass}"></span>
            <span>${statusLabel}</span>
            <svg class="w-3 h-3 opacity-60 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Col 4: Stock Quick Edit Pill -->
        <div class="w-40 shrink-0 flex flex-col items-start md:items-center justify-center">
          <button 
            type="button" 
            class="btn-quick-stock px-4 py-1.5 rounded-full text-[13px] font-semibold ${stockPillClass} transition-all cursor-pointer inline-flex items-center gap-1.5"
            data-product-id="${product.id}"
            title="คลิกเพื่อแก้ไขสต็อกด่วนทันที"
          >
            <span>${totalStock.toLocaleString()} ชิ้น</span>
            <span class="text-[11px] opacity-80">(${stockStatusText})</span>
          </button>
          <span class="text-[11.5px] text-[#424245] font-medium mt-1 hidden md:block">
            ${variants.length > 1 ? `${variants.length} ตัวเลือกขนาด` : '1 ตัวเลือก'}
          </span>
        </div>

        <!-- Col 5: Price Range -->
        <div class="w-28 shrink-0 text-left md:text-right">
          <div class="text-[15px] sm:text-[16px] font-bold text-[#160808] tracking-tight">
            ${priceRangeText}
          </div>
        </div>

        <!-- Col 6: Actions -->
        <div class="w-28 shrink-0 flex items-center justify-start md:justify-end gap-1.5 pt-2 md:pt-0">
          <button 
            type="button" 
            class="btn-edit-drawer px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[#160808] text-white hover:bg-black transition-all cursor-pointer shadow-2xs"
            data-product-id="${product.id}"
          >
            แก้ไข
          </button>
          <a 
            href="/product.html?id=${product.id}" 
            target="_blank" 
            class="p-1.5 rounded-full text-[#424245] hover:text-[#160808] hover:bg-[#EAEAEF] transition-all"
            title="ดูหน้าร้าน (เปิดแท็บใหม่)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button 
            type="button" 
            class="btn-row-delete p-1.5 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            data-product-id="${product.id}"
            title="ลบสินค้า"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

      </div>
    `;
  }).join('');

  dom.productRowsContainer.innerHTML = rowsHTML;

  // Bind Row Selection Checkboxes
  dom.productRowsContainer.querySelectorAll('.row-select-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const pid = cb.getAttribute('data-product-id');
      if (cb.checked) {
        state.selectedProductIds.add(pid);
      } else {
        state.selectedProductIds.delete(pid);
      }
      renderFloatingBatchDock();
      const row = cb.closest('.product-row');
      if (row) {
        if (cb.checked) row.classList.add('bg-neutral-100/70');
        else row.classList.remove('bg-neutral-100/70');
      }
    });
  });

  // Bind Quick Status Buttons
  dom.productRowsContainer.querySelectorAll('.btn-quick-status-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      const curStatus = btn.getAttribute('data-current-status') || 'publish';
      openStatusPopover(btn, pid, curStatus);
    });
  });

  // Bind Quick Stock Buttons
  dom.productRowsContainer.querySelectorAll('.btn-quick-stock').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      openInlineStockModal(pid);
    });
  });

  // Bind Edit Drawer Buttons
  dom.productRowsContainer.querySelectorAll('.btn-edit-drawer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      openProductDrawer(pid);
    });
  });

  // Bind Row Delete Buttons
  dom.productRowsContainer.querySelectorAll('.btn-row-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      const product = state.products.find(p => p.id === pid) || state.allProductsCache.find(p => p.id === pid);
      if (product) {
        openSingleDeleteModal(product);
      }
    });
  });
}

/**
 * Open 1-Click Status Popover Dropdown
 */
function openStatusPopover(buttonEl, productId, currentStatus) {
  if (!dom.globalStatusPopover) return;

  // If already open for this product, close it
  if (state.statusPopoverTarget && state.statusPopoverTarget.productId === productId) {
    closeStatusPopover();
    return;
  }

  state.statusPopoverTarget = {
    productId,
    currentStatus,
    buttonEl
  };

  const rect = buttonEl.getBoundingClientRect();
  const popover = dom.globalStatusPopover;

  // Position below button (fixed element requires viewport coordinates without scroll offsets)
  const top = rect.bottom + 6;
  let left = rect.left + (rect.width / 2) - 88; // 88 = w-44 (176px) / 2
  left = Math.max(12, Math.min(left, window.innerWidth - 188));

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;

  // Highlight active checkmark
  popover.querySelectorAll('.status-option-item').forEach(item => {
    const itemStatus = item.getAttribute('data-status');
    const checkIcon = item.querySelector('.check-icon');
    if (checkIcon) {
      if (itemStatus === currentStatus) {
        checkIcon.classList.remove('hidden');
      } else {
        checkIcon.classList.add('hidden');
      }
    }
  });

  popover.classList.remove('hidden');
  requestAnimationFrame(() => {
    popover.classList.remove('opacity-0', 'scale-95');
    popover.classList.add('opacity-100', 'scale-100');
  });
}

/**
 * Close 1-Click Status Popover Dropdown
 */
function closeStatusPopover() {
  if (!dom.globalStatusPopover) return;
  dom.globalStatusPopover.classList.remove('opacity-100', 'scale-100');
  dom.globalStatusPopover.classList.add('opacity-0', 'scale-95');
  setTimeout(() => {
    if (dom.globalStatusPopover) dom.globalStatusPopover.classList.add('hidden');
  }, 120);
  state.statusPopoverTarget = null;
}

/**
 * Handle Status Selection from Popover
 */
async function handleSelectStatus(newStatus) {
  if (!state.statusPopoverTarget) return;

  const { productId, currentStatus } = state.statusPopoverTarget;
  closeStatusPopover();

  if (newStatus === currentStatus) return;

  // Optimistic In-Memory Update
  const updateStatusInArray = (arr) => {
    const item = arr.find(p => p.id === productId);
    if (item) item.status = newStatus;
  };
  updateStatusInArray(state.products);
  updateStatusInArray(state.allProductsCache);

  // Recalculate summary metrics
  let pubCount = 0, draftCount = 0, suspCount = 0;
  state.allProductsCache.forEach(p => {
    const st = p.status || 'publish';
    if (st === 'publish') pubCount++;
    else if (st === 'draft') draftCount++;
    else if (st === 'suspended') suspCount++;
  });
  state.summary.publish = pubCount;
  state.summary.draft = draftCount;
  state.summary.suspended = suspCount;

  // Re-render UI
  renderProductRows();
  renderMetrics();
  updateStatusPillVisuals();

  const labels = { publish: 'เผยแพร่', draft: 'ฉบับร่าง', suspended: 'ระงับจำหน่าย' };
  const labelText = labels[newStatus] || newStatus;
  showToast(`เปลี่ยนสถานะสินค้าเป็น [${labelText}] สำเร็จ`);

  // Persist to Native Modern PHP 8.1 API (MariaDB)
  try {
    const res = await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_product_status',
        product_id: productId,
        status: newStatus
      }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to update status in database');
    }
    broadcastCatalogUpdate();
  } catch (err) {
    console.error('Status update database error:', err.message);
    showToast('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ: ' + err.message, 'error');
    fetchProducts(state.currentPage);
  }
}

/**
 * Render Pagination Controls
 */
function renderPagination() {
  if (!dom.paginationInfo || !dom.paginationButtons) return;

  const start = state.totalProducts === 0 ? 0 : (state.currentPage - 1) * state.limit + 1;
  const end = Math.min(state.currentPage * state.limit, state.totalProducts);

  dom.paginationInfo.textContent = `แสดง ${start.toLocaleString()} - ${end.toLocaleString()} จาก ${state.totalProducts.toLocaleString()} รายการ (หน้า ${state.currentPage} / ${state.totalPages})`;

  const buttons = [];

  // Prev Button
  const prevDisabled = state.currentPage <= 1;
  buttons.push(`
    <button 
      class="pagination-btn px-3.5 py-1.5 rounded-xl border text-[13px] font-medium transition-all ${prevDisabled ? 'border-gray-200 text-gray-300 pointer-events-none' : 'border-gray-300 text-[#160808] hover:bg-[#160808] hover:text-white cursor-pointer'}" 
      data-page="${state.currentPage - 1}"
      ${prevDisabled ? 'disabled' : ''}
    >
      ก่อนหน้า
    </button>
  `);

  // Compute Page Numbers Range
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= state.totalPages; i++) {
    if (i === 1 || i === state.totalPages || (i >= state.currentPage - delta && i <= state.currentPage + delta)) {
      range.push(i);
    }
  }

  let l = null;
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  rangeWithDots.forEach(p => {
    if (p === '...') {
      buttons.push(`<span class="px-2 py-1.5 text-[13px] text-gray-400 font-medium">...</span>`);
    } else {
      const isActive = p === state.currentPage;
      buttons.push(`
        <button 
          class="pagination-btn px-3.5 py-1.5 rounded-xl border text-[13px] font-semibold transition-all ${isActive ? 'bg-[#160808] text-white border-[#160808] shadow-xs' : 'border-gray-300 text-[#160808] hover:bg-[#EAEAEF] cursor-pointer'}" 
          data-page="${p}"
        >
          ${p}
        </button>
      `);
    }
  });

  // Next Button
  const nextDisabled = state.currentPage >= state.totalPages;
  buttons.push(`
    <button 
      class="pagination-btn px-3.5 py-1.5 rounded-xl border text-[13px] font-medium transition-all ${nextDisabled ? 'border-gray-200 text-gray-300 pointer-events-none' : 'border-gray-300 text-[#160808] hover:bg-[#160808] hover:text-white cursor-pointer'}" 
      data-page="${state.currentPage + 1}"
      ${nextDisabled ? 'disabled' : ''}
    >
      ถัดไป
    </button>
  `);

  dom.paginationButtons.innerHTML = buttons.join('');

  dom.paginationButtons.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'), 10);
      if (page && page !== state.currentPage && page >= 1 && page <= state.totalPages) {
        fetchProducts(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

/**
 * Inline Stock Modal Handlers
 */
function openInlineStockModal(productId) {
  const product = state.products.find(p => p.id === productId) || state.allProductsCache.find(p => p.id === productId);
  if (!product) return;

  state.inlineStockTarget = {
    product,
    variantIndex: 0
  };

  const primaryVariant = product.variants?.[0] || { stock: 0, sku: product.id, size: 'มาตรฐาน' };

  if (dom.modalProductName) dom.modalProductName.textContent = product.name;
  if (dom.modalVariantInfo) {
    dom.modalVariantInfo.textContent = `รหัส SKU: ${primaryVariant.sku || product.id} | ขนาด: ${primaryVariant.size || 'มาตรฐาน'}`;
  }
  if (dom.modalStockInput) {
    dom.modalStockInput.value = primaryVariant.stock ?? 0;
    dom.modalStockInput.focus();
  }

  if (dom.inlineModal && typeof dom.inlineModal.showModal === 'function') {
    dom.inlineModal.showModal();
  }
}

function closeInlineStockModal() {
  if (dom.inlineModal && typeof dom.inlineModal.close === 'function') {
    dom.inlineModal.close();
  }
  state.inlineStockTarget = null;
}

async function handleSaveInlineStock() {
  if (!state.inlineStockTarget || !dom.modalStockInput) return;

  const { product, variantIndex } = state.inlineStockTarget;
  const newStock = Math.max(0, parseInt(dom.modalStockInput.value, 10) || 0);
  const reason = dom.modalReasonSelect ? dom.modalReasonSelect.value : 'ตรวจนับสต็อกประจำงวด';
  const sku = product.variants?.[variantIndex]?.sku || product.id;

  const payload = {
    product_id: product.id,
    sku,
    variant_index: variantIndex,
    new_stock: newStock,
    reason
  };

  try {
    const res = await fetch('/api/admin/stock.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to update stock in database');
    }
  } catch (err) {
    console.error('Stock update database error:', err.message);
    showToast('เกิดข้อผิดพลาดในการอัปเดตสต็อก: ' + err.message, 'error');
    return;
  }

  // Update in-memory state
  if (product.variants && product.variants[variantIndex]) {
    product.variants[variantIndex].stock = newStock;
    product.flags = product.flags || {};
    product.flags.is_in_stock = product.variants.some(v => (v.stock || 0) > 0);
  }

  // Sync to master cache
  const masterItem = state.allProductsCache.find(p => p.id === product.id);
  if (masterItem && masterItem.variants && masterItem.variants[variantIndex]) {
    masterItem.variants[variantIndex].stock = newStock;
    masterItem.flags = masterItem.flags || {};
    masterItem.flags.is_in_stock = masterItem.variants.some(v => (v.stock || 0) > 0);
  }

  closeInlineStockModal();
  renderProductRows();
  renderMetrics();
  showToast(`อัปเดตสต็อก ${sku} เป็น ${newStock.toLocaleString()} ชิ้น สำเร็จ`);
}

/**
 * Canonical 8 Category Definitions & Baseline Industry Brands
 */
const CANONICAL_CATEGORY_MAP = {
  'cat-12': ['cat-12', 'กลุ่มลวดเชื่อม', 'ลวดเชื่อม'],
  'cat-298': ['cat-298', 'ใบตัดใบเจียร', 'ใบตัด', 'ใบเจียร'],
  'cat-312': ['cat-312', 'อุปกรณ์เชื่อมตัดเผาแก๊ส', 'ตัดแก๊ส', 'เกจ์ปรับแรงดันแก๊ส'],
  'cat-327': ['cat-327', 'ท่อบรรจุก๊าซ และวาล์ว', 'ท่อบรรจุก๊าซและวาล์ว', 'ท่อบรรจุก๊าซ'],
  'cat-339': ['cat-339', 'เครื่องเชื่อมและเครื่องตัดพลาสม่า', 'เครื่องเชื่อม'],
  'cat-344': ['cat-344', 'อะไหล่สิ้นเปลือง เครื่องเชื่อม/พลาสม่า', 'อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม', 'อะไหล่สิ้นเปลือง'],
  'cat-382': ['cat-382', 'วัสดุอุปกรณ์เคมีภัณฑ์งานเชื่อม', 'วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม', 'เคมีภัณฑ์'],
  'cat-398': ['cat-398', 'เครื่องมือช่าง']
};

const BASELINE_CATEGORY_BRANDS = {
  'cat-12': ['UDO', 'GEMINI', 'HYUNDAI', 'POWERWELD', 'YAWATA', 'KOBE', 'NSSW', 'NICHIA', 'METRODE', 'BOHLER', 'CHOSUN', 'TASETO', 'LINCOLN', 'ARCWELD', 'KISWEL'],
  'cat-298': ['NKK', 'SUMO', 'YAWATA'],
  'cat-312': ['CHAMP', 'WELDSTAR', 'GOLD', 'NANKAI', 'UDO', 'TANAKA', 'IOXYGEN', 'GASWORK', 'HARRIS'],
  'cat-327': ['CHAMP', 'HERO', 'CHAMPION', 'ตราร่ม'],
  'cat-339': ['AUTOWEL', 'HYUNDAI', 'KENZO'],
  'cat-344': ['TRAFIMET', 'CHAMP', 'KENZO', 'HYUNDAI', 'OTC', 'OPTECH', 'UDO', 'AMERICAN'],
  'cat-382': ['WHALESPRAY', 'NABAKEM', 'CHAMP', 'HARRIS', 'TASETO'],
  'cat-398': ['EMTOP']
};

function getCanonicalCategorySlug(input) {
  if (!input) return 'cat-12';
  const clean = String(input).trim().toLowerCase();
  
  if (CANONICAL_CATEGORY_MAP[clean]) return clean;

  for (const [slug, aliases] of Object.entries(CANONICAL_CATEGORY_MAP)) {
    if (aliases.some(a => a.toLowerCase() === clean)) {
      return slug;
    }
  }

  let bestSlug = 'cat-12';
  let maxMatchLen = 0;
  for (const [slug, aliases] of Object.entries(CANONICAL_CATEGORY_MAP)) {
    for (const a of aliases) {
      const aLower = a.toLowerCase();
      if (clean.includes(aLower) || aLower.includes(clean)) {
        if (aLower.length > maxMatchLen) {
          maxMatchLen = aLower.length;
          bestSlug = slug;
        }
      }
    }
  }

  return bestSlug;
}

function getCategoryDisplayName(input) {
  const slug = getCanonicalCategorySlug(input);
  return CANONICAL_CATEGORY_MAP[slug]?.[1] || input || 'หมวดนี้';
}

/**
 * Brand Taxonomy & Category Scoping Engine
 */
function buildBrandTaxonomy(productsList) {
  const allBrandsMap = new Map();
  const catBrandsMap = new Map();

  // Initialize all 8 canonical categories
  Object.keys(CANONICAL_CATEGORY_MAP).forEach(slug => {
    catBrandsMap.set(slug, new Map());
    const seeds = BASELINE_CATEGORY_BRANDS[slug] || [];
    seeds.forEach(seed => {
      catBrandsMap.get(slug).set(seed, 0);
      if (!allBrandsMap.has(seed)) {
        allBrandsMap.set(seed, 0);
      }
    });
  });

  // Dynamically augment from real products catalog
  if (Array.isArray(productsList)) {
    productsList.forEach(p => {
      const brand = (p.brand || 'UDO').trim();
      if (!brand) return;

      allBrandsMap.set(brand, (allBrandsMap.get(brand) || 0) + 1);

      const rawCat = p.category || (p.categories?.[0]?.name) || (p.categories?.[0]?.url_slug) || '';
      const canonicalSlug = getCanonicalCategorySlug(rawCat);

      if (!catBrandsMap.has(canonicalSlug)) {
        catBrandsMap.set(canonicalSlug, new Map());
      }
      const bMap = catBrandsMap.get(canonicalSlug);
      bMap.set(brand, (bMap.get(brand) || 0) + 1);
    });
  }

  // Sort global brands: items with products first, then alphabetical
  const sortedAll = Array.from(allBrandsMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const byCategoryObj = {};
  catBrandsMap.forEach((bMap, slug) => {
    const list = Array.from(bMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    byCategoryObj[slug] = list;

    // Cross-alias with Thai names
    const aliases = CANONICAL_CATEGORY_MAP[slug] || [];
    aliases.forEach(alias => {
      byCategoryObj[alias] = list;
    });
  });

  state.brandTaxonomy = {
    all: sortedAll,
    byCategory: byCategoryObj
  };
}

function updateBrandClearButtonVisibility() {
  if (!dom.drawerBrandClearBtn || !dom.drawerBrandSearch) return;
  const isDropdownOpen = dom.drawerBrandDropdown && !dom.drawerBrandDropdown.classList.contains('hidden');
  const hasValue = Boolean(dom.drawerBrandSearch.value.trim());
  if (isDropdownOpen && hasValue) {
    dom.drawerBrandClearBtn.classList.remove('hidden');
  } else {
    dom.drawerBrandClearBtn.classList.add('hidden');
  }
}

function openBrandDropdown(query = '') {
  if (!dom.drawerBrandDropdown) return;
  dom.drawerBrandDropdown.classList.remove('hidden');
  if (dom.drawerBrandChevron) dom.drawerBrandChevron.classList.add('rotate-180');
  renderBrandComboboxOptions(query);
  updateBrandClearButtonVisibility();
}

function closeBrandDropdown() {
  if (!dom.drawerBrandDropdown) return;
  dom.drawerBrandDropdown.classList.add('hidden');
  if (dom.drawerBrandChevron) dom.drawerBrandChevron.classList.remove('rotate-180');
  // Revert search input text to currently selected brand if user typed without picking
  const currentBrand = dom.drawerBrand?.value || state.activeProduct?.brand || 'UDO';
  if (dom.drawerBrandSearch) {
    dom.drawerBrandSearch.value = currentBrand;
  }
  updateBrandClearButtonVisibility();
}

function getAvailableBrandsForCurrentScope() {
  if (state.brandScopeMode === 'category' && state.activeProductCategory) {
    const slug = getCanonicalCategorySlug(state.activeProductCategory);
    const list = state.brandTaxonomy.byCategory[slug] || state.brandTaxonomy.byCategory[state.activeProductCategory];
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
  }
  return state.brandTaxonomy.all;
}

function renderBrandComboboxOptions(searchQuery = '') {
  if (!dom.drawerBrandList) return;

  const currentBrand = dom.drawerBrand ? dom.drawerBrand.value.trim() : '';
  const availableBrands = getAvailableBrandsForCurrentScope();
  const q = (searchQuery || '').toLowerCase().trim();

  // Category Header Label
  if (dom.drawerBrandCategoryName) {
    if (state.brandScopeMode === 'category') {
      const friendlyName = getCategoryDisplayName(state.activeProductCategory);
      dom.drawerBrandCategoryName.textContent = `แบรนด์แนะนำใน: ${friendlyName}`;
    } else {
      dom.drawerBrandCategoryName.textContent = 'แบรนด์ทั้งหมดในระบบ UDO';
    }
  }

  // Filter list by search query if user actually typed a query
  const filtered = q
    ? availableBrands.filter(b => b.name.toLowerCase().includes(q))
    : availableBrands;

  if (dom.drawerBrandCountBadge) {
    dom.drawerBrandCountBadge.textContent = `${filtered.length} แบรนด์`;
  }

  if (filtered.length === 0) {
    dom.drawerBrandList.innerHTML = `
      <div class="px-3 py-3 text-xs text-gray-400 text-center">
        ไม่พบแบรนด์ "${escapeHtml(searchQuery)}" ในหมวดนี้
      </div>
    `;
  } else {
    dom.drawerBrandList.innerHTML = filtered.map(b => {
      const isSelected = b.name.toLowerCase() === currentBrand.toLowerCase();
      const countLabel = b.count > 0 ? `${b.count.toLocaleString()} รายการ` : 'แนะนำ';
      return `
        <button 
          type="button" 
          class="brand-option-item w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] flex items-center justify-between transition-colors cursor-pointer ${isSelected ? 'bg-black text-white font-bold shadow-2xs' : 'text-[#160808] font-medium hover:bg-gray-100'}" 
          data-brand="${escapeHtml(b.name)}"
          data-selected="${isSelected ? 'true' : 'false'}"
        >
          <span class="truncate flex items-center gap-1.5">
            ${isSelected ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>' : ''}
            <span>${escapeHtml(b.name)}</span>
          </span>
          <span class="text-[11px] px-2 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-white font-bold' : 'bg-gray-200/80 text-[#424245] font-semibold'} font-mono">
            ${countLabel}
          </span>
        </button>
      `;
    }).join('');

    dom.drawerBrandList.querySelectorAll('.brand-option-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const chosen = btn.getAttribute('data-brand');
        selectBrand(chosen);
      });
    });

    // Auto-scroll selected brand into view when list opens
    if (!q) {
      const selectedBtn = dom.drawerBrandList.querySelector('.brand-option-item[data-selected="true"]');
      if (selectedBtn) {
        requestAnimationFrame(() => {
          selectedBtn.scrollIntoView({ block: 'nearest' });
        });
      }
    }
  }

  // Add new brand button trigger
  const exactMatch = availableBrands.some(b => b.name.toLowerCase() === q);
  if (q && !exactMatch && dom.drawerBrandAddSection && dom.btnAddNewBrandText) {
    dom.drawerBrandAddSection.classList.remove('hidden');
    dom.btnAddNewBrandText.textContent = `+ เพิ่มแบรนด์ใหม่ "${searchQuery}" เข้าสู่หมวดหมู่นี้`;
  } else if (dom.drawerBrandAddSection) {
    dom.drawerBrandAddSection.classList.add('hidden');
  }
}

function selectBrand(brandName) {
  const cleanName = brandName.trim();
  if (!cleanName) return;

  if (dom.drawerBrand) dom.drawerBrand.value = cleanName;
  if (dom.drawerBrandSearch) dom.drawerBrandSearch.value = cleanName;

  if (state.activeProduct) {
    state.activeProduct.brand = cleanName;
  }

  closeBrandDropdown();
  updateDrawerLivePreview();
}

function handleAddNewBrand() {
  const q = dom.drawerBrandSearch ? dom.drawerBrandSearch.value.trim() : '';
  if (!q) return;

  // Add to global taxonomy
  const existsGlobal = state.brandTaxonomy.all.find(b => b.name.toLowerCase() === q.toLowerCase());
  if (existsGlobal) {
    existsGlobal.count = (existsGlobal.count || 0) + 1;
  } else {
    state.brandTaxonomy.all.unshift({ name: q, count: 1 });
  }

  // Add to active category taxonomy
  const canonicalSlug = getCanonicalCategorySlug(state.activeProductCategory);
  if (state.brandTaxonomy.byCategory[canonicalSlug]) {
    const existsCat = state.brandTaxonomy.byCategory[canonicalSlug].find(b => b.name.toLowerCase() === q.toLowerCase());
    if (existsCat) {
      existsCat.count = (existsCat.count || 0) + 1;
    } else {
      state.brandTaxonomy.byCategory[canonicalSlug].unshift({ name: q, count: 1 });
    }
  }

  selectBrand(q);
  showToast(`เพิ่มแบรนด์ใหม่ "${q}" เรียบร้อย`);
}

function initBrandComboboxEvents() {
  if (dom.drawerBrandSearch) {
    // When focusing, show all brands in current category scope and select text for fast replacement
    dom.drawerBrandSearch.addEventListener('focus', () => {
      openBrandDropdown('');
      dom.drawerBrandSearch.select();
    });

    // When clicking the input, open and select text
    dom.drawerBrandSearch.addEventListener('click', () => {
      openBrandDropdown('');
      dom.drawerBrandSearch.select();
    });

    // When user types, filter dynamically
    dom.drawerBrandSearch.addEventListener('input', (e) => {
      openBrandDropdown(e.target.value.trim());
      updateBrandClearButtonVisibility();
    });

    dom.drawerBrandSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeBrandDropdown();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const firstOption = dom.drawerBrandList?.querySelector('.brand-option-item');
        if (firstOption) {
          selectBrand(firstOption.getAttribute('data-brand'));
        } else if (dom.drawerBrandAddSection && !dom.drawerBrandAddSection.classList.contains('hidden')) {
          handleAddNewBrand();
        }
      }
    });
  }

  if (dom.drawerBrandClearBtn) {
    dom.drawerBrandClearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.drawerBrandSearch) {
        dom.drawerBrandSearch.value = '';
        dom.drawerBrandSearch.focus();
      }
      openBrandDropdown('');
      updateBrandClearButtonVisibility();
    });
  }

  if (dom.drawerBrandChevronBtn) {
    dom.drawerBrandChevronBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.drawerBrandDropdown && !dom.drawerBrandDropdown.classList.contains('hidden')) {
        closeBrandDropdown();
      } else {
        openBrandDropdown('');
        dom.drawerBrandSearch?.focus();
        dom.drawerBrandSearch?.select();
      }
    });
  }

  if (dom.drawerBrandScopeToggle) {
    dom.drawerBrandScopeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.brandScopeMode === 'category') {
        state.brandScopeMode = 'all';
        if (dom.drawerBrandScopeText) dom.drawerBrandScopeText.textContent = 'แสดงทุกแบรนด์';
        if (dom.drawerBrandScopeDot) {
          dom.drawerBrandScopeDot.classList.remove('bg-emerald-500');
          dom.drawerBrandScopeDot.classList.add('bg-purple-500');
        }
        dom.drawerBrandScopeToggle.classList.add('bg-neutral-900', 'text-white', 'border-neutral-900');
        dom.drawerBrandScopeToggle.classList.remove('bg-gray-50', 'text-[#424245]', 'border-gray-200');
      } else {
        state.brandScopeMode = 'category';
        if (dom.drawerBrandScopeText) dom.drawerBrandScopeText.textContent = 'เฉพาะหมวดนี้';
        if (dom.drawerBrandScopeDot) {
          dom.drawerBrandScopeDot.classList.remove('bg-purple-500');
          dom.drawerBrandScopeDot.classList.add('bg-emerald-500');
        }
        dom.drawerBrandScopeToggle.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
        dom.drawerBrandScopeToggle.classList.add('bg-gray-50', 'text-[#424245]', 'border-gray-200');
      }
      openBrandDropdown('');
      dom.drawerBrandSearch?.focus();
      dom.drawerBrandSearch?.select();
    });
  }

  if (dom.btnAddNewBrand) {
    dom.btnAddNewBrand.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleAddNewBrand();
    });
  }

  document.addEventListener('click', (e) => {
    if (dom.drawerBrandDropdown && !dom.drawerBrandDropdown.classList.contains('hidden')) {
      const isInside = e.target.closest('#drawer-brand-dropdown') || 
                       e.target.closest('#drawer-brand-search') || 
                       e.target.closest('#drawer-brand-chevron-btn') || 
                       e.target.closest('#drawer-brand-clear-btn') || 
                       e.target.closest('#drawer-brand-scope-toggle');
      if (!isInside) {
        closeBrandDropdown();
      }
    }
  });
}

/**
 * Core 4 Storefront Merchandising Shelves Definitions
 * Directly synchronized with Homepage (index.html) tracks:
 * 1. Best Sellers
 * 2. New Arrivals (Curated & Diverse)
 * 3. Recommended
 * 4. Promotions
 */
const SHELF_DEFINITIONS = [
  {
    id: 'best_seller',
    title: 'สินค้าขายดี',
    enTitle: 'Best Sellers',
    description: 'สินค้าหมุนเวียนเร็ว ยอดขายสูง ช่างและโรงงานหยิบใส่ตะกร้าบ่อยที่สุด',
    badgeClass: 'bg-[#FFF4E5] text-[#9A3412] border-amber-200',
    dotClass: 'bg-amber-500',
    filterFn: (p) => p.storefront_shelves && p.storefront_shelves.best_seller !== null && p.storefront_shelves.best_seller !== undefined
  },
  {
    id: 'new_arrival',
    title: 'สินค้าใหม่คัดพิเศษ',
    enTitle: 'New Arrivals',
    description: 'คัดเฉพาะสินค้าใหม่ตัวท็อป คละหลากหลายประเภท เพื่อไม่ให้หน้าแรกซ้ำซาก',
    badgeClass: 'bg-[#E8F8EE] text-[#0E7A3A] border-emerald-200',
    dotClass: 'bg-emerald-500',
    filterFn: (p) => p.storefront_shelves && p.storefront_shelves.new_arrival !== null && p.storefront_shelves.new_arrival !== undefined
  },
  {
    id: 'recommended',
    title: 'สินค้าแนะนำ',
    enTitle: 'Recommended',
    description: 'สินค้ามาตรฐานคุณภาพสูงที่ทีมงาน UDO คัดสรรเป็นพิเศษสำหรับงานช่าง',
    badgeClass: 'bg-[#F3E8FF] text-[#6B21A8] border-purple-200',
    dotClass: 'bg-purple-500',
    filterFn: (p) => p.storefront_shelves && p.storefront_shelves.recommended !== null && p.storefront_shelves.recommended !== undefined
  },
  {
    id: 'promotion',
    title: 'โปรโมชั่นและดีลพิเศษ',
    enTitle: 'Hot Deals & Promotion',
    description: 'สินค้าจัดรายการพิเศษ ดีลราคาคุ้มค่า และแคมเปญส่งเสริมการขาย',
    badgeClass: 'bg-[#E0F2FE] text-[#0369A1] border-sky-200',
    dotClass: 'bg-sky-500',
    filterFn: (p) => p.storefront_shelves && p.storefront_shelves.promotion !== null && p.storefront_shelves.promotion !== undefined
  }
];

/**
 * Render 4 Storefront Merchandising Shelves (Tab 2)
 */
function renderMerchandisingShelves() {
  if (!dom.merchandisingShelvesContainer) return;

  dom.merchandisingShelvesContainer.innerHTML = SHELF_DEFINITIONS.map(shelf => {
    let items = state.allProductsCache.filter(shelf.filterFn);
    items.sort((a, b) => ((a.storefront_shelves?.[shelf.id] ?? 9999) - (b.storefront_shelves?.[shelf.id] ?? 9999)));

    const isExpanded = state.expandedShelves.has(shelf.id);
    const count = items.length;

    // Compact view: displays cards in a horizontal swipeable track (5 items per screen width)
    // Expanded view: displays cards in a multi-row responsive grid
    const trackClasses = isExpanded
      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 pt-1 transition-all'
      : 'admin-shelf-track-compact no-scrollbar transition-all';

    let cardsHTML = '';
    if (count === 0) {
      cardsHTML = `
        <div class="col-span-full w-full bg-[#F9F9FB] rounded-2xl p-8 text-center border border-black/[0.04]">
          <p class="text-xs font-semibold text-[#160808]">ยังไม่มีสินค้าในแถว ${shelf.title}</p>
          <p class="text-[11px] text-[#424245] mt-0.5">กดปุ่ม "+ เลือกสินค้าเข้าแถวนี้" ด้านบนเพื่อนำสินค้าเข้ามาจัดผัง</p>
        </div>
      `;
    } else {
      cardsHTML = items.map((product, index) => {
        const rawImage = (product.images && product.images.length > 0) ? product.images[0] : null;
        const thumb = resolveImageSrc(rawImage, 'card');
        const rank = product.storefront_shelves?.[shelf.id] ?? (index + 1);
        const isFirst = index === 0;
        const isLast = index === count - 1;
        const priceText = computePriceRange(product);
        const primarySku = product.variants?.[0]?.sku || product.id;

        // Status & Availability Badges
        let statusBadgeHTML = '';
        if (product.status === 'draft') {
          statusBadgeHTML = `<span class="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">แบบร่าง (ซ่อนหน้าบ้าน)</span>`;
        } else if (product.status === 'suspended') {
          statusBadgeHTML = `<span class="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">ระงับจำหน่าย</span>`;
        }

        let availBadgeHTML = '';
        if (product.availability === 'out_of_stock') {
          availBadgeHTML = `<span class="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">หมดสต็อก</span>`;
        } else if (product.availability === 'special_order') {
          availBadgeHTML = `<span class="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">สั่งพิเศษ</span>`;
        } else {
          availBadgeHTML = `<span class="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">พร้อมส่ง</span>`;
        }

        // Card sizing: compact mode is 220px fixed width, expanded mode is full grid cell
        const cardSizingClass = isExpanded 
          ? 'w-full min-w-0' 
          : 'admin-shelf-card-compact';

        return `
          <div class="shelf-item-card ${cardSizingClass} bg-white rounded-2xl p-3.5 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between group relative" data-product-id="${product.id}" data-shelf-id="${shelf.id}">
            
            <!-- Top Row: Clickable Rank Badge & Move Controls -->
            <div class="flex items-center justify-between gap-1.5 mb-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                <!-- Rank Badge Button (Click to Open Quick Move Popover) -->
                <button 
                  type="button" 
                  class="btn-open-rank-popover inline-flex items-center gap-1 h-6 px-2 rounded-lg bg-[#160808] text-white text-[11px] font-bold font-mono shadow-xs hover:bg-black hover:ring-2 hover:ring-black/20 active:scale-95 transition-all cursor-pointer group/rank"
                  data-shelf-id="${shelf.id}" 
                  data-product-id="${product.id}" 
                  data-rank="${rank}" 
                  data-total-count="${count}"
                  data-product-name="${escapeHtml(product.name)}"
                  title="คลิกเพื่อเปิดหน้าต่างย้ายลำดับ (อันดับ #${rank} จากทั้งหมด ${count} รายการ)"
                >
                  <span class="text-white/60 text-[10px]">#</span><span>${rank}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 text-white/50 group-hover/rank:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                ${availBadgeHTML}
                ${statusBadgeHTML}
              </div>

              <!-- Move Controls: Move to Top + Up / Down -->
              <div class="flex items-center gap-0.5 bg-[#EAEAEF] p-0.5 rounded-lg shrink-0">
                <button 
                  type="button" 
                  class="btn-shelf-move-top w-5 h-5 rounded flex items-center justify-center transition-all ${isFirst ? 'text-gray-300 pointer-events-none' : 'text-[#160808] hover:bg-white cursor-pointer shadow-2xs'}" 
                  data-shelf-id="${shelf.id}"
                  data-product-id="${product.id}"
                  title="ย้ายไปอยู่อันดับ 1 ทันที (หัวแถว)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                  </svg>
                </button>
                <button 
                  type="button" 
                  class="btn-shelf-move-up w-5 h-5 rounded flex items-center justify-center transition-all ${isFirst ? 'text-gray-300 pointer-events-none' : 'text-[#160808] hover:bg-white cursor-pointer shadow-2xs'}" 
                  data-shelf-id="${shelf.id}"
                  data-rank="${index}"
                  title="เลื่อนขึ้น 1 ลำดับ"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  type="button" 
                  class="btn-shelf-move-down w-5 h-5 rounded flex items-center justify-center transition-all ${isLast ? 'text-gray-300 pointer-events-none' : 'text-[#160808] hover:bg-white cursor-pointer shadow-2xs'}" 
                  data-shelf-id="${shelf.id}"
                  data-rank="${index}"
                  title="เลื่อนลง 1 ลำดับ"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Product Image Preview -->
            <div class="admin-shelf-img-box">
              <img src="${thumb}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.src='https://via.placeholder.com/150x150/F2F2F7/8E8E93?text=UDO'">
            </div>

            <!-- Product Details -->
            <div class="space-y-1 flex-1 min-w-0">
              <div class="flex items-center gap-1.5 text-[10px] font-semibold text-[#424245]">
                <span class="truncate">${product.brand || 'UDO'}</span>
                <span>&middot;</span>
                <span class="font-mono text-gray-400 truncate">${primarySku}</span>
              </div>
              <h4 class="text-[12.5px] font-semibold text-[#160808] line-clamp-2 leading-snug" title="${product.name}">
                ${product.name}
              </h4>
              <div class="text-[13px] font-bold text-[#160808] pt-0.5">
                ${priceText}
              </div>
            </div>

            <!-- Quick Action Row: Remove & Edit -->
            <div class="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between gap-1">
              <button 
                type="button" 
                class="btn-shelf-remove text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                data-product-id="${product.id}"
                data-shelf-id="${shelf.id}"
                title="นำออกจากแถว ${shelf.title}"
              >
                นำออก
              </button>
              <button 
                type="button" 
                class="btn-shelf-edit text-xs font-semibold text-[#160808] hover:underline cursor-pointer"
                data-product-id="${product.id}"
              >
                แก้ไข &rarr;
              </button>
            </div>

          </div>
        `;
      }).join('');
    }

    return `
      <div class="shelf-wrapper bg-white rounded-2xl md:rounded-3xl p-5 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4 min-w-0 max-w-full overflow-hidden" data-shelf-id="${shelf.id}">
        
        <!-- Shelf Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="w-2.5 h-2.5 rounded-full ${shelf.dotClass}"></span>
              <h3 class="text-base font-bold text-[#160808]">${shelf.title}</h3>
              <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAEAEF] text-[#424245]">
                ${count} รายการ
              </span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full border ${shelf.badgeClass}">
                ${shelf.enTitle}
              </span>
            </div>
            <p class="text-xs text-[#424245]">
              ${shelf.description} ${!isExpanded ? '(แสดง 5 รายการแรกตามมุมมองหน้าแรก ปัดขวาเพื่อดูเพิ่ม)' : '(มุมมองผังเต็ม)'}
            </p>
          </div>

          <!-- Actions: Add to Shelf + Horizontal Scroll Arrows + Expand/Collapse Toggle -->
          <div class="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            <!-- Scroll Arrows (visible in compact row mode) -->
            <div class="items-center gap-1 bg-[#EAEAEF] p-0.5 rounded-full ${isExpanded ? 'hidden' : 'flex'}">
              <button 
                type="button" 
                class="btn-shelf-scroll-left w-6 h-6 rounded-full flex items-center justify-center text-[#160808] hover:bg-white transition-all cursor-pointer" 
                data-shelf-id="${shelf.id}" 
                title="เลื่อนไปทางซ้าย"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                type="button" 
                class="btn-shelf-scroll-right w-6 h-6 rounded-full flex items-center justify-center text-[#160808] hover:bg-white transition-all cursor-pointer" 
                data-shelf-id="${shelf.id}" 
                title="เลื่อนไปทางขวา"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button 
              type="button" 
              class="btn-open-shelf-picker inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#160808] text-white hover:bg-black transition-all shadow-xs cursor-pointer"
              data-shelf-id="${shelf.id}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>+ เลือกสินค้าเข้าแถวนี้</span>
            </button>

            <button 
              type="button" 
              class="btn-toggle-shelf-expand inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${isExpanded ? 'bg-black/10 text-black' : 'bg-[#EAEAEF] text-[#424245] hover:text-black'} transition-all cursor-pointer"
              data-shelf-id="${shelf.id}"
            >
              <span>${isExpanded ? 'พับเก็บ (แถวเดียว)' : 'คลี่ดูผังเต็ม'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Shelf Products Track / Grid -->
        <div id="shelf-track-${shelf.id}" class="${trackClasses}">
          ${cardsHTML}
        </div>

      </div>
    `;
  }).join('');

  attachShelfEvents();
}

/**
 * Attach dynamic events for the 4 shelves
 */
function attachShelfEvents() {
  if (!dom.merchandisingShelvesContainer) return;

  // 1. Horizontal Scroll Left / Right Buttons
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-scroll-left').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      const track = document.getElementById(`shelf-track-${shelfId}`);
      if (track) track.scrollBy({ left: -460, behavior: 'smooth' });
    });
  });

  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-scroll-right').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      const track = document.getElementById(`shelf-track-${shelfId}`);
      if (track) track.scrollBy({ left: 460, behavior: 'smooth' });
    });
  });

  // 1. Open Curation Picker per Shelf
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-open-shelf-picker').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      openCurationPicker(shelfId);
    });
  });

  // 2. Toggle Expand / Collapse per Shelf
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-toggle-shelf-expand').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      if (state.expandedShelves.has(shelfId)) {
        state.expandedShelves.delete(shelfId);
      } else {
        state.expandedShelves.add(shelfId);
      }
      renderMerchandisingShelves();
    });
  });

  // 3. Move to Top in Shelf
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-move-top').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      const pid = btn.getAttribute('data-product-id');
      handleDirectRankChange(shelfId, pid, 1);
    });
  });

  // 4. Move Up in Shelf
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-move-up').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      const rank = parseInt(btn.getAttribute('data-rank'), 10);
      handleReorderInShelf(shelfId, rank, -1);
    });
  });

  // 5. Move Down in Shelf
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-move-down').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      const rank = parseInt(btn.getAttribute('data-rank'), 10);
      handleReorderInShelf(shelfId, rank, 1);
    });
  });

  // 6. Open Quick Move Popover
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-open-rank-popover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shelfId = btn.getAttribute('data-shelf-id');
      const pid = btn.getAttribute('data-product-id');
      const rank = btn.getAttribute('data-rank');
      const count = btn.getAttribute('data-total-count');
      const name = btn.getAttribute('data-product-name');
      openShelfRankPopover(btn, shelfId, pid, rank, count, name);
    });
  });

  // 7. Remove from Shelf
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      const shelfId = btn.getAttribute('data-shelf-id');
      handleRemoveFromShelf(pid, shelfId);
    });
  });

  // 8. Edit Product Drawer
  dom.merchandisingShelvesContainer.querySelectorAll('.btn-shelf-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      openProductDrawer(pid);
    });
  });
}

/**
 * Open Shelf Rank Quick Move Popover
 */
function openShelfRankPopover(triggerEl, shelfId, productId, currentRank, totalCount, productName) {
  if (!dom.shelfRankPopover) return;

  // If already open for this product, close it
  if (state.shelfRankPopoverTarget && state.shelfRankPopoverTarget.productId === productId && state.shelfRankPopoverTarget.shelfId === shelfId) {
    closeShelfRankPopover();
    return;
  }

  const parsedCurrentRank = parseInt(currentRank, 10) || 1;
  const parsedTotalCount = parseInt(totalCount, 10) || 1;

  state.shelfRankPopoverTarget = {
    triggerEl,
    shelfId,
    productId,
    currentRank: parsedCurrentRank,
    totalCount: parsedTotalCount,
    productName
  };

  const popover = dom.shelfRankPopover;
  if (dom.rankPopoverProductName) dom.rankPopoverProductName.textContent = productName || productId;
  if (dom.rankPopoverCurrentInfo) dom.rankPopoverCurrentInfo.textContent = `ตำแหน่งปัจจุบัน: อันดับ #${parsedCurrentRank} จากทั้งหมด ${parsedTotalCount} รายการ`;
  if (dom.rankPopoverInput) dom.rankPopoverInput.value = parsedCurrentRank;

  // Preset buttons: update last preset label and data
  const lastPresetBtn = popover.querySelector('.btn-rank-preset[data-preset="last"]');
  if (lastPresetBtn) {
    lastPresetBtn.textContent = `#${parsedTotalCount} ท้ายแถว`;
    lastPresetBtn.setAttribute('data-target-rank', parsedTotalCount);
  }

  // Calculate position relative to triggerEl (fixed viewport coordinates)
  const rect = triggerEl.getBoundingClientRect();
  const popoverWidth = 288;
  const popoverHeight = 240;

  let top = rect.bottom + 8;
  if (top + popoverHeight > window.innerHeight && rect.top - popoverHeight > 10) {
    top = rect.top - popoverHeight - 8;
  }

  let left = rect.left + (rect.width / 2) - (popoverWidth / 2);
  left = Math.max(12, Math.min(left, window.innerWidth - popoverWidth - 12));

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;

  popover.classList.remove('hidden');
  requestAnimationFrame(() => {
    popover.classList.remove('opacity-0', 'scale-95');
    popover.classList.add('opacity-100', 'scale-100');
    setTimeout(() => {
      if (dom.rankPopoverInput) {
        dom.rankPopoverInput.focus();
        dom.rankPopoverInput.select();
      }
    }, 50);
  });
}

/**
 * Close Shelf Rank Quick Move Popover
 */
function closeShelfRankPopover() {
  if (!dom.shelfRankPopover) return;
  dom.shelfRankPopover.classList.remove('opacity-100', 'scale-100');
  dom.shelfRankPopover.classList.add('opacity-0', 'scale-95');
  setTimeout(() => {
    if (dom.shelfRankPopover) dom.shelfRankPopover.classList.add('hidden');
  }, 120);
  state.shelfRankPopoverTarget = null;
}

/**
 * Submit Shelf Rank Quick Move
 */
async function submitShelfRankPopover(targetRankValue) {
  if (!state.shelfRankPopoverTarget) return;
  const { shelfId, productId, currentRank } = state.shelfRankPopoverTarget;
  closeShelfRankPopover();

  const rankNum = parseInt(targetRankValue, 10);
  if (isNaN(rankNum) || rankNum === currentRank) {
    return;
  }
  await handleDirectRankChange(shelfId, productId, rankNum);
}

/**
 * Handle Direct Rank Change (Jump / Splice & Shift) within a specific Shelf
 */
async function handleDirectRankChange(shelfId, productId, targetRank) {
  const shelfDef = SHELF_DEFINITIONS.find(s => s.id === shelfId);
  if (!shelfDef) return;

  let items = state.allProductsCache.filter(shelfDef.filterFn);
  items.sort((a, b) => ((a.storefront_shelves?.[shelfId] ?? 9999) - (b.storefront_shelves?.[shelfId] ?? 9999)));

  const currentIndex = items.findIndex(p => p.id === productId);
  if (currentIndex === -1) return;

  const parsedRank = parseInt(targetRank, 10);
  if (isNaN(parsedRank)) {
    renderMerchandisingShelves();
    return;
  }

  const clampedRank = Math.max(1, Math.min(items.length, parsedRank));
  const targetIndex = clampedRank - 1;

  if (targetIndex === currentIndex) {
    renderMerchandisingShelves();
    return;
  }

  // Splice and Shift: remove from currentIndex and insert at targetIndex
  const [movedProduct] = items.splice(currentIndex, 1);
  items.splice(targetIndex, 0, movedProduct);

  // Re-index sequentially 1, 2, 3...
  items.forEach((p, idx) => {
    p.storefront_shelves = p.storefront_shelves || {};
    p.storefront_shelves[shelfId] = idx + 1;
  });

  const orderedIds = items.map(p => p.id);

  try {
    await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reorder_shelf',
        shelf: shelfId,
        ordered_ids: orderedIds,
        admin_user: 'admin'
      })
    });
    broadcastCatalogUpdate();
  } catch (err) {
    console.warn('Reorder API notice:', err.message);
  }

  renderMerchandisingShelves();
  showToast(`ย้ายสินค้า "${movedProduct.name}" ไปยังลำดับที่ #${clampedRank} เรียบร้อย (สินค้าเดิมเลื่อนลง 1 ลำดับ)`);

  // Auto-scroll and flash highlight on the moved card
  setTimeout(() => {
    const movedCard = document.querySelector(`.shelf-item-card[data-product-id="${productId}"][data-shelf-id="${shelfId}"]`);
    if (movedCard) {
      movedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      movedCard.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-50/40');
      setTimeout(() => {
        movedCard.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-50/40');
      }, 1500);
    }
  }, 100);
}

/**
 * Handle Reordering within a specific Shelf
 */
async function handleReorderInShelf(shelfId, currentIndex, offset) {
  const shelfDef = SHELF_DEFINITIONS.find(s => s.id === shelfId);
  if (!shelfDef) return;

  let items = state.allProductsCache.filter(shelfDef.filterFn);
  items.sort((a, b) => ((a.storefront_shelves?.[shelfId] ?? 9999) - (b.storefront_shelves?.[shelfId] ?? 9999)));

  const targetIndex = currentIndex + offset;
  if (targetIndex < 0 || targetIndex >= items.length) return;

  const currentProduct = items[currentIndex];
  const targetProduct = items[targetIndex];

  // Swap in array
  items[currentIndex] = targetProduct;
  items[targetIndex] = currentProduct;

  // Re-index sequentially 1, 2, 3...
  items.forEach((p, idx) => {
    p.storefront_shelves = p.storefront_shelves || {};
    p.storefront_shelves[shelfId] = idx + 1;
  });

  const orderedIds = items.map(p => p.id);

  try {
    await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reorder_shelf',
        shelf: shelfId,
        ordered_ids: orderedIds,
        admin_user: 'admin'
      })
    });
    broadcastCatalogUpdate();
  } catch (err) {
    console.warn('Reorder API notice:', err.message);
  }

  renderMerchandisingShelves();
  showToast(`สลับลำดับสินค้า #${currentIndex + 1} กับ #${targetIndex + 1} เรียบร้อย`);

  // Auto-scroll and flash highlight on the moved card
  setTimeout(() => {
    const movedCard = document.querySelector(`.shelf-item-card[data-product-id="${currentProduct.id}"][data-shelf-id="${shelfId}"]`);
    if (movedCard) {
      movedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      movedCard.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-50/40');
      setTimeout(() => {
        movedCard.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-50/40');
      }, 1500);
    }
  }, 100);
}

/**
 * Remove a single product from a specific shelf
 */
async function handleRemoveFromShelf(productId, shelfId) {
  const product = state.allProductsCache.find(p => p.id === productId);
  if (!product) return;

  const shelfDef = SHELF_DEFINITIONS.find(s => s.id === shelfId);
  const fieldLabel = shelfDef ? shelfDef.title : 'แถวสินค้า';

  product.storefront_shelves = product.storefront_shelves || {};
  product.storefront_shelves[shelfId] = null;
  product.flags = product.flags || {};
  if (shelfId === 'best_seller') product.flags.is_best_seller = false;
  else if (shelfId === 'new_arrival') product.flags.is_new_arrival = false;
  else if (shelfId === 'recommended') product.flags.is_recommended = false;
  else if (shelfId === 'promotion') product.flags.is_promotion = false;

  // Re-index remaining in cache
  let remaining = state.allProductsCache.filter(shelfDef.filterFn);
  remaining.sort((a, b) => ((a.storefront_shelves?.[shelfId] ?? 9999) - (b.storefront_shelves?.[shelfId] ?? 9999)));
  remaining.forEach((p, idx) => {
    p.storefront_shelves[shelfId] = idx + 1;
  });

  try {
    await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'remove_from_shelf',
        shelf: shelfId,
        product_id: productId,
        admin_user: 'admin'
      })
    });
  } catch (err) {
    console.warn('Remove from shelf notice:', err.message);
  }

  recalculateMetrics();
  renderMetrics();
  renderMerchandisingShelves();
  showToast(`นำ "${product.name}" ออกจาก ${fieldLabel} เรียบร้อย`);
}

/**
 * Check if a product is already tagged in the current curation scope
 */
function isProductInCurrentScope(product) {
  if (!product) return false;
  const scope = state.curationTargetScope;
  return Boolean(product.storefront_shelves?.[scope]);
}

/**
 * Open Curation Multi-Select Picker Modal scoped to a specific shelf
 */
function openCurationPicker(shelfId = 'best_seller') {
  if (!dom.pickerModal) return;

  state.curationTargetScope = shelfId;
  const shelfDef = SHELF_DEFINITIONS.find(s => s.id === shelfId);
  const shelfTitle = shelfDef ? shelfDef.title : shelfId;

  if (dom.pickerModalTitle) {
    dom.pickerModalTitle.textContent = `เลือกสินค้าเข้าแถว: ${shelfTitle}`;
  }

  state.pickerSelectedIds.clear();
  state.pickerSearchQuery = '';
  state.pickerCategoryFilter = 'all';
  state.pickerFilterUnselected = false;

  if (dom.pickerSearchInput) dom.pickerSearchInput.value = '';
  if (dom.pickerCategoryFilter) dom.pickerCategoryFilter.value = 'all';
  if (dom.pickerFilterUnselected) dom.pickerFilterUnselected.checked = false;
  if (dom.pickerSelectAll) dom.pickerSelectAll.checked = false;

  renderPickerCandidates();
  dom.pickerModal.showModal();
}

/**
 * Close Curation Multi-Select Picker Modal
 */
function closeCurationPicker() {
  if (dom.pickerModal && dom.pickerModal.open) {
    dom.pickerModal.close();
  }
  state.pickerSelectedIds.clear();
}

/**
 * Render candidate rows inside Curation Picker Modal
 */
function renderPickerCandidates() {
  if (!dom.pickerProductList) return;

  let candidates = [...state.allProductsCache];

  // 1. Search Query
  if (state.pickerSearchQuery) {
    const q = state.pickerSearchQuery.toLowerCase();
    candidates = candidates.filter(p => {
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchEn = (p.name_en || '').toLowerCase().includes(q);
      const matchBrand = (p.brand || '').toLowerCase().includes(q);
      const matchId = (p.id || '').toLowerCase().includes(q);
      const matchSku = Array.isArray(p.variants) && p.variants.some(v => (v.sku || '').toLowerCase().includes(q));
      return matchName || matchEn || matchBrand || matchId || matchSku;
    });
  }

  // 2. Category Filter
  if (state.pickerCategoryFilter !== 'all') {
    candidates = candidates.filter(p => {
      const cat = p.category || '';
      const cats = p.categories || [];
      return cat.includes(state.pickerCategoryFilter) || cats.some(c => (c.name || '').includes(state.pickerCategoryFilter));
    });
  }

  // 3. Filter unselected (hide already in collection)
  if (state.pickerFilterUnselected) {
    candidates = candidates.filter(p => !isProductInCurrentScope(p));
  }

  // Update counters
  const totalSelected = state.pickerSelectedIds.size;
  if (dom.pickerSelectedCount) dom.pickerSelectedCount.textContent = totalSelected.toLocaleString();
  if (dom.pickerBtnCount) dom.pickerBtnCount.textContent = totalSelected.toLocaleString();
  if (dom.pickerSubmitBtn) dom.pickerSubmitBtn.disabled = totalSelected === 0;

  if (candidates.length === 0) {
    dom.pickerProductList.innerHTML = `
      <div class="py-12 text-center text-gray-400">
        <p class="text-sm font-semibold text-gray-600">ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        <p class="text-xs text-gray-400 mt-1">ลองเปลี่ยนคำค้นหา หรือปลดตัวกรองหมวดหมู่</p>
      </div>
    `;
    return;
  }

  // Render items (display up to 150 items for snappy performance)
  const displayItems = candidates.slice(0, 150);

  dom.pickerProductList.innerHTML = displayItems.map(product => {
    const isSelected = state.pickerSelectedIds.has(product.id);
    const alreadyInScope = isProductInCurrentScope(product);
    const rawImage = (product.images && product.images.length > 0) ? product.images[0] : null;
    const thumb = resolveImageSrc(rawImage, 'thumb');
    const priceText = computePriceRange(product);
    const primarySku = product.variants?.[0]?.sku || product.id;

    return `
      <div class="picker-candidate-row flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-black/5 border-black/30' : 'bg-white border-black/[0.06] hover:bg-gray-50'}" data-product-id="${product.id}">
        <div class="flex items-center gap-3 min-w-0">
          <input 
            type="checkbox" 
            class="picker-item-checkbox w-4 h-4 accent-black rounded cursor-pointer shrink-0" 
            data-product-id="${product.id}"
            ${isSelected ? 'checked' : ''}
          >
          <div class="w-11 h-11 rounded-xl bg-[#F2F2F7] flex items-center justify-center p-1 shrink-0 overflow-hidden border border-black/[0.04]">
            <img src="${thumb}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply" loading="lazy" onerror="this.src='https://via.placeholder.com/80x80/F2F2F7/8E8E93?text=UDO'">
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[11px] font-semibold text-[#160808] bg-[#EAEAEF] px-2 py-0.5 rounded">
                ${primarySku}
              </span>
              <span class="text-xs font-semibold text-[#424245]">
                ${product.brand || 'UDO'}
              </span>
              ${alreadyInScope ? '<span class="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">อยู่ในกลุ่มแล้ว</span>' : ''}
            </div>
            <p class="text-[13px] font-semibold text-[#160808] truncate mt-0.5" title="${product.name}">
              ${product.name}
            </p>
          </div>
        </div>

        <div class="text-right shrink-0 pl-3">
          <span class="text-xs font-bold text-[#160808] block">${priceText}</span>
          <span class="text-[11px] text-gray-400 font-mono">${product.category || 'หมวดทั่วไป'}</span>
        </div>
      </div>
    `;
  }).join('');

  // Bind candidate click & checkbox events
  dom.pickerProductList.querySelectorAll('.picker-candidate-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('picker-item-checkbox')) return;
      const pid = row.getAttribute('data-product-id');
      togglePickerSelection(pid);
    });
  });

  dom.pickerProductList.querySelectorAll('.picker-item-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const pid = cb.getAttribute('data-product-id');
      togglePickerSelection(pid);
    });
  });
}

function togglePickerSelection(productId) {
  if (state.pickerSelectedIds.has(productId)) {
    state.pickerSelectedIds.delete(productId);
  } else {
    state.pickerSelectedIds.add(productId);
  }
  renderPickerCandidates();
}

/**
 * Batch add selected products into current collection
 */
async function handleBatchAddToCollection() {
  if (state.pickerSelectedIds.size === 0) {
    showToast('กรุณาเลือกสินค้าอย่างน้อย 1 รายการ');
    return;
  }

  const selectedIds = Array.from(state.pickerSelectedIds);
  const scope = state.curationTargetScope;
  const shelfDef = SHELF_DEFINITIONS.find(s => s.id === scope);
  const scopeLabel = shelfDef ? shelfDef.title : 'แถวสินค้า';

  // Find current max rank in this shelf
  let maxRank = 0;
  state.allProductsCache.forEach(p => {
    const r = p.storefront_shelves?.[scope];
    if (r !== null && r !== undefined && Number(r) > maxRank) {
      maxRank = Number(r);
    }
  });

  selectedIds.forEach(pid => {
    const product = state.allProductsCache.find(p => p.id === pid);
    if (!product) return;
    product.storefront_shelves = product.storefront_shelves || {};
    if (!product.storefront_shelves[scope]) {
      maxRank++;
      product.storefront_shelves[scope] = maxRank;
    }
    product.flags = product.flags || {};
    if (scope === 'best_seller') {
      product.flags.is_best_seller = true;
    } else if (scope === 'new_arrival') {
      product.flags.is_new_arrival = true;
      product.collections = product.collections || [];
      if (!product.collections.includes('new-arrival')) product.collections.push('new-arrival');
    } else if (scope === 'recommended') {
      product.flags.is_recommended = true;
    } else if (scope === 'promotion') {
      product.flags.is_promotion = true;
    }
  });

  try {
    const res = await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'batch_curate',
        scope: scope,
        product_ids: selectedIds,
        mode: 'add'
      })
    });
    if (res.ok) {
      const data = await res.json();
      broadcastCatalogUpdate();
    }
  } catch (err) {
    console.warn('Batch curate API notice:', err.message);
  }

  closeCurationPicker();
  recalculateMetrics();
  renderMetrics();
  renderMerchandisingShelves();
  showToast(`เพิ่มสินค้า ${selectedIds.length} รายการเข้า ${scopeLabel} เรียบร้อย`);
}

async function saveSingleProductField(productId, partialData) {
  const target = state.allProductsCache.find(p => p.id === productId);
  if (!target) return;

  const merged = {
    ...target,
    ...partialData
  };

  try {
    await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged)
    });
  } catch (err) {
    console.warn('Background save notice:', err.message);
  }
}

function recalculateMetrics() {
  const all = state.allProductsCache;
  state.summary.total = all.length;
  state.summary.in_stock = all.filter(p => p.variants && p.variants.some(v => (v.stock || 0) > 0)).length;
  state.summary.out_of_stock = state.summary.total - state.summary.in_stock;
  state.summary.best_seller = all.filter(p => p.flags?.is_best_seller).length;
  state.summary.recommended = all.filter(p => p.flags?.is_recommended).length;
  state.summary.promotion = all.filter(p => p.flags?.is_promotion).length;
}

/**
 * Switch Editor Tabs inside Wide Workbench Modal
 */
function switchEditorTab(tabId) {
  const tabsBar = document.getElementById('editor-tabs-bar');
  if (tabsBar) {
    tabsBar.querySelectorAll('.tab-btn').forEach(btn => {
      const isTarget = btn.dataset.tab === tabId;
      if (isTarget) {
        btn.className = 'tab-btn active flex-1 py-2.5 px-3 rounded-xl text-[13px] font-bold bg-[#160808] text-white transition-all cursor-pointer text-center whitespace-nowrap shadow-xs';
      } else {
        btn.className = 'tab-btn flex-1 py-2.5 px-3 rounded-xl text-[13px] font-semibold text-[#424245] hover:text-[#160808] hover:bg-gray-100 transition-all cursor-pointer text-center whitespace-nowrap';
      }
    });
  }

  // Quick Tab Shortcuts in Right Preview Column
  document.querySelectorAll('.btn-quick-tab').forEach(qBtn => {
    const isTarget = qBtn.dataset.target === tabId;
    if (isTarget) {
      qBtn.className = 'btn-quick-tab py-2 px-2.5 bg-[#160808] text-white rounded-lg text-xs sm:text-[12.5px] font-bold text-left cursor-pointer transition-colors shadow-2xs';
    } else {
      qBtn.className = 'btn-quick-tab py-2 px-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs sm:text-[12.5px] font-medium text-[#160808] text-left cursor-pointer transition-colors';
    }
  });

  const targetSuffix = tabId.replace('tab-', '');
  const panelIds = ['panel-basic', 'panel-variants', 'panel-specs', 'panel-rich'];
  panelIds.forEach(pId => {
    const el = document.getElementById(pId);
    if (el) {
      if (pId === `panel-${targetSuffix}`) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });
}

/**
 * Slide-Over WYSIWYG Drawer Handlers
 */
function openProductDrawer(productId) {
  const product = state.products.find(p => p.id === productId) || state.allProductsCache.find(p => p.id === productId);
  if (!product) return;

  state.isCreateMode = false;
  switchEditorTab('tab-basic');
  if (dom.drawerTitle) dom.drawerTitle.textContent = 'แก้ไขข้อมูลสินค้า & WYSIWYG Workbench';
  if (dom.drawerSaveBtn) dom.drawerSaveBtn.textContent = 'บันทึกข้อมูลหน้าบ้านทันที';

  state.activeProduct = JSON.parse(JSON.stringify(product));

  if (dom.drawerPid) dom.drawerPid.value = state.activeProduct.id;
  if (dom.drawerSkuLabel) dom.drawerSkuLabel.textContent = `SKU: ${state.activeProduct.variants?.[0]?.sku || state.activeProduct.id}`;
  if (dom.drawerName) dom.drawerName.value = state.activeProduct.name || '';
  if (dom.drawerNameEn) dom.drawerNameEn.value = state.activeProduct.name_en || '';
  if (dom.drawerSortPriority) dom.drawerSortPriority.value = state.activeProduct.sort_priority ?? 100;

  // Resolve Category for brand combobox
  let catName = state.activeProduct.category || '';
  if (!catName && Array.isArray(state.activeProduct.categories) && state.activeProduct.categories.length > 0) {
    catName = state.activeProduct.categories[0].name || state.activeProduct.categories[0].id || '';
  }
  if (!catName) catName = 'กลุ่มลวดเชื่อม';
  state.activeProductCategory = catName;
  state.brandScopeMode = 'category';

  if (dom.drawerCategory) {
    let matchedOption = false;
    for (const opt of dom.drawerCategory.options) {
      if (opt.getAttribute('data-name') === catName || opt.value === catName || opt.text.includes(catName)) {
        dom.drawerCategory.value = opt.value;
        matchedOption = true;
        break;
      }
    }
    if (!matchedOption) dom.drawerCategory.value = 'cat-12';
  }

  state.brandScopeMode = 'category';
  if (dom.drawerBrandScopeToggle) {
    if (dom.drawerBrandScopeText) dom.drawerBrandScopeText.textContent = 'เฉพาะหมวดนี้';
    if (dom.drawerBrandScopeDot) {
      dom.drawerBrandScopeDot.classList.remove('bg-purple-500');
      dom.drawerBrandScopeDot.classList.add('bg-emerald-500');
    }
    dom.drawerBrandScopeToggle.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
    dom.drawerBrandScopeToggle.classList.add('bg-gray-50', 'text-[#424245]', 'border-gray-200');
  }

  const currentBrand = state.activeProduct.brand || 'UDO';
  if (dom.drawerBrand) dom.drawerBrand.value = currentBrand;
  if (dom.drawerBrandSearch) dom.drawerBrandSearch.value = currentBrand;
  closeBrandDropdown();

  const shelves = state.activeProduct.storefront_shelves || {};
  if (dom.drawerFlagBest) dom.drawerFlagBest.checked = Boolean(shelves.best_seller);
  if (dom.drawerFlagNew) dom.drawerFlagNew.checked = Boolean(shelves.new_arrival);
  if (dom.drawerFlagRec) dom.drawerFlagRec.checked = Boolean(shelves.recommended);
  if (dom.drawerFlagPromo) dom.drawerFlagPromo.checked = Boolean(shelves.promotion);

  // Set Publishing Lifecycle
  const pubStatus = state.activeProduct.status || 'publish';
  const pubRadio = document.querySelector(`input[name="drawer-publish-status"][value="${pubStatus}"]`);
  if (pubRadio) pubRadio.checked = true;

  // Set Availability Status
  const hasVariantsStock = (state.activeProduct.variants || []).some(v => (v.stock || 0) > 0);
  const fulStatus = state.activeProduct.availability || (hasVariantsStock ? 'in_stock' : 'out_of_stock');
  const fulRadio = document.querySelector(`input[name="drawer-fulfillment-status"][value="${fulStatus}"]`);
  if (fulRadio) fulRadio.checked = true;

  if (dom.drawerDesc) dom.drawerDesc.value = state.activeProduct.description || '';

  // Render Variants inputs
  renderDrawerVariants();

  // Render Technical Specifications
  renderDrawerSpecs();

  // Render Rich / A+ Content
  renderDrawerRichContent();

  // Render Product Gallery & Primary Cover
  renderDrawerGallery();

  // Show Danger Zone for existing product
  if (dom.drawerDangerZone) dom.drawerDangerZone.classList.remove('hidden');

  // Render live preview
  updateDrawerLivePreview();

  const imgStatusEl = document.getElementById('drawer-image-status');
  if (imgStatusEl) {
    const hasImg = state.activeProduct.images && state.activeProduct.images.length > 0;
    imgStatusEl.textContent = hasImg ? 'พร้อมแสดงผล' : 'ยังไม่มีรูป';
  }

  // Slide In Drawer
  if (dom.drawerBackdrop) {
    dom.drawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    dom.drawerBackdrop.classList.add('opacity-100');
  }
  if (dom.productDrawer) {
    dom.productDrawer.classList.remove('translate-x-full');
    dom.productDrawer.classList.add('translate-x-0');
  }
}

function openCreateProductDrawer() {
  const newPid = `udo-${Date.now().toString().slice(-6)}`;
  state.isCreateMode = true;
  state.activeProduct = {
    id: newPid,
    name: '',
    name_en: '',
    brand: 'UDO',
    sku: `UDO-${Date.now().toString().slice(-4)}`,
    description: '',
    descriptionHtml: '',
    status: 'publish',
    availability: 'in_stock',
    sort_priority: 1,
    created_at: new Date().toISOString(),
    sold_count: 0,
    collections: ['new-arrival', 'popular'],
    flags: {
      is_in_stock: true,
      is_best_seller: false,
      is_new_arrival: true,
      is_recommended: false,
      is_promotion: false
    },
    storefront_shelves: {
      best_seller: null,
      new_arrival: 1,
      recommended: null,
      promotion: null
    },
    images: [],
    variants: [
      {
        size: 'มาตรฐาน',
        package: 'ชิ้น',
        unit: 'ชิ้น',
        weight: '',
        price: 0,
        original_price: null,
        stock: 10,
        sku: `UDO-${Date.now().toString().slice(-4)}-01`
      }
    ]
  };

  switchEditorTab('tab-basic');
  if (dom.drawerTitle) dom.drawerTitle.textContent = 'เพิ่มสินค้าใหม่เข้าสู่ระบบ (Create New Product)';
  if (dom.drawerSaveBtn) dom.drawerSaveBtn.textContent = 'สร้างและบันทึกสินค้าใหม่';
  if (dom.drawerPid) dom.drawerPid.value = state.activeProduct.id;
  if (dom.drawerSkuLabel) dom.drawerSkuLabel.textContent = `รหัสสินค้าใหม่: ${state.activeProduct.id}`;
  if (dom.drawerName) dom.drawerName.value = '';
  if (dom.drawerNameEn) dom.drawerNameEn.value = '';
  if (dom.drawerSortPriority) dom.drawerSortPriority.value = 1;
  if (dom.drawerDesc) dom.drawerDesc.value = '';

  state.activeProductCategory = 'กลุ่มลวดเชื่อม';
  state.brandScopeMode = 'category';
  if (dom.drawerBrandScopeToggle) {
    if (dom.drawerBrandScopeText) dom.drawerBrandScopeText.textContent = 'เฉพาะหมวดนี้';
    if (dom.drawerBrandScopeDot) {
      dom.drawerBrandScopeDot.classList.remove('bg-purple-500');
      dom.drawerBrandScopeDot.classList.add('bg-emerald-500');
    }
    dom.drawerBrandScopeToggle.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
    dom.drawerBrandScopeToggle.classList.add('bg-gray-50', 'text-[#424245]', 'border-gray-200');
  }
  if (dom.drawerCategory) dom.drawerCategory.value = 'cat-12';
  if (dom.drawerBrand) dom.drawerBrand.value = 'UDO';
  if (dom.drawerBrandSearch) dom.drawerBrandSearch.value = 'UDO';
  closeBrandDropdown();

  const pubRadio = document.querySelector('input[name="drawer-publish-status"][value="publish"]');
  if (pubRadio) pubRadio.checked = true;
  const fulRadio = document.querySelector('input[name="drawer-fulfillment-status"][value="in_stock"]');
  if (fulRadio) fulRadio.checked = true;

  if (dom.drawerFlagBest) dom.drawerFlagBest.checked = false;
  if (dom.drawerFlagNew) dom.drawerFlagNew.checked = true;
  if (dom.drawerFlagRec) dom.drawerFlagRec.checked = false;
  if (dom.drawerFlagPromo) dom.drawerFlagPromo.checked = false;

  const imgStatusEl = document.getElementById('drawer-image-status');
  if (imgStatusEl) imgStatusEl.textContent = 'ยังไม่มีรูปภาพ';

  renderDrawerVariants();
  renderDrawerSpecs();
  renderDrawerRichContent();
  renderDrawerGallery();

  // Hide Danger Zone for new product creation
  if (dom.drawerDangerZone) dom.drawerDangerZone.classList.add('hidden');

  updateDrawerLivePreview();

  if (dom.drawerBackdrop) {
    dom.drawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    dom.drawerBackdrop.classList.add('opacity-100');
  }
  if (dom.productDrawer) {
    dom.productDrawer.classList.remove('translate-x-full');
    dom.productDrawer.classList.add('translate-x-0');
  }
}

function closeProductDrawer() {
  if (dom.drawerBackdrop) {
    dom.drawerBackdrop.classList.remove('opacity-100');
    dom.drawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
  }
  if (dom.productDrawer) {
    dom.productDrawer.classList.remove('translate-x-0');
    dom.productDrawer.classList.add('translate-x-full');
  }
  state.activeProduct = null;
}

/**
 * Category-based Size Presets for Dimension 1 (Sizes)
 */
function getCategorySizePresets(categoryName = '') {
  const cat = (categoryName || '').toLowerCase();
  if (cat.includes('ลวดเชื่อม') || cat.includes('cat-12') || cat.includes('wire')) {
    return ['0.8 mm', '0.9 mm', '1.0 mm', '1.2 mm', '1.6 mm', '2.0 mm', '2.6 mm', '3.2 mm', '4.0 mm', '5.0 mm'];
  }
  if (cat.includes('เซฟตี้') || cat.includes('ถุงมือ') || cat.includes('safety') || cat.includes('ชุด')) {
    return ['S', 'M', 'L', 'XL', '2XL', 'ฟรีไซส์'];
  }
  if (cat.includes('เครื่องเชื่อม') || cat.includes('ตู้เชื่อม') || cat.includes('พลาสม่า') || cat.includes('machine')) {
    return ['160A', '200A', '250A', '300A', '400A', '500A', 'มาตรฐาน'];
  }
  if (cat.includes('ใบตัด') || cat.includes('ใบเจียร') || cat.includes('หินเจียร') || cat.includes('abrasive')) {
    return ['4 นิ้ว', '5 นิ้ว', '7 นิ้ว', '14 นิ้ว', '16 นิ้ว', 'มาตรฐาน'];
  }
  if (cat.includes('แก๊ส') || cat.includes('เคมี') || cat.includes('chemical') || cat.includes('สเปรย์')) {
    return ['400 ml', '500 ml', '1 ลิตร', '5 ลิตร', 'มาตรฐาน'];
  }
  return ['มาตรฐาน', '1 ชิ้น', '1 กล่อง', '1 ลัง'];
}

function addSizeGroup(sizeName) {
  if (!state.activeProduct || !sizeName) return;
  state.activeProduct.variants = state.activeProduct.variants || [];

  const cleanSize = sizeName.trim();
  const existing = state.activeProduct.variants.find(v => (v.size || 'มาตรฐาน').trim() === cleanSize);
  if (existing) {
    const targetEl = document.getElementById(`size-group-${encodeURIComponent(cleanSize)}`);
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  const cleanSuffix = cleanSize.replace(/[^a-zA-Z0-9]/g, '');
  const baseSku = state.activeProduct.sku || state.activeProduct.id;
  const newSku = cleanSuffix ? `${baseSku}-${cleanSuffix}` : `${baseSku}-V${state.activeProduct.variants.length + 1}`;

  state.activeProduct.variants.push({
    size: cleanSize,
    package: 'ชิ้น',
    unit: 'ชิ้น',
    weight: '',
    price: 0,
    original_price: null,
    stock: 10,
    sku: newSku
  });

  renderDrawerVariants();
  updateDrawerLivePreview();
}

function removeSizeGroup(sizeName) {
  if (!state.activeProduct || !state.activeProduct.variants) return;
  const cleanSize = sizeName.trim();
  const remaining = state.activeProduct.variants.filter(v => (v.size || 'มาตรฐาน').trim() !== cleanSize);
  if (remaining.length > 0) {
    state.activeProduct.variants = remaining;
    renderDrawerVariants();
    updateDrawerLivePreview();
  }
}

function addPackageTier(sizeName) {
  if (!state.activeProduct || !state.activeProduct.variants) return;
  const cleanSize = sizeName.trim();
  const sizeVariants = state.activeProduct.variants.filter(v => (v.size || 'มาตรฐาน').trim() === cleanSize);

  let defaultPackage = 'ลัง (20 กก.)';
  if (sizeVariants.length === 1 && (sizeVariants[0].package === 'ชิ้น' || sizeVariants[0].package === 'ม้วน (5 กก.)')) {
    defaultPackage = 'ลัง (20 กก.)';
  } else if (sizeVariants.some(v => v.package === 'ลัง (20 กก.)')) {
    defaultPackage = `แพ็กเกจ ${sizeVariants.length + 1}`;
  }

  const cleanSuffix = cleanSize.replace(/[^a-zA-Z0-9]/g, '');
  const baseSku = state.activeProduct.sku || state.activeProduct.id;
  const newSku = `${baseSku}${cleanSuffix ? `-${cleanSuffix}` : ''}-P${sizeVariants.length + 1}`;

  state.activeProduct.variants.push({
    size: cleanSize,
    package: defaultPackage,
    unit: defaultPackage.split(' ')[0] || defaultPackage,
    weight: '',
    price: 0,
    original_price: null,
    stock: 0,
    sku: newSku
  });

  renderDrawerVariants();
  updateDrawerLivePreview();
}

function renderDrawerVariants() {
  if (!dom.drawerVariantsList || !state.activeProduct) return;

  let variants = state.activeProduct.variants || [];
  if (variants.length === 0) {
    variants = [{
      size: 'มาตรฐาน',
      package: 'ชิ้น',
      unit: 'ชิ้น',
      weight: '',
      price: 0,
      original_price: null,
      stock: 10,
      sku: state.activeProduct.sku || state.activeProduct.id
    }];
    state.activeProduct.variants = variants;
  }

  // Dimension 1: Preset Size Chips
  const categoryName = state.activeProductCategory || (state.activeProduct.categories?.[0]?.name) || '';
  const presets = getCategorySizePresets(categoryName);
  const currentSizes = [...new Set(variants.map(v => (v.size || 'มาตรฐาน').trim()))];

  if (dom.drawerSizePresetsBar) {
    dom.drawerSizePresetsBar.innerHTML = presets.map(preset => {
      const isSelected = currentSizes.includes(preset);
      if (isSelected) {
        return `
          <button type="button" class="btn-size-preset-chip px-3 py-1.5 rounded-xl text-xs sm:text-[12.5px] font-bold bg-[#160808] text-white border border-[#160808] shadow-2xs inline-flex items-center gap-1.5 cursor-default select-none" data-size="${preset}" data-active="true">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>${preset}</span>
          </button>
        `;
      } else {
        return `
          <button type="button" class="btn-size-preset-chip px-3 py-1.5 rounded-xl text-xs sm:text-[12.5px] font-semibold bg-white text-[#424245] hover:text-[#160808] hover:border-[#160808] border border-gray-300 transition-colors inline-flex items-center gap-1 cursor-pointer select-none" data-size="${preset}" data-active="false" title="คลิกเพื่อเพิ่มขนาด ${preset}">
            <span>+ ${preset}</span>
          </button>
        `;
      }
    }).join('');

    dom.drawerSizePresetsBar.querySelectorAll('.btn-size-preset-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const sizeToAdd = chip.dataset.size;
        const isActive = chip.dataset.active === 'true';
        if (!isActive) {
          addSizeGroup(sizeToAdd);
        } else {
          const targetEl = document.getElementById(`size-group-${encodeURIComponent(sizeToAdd)}`);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // Dimension 2: Grouped Matrix Tables per Size
  dom.drawerVariantsList.innerHTML = currentSizes.map((sizeName) => {
    const sizeVariants = variants
      .map((v, originalIndex) => ({ ...v, originalIndex }))
      .filter(v => (v.size || 'มาตรฐาน').trim() === sizeName);

    return `
      <div id="size-group-${encodeURIComponent(sizeName)}" class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs space-y-0">
        <!-- Size Group Header -->
        <div class="px-4 py-3 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2.5">
            <span class="font-bold text-sm text-[#160808]">ขนาด: <span class="text-[#160808] bg-white px-2.5 py-0.5 rounded-lg border border-gray-300 font-mono font-bold">${sizeName}</span></span>
            <span class="text-xs font-semibold text-[#424245] bg-gray-200/80 px-2.5 py-0.5 rounded-full">${sizeVariants.length} ระดับหน่วยขาย/ราคาส่ง</span>
          </div>
          ${currentSizes.length > 1 ? `
            <button type="button" class="btn-remove-size-group text-xs text-rose-600 hover:text-rose-800 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer" data-size="${sizeName}" title="ลบขนาด ${sizeName} และทุกหน่วยบรรจุย่อย">
              ลบทั้งขนาดนี้
            </button>
          ` : ''}
        </div>

        <!-- Packaging & Wholesale Tiers Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-50/80 text-xs uppercase font-bold text-[#160808] border-b border-gray-200 tracking-wide">
              <tr>
                <th class="py-2.5 px-3 w-[26%]">หน่วยบรรจุ / แพ็กเกจ</th>
                <th class="py-2.5 px-3 w-[22%]">รหัส SKU ตัวเลือก</th>
                <th class="py-2.5 px-3 w-[16%]">ราคาขาย (บาท)</th>
                <th class="py-2.5 px-3 w-[18%]">ราคาเดิม (ก่อนลด)</th>
                <th class="py-2.5 px-3 w-[12%]">สต็อก</th>
                <th class="py-2.5 px-2 w-[6%] text-center">ลบ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${sizeVariants.map(v => {
                const idx = v.originalIndex;
                const priceNum = Number(v.price) || 0;
                const origNum = Number(v.original_price) || 0;
                const hasDiscount = origNum > priceNum && priceNum > 0;
                const discountPct = hasDiscount ? Math.round(((origNum - priceNum) / origNum) * 100) : 0;
                const discountSavings = hasDiscount ? (origNum - priceNum) : 0;

                return `
                  <tr class="variant-item-row hover:bg-gray-50/60 transition-colors" data-vindex="${idx}">
                    <td class="py-2.5 px-3 align-top">
                      <input type="hidden" class="v-input-size" value="${sizeName}">
                      <input type="text" list="common-packages-list" class="v-input-package w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-semibold text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" value="${v.package || 'ชิ้น'}" placeholder="เช่น ม้วน (5 กก.) หรือ ลัง (20 กก.)">
                    </td>
                    <td class="py-2.5 px-3 align-top">
                      <input type="text" class="v-input-sku w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-mono font-medium text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" value="${v.sku || ''}" placeholder="SKU-XXXX">
                    </td>
                    <td class="py-2.5 px-3 align-top">
                      <input type="number" min="0" step="any" class="v-input-price w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-bold text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" value="${v.price ?? 0}">
                    </td>
                    <td class="py-2.5 px-3 align-top">
                      <input type="number" min="0" step="any" class="v-input-original-price w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-medium text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" value="${v.original_price ?? ''}" placeholder="ราคาเต็ม">
                      <div class="v-discount-badge-container mt-1 min-h-[16px]">
                        ${hasDiscount ? `
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            -${discountPct}% (ลด ฿${formatPrice(discountSavings)})
                          </span>
                        ` : ''}
                      </div>
                    </td>
                    <td class="py-2.5 px-3 align-top">
                      <input type="number" min="0" class="v-input-stock w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-semibold text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" value="${v.stock ?? 0}">
                    </td>
                    <td class="py-2.5 px-2 align-middle text-center">
                      ${variants.length > 1 ? `
                        <button type="button" class="btn-remove-variant text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer" data-vindex="${idx}" title="ลบหน่วยบรรจุนี้">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      ` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Add Package Tier for this Size Button -->
        <div class="px-4 py-2.5 bg-gray-50/80 border-t border-gray-200 flex items-center justify-between">
          <button type="button" class="btn-add-package-tier text-xs sm:text-[13px] font-semibold text-[#160808] hover:underline inline-flex items-center gap-1 cursor-pointer" data-size="${sizeName}">
            <span>+ เพิ่มหน่วยบรรจุ / ราคาส่ง สำหรับขนาด ${sizeName}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  attachVariantRowListeners();
}

function attachVariantRowListeners() {
  if (!dom.drawerVariantsList) return;

  dom.drawerVariantsList.querySelectorAll('.variant-item-row').forEach(row => {
    const vIdx = parseInt(row.dataset.vindex, 10);
    const sizeInput = row.querySelector('.v-input-size');
    const pkgInput = row.querySelector('.v-input-package');
    const skuInput = row.querySelector('.v-input-sku');
    const priceInput = row.querySelector('.v-input-price');
    const origPriceInput = row.querySelector('.v-input-original-price');
    const stockInput = row.querySelector('.v-input-stock');
    const discountContainer = row.querySelector('.v-discount-badge-container');

    const syncVariant = () => {
      if (state.activeProduct && state.activeProduct.variants && state.activeProduct.variants[vIdx]) {
        const sizeVal = sizeInput ? sizeInput.value.trim() : 'มาตรฐาน';
        const pkgVal = pkgInput ? pkgInput.value.trim() : 'ชิ้น';
        const skuVal = skuInput ? skuInput.value.trim() : '';
        const priceVal = priceInput ? Math.max(0, parseFloat(priceInput.value) || 0) : 0;
        const origRaw = origPriceInput ? parseFloat(origPriceInput.value) : NaN;
        const origPriceVal = (!isNaN(origRaw) && origRaw > priceVal) ? origRaw : null;
        const stockVal = stockInput ? Math.max(0, parseInt(stockInput.value, 10) || 0) : 0;

        state.activeProduct.variants[vIdx].size = sizeVal;
        state.activeProduct.variants[vIdx].package = pkgVal;
        state.activeProduct.variants[vIdx].unit = pkgVal.split(' ')[0] || pkgVal;
        state.activeProduct.variants[vIdx].sku = skuVal;
        state.activeProduct.variants[vIdx].price = priceVal;
        state.activeProduct.variants[vIdx].original_price = origPriceVal;
        state.activeProduct.variants[vIdx].stock = stockVal;

        // Update live discount badge
        if (discountContainer) {
          if (origPriceVal && origPriceVal > priceVal && priceVal > 0) {
            const pct = Math.round(((origPriceVal - priceVal) / origPriceVal) * 100);
            const savings = origPriceVal - priceVal;
            discountContainer.innerHTML = `
              <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                -${pct}% (ลด ฿${formatPrice(savings)})
              </span>
            `;
          } else {
            discountContainer.innerHTML = '';
          }
        }
      }
      updateDrawerLivePreview();
    };

    if (pkgInput) pkgInput.addEventListener('input', syncVariant);
    if (skuInput) skuInput.addEventListener('input', syncVariant);
    if (priceInput) priceInput.addEventListener('input', syncVariant);
    if (origPriceInput) origPriceInput.addEventListener('input', syncVariant);
    if (stockInput) stockInput.addEventListener('input', syncVariant);
  });

  // Attach remove variant listener
  dom.drawerVariantsList.querySelectorAll('.btn-remove-variant').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vIdx = parseInt(btn.dataset.vindex, 10);
      if (state.activeProduct && state.activeProduct.variants && state.activeProduct.variants.length > 1) {
        state.activeProduct.variants.splice(vIdx, 1);
        renderDrawerVariants();
        updateDrawerLivePreview();
      }
    });
  });

  // Attach remove entire size group listener
  dom.drawerVariantsList.querySelectorAll('.btn-remove-size-group').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sizeToRemove = btn.dataset.size;
      removeSizeGroup(sizeToRemove);
    });
  });

  // Attach add package tier listener
  dom.drawerVariantsList.querySelectorAll('.btn-add-package-tier').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sizeName = btn.dataset.size;
      addPackageTier(sizeName);
    });
  });
}

/**
 * HTML Escaping Utility
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Get Technical Specification Presets by Category
 */
function getCategorySpecPresets(categoryName = '') {
  const cat = (categoryName || '').toLowerCase();

  if (cat.includes('ลวดเชื่อม') || (cat.includes('เชื่อม') && !cat.includes('เครื่อง') && !cat.includes('ตู้'))) {
    return [
      'มาตรฐานรับรอง',
      'การจำแนกประเภท',
      'กระบวนการเชื่อม',
      'วัสดุที่เชื่อม',
      'ท่าเชื่อม',
      'ชนิดก๊าซที่รองรับ',
      'ส่วนผสมทางเคมี',
      'ความต้านแรงดึง'
    ];
  }

  if (cat.includes('เครื่อง') || cat.includes('ตู้') || cat.includes('พลาสม่า') || cat.includes('ตัด')) {
    return [
      'แรงดันไฟฟ้าเข้า',
      'กระแสไฟสูงสุด',
      'ระบบการทำงาน',
      'รอบการทำงาน (Duty Cycle)',
      'ความหนาชิ้นงานตัดสูงสุด',
      'การรับประกัน',
      'อุปกรณ์มาตรฐานในชุด'
    ];
  }

  if (cat.includes('เซฟตี้') || cat.includes('ความปลอดภัย') || cat.includes('ถุงมือ') || cat.includes('หน้ากาก') || cat.includes('แว่นตา')) {
    return [
      'มาตรฐานความปลอดภัย',
      'วัสดุที่ใช้งาน',
      'ระดับการป้องกัน',
      'ความทนทานต่อความร้อน',
      'ขนาด / กำลังการทำงาน'
    ];
  }

  if (cat.includes('ใบตัด') || cat.includes('หินเจียร') || cat.includes('ขัด') || cat.includes('เจียร')) {
    return [
      'ขนาดใบ',
      'เบอร์ความละเอียด',
      'ความเร็วรอบสูงสุด',
      'วัสดุที่ใช้งาน',
      'ประเภทใบ'
    ];
  }

  return [
    'แบรนด์ผู้ผลิต',
    'รุ่น / โมเดล',
    'มาตรฐานรับรอง',
    'การรับประกัน',
    'ประเทศผู้ผลิต'
  ];
}

/**
 * Synchronize Specs from DOM into state.activeProduct.specsTable
 */
function syncSpecsFromDom() {
  if (!dom.drawerSpecsTbody || !state.activeProduct) return;
  const rows = dom.drawerSpecsTbody.querySelectorAll('.spec-item-row');
  const list = [];
  rows.forEach(row => {
    const kInput = row.querySelector('.spec-key-input');
    const vInput = row.querySelector('.spec-value-input');
    list.push({
      key: kInput ? kInput.value.trim() : '',
      value: vInput ? vInput.value.trim() : ''
    });
  });
  state.activeProduct.specsTable = list;
}

/**
 * Add a new Specification Row
 */
function addSpecRow(key = '', value = '') {
  if (!state.activeProduct) return;
  syncSpecsFromDom();
  state.activeProduct.specsTable = state.activeProduct.specsTable || [];
  state.activeProduct.specsTable.push({ key, value });
  renderDrawerSpecs();

  // Focus the newly added input
  if (dom.drawerSpecsTbody) {
    const rows = dom.drawerSpecsTbody.querySelectorAll('.spec-item-row');
    const lastRow = rows[rows.length - 1];
    if (lastRow) {
      const targetInput = key ? lastRow.querySelector('.spec-value-input') : lastRow.querySelector('.spec-key-input');
      if (targetInput) targetInput.focus();
    }
  }
}

/**
 * Render Technical Specifications Table & Preset Chips
 */
function renderDrawerSpecs() {
  if (!dom.drawerSpecsTbody || !state.activeProduct) return;

  // Initialize baseline specs if missing
  let specs = state.activeProduct.specsTable;
  if (!Array.isArray(specs) || specs.length === 0) {
    const categoryName = state.activeProductCategory || (state.activeProduct.categories?.[0]?.name) || 'กลุ่มลวดเชื่อม';
    specs = [
      { key: 'แบรนด์', value: state.activeProduct.brand || 'UDO' },
      { key: 'รหัสสินค้า', value: state.activeProduct.sku || state.activeProduct.id },
      { key: 'หมวดหมู่', value: categoryName },
      { key: 'สถานะสต็อก', value: (state.activeProduct.flags?.is_in_stock || state.activeProduct.availability === 'in_stock') ? 'มีสินค้าพร้อมส่ง' : 'ติดต่อสอบถาม' }
    ];
    state.activeProduct.specsTable = specs;
  }

  // Render Preset Spec Chips
  if (dom.drawerSpecPresetsBar) {
    const categoryName = state.activeProductCategory || (state.activeProduct.categories?.[0]?.name) || '';
    const presets = getCategorySpecPresets(categoryName);
    const existingKeys = new Set(specs.map(s => (s.key || '').trim()));

    dom.drawerSpecPresetsBar.innerHTML = presets.map(preset => {
      const isUsed = existingKeys.has(preset);
      if (isUsed) {
        return `
          <button type="button" class="btn-spec-preset-chip px-3 py-1 rounded-xl text-xs sm:text-[12.5px] font-bold bg-gray-200 text-[#160808] border border-gray-300 inline-flex items-center gap-1.5 cursor-default select-none" data-key="${preset}" data-used="true">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>${preset}</span>
          </button>
        `;
      } else {
        return `
          <button type="button" class="btn-spec-preset-chip px-3 py-1 rounded-xl text-xs sm:text-[12.5px] font-semibold bg-white text-[#424245] hover:text-[#160808] hover:border-[#160808] border border-gray-300 transition-colors inline-flex items-center gap-1 cursor-pointer select-none" data-key="${preset}" data-used="false" title="คลิกเพื่อเพิ่มหัวข้อ ${preset}">
            <span>+ ${preset}</span>
          </button>
        `;
      }
    }).join('');

    dom.drawerSpecPresetsBar.querySelectorAll('.btn-spec-preset-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const keyToAdd = chip.dataset.key;
        const isUsed = chip.dataset.used === 'true';
        if (!isUsed) {
          addSpecRow(keyToAdd, '');
        } else {
          const rows = dom.drawerSpecsTbody.querySelectorAll('.spec-item-row');
          for (const row of rows) {
            const keyInput = row.querySelector('.spec-key-input');
            if (keyInput && keyInput.value.trim() === keyToAdd) {
              row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              const valInput = row.querySelector('.spec-value-input');
              if (valInput) valInput.focus();
              break;
            }
          }
        }
      });
    });
  }

  // Render Spec Rows
  dom.drawerSpecsTbody.innerHTML = specs.map((item, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === specs.length - 1;

    return `
      <tr class="spec-item-row hover:bg-gray-50/70 transition-colors" data-sindex="${idx}">
        <td class="py-2.5 px-3.5 align-top">
          <input 
            type="text" 
            class="spec-key-input w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-bold text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" 
            value="${escapeHtml(item.key || '')}" 
            placeholder="เช่น มาตรฐานรับรอง, กระบวนการเชื่อม"
          >
        </td>
        <td class="py-2.5 px-3.5 align-top">
          <input 
            type="text" 
            class="spec-value-input w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-[13px] font-medium text-[#160808] focus:outline-none focus:ring-1 focus:ring-black" 
            value="${escapeHtml(item.value || '')}" 
            placeholder="เช่น AWS A5.18, 90-250A"
          >
        </td>
        <td class="py-2.5 px-2 align-top text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-1 mt-1">
            <button type="button" class="btn-move-spec-up p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" data-sindex="${idx}" ${isFirst ? 'disabled' : ''} title="เลื่อนขึ้น">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button type="button" class="btn-move-spec-down p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" data-sindex="${idx}" ${isLast ? 'disabled' : ''} title="เลื่อนลง">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button type="button" class="btn-remove-spec p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer" data-sindex="${idx}" title="ลบรายการนี้">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  attachSpecRowListeners();
}

/**
 * Attach Event Listeners to Specification Rows
 */
function attachSpecRowListeners() {
  if (!dom.drawerSpecsTbody) return;

  // Real-time input synchronization
  dom.drawerSpecsTbody.querySelectorAll('.spec-item-row').forEach(row => {
    const sIdx = parseInt(row.dataset.sindex, 10);
    const keyInput = row.querySelector('.spec-key-input');
    const valInput = row.querySelector('.spec-value-input');

    const syncSpec = () => {
      if (state.activeProduct && state.activeProduct.specsTable && state.activeProduct.specsTable[sIdx]) {
        state.activeProduct.specsTable[sIdx].key = keyInput ? keyInput.value.trim() : '';
        state.activeProduct.specsTable[sIdx].value = valInput ? valInput.value.trim() : '';
      }
    };

    if (keyInput) keyInput.addEventListener('input', syncSpec);
    if (valInput) valInput.addEventListener('input', syncSpec);
  });

  // Move Up
  dom.drawerSpecsTbody.querySelectorAll('.btn-move-spec-up').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.sindex, 10);
      if (idx > 0 && state.activeProduct && state.activeProduct.specsTable) {
        syncSpecsFromDom();
        const temp = state.activeProduct.specsTable[idx - 1];
        state.activeProduct.specsTable[idx - 1] = state.activeProduct.specsTable[idx];
        state.activeProduct.specsTable[idx] = temp;
        renderDrawerSpecs();
      }
    });
  });

  // Move Down
  dom.drawerSpecsTbody.querySelectorAll('.btn-move-spec-down').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.sindex, 10);
      if (state.activeProduct && state.activeProduct.specsTable && idx < state.activeProduct.specsTable.length - 1) {
        syncSpecsFromDom();
        const temp = state.activeProduct.specsTable[idx + 1];
        state.activeProduct.specsTable[idx + 1] = state.activeProduct.specsTable[idx];
        state.activeProduct.specsTable[idx] = temp;
        renderDrawerSpecs();
      }
    });
  });

  // Remove Row
  dom.drawerSpecsTbody.querySelectorAll('.btn-remove-spec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.sindex, 10);
      if (state.activeProduct && state.activeProduct.specsTable) {
        syncSpecsFromDom();
        state.activeProduct.specsTable.splice(idx, 1);
        renderDrawerSpecs();
      }
    });
  });
}

/**
 * Normalizes richContent story blocks with full backward compatibility
 */
function normalizeRichBlocks(product) {
  if (!product) return [];
  product.richContent = product.richContent || product.rich_content || {};

  // If blocks already exist as a non-empty array, return them
  if (Array.isArray(product.richContent.blocks) && product.richContent.blocks.length > 0) {
    return product.richContent.blocks;
  }

  const rich = product.richContent;
  const blocks = [];

  let firstImgUrl = '';
  if (product.images && product.images.length > 0) {
    const raw0 = product.images[0];
    firstImgUrl = typeof raw0 === 'string' ? raw0 : (raw0.large || raw0.card || raw0.original || raw0.thumb || '');
  }

  const legacyHeadline = rich.headline || product.name || '';
  const legacySubheadline = rich.subheadline || '';
  const legacyDesc = rich.description || product.description || '';
  const img1 = rich.image1 || firstImgUrl || '';
  const img2 = rich.image2 || '';
  const img3 = rich.image3 || '';

  if (legacyHeadline || legacyDesc || img1) {
    blocks.push({
      id: 'block-' + Date.now() + '-1',
      headline: legacyHeadline,
      subheadline: legacySubheadline,
      paragraph: legacyDesc,
      image: img1
    });
  }

  if (img2) {
    blocks.push({
      id: 'block-' + Date.now() + '-2',
      headline: '',
      subheadline: '',
      paragraph: '',
      image: img2
    });
  }

  if (img3) {
    blocks.push({
      id: 'block-' + Date.now() + '-3',
      headline: '',
      subheadline: '',
      paragraph: '',
      image: img3
    });
  }

  // If completely empty, seed 1 initial block
  if (blocks.length === 0) {
    blocks.push({
      id: 'block-' + Date.now() + '-1',
      headline: product.name || '',
      subheadline: '',
      paragraph: product.description || '',
      image: firstImgUrl || ''
    });
  }

  product.richContent.blocks = blocks;
  return blocks;
}

/**
 * Render Rich / A+ Modular Story Blocks in Drawer
 */
function renderDrawerRichContent() {
  if (!state.activeProduct) return;

  const blocks = normalizeRichBlocks(state.activeProduct);
  const isDocument = Boolean(state.activeProduct.richContent?.isDocument);
  if (dom.drawerRichIsDocument) {
    dom.drawerRichIsDocument.checked = isDocument;
  }

  if (!dom.drawerRichBlocksContainer) return;
  dom.drawerRichBlocksContainer.innerHTML = '';

  const total = blocks.length;
  blocks.forEach((block, index) => {
    const card = document.createElement('div');
    card.className = 'rich-block-card bg-gray-50/70 p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3.5 relative transition-all';
    card.dataset.blockId = block.id;
    card.dataset.index = index;

    // Detect summary label of what's inside this block
    const parts = [];
    if (block.headline) parts.push('หัวข้อหลัก');
    if (block.paragraph) parts.push('ข้อความ');
    if (block.image) parts.push('รูปภาพ');
    const summary = parts.length > 0 ? parts.join(' + ') : 'บล็อกว่าง';

    card.innerHTML = `
      <div class="flex items-center justify-between pb-2.5 border-b border-gray-200/80">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 bg-black text-white text-[11px] font-bold rounded-lg tracking-wide">
            บล็อกที่ ${index + 1}
          </span>
          <span class="text-xs text-gray-500 font-medium">
            (${escapeHtml(summary)})
          </span>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" class="btn-move-block-up p-1.5 text-gray-500 hover:text-black hover:bg-gray-200/70 rounded-lg transition-colors cursor-pointer ${index === 0 ? 'opacity-25 cursor-not-allowed pointer-events-none' : ''}" title="เลื่อนบล็อกขึ้น">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button type="button" class="btn-move-block-down p-1.5 text-gray-500 hover:text-black hover:bg-gray-200/70 rounded-lg transition-colors cursor-pointer ${index === total - 1 ? 'opacity-25 cursor-not-allowed pointer-events-none' : ''}" title="เลื่อนบล็อกลง">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button type="button" class="btn-delete-block p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer ml-1" title="ลบบล็อกนี้">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <!-- Headline -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-xs sm:text-[13px] font-semibold text-[#160808]">หัวข้อหลัก (Headline - ไม่บังคับ)</label>
            <span class="text-[11px] text-gray-400">ขนาดใหญ่ กึ่งกลาง</span>
          </div>
          <input 
            type="text" 
            class="block-field-headline w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-[13.5px] sm:text-sm font-semibold text-[#160808] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
            placeholder="เช่น เมื่อเป็น 2 ทุกอย่างก็ใหม่หมด (เว้นว่างได้)"
            value="${escapeHtml(block.headline || '')}"
          >
        </div>

        <!-- Subheadline -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-xs sm:text-[13px] font-semibold text-[#160808]">หัวข้อย่อย (Subheadline - ไม่บังคับ)</label>
            <span class="text-[11px] text-gray-400">ขนาดกลาง สีเทาเข้ม</span>
          </div>
          <input 
            type="text" 
            class="block-field-subheadline w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-[13.5px] sm:text-sm font-medium text-[#160808] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
            placeholder="เช่น คอนโทรลเลอร์รุ่นใหม่จะติดกับตัวเครื่องด้วยแม่เหล็ก (เว้นว่างได้)"
            value="${escapeHtml(block.subheadline || '')}"
          >
        </div>

        <!-- Paragraph -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-xs sm:text-[13px] font-semibold text-[#160808]">ย่อหน้าคำบรรยาย (Paragraph - ไม่บังคับ)</label>
            <span class="text-[11px] text-gray-400">คุมความกว้าง 760px เพื่อให้อ่านง่าย</span>
          </div>
          <textarea 
            rows="3" 
            class="block-field-paragraph w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-[14.5px] sm:text-[15px] text-[#160808] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black leading-relaxed transition-all"
            placeholder="ระบุคำบรรยายประกอบภาพ หรือจุดเด่นของฟีเจอร์นี้ (เว้นว่างได้)..."
          >${escapeHtml(block.paragraph || '')}</textarea>
        </div>

        <!-- Showcase Image -->
        <div class="pt-1">
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs sm:text-[13px] font-semibold text-[#160808]">รูปภาพโชว์เคสประจำบล็อก (Showcase Image - ไม่บังคับ)</label>
            <button type="button" class="btn-clear-block-image text-xs text-rose-600 hover:underline font-semibold cursor-pointer ${block.image ? '' : 'hidden'}">ลบรูปนี้</button>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 items-start">
            <!-- Drag & Drop Dropzone Preview Box -->
            <div class="block-image-dropzone group w-full sm:w-44 aspect-video bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 hover:border-black overflow-hidden flex items-center justify-center shrink-0 relative cursor-pointer transition-all shadow-2xs" title="คลิกเพื่อครอบตัดหรือลากรูปมาวางที่นี่">
              <img src="${escapeHtml(block.image || '')}" class="block-preview-img w-full h-full object-contain ${block.image ? '' : 'hidden'}" alt="Preview">
              <div class="block-placeholder-container flex flex-col items-center justify-center text-center p-2 ${block.image ? 'hidden' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 group-hover:text-black mb-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-[11px] text-gray-500 font-medium leading-tight">ลากรูปมาวางที่นี่<br><span class="text-[10px] text-gray-400">หรือคลิกครอบตัด</span></span>
              </div>
              <div class="block-hover-overlay absolute inset-0 bg-black/40 text-white text-[11px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${block.image ? '' : 'hidden'}">
                คลิกเพื่อจัดกรอบ 16:9
              </div>
            </div>

            <div class="flex-1 w-full space-y-2">
              <input 
                type="text" 
                class="block-field-image w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] text-[#160808] focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="URL รูปภาพ (เช่น /images/products/...) หรือกดเลือกจากเครื่อง"
                value="${escapeHtml(block.image || '')}"
              >
              <div class="flex items-center gap-2 flex-wrap">
                <input type="file" class="block-file-input hidden" accept="image/jpeg,image/png,image/webp">
                <button type="button" class="btn-browse-block-file px-3 py-1.5 bg-white hover:bg-gray-100 text-[#160808] border border-gray-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>เลือกจากเครื่อง & ครอบตัด</span>
                </button>
                <button type="button" class="btn-frame-block-image px-3 py-1.5 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs ${block.image ? '' : 'hidden'}" title="เปิดหน้าต่างจัดกรอบรูปภาพ 16:9">
                  ครอบตัดรูป 16:9
                </button>
                <button type="button" class="btn-use-primary-block-image px-3 py-1.5 bg-white hover:bg-gray-100 text-[#160808] border border-gray-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs" title="ดึงรูปสินค้าหลักมาใส่ในบล็อกนี้">
                  ใช้รูปสินค้าหลัก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind event listeners for this block card
    const headlineInput = card.querySelector('.block-field-headline');
    headlineInput.addEventListener('input', (e) => {
      block.headline = e.target.value;
    });

    const subheadlineInput = card.querySelector('.block-field-subheadline');
    subheadlineInput.addEventListener('input', (e) => {
      block.subheadline = e.target.value;
    });

    const paragraphInput = card.querySelector('.block-field-paragraph');
    paragraphInput.addEventListener('input', (e) => {
      block.paragraph = e.target.value;
    });

    const imageInput = card.querySelector('.block-field-image');
    const previewImg = card.querySelector('.block-preview-img');
    const dropzone = card.querySelector('.block-image-dropzone');
    const placeholderContainer = card.querySelector('.block-placeholder-container');
    const hoverOverlay = card.querySelector('.block-hover-overlay');
    const frameBtn = card.querySelector('.btn-frame-block-image');
    const clearImgBtn = card.querySelector('.btn-clear-block-image');

    const updateCardImage = (url) => {
      const cleanUrl = (url || '').trim();
      block.image = cleanUrl;
      imageInput.value = cleanUrl;
      if (cleanUrl) {
        previewImg.src = cleanUrl;
        previewImg.classList.remove('hidden');
        if (placeholderContainer) placeholderContainer.classList.add('hidden');
        if (hoverOverlay) hoverOverlay.classList.remove('hidden');
        if (frameBtn) frameBtn.classList.remove('hidden');
        clearImgBtn.classList.remove('hidden');
      } else {
        previewImg.src = '';
        previewImg.classList.add('hidden');
        if (placeholderContainer) placeholderContainer.classList.remove('hidden');
        if (hoverOverlay) hoverOverlay.classList.add('hidden');
        if (frameBtn) frameBtn.classList.add('hidden');
        clearImgBtn.classList.add('hidden');
      }
    };

    imageInput.addEventListener('input', (e) => {
      updateCardImage(e.target.value);
    });

    clearImgBtn.addEventListener('click', () => {
      updateCardImage('');
    });

    // Dropzone click & drag-drop interactions
    if (dropzone) {
      dropzone.addEventListener('click', () => {
        openShowcaseFramingModal(index, block.image || null);
      });

      ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('border-black', 'bg-blue-50/70', 'ring-2', 'ring-black');
        });
      });
      ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('border-black', 'bg-blue-50/70', 'ring-2', 'ring-black');
        });
      });
      dropzone.addEventListener('drop', (e) => {
        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith('image/')) {
          openShowcaseFramingModal(index, file);
        }
      });
    }

    if (frameBtn) {
      frameBtn.addEventListener('click', () => {
        openShowcaseFramingModal(index, block.image || null);
      });
    }

    const usePrimaryBtn = card.querySelector('.btn-use-primary-block-image');
    usePrimaryBtn.addEventListener('click', () => {
      if (!state.activeProduct || !state.activeProduct.images || state.activeProduct.images.length === 0) {
        showToast('สินค้านี้ยังไม่มีรูปภาพหลัก', 'error');
        return;
      }
      const raw0 = state.activeProduct.images[0];
      const primaryUrl = typeof raw0 === 'string' ? raw0 : (raw0.large || raw0.card || raw0.original || raw0.thumb || '');
      if (primaryUrl) {
        updateCardImage(primaryUrl);
        showToast('นำเข้ารูปภาพหลักสำเร็จ');
      }
    });

    const fileInput = card.querySelector('.block-file-input');
    const browseBtn = card.querySelector('.btn-browse-block-file');
    browseBtn.addEventListener('click', () => {
      fileInput.value = '';
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      openShowcaseFramingModal(index, file);
    });

    // Reorder & Delete buttons
    const moveUpBtn = card.querySelector('.btn-move-block-up');
    if (moveUpBtn) {
      moveUpBtn.addEventListener('click', () => {
        moveRichBlock(index, -1);
      });
    }

    const moveDownBtn = card.querySelector('.btn-move-block-down');
    if (moveDownBtn) {
      moveDownBtn.addEventListener('click', () => {
        moveRichBlock(index, 1);
      });
    }

    const deleteBtn = card.querySelector('.btn-delete-block');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        removeRichBlock(index);
      });
    }

    dom.drawerRichBlocksContainer.appendChild(card);
  });
}

function addRichBlock() {
  if (!state.activeProduct) return;
  state.activeProduct.richContent = state.activeProduct.richContent || {};
  state.activeProduct.richContent.blocks = state.activeProduct.richContent.blocks || [];

  const newBlock = {
    id: 'block-' + Date.now(),
    headline: '',
    subheadline: '',
    paragraph: '',
    image: ''
  };

  state.activeProduct.richContent.blocks.push(newBlock);
  renderDrawerRichContent();

  setTimeout(() => {
    if (dom.drawerRichBlocksContainer) {
      const cards = dom.drawerRichBlocksContainer.querySelectorAll('.rich-block-card');
      const lastCard = cards[cards.length - 1];
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const input = lastCard.querySelector('.block-field-headline');
        if (input) input.focus();
      }
    }
  }, 50);

  showToast('เพิ่มบล็อกเนื้อหาใหม่เรียบร้อย');
}

function removeRichBlock(index) {
  if (!state.activeProduct || !state.activeProduct.richContent?.blocks) return;
  const blocks = state.activeProduct.richContent.blocks;
  if (blocks.length <= 1) {
    blocks[0] = {
      id: 'block-' + Date.now(),
      headline: '',
      subheadline: '',
      paragraph: '',
      image: ''
    };
    renderDrawerRichContent();
    showToast('ล้างข้อมูลบล็อกเนื้อหาเรียบร้อย');
    return;
  }

  blocks.splice(index, 1);
  renderDrawerRichContent();
  showToast(`ลบบล็อกที่ ${index + 1} เรียบร้อย`);
}

function moveRichBlock(index, direction) {
  if (!state.activeProduct || !state.activeProduct.richContent?.blocks) return;
  const blocks = state.activeProduct.richContent.blocks;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= blocks.length) return;

  const temp = blocks[index];
  blocks[index] = blocks[targetIndex];
  blocks[targetIndex] = temp;

  renderDrawerRichContent();
}

/**
 * Showcase Live Preview Modal Handlers
 */
function openShowcasePreviewModal() {
  if (!dom.showcasePreviewModal) return;
  renderShowcasePreview();
  if (typeof dom.showcasePreviewModal.showModal === 'function') {
    dom.showcasePreviewModal.showModal();
  } else {
    dom.showcasePreviewModal.classList.remove('hidden');
  }
}

function closeShowcasePreviewModal() {
  if (!dom.showcasePreviewModal) return;
  if (typeof dom.showcasePreviewModal.close === 'function') {
    dom.showcasePreviewModal.close();
  } else {
    dom.showcasePreviewModal.classList.add('hidden');
  }
}

function setShowcasePreviewMode(mode) {
  if (!dom.showcasePreviewFrame) return;
  if (mode === 'mobile') {
    dom.showcasePreviewFrame.classList.remove('max-w-6xl');
    dom.showcasePreviewFrame.classList.add('max-w-[390px]');
    if (dom.btnShowcaseViewMobile) {
      dom.btnShowcaseViewMobile.classList.add('bg-white', 'text-black', 'shadow-2xs', 'font-bold');
      dom.btnShowcaseViewMobile.classList.remove('text-gray-600', 'font-semibold');
    }
    if (dom.btnShowcaseViewDesktop) {
      dom.btnShowcaseViewDesktop.classList.remove('bg-white', 'text-black', 'shadow-2xs', 'font-bold');
      dom.btnShowcaseViewDesktop.classList.add('text-gray-600', 'font-semibold');
    }
  } else {
    dom.showcasePreviewFrame.classList.remove('max-w-[390px]');
    dom.showcasePreviewFrame.classList.add('max-w-6xl');
    if (dom.btnShowcaseViewDesktop) {
      dom.btnShowcaseViewDesktop.classList.add('bg-white', 'text-black', 'shadow-2xs', 'font-bold');
      dom.btnShowcaseViewDesktop.classList.remove('text-gray-600', 'font-semibold');
    }
    if (dom.btnShowcaseViewMobile) {
      dom.btnShowcaseViewMobile.classList.remove('bg-white', 'text-black', 'shadow-2xs', 'font-bold');
      dom.btnShowcaseViewMobile.classList.add('text-gray-600', 'font-semibold');
    }
  }
}

function renderShowcasePreview() {
  if (!dom.showcasePreviewContent || !state.activeProduct) return;
  const blocks = normalizeRichBlocks(state.activeProduct);

  // Filter out completely empty blocks
  const visibleBlocks = blocks.filter(b => b.headline || b.subheadline || b.paragraph || b.image);

  if (visibleBlocks.length === 0) {
    dom.showcasePreviewContent.innerHTML = `
      <div class="py-16 text-center text-gray-400">
        <p class="text-sm font-semibold">ยังไม่มีเนื้อหาในบล็อกโชว์เคส</p>
        <p class="text-xs mt-1">กรอกหัวข้อหรือใส่รูปภาพในบล็อกเพื่อดูตัวอย่าง</p>
      </div>
    `;
    return;
  }

  const maxImgWidth = 'max-w-[1040px]';

  dom.showcasePreviewContent.innerHTML = visibleBlocks.map((b, i) => {
    const hasText = Boolean(b.headline || b.subheadline || b.paragraph);
    const hasImage = Boolean(b.image);

    return `
      <div class="story-preview-block mb-12 sm:mb-16 text-center">
        ${hasText ? `
          <div class="w-full ${maxImgWidth} mx-auto text-center px-4 sm:px-0 mb-8">
            ${b.headline ? `
              <h3 class="text-[24px] sm:text-[26px] font-semibold text-[#252525] mb-6 sm:mb-8">
                ${escapeHtml(b.headline)}
              </h3>
            ` : ''}
            ${b.subheadline ? `
              <h4 class="text-[19px] sm:text-[20px] font-semibold text-[#252525] mb-2 sm:mb-2.5">
                ${escapeHtml(b.subheadline)}
              </h4>
            ` : ''}
            ${b.paragraph ? `
              <p class="text-[16px] text-[#252525] leading-relaxed whitespace-pre-line w-full mx-auto">
                ${escapeHtml(b.paragraph)}
              </p>
            ` : ''}
          </div>
        ` : ''}

        ${hasImage ? `
          <div class="w-full ${maxImgWidth} mx-auto px-2 sm:px-0 flex justify-center mb-8">
            <img 
              src="${escapeHtml(b.image)}" 
              alt="Showcase image ${i + 1}" 
              class="max-w-full h-auto object-contain rounded-xl mx-auto"
              loading="lazy"
            >
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

/**
 * Attach Event Listeners to Rich / A+ Content Manager
 */
function attachRichContentListeners() {
  if (dom.btnAddRichBlock) {
    dom.btnAddRichBlock.addEventListener('click', addRichBlock);
  }

  if (dom.btnOpenShowcasePreview) {
    dom.btnOpenShowcasePreview.addEventListener('click', openShowcasePreviewModal);
  }

  if (dom.btnCloseShowcasePreview) {
    dom.btnCloseShowcasePreview.addEventListener('click', closeShowcasePreviewModal);
  }

  if (dom.btnShowcaseViewDesktop) {
    dom.btnShowcaseViewDesktop.addEventListener('click', () => setShowcasePreviewMode('desktop'));
  }

  if (dom.btnShowcaseViewMobile) {
    dom.btnShowcaseViewMobile.addEventListener('click', () => setShowcasePreviewMode('mobile'));
  }

  if (dom.showcasePreviewModal) {
    dom.showcasePreviewModal.addEventListener('click', (e) => {
      if (e.target === dom.showcasePreviewModal) {
        closeShowcasePreviewModal();
      }
    });
  }
}

/**
 * Gallery & Primary Cover Manager (Tab 1)
 */
function normalizeImageItem(img) {
  if (!img) return null;
  if (typeof img === 'string') {
    return { thumb: img, card: img, large: img, original: img };
  }
  const u = img.thumb || img.card || img.large || img.original || '';
  return {
    thumb: img.thumb || u,
    card: img.card || u,
    large: img.large || u,
    original: img.original || u
  };
}

function renderDrawerGallery() {
  if (!dom.drawerGalleryGrid || !state.activeProduct) return;

  const rawImages = state.activeProduct.images || [];
  const images = rawImages.map(normalizeImageItem).filter(Boolean);
  state.activeProduct.images = images;

  if (dom.drawerGalleryCountBadge) {
    dom.drawerGalleryCountBadge.textContent = `${images.length} รูป`;
  }

  const imgStatusEl = document.getElementById('drawer-image-status');
  if (imgStatusEl) {
    imgStatusEl.textContent = images.length > 0 ? `มีรูปภาพ ${images.length} รูป` : 'ยังไม่มีรูป';
  }

  if (images.length === 0) {
    dom.drawerGalleryGrid.innerHTML = `
      <div id="btn-gallery-empty-dropzone" class="col-span-full p-8 text-center bg-gray-50/80 rounded-2xl border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100/70 transition-all cursor-pointer group shadow-2xs">
        <div class="w-12 h-12 rounded-full bg-white text-gray-400 group-hover:bg-[#160808] group-hover:text-white flex items-center justify-center mx-auto mb-2.5 shadow-xs transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-sm font-bold text-[#160808]">ลากรูปภาพสินค้ามาวางที่นี่ (เลือกได้หลายรูปพร้อมกัน)</p>
        <p class="text-xs text-[#424245] mt-1">หรือคลิกเพื่อเลือกไฟล์ภาพจากคอมพิวเตอร์ (รองรับ JPG, PNG, WebP)</p>
      </div>
    `;

    const emptyDropzone = document.getElementById('btn-gallery-empty-dropzone');
    if (emptyDropzone && dom.drawerGalleryFileInput) {
      emptyDropzone.addEventListener('click', () => {
        dom.drawerGalleryFileInput.value = '';
        dom.drawerGalleryFileInput.click();
      });
    }
    return;
  }

  const tilesHTML = images.map((img, index) => {
    const isPrimary = index === 0;
    const imgUrl = img.card || img.thumb || img.large || img.original;

    return `
      <div class="gallery-tile relative group bg-white rounded-xl border ${isPrimary ? 'border-black ring-2 ring-black/10' : 'border-gray-200 hover:border-gray-400'} p-2 flex flex-col justify-between transition-all shadow-2xs" data-index="${index}">
        <!-- Image Preview Frame (1:1 Square) -->
        <div class="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center relative mb-2 border border-gray-100">
          <img src="${imgUrl}" alt="Gallery ${index + 1}" class="w-full h-full object-contain p-1" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300/F2F2F7/8E8E93?text=UDO'">
          
          <!-- Primary or Index Badge -->
          <div class="absolute top-1.5 left-1.5 flex items-center gap-1">
            ${isPrimary ? `
              <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#160808] text-white shadow-xs inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>รูปหลัก</span>
              </span>
            ` : `
              <span class="px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-black/60 backdrop-blur-xs text-white">
                #${index + 1}
              </span>
            `}
          </div>

          <!-- Quick Action Controls (Hover overlay) -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
            <button type="button" class="btn-gallery-frame px-2.5 py-1.5 bg-white text-[#160808] hover:bg-black hover:text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer shadow-md transition-all active:scale-95" data-index="${index}" title="จัดตำแหน่งและครอบตัดภาพนี้ 1:1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>จัดกรอบ 1:1</span>
            </button>
            <button type="button" class="btn-gallery-remove p-1.5 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold cursor-pointer shadow-md transition-all active:scale-95" data-index="${index}" title="ลบรูปนี้ออกจากคลัง">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tile Bottom Bar -->
        <div class="flex items-center justify-between gap-1 pt-1.5 border-t border-gray-100">
          ${isPrimary ? `
            <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md text-center flex-1 border border-emerald-200/60">
              แสดงเป็นการ์ดหน้าร้าน
            </span>
          ` : `
            <button type="button" class="btn-set-primary flex-1 py-1.5 px-2 bg-gray-100 hover:bg-black hover:text-white rounded-lg text-xs font-semibold text-[#160808] transition-colors cursor-pointer text-center" data-index="${index}">
              ตั้งเป็นรูปหลัก
            </button>
          `}

          <!-- Move Left / Right -->
          <div class="flex items-center gap-0.5 shrink-0">
            <button type="button" class="btn-gallery-move-left p-1 text-gray-400 hover:text-black rounded ${index === 0 ? 'invisible pointer-events-none' : 'cursor-pointer'}" data-index="${index}" title="เลื่อนไปซ้าย">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button type="button" class="btn-gallery-move-right p-1 text-gray-400 hover:text-black rounded ${index === images.length - 1 ? 'invisible pointer-events-none' : 'cursor-pointer'}" data-index="${index}" title="เลื่อนไปขวา">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 3. Trailing "Add More" Card Slot
  const addSlotHTML = `
    <div id="btn-gallery-add-slot" class="gallery-add-slot aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-black bg-gray-50/70 hover:bg-gray-100 transition-all cursor-pointer flex flex-col items-center justify-center p-3 text-center group shadow-2xs" title="คลิกเพื่อเลือกไฟล์ หรือ ลากรูปภาพมาวางที่นี่">
      <div class="w-9 h-9 rounded-full bg-white group-hover:bg-[#160808] text-gray-400 group-hover:text-white flex items-center justify-center shadow-xs transition-colors mb-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <span class="text-xs font-bold text-[#160808] block leading-tight">เพิ่มรูปภาพอีก</span>
      <span class="text-[10px] text-[#424245] block mt-0.5">ลากวาง หรือ คลิกเลือก</span>
    </div>
  `;

  dom.drawerGalleryGrid.innerHTML = tilesHTML + addSlotHTML;

  // Bind Add Slot Click
  const addSlot = document.getElementById('btn-gallery-add-slot');
  if (addSlot && dom.drawerGalleryFileInput) {
    addSlot.addEventListener('click', () => {
      dom.drawerGalleryFileInput.value = '';
      dom.drawerGalleryFileInput.click();
    });
  }

  // Bind Tile Buttons
  dom.drawerGalleryGrid.querySelectorAll('.btn-set-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.index, 10);
      setPrimaryGalleryImage(idx);
    });
  });

  dom.drawerGalleryGrid.querySelectorAll('.btn-gallery-move-left').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.index, 10);
      moveGalleryImage(idx, -1);
    });
  });

  dom.drawerGalleryGrid.querySelectorAll('.btn-gallery-move-right').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.index, 10);
      moveGalleryImage(idx, 1);
    });
  });

  dom.drawerGalleryGrid.querySelectorAll('.btn-gallery-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.index, 10);
      removeGalleryImage(idx);
    });
  });

  dom.drawerGalleryGrid.querySelectorAll('.btn-gallery-frame').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.index, 10);
      openFramingForGalleryIndex(idx);
    });
  });
}

function setPrimaryGalleryImage(index) {
  if (!state.activeProduct || !Array.isArray(state.activeProduct.images)) return;
  if (index <= 0 || index >= state.activeProduct.images.length) return;

  const [picked] = state.activeProduct.images.splice(index, 1);
  state.activeProduct.images.unshift(picked);

  renderDrawerGallery();
  updateDrawerLivePreview();
  showToast(`ตั้งรูปภาพลำดับที่ ${index + 1} เป็นรูปหลักหน้าร้านเรียบร้อย`);
}

function moveGalleryImage(index, direction) {
  if (!state.activeProduct || !Array.isArray(state.activeProduct.images)) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= state.activeProduct.images.length) return;

  const temp = state.activeProduct.images[index];
  state.activeProduct.images[index] = state.activeProduct.images[targetIndex];
  state.activeProduct.images[targetIndex] = temp;

  renderDrawerGallery();
  updateDrawerLivePreview();
}

function removeGalleryImage(index) {
  if (!state.activeProduct || !Array.isArray(state.activeProduct.images)) return;
  if (index < 0 || index >= state.activeProduct.images.length) return;

  state.activeProduct.images.splice(index, 1);
  renderDrawerGallery();
  updateDrawerLivePreview();
  showToast('ลบรูปภาพออกจากคลังเรียบร้อย');
}

function addGalleryImage(url, skipToast = false) {
  if (!state.activeProduct || !url) return;
  state.activeProduct.images = state.activeProduct.images || [];

  const cleanUrl = url.trim();
  state.activeProduct.images.push({
    thumb: cleanUrl,
    card: cleanUrl,
    large: cleanUrl,
    original: cleanUrl
  });

  renderDrawerGallery();
  updateDrawerLivePreview();
  if (!skipToast) {
    showToast('เพิ่มรูปภาพเข้าสู่คลังเรียบร้อย');
  }
}

async function uploadGalleryFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const files = Array.from(fileList).filter(f => f.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|heic)$/i.test(f.name));

  if (files.length === 0) {
    showToast('กรุณาเลือกไฟล์ภาพที่ถูกต้อง (รองรับ JPG, PNG, WebP)', 'error');
    return;
  }

  if (dom.btnBrowseGalleryImg) {
    dom.btnBrowseGalleryImg.disabled = true;
    dom.btnBrowseGalleryImg.innerHTML = `
      <span class="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      <span>กำลังอัปโหลด (${files.length} รูป)...</span>
    `;
  }

  let successCount = 0;
  let failCount = 0;

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      if (state.activeProduct && state.activeProduct.id) {
        formData.append('product_id', state.activeProduct.id);
      }

      try {
        const res = await fetch('/api/admin/upload.php', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        const data = await res.json();
        if (res.ok && data.success && data.image_url) {
          addGalleryImage(data.image_url, true);
          successCount++;
        } else {
          failCount++;
          console.error('File upload failed for', file.name, data.error);
        }
      } catch (err) {
        failCount++;
        console.error('Upload error for', file.name, err);
      }
    }

    if (successCount > 0) {
      showToast(`อัปโหลดรูปภาพเข้าสู่คลังสำเร็จ ${successCount} รูป${failCount > 0 ? ` (ไม่สำเร็จ ${failCount} รูป)` : ''}`);
    } else if (failCount > 0) {
      showToast('ไม่สามารถอัปโหลดรูปภาพได้ กรุณาตรวจสอบไฟล์', 'error');
    }
  } finally {
    if (dom.drawerGalleryFileInput) {
      dom.drawerGalleryFileInput.value = '';
    }
    if (dom.btnBrowseGalleryImg) {
      dom.btnBrowseGalleryImg.disabled = false;
      dom.btnBrowseGalleryImg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>+ เพิ่มรูปภาพ (เลือกหลายรูปได้)</span>
      `;
    }
  }
}

function openFramingForGalleryIndex(index) {
  if (!state.activeProduct || !state.activeProduct.images || !state.activeProduct.images[index]) return;
  state.framingTargetIndex = index;
  const imgObj = state.activeProduct.images[index];
  const url = typeof imgObj === 'string' ? imgObj : (imgObj.original || imgObj.large || imgObj.card || imgObj.thumb);
  openImageFramingModal(url);
}

/**
 * Product Deletion System
 */
let deletionTarget = null; // { type: 'single', product: {...} } or { type: 'batch', ids: [...] }

function openSingleDeleteModal(product) {
  if (!product || !dom.deleteConfirmModal) return;
  deletionTarget = { type: 'single', product };

  if (dom.deleteModalTitle) dom.deleteModalTitle.textContent = 'ยืนยันการลบสินค้าออกจากระบบ';
  if (dom.deleteModalSingleInfo) dom.deleteModalSingleInfo.classList.remove('hidden');
  if (dom.deleteModalBatchInfo) dom.deleteModalBatchInfo.classList.add('hidden');

  const rawImg = product.images?.[0];
  const imgUrl = typeof rawImg === 'string' ? rawImg : (rawImg?.thumb || rawImg?.card || rawImg?.large || '');
  if (dom.deleteModalImg) dom.deleteModalImg.src = imgUrl || 'https://via.placeholder.com/100x100/F2F2F7/8E8E93?text=UDO';
  if (dom.deleteModalName) dom.deleteModalName.textContent = product.name || '-';
  if (dom.deleteModalSku) dom.deleteModalSku.textContent = `SKU: ${product.sku || product.variants?.[0]?.sku || product.id}`;
  if (dom.deleteModalCat) {
    const catName = product.category || product.categories?.[0]?.name || 'หมวดหมู่ทั่วไป';
    dom.deleteModalCat.textContent = catName;
  }

  dom.deleteConfirmModal.showModal();
}

function openBatchDeleteModal() {
  if (!dom.deleteConfirmModal || state.selectedProductIds.size === 0) {
    showToast('กรุณาเลือกสินค้าที่ต้องการลบอย่างน้อย 1 รายการ', 'error');
    return;
  }

  const ids = Array.from(state.selectedProductIds);
  deletionTarget = { type: 'batch', ids };

  if (dom.deleteModalTitle) dom.deleteModalTitle.textContent = 'ยืนยันการลบสินค้าที่เลือก';
  if (dom.deleteModalSingleInfo) dom.deleteModalSingleInfo.classList.add('hidden');
  if (dom.deleteModalBatchInfo) dom.deleteModalBatchInfo.classList.remove('hidden');
  if (dom.deleteModalBatchCount) dom.deleteModalBatchCount.textContent = ids.length.toLocaleString();

  dom.deleteConfirmModal.showModal();
}

function closeDeleteConfirmModal() {
  if (dom.deleteConfirmModal) {
    if (typeof dom.deleteConfirmModal.close === 'function') {
      try {
        dom.deleteConfirmModal.close();
      } catch (e) {
        // Safe fallback
      }
    }
    dom.deleteConfirmModal.removeAttribute('open');
  }
  deletionTarget = null;
}

/**
 * Recompute metrics and refresh statistics across UI after mutation (deletion, creation, status change)
 */
function updateStats() {
  const total = state.allProductsCache.length;
  let pubCount = 0;
  let draftCount = 0;
  let suspendedCount = 0;
  let inStock = 0;
  let outStock = 0;
  let specialOrder = 0;
  let bestSeller = 0;
  let newArrival = 0;
  let recommended = 0;
  let promotion = 0;

  state.allProductsCache.forEach(p => {
    const st = p.status || 'publish';
    if (st === 'publish') pubCount++;
    else if (st === 'draft') draftCount++;
    else if (st === 'suspended') suspendedCount++;

    const av = p.availability || (p.flags?.is_in_stock ? 'in_stock' : 'out_of_stock');
    if (av === 'in_stock') inStock++;
    else if (av === 'out_of_stock') outStock++;
    else if (av === 'special_order') specialOrder++;

    const sh = p.storefront_shelves || {};
    if (sh.best_seller) bestSeller++;
    if (sh.new_arrival) newArrival++;
    if (sh.recommended) recommended++;
    if (sh.promotion) promotion++;
  });

  state.summary = {
    total,
    publish: pubCount,
    draft: draftCount,
    suspended: suspendedCount,
    in_stock: inStock,
    out_of_stock: outStock,
    special_order: specialOrder,
    best_seller: bestSeller,
    new_arrival: newArrival,
    recommended,
    promotion
  };

  state.totalProducts = total;
  renderMetrics();
  updateStatusPillVisuals();
  buildBrandTaxonomy(state.allProductsCache);
}

async function handleConfirmDelete() {
  if (!deletionTarget) return;

  if (dom.deleteModalConfirmBtn) {
    dom.deleteModalConfirmBtn.disabled = true;
    dom.deleteModalConfirmBtn.textContent = 'กำลังลบข้อมูล...';
  }

  try {
    if (deletionTarget.type === 'single') {
      const pid = deletionTarget.product.id;
      const productName = deletionTarget.product.name || 'สินค้า';
      const res = await fetch('/api/admin/products.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'delete_product', id: pid })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        // Fallback for non-JSON response
      }

      // If already deleted on server (404), treat as successfully removed
      if (!res.ok && res.status !== 404) {
        throw new Error(data.error || `HTTP ${res.status}: ไม่สามารถลบสินค้าได้`);
      }

      // Remove from client state
      state.products = state.products.filter(p => p.id !== pid);
      state.allProductsCache = state.allProductsCache.filter(p => p.id !== pid);
      state.selectedProductIds.delete(pid);

      // If drawer was open for this product, close it
      if (state.activeProduct && state.activeProduct.id === pid) {
        closeProductDrawer();
      }

      updateStats();
      renderProductRows();
      renderPagination();
      renderFloatingBatchDock();
      closeDeleteConfirmModal();

      const successMsg = res.status === 404
        ? `ลบสินค้า ${productName} ออกจากหน้าจอเรียบร้อย (ข้อมูลถูกลบจากเซิร์ฟเวอร์แล้ว)`
        : `ลบสินค้า ${productName} ออกจากระบบเรียบร้อย`;
      showToast(successMsg);
      broadcastCatalogUpdate();

    } else if (deletionTarget.type === 'batch') {
      const ids = deletionTarget.ids;
      const res = await fetch('/api/admin/products.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'batch_delete_products', ids })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        // Fallback
      }

      if (!res.ok && res.status !== 404) {
        throw new Error(data.error || `HTTP ${res.status}: ไม่สามารถลบสินค้ากลุ่มได้`);
      }

      const idSet = new Set(ids);
      state.products = state.products.filter(p => !idSet.has(p.id));
      state.allProductsCache = state.allProductsCache.filter(p => !idSet.has(p.id));
      state.selectedProductIds.clear();

      updateStats();
      renderProductRows();
      renderPagination();
      renderFloatingBatchDock();
      closeDeleteConfirmModal();
      showToast(`ลบสินค้าจำนวน ${ids.length} รายการเรียบร้อย`);
      broadcastCatalogUpdate();
    }
  } catch (err) {
    console.error('Delete error:', err);
    showToast(err.message || 'เกิดข้อผิดพลาดในการลบสินค้า', 'error');
  } finally {
    if (dom.deleteModalConfirmBtn) {
      dom.deleteModalConfirmBtn.disabled = false;
      dom.deleteModalConfirmBtn.textContent = 'ยืนยันการลบถาวร';
    }
  }
}

/**
 * WYSIWYG Live Preview Updater
 */
function updateDrawerLivePreview() {
  if (!state.activeProduct || !dom.drawerPreviewCard) return;

  // Read current values
  const previewProduct = JSON.parse(JSON.stringify(state.activeProduct));
  if (dom.drawerName) previewProduct.name = dom.drawerName.value.trim() || 'ชื่อสินค้าตัวอย่าง';
  if (dom.drawerNameEn) previewProduct.name_en = dom.drawerNameEn.value.trim();
  if (dom.drawerBrand) previewProduct.brand = dom.drawerBrand.value.trim();
  if (dom.drawerSortPriority) previewProduct.sort_priority = parseInt(dom.drawerSortPriority.value, 10) || 100;

  previewProduct.flags = previewProduct.flags || {};
  if (dom.drawerFlagBest) previewProduct.flags.is_best_seller = dom.drawerFlagBest.checked;
  if (dom.drawerFlagNew) previewProduct.flags.is_new_arrival = dom.drawerFlagNew.checked;
  if (dom.drawerFlagRec) previewProduct.flags.is_recommended = dom.drawerFlagRec.checked;
  if (dom.drawerFlagPromo) previewProduct.flags.is_promotion = dom.drawerFlagPromo.checked;

  // Read updated variants from DOM
  if (dom.drawerVariantsList) {
    const vRows = dom.drawerVariantsList.querySelectorAll('.variant-item-row');
    if (vRows.length > 0) {
      previewProduct.variants = [];
      vRows.forEach(row => {
        const sizeInput = row.querySelector('.v-input-size');
        const pkgInput = row.querySelector('.v-input-package');
        const skuInput = row.querySelector('.v-input-sku');
        const priceInput = row.querySelector('.v-input-price');
        const origPriceInput = row.querySelector('.v-input-original-price');
        const stockInput = row.querySelector('.v-input-stock');

        const size = (sizeInput?.value || 'มาตรฐาน').trim();
        const pkg = (pkgInput?.value || 'ชิ้น').trim();
        const sku = (skuInput?.value || '').trim();
        const price = Math.max(0, parseFloat(priceInput?.value) || 0);
        const origRaw = parseFloat(origPriceInput?.value);
        const originalPrice = (!isNaN(origRaw) && origRaw > price) ? origRaw : null;
        const stock = Math.max(0, parseInt(stockInput?.value, 10) || 0);

        previewProduct.variants.push({
          size,
          package: pkg,
          unit: pkg.split(' ')[0] || pkg,
          weight: '',
          price,
          original_price: originalPrice,
          stock,
          sku: sku || previewProduct.sku || previewProduct.id
        });
      });
      previewProduct.flags.is_in_stock = previewProduct.variants.some(v => (v.stock || 0) > 0);
    }
  }

  // Generate Storefront Card HTML
  dom.drawerPreviewCard.innerHTML = generateCardHTML(previewProduct, true);
}

/**
 * Save Drawer Changes to REST API
 */
async function handleSaveDrawer() {
  if (!state.activeProduct) return;

  const pid = dom.drawerPid ? dom.drawerPid.value : state.activeProduct.id;
  const name = dom.drawerName ? dom.drawerName.value.trim() : state.activeProduct.name;
  const nameEn = dom.drawerNameEn ? dom.drawerNameEn.value.trim() : '';
  const brand = dom.drawerBrand ? dom.drawerBrand.value.trim() : 'UDO';
  const sortPriority = dom.drawerSortPriority ? parseInt(dom.drawerSortPriority.value, 10) : 100;
  const description = dom.drawerDesc ? dom.drawerDesc.value.trim() : '';

  const isBest = dom.drawerFlagBest ? dom.drawerFlagBest.checked : false;
  const isNew = dom.drawerFlagNew ? dom.drawerFlagNew.checked : Boolean(state.activeProduct.flags?.is_new_arrival);
  const isRec = dom.drawerFlagRec ? dom.drawerFlagRec.checked : false;
  const isPromo = dom.drawerFlagPromo ? dom.drawerFlagPromo.checked : false;

  // Assemble updated variants from 2-Tier Matrix rows
  const updatedVariants = [];
  if (dom.drawerVariantsList) {
    const vRows = dom.drawerVariantsList.querySelectorAll('.variant-item-row');
    vRows.forEach((row) => {
      const vIdx = parseInt(row.dataset.vindex, 10);
      const existing = (state.activeProduct.variants && !isNaN(vIdx) && state.activeProduct.variants[vIdx])
        ? state.activeProduct.variants[vIdx]
        : {};

      const sizeInput = row.querySelector('.v-input-size');
      const pkgInput = row.querySelector('.v-input-package');
      const skuInput = row.querySelector('.v-input-sku');
      const priceInput = row.querySelector('.v-input-price');
      const origPriceInput = row.querySelector('.v-input-original-price');
      const stockInput = row.querySelector('.v-input-stock');

      const sizeVal = sizeInput ? sizeInput.value.trim() : (existing.size || 'มาตรฐาน');
      const pkgVal = pkgInput ? pkgInput.value.trim() : (existing.package || 'ชิ้น');
      const skuVal = skuInput ? skuInput.value.trim() : (existing.sku || '');
      const priceVal = priceInput ? Math.max(0, parseFloat(priceInput.value) || 0) : (existing.price || 0);
      const origRaw = origPriceInput ? parseFloat(origPriceInput.value) : NaN;
      const origPriceVal = (!isNaN(origRaw) && origRaw > priceVal) ? origRaw : (origRaw > 0 ? origRaw : null);
      const stockVal = stockInput ? Math.max(0, parseInt(stockInput.value, 10) || 0) : (existing.stock || 0);

      updatedVariants.push({
        ...existing,
        size: sizeVal,
        package: pkgVal,
        unit: pkgVal.split(' ')[0] || pkgVal,
        sku: skuVal,
        price: priceVal,
        original_price: origPriceVal,
        stock: stockVal
      });
    });
  }

  if (updatedVariants.length === 0) {
    updatedVariants.push(...(state.activeProduct.variants || []));
  }
  state.activeProduct.variants = updatedVariants;

  // Assemble updated specsTable from DOM rows
  const updatedSpecs = [];
  if (dom.drawerSpecsTbody) {
    const sRows = dom.drawerSpecsTbody.querySelectorAll('.spec-item-row');
    sRows.forEach(row => {
      const kInput = row.querySelector('.spec-key-input');
      const vInput = row.querySelector('.spec-value-input');
      const k = kInput ? kInput.value.trim() : '';
      const v = vInput ? vInput.value.trim() : '';
      if (k || v) {
        updatedSpecs.push({ key: k, value: v });
      }
    });
  }
  if (updatedSpecs.length > 0) {
    state.activeProduct.specsTable = updatedSpecs;
  }

  const hasStock = updatedVariants.some(v => (v.stock || 0) > 0);

  const selectedPubRadio = document.querySelector('input[name="drawer-publish-status"]:checked');
  const publishStatus = selectedPubRadio ? selectedPubRadio.value : 'publish';

  const selectedFulRadio = document.querySelector('input[name="drawer-fulfillment-status"]:checked');
  const availabilityStatus = selectedFulRadio ? selectedFulRadio.value : (hasStock ? 'in_stock' : 'out_of_stock');

  // Compute storefront shelves
  const curShelves = state.activeProduct.storefront_shelves || {};
  const newShelves = {
    best_seller: isBest ? (curShelves.best_seller || 999) : null,
    new_arrival: isNew ? (curShelves.new_arrival || 999) : null,
    recommended: isRec ? (curShelves.recommended || 999) : null,
    promotion: isPromo ? (curShelves.promotion || 999) : null
  };

  const currentCollections = new Set(state.activeProduct.collections || []);
  if (isNew) currentCollections.add('new-arrival'); else currentCollections.delete('new-arrival');
  if (isBest) currentCollections.add('top-sale'); else currentCollections.delete('top-sale');
  if (isRec) currentCollections.add('for-you'); else currentCollections.delete('for-you');
  if (isPromo) currentCollections.add('promotion'); else currentCollections.delete('promotion');

  const selectedCatOption = dom.drawerCategory ? dom.drawerCategory.options[dom.drawerCategory.selectedIndex] : null;
  const currentCategoryName = selectedCatOption ? (selectedCatOption.getAttribute('data-name') || selectedCatOption.text) : (state.activeProductCategory || 'กลุ่มลวดเชื่อม');
  const currentCategorySlug = dom.drawerCategory ? dom.drawerCategory.value : 'cat-12';

  const payload = {
    id: pid,
    name,
    name_en: nameEn,
    brand,
    description,
    categories: [
      {
        level: 1,
        name: currentCategoryName,
        url_slug: currentCategorySlug
      }
    ],
    status: publishStatus,
    availability: availabilityStatus,
    sort_priority: sortPriority,
    storefront_shelves: newShelves,
    collections: Array.from(currentCollections),
    flags: {
      is_in_stock: hasStock,
      is_best_seller: isBest,
      is_new_arrival: isNew,
      is_recommended: isRec,
      is_promotion: isPromo
    },
    images: state.activeProduct.images || [],
    variants: updatedVariants
  };

  if (state.activeProduct.specsTable) {
    payload.specsTable = state.activeProduct.specsTable;
  }

  // Assemble updated richContent with Modular Story Blocks
  const blocks = normalizeRichBlocks(state.activeProduct);
  const richIsDocument = dom.drawerRichIsDocument ? dom.drawerRichIsDocument.checked : false;

  const existingRich = state.activeProduct.richContent || {};
  const updatedRichContent = {
    ...existingRich,
    isDocument: richIsDocument,
    blocks: blocks,
    // Legacy fallback keys for full backward compatibility:
    headline: blocks[0]?.headline || name,
    subheadline: blocks[0]?.subheadline || null,
    description: blocks[0]?.paragraph || '',
    image1: blocks[0]?.image || null,
    image2: blocks[1]?.image || null,
    image3: blocks[2]?.image || null,
    tablesHtml: existingRich.tablesHtml || ''
  };

  state.activeProduct.richContent = updatedRichContent;
  payload.richContent = updatedRichContent;

  if (state.isCreateMode) {
    payload.action = 'create_product';
    payload.is_new = true;
  }

  const originalBtnText = dom.drawerSaveBtn ? dom.drawerSaveBtn.textContent : 'บันทึกข้อมูล';
  if (dom.drawerSaveBtn) {
    dom.drawerSaveBtn.disabled = true;
    dom.drawerSaveBtn.textContent = 'กำลังบันทึกลงฐานข้อมูล...';
  }

  try {
    const res = await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to save product in database');
    }

    const toastMsg = state.isCreateMode 
      ? `เพิ่มสินค้าใหม่ "${name || 'สินค้าใหม่'}" เข้าสู่ฐานข้อมูลเรียบร้อย`
      : `บันทึกข้อมูลสินค้า ${name} ลงฐานข้อมูลเรียบร้อย`;

    state.isCreateMode = false;
    closeProductDrawer();
    showToast(toastMsg);

    fetchProducts(state.currentPage);
    loadAllProductsCatalog();
    broadcastCatalogUpdate();
  } catch (err) {
    console.error('Save product database error:', err);
    showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + err.message, 'error');
  } finally {
    if (dom.drawerSaveBtn) {
      dom.drawerSaveBtn.disabled = false;
      dom.drawerSaveBtn.textContent = originalBtnText;
    }
  }
}

/**
 * Product Image Framing & Positioning Canvas Controller
 * 1:1 Fixed Aspect Ratio, Center Crosshairs & Safe Zone
 * Exports 800x800 WebP for storefront card match
 */
const framingState = {
  img: null,
  imgLoaded: false,
  baseScale: 1.0,
  userZoom: 1.0,
  panX: 0,
  panY: 0,
  rotation: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  panStartX: 0,
  panStartY: 0,
  currentProductImageUrl: ''
};

function openImageFramingModal(targetUrl = '') {
  if (!dom.imageFramingModal) return;

  // Resolve current active product image or passed targetUrl
  let initialSrc = typeof targetUrl === 'string' ? targetUrl : '';
  if (!initialSrc && state.activeProduct) {
    const rawImg = state.activeProduct.images?.[0];
    if (typeof rawImg === 'string') {
      initialSrc = rawImg;
    } else if (rawImg && typeof rawImg === 'object') {
      initialSrc = rawImg.large || rawImg.original || rawImg.card || rawImg.thumb || '';
    }
  }

  // Reset state
  framingState.userZoom = 1.0;
  framingState.panX = 0;
  framingState.panY = 0;
  framingState.rotation = 0;
  framingState.currentProductImageUrl = initialSrc;

  if (dom.framingZoomSlider) dom.framingZoomSlider.value = '1.0';
  if (dom.framingZoomLabel) dom.framingZoomLabel.textContent = '100%';

  dom.imageFramingModal.showModal();

  if (initialSrc) {
    loadImageIntoFraming(initialSrc);
  } else {
    // Show placeholder in canvas until image selected
    framingState.img = null;
    framingState.imgLoaded = false;
    renderFramingDisplay();
  }
}

function closeImageFramingModal() {
  state.framingTargetIndex = null;
  if (dom.imageFramingModal) {
    if (typeof dom.imageFramingModal.close === 'function') {
      try { dom.imageFramingModal.close(); } catch (e) {}
    }
    dom.imageFramingModal.removeAttribute('open');
  }
}

function loadImageIntoFraming(srcOrFile) {
  if (!srcOrFile) return;

  if (srcOrFile instanceof File || srcOrFile instanceof Blob) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => initFramingImageDimensions(img);
      img.onerror = () => {
        showToast('ไม่สามารถเปิดรูปภาพนี้ได้ กรุณาลองไฟล์อื่น', 'error');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      showToast('เกิดข้อผิดพลาดในการอ่านไฟล์', 'error');
    };
    reader.readAsDataURL(srcOrFile);
  } else if (typeof srcOrFile === 'string') {
    let finalSrc = srcOrFile;
    if (finalSrc.startsWith('https://www.udo.co.th/')) {
      finalSrc = '/api/admin/upload.php?proxy_url=' + encodeURIComponent(finalSrc);
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => initFramingImageDimensions(img);
    img.onerror = () => {
      console.warn('Failed to load image into framing canvas:', srcOrFile);
      // Fallback: draw placeholder
      framingState.img = null;
      framingState.imgLoaded = false;
      renderFramingDisplay();
    };
    img.src = finalSrc;
  }
}

function initFramingImageDimensions(img) {
  framingState.img = img;
  framingState.imgLoaded = true;

  // Fit image inside 400x400 canvas with slight breathing room
  const nw = img.naturalWidth || 400;
  const nh = img.naturalHeight || 400;
  const fitScale = Math.min(380 / nw, 380 / nh);

  framingState.baseScale = Math.max(0.1, fitScale);
  framingState.userZoom = 1.0;
  framingState.panX = 0;
  framingState.panY = 0;
  framingState.rotation = 0;

  if (dom.framingZoomSlider) dom.framingZoomSlider.value = '1.0';
  if (dom.framingZoomLabel) dom.framingZoomLabel.textContent = '100%';

  renderFramingDisplay();
}

function drawFramingOnCanvas(canvas, targetSize = 400) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.save();
  ctx.clearRect(0, 0, targetSize, targetSize);

  // Background: Solid white for clean e-commerce cards
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetSize, targetSize);

  if (!framingState.imgLoaded || !framingState.img) {
    // Empty state
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ยังไม่ได้เลือกรูปภาพ (ลากไฟล์มาวางที่นี่)', targetSize / 2, targetSize / 2);
    ctx.restore();
    return;
  }

  const cx = targetSize / 2;
  const cy = targetSize / 2;
  const ratio = targetSize / 400;

  ctx.translate(cx, cy);
  ctx.rotate((framingState.rotation * Math.PI) / 180);

  const totalZoom = framingState.baseScale * framingState.userZoom * ratio;
  ctx.scale(totalZoom, totalZoom);

  const nw = framingState.img.naturalWidth;
  const nh = framingState.img.naturalHeight;
  const drawX = -nw / 2 + (framingState.panX * ratio) / totalZoom;
  const drawY = -nh / 2 + (framingState.panY * ratio) / totalZoom;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(framingState.img, drawX, drawY, nw, nh);

  ctx.restore();
}

function renderFramingDisplay() {
  if (dom.framingDisplayCanvas) {
    drawFramingOnCanvas(dom.framingDisplayCanvas, 400);
  }
}

function updateFramingZoom(newZoom) {
  const clamped = Math.min(3.0, Math.max(1.0, parseFloat(newZoom) || 1.0));
  framingState.userZoom = clamped;

  if (dom.framingZoomSlider) dom.framingZoomSlider.value = clamped.toFixed(2);
  if (dom.framingZoomLabel) dom.framingZoomLabel.textContent = Math.round(clamped * 100) + '%';

  renderFramingDisplay();
}

function snapFramingToCenter() {
  framingState.panX = 0;
  framingState.panY = 0;
  framingState.userZoom = 1.0;

  if (dom.framingZoomSlider) dom.framingZoomSlider.value = '1.0';
  if (dom.framingZoomLabel) dom.framingZoomLabel.textContent = '100%';

  renderFramingDisplay();
}

function rotateFramingImage() {
  framingState.rotation = (framingState.rotation + 90) % 360;
  renderFramingDisplay();
}

async function handleApplyFramingAndUpload() {
  if (!framingState.imgLoaded || !framingState.img) {
    showToast('กรุณาเลือกหรือวางรูปภาพก่อนบันทึก', 'error');
    return;
  }

  if (dom.framingUploadSpinner) dom.framingUploadSpinner.classList.remove('hidden');
  if (dom.btnFramingApplyUpload) dom.btnFramingApplyUpload.disabled = true;
  if (dom.framingApplyText) dom.framingApplyText.textContent = 'กำลังประมวลผล WebP 800x800...';

  try {
    // 1. Draw 800x800 resolution onto export canvas
    const exportCanvas = dom.framingExportCanvas || document.createElement('canvas');
    exportCanvas.width = 800;
    exportCanvas.height = 800;
    drawFramingOnCanvas(exportCanvas, 800);

    // 2. Convert to WebP Blob (fallback to JPEG if webp export unsupported)
    const blob = await new Promise((resolve) => {
      exportCanvas.toBlob((b) => {
        if (b) resolve(b);
        else exportCanvas.toBlob(resolve, 'image/jpeg', 0.90);
      }, 'image/webp', 0.88);
    });

    if (!blob) {
      throw new Error('ไม่สามารถแปลงรูปภาพเพื่อส่งออกได้');
    }

    // 3. Send multipart FormData to PHP API
    const formData = new FormData();
    formData.append('image', blob, 'product_framed.webp');

    const res = await fetch('/api/admin/upload.php', {
      method: 'POST',
      body: formData
    });

    let uploadedUrl = '';
    if (res.ok) {
      try {
        const data = await res.json();
        if (data.success && data.image_url) {
          uploadedUrl = data.image_url;
        }
      } catch (e) {}
    }
    
    if (!uploadedUrl) {
      // Offline fallback: Use Base64 data URL directly so admin preview and local edits work
      try {
        uploadedUrl = exportCanvas.toDataURL('image/webp', 0.88);
      } catch (e) {
        uploadedUrl = exportCanvas.toDataURL('image/jpeg', 0.88);
      }
    }

    // 4. Update Active Product Images in state
    if (state.activeProduct) {
      const newImgObj = {
        thumb: uploadedUrl,
        card: uploadedUrl,
        large: uploadedUrl,
        original: uploadedUrl
      };

      state.activeProduct.images = state.activeProduct.images || [];
      if (typeof state.framingTargetIndex === 'number' && state.activeProduct.images[state.framingTargetIndex]) {
        state.activeProduct.images[state.framingTargetIndex] = newImgObj;
      } else if (state.framingTargetIndex === 'new') {
        state.activeProduct.images.push(newImgObj);
      } else {
        if (state.activeProduct.images.length > 0) {
          state.activeProduct.images[0] = newImgObj;
        } else {
          state.activeProduct.images = [newImgObj];
        }
      }
      state.framingTargetIndex = null;
    }

    // 5. Update UI
    if (dom.drawerImageStatus) {
      dom.drawerImageStatus.textContent = 'จัดเฟรม 800x800 แล้ว';
    }
    renderDrawerGallery();
    updateDrawerLivePreview();
    closeImageFramingModal();
    showToast('จัดตำแหน่งและบันทึกรูปภาพสินค้า 800x800 สำเร็จ');

  } catch (err) {
    console.error('Framing upload error:', err);
    let fallbackUrl = '';
    try {
      const exportCanvas = dom.framingExportCanvas || document.createElement('canvas');
      fallbackUrl = exportCanvas.toDataURL('image/webp', 0.88);
    } catch (e) {}

    if (fallbackUrl && state.activeProduct) {
      const fallbackImgObj = {
        thumb: fallbackUrl,
        card: fallbackUrl,
        large: fallbackUrl,
        original: fallbackUrl
      };

      state.activeProduct.images = state.activeProduct.images || [];
      if (typeof state.framingTargetIndex === 'number' && state.activeProduct.images[state.framingTargetIndex]) {
        state.activeProduct.images[state.framingTargetIndex] = fallbackImgObj;
      } else if (state.framingTargetIndex === 'new') {
        state.activeProduct.images.push(fallbackImgObj);
      } else {
        if (state.activeProduct.images.length > 0) {
          state.activeProduct.images[0] = fallbackImgObj;
        } else {
          state.activeProduct.images = [fallbackImgObj];
        }
      }
      state.framingTargetIndex = null;

      if (dom.drawerImageStatus) dom.drawerImageStatus.textContent = 'จัดเฟรม 800x800 แล้ว';
      renderDrawerGallery();
      updateDrawerLivePreview();
      closeImageFramingModal();
      showToast('จัดตำแหน่งและบันทึกรูปภาพสินค้า 800x800 สำเร็จ');
      return;
    }
    showToast(err.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ', 'error');
  } finally {
    if (dom.framingUploadSpinner) dom.framingUploadSpinner.classList.add('hidden');
    if (dom.btnFramingApplyUpload) dom.btnFramingApplyUpload.disabled = false;
    if (dom.framingApplyText) dom.framingApplyText.textContent = 'บันทึกและใช้รูปภาพนี้';
  }
}

/**
 * Showcase Image Framing & Positioning Canvas Controller
 * Flexible Free Height & Multi-Aspect Ratio Crop for Showcase Story Blocks
 * Supports Auto Height (100% original aspect ratio), Presets (16:9, 4:3, 1:1),
 * Live Pixel Input, and Dynamic Top/Bottom Drag Handles
 */
const showcaseFramingState = {
  targetBlockIndex: null,
  img: null,
  imgLoaded: false,
  baseScale: 1.0,
  userZoom: 1.0,
  panX: 0,
  panY: 0,
  rotation: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  panStartX: 0,
  panStartY: 0,
  // Free height crop state
  cropHeightMode: 'auto', // 'auto' | '16:9' | '4:3' | '1:1' | 'custom'
  customHeight: 900,
  isResizingHeight: false,
  resizeHandle: null, // 'top' | 'bottom'
  resizeStartY: 0,
  resizeStartHeight: 900
};

function openShowcaseFramingModal(blockIndex, initialSrcOrFile = null) {
  if (!dom.showcaseFramingModal) return;

  showcaseFramingState.targetBlockIndex = blockIndex;
  showcaseFramingState.userZoom = 1.0;
  showcaseFramingState.panX = 0;
  showcaseFramingState.panY = 0;
  showcaseFramingState.rotation = 0;
  showcaseFramingState.isDragging = false;
  showcaseFramingState.isResizingHeight = false;

  if (dom.showcaseFramingZoomSlider) dom.showcaseFramingZoomSlider.value = '1.0';
  if (dom.showcaseFramingZoomLabel) dom.showcaseFramingZoomLabel.textContent = '100%';

  if (typeof dom.showcaseFramingModal.showModal === 'function') {
    dom.showcaseFramingModal.showModal();
  } else {
    dom.showcaseFramingModal.classList.remove('hidden');
  }

  if (initialSrcOrFile) {
    loadShowcaseImageIntoFraming(initialSrcOrFile);
  } else {
    const currentBlock = state.activeProduct?.richContent?.blocks?.[blockIndex];
    if (currentBlock && currentBlock.image) {
      loadShowcaseImageIntoFraming(currentBlock.image);
    } else {
      showcaseFramingState.img = null;
      showcaseFramingState.imgLoaded = false;
      showcaseFramingState.customHeight = 900;
      showcaseFramingState.cropHeightMode = 'auto';
      if (dom.showcaseFramingHeightInput) dom.showcaseFramingHeightInput.value = '900';
      updatePresetButtonsHighlight('auto');
      updateShowcaseFramingDimensions();
    }
  }
}

function closeShowcaseFramingModal() {
  if (dom.showcaseFramingModal) {
    if (typeof dom.showcaseFramingModal.close === 'function') {
      try { dom.showcaseFramingModal.close(); } catch (e) {}
    }
    dom.showcaseFramingModal.removeAttribute('open');
  }
  showcaseFramingState.targetBlockIndex = null;
  showcaseFramingState.isDragging = false;
  showcaseFramingState.isResizingHeight = false;
}

function loadShowcaseImageIntoFraming(srcOrFile) {
  if (!srcOrFile) return;

  if (srcOrFile instanceof File || srcOrFile instanceof Blob) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => initShowcaseFramingImageDimensions(img);
      img.onerror = () => {
        showToast('ไม่สามารถเปิดรูปภาพนี้ได้ กรุณาลองไฟล์อื่น', 'error');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      showToast('เกิดข้อผิดพลาดในการอ่านไฟล์', 'error');
    };
    reader.readAsDataURL(srcOrFile);
  } else if (typeof srcOrFile === 'string') {
    let finalSrc = srcOrFile;
    if (finalSrc.startsWith('https://www.udo.co.th/')) {
      finalSrc = '/api/admin/upload.php?proxy_url=' + encodeURIComponent(finalSrc);
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => initShowcaseFramingImageDimensions(img);
    img.onerror = () => {
      console.warn('Failed to load image into showcase framing canvas:', srcOrFile);
      showcaseFramingState.img = null;
      showcaseFramingState.imgLoaded = false;
      renderShowcaseFramingDisplay();
    };
    img.src = finalSrc;
  }
}

function initShowcaseFramingImageDimensions(img) {
  showcaseFramingState.img = img;
  showcaseFramingState.imgLoaded = true;

  const nw = img.naturalWidth || 1600;
  const nh = img.naturalHeight || 900;

  // Default to Auto Height (100% of original image aspect ratio)
  let autoHeight = Math.round(1600 * (nh / nw));
  autoHeight = Math.max(400, Math.min(3200, autoHeight));

  showcaseFramingState.cropHeightMode = 'auto';
  showcaseFramingState.customHeight = autoHeight;

  if (dom.showcaseFramingHeightInput) {
    dom.showcaseFramingHeightInput.value = autoHeight;
  }

  const targetDispH = Math.round(640 * (autoHeight / 1600));
  const fitScale = Math.min(640 / nw, targetDispH / nh);

  showcaseFramingState.baseScale = Math.max(0.05, fitScale);
  showcaseFramingState.userZoom = 1.0;
  showcaseFramingState.panX = 0;
  showcaseFramingState.panY = 0;
  showcaseFramingState.rotation = 0;

  if (dom.showcaseFramingZoomSlider) dom.showcaseFramingZoomSlider.value = '1.0';
  if (dom.showcaseFramingZoomLabel) dom.showcaseFramingZoomLabel.textContent = '100%';

  updatePresetButtonsHighlight('auto');
  updateShowcaseFramingDimensions();
}

function updatePresetButtonsHighlight(activeMode) {
  const presets = [
    { btn: dom.btnShowcasePresetAuto, mode: 'auto' },
    { btn: dom.btnShowcasePreset169, mode: '16:9' },
    { btn: dom.btnShowcasePreset43, mode: '4:3' },
    { btn: dom.btnShowcasePreset11, mode: '1:1' }
  ];

  presets.forEach(({ btn, mode }) => {
    if (!btn) return;
    if (mode === activeMode) {
      btn.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-neutral-900 text-white shadow-xs transition-colors cursor-pointer';
    } else {
      btn.className = 'px-2.5 py-1 rounded-lg text-xs font-medium bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors cursor-pointer';
    }
  });
}

function setCropHeightPreset(mode) {
  showcaseFramingState.cropHeightMode = mode;
  let targetH = 900;

  if (mode === 'auto') {
    if (showcaseFramingState.img && showcaseFramingState.imgLoaded) {
      const nw = showcaseFramingState.img.naturalWidth || 1600;
      const nh = showcaseFramingState.img.naturalHeight || 900;
      targetH = Math.round(1600 * (nh / nw));
      targetH = Math.max(400, Math.min(3200, targetH));
    } else {
      targetH = 900;
    }
  } else if (mode === '16:9') {
    targetH = 900;
  } else if (mode === '4:3') {
    targetH = 1200;
  } else if (mode === '1:1') {
    targetH = 1600;
  }

  showcaseFramingState.customHeight = targetH;
  if (dom.showcaseFramingHeightInput) {
    dom.showcaseFramingHeightInput.value = targetH;
  }

  if (showcaseFramingState.img && showcaseFramingState.imgLoaded) {
    const nw = showcaseFramingState.img.naturalWidth || 640;
    const nh = showcaseFramingState.img.naturalHeight || 360;
    const targetDispH = Math.round(640 * (targetH / 1600));
    const fitScale = Math.min(640 / nw, targetDispH / nh);
    showcaseFramingState.baseScale = Math.max(0.05, fitScale);
  }

  updatePresetButtonsHighlight(mode);
  updateShowcaseFramingDimensions();
}

function updateShowcaseFramingDimensions() {
  const h = showcaseFramingState.customHeight || 900;
  const ratio = Math.round((1600 / h) * 100) / 100;

  if (dom.showcaseFramingViewport) {
    dom.showcaseFramingViewport.style.aspectRatio = `1600 / ${h}`;
  }

  if (dom.showcaseFramingDisplayCanvas) {
    const dispW = 640;
    const dispH = Math.round(640 * (h / 1600));
    dom.showcaseFramingDisplayCanvas.width = dispW;
    dom.showcaseFramingDisplayCanvas.height = dispH;
  }

  if (dom.showcaseSafezoneDimLabel) {
    dom.showcaseSafezoneDimLabel.textContent = `1600 x ${h} px`;
  }

  if (dom.showcaseSafezoneRatioLabel) {
    let modeText = 'สัดส่วนจริง (Auto)';
    if (showcaseFramingState.cropHeightMode === '16:9') modeText = '16:9 แนวนอน';
    else if (showcaseFramingState.cropHeightMode === '4:3') modeText = '4:3 มาตรฐาน';
    else if (showcaseFramingState.cropHeightMode === '1:1') modeText = '1:1 จัตุรัส';
    else if (showcaseFramingState.cropHeightMode === 'custom') modeText = `ปรับอิสระ (${ratio}:1)`;
    dom.showcaseSafezoneRatioLabel.textContent = `Safe Zone (${modeText})`;
  }

  renderShowcaseFramingDisplay();
}

function drawShowcaseFramingOnCanvas(canvas, targetWidth = 640, targetHeight = null) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const h = targetHeight || Math.round(targetWidth * ((showcaseFramingState.customHeight || 900) / 1600));

  ctx.save();
  ctx.clearRect(0, 0, targetWidth, h);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetWidth, h);

  if (!showcaseFramingState.imgLoaded || !showcaseFramingState.img) {
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ยังไม่ได้เลือกรูปภาพ (ลากไฟล์มาวางที่นี่)', targetWidth / 2, h / 2);
    ctx.restore();
    return;
  }

  const cx = targetWidth / 2;
  const cy = h / 2;
  const ratio = targetWidth / 640;

  ctx.translate(cx, cy);
  ctx.rotate((showcaseFramingState.rotation * Math.PI) / 180);

  const totalZoom = showcaseFramingState.baseScale * showcaseFramingState.userZoom * ratio;
  ctx.scale(totalZoom, totalZoom);

  const nw = showcaseFramingState.img.naturalWidth;
  const nh = showcaseFramingState.img.naturalHeight;

  const drawX = -nw / 2 + (showcaseFramingState.panX * ratio) / totalZoom;
  const drawY = -nh / 2 + (showcaseFramingState.panY * ratio) / totalZoom;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(showcaseFramingState.img, drawX, drawY, nw, nh);

  ctx.restore();
}

function renderShowcaseFramingDisplay() {
  if (dom.showcaseFramingDisplayCanvas) {
    const dispW = 640;
    const dispH = Math.round(640 * ((showcaseFramingState.customHeight || 900) / 1600));
    drawShowcaseFramingOnCanvas(dom.showcaseFramingDisplayCanvas, dispW, dispH);
  }
}

function updateShowcaseFramingZoom(val) {
  const clamped = Math.min(3.0, Math.max(1.0, parseFloat(val) || 1.0));
  showcaseFramingState.userZoom = clamped;
  if (dom.showcaseFramingZoomSlider) dom.showcaseFramingZoomSlider.value = clamped.toFixed(2);
  if (dom.showcaseFramingZoomLabel) dom.showcaseFramingZoomLabel.textContent = `${Math.round(clamped * 100)}%`;
  renderShowcaseFramingDisplay();
}

function snapShowcaseFramingToCenter() {
  showcaseFramingState.panX = 0;
  showcaseFramingState.panY = 0;
  showcaseFramingState.userZoom = 1.0;
  if (dom.showcaseFramingZoomSlider) dom.showcaseFramingZoomSlider.value = '1.0';
  if (dom.showcaseFramingZoomLabel) dom.showcaseFramingZoomLabel.textContent = '100%';
  renderShowcaseFramingDisplay();
}

function rotateShowcaseFramingImage() {
  showcaseFramingState.rotation = (showcaseFramingState.rotation + 90) % 360;
  renderShowcaseFramingDisplay();
}

async function handleApplyShowcaseFramingAndUpload() {
  if (!showcaseFramingState.imgLoaded || !showcaseFramingState.img) {
    showToast('กรุณาเลือกหรือวางรูปภาพก่อนบันทึก', 'error');
    return;
  }

  const exportHeight = showcaseFramingState.customHeight || 900;

  if (dom.showcaseFramingUploadSpinner) dom.showcaseFramingUploadSpinner.classList.remove('hidden');
  if (dom.btnShowcaseFramingApplyUpload) dom.btnShowcaseFramingApplyUpload.disabled = true;
  if (dom.showcaseFramingApplyText) dom.showcaseFramingApplyText.textContent = `กำลังประมวลผล WebP 1600x${exportHeight}...`;

  try {
    const exportCanvas = dom.showcaseFramingExportCanvas || document.createElement('canvas');
    exportCanvas.width = 1600;
    exportCanvas.height = exportHeight;
    drawShowcaseFramingOnCanvas(exportCanvas, 1600, exportHeight);

    const blob = await new Promise((resolve) => {
      exportCanvas.toBlob((b) => {
        if (b) resolve(b);
        else exportCanvas.toBlob(resolve, 'image/jpeg', 0.90);
      }, 'image/webp', 0.88);
    });

    if (!blob) {
      throw new Error('ไม่สามารถแปลงรูปภาพเพื่อส่งออกได้');
    }

    const formData = new FormData();
    const filename = `showcase_${Date.now()}_1600x${exportHeight}.webp`;
    formData.append('image', blob, filename);
    formData.append('file', blob, filename);
    if (state.activeProduct && state.activeProduct.id) {
      formData.append('product_id', state.activeProduct.id);
    }

    const res = await fetch('/api/admin/upload.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    let uploadedUrl = '';
    if (res.ok) {
      try {
        const data = await res.json();
        if (data.success && data.image_url) {
          uploadedUrl = data.image_url;
        }
      } catch (e) {}
    }

    if (!uploadedUrl) {
      try {
        uploadedUrl = exportCanvas.toDataURL('image/webp', 0.88);
      } catch (e) {
        uploadedUrl = exportCanvas.toDataURL('image/jpeg', 0.88);
      }
    }

    const targetIdx = showcaseFramingState.targetBlockIndex;
    if (typeof targetIdx === 'number' && state.activeProduct?.richContent?.blocks?.[targetIdx]) {
      state.activeProduct.richContent.blocks[targetIdx].image = uploadedUrl;
      renderDrawerRichContent();
      renderShowcasePreview();
      closeShowcaseFramingModal();
      showToast(`จัดตำแหน่งและบันทึกรูปภาพโชว์เคสบล็อกที่ ${targetIdx + 1} (${exportCanvas.width}x${exportCanvas.height}px) สำเร็จ`);
    } else {
      closeShowcaseFramingModal();
      showToast('บันทึกรูปภาพสำเร็จ');
    }
  } catch (err) {
    console.error('Showcase framing upload error:', err);
    showToast(err.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ', 'error');
  } finally {
    if (dom.showcaseFramingUploadSpinner) dom.showcaseFramingUploadSpinner.classList.add('hidden');
    if (dom.btnShowcaseFramingApplyUpload) dom.btnShowcaseFramingApplyUpload.disabled = false;
    if (dom.showcaseFramingApplyText) dom.showcaseFramingApplyText.textContent = 'บันทึกและใช้รูปภาพโชว์เคส';
  }
}

/**
 * Format timestamp to human-readable Thai date string
 */
function formatThaiDate(isoOrDateStr) {
  if (!isoOrDateStr) return '-';
  try {
    const d = new Date(isoOrDateStr);
    if (isNaN(d.getTime())) return isoOrDateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear() + 543; // Buddhist Era
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${mins} น.`;
  } catch (e) {
    return isoOrDateStr;
  }
}

/**
 * Update Header Admin Profile UI
 */
function updateAuthUI() {
  if (!dom.headerAdminName || !dom.headerAdminRoleBadge) return;

  if (state.currentUser) {
    dom.headerAdminName.textContent = state.currentUser.display_name || state.currentUser.username;
    if (state.currentUser.role === 'super_admin') {
      dom.headerAdminRoleBadge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-900 text-amber-300';
      dom.headerAdminRoleBadge.textContent = 'เจ้าของร้าน (Super Admin)';
    } else {
      dom.headerAdminRoleBadge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200';
      dom.headerAdminRoleBadge.textContent = 'พนักงานคลัง (Staff)';
    }
    if (dom.adminLogoutBtn) dom.adminLogoutBtn.classList.remove('hidden');
  } else {
    dom.headerAdminName.textContent = 'ไม่ได้เข้าสู่ระบบ';
    dom.headerAdminRoleBadge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-200 text-gray-700';
    dom.headerAdminRoleBadge.textContent = 'แขก (Guest)';
    if (dom.adminLogoutBtn) dom.adminLogoutBtn.classList.add('hidden');
  }
}

/**
 * Check Admin Authentication Status
 */
async function checkAuth() {
  try {
    const res = await fetch('/api/admin/auth.php?action=me', {
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated && data.user) {
        state.currentUser = data.user;
        updateAuthUI();
        if (dom.loginModal && dom.loginModal.open) {
          dom.loginModal.close();
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('Auth check network warning:', err.message);
  }

  // Not authenticated
  state.currentUser = null;
  updateAuthUI();
  if (dom.loginModal && !dom.loginModal.open) {
    dom.loginModal.showModal();
  }
  return false;
}

/**
 * Handle Admin Login Form Submission
 */
async function handleLogin(e) {
  if (e) e.preventDefault();
  if (!dom.loginUsername || !dom.loginPassword) return;

  const username = dom.loginUsername.value.trim();
  const password = dom.loginPassword.value;

  if (!username || !password) {
    if (dom.loginErrorMsg) {
      dom.loginErrorMsg.textContent = 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน';
      dom.loginErrorMsg.classList.remove('hidden');
    }
    return;
  }

  if (dom.loginSubmitBtn) {
    dom.loginSubmitBtn.disabled = true;
    dom.loginSubmitBtn.innerHTML = `
      <div class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>กำลังตรวจสอบ...</span>
    `;
  }
  if (dom.loginErrorMsg) dom.loginErrorMsg.classList.add('hidden');

  try {
    const res = await fetch('/api/admin/auth.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
    }

    state.currentUser = data.user;
    updateAuthUI();

    if (dom.loginModal && dom.loginModal.open) {
      dom.loginModal.close();
    }

    showToast(`ยินดีต้อนรับคุณ ${data.user.display_name}`);

    // Refresh current view
    if (state.activeTab === 'inventory') {
      fetchProducts(state.currentPage);
    } else if (state.activeTab === 'merchandising') {
      renderMerchandisingShelves();
    } else if (state.activeTab === 'logs') {
      loadAuditLogs();
    }
  } catch (err) {
    if (dom.loginErrorMsg) {
      dom.loginErrorMsg.textContent = err.message || 'เข้าสู่ระบบไม่สำเร็จ';
      dom.loginErrorMsg.classList.remove('hidden');
    }
  } finally {
    if (dom.loginSubmitBtn) {
      dom.loginSubmitBtn.disabled = false;
      dom.loginSubmitBtn.innerHTML = `<span>เข้าสู่ระบบ</span>`;
    }
  }
}

/**
 * Handle Admin Logout
 */
async function handleLogout() {
  try {
    await fetch('/api/admin/auth.php?action=logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.warn('Logout warning:', err.message);
  }

  state.currentUser = null;
  updateAuthUI();
  if (dom.loginModal && !dom.loginModal.open) {
    dom.loginModal.showModal();
  }
  showToast('ออกจากระบบเรียบร้อยแล้ว');
}

/**
 * Audit Logs Tab Loader with Verified Admin Badges and Filtering
 */
async function loadAuditLogs() {
  if (!dom.auditLogsTbody) return;

  dom.auditLogsTbody.innerHTML = `
    <tr>
      <td colspan="8" class="py-8 text-center text-gray-400">
        <div class="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mb-2"></div>
        <p class="text-xs">กำลังโหลดประวัติการเดินสต็อก...</p>
      </td>
    </tr>
  `;

  try {
    const params = new URLSearchParams();
    params.set('limit', '100');
    if (state.auditSearchQuery) params.set('q', state.auditSearchQuery);
    if (state.auditRoleFilter && state.auditRoleFilter !== 'all') params.set('role', state.auditRoleFilter);
    if (state.auditActionFilter && state.auditActionFilter !== 'all') params.set('action', state.auditActionFilter);

    const res = await fetch(`/api/admin/audit_logs.php?${params.toString()}`, {
      credentials: 'include'
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (!data.success || !Array.isArray(data.logs) || data.logs.length === 0) {
      dom.auditLogsTbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-gray-400 font-medium">ไม่พบประวัติการปรับสต็อกที่ตรงกับเงื่อนไข</td>
        </tr>
      `;
      if (dom.auditLogsCount) dom.auditLogsCount.textContent = 'แสดงทั้งหมด 0 รายการ';
      return;
    }

    if (dom.auditLogsCount) {
      dom.auditLogsCount.textContent = `แสดงทั้งหมด ${data.logs.length} รายการ (จากทั้งหมด ${data.total_logs || data.logs.length} รายการ)`;
    }

    const rows = data.logs.map(log => {
      const delta = typeof log.delta === 'number' ? log.delta : (parseInt(log.delta, 10) || 0);
      let deltaBadge = `<span class="font-mono text-gray-400 font-semibold">0</span>`;
      if (delta > 0) {
        deltaBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">+${delta}</span>`;
      } else if (delta < 0) {
        deltaBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">${delta}</span>`;
      }

      // Role Badge
      const role = log.admin_role || 'super_admin';
      const adminName = log.admin_name || log.admin_user || 'เจ้าของร้าน';
      let roleBadge = '';
      if (role === 'super_admin') {
        roleBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-900 text-amber-300">เจ้าของร้าน</span>`;
      } else {
        roleBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">พนักงานคลัง</span>`;
      }

      // Action Tag
      const action = log.action || 'stock_adjustment';
      let actionLabel = 'ปรับสต็อก';
      let actionStyle = 'bg-gray-100 text-gray-700';
      if (action === 'stock_adjustment') {
        actionLabel = 'ปรับสต็อก';
        actionStyle = 'bg-sky-50 text-sky-800 border border-sky-200';
      } else if (action === 'update_product') {
        actionLabel = 'แก้ข้อมูล';
        actionStyle = 'bg-purple-50 text-purple-800 border border-purple-200';
      } else if (action.includes('shelf') || action.includes('curate')) {
        actionLabel = 'ผังหน้าร้าน';
        actionStyle = 'bg-amber-50 text-amber-800 border border-amber-200';
      }

      const formattedDate = formatThaiDate(log.timestamp || log.created_at);

      return `
        <tr class="hover:bg-gray-50/80 transition-colors">
          <td class="py-3 px-4 font-mono text-[11px] text-gray-500 whitespace-nowrap">${formattedDate}</td>
          <td class="py-3 px-4 whitespace-nowrap">
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-gray-900 text-xs">${adminName}</span>
              ${roleBadge}
            </div>
            ${log.ip_address ? `<span class="text-[10px] font-mono text-gray-400 block">${log.ip_address}</span>` : ''}
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${actionStyle}">
              ${actionLabel}
            </span>
          </td>
          <td class="py-3 px-4">
            <span class="font-semibold text-gray-900 block truncate max-w-xs text-xs" title="${log.product_name || log.product_id}">${log.product_name || log.product_id}</span>
            <span class="font-mono text-[11px] text-gray-400">SKU: ${log.sku || log.product_id} ${log.size ? `(${log.size})` : ''}</span>
          </td>
          <td class="py-3 px-4 text-center font-mono text-xs text-gray-500">${log.old_stock !== undefined && log.old_stock !== null ? log.old_stock : '-'}</td>
          <td class="py-3 px-4 text-center">${deltaBadge}</td>
          <td class="py-3 px-4 text-center font-mono font-bold text-xs text-gray-900">${log.new_stock !== undefined && log.new_stock !== null ? log.new_stock : '-'}</td>
          <td class="py-3 px-4 text-xs text-gray-600">${log.reason || '-'}</td>
        </tr>
      `;
    }).join('');

    dom.auditLogsTbody.innerHTML = rows;
  } catch (err) {
    console.warn('Audit logs load failed:', err.message);
    dom.auditLogsTbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-8 text-center text-gray-400">ยังไม่มีบันทึกประวัติการเดินสต็อก</td>
      </tr>
    `;
    if (dom.auditLogsCount) dom.auditLogsCount.textContent = 'แสดงทั้งหมด 0 รายการ';
  }
}

/**
 * Tab Navigation
 */
function switchTab(tab) {
  state.activeTab = tab;

  // Reset all 3 nav tabs
  [dom.navInventory, dom.navMerchandising, dom.navLogs].forEach(navBtn => {
    if (navBtn) {
      navBtn.classList.remove('bg-white', 'text-black', 'active');
      navBtn.classList.add('text-neutral-400', 'hover:text-white', 'hover:bg-white/10');
    }
  });

  // Hide all 3 content views
  if (dom.inventoryViewWrapper) dom.inventoryViewWrapper.classList.add('hidden');
  if (dom.inventoryWrapper) dom.inventoryWrapper.classList.add('hidden');
  if (dom.paginationWrapper) dom.paginationWrapper.classList.add('hidden');
  if (dom.merchandisingWrapper) dom.merchandisingWrapper.classList.add('hidden');
  if (dom.auditLogsWrapper) dom.auditLogsWrapper.classList.add('hidden');

  if (tab === 'inventory') {
    if (dom.navInventory) {
      dom.navInventory.classList.add('bg-white', 'text-black', 'active');
      dom.navInventory.classList.remove('text-neutral-400', 'hover:text-white', 'hover:bg-white/10');
    }
    if (dom.inventoryViewWrapper) dom.inventoryViewWrapper.classList.remove('hidden');
    if (dom.inventoryWrapper) dom.inventoryWrapper.classList.remove('hidden');
    if (dom.paginationWrapper) dom.paginationWrapper.classList.remove('hidden');
  } else if (tab === 'merchandising') {
    if (dom.navMerchandising) {
      dom.navMerchandising.classList.add('bg-white', 'text-black', 'active');
      dom.navMerchandising.classList.remove('text-neutral-400', 'hover:text-white', 'hover:bg-white/10');
    }
    if (dom.merchandisingWrapper) dom.merchandisingWrapper.classList.remove('hidden');
    renderMerchandisingShelves();
  } else if (tab === 'logs') {
    if (dom.navLogs) {
      dom.navLogs.classList.add('bg-white', 'text-black', 'active');
      dom.navLogs.classList.remove('text-neutral-400', 'hover:text-white', 'hover:bg-white/10');
    }
    if (dom.auditLogsWrapper) dom.auditLogsWrapper.classList.remove('hidden');
    loadAuditLogs();
  }
}

/**
 * Visual Updates for Filter Status Pills
 */
function updateStatusPillVisuals() {
  dom.statusPills.forEach(pill => {
    const status = pill.getAttribute('data-status');
    let count = 0;
    if (status === 'all') count = state.summary.total || state.allProductsCache.length;
    else if (status === 'publish') count = state.summary.publish || state.allProductsCache.filter(p => (p.status || 'publish') === 'publish').length;
    else if (status === 'draft') count = state.summary.draft || state.allProductsCache.filter(p => p.status === 'draft').length;
    else if (status === 'suspended') count = state.summary.suspended || state.allProductsCache.filter(p => p.status === 'suspended').length;
    else if (status === 'in_stock') count = state.summary.in_stock || state.allProductsCache.filter(p => (p.availability || 'in_stock') === 'in_stock').length;
    else if (status === 'out_of_stock') count = state.summary.out_of_stock || state.allProductsCache.filter(p => (p.availability || 'out_of_stock') === 'out_of_stock').length;
    else if (status === 'special_order') count = state.summary.special_order || state.allProductsCache.filter(p => p.availability === 'special_order').length;

    let label = '';
    if (status === 'all') label = `ทั้งหมด (${count.toLocaleString()})`;
    else if (status === 'publish') label = `เผยแพร่ (${count.toLocaleString()})`;
    else if (status === 'draft') label = `ฉบับร่าง (${count.toLocaleString()})`;
    else if (status === 'suspended') label = `ระงับจำหน่าย (${count.toLocaleString()})`;
    else if (status === 'in_stock') label = `พร้อมส่ง (${count.toLocaleString()})`;
    else if (status === 'out_of_stock') label = `หมดสต็อก (${count.toLocaleString()})`;
    else if (status === 'special_order') label = `สั่งพิเศษ (${count.toLocaleString()})`;

    if (label) pill.textContent = label;

    if (status === state.statusFilter) {
      pill.classList.remove('bg-[#EAEAEF]', 'text-[#160808]', 'hover:bg-[#DFDFE5]', 'font-medium');
      pill.classList.add('bg-[#160808]', 'text-white', 'shadow-xs', 'font-semibold');
    } else {
      pill.classList.remove('bg-[#160808]', 'text-white', 'shadow-xs', 'font-semibold');
      pill.classList.add('bg-[#EAEAEF]', 'text-[#160808]', 'hover:bg-[#DFDFE5]', 'font-medium');
    }
  });
}

/**
 * Update Active Filter Badge Count
 */
function updateActiveFilterBadge() {
  const totalFilters = state.filterCategories.size + state.filterStatuses.size + state.filterAvailabilities.size + state.filterBadges.size;
  if (!dom.activeFilterBadge) return;
  if (totalFilters > 0) {
    dom.activeFilterBadge.textContent = String(totalFilters);
    dom.activeFilterBadge.classList.remove('hidden');
    dom.activeFilterBadge.classList.add('inline-flex');
  } else {
    dom.activeFilterBadge.textContent = '0';
    dom.activeFilterBadge.classList.add('hidden');
    dom.activeFilterBadge.classList.remove('inline-flex');
  }
}

/**
 * Render Removable Active Filter Pills Strip
 */
function renderActiveFilterPills() {
  if (!dom.activeFilterPillsContainer || !dom.activeFilterPillsList) return;

  const totalFilters = state.filterCategories.size + state.filterStatuses.size + state.filterAvailabilities.size + state.filterBadges.size;
  if (totalFilters === 0) {
    dom.activeFilterPillsContainer.classList.add('hidden');
    dom.activeFilterPillsList.innerHTML = '';
    return;
  }

  dom.activeFilterPillsContainer.classList.remove('hidden');

  const pills = [];

  // 1. Categories
  state.filterCategories.forEach(catId => {
    let label = catId;
    if (dom.categorySelect) {
      const matchOpt = Array.from(dom.categorySelect.options).find(o => o.value === catId);
      if (matchOpt) {
        label = matchOpt.textContent.replace(/\s*\(\d+\)$/, '');
      }
    }
    pills.push(`
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EAEAEF] text-[#160808] border border-black/[0.04]">
        <span>หมวด: ${label}</span>
        <button type="button" class="btn-remove-filter-pill text-[#424245] hover:text-black font-bold cursor-pointer" data-filter-type="category" data-filter-value="${catId}" title="นำตัวกรองนี้ออก">
          &times;
        </button>
      </span>
    `);
  });

  // 2. Publication Status
  const statusLabels = {
    publish: 'เผยแพร่',
    draft: 'ฉบับร่าง',
    suspended: 'ระงับจำหน่าย'
  };
  state.filterStatuses.forEach(st => {
    const label = statusLabels[st] || st;
    pills.push(`
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EAEAEF] text-[#160808] border border-black/[0.04]">
        <span>สถานะ: ${label}</span>
        <button type="button" class="btn-remove-filter-pill text-[#424245] hover:text-black font-bold cursor-pointer" data-filter-type="status" data-filter-value="${st}" title="นำตัวกรองนี้ออก">
          &times;
        </button>
      </span>
    `);
  });

  // 3. Stock Availability
  const availLabels = {
    in_stock: 'พร้อมส่ง',
    out_of_stock: 'หมดสต็อก',
    special_order: 'สั่งพิเศษ'
  };
  state.filterAvailabilities.forEach(av => {
    const label = availLabels[av] || av;
    pills.push(`
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EAEAEF] text-[#160808] border border-black/[0.04]">
        <span>สต็อก: ${label}</span>
        <button type="button" class="btn-remove-filter-pill text-[#424245] hover:text-black font-bold cursor-pointer" data-filter-type="avail" data-filter-value="${av}" title="นำตัวกรองนี้ออก">
          &times;
        </button>
      </span>
    `);
  });

  // 4. Marketing Badges
  const badgeLabels = {
    best_seller: 'ขายดี',
    new_arrival: 'สินค้าใหม่',
    recommended: 'แนะนำ',
    promotion: 'โปรโมชั่น'
  };
  state.filterBadges.forEach(bg => {
    const label = badgeLabels[bg] || bg;
    pills.push(`
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EAEAEF] text-[#160808] border border-black/[0.04]">
        <span>ป้าย: ${label}</span>
        <button type="button" class="btn-remove-filter-pill text-[#424245] hover:text-black font-bold cursor-pointer" data-filter-type="badge" data-filter-value="${bg}" title="นำตัวกรองนี้ออก">
          &times;
        </button>
      </span>
    `);
  });

  dom.activeFilterPillsList.innerHTML = pills.join('');

  // Bind Remove Pill Events
  dom.activeFilterPillsList.querySelectorAll('.btn-remove-filter-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = btn.getAttribute('data-filter-type');
      const val = btn.getAttribute('data-filter-value');
      if (type === 'category') {
        state.filterCategories.delete(val);
        const cb = dom.inlineFilterPanel?.querySelector(`.filter-category-cb[value="${val}"]`);
        if (cb) cb.checked = false;
      } else if (type === 'status') {
        state.filterStatuses.delete(val);
        const cb = dom.inlineFilterPanel?.querySelector(`.filter-status-cb[value="${val}"]`);
        if (cb) cb.checked = false;
      } else if (type === 'avail') {
        state.filterAvailabilities.delete(val);
        const cb = dom.inlineFilterPanel?.querySelector(`.filter-avail-cb[value="${val}"]`);
        if (cb) cb.checked = false;
      } else if (type === 'badge') {
        state.filterBadges.delete(val);
        const cb = dom.inlineFilterPanel?.querySelector(`.filter-badge-cb[value="${val}"]`);
        if (cb) cb.checked = false;
      }

      renderActiveFilterPills();
      updateActiveFilterBadge();
      fetchProducts(1);
    });
  });
}

/**
 * Populate Multi-Select Categories List in Inline Filter Panel
 */
function populateInlineFilterCategories() {
  if (!dom.filterInlineCategoriesList || !dom.categorySelect) return;
  const options = Array.from(dom.categorySelect.options).filter(opt => opt.value !== 'all');

  dom.filterInlineCategoriesList.innerHTML = options.map(opt => {
    const isChecked = state.filterCategories.has(opt.value);
    const label = opt.textContent.replace(/\s*\(\d+\)$/, '');
    return `
      <label class="flex items-center gap-2 p-2 bg-white hover:bg-gray-50 rounded-xl border border-gray-200/70 cursor-pointer transition-colors text-xs">
        <input type="checkbox" value="${opt.value}" class="filter-category-cb w-4 h-4 accent-black rounded" ${isChecked ? 'checked' : ''}>
        <span class="truncate font-medium text-gray-800" title="${label}">${label}</span>
      </label>
    `;
  }).join('');

  // Bind change event to category checkboxes
  dom.filterInlineCategoriesList.querySelectorAll('.filter-category-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      applyInlineFilters();
    });
  });
}

/**
 * Toggle Inline Collapsible Filter Panel
 */
function toggleInlineFilterPanel(forceState) {
  if (!dom.inlineFilterPanel) return;

  const isCurrentlyOpen = !dom.inlineFilterPanel.classList.contains('hidden');
  const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyOpen;

  if (shouldOpen) {
    dom.inlineFilterPanel.classList.remove('hidden');
    if (dom.filterChevronIcon) dom.filterChevronIcon.classList.add('rotate-180');
    if (dom.btnOpenFilters) {
      dom.btnOpenFilters.classList.remove('bg-[#EAEAEF]', 'text-[#160808]');
      dom.btnOpenFilters.classList.add('bg-black', 'text-white');
    }

    populateInlineFilterCategories();

    // Sync static checkboxes in the panel
    dom.inlineFilterPanel.querySelectorAll('.filter-status-cb').forEach(cb => {
      cb.checked = state.filterStatuses.has(cb.value);
    });
    dom.inlineFilterPanel.querySelectorAll('.filter-avail-cb').forEach(cb => {
      cb.checked = state.filterAvailabilities.has(cb.value);
    });
    dom.inlineFilterPanel.querySelectorAll('.filter-badge-cb').forEach(cb => {
      cb.checked = state.filterBadges.has(cb.value);
    });
  } else {
    dom.inlineFilterPanel.classList.add('hidden');
    if (dom.filterChevronIcon) dom.filterChevronIcon.classList.remove('rotate-180');
    if (dom.btnOpenFilters) {
      dom.btnOpenFilters.classList.remove('bg-black', 'text-white');
      dom.btnOpenFilters.classList.add('bg-[#EAEAEF]', 'text-[#160808]');
    }
  }
}

/**
 * Apply Filters from Inline Filter Panel (Live Reactive Update)
 */
function applyInlineFilters() {
  if (!dom.inlineFilterPanel) return;

  state.filterCategories.clear();
  state.filterStatuses.clear();
  state.filterAvailabilities.clear();
  state.filterBadges.clear();

  // Read Categories
  dom.inlineFilterPanel.querySelectorAll('.filter-category-cb:checked').forEach(cb => {
    state.filterCategories.add(cb.value);
  });

  // Read Statuses
  dom.inlineFilterPanel.querySelectorAll('.filter-status-cb:checked').forEach(cb => {
    state.filterStatuses.add(cb.value);
  });

  // Read Availabilities
  dom.inlineFilterPanel.querySelectorAll('.filter-avail-cb:checked').forEach(cb => {
    state.filterAvailabilities.add(cb.value);
  });

  // Read Badges
  dom.inlineFilterPanel.querySelectorAll('.filter-badge-cb:checked').forEach(cb => {
    state.filterBadges.add(cb.value);
  });

  // Reset single quick status pill if multi-filters active
  if (state.filterStatuses.size > 0 || state.filterAvailabilities.size > 0 || state.filterBadges.size > 0) {
    state.statusFilter = 'all';
    updateStatusPillVisuals();
  }
  if (state.filterCategories.size > 0) {
    state.categoryFilter = 'all';
    if (dom.categorySelect) dom.categorySelect.value = 'all';
  }

  updateActiveFilterBadge();
  renderActiveFilterPills();
  fetchProducts(1);
}

/**
 * Reset All Multi-Criteria Filters
 */
function resetInlineFilters() {
  state.filterCategories.clear();
  state.filterStatuses.clear();
  state.filterAvailabilities.clear();
  state.filterBadges.clear();

  if (dom.inlineFilterPanel) {
    dom.inlineFilterPanel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
  }

  updateActiveFilterBadge();
  renderActiveFilterPills();
  fetchProducts(1);
}

/**
 * Toggle Progressive Batch Selection Mode
 */
function toggleSelectionMode(forceState) {
  if (typeof forceState === 'boolean') {
    state.isSelectionMode = forceState;
  } else {
    state.isSelectionMode = !state.isSelectionMode;
  }

  if (!state.isSelectionMode) {
    state.selectedProductIds.clear();
    if (dom.inventorySelectAll) dom.inventorySelectAll.checked = false;
  }

  // Update Button Label & Styling
  if (dom.btnSelectModeLabel) {
    dom.btnSelectModeLabel.textContent = state.isSelectionMode ? 'ยกเลิกเลือก' : 'เลือกรายการ';
  }
  if (dom.btnToggleSelectMode) {
    if (state.isSelectionMode) {
      dom.btnToggleSelectMode.classList.remove('bg-white', 'text-[#160808]', 'border-black/10');
      dom.btnToggleSelectMode.classList.add('bg-black', 'text-white', 'border-black');
    } else {
      dom.btnToggleSelectMode.classList.remove('bg-black', 'text-white', 'border-black');
      dom.btnToggleSelectMode.classList.add('bg-white', 'text-[#160808]', 'border-black/10');
    }
  }

  // Toggle Header Select All Checkbox Column
  if (dom.colHeaderSelectAll) {
    if (state.isSelectionMode) {
      dom.colHeaderSelectAll.classList.remove('hidden');
      dom.colHeaderSelectAll.classList.add('flex');
    } else {
      dom.colHeaderSelectAll.classList.remove('flex');
      dom.colHeaderSelectAll.classList.add('hidden');
    }
  }

  // Toggle Row Checkbox Columns
  const rowCols = dom.productRowsContainer ? dom.productRowsContainer.querySelectorAll('.row-select-col') : [];
  rowCols.forEach(col => {
    if (state.isSelectionMode) {
      col.classList.remove('hidden');
      col.classList.add('flex');
    } else {
      col.classList.remove('flex');
      col.classList.add('hidden');
    }
  });

  // Update Row Highlightings
  if (dom.productRowsContainer) {
    dom.productRowsContainer.querySelectorAll('.product-row').forEach(row => {
      const pid = row.getAttribute('data-product-id');
      const cb = row.querySelector('.row-select-checkbox');
      if (cb) cb.checked = state.selectedProductIds.has(pid);
      if (state.isSelectionMode && state.selectedProductIds.has(pid)) {
        row.classList.add('bg-neutral-100/70');
      } else {
        row.classList.remove('bg-neutral-100/70');
      }
    });
  }

  renderFloatingBatchDock();
}

/**
 * Render Floating Batch Action Dock Capsule
 */
function renderFloatingBatchDock() {
  if (!dom.floatingBatchDock) return;

  const count = state.selectedProductIds.size;
  if (!state.isSelectionMode || count === 0) {
    dom.floatingBatchDock.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    dom.floatingBatchDock.classList.remove('translate-y-0', 'opacity-100');
  } else {
    dom.floatingBatchDock.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    dom.floatingBatchDock.classList.add('translate-y-0', 'opacity-100');
    if (dom.batchSelectedCountLabel) {
      dom.batchSelectedCountLabel.textContent = `เลือกอยู่ ${count.toLocaleString()} รายการ`;
    }
  }

  // Sync Select All checkbox in table header
  if (dom.inventorySelectAll && dom.productRowsContainer) {
    const pageCheckboxes = dom.productRowsContainer.querySelectorAll('.row-select-checkbox');
    if (pageCheckboxes.length > 0) {
      const allChecked = Array.from(pageCheckboxes).every(cb => cb.checked);
      dom.inventorySelectAll.checked = allChecked;
    }
  }
}

/**
 * Execute Batch Status or Availability Update
 */
async function executeBatchStatusUpdate(newStatus = null, newAvailability = null) {
  const pids = Array.from(state.selectedProductIds);
  if (pids.length === 0) return;

  const count = pids.length;
  let actionDesc = '';
  if (newStatus === 'publish') actionDesc = 'เผยแพร่';
  else if (newStatus === 'draft') actionDesc = 'ตั้งเป็นฉบับร่าง';
  else if (newStatus === 'suspended') actionDesc = 'ระงับจำหน่าย';
  else if (newAvailability === 'in_stock') actionDesc = 'ปรับสถานะเป็นพร้อมส่ง';
  else if (newAvailability === 'out_of_stock') actionDesc = 'ปรับสถานะเป็นหมดสต็อก';

  const isConfirmed = confirm(`ยืนยันการ${actionDesc}สินค้าจำนวน ${count.toLocaleString()} รายการที่เลือกหรือไม่?`);
  if (!isConfirmed) return;

  const payload = {
    action: 'batch_update_products',
    product_ids: pids
  };
  if (newStatus) payload.status = newStatus;
  if (newAvailability) payload.availability = newAvailability;

  try {
    const res = await fetch('/api/admin/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to batch update products in database');
    }
    broadcastCatalogUpdate();
  } catch (err) {
    console.error('Batch update database error:', err.message);
    showToast('เกิดข้อผิดพลาดในการอัปเดตกลุ่ม: ' + err.message, 'error');
    return;
  }

  // Update in-memory state
  const pidSet = new Set(pids);
  const updateItem = (p) => {
    if (newStatus) p.status = newStatus;
    if (newAvailability) {
      p.availability = newAvailability;
      if (newAvailability === 'out_of_stock') {
        if (p.flags) p.flags.is_in_stock = false;
        if (Array.isArray(p.variants)) {
          p.variants.forEach(v => { v.stock = 0; });
        }
      } else if (newAvailability === 'in_stock') {
        if (p.flags) p.flags.is_in_stock = true;
      }
    }
  };

  state.products.forEach(p => {
    if (pidSet.has(p.id)) updateItem(p);
  });
  state.allProductsCache.forEach(p => {
    if (pidSet.has(p.id)) updateItem(p);
  });

  // Clean exit from selection mode
  toggleSelectionMode(false);
  renderProductRows();
  renderMetrics();
  showToast(`อัปเดตสถานะ ${count.toLocaleString()} รายการเรียบร้อยแล้ว`);
}

/**
 * Event Listeners Initialization
 */
function initEvents() {
  // Navigation Tabs
  if (dom.navInventory) dom.navInventory.addEventListener('click', () => switchTab('inventory'));
  if (dom.navMerchandising) dom.navMerchandising.addEventListener('click', () => switchTab('merchandising'));
  if (dom.navLogs) dom.navLogs.addEventListener('click', () => switchTab('logs'));
  if (dom.refreshLogsBtn) dom.refreshLogsBtn.addEventListener('click', loadAuditLogs);

  // Brand Combobox Events
  initBrandComboboxEvents();

  // Search Input with Debounce
  let searchTimer = null;
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
        fetchProducts(1);
      }, 250);
    });
  }

  // Refresh Button
  if (dom.refreshBtn) {
    dom.refreshBtn.addEventListener('click', () => {
      fetchProducts(state.currentPage);
      showToast('รีเฟรชข้อมูลเรียบร้อย');
    });
  }

  // Multi-Criteria Inline Collapsible Filter Panel Controls
  if (dom.btnOpenFilters) {
    dom.btnOpenFilters.addEventListener('click', () => {
      toggleInlineFilterPanel();
    });
  }
  if (dom.btnCloseFilterPanel) {
    dom.btnCloseFilterPanel.addEventListener('click', () => {
      toggleInlineFilterPanel(false);
    });
  }
  if (dom.btnResetFilterModal) {
    dom.btnResetFilterModal.addEventListener('click', resetInlineFilters);
  }
  if (dom.btnClearAllFilters) {
    dom.btnClearAllFilters.addEventListener('click', resetInlineFilters);
  }
  if (dom.inlineFilterPanel) {
    dom.inlineFilterPanel.querySelectorAll('.filter-status-cb, .filter-avail-cb, .filter-badge-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        applyInlineFilters();
      });
    });
  }

  // Progressive Batch Selection Controls
  if (dom.btnToggleSelectMode) {
    dom.btnToggleSelectMode.addEventListener('click', () => {
      toggleSelectionMode();
    });
  }
  if (dom.btnCancelBatchSelection) {
    dom.btnCancelBatchSelection.addEventListener('click', () => {
      toggleSelectionMode(false);
    });
  }
  if (dom.inventorySelectAll) {
    dom.inventorySelectAll.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const checkboxes = dom.productRowsContainer ? dom.productRowsContainer.querySelectorAll('.row-select-checkbox') : [];
      checkboxes.forEach(cb => {
        cb.checked = isChecked;
        const pid = cb.getAttribute('data-product-id');
        if (isChecked) {
          state.selectedProductIds.add(pid);
        } else {
          state.selectedProductIds.delete(pid);
        }
        const row = cb.closest('.product-row');
        if (row) {
          if (isChecked) row.classList.add('bg-neutral-100/70');
          else row.classList.remove('bg-neutral-100/70');
        }
      });
      renderFloatingBatchDock();
    });
  }

  // Floating Batch Action Dock Buttons
  document.querySelectorAll('.batch-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const status = btn.getAttribute('data-batch-status');
      const avail = btn.getAttribute('data-batch-avail');
      executeBatchStatusUpdate(status, avail);
    });
  });

  // Status Filter Pills
  dom.statusPills.forEach(pill => {
    pill.addEventListener('click', () => {
      state.statusFilter = pill.getAttribute('data-status');
      state.filterStatuses.clear();
      state.filterAvailabilities.clear();
      state.filterBadges.clear();
      if (dom.inlineFilterPanel) {
        dom.inlineFilterPanel.querySelectorAll('.filter-status-cb, .filter-avail-cb, .filter-badge-cb').forEach(cb => {
          cb.checked = false;
        });
      }
      updateActiveFilterBadge();
      renderActiveFilterPills();
      updateStatusPillVisuals();
      fetchProducts(1);
    });
  });

  // Category Filter Select
  if (dom.categorySelect) {
    dom.categorySelect.addEventListener('change', (e) => {
      state.categoryFilter = e.target.value;
      state.filterCategories.clear();
      if (dom.inlineFilterPanel) {
        dom.inlineFilterPanel.querySelectorAll('.filter-category-cb').forEach(cb => {
          cb.checked = false;
        });
      }
      updateActiveFilterBadge();
      renderActiveFilterPills();
      fetchProducts(1);
    });
  }

  // Sort Select
  if (dom.sortSelect) {
    dom.sortSelect.addEventListener('change', (e) => {
      state.sortOrder = e.target.value;
      fetchProducts(1);
    });
  }

  // Quick Stock Modal Controls
  if (dom.modalCloseBtn) dom.modalCloseBtn.addEventListener('click', closeInlineStockModal);
  if (dom.modalCancelBtn) dom.modalCancelBtn.addEventListener('click', closeInlineStockModal);
  if (dom.modalSaveBtn) dom.modalSaveBtn.addEventListener('click', handleSaveInlineStock);
  if (dom.modalStockInput) {
    dom.modalStockInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSaveInlineStock();
    });
  }

  // Curation Picker Modal Controls
  if (dom.pickerCloseBtn) dom.pickerCloseBtn.addEventListener('click', closeCurationPicker);
  if (dom.pickerCancelBtn) dom.pickerCancelBtn.addEventListener('click', closeCurationPicker);
  if (dom.pickerSubmitBtn) dom.pickerSubmitBtn.addEventListener('click', handleBatchAddToCollection);

  let pickerSearchTimer = null;
  if (dom.pickerSearchInput) {
    dom.pickerSearchInput.addEventListener('input', (e) => {
      clearTimeout(pickerSearchTimer);
      pickerSearchTimer = setTimeout(() => {
        state.pickerSearchQuery = e.target.value.trim();
        renderPickerCandidates();
      }, 200);
    });
  }

  if (dom.pickerCategoryFilter) {
    dom.pickerCategoryFilter.addEventListener('change', (e) => {
      state.pickerCategoryFilter = e.target.value;
      renderPickerCandidates();
    });
  }

  if (dom.pickerFilterUnselected) {
    dom.pickerFilterUnselected.addEventListener('change', (e) => {
      state.pickerFilterUnselected = e.target.checked;
      renderPickerCandidates();
    });
  }

  if (dom.pickerSelectAll) {
    dom.pickerSelectAll.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const candidateCheckboxes = dom.pickerProductList ? dom.pickerProductList.querySelectorAll('.picker-item-checkbox') : [];
      candidateCheckboxes.forEach(cb => {
        const pid = cb.getAttribute('data-product-id');
        if (isChecked) {
          state.pickerSelectedIds.add(pid);
        } else {
          state.pickerSelectedIds.delete(pid);
        }
      });
      renderPickerCandidates();
    });
  }

  if (dom.pickerClearBtn) {
    dom.pickerClearBtn.addEventListener('click', () => {
      state.pickerSelectedIds.clear();
      if (dom.pickerSelectAll) dom.pickerSelectAll.checked = false;
      renderPickerCandidates();
    });
  }

  // Add Product Buttons (Header + Toolbar)
  if (dom.btnAddProduct) {
    dom.btnAddProduct.addEventListener('click', openCreateProductDrawer);
  }
  if (dom.headerBtnAddProduct) {
    dom.headerBtnAddProduct.addEventListener('click', openCreateProductDrawer);
  }

  // Drawer Category Change listener
  if (dom.drawerCategory) {
    dom.drawerCategory.addEventListener('change', () => {
      const selectedOption = dom.drawerCategory.options[dom.drawerCategory.selectedIndex];
      const catName = selectedOption ? (selectedOption.getAttribute('data-name') || selectedOption.text) : 'กลุ่มลวดเชื่อม';
      state.activeProductCategory = catName;
      if (state.activeProduct) {
        state.activeProduct.categories = [
          {
            level: 1,
            name: catName,
            url_slug: dom.drawerCategory.value
          }
        ];
      }
      renderBrandComboboxOptions('');
      renderDrawerVariants();
      renderDrawerSpecs();
      updateDrawerLivePreview();
    });
  }

  // WYSIWYG Drawer Controls
  if (dom.drawerCloseBtn) dom.drawerCloseBtn.addEventListener('click', closeProductDrawer);
  if (dom.drawerCancelBtn) dom.drawerCancelBtn.addEventListener('click', closeProductDrawer);
  if (dom.drawerBackdrop) dom.drawerBackdrop.addEventListener('click', closeProductDrawer);
  if (dom.drawerSaveBtn) dom.drawerSaveBtn.addEventListener('click', handleSaveDrawer);
  if (dom.btnAddCustomSize) {
    dom.btnAddCustomSize.addEventListener('click', () => {
      const customSize = prompt('ระบุขนาดหรือไซส์ที่ต้องการเพิ่ม (เช่น 5.0 mm, 2XL, กล่อง 100 ชิ้น):');
      if (customSize && customSize.trim()) {
        addSizeGroup(customSize.trim());
      }
    });
  }
  if (dom.btnAddSpecRow) {
    dom.btnAddSpecRow.addEventListener('click', () => {
      addSpecRow('', '');
    });
  }
  attachRichContentListeners();

  // Tab Switching Listeners for Wide Workbench Modal
  const tabsBar = document.getElementById('editor-tabs-bar');
  if (tabsBar) {
    tabsBar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchEditorTab(btn.dataset.tab);
      });
    });
  }

  // Quick Tab Shortcuts in Right Preview Column
  document.querySelectorAll('.btn-quick-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      if (target) switchEditorTab(target);
    });
  });

  const btnAddDrawerVariant = document.getElementById('btn-add-drawer-variant');
  if (btnAddDrawerVariant) {
    btnAddDrawerVariant.addEventListener('click', () => {
      if (!state.activeProduct) return;
      state.activeProduct.variants = state.activeProduct.variants || [];
      const newSku = `${state.activeProduct.sku || state.activeProduct.id}-V${state.activeProduct.variants.length + 1}`;
      state.activeProduct.variants.push({
        size: '',
        package: 'ชิ้น',
        unit: 'ชิ้น',
        weight: '',
        price: 0,
        original_price: null,
        stock: 0,
        sku: newSku
      });
      renderDrawerVariants();
      updateDrawerLivePreview();
    });
  }

  // Product Image Framing Modal & Canvas Listeners
  if (dom.btnOpenImageFraming) {
    dom.btnOpenImageFraming.addEventListener('click', (e) => {
      e.preventDefault();
      state.framingTargetIndex = 0;
      openImageFramingModal();
    });
  }
  if (dom.btnCloseFramingModal) dom.btnCloseFramingModal.addEventListener('click', closeImageFramingModal);
  if (dom.btnFramingCancel) dom.btnFramingCancel.addEventListener('click', closeImageFramingModal);

  // Click on dialog backdrop dismisses modal
  if (dom.imageFramingModal) {
    dom.imageFramingModal.addEventListener('click', (e) => {
      if (e.target === dom.imageFramingModal) {
        closeImageFramingModal();
      }
    });
  }

  // File Picker - Device Browse Button & Hidden Input
  if (dom.btnFramingBrowse) {
    dom.btnFramingBrowse.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.framingFileInput) {
        dom.framingFileInput.value = '';
        dom.framingFileInput.click();
      }
    });
  }

  if (dom.framingFileInput) {
    dom.framingFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) loadImageIntoFraming(file);
    });
  }

  // Zoom Slider & Buttons
  if (dom.framingZoomSlider) {
    dom.framingZoomSlider.addEventListener('input', (e) => {
      updateFramingZoom(parseFloat(e.target.value));
    });
  }
  if (dom.btnFramingZoomIn) {
    dom.btnFramingZoomIn.addEventListener('click', () => {
      updateFramingZoom(framingState.userZoom + 0.15);
    });
  }
  if (dom.btnFramingZoomOut) {
    dom.btnFramingZoomOut.addEventListener('click', () => {
      updateFramingZoom(framingState.userZoom - 0.15);
    });
  }

  // Quick Action Buttons
  if (dom.btnFramingSnapCenter) dom.btnFramingSnapCenter.addEventListener('click', snapFramingToCenter);
  if (dom.btnFramingRotate) dom.btnFramingRotate.addEventListener('click', rotateFramingImage);
  if (dom.btnFramingApplyUpload) dom.btnFramingApplyUpload.addEventListener('click', handleApplyFramingAndUpload);

  // Pan / Drag Interactions on Canvas Viewport
  if (dom.framingCanvasViewport) {
    // Mouse events
    dom.framingCanvasViewport.addEventListener('mousedown', (e) => {
      if (!framingState.imgLoaded) return;
      framingState.isDragging = true;
      framingState.dragStartX = e.clientX;
      framingState.dragStartY = e.clientY;
      framingState.panStartX = framingState.panX;
      framingState.panStartY = framingState.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!framingState.isDragging) return;
      const dx = e.clientX - framingState.dragStartX;
      const dy = e.clientY - framingState.dragStartY;
      framingState.panX = framingState.panStartX + dx;
      framingState.panY = framingState.panStartY + dy;
      renderFramingDisplay();
    });

    window.addEventListener('mouseup', () => {
      framingState.isDragging = false;
    });

    // Touch events
    dom.framingCanvasViewport.addEventListener('touchstart', (e) => {
      if (!framingState.imgLoaded || e.touches.length === 0) return;
      framingState.isDragging = true;
      framingState.dragStartX = e.touches[0].clientX;
      framingState.dragStartY = e.touches[0].clientY;
      framingState.panStartX = framingState.panX;
      framingState.panStartY = framingState.panY;
    }, { passive: true });

    dom.framingCanvasViewport.addEventListener('touchmove', (e) => {
      if (!framingState.isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - framingState.dragStartX;
      const dy = e.touches[0].clientY - framingState.dragStartY;
      framingState.panX = framingState.panStartX + dx;
      framingState.panY = framingState.panStartY + dy;
      renderFramingDisplay();
    }, { passive: true });

    dom.framingCanvasViewport.addEventListener('touchend', () => {
      framingState.isDragging = false;
    });

    // Wheel Zoom
    dom.framingCanvasViewport.addEventListener('wheel', (e) => {
      if (!framingState.imgLoaded) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      updateFramingZoom(framingState.userZoom + delta);
    }, { passive: false });
  }

  // Drag and Drop files onto canvas, modal card, or full dialog
  const setupFramingDropzone = (el) => {
    if (!el) return;
    ['dragenter', 'dragover'].forEach(name => {
      el.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dom.framingCanvasViewport) {
          dom.framingCanvasViewport.classList.add('ring-4', 'ring-amber-400');
        }
      });
    });

    ['dragleave', 'dragend'].forEach(name => {
      el.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dom.framingCanvasViewport) {
          dom.framingCanvasViewport.classList.remove('ring-4', 'ring-amber-400');
        }
      });
    });

    el.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.framingCanvasViewport) {
        dom.framingCanvasViewport.classList.remove('ring-4', 'ring-amber-400');
      }
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        loadImageIntoFraming(file);
      } else if (file) {
        showToast('กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WebP) เท่านั้น', 'error');
      }
    });
  };

  setupFramingDropzone(dom.framingCanvasViewport);
  setupFramingDropzone(dom.framingModalCard);
  setupFramingDropzone(dom.imageFramingModal);

  // Showcase Framing Modal Event Listeners
  if (dom.btnCloseShowcaseFraming) {
    dom.btnCloseShowcaseFraming.addEventListener('click', closeShowcaseFramingModal);
  }
  if (dom.btnShowcaseFramingCancel) {
    dom.btnShowcaseFramingCancel.addEventListener('click', closeShowcaseFramingModal);
  }
  if (dom.showcaseFramingModal) {
    dom.showcaseFramingModal.addEventListener('click', (e) => {
      if (e.target === dom.showcaseFramingModal) {
        closeShowcaseFramingModal();
      }
    });
  }

  // Showcase File Picker Browse Button & Input
  if (dom.btnShowcaseFramingBrowse) {
    dom.btnShowcaseFramingBrowse.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.showcaseFramingFileInput) {
        dom.showcaseFramingFileInput.value = '';
        dom.showcaseFramingFileInput.click();
      }
    });
  }

  if (dom.showcaseFramingFileInput) {
    dom.showcaseFramingFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) loadShowcaseImageIntoFraming(file);
    });
  }

  // Pull Primary Product Image in Showcase Framing Modal
  if (dom.btnShowcaseFramingUsePrimary) {
    dom.btnShowcaseFramingUsePrimary.addEventListener('click', () => {
      if (!state.activeProduct || !state.activeProduct.images || state.activeProduct.images.length === 0) {
        showToast('สินค้านี้ยังไม่มีรูปภาพหลัก', 'error');
        return;
      }
      const raw0 = state.activeProduct.images[0];
      const primaryUrl = typeof raw0 === 'string' ? raw0 : (raw0.large || raw0.card || raw0.original || raw0.thumb || '');
      if (primaryUrl) {
        loadShowcaseImageIntoFraming(primaryUrl);
        showToast('ดึงรูปภาพหลักเข้าสู่หน้าต่างจัดกรอบสำเร็จ');
      }
    });
  }

  // Aspect Ratio & Height Preset Buttons
  if (dom.btnShowcasePresetAuto) {
    dom.btnShowcasePresetAuto.addEventListener('click', () => setCropHeightPreset('auto'));
  }
  if (dom.btnShowcasePreset169) {
    dom.btnShowcasePreset169.addEventListener('click', () => setCropHeightPreset('16:9'));
  }
  if (dom.btnShowcasePreset43) {
    dom.btnShowcasePreset43.addEventListener('click', () => setCropHeightPreset('4:3'));
  }
  if (dom.btnShowcasePreset11) {
    dom.btnShowcasePreset11.addEventListener('click', () => setCropHeightPreset('1:1'));
  }

  // Showcase Height Number Input
  if (dom.showcaseFramingHeightInput) {
    const handleHeightChange = () => {
      const val = parseInt(dom.showcaseFramingHeightInput.value, 10);
      if (!isNaN(val) && val >= 300 && val <= 3200) {
        showcaseFramingState.customHeight = val;
        showcaseFramingState.cropHeightMode = 'custom';
        updatePresetButtonsHighlight('custom');
        updateShowcaseFramingDimensions();
      }
    };
    dom.showcaseFramingHeightInput.addEventListener('input', handleHeightChange);
    dom.showcaseFramingHeightInput.addEventListener('change', handleHeightChange);
  }

  // Drag Resize Handles for Showcase Framing Viewport
  const handleStartShowcaseResize = (handle, clientY) => {
    showcaseFramingState.isResizingHeight = true;
    showcaseFramingState.resizeHandle = handle;
    showcaseFramingState.resizeStartY = clientY;
    showcaseFramingState.resizeStartHeight = showcaseFramingState.customHeight || 900;
  };

  if (dom.showcaseCropHandleTop) {
    dom.showcaseCropHandleTop.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleStartShowcaseResize('top', e.clientY);
    });
    dom.showcaseCropHandleTop.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      if (e.touches.length > 0) handleStartShowcaseResize('top', e.touches[0].clientY);
    }, { passive: false });
  }

  if (dom.showcaseCropHandleBottom) {
    dom.showcaseCropHandleBottom.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleStartShowcaseResize('bottom', e.clientY);
    });
    dom.showcaseCropHandleBottom.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      if (e.touches.length > 0) handleStartShowcaseResize('bottom', e.touches[0].clientY);
    }, { passive: false });
  }

  // Zoom Slider & Buttons for Showcase Framing
  if (dom.showcaseFramingZoomSlider) {
    dom.showcaseFramingZoomSlider.addEventListener('input', (e) => {
      updateShowcaseFramingZoom(parseFloat(e.target.value));
    });
  }
  if (dom.btnShowcaseFramingZoomIn) {
    dom.btnShowcaseFramingZoomIn.addEventListener('click', () => {
      updateShowcaseFramingZoom(showcaseFramingState.userZoom + 0.15);
    });
  }
  if (dom.btnShowcaseFramingZoomOut) {
    dom.btnShowcaseFramingZoomOut.addEventListener('click', () => {
      updateShowcaseFramingZoom(showcaseFramingState.userZoom - 0.15);
    });
  }

  // Action Buttons for Showcase Framing
  if (dom.btnShowcaseFramingSnapCenter) dom.btnShowcaseFramingSnapCenter.addEventListener('click', snapShowcaseFramingToCenter);
  if (dom.btnShowcaseFramingRotate) dom.btnShowcaseFramingRotate.addEventListener('click', rotateShowcaseFramingImage);
  if (dom.btnShowcaseFramingApplyUpload) dom.btnShowcaseFramingApplyUpload.addEventListener('click', handleApplyShowcaseFramingAndUpload);

  // Pan / Drag Interactions on Showcase Canvas Viewport
  if (dom.showcaseFramingViewport) {
    dom.showcaseFramingViewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('#showcase-crop-handle-top, #showcase-crop-handle-bottom')) return;
      if (!showcaseFramingState.imgLoaded) return;
      showcaseFramingState.isDragging = true;
      showcaseFramingState.dragStartX = e.clientX;
      showcaseFramingState.dragStartY = e.clientY;
      showcaseFramingState.panStartX = showcaseFramingState.panX;
      showcaseFramingState.panStartY = showcaseFramingState.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (showcaseFramingState.isResizingHeight) {
        const dy = e.clientY - showcaseFramingState.resizeStartY;
        const rect = dom.showcaseFramingViewport ? dom.showcaseFramingViewport.getBoundingClientRect() : null;
        const scale = rect && rect.width > 0 ? (1600 / rect.width) : 3;
        let newH = showcaseFramingState.resizeHandle === 'bottom'
          ? showcaseFramingState.resizeStartHeight + Math.round(dy * scale)
          : showcaseFramingState.resizeStartHeight - Math.round(dy * scale);
        newH = Math.max(400, Math.min(3200, newH));
        showcaseFramingState.customHeight = newH;
        showcaseFramingState.cropHeightMode = 'custom';
        if (dom.showcaseFramingHeightInput) dom.showcaseFramingHeightInput.value = newH;
        updatePresetButtonsHighlight('custom');
        updateShowcaseFramingDimensions();
        return;
      }

      if (!showcaseFramingState.isDragging) return;
      const dx = e.clientX - showcaseFramingState.dragStartX;
      const dy = e.clientY - showcaseFramingState.dragStartY;
      showcaseFramingState.panX = showcaseFramingState.panStartX + dx;
      showcaseFramingState.panY = showcaseFramingState.panStartY + dy;
      renderShowcaseFramingDisplay();
    });

    window.addEventListener('mouseup', () => {
      showcaseFramingState.isResizingHeight = false;
      showcaseFramingState.isDragging = false;
    });

    // Touch events
    dom.showcaseFramingViewport.addEventListener('touchstart', (e) => {
      if (e.target.closest('#showcase-crop-handle-top, #showcase-crop-handle-bottom')) return;
      if (!showcaseFramingState.imgLoaded || e.touches.length === 0) return;
      showcaseFramingState.isDragging = true;
      showcaseFramingState.dragStartX = e.touches[0].clientX;
      showcaseFramingState.dragStartY = e.touches[0].clientY;
      showcaseFramingState.panStartX = showcaseFramingState.panX;
      showcaseFramingState.panStartY = showcaseFramingState.panY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (showcaseFramingState.isResizingHeight && e.touches.length > 0) {
        const dy = e.touches[0].clientY - showcaseFramingState.resizeStartY;
        const rect = dom.showcaseFramingViewport ? dom.showcaseFramingViewport.getBoundingClientRect() : null;
        const scale = rect && rect.width > 0 ? (1600 / rect.width) : 3;
        let newH = showcaseFramingState.resizeHandle === 'bottom'
          ? showcaseFramingState.resizeStartHeight + Math.round(dy * scale)
          : showcaseFramingState.resizeStartHeight - Math.round(dy * scale);
        newH = Math.max(400, Math.min(3200, newH));
        showcaseFramingState.customHeight = newH;
        showcaseFramingState.cropHeightMode = 'custom';
        if (dom.showcaseFramingHeightInput) dom.showcaseFramingHeightInput.value = newH;
        updatePresetButtonsHighlight('custom');
        updateShowcaseFramingDimensions();
        return;
      }

      if (!showcaseFramingState.isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - showcaseFramingState.dragStartX;
      const dy = e.touches[0].clientY - showcaseFramingState.dragStartY;
      showcaseFramingState.panX = showcaseFramingState.panStartX + dx;
      showcaseFramingState.panY = showcaseFramingState.panStartY + dy;
      renderShowcaseFramingDisplay();
    }, { passive: true });

    window.addEventListener('touchend', () => {
      showcaseFramingState.isResizingHeight = false;
      showcaseFramingState.isDragging = false;
    });

    // Wheel Zoom
    dom.showcaseFramingViewport.addEventListener('wheel', (e) => {
      if (!showcaseFramingState.imgLoaded) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      updateShowcaseFramingZoom(showcaseFramingState.userZoom + delta);
    }, { passive: false });
  }

  // Drag and Drop on Showcase Viewport, Modal Card & Dialog
  const setupShowcaseDropzone = (el) => {
    if (!el) return;
    ['dragenter', 'dragover'].forEach(name => {
      el.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dom.showcaseDropOverlay) dom.showcaseDropOverlay.classList.remove('hidden');
        if (dom.showcaseFramingViewport) dom.showcaseFramingViewport.classList.add('ring-4', 'ring-blue-500');
      });
    });

    ['dragleave', 'dragend'].forEach(name => {
      el.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dom.showcaseDropOverlay) dom.showcaseDropOverlay.classList.add('hidden');
        if (dom.showcaseFramingViewport) dom.showcaseFramingViewport.classList.remove('ring-4', 'ring-blue-500');
      });
    });

    el.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.showcaseDropOverlay) dom.showcaseDropOverlay.classList.add('hidden');
      if (dom.showcaseFramingViewport) dom.showcaseFramingViewport.classList.remove('ring-4', 'ring-blue-500');
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        loadShowcaseImageIntoFraming(file);
      } else if (file) {
        showToast('กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WebP) เท่านั้น', 'error');
      }
    });
  };

  setupShowcaseDropzone(dom.showcaseFramingViewport);
  setupShowcaseDropzone(dom.showcaseFramingCard);
  setupShowcaseDropzone(dom.showcaseFramingModal);

  // Admin Login & Logout Listeners
  if (dom.loginForm) {
    dom.loginForm.addEventListener('submit', handleLogin);
  }
  if (dom.adminLogoutBtn) {
    dom.adminLogoutBtn.addEventListener('click', handleLogout);
  }

  // Audit Logs Filter & Search Listeners
  let auditSearchTimer = null;
  if (dom.auditSearchInput) {
    dom.auditSearchInput.addEventListener('input', (e) => {
      clearTimeout(auditSearchTimer);
      auditSearchTimer = setTimeout(() => {
        state.auditSearchQuery = e.target.value.trim();
        loadAuditLogs();
      }, 250);
    });
  }

  if (dom.auditRoleFilter) {
    dom.auditRoleFilter.addEventListener('change', (e) => {
      state.auditRoleFilter = e.target.value;
      loadAuditLogs();
    });
  }

  if (dom.auditActionFilter) {
    dom.auditActionFilter.addEventListener('change', (e) => {
      state.auditActionFilter = e.target.value;
      loadAuditLogs();
    });
  }

  // Drawer Form Inputs Live Preview Listener
  const liveInputs = [
    dom.drawerName,
    dom.drawerNameEn,
    dom.drawerBrand,
    dom.drawerSortPriority,
    dom.drawerFlagBest,
    dom.drawerFlagNew,
    dom.drawerFlagRec,
    dom.drawerFlagPromo,
    dom.drawerDesc
  ];
  liveInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updateDrawerLivePreview);
      input.addEventListener('change', updateDrawerLivePreview);
    }
  });

  // 1-Click Status Popover Controls
  if (dom.globalStatusPopover) {
    dom.globalStatusPopover.querySelectorAll('.status-option-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const newStatus = item.getAttribute('data-status');
        handleSelectStatus(newStatus);
      });
    });
  }

  // Shelf Rank Quick Move Popover Controls
  if (dom.btnCloseRankPopover) {
    dom.btnCloseRankPopover.addEventListener('click', (e) => {
      e.stopPropagation();
      closeShelfRankPopover();
    });
  }
  if (dom.btnCancelRankPopover) {
    dom.btnCancelRankPopover.addEventListener('click', (e) => {
      e.stopPropagation();
      closeShelfRankPopover();
    });
  }
  if (dom.shelfRankForm) {
    dom.shelfRankForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (dom.rankPopoverInput) {
        submitShelfRankPopover(dom.rankPopoverInput.value.trim());
      }
    });
  }
  if (dom.shelfRankPopover) {
    dom.shelfRankPopover.querySelectorAll('.btn-rank-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const preset = btn.getAttribute('data-preset');
        let targetRank = 1;
        if (preset === '1') targetRank = 1;
        else if (preset === '3') targetRank = 3;
        else if (preset === '5') targetRank = 5;
        else if (preset === 'last') {
          targetRank = btn.getAttribute('data-target-rank') || (state.shelfRankPopoverTarget?.totalCount ?? 1);
        }
        submitShelfRankPopover(targetRank);
      });
    });
  }

  // Dismiss status and rank popovers on click outside, scroll, or escape
  window.addEventListener('click', (e) => {
    if (state.statusPopoverTarget && dom.globalStatusPopover && !dom.globalStatusPopover.contains(e.target)) {
      closeStatusPopover();
    }
    if (state.shelfRankPopoverTarget && dom.shelfRankPopover && !dom.shelfRankPopover.contains(e.target) && !e.target.closest('.btn-open-rank-popover')) {
      closeShelfRankPopover();
    }
  });

  window.addEventListener('scroll', () => {
    if (state.statusPopoverTarget) closeStatusPopover();
    if (state.shelfRankPopoverTarget) closeShelfRankPopover();
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.statusPopoverTarget) closeStatusPopover();
      if (state.shelfRankPopoverTarget) closeShelfRankPopover();
    }
  });

  // Gallery Management File Browse & Upload
  if (dom.btnBrowseGalleryImg) {
    dom.btnBrowseGalleryImg.addEventListener('click', (e) => {
      e.preventDefault();
      if (dom.drawerGalleryFileInput) {
        dom.drawerGalleryFileInput.value = '';
        dom.drawerGalleryFileInput.click();
      }
    });
  }

  if (dom.drawerGalleryFileInput) {
    dom.drawerGalleryFileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        uploadGalleryFiles(files);
      }
    });
  }

  // Gallery Drag & Drop Multi-file Upload
  if (dom.drawerGalleryContainer) {
    let galleryDragCounter = 0;

    dom.drawerGalleryContainer.addEventListener('dragenter', (e) => {
      e.preventDefault();
      e.stopPropagation();
      galleryDragCounter++;
      if (dom.drawerGalleryDropOverlay) {
        dom.drawerGalleryDropOverlay.classList.remove('hidden');
      }
    });

    dom.drawerGalleryContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      if (dom.drawerGalleryDropOverlay && dom.drawerGalleryDropOverlay.classList.contains('hidden')) {
        dom.drawerGalleryDropOverlay.classList.remove('hidden');
      }
    });

    dom.drawerGalleryContainer.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      galleryDragCounter--;
      if (galleryDragCounter <= 0) {
        galleryDragCounter = 0;
        if (dom.drawerGalleryDropOverlay) {
          dom.drawerGalleryDropOverlay.classList.add('hidden');
        }
      }
    });

    dom.drawerGalleryContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      galleryDragCounter = 0;
      if (dom.drawerGalleryDropOverlay) {
        dom.drawerGalleryDropOverlay.classList.add('hidden');
      }
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        uploadGalleryFiles(files);
      }
    });
  }

  // Gallery URL Inputs
  if (dom.btnAddGalleryUrl) {
    dom.btnAddGalleryUrl.addEventListener('click', (e) => {
      e.preventDefault();
      if (dom.drawerGalleryUrlBar) {
        dom.drawerGalleryUrlBar.classList.toggle('hidden');
        if (!dom.drawerGalleryUrlBar.classList.contains('hidden') && dom.drawerGalleryUrlInput) {
          dom.drawerGalleryUrlInput.focus();
        }
      }
    });
  }

  if (dom.btnCancelGalleryUrl) {
    dom.btnCancelGalleryUrl.addEventListener('click', (e) => {
      e.preventDefault();
      if (dom.drawerGalleryUrlBar) dom.drawerGalleryUrlBar.classList.add('hidden');
    });
  }

  if (dom.btnSubmitGalleryUrl) {
    dom.btnSubmitGalleryUrl.addEventListener('click', (e) => {
      e.preventDefault();
      const val = dom.drawerGalleryUrlInput?.value.trim();
      if (val) {
        addGalleryImage(val);
        if (dom.drawerGalleryUrlInput) dom.drawerGalleryUrlInput.value = '';
        if (dom.drawerGalleryUrlBar) dom.drawerGalleryUrlBar.classList.add('hidden');
      } else {
        showToast('กรุณาระบุ URL รูปภาพ', 'error');
      }
    });
  }

  // Danger Zone Single Product Delete Button
  if (dom.btnDrawerDeleteProduct) {
    dom.btnDrawerDeleteProduct.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.activeProduct) {
        openSingleDeleteModal(state.activeProduct);
      }
    });
  }

  // Batch Delete Button in Floating Dock
  if (dom.btnBatchDeleteProducts) {
    dom.btnBatchDeleteProducts.addEventListener('click', (e) => {
      e.preventDefault();
      openBatchDeleteModal();
    });
  }

  // Delete Confirmation Modal Actions
  if (dom.deleteModalCancelBtn) {
    dom.deleteModalCancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDeleteConfirmModal();
    });
  }

  if (dom.deleteModalConfirmBtn) {
    dom.deleteModalConfirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleConfirmDelete();
    });
  }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  buildBrandTaxonomy(state.allProductsCache);
  initEvents();
  checkAuth();
  updateActiveFilterBadge();
  renderActiveFilterPills();
  fetchProducts(1);
  loadAllProductsCatalog();
});

