// frontend/src/article.js

/**
 * UDO Storefront Article Reader Script
 * Hydrates technical knowledge articles using the Modular Story Blocks design system.
 * Strictly adheres to GEMINI.md: Zero frameworks, zero emojis in code or output.
 */

import { generateCardHTML } from './components/ProductCard.js';

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
          const match = all.find(a => a.slug === slug);
          if (match) return match;
        }
        if (id) {
          const match = all.find(a => a.id === id);
          if (match) return match;
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

  // Modular Story Blocks (Showcase Architecture 100%)
  const storyContainer = document.getElementById('article-story-blocks');
  if (storyContainer) {
    const blocks = Array.isArray(article.content_blocks) ? article.content_blocks : [];
    const validBlocks = blocks.filter(b => b && (b.headline || b.subheadline || b.paragraph || b.image));

    if (validBlocks.length === 0) {
      storyContainer.innerHTML = `
        <div class="py-12 text-center text-gray-400">
          <p class="text-sm">กำลังเตรียมเนื้อหาฉบับสมบูรณ์</p>
        </div>
      `;
    } else {
      storyContainer.innerHTML = validBlocks.map((b, i) => {
        const hasText = Boolean(b.headline || b.subheadline || b.paragraph);
        const hasImg = Boolean(b.image);

        return `
          <section class="story-block">
            ${hasText ? `
              <div class="w-full max-w-[1040px] mx-auto px-2 sm:px-0 mb-6 sm:mb-8">
                ${b.headline ? `
                  <h2 class="text-[22px] sm:text-[26px] font-semibold text-[#160808] mb-4 sm:mb-6 leading-snug">
                    ${escapeHtml(b.headline)}
                  </h2>
                ` : ''}
                ${b.subheadline ? `
                  <h3 class="text-[18px] sm:text-[20px] font-semibold text-[#160808] mb-2 sm:mb-2.5 leading-snug">
                    ${escapeHtml(b.subheadline)}
                  </h3>
                ` : ''}
                ${b.paragraph ? `
                  <p class="text-[15.5px] sm:text-[16.5px] text-[#252525] leading-relaxed whitespace-pre-line w-full">
                    ${escapeHtml(b.paragraph)}
                  </p>
                ` : ''}
              </div>
            ` : ''}

            ${hasImg ? `
              <div class="w-full max-w-[1040px] mx-auto px-2 sm:px-0 flex justify-center mb-8">
                <img 
                  src="${escapeHtml(b.image)}" 
                  alt="ภาพประกอบเนื้อหา ${i + 1}" 
                  class="max-w-full h-auto object-contain rounded-xl mx-auto border border-gray-200/80 shadow-2xs"
                  loading="lazy"
                />
              </div>
            ` : ''}
          </section>
        `;
      }).join('');
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
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
