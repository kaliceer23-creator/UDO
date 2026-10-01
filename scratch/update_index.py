with open('frontend/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

s_marker = '<!-- โซน: สินค้าแนะนำ (พื้นหลังสีเทาอ่อน #F7F6F4 ตามแบบ) -->'
e_marker = '  </main>'

s_idx = content.find(s_marker)
e_idx = content.find(e_marker, s_idx)

if s_idx != -1 and e_idx != -1:
    new_section = '''<!-- โซน: สินค้าแนะนำ (พื้นหลังสีเทาอ่อน #F7F6F4 ตามแบบ) -->
    <section class="w-full bg-[#F7F6F4] py-12 md:py-16">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        <!-- Header -->
        <div class="flex items-baseline justify-between mb-3 md:mb-4">
          <h2 class="text-[30px] font-semibold text-gray-900 tracking-[0.008em]">
            <span class="inline-block transform scale-y-[1.05] origin-bottom-left">สินค้าแนะนำ</span>
          </h2>
          <a href="/category.html?type=collection&name=recommended" class="text-[16px] md:text-[18px] font-normal text-gray-900 hover:text-gray-600 underline underline-offset-4 transition-colors">
            ดูทั้งหมด
          </a>
        </div>

        <!-- Slider Wrapper -->
        <div class="relative w-full group/pslider pb-1">
          <div id="recommended-products-track" class="pslider-track flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar pt-1 md:pt-2 pb-3 snap-x snap-mandatory">
            <!-- Injected dynamically via home_hydrate.js -->
          </div>

          <!-- Navigation Buttons -->
          <button class="pslider-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center opacity-0 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="pslider-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-10 transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
'''
    new_content = content[:s_idx] + new_section + content[e_idx:]
    with open('frontend/index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated frontend/index.html!')
else:
    print(f'Markers not found: s_idx={s_idx}, e_idx={e_idx}')
