import json
import urllib.parse
import re

with open('scratch/all_bands.json', 'r', encoding='utf-8') as f:
    bands = json.load(f)

# Filter out 'No Brand'
real_bands = [b for b in bands if b['name'] != 'No Brand' and b.get('thumb_image')]

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

brand_counts = {}
for p in products:
    b_name = (p.get('brand') or '').strip().upper()
    brand_counts[b_name] = brand_counts.get(b_name, 0) + 1

for b in real_bands:
    b['prod_count'] = brand_counts.get(b['name'].upper(), 0)

# Sort: explicit sort (< 999) first in sort order, then 999 sorted by product count descending, then name
real_bands.sort(key=lambda x: (0 if x['sort'] < 999 else 1, x['sort'], -x['prod_count'], x['name']))

brand_items_html = []
for b in real_bands:
    name = b['name']
    thumb = b['thumb_image']
    img_url = f"https://www.udo.co.th/storage/{thumb}"
    encoded_name = urllib.parse.quote(name)
    link = f"/category.html?type=brand&name={encoded_name}"
    
    extra_attr = ""
    if name == "ESAB":
        extra_attr = ' onerror="this.src=\'/images/brands/logo-esab.webp\'"'

    item = f'''          <!-- Brand: {name} -->
          <a href="{link}" class="group flex flex-col items-center justify-start shrink-0 w-[95px] sm:w-[110px] md:w-[125px] text-center cursor-pointer">
            <div class="h-12 md:h-16 w-full flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
              <img src="{img_url}" alt="{name}" class="max-h-full max-w-[85px] md:max-w-[110px] object-contain mix-blend-multiply" loading="lazy"{extra_attr} />
            </div>
            <span class="text-[14px] md:text-[15px] font-semibold text-gray-900 group-hover:text-brand-red transition-colors whitespace-nowrap">
              {name}
            </span>
          </a>'''
    brand_items_html.append(item)

brand_strip_inner = "\n".join(brand_items_html)

new_section_html = f'''      <!-- Section 1: Brand Strip (Real Database Brands - 38 Brands) -->
      <section class="mt-1 md:mt-2 lg:mt-2 relative">
        <h2 class="text-[30px] font-semibold text-gray-900 tracking-[0.008em] mb-4 md:mb-6">
          <span class="inline-block transform scale-y-[1.05] origin-bottom-left">ช้อปแบรนด์ดัง</span>
        </h2>
        
        <div class="relative w-full">
          <!-- Brand Icons Strip Container -->
          <div id="brandStrip" class="flex items-start justify-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth py-3 md:py-4 px-1">
{brand_strip_inner}
          </div>

          <!-- Prev Button (Desktop / Tablet Scroll Control) -->
          <button id="brandStripPrev" aria-label="เลื่อนแบรนด์ก่อนหน้า" class="hidden md:flex absolute -left-3 lg:-left-4 top-[44%] -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-white shadow-[0_3px_14px_rgba(0,0,0,0.12)] border border-gray-200/90 rounded-full items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 hover:shadow-lg active:scale-95 transition-all z-10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-5.5 md:h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Next Button (Desktop / Tablet Scroll Control) -->
          <button id="brandStripNext" aria-label="เลื่อนแบรนด์ถัดไป" class="hidden md:flex absolute -right-3 lg:-right-4 top-[44%] -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-white shadow-[0_3px_14px_rgba(0,0,0,0.12)] border border-gray-200/90 rounded-full items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 hover:shadow-lg active:scale-95 transition-all z-10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-5.5 md:h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>'''

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the current brand section
start_pattern = r'<!-- Section 1: Brand Strip.*?-->\s*<section class="mt-1 md:mt-2 lg:mt-2">.*?</section>'
match = re.search(start_pattern, content, re.DOTALL)
if match:
    updated_content = content[:match.start()] + new_section_html + content[match.end():]
    with open('frontend/index.html', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("Successfully replaced Brand Strip in frontend/index.html with all 38 real brands!")
else:
    print("Could not find matching brand section regex in frontend/index.html")
