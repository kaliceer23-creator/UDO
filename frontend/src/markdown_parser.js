/**
 * UDO AI Markdown Parser & Renderer (markdown_parser.js)
 * High-performance, zero-dependency Markdown parser tailored for modern AI responses.
 * 
 * Features:
 * - Sanitizes code fences (```markdown ... ```) to prevent raw code leakage
 * - Extracts dual-output metadata blocks (<!--META: ... -->) cleanly without UI residue
 * - Semantic HTML generation styled with Tailwind CSS matching UDO Design System
 * - Supports: Headings (##, ###), Bold (**), Italic (*), Bullet lists (-/*), 
 *   Numbered lists (1.), GFM Pipe Tables, Blockquotes (>), Inline spec pills (`...`), and Links
 * - Strict rule: NO emojis anywhere in source code, comments, or output.
 */

// Escape HTML special characters for security
export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Extract metadata payload embedded in the AI text response.
 * Supports:
 * 1. <!--META: { ... } -->
 * 2. ```metadata { ... } ``` or ```json:meta { ... } ```
 */
export function extractMetadata(rawText) {
  let cleanText = rawText || '';
  let metadata = null;

  // Pattern 1: HTML Comment format <!--META: ... -->
  const commentMatch = cleanText.match(/<!--\s*META:\s*([\s\S]*?)\s*-->/i);
  if (commentMatch) {
    try {
      metadata = JSON.parse(commentMatch[1]);
      cleanText = cleanText.replace(commentMatch[0], '').trim();
    } catch (e) {
      console.warn('Failed to parse HTML comment metadata:', e);
    }
  }

  // Pattern 2: Fenced metadata format
  if (!metadata) {
    const fenceMatch = cleanText.match(/```(?:metadata|json:meta)\s*([\s\S]*?)\s*```/i);
    if (fenceMatch) {
      try {
        metadata = JSON.parse(fenceMatch[1]);
        cleanText = cleanText.replace(fenceMatch[0], '').trim();
      } catch (e) {
        console.warn('Failed to parse fenced metadata:', e);
      }
    }
  }

  return { cleanText, metadata };
}

/**
 * Parse inline Markdown elements:
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_
 * - Inline specs: `text`
 * - Links: [text](url)
 * - Raw citations or brackets: [UDO], [KOBELCO]
 */
function parseInlineMarkdown(text) {
  if (!text) return '';

  let out = text;

  // 0. Images: ![alt](url)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    return `<figure class="my-6 text-center"><img src="${escapeHtml(url)}" alt="${escapeHtml(alt || 'ภาพประกอบ')}" class="w-full max-w-[800px] h-auto object-contain rounded-[8px] md:rounded-[10px] mx-auto border border-gray-200/80 shadow-xs" loading="lazy" />${alt && alt !== 'ภาพประกอบ' && alt !== 'ภาพประกอบเนื้อหา' ? `<figcaption class="text-xs text-gray-500 mt-2 text-center">${escapeHtml(alt)}</figcaption>` : ''}</figure>`;
  });

  // 1. Inline code / Specs pill: `code`
  out = out.replace(/`([^`]+)`/g, (match, code) => {
    return `<code class="inline-block px-2 py-0.5 mx-0.5 bg-[#F5F5F7] border border-gray-200/90 rounded text-[13.5px] font-medium text-[#160808] font-mono tracking-tight">${escapeHtml(code)}</code>`;
  });

  // 2. Bold: **text** or __text__
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#160808]">$1</strong>');
  out = out.replace(/__([^_]+)__/g, '<strong class="font-semibold text-[#160808]">$1</strong>');

  // 3. Italic: *text* or _text_ (excluding inside words)
  out = out.replace(/(^|[^\w])\*([^*]+)\*([^\w]|$)/g, '$1<em class="italic text-[#212121]">$2</em>$3');

  // 4. Links: [text](url)
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, (match, title, url) => {
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="text-[#160808] hover:text-[#e7151a] underline underline-offset-2 font-semibold inline-flex items-center gap-0.5"><span>${escapeHtml(title)}</span><svg class="w-3 h-3 inline shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></a>`;
  });

  // 5. Branded citations in brackets e.g. [UDO], [KOBELCO], [AWS]
  out = out.replace(/\[(UDO|KOBELCO|WELPRO|GEMINI|YAWATA|AWS[A-Za-z0-9\.\s\-]*)\]/gi, (match, brand) => {
    return `<span class="inline-flex items-center gap-1 ml-1 px-2 py-0.5 bg-gray-100 hover:bg-gray-200/80 rounded-full text-[11px] font-medium text-gray-700 align-baseline transition-colors select-none"><svg class="w-2.5 h-2.5 text-[#e7151a]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"/></svg><span>${escapeHtml(brand)}</span></span>`;
  });

  // 6. In-text citation badges e.g. [1], [2], [3]
  out = out.replace(/\[(\d+)\]/g, (match, num) => {
    return `<button type="button" class="btn-citation-ref inline-flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10.5px] font-bold text-[#c5161b] bg-red-50 hover:bg-red-100 hover:text-[#e7151a] hover:scale-105 active:scale-95 rounded-full align-super ml-0.5 select-none transition-all cursor-pointer shadow-2xs" data-cite-index="${num}" title="ดูแหล่งอ้างอิงลำดับที่ ${num}">${num}</button>`;
  });

  return out;
}

/**
 * Parse full Markdown document into styled semantic HTML
 */
export function renderMarkdownToHTML(markdownInput) {
  if (!markdownInput) return '';

  // 1. Pre-clean code fence blocks
  let content = String(markdownInput).trim();

  // Strip leading ```markdown or ```
  if (content.startsWith('```markdown')) {
    content = content.slice(11).trim();
  } else if (content.startsWith('```')) {
    content = content.slice(3).trim();
  }

  // Strip trailing ```
  if (content.endsWith('```')) {
    content = content.slice(0, -3).trim();
  }

  // 2. Extract metadata if present
  const extracted = extractMetadata(content);
  content = extracted.cleanText;

  // Clean leading canned greeting/intro (e.g. "สวัสดีครับ ผม UDO AI จากบริษัท...")
  content = content.replace(/^(สวัสดีครับ|สวัสดีค่ะ)[^\n]*?(UDO AI|ยู\.ดี\.โอ\.)[^\n]*?\n+/i, '');
  content = content.replace(/^(สวัสดีครับ|สวัสดีค่ะ)[^\n]*?\n+/i, '').trim();

  // Split into lines for block-level parsing
  const lines = content.split(/\r?\n/);
  const htmlParts = [];

  let inList = false;
  let listType = null; // 'ul' or 'ol'
  let inTable = false;
  let tableHeaderParsed = false;
  let tableRows = [];
  let inBlockquote = false;
  let blockquoteLines = [];

  const flushList = () => {
    if (inList) {
      htmlParts.push(`</${listType}>`);
      inList = false;
      listType = null;
    }
  };

  const flushBlockquote = () => {
    if (inBlockquote) {
      const parsedText = blockquoteLines.map(l => parseInlineMarkdown(l)).join('<br />');
      htmlParts.push(`
        <blockquote class="my-4 p-3.5 sm:p-4 border-l-4 border-[#90DE3C] bg-[#F9FAF8] rounded-r-xl text-[15px] leading-relaxed text-[#212121] shadow-xs">
          <div class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>${parsedText}</div>
          </div>
        </blockquote>
      `);
      inBlockquote = false;
      blockquoteLines = [];
    }
  };

  const flushTable = () => {
    if (inTable) {
      if (tableRows.length > 0) {
        let theadHTML = '';
        let tbodyHTML = '';

        tableRows.forEach((row, idx) => {
          if (idx === 0) {
            theadHTML = `<tr class="border-b border-gray-200 bg-gray-50/90 text-left">${row.map(c => `<th class="px-4 py-2.5 font-semibold text-[#160808] text-[14px] tracking-tight">${parseInlineMarkdown(c)}</th>`).join('')}</tr>`;
          } else {
            const isZebra = idx % 2 === 0 ? 'bg-gray-50/40' : 'bg-white';
            tbodyHTML += `<tr class="border-b border-gray-100 ${isZebra} hover:bg-gray-50/80 transition-colors">${row.map(c => `<td class="px-4 py-2 text-[#252525] text-[14px] leading-normal">${parseInlineMarkdown(c)}</td>`).join('')}</tr>`;
          }
        });

        htmlParts.push(`
          <div class="my-4.5 overflow-x-auto rounded-xl border border-gray-200/90 shadow-xs">
            <table class="min-w-full divide-y divide-gray-200 text-left">
              <thead>${theadHTML}</thead>
              <tbody class="divide-y divide-gray-100 bg-white">${tbodyHTML}</tbody>
            </table>
          </div>
        `);
      }
      inTable = false;
      tableHeaderParsed = false;
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Blank line
    if (!trimmed) {
      flushList();
      flushBlockquote();
      flushTable();
      continue;
    }

    // 1. Table Row Check (e.g. | col1 | col2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      flushBlockquote();

      // Check if this is the separator row e.g. |---|---|
      if (/^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(trimmed)) {
        tableHeaderParsed = true;
        continue;
      }

      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map(c => c.trim());

      inTable = true;
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    // 1.5 Standalone Image Check: ![alt](url)
    const imgBlockMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgBlockMatch) {
      flushList();
      flushBlockquote();
      flushTable();
      const alt = imgBlockMatch[1].trim();
      const url = imgBlockMatch[2].trim();
      htmlParts.push(`
        <figure class="my-6 text-center">
          <img src="${escapeHtml(url)}" alt="${escapeHtml(alt || 'ภาพประกอบ')}" class="w-full max-w-[800px] h-auto object-contain rounded-[8px] md:rounded-[10px] mx-auto border border-gray-200/80 shadow-xs" loading="lazy" />
          ${alt && alt !== 'ภาพประกอบ' && alt !== 'ภาพประกอบเนื้อหา' ? `<figcaption class="text-xs text-gray-500 mt-2 text-center">${escapeHtml(alt)}</figcaption>` : ''}
        </figure>
      `);
      continue;
    }

    // 2. Blockquote Check (e.g. > Warning note)
    if (trimmed.startsWith('>')) {
      flushList();
      inBlockquote = true;
      blockquoteLines.push(trimmed.replace(/^>\s?/, ''));
      continue;
    } else {
      flushBlockquote();
    }

    // 3. Horizontal Rule
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushList();
      htmlParts.push('<hr class="my-6 border-t border-gray-200" />');
      continue;
    }

    // 4. Headings
    if (trimmed.startsWith('#')) {
      flushList();

      if (trimmed.startsWith('#### ')) {
        const text = trimmed.slice(5).trim();
        htmlParts.push(`<h5 class="text-[15px] sm:text-[15.5px] font-semibold text-[#160808] mt-4 mb-2 tracking-tight leading-snug">${parseInlineMarkdown(text)}</h5>`);
        continue;
      }
      if (trimmed.startsWith('### ')) {
        const text = trimmed.slice(4).trim();
        htmlParts.push(`<h4 class="text-[16.5px] sm:text-[17px] font-semibold text-[#160808] mt-5 mb-2.5 tracking-tight leading-snug">${parseInlineMarkdown(text)}</h4>`);
        continue;
      }
      if (trimmed.startsWith('## ')) {
        const text = trimmed.slice(3).trim();
        htmlParts.push(`<h3 class="text-[19px] sm:text-[20px] font-bold text-[#160808] mt-7 mb-3 tracking-tight leading-snug">${parseInlineMarkdown(text)}</h3>`);
        continue;
      }
      if (trimmed.startsWith('# ')) {
        const text = trimmed.slice(2).trim();
        htmlParts.push(`<h2 class="text-[21px] sm:text-[23px] font-bold text-[#160808] mt-7 mb-3 tracking-tight leading-snug">${parseInlineMarkdown(text)}</h2>`);
        continue;
      }
    }

    // 5. Unordered List Items (- or *)
    const ulMatch = trimmed.match(/^[\*\-]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
        htmlParts.push('<ul class="space-y-2 list-disc pl-5 my-3 text-[15.5px] sm:text-[16px] leading-[1.75] text-[#2c2c2e] marker:text-[#160808]">');
      }
      htmlParts.push(`<li>${parseInlineMarkdown(ulMatch[1])}</li>`);
      continue;
    }

    // 6. Ordered List Items (1. , 2. )
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
        htmlParts.push('<ol class="space-y-2 list-decimal pl-5 my-3 text-[15.5px] sm:text-[16px] leading-[1.75] text-[#2c2c2e] marker:text-[#160808]">');
      }
      htmlParts.push(`<li>${parseInlineMarkdown(olMatch[2])}</li>`);
      continue;
    }

    // If we were in a list and this line doesn't match list syntax, flush
    flushList();

    // 7. Regular Paragraph
    htmlParts.push(`<p class="my-3 text-[15.5px] sm:text-[16px] leading-[1.8] text-[#2c2c2e] font-light">${parseInlineMarkdown(trimmed)}</p>`);
  }

  flushList();
  flushBlockquote();
  flushTable();

  return {
    html: htmlParts.join('\n'),
    metadata: extracted.metadata
  };
}
