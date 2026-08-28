import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace the brand slider section
brand_html_start = content.find('<!-- Section 1: Brand Slider')
brand_html_end = content.find('</section>', brand_html_start) + 10

new_brand_html = """<!-- Section 1: Brand Slider (3 Items per view, with Dots) -->
      <section id="brandSliderSection" class="mb-10 md:mb-14 relative w-full group/brand pb-8">
        
        <!-- Slider Track -->
        <div class="brand-track flex items-center gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory rounded-xl">
          
          <!-- Banner 1 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all">
            <!-- Using brand logo for now, but user can replace with actual banner images -->
            <img src="/images/brands/logo-esab.webp" alt="Brand Banner 1" class="w-full h-full object-cover" />
          </a>
          
          <!-- Banner 2 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all">
            <img src="/images/brands/hobart-logo.svg" alt="Brand Banner 2" class="w-full h-full object-cover" />
          </a>
          
          <!-- Banner 3 -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all">
            <img src="/images/brands/fronius-logo.webp" alt="Brand Banner 3" class="w-full h-full object-cover" />
          </a>
          
          <!-- Banner 4 (To allow scrolling) -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all">
            <img src="/images/brands/hypertherm.webp" alt="Brand Banner 4" class="w-full h-full object-cover" />
          </a>
          
          <!-- Banner 5 (To allow scrolling) -->
          <a href="#" class="snap-start shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.66px)] aspect-[21/9] flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all">
            <img src="/images/brands/kemppi-logo.svg" alt="Brand Banner 5" class="w-full h-full object-cover" />
          </a>
          
        </div>

        <!-- Indicators (Dots) Bottom Right - Positioned exactly like product cards -->
        <div class="absolute bottom-1 right-0 flex items-center gap-1.5 brand-dots z-10">
          <!-- Handled by JS -->
        </div>

      </section>"""

content = content[:brand_html_start] + new_brand_html + content[brand_html_end:]
with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Brand HTML updated.")
