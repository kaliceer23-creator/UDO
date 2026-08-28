import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

brand_html_start = content.find('<!-- Section 1: Brand Slider (3 Items per view, with Dots) -->')
brand_html_end = content.find('</section>', brand_html_start) + 10

new_brand_html = """<!-- Section 1: Brand Slider (3 Items per view, with Dots) -->
      <section id="brandSliderSection" class="mb-10 md:mb-14 relative w-full group/brand pb-6">
        
        <!-- Slider Track -->
        <div class="brand-track flex items-center gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory rounded-xl">
          
          <!-- Brand 1 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/logo-esab.webp" alt="ESAB" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 2 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/hobart-logo.svg" alt="HOBART" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 3 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/fronius-logo.webp" alt="Fronius" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 4 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/hypertherm.webp" alt="HYPERTHERM" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 5 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/kemppi-logo.svg" alt="KEMPPI" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 6 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/lincoln-electric.svg" alt="LINCOLN ELECTRIC" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
          <!-- Brand 7 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all p-6 md:p-10">
            <img src="/images/brands/miller-logo.webp" alt="Miller" class="w-full h-full object-contain mix-blend-multiply" />
          </a>
          
        </div>

        <!-- Indicators (Dots) Bottom Right - Exactly matching product cards -->
        <div class="absolute -bottom-2 right-2 flex items-center gap-1.5 brand-dots z-10">
          <!-- Handled by JS -->
        </div>

      </section>"""

if brand_html_start != -1:
    content = content[:brand_html_start] + new_brand_html + content[brand_html_end:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Brand images updated.")
else:
    print("Could not find Brand Slider HTML.")
