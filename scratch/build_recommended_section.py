import json

items = [
    {
        'id': 'udo-989',
        'brand': 'KOBE',
        'name': 'ลวดเชื่อมไฟฟ้า KOBE RB-26 (E6013) ขนาด 2.6 มม.',
        'sale_price': 1650,
        'orig_price': 1850,
        'save': 200,
        'discount': '-11%',
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/June2018/pFqWPYdajehy7eb3bmFL.jpg'
    },
    {
        'id': 'udo-3014',
        'brand': 'EMTOP',
        'name': 'สว่านกระแทกไร้สาย 20V แรงบิด 60Nm รุ่น ECIDL20602',
        'sale_price': 2950,
        'orig_price': 3450,
        'save': 500,
        'discount': '-15%',
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/February2024/mULmdNcWv5H7f4P3iuKj.png'
    },
    {
        'id': 'udo-2535',
        'brand': 'OPTECH',
        'name': 'หน้ากากเชื่อมออโต้ ปรับแสงอัตโนมัติ OPTECH S777A',
        'sale_price': 2200,
        'orig_price': None,
        'save': None,
        'discount': None,
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/March2019/AupnUamboDRuQ6e1aWSm.jpg'
    },
    {
        'id': 'udo-973',
        'brand': 'YAWATA',
        'name': 'ลวดเชื่อมไฟฟ้า YAWATA FT-51 (E6013) ลวดเชื่อมหุ้มฟลักซ์',
        'sale_price': 2610,
        'orig_price': None,
        'save': None,
        'discount': None,
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/May2026/74r7UAZ4BhVyWRf1OHpS.jpg'
    },
    {
        'id': 'udo-1122',
        'brand': 'CHAMP',
        'name': 'ชุดตัดแก๊ส CHAMP 62-3 (AC) ตัดโลหะหนัก ทนทาน',
        'sale_price': 2190,
        'orig_price': 2590,
        'save': 400,
        'discount': '-15%',
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/September2018/S2hZRTJJEaRsJCSxrYb7.jpg'
    },
    {
        'id': 'udo-3016',
        'brand': 'EMTOP',
        'name': 'เครื่องเจียรขนาด 4 นิ้ว (750W) EMTOP รุ่น EAGR07542',
        'sale_price': 1000,
        'orig_price': None,
        'save': None,
        'discount': None,
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/February2024/h8Kvn3hvPzFsv9wsRkGG.png'
    },
    {
        'id': 'udo-897',
        'brand': 'GEMINI',
        'name': 'ลวดเชื่อมสแตนเลสไฟฟ้า GEMINI 308L (E308L-16)',
        'sale_price': 370,
        'orig_price': 450,
        'save': 80,
        'discount': '-18%',
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg'
    },
    {
        'id': 'udo-2592',
        'brand': 'WHALESPRAY',
        'name': 'น้ำยาป้องกันสะเก็ดเชื่อม WhaleSpray WS 1800G',
        'sale_price': 1750,
        'orig_price': None,
        'save': None,
        'discount': None,
        'is_new': True,
        'img': 'https://www.udo.co.th/storage/products/June2019/IAiUNFxNW8H7L6y0s45V.jpg'
    }
]

card_htmls = []
for it in items:
    discount_badge = f'<span class="bg-black text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[2px]">{it["discount"]}</span>' if it['discount'] else '<span></span>'
    
    if it['orig_price']:
        price_html = f'''<div class="flex flex-col">
            <div class="text-[17px] md:text-[18px] font-bold text-brand-red leading-tight">฿{it['sale_price']:,}</div>
            <div class="text-[12px] text-gray-400 mt-1 font-normal leading-none"><span class="line-through">฿{it['orig_price']:,}</span> <span class="text-gray-500 font-medium">save ฿{it['save']:,}</span></div>
          </div>'''
    else:
        price_html = f'<div class="text-[17px] md:text-[18px] font-bold text-gray-900 leading-tight">฿{it["sale_price"]:,}</div>'

    card = f'''            <!-- Recommended Item: {it['brand']} {it['id']} -->
            <a href="/product.html?id={it['id']}" class="group flex flex-col justify-between shrink-0 w-[210px] sm:w-[230px] md:w-[250px] bg-white rounded-[2px] p-4 cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 snap-start">
              <div>
                <!-- Badges Row -->
                <div class="flex items-center justify-between min-h-[22px] mb-2.5">
                  <span class="bg-gray-100 text-gray-800 text-[11px] font-medium px-2 py-0.5 rounded-[2px]">ใหม่</span>
                  {discount_badge}
                </div>

                <!-- Product Image -->
                <div class="aspect-square w-full flex items-center justify-center p-2 mb-3.5 overflow-hidden">
                  <img src="{it['img']}" alt="{it['name']}" class="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>

                <!-- Brand -->
                <div class="text-[13px] md:text-[14px] font-extrabold uppercase text-gray-900 tracking-wider mb-1.5 leading-tight">{it['brand']}</div>

                <!-- Product Name -->
                <h3 class="text-[13px] md:text-[13.5px] font-normal text-gray-800 line-clamp-2 leading-snug min-h-[38px] mb-2.5 group-hover:text-brand-red transition-colors" title="{it['name']}">{it['name']}</h3>
              </div>

              <!-- Price Section -->
              <div class="pt-2 border-t border-gray-100">
                {price_html}
              </div>
            </a>'''
    card_htmls.append(card)

cards_inner = "\n\n".join(card_htmls)

section_html = f'''    <!-- โซน: สินค้าแนะนำ (พื้นหลังสีเทาอ่อน #F7F6F4 ตามแบบ) -->
    <section class="w-full bg-[#F7F6F4] py-12 md:py-16 lg:py-20">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        <!-- Header -->
        <div class="flex items-baseline justify-between mb-6 md:mb-8">
          <h2 class="text-[30px] font-semibold text-gray-900 tracking-[0.008em]">
            <span class="inline-block transform scale-y-[1.05] origin-bottom-left">สินค้าแนะนำ</span>
          </h2>
          <a href="/category.html?type=collection&name=recommended" class="text-[16px] md:text-[18px] font-normal text-gray-900 hover:text-gray-600 underline underline-offset-4 transition-colors">
            ดูทั้งหมด
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/recslider">
          <div id="recommended-products-track" class="flex items-stretch gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth pt-1 pb-3 snap-x snap-mandatory">
{cards_inner}
          </div>

          <!-- Navigation Buttons (Desktop) -->
          <button id="recSliderPrev" aria-label="เลื่อนสินค้าก่อนหน้า" class="hidden md:flex absolute -left-3 lg:-left-4 top-[45%] -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-white shadow-[0_3px_14px_rgba(0,0,0,0.12)] border border-gray-200/90 rounded-full items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 hover:shadow-lg active:scale-95 transition-all z-10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-5.5 md:h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button id="recSliderNext" aria-label="เลื่อนสินค้าถัดไป" class="hidden md:flex absolute -right-3 lg:-right-4 top-[45%] -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-white shadow-[0_3px_14px_rgba(0,0,0,0.12)] border border-gray-200/90 rounded-full items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 hover:shadow-lg active:scale-95 transition-all z-10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-5.5 md:h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>'''

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate insertion point right after commercial banner section and closing </div> </div>
target_marker = '<!-- Section: Articles / Portfolio (Apple Store Bleed Style) -->'
if target_marker in content:
    # We want to put it right before target_marker, or inside </main>
    # Let's inspect where </main> is
    main_end = content.find('</main>')
    if main_end != -1:
        new_content = content[:main_end] + section_html + '\n  ' + content[main_end:]
        with open('frontend/index.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully injected สินค้าแนะนำ section into frontend/index.html!")
    else:
        print("Could not find </main>")
else:
    print("Could not find target_marker")
