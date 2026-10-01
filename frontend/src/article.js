// frontend/src/article.js

/**
 * UDO Storefront Article Reader Script
 * Hydrates technical knowledge articles using the Modular Story Blocks design system.
 * Strictly adheres to GEMINI.md: Zero frameworks, zero emojis in code or output.
 */

import './style.css';
import './nav_search.js';
import './dock.js';
import { generateCardHTML } from './components/ProductCard.js';
import { renderMarkdownToHTML } from './markdown_parser.js';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDateThai(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString.replace(/-/g, '/'));
    if (isNaN(d.getTime())) return dateString;
    const months = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
  } catch (e) {
    return dateString;
  }
}

async function fetchArticleData(slug, id) {
  // 1. Try PHP REST API
  try {
    let apiUrl = '/api/articles.php';
    if (slug) {
      apiUrl += `?slug=${encodeURIComponent(slug)}`;
    } else if (id) {
      apiUrl += `?id=${encodeURIComponent(id)}`;
    } else {
      apiUrl += '?limit=1';
    }

    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        if (data.article) return data.article;
        if (Array.isArray(data.articles) && data.articles.length > 0) return data.articles[0];
      }
    }
  } catch (e) {
    // Continue to fallback
  }

  // 2. Try static JSON fallback
  try {
    const res = await fetch('/api/articles.json');
    if (res.ok) {
      const all = await res.json();
      if (Array.isArray(all) && all.length > 0) {
        if (slug) {
          const match = all.find(a => a.slug === slug || (a.slug && a.slug.toLowerCase() === slug.toLowerCase()));
          return match || null;
        }
        if (id) {
          const match = all.find(a => String(a.id) === String(id));
          return match || null;
        }
        return all[0];
      }
    }
  } catch (e) {
    // Continue
  }

  return null;
}

async function fetchRelatedArticles(currentSlug) {
  try {
    const res = await fetch('/api/articles.php?limit=8');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        return data.articles.filter(a => a.slug !== currentSlug).slice(0, 3);
      }
    }
  } catch (e) {
    // Continue to fallback
  }

  try {
    const res = await fetch('/api/articles.json');
    if (res.ok) {
      const all = await res.json();
      if (Array.isArray(all)) {
        return all.filter(a => a.slug !== currentSlug).slice(0, 3);
      }
    }
  } catch (e) {
    // Continue
  }

  return [];
}

async function fetchProductsForRecommendation(productCodes) {
  try {
    const res = await fetch('/api/products.php');
    if (res.ok) {
      const data = await res.json();
      const allProducts = Array.isArray(data) ? data : (data.products || []);
      if (!allProducts || allProducts.length === 0) return [];

      if (Array.isArray(productCodes) && productCodes.length > 0) {
        const matches = allProducts.filter(p => 
          productCodes.includes(p.id) || productCodes.includes(p.sku)
        );
        if (matches.length > 0) return matches.slice(0, 4);
      }

      // Default: 4 featured products
      return allProducts.slice(0, 4);
    }
  } catch (e) {
    // Return empty on failure
  }
  return [];
}

function renderArticle(article) {
  if (!article) {
    const titleEl = document.getElementById('article-title');
    if (titleEl) titleEl.textContent = 'ไม่พบบทความที่ต้องการ';
    const excerptEl = document.getElementById('article-excerpt');
    if (excerptEl) {
      excerptEl.innerHTML = `
        <span class="block mb-4">ขออภัย ไม่พบบทความที่คุณกำลังค้นหา อาจถูกย้ายหรือเปลี่ยนชื่อ</span>
        <a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#160808] text-white text-sm font-semibold rounded-xl hover:bg-black transition-all">
          &larr; กลับหน้าหลัก
        </a>
      `;
      excerptEl.style.display = 'block';
    }
    const catEl = document.getElementById('article-category');
    if (catEl) catEl.textContent = 'UDO Technical Knowledge';
    const dateEl = document.getElementById('article-date');
    if (dateEl) dateEl.textContent = '';
    const readTimeEl = document.getElementById('article-read-time');
    if (readTimeEl) readTimeEl.textContent = '';
    return;
  }

  // Document metadata
  document.title = `${article.title} - UDO เทคนิค & สาระงานช่าง`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && (article.meta_description || article.excerpt)) {
    metaDesc.setAttribute('content', article.meta_description || article.excerpt);
  }

  // Breadcrumb
  const breadcrumbTitle = document.getElementById('breadcrumb-article-title');
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = article.title;
    breadcrumbTitle.title = article.title;
  }

  // Header Zone
  const catEl = document.getElementById('article-category');
  if (catEl) catEl.textContent = article.category || 'เทคนิค & สาระงานช่าง';

  const dateEl = document.getElementById('article-date');
  if (dateEl) dateEl.textContent = formatDateThai(article.created_at) || 'บทความวิศวกรรม';

  const readTimeEl = document.getElementById('article-read-time');
  if (readTimeEl) readTimeEl.textContent = `อ่าน ${article.read_time_minutes || 3} นาที`;

  const titleEl = document.getElementById('article-title');
  if (titleEl) titleEl.textContent = article.title;

  const excerptEl = document.getElementById('article-excerpt');
  if (excerptEl) {
    if (article.excerpt) {
      excerptEl.textContent = article.excerpt;
      excerptEl.style.display = 'block';
    } else {
      excerptEl.style.display = 'none';
    }
  }

  // Cover Image
  const coverContainer = document.getElementById('article-cover-container');
  const coverImg = document.getElementById('article-cover-img');
  if (coverContainer && coverImg) {
    if (article.cover_image) {
      coverImg.src = article.cover_image;
      coverImg.alt = article.title;
      coverContainer.classList.remove('hidden');
    } else {
      coverContainer.classList.add('hidden');
    }
  }

  // Author Box
  const authorEl = document.getElementById('article-author');
  if (authorEl && article.author) {
    authorEl.textContent = article.author;
  }

  // Tags
  const tagsContainer = document.getElementById('article-tags-container');
  if (tagsContainer) {
    const tags = Array.isArray(article.tags) ? article.tags : [];
    if (tags.length > 0) {
      tagsContainer.innerHTML = tags.map(t => `
        <span class="px-2.5 py-1 bg-[#F5F5F7] border border-gray-200/70 rounded-lg text-xs text-gray-700 font-medium">
          #${escapeHtml(t)}
        </span>
      `).join('');
    } else {
      tagsContainer.innerHTML = '';
    }
  }

  // Technical Article Markdown Content (Obsidian / Tech Doc Architecture)
  const storyContainer = document.getElementById('article-story-blocks');
  if (storyContainer) {
    let markdown = (article.markdown || article.content || '').trim();

    // Fallback: If no markdown field, construct from content_blocks if present
    if (!markdown && Array.isArray(article.content_blocks) && article.content_blocks.length > 0) {
      markdown = article.content_blocks.map(b => {
        const parts = [];
        if (b.headline) parts.push(`## ${b.headline}`);
        if (b.subheadline) parts.push(`### ${b.subheadline}`);
        if (b.image) parts.push(`![ภาพประกอบ](${b.image})`);
        if (b.paragraph) parts.push(b.paragraph);
        return parts.join('\n\n');
      }).join('\n\n');
    }

    if (!markdown) {
      storyContainer.innerHTML = `
        <div class="py-12 text-center text-gray-400">
          <p class="text-sm">กำลังเตรียมเนื้อหาฉบับสมบูรณ์</p>
        </div>
      `;
    } else {
      const { html } = renderMarkdownToHTML(markdown);
      storyContainer.innerHTML = `
        <div class="prose-udo max-w-[840px] mx-auto text-[#2c2c2e]">
          ${html}
        </div>
      `;
    }
  }
}

async function renderRecommendedProducts(article) {
  const recSection = document.getElementById('article-recommended-products-section');
  const recGrid = document.getElementById('article-recommended-products-grid');
  if (!recSection || !recGrid) return;

  const codes = article.recommended_products || [];
  const products = await fetchProductsForRecommendation(codes);

  if (products && products.length > 0) {
    recGrid.innerHTML = products.map(p => generateCardHTML(p, true)).join('');
    recSection.classList.remove('hidden');
  } else {
    recSection.classList.add('hidden');
  }
}

async function renderRelatedArticles(currentSlug) {
  const relatedGrid = document.getElementById('article-related-articles-grid');
  if (!relatedGrid) return;

  const articles = await fetchRelatedArticles(currentSlug);
  if (!articles || articles.length === 0) {
    const relatedSection = document.getElementById('article-related-articles-section');
    if (relatedSection) relatedSection.classList.add('hidden');
    return;
  }

  relatedGrid.innerHTML = articles.map(a => `
    <a href="/article.html?slug=${encodeURIComponent(a.slug)}" class="article-card flex flex-col group cursor-pointer">
      <div class="w-full aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden mb-3.5 relative border border-gray-200/70">
        ${a.cover_image ? `
          <img 
            src="${escapeHtml(a.cover_image)}" 
            alt="${escapeHtml(a.title)}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            loading="lazy"
          />
        ` : `
          <div class="w-full h-full flex items-center justify-center text-gray-300 font-bold text-lg">UDO</div>
        `}
      </div>
      <div class="text-xs text-gray-400 font-medium mb-1">
        ${formatDateThai(a.created_at) || 'บทความวิศวกรรม'} • อ่าน ${a.read_time_minutes || 3} นาที
      </div>
      <h3 class="font-semibold text-[#160808] group-hover:text-brand-red transition-colors text-[17px] sm:text-[18px] leading-[1.38] line-clamp-2 h-[50px] overflow-hidden text-ellipsis mb-1.5" title="${escapeHtml(a.title)}">
        ${escapeHtml(a.title)}
      </h3>
      <p class="text-[14px] text-[#555555] font-light line-clamp-2 leading-[1.48] h-[42px] overflow-hidden text-ellipsis">
        ${escapeHtml(a.excerpt || '')}
      </p>
    </a>
  `).join('');
}

function initMegaMenu() {
  const menuBtn = document.getElementById('category-menu-btn');
  const menuArrow = document.getElementById('category-menu-arrow');
  const megaMenu = document.getElementById('desktop-mega-menu');
  const overlay = document.getElementById('mega-menu-overlay');

  if (!menuBtn || !megaMenu) return;

  const closeMenu = () => {
    megaMenu.classList.add('hidden');
    megaMenu.classList.remove('flex');
    if (menuArrow) menuArrow.classList.remove('rotate-180');
    if (overlay) overlay.classList.add('hidden');
    if (menuBtn) menuBtn.classList.remove('bg-white/25');
  };

  const openMenu = () => {
    megaMenu.classList.remove('hidden');
    megaMenu.classList.add('flex');
    if (menuArrow) menuArrow.classList.add('rotate-180');
    if (overlay) overlay.classList.remove('hidden');
    if (menuBtn) menuBtn.classList.add('bg-white/25');
  };

  const megaSidebarItems = megaMenu.querySelectorAll('.mega-sidebar-item');
  const megaPanels = megaMenu.querySelectorAll('.mega-panel');

  const activateMegaTab = (tabId) => {
    megaSidebarItems.forEach((item) => {
      const arrow = item.querySelector('.mega-sidebar-arrow');
      if (item.dataset.megaTab === tabId) {
        item.classList.add('bg-brand-green', 'text-white');
        item.classList.remove('text-[#252525]');
        if (arrow) {
          arrow.classList.add('text-white');
          arrow.classList.remove('text-gray-400');
        }
      } else {
        item.classList.remove('bg-brand-green', 'text-white');
        item.classList.add('text-[#252525]');
        if (arrow) {
          arrow.classList.remove('text-white');
          arrow.classList.add('text-gray-400');
        }
      }
    });

    megaPanels.forEach((panel) => {
      if (panel.id === `mega-panel-${tabId}`) {
        panel.classList.remove('hidden');
        panel.classList.add('block');
      } else {
        panel.classList.add('hidden');
        panel.classList.remove('block');
      }
    });
  };

  megaSidebarItems.forEach((item) => {
    const tabId = item.dataset.megaTab;
    item.addEventListener('mouseenter', () => activateMegaTab(tabId));
    item.addEventListener('focus', () => activateMegaTab(tabId));
  });

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = megaMenu.classList.contains('hidden');
    if (isHidden) {
      openMenu();
      activateMegaTab('12');
    } else {
      closeMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !megaMenu.contains(e.target) && !megaMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  initMegaMenu();

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const id = params.get('id');

  const article = await fetchArticleData(slug, id);
  renderArticle(article);

  if (article) {
    renderRecommendedProducts(article);
    renderRelatedArticles(article.slug);
  }
});
