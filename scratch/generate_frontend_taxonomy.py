import json

with open('scratch/category_taxonomy.json', 'r', encoding='utf-8') as f:
    tax = json.load(f)

# Display title mapping for subgroups under welding (cat 12)
title_overrides = {
    "263": "ลวดเชื่อมสแตนเลส",
    "265": "ลวดเชื่อมเหล็กหล่อ",
    "267": "ลวดเชื่อมตัดเซาะร่อง",
    "269": "ลวดเชื่อมเหล็ก",
    "271": "ลวดเชื่อมวัสดุเกรดพิเศษ",
    "273": "ลวดเชื่อมพอกผิวแข็ง",
    "278": "ลวดเชื่อมอลูมิเนียม",
    "293": "ลวดเชื่อมทองเหลือง ทองแดง เงิน",
    "296": "ลวดเชื่อมทังสเตน",
    "12": "ลวดเชื่อม"
}

# Aliases mapping (names or slugs that map to category IDs)
aliases = {
    "welding": 12,
    "welding-wire": 12,
    "wire": 12,
    "กลุ่มลวดเชื่อม": 12,
    "ลวดเชื่อม": 12,
    "cutting-grinding-discs": 298,
    "cutting-discs": 299,
    "grinding-discs": 303,
    "ใบตัดใบเจียร": 298,
    "ใบตัด": 299,
    "ใบเจียร": 303,
    "อุปกรณ์เชื่อมตัดเผาแก๊ส": 312,
    "อุปกรณ์แก๊สและงานตัด": 312,
    "ท่อบรรจุก๊าซ และวาล์ว": 327,
    "ท่อบรรจุก๊าซและวาล์ว": 327,
    "เครื่องเชื่อมและเครื่องตัดพลาสม่า": 339,
    "เครื่องเชื่อมและอุปกรณ์": 339,
    "อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม": 344,
    "อะไหล่สิ้นเปลือง": 344,
    "วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม": 382,
    "เครื่องมือช่าง": 398,
    # Welding subgroups
    "เชื่อมเหล็ก": 269,
    "ลวดเชื่อมเหล็ก": 269,
    "เชื่อมสแตนเลส": 263,
    "ลวดเชื่อมสแตนเลส": 263,
    "เชื่อมอลูมิเนียม": 278,
    "ลวดเชื่อมอลูมิเนียม": 278,
    "เชื่อมเหล็กหล่อ": 265,
    "ลวดเชื่อมเหล็กหล่อ": 265,
    "เชื่อมทองเหลืองทองแดงและเงิน": 293,
    "เชื่อมทองเหลือง-ทองแดงและเงิน": 293,
    "ลวดเชื่อมทองเหลือง ทองแดง เงิน": 293,
    "เชื่อมพอกผิวแข็ง": 273,
    "ลวดเชื่อมพอกผิวแข็ง": 273,
    "เชื่อมตัดเซาะร่อง": 267,
    "ลวดเชื่อมตัดเซาะร่อง": 267,
    "เชื่อมวัสดุเกรดพิเศษ": 271,
    "ลวดเชื่อมวัสดุเกรดพิเศษ": 271,
    "เชื่อมทังสเตน": 296,
    "ลวดเชื่อมทังสเตน": 296
}

# Attach display_title to each item in tax
for cid_str, item in tax.items():
    item['title'] = title_overrides.get(cid_str, item['name'])

js_content = f'''// Category Taxonomy & Dynamic Breadcrumb Engine
// Generated from udothai_shop.sql single source of truth
// Zero emojis rule strictly enforced

export const CATEGORY_TAXONOMY = {json.dumps(tax, ensure_ascii=False, indent=2)};

export const CATEGORY_ALIASES = {json.dumps(aliases, ensure_ascii=False, indent=2)};

/**
 * Resolves any category identifier (id, slug, name, alias) into a canonical category object.
 * @param {{string|number}} identifier - Category ID, slug (e.g. 'cat-263'), or name (e.g. 'เชื่อมสแตนเลส')
 * @returns {{object|null}} Canonical category object with path and display title
 */
export function resolveCategory(identifier) {{
  if (!identifier) return CATEGORY_TAXONOMY['12']; // Default to root welding wire

  const raw = String(identifier).trim();
  
  // 1. Direct ID match
  if (CATEGORY_TAXONOMY[raw]) {{
    return CATEGORY_TAXONOMY[raw];
  }}

  // 2. cat-ID format
  const catIdMatch = raw.match(/^cat-(\\d+)$/);
  if (catIdMatch && CATEGORY_TAXONOMY[catIdMatch[1]]) {{
    return CATEGORY_TAXONOMY[catIdMatch[1]];
  }}

  // 3. Alias dictionary match
  if (CATEGORY_ALIASES[raw] && CATEGORY_TAXONOMY[String(CATEGORY_ALIASES[raw])]) {{
    return CATEGORY_TAXONOMY[String(CATEGORY_ALIASES[raw])];
  }}

  // 4. Case-insensitive alias match
  const lower = raw.toLowerCase();
  for (const [k, cid] of Object.entries(CATEGORY_ALIASES)) {{
    if (k.toLowerCase() === lower && CATEGORY_TAXONOMY[String(cid)]) {{
      return CATEGORY_TAXONOMY[String(cid)];
    }}
  }}

  // 5. Search by name in taxonomy
  for (const [cid, item] of Object.entries(CATEGORY_TAXONOMY)) {{
    if (item.name === raw || item.name.toLowerCase() === lower) {{
      return item;
    }}
  }}

  // 6. Partial match for common category names
  for (const [cid, item] of Object.entries(CATEGORY_TAXONOMY)) {{
    if (raw.includes(item.name) || item.name.includes(raw)) {{
      return item;
    }}
  }}

  return null;
}}

/**
 * Renders standard, accessible Breadcrumb HTML.
 * @param {{Array<{{name: string, url: string}}>}} crumbs - Ordered list of crumb items
 * @param {{string}} leafText - Leaf node plain text (current page)
 * @returns {{string}} Formatted HTML string
 */
export function renderBreadcrumbsHTML(crumbs = [], leafText = '') {{
  let html = `<nav aria-label="Breadcrumb" class="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-[14px] font-normal text-gray-700">`;
  html += `<a href="/" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2 shrink-0">หน้าหลัก</a>`;

  crumbs.forEach((crumb) => {{
    html += `<span class="text-gray-400 shrink-0" aria-hidden="true">&gt;</span>`;
    html += `<a href="${{crumb.url}}" class="hover:text-[#8ac353] hover:underline hover:underline-offset-2 shrink-0">${{crumb.name}}</a>`;
  }});

  if (leafText) {{
    html += `<span class="text-gray-400 shrink-0" aria-hidden="true">&gt;</span>`;
    html += `<span class="text-[#252525] truncate max-w-[280px] md:max-w-[420px] shrink-0" aria-current="page">${{leafText}}</span>`;
  }}

  html += `</nav>`;
  return html;
}}

/**
 * Builds breadcrumbs for a category page.
 * @param {{object}} catObj - Category object from resolveCategory
 * @returns {{string}} Breadcrumbs HTML
 */
export function renderCategoryBreadcrumbs(catObj) {{
  if (!catObj || !catObj.path || catObj.path.length === 0) {{
    return renderBreadcrumbsHTML([], 'ลวดเชื่อม');
  }}

  // If path has only 1 element (Root Category), it is the leaf
  if (catObj.path.length === 1) {{
    const rootName = catObj.title || catObj.name;
    return renderBreadcrumbsHTML([], rootName);
  }}

  // Multi-level: all except last are links, last is leaf
  const crumbs = [];
  for (let i = 0; i < catObj.path.length - 1; i++) {{
    const step = catObj.path[i];
    crumbs.push({{
      name: step.name,
      url: `/category.html?cat=cat-${{step.id}}`
    }});
  }}

  const lastStep = catObj.path[catObj.path.length - 1];
  const leafTitle = catObj.title || lastStep.name;

  return renderBreadcrumbsHTML(crumbs, leafTitle);
}}

/**
 * Builds breadcrumbs for a product detail page.
 * @param {{object}} product - Product object
 * @returns {{string}} Breadcrumbs HTML
 */
export function renderProductBreadcrumbs(product) {{
  if (!product) return renderBreadcrumbsHTML([], '');

  const crumbs = [];
  if (product.categories && Array.isArray(product.categories) && product.categories.length > 0) {{
    // Sort by level ascending
    const sortedCats = [...product.categories].sort((a, b) => (a.level || 0) - (b.level || 0));
    sortedCats.forEach((c) => {{
      const slugVal = c.url_slug || `cat-${{c.id}}`;
      crumbs.push({{
        name: c.name,
        url: `/category.html?cat=${{encodeURIComponent(slugVal)}}`
      }});
    }});
  }} else {{
    // Fallback to root welding
    crumbs.push({{
      name: 'กลุ่มลวดเชื่อม',
      url: '/category.html?cat=cat-12'
    }});
  }}

  return renderBreadcrumbsHTML(crumbs, product.name);
}}
'''

with open('frontend/src/category_taxonomy.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Generated frontend/src/category_taxonomy.js ({len(js_content)} bytes)")
