// frontend/src/articles.js

/**
 * UDO Articles Hub & Category Archive
 * Inspired by Central Inspirer Magazine Editorial Hub
 * Strictly adheres to GEMINI.md: Zero frameworks, zero emojis in code or output.
 */

import './style.css';
import './dock.js';

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
  if (!dateString) return 'บทความวิศวกรรม';
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

async function fetchAllArticles() {
  try {
    const res = await fetch('/api/articles.php');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        return data.articles;
      }
    }
  } catch (e) {
    // API network error
  }
  return [];
}

function renderArticleCard(a) {
  const tags = Array.isArray(a.tags) ? a.tags.slice(0, 3) : [];
  const tagsHtml = tags.map(t => `
    <a href="/category.html?q=${encodeURIComponent(t)}" class="px-2.5 py-1 bg-[#F5F5F7] hover:bg-gray-200 border border-gray-200/80 rounded-lg text-xs text-gray-700 font-medium transition-colors select-none">
      #${escapeHtml(t)}
    </a>
  `).join('');

  return `
    <article class="group block text-left flex flex-col justify-between">
      <div>
        <a href="/article.html?slug=${encodeURIComponent(a.slug || a.id)}" class="block w-full aspect-[16/10] bg-gray-100 rounded-[8px] overflow-hidden mb-3.5 border border-gray-200/80 shadow-2xs relative">
          <img 
            src="${escapeHtml(a.cover_image || '/images/banners/backup/BANNER 1.png')}" 
            alt="${escapeHtml(a.title)}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
            loading="lazy" 
          />
        </a>

        <div class="text-[11.5px] uppercase tracking-wider text-gray-400 font-medium mb-1.5">
          ${escapeHtml(a.author || 'UDO TECHNICAL TEAM')} • ${formatDateThai(a.created_at)}
        </div>

        <h3 class="text-[20px] sm:text-[22px] font-bold text-[#160808] leading-snug line-clamp-2 mb-2 group-hover:text-[#c5161b] transition-colors" title="${escapeHtml(a.title)}">
          <a href="/article.html?slug=${encodeURIComponent(a.slug || a.id)}">
            ${escapeHtml(a.title)}
          </a>
        </h3>

        <p class="text-[14.5px] sm:text-[15px] text-[#2c2c2e] leading-relaxed font-normal line-clamp-3 mb-3.5">
          ${escapeHtml(a.excerpt || '')}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2 pt-1">
        ${tagsHtml}
      </div>
    </article>
  `;
}

function renderSection(title, articles, viewAllCategory = null) {
  if (!articles || articles.length === 0) return '';
  const cardsHtml = articles.map(renderArticleCard).join('');
  const viewAllLink = viewAllCategory 
    ? `<a href="/articles.html?category=${encodeURIComponent(viewAllCategory)}" class="text-xs sm:text-[13px] font-semibold text-[#c5161b] hover:underline shrink-0">ดูทั้งหมด &rarr;</a>`
    : '';

  return `
    <section class="mb-14 sm:mb-16">
      <div class="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div class="flex items-center gap-4 flex-1">
          <h2 class="text-[20px] sm:text-[24px] md:text-[26px] font-bold uppercase tracking-wider text-[#160808] shrink-0">
            ${escapeHtml(title)}
          </h2>
          <div class="h-[2px] bg-[#160808] flex-1"></div>
        </div>
        ${viewAllLink}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${cardsHtml}
      </div>
    </section>
  `;
}

function filterArticlesByCategory(allArticles, catName) {
  if (!catName || catName === 'all') return allArticles;
  const lower = catName.toLowerCase();

  return allArticles.filter(a => {
    const aCat = (a.category || '').toLowerCase();
    const aTitle = (a.title || '').toLowerCase();
    const aTags = Array.isArray(a.tags) ? a.tags.map(t => String(t).toLowerCase()) : [];

    if (catName === 'TRENDING') {
      return a.sort_priority <= 10 || a.featured;
    }
    if (catName === 'เทคนิคการเชื่อม') {
      return aCat.includes('เทคนิค') || aTitle.includes('เชื่อม') || aTags.some(t => t.includes('เชื่อม'));
    }
    if (catName === 'เลือกใช้ลวดเชื่อม') {
      return aTitle.includes('ลวดเชื่อม') || aTitle.includes('เลือก') || aTags.some(t => t.includes('ลวดเชื่อม'));
    }
    if (catName === 'คู่มือ & ทริคช่าง') {
      return aTitle.includes('รู้') || aTitle.includes('วิธี') || aTitle.includes('ทริค') || aTitle.includes('ndt');
    }
    if (catName === 'ความปลอดภัย & มาตรฐาน') {
      return aTitle.includes('ปลอดภัย') || aTitle.includes('มาตรฐาน') || aTags.some(t => t.includes('qa') || t.includes('qc'));
    }
    if (catName === 'ดูแลรักษาเครื่องมือ') {
      return aTitle.includes('ใบตัด') || aTitle.includes('เครื่องมือ') || aTags.some(t => t.includes('ใบเจียร'));
    }
    if (catName === 'สาระวิศวกรรม') {
      return aCat.includes('สาระ') || aCat.includes('ข่าว') || aTitle.includes('แต่งตั้ง') || aTitle.includes('บริษัท');
    }

    return aCat === lower || aTitle.includes(lower);
  });
}

function initStickyNavObserver() {
  const sentinel = document.getElementById('nav-sticky-sentinel');
  const navEl = document.getElementById('article-sticky-nav');

  if (!navEl) return;

  function updateSticky() {
    const navRect = navEl.getBoundingClientRect();
    const isSticky = navRect.top <= 1 || window.scrollY > 25;
    navEl.classList.toggle('is-sticky', isSticky);
  }

  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky, { passive: true });
  updateSticky();

  if (sentinel && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      const isSticky = !entry.isIntersecting || window.scrollY > 25;
      navEl.classList.toggle('is-sticky', isSticky);
    }, { threshold: [0, 1] });
    observer.observe(sentinel);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  initStickyNavObserver();

  const params = new URLSearchParams(window.location.search);
  const selectedCat = params.get('category');

  // 1. Highlight active category in nav
  if (selectedCat) {
    document.querySelectorAll('.nav-cat-link').forEach(link => {
      if (link.getAttribute('data-nav-cat') === selectedCat) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });

    const breadcrumbCat = document.getElementById('breadcrumb-category');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = selectedCat;
      breadcrumbCat.classList.remove('hidden');
    }
    const breadcrumbSep = document.getElementById('breadcrumb-separator');
    if (breadcrumbSep) {
      breadcrumbSep.classList.remove('hidden');
    }
  }

  // 2. Fetch all articles
  const allArticles = await fetchAllArticles();
  const container = document.getElementById('articles-main-content');
  if (!container) return;

  if (!allArticles || allArticles.length === 0) {
    container.innerHTML = `
      <div class="py-20 text-center text-gray-400">
        <p class="text-base">กำลังโหลดบทความหรือยังไม่มีบทความในขณะนี้</p>
      </div>
    `;
    return;
  }

  if (selectedCat) {
    // Single Category View
    const filtered = filterArticlesByCategory(allArticles, selectedCat);
    document.title = `${selectedCat} - UDO Insight บทความงานช่าง`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="mb-14">
          <div class="flex items-center gap-4 mb-8">
            <h1 class="text-[24px] sm:text-[28px] font-bold uppercase tracking-wider text-[#160808] shrink-0">
              ${escapeHtml(selectedCat)}
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
      `;
    } else {
      container.innerHTML = renderSection(selectedCat, filtered);
    }
  } else {
    // Magazine Sections View (Mirroring Central Inspirer Hub)
    document.title = 'UDO Insight - นิตยสารและสาระวิชาการงานช่าง';
    
    // Group articles into editorial sections
    const trending = allArticles.slice(0, 3);
    const weldingTechniques = filterArticlesByCategory(allArticles, 'เทคนิคการเชื่อม').slice(0, 3);
    const electrodeSelection = filterArticlesByCategory(allArticles, 'เลือกใช้ลวดเชื่อม').slice(0, 3);
    const howtoGuides = filterArticlesByCategory(allArticles, 'คู่มือ & ทริคช่าง').slice(0, 3);
    const safetyStandards = filterArticlesByCategory(allArticles, 'ความปลอดภัย & มาตรฐาน').slice(0, 3);

    let html = '';
    html += renderSection('TRENDING', trending, 'TRENDING');
    html += renderSection('เทคนิคการเชื่อม', weldingTechniques, 'เทคนิคการเชื่อม');
    html += renderSection('เลือกใช้ลวดเชื่อม', electrodeSelection, 'เลือกใช้ลวดเชื่อม');
    html += renderSection('คู่มือ & ทริคช่าง', howtoGuides, 'คู่มือ & ทริคช่าง');
    html += renderSection('ความปลอดภัย & มาตรฐาน', safetyStandards, 'ความปลอดภัย & มาตรฐาน');

    container.innerHTML = html;
  }
});
