import { mockDatabase } from './mock_database.js';

window.homeProducts = {};

import { 
  generateCardHTML, 
  generateSkeletonCardHTML,
  ProductCard, 
  formatPrice, 
  getStartingPrice, 
  getOriginalPriceForStarting, 
  resolveImageSrc 
} from './components/ProductCard.js';

export { 
  generateCardHTML, 
  generateSkeletonCardHTML,
  ProductCard, 
  formatPrice, 
  getStartingPrice, 
  getOriginalPriceForStarting, 
  resolveImageSrc 
};

const extractNumberSize = (sizeStr) => {
    const match = sizeStr.match(/^[0-9.]+/);
    return match ? match[0] : sizeStr;
};

const injectTrack = (id, filterSortFn, sourceDb = mockDatabase) => {
  const track = document.getElementById(id);
  if (!track) return;

  if (!sourceDb || sourceDb.length === 0) {
    track.innerHTML = Array.from({ length: 5 }, () => generateSkeletonCardHTML(false)).join('');
    return;
  }

  const products = filterSortFn([...sourceDb]);
  if (products.length === 0) {
    track.innerHTML = Array.from({ length: 5 }, () => generateSkeletonCardHTML(false)).join('');
    return;
  }

  track.innerHTML = products.map(p => generateCardHTML(p, false)).join('');
};

const getBrandIdentifier = (product) => {
  const brand = (product.brand?.name || '').trim();
  if (brand && brand !== 'NoBrand') return brand.toLowerCase();
  const name = (product.name || '').trim().toLowerCase();
  const knownBrands = [
    'dewalt', 'makita', 'emtop', 'autowel', 'hyundai', 'kobe', 'kobelco', 
    'yawata', 'gemini', 'champ', 'harris', 'nkk', 'whalespray', 'nabakem', 
    'selectarc', 'powerarc', 'powerweld', 'optech', 'udo', 'sumo'
  ];
  for (const b of knownBrands) {
    if (name.includes(b)) return b;
  }
  return name.split(' ')[0] || '';
};

const getProductSilhouette = (product) => {
  const name = (product.name || '').toLowerCase();
  if (name.includes('เครื่องเชื่อม') || name.includes('พลาสม่า')) return 'machine';
  if (name.includes('สว่าน') || name.includes('เจียรไร้สาย') || name.includes('บล็อก') || name.includes('เลื่อย') || name.includes('แท่นตัด') || name.includes('เครื่องเจียร')) return 'tool';
  if (name.includes('ชุดตัดแก๊ส') || name.includes('ด้ามตัด') || name.includes('เกจ์') || name.includes('น๊อต') || name.includes('หัวเผาแก๊ส')) return 'gas';
  if (name.includes('ใบตัด') || name.includes('แผ่นเจียร') || name.includes('ใบเจียร') || name.includes('จานทราย')) return 'abrasive';
  if (name.includes('ถุงมือ') || name.includes('หน้ากาก') || name.includes('กระจก') || name.includes('แว่นตา') || name.includes('ปลอกแขน') || name.includes('ข้อต่อสายเชื่อม')) return 'safety';
  if (name.includes('สเปรย์') || name.includes('น้ำยา') || name.includes('ครีม') || name.includes('เจล')) return 'chemical';
  if (name.includes('รถเข็น') || name.includes('ท่อบรรจุ') || name.includes('สายอัด') || name.includes('หัววาล์ว')) return 'cylinder';
  if (name.includes('ลวดเชื่อม') || name.includes('ลวดคาร์บอน')) return 'wire';
  return 'misc';
};

const distributeDiversifiedPools = (pools, targetCount = 30, options = {}) => {
  const { maxSupercored = 1, maxBrassNuts = 1, checkSilhouette = true } = options;
  const result = [];
  const usedIds = new Set();
  const usedImages = new Set();
  let prevBrand = '';
  let prevSilhouette = '';
  let supercoredCount = 0;
  let nutCount = 0;

  for (let round = 0; round < 10; round++) {
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      const candidate = pool.find(p => {
        if (usedIds.has(p.id)) return false;
        
        const img = p.images?.[0]?.card || p.images?.[0];
        if (img && usedImages.has(img)) return false;

        const brand = getBrandIdentifier(p);
        if (brand && brand === prevBrand) return false;

        if (checkSilhouette) {
          const sil = getProductSilhouette(p);
          if (sil && sil !== 'misc' && sil === prevSilhouette) return false;
        }

        if (p.name.includes('SUPERCORED')) {
          if (supercoredCount >= maxSupercored) return false;
        }

        if (p.name.includes('แกนพร้อมน๊อต')) {
          if (nutCount >= maxBrassNuts) return false;
        }

        return true;
      });

      if (candidate) {
        usedIds.add(candidate.id);
        const img = candidate.images?.[0]?.card || candidate.images?.[0];
        if (img) usedImages.add(img);

        prevBrand = getBrandIdentifier(candidate);
        if (checkSilhouette) {
          prevSilhouette = getProductSilhouette(candidate);
        }

        if (candidate.name.includes('SUPERCORED')) supercoredCount++;
        if (candidate.name.includes('แกนพร้อมน๊อต')) nutCount++;

        result.push(candidate);
        if (result.length >= targetCount) return result;
      }
    }
  }

  if (result.length < targetCount) {
    for (const pool of pools) {
      for (const p of pool) {
        if (!usedIds.has(p.id)) {
          usedIds.add(p.id);
          result.push(p);
          if (result.length >= targetCount) return result;
        }
      }
    }
  }

  return result;
};

const storeDepartmentFilters = [
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-339' || c.name === 'เครื่องเชื่อมและเครื่องตัดพลาสม่า'),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-398' || c.name.includes('เครื่องมือช่าง')),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-312' || c.name.includes('อุปกรณ์เชื่อมตัดเผาแก๊ส')),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-298' || c.name.includes('ใบตัดใบเจียร')),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-344' || c.name.includes('อะไหล่สิ้นเปลือง') || c.name.includes('ถุงมือ') || c.name.includes('หน้ากาก')),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-382' || c.name.includes('เคมีภัณฑ์')),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-327' || c.name.includes('ท่อบรรจุก๊าซ') || p.name.includes('รถเข็น')),
  p => p.categories && p.categories.some(c => c.url_slug === 'cat-12' || c.name.includes('ลวดเชื่อม'))
];

// Track Calculation Functions
let bestSellersTopIds = new Set();

const bestSellersFn = (db) => {
  const publishedDb = db.filter(p => (p.status || 'publish') === 'publish');

  // Filter products explicitly placed on the best_seller shelf
  const curated = publishedDb
    .filter(p => p.storefront_shelves && p.storefront_shelves.best_seller !== null && p.storefront_shelves.best_seller !== undefined)
    .sort((a, b) => (a.storefront_shelves.best_seller ?? 9999) - (b.storefront_shelves.best_seller ?? 9999));

  if (curated.length > 0) {
    bestSellersTopIds = new Set(curated.slice(0, 16).map(p => p.id));
    return curated;
  }

  // Fallback to diversified pool if shelf is not yet populated
  const pools = storeDepartmentFilters.map(filterFn => {
    return publishedDb.filter(filterFn).sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
  });

  const items = distributeDiversifiedPools(pools, 30, { checkSilhouette: true, maxSupercored: 0, maxBrassNuts: 1 });
  bestSellersTopIds = new Set(items.slice(0, 16).map(p => p.id));
  return items;
};

const newArrivalsFn = (db) => {
  const publishedDb = db.filter(p => (p.status || 'publish') === 'publish');

  const curated = publishedDb
    .filter(p => p.storefront_shelves && p.storefront_shelves.new_arrival !== null && p.storefront_shelves.new_arrival !== undefined)
    .sort((a, b) => (a.storefront_shelves.new_arrival ?? 9999) - (b.storefront_shelves.new_arrival ?? 9999));

  if (curated.length > 0) {
    return curated;
  }

  const pools = storeDepartmentFilters.map(filterFn => {
    return publishedDb.filter(filterFn).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  });

  return distributeDiversifiedPools(pools, 30, { checkSilhouette: true, maxSupercored: 1, maxBrassNuts: 1 });
};

const forYouFn = (db) => {
  const publishedDb = db.filter(p => (p.status || 'publish') === 'publish');

  const curated = publishedDb
    .filter(p => p.storefront_shelves && p.storefront_shelves.recommended !== null && p.storefront_shelves.recommended !== undefined)
    .sort((a, b) => (a.storefront_shelves.recommended ?? 9999) - (b.storefront_shelves.recommended ?? 9999));

  if (curated.length > 0) {
    return curated;
  }

  const pools = storeDepartmentFilters.map(filterFn => {
    return publishedDb.filter(filterFn)
             .filter(p => !bestSellersTopIds.has(p.id))
             .sort((a, b) => {
               const scoreB = (b.rating || 4.5) * 500 + (b.sold_count || 0) * 0.5 + (b.flags?.is_recommended ? 1000 : 0);
               const scoreA = (a.rating || 4.5) * 500 + (a.sold_count || 0) * 0.5 + (a.flags?.is_recommended ? 1000 : 0);
               return scoreB - scoreA;
             });
  });

  return distributeDiversifiedPools(pools, 30, { checkSilhouette: true, maxSupercored: 0, maxBrassNuts: 1 });
};

const promoFn = (db) => {
  const publishedDb = db.filter(p => (p.status || 'publish') === 'publish');
  return publishedDb
    .filter(p => p.storefront_shelves && p.storefront_shelves.promotion !== null && p.storefront_shelves.promotion !== undefined)
    .sort((a, b) => (a.storefront_shelves.promotion ?? 9999) - (b.storefront_shelves.promotion ?? 9999));
};

const esc = (s) => (s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '');

export async function hydrateArticlesTrack() {
  const track = document.getElementById('articles-track');
  if (!track) return;

  try {
    let articles = [];
    const res = await fetch('/api/articles.php?limit=6');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        articles = data.articles;
      }
    }
    if (articles.length === 0) {
      const fallbackRes = await fetch('/api/articles.json');
      if (fallbackRes.ok) {
        const all = await fallbackRes.json();
        if (Array.isArray(all) && all.length > 0) {
          articles = all.slice(0, 6);
        }
      }
    }

    if (articles.length > 0) {
      track.innerHTML = articles.map(art => {
        const cover = art.cover_image || '/images/bg-welding.jpeg';
        const slug = art.slug || art.id;
        const excerpt = art.excerpt || '';
        return `
          <a href="/article.html?slug=${encodeURIComponent(slug)}" class="article-card-peek-3 snap-start shrink-0 flex flex-col group cursor-pointer">
            <div class="w-full aspect-[16/10] bg-gray-100 rounded-[8px] overflow-hidden mb-3.5 md:mb-4 relative">
              <img src="${cover}" alt="${esc(art.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
            </div>
            <h3 class="font-semibold text-[#160808] group-hover:text-brand-red transition-colors text-[18.5px] md:text-[20px] leading-[1.38] md:leading-[1.4] line-clamp-2 h-[54px] md:h-[58px] overflow-hidden text-ellipsis transform scale-y-[1.035] origin-top-left" title="${esc(art.title)}">
              ${esc(art.title)}
            </h3>
            <p class="text-[15px] md:text-[16px] text-[#555555] font-light line-clamp-2 mt-1 md:mt-1.5 leading-[1.48] md:leading-[1.5] h-[44px] md:h-[48px] overflow-hidden text-ellipsis">
              ${esc(excerpt)}
            </p>
          </a>
        `;
      }).join('');
    }
  } catch (e) {
    // Keep server-rendered static cards on error
  }
}

/**
 * Hydrate all storefront tracks with given product dataset
 */
export const hydrateAllTracks = (sourceDb = mockDatabase) => {
  bestSellersTopIds.clear();
  injectTrack('best-sellers-track', bestSellersFn, sourceDb);
  injectTrack('new-arrivals-track', newArrivalsFn, sourceDb);
  injectTrack('for-you-track', forYouFn, sourceDb);
  injectTrack('recommended-track', forYouFn, sourceDb);
  injectTrack('recommended-products-track', forYouFn, sourceDb);
  injectTrack('promotions-track', promoFn, sourceDb);
  injectTrack('promotion-track', promoFn, sourceDb);
  hydrateArticlesTrack();
};

// Initial synchronous render (0ms perceived latency)
hydrateAllTracks(mockDatabase);

// Listen for live catalog updates from API
if (typeof window !== 'undefined') {
  window.addEventListener('udo:catalog_updated', (e) => {
    const freshDb = e.detail?.products || mockDatabase;
    hydrateAllTracks(freshDb);
  });
}

// Animations & Interactions
document.addEventListener('click', (e) => {
    // Wishlist Heart Interaction
    const wishlistBtn = e.target.closest('.btn-wishlist');
    if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const svg = wishlistBtn.querySelector('svg');
        const isLiked = wishlistBtn.classList.toggle('active');
        
        if (isLiked) {
            wishlistBtn.classList.add('text-brand-red');
            wishlistBtn.classList.remove('text-[#252525]');
            if (svg) {
                svg.setAttribute('fill', 'currentColor');
                svg.classList.add('scale-125');
                setTimeout(() => svg.classList.remove('scale-125'), 200);
            }
        } else {
            wishlistBtn.classList.remove('text-brand-red');
            wishlistBtn.classList.add('text-[#252525]');
            if (svg) {
                svg.setAttribute('fill', 'none');
            }
        }
        return;
    }

    // Add to Cart Interaction
    const addToCartBtn = e.target.closest('.di-cart') || e.target.closest('.btn-direct-add');
    if (addToCartBtn) {
        e.preventDefault();
        
        // Update Navbar Badge
        const badge = document.getElementById('cart-badge');
        if (badge) {
            let count = parseInt(badge.textContent || '0');
            badge.textContent = count + 1;
            badge.style.transform = 'scale(1.6)';
            badge.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 250);
        }
        
        // Change button briefly for feedback (Minimalist)
        const originalContent = addToCartBtn.innerHTML;
        const isDirect = addToCartBtn.classList.contains('btn-direct-add');
        
        if (isDirect) {
            addToCartBtn.innerHTML = 'เพิ่มสำเร็จ';
            addToCartBtn.classList.add('text-brand-green');
        } else {
            addToCartBtn.innerHTML = '<svg class="w-3.5 h-3.5 text-white inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>';
        }
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalContent;
            if (isDirect) addToCartBtn.classList.remove('text-brand-green');
            
            // Close dynamic island if open
            const container = addToCartBtn.closest('.size-container');
            if (container) closeDynamicIsland(container);
        }, 800);
        
        return;
    }



    const sizeDot = e.target.closest('.size-dot');
    if (sizeDot) {
        e.preventDefault();
        const container = sizeDot.closest('.size-container');
        const pid = container.dataset.pid;
        const size = sizeDot.dataset.size;
        openDynamicIsland(container, pid, size);
        return;
    }

    const closeBtn = e.target.closest('.di-close');
    if (closeBtn) {
        e.preventDefault();
        const container = closeBtn.closest('.size-container');
        closeDynamicIsland(container);
        return;
    }
    
    const pkgBtn = e.target.closest('.di-pkg');
    if (pkgBtn) {
        e.preventDefault();
        const island = pkgBtn.closest('.dynamic-island');
        island.querySelectorAll('.di-pkg').forEach(p => {
            p.classList.remove('bg-white', 'text-gray-900', 'font-bold');
            p.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
        });
        pkgBtn.classList.remove('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
        pkgBtn.classList.add('bg-white', 'text-gray-900', 'font-bold');
    }
});

function openDynamicIsland(container, pid, size) {
    const product = window.homeProducts[pid];
    const dotsRow = container.querySelector('.dots-row');
    const island = container.querySelector('.dynamic-island');
    const pkgContainer = island.querySelector('.di-packages');
    const sizeLabel = island.querySelector('.di-size-label');
    
    dotsRow.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
    
    const numSize = extractNumberSize(size);
    sizeLabel.textContent = `Ø ${numSize}`;
    
    const availableVariants = product.variants.filter(v => v.size === size);
    
    pkgContainer.innerHTML = availableVariants.map((v, idx) => `
        <button class="di-pkg shrink-0 text-[10.5px] px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${idx === 0 ? 'bg-white text-gray-900 font-bold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}" data-pkg="${v.package}">
            ${v.package.split('(')[0].trim()} <span class="opacity-80 font-normal">฿${formatPrice(v.price)}</span>
        </button>
    `).join('');

    island.classList.remove('w-[36px]', 'opacity-0', 'pointer-events-none');
    island.classList.add('w-[96%]', 'opacity-100', 'pointer-events-auto');
}

function closeDynamicIsland(container) {
    const dotsRow = container.querySelector('.dots-row');
    const island = container.querySelector('.dynamic-island');
    
    island.classList.remove('w-[96%]', 'opacity-100', 'pointer-events-auto');
    island.classList.add('w-[36px]', 'opacity-0', 'pointer-events-none');
    
    setTimeout(() => {
        dotsRow.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
    }, 150);
}
