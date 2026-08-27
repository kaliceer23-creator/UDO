import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

line_banner_html = """
      <!-- Section: Full Width LINE Banner -->
      <section class="w-full relative mt-16 md:mt-24 h-[180px] md:h-[240px] bg-gray-600 flex items-center overflow-hidden">
        <!-- Background Image -->
        <img src="https://www.landyhome.co.th/images/layout/sec_add_line.webp" alt="Add LINE" class="absolute inset-0 w-full h-full object-cover object-right md:object-center" />
        
        <!-- Content Container -->
        <div class="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center">
          <h2 class="text-white text-[24px] md:text-[32px] lg:text-[40px] font-bold mb-4 drop-shadow-md">
            ปรึกษาปัญหาช่างแอดไลน์เลย!
          </h2>
          <a href="#" class="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-[15px] md:text-[18px] px-6 md:px-8 py-2 md:py-2.5 rounded-full w-fit hover:bg-gray-100 hover:scale-105 transition-all shadow-lg gap-2">
            <!-- LINE Icon SVG (Green) -->
            <svg viewBox="0 0 24 24" class="w-6 h-6 md:w-7 md:h-7" fill="#06C755">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.939 8.922 9.324 9.614.364.077.863.238.989.544.113.277.073.708.035 1.002-.005.039-.047.301-.06.39-.033.242-.162 1.018.895.57 1.055-.448 5.71-3.36 7.828-5.787 1.954-2.222 2.989-4.526 2.989-6.333zm-14.73 2.766h-2.553c-.347 0-.63-.284-.63-.631v-4.144c0-.348.283-.631.63-.631s.631.283.631.631v3.513h1.922c.348 0 .631.283.631.631 0 .347-.283.631-.631.631zm3.843 0h-1.262c-.348 0-.631-.283-.631-.631v-4.144c0-.348.283-.631.631-.631s.631.283.631.631v4.144c0 .347-.283.631-.631.631zm3.957-2.613c0 .248-.145.474-.374.577l-1.92 1.085v.32c0 .347-.283.631-.631.631s-.631-.283-.631-.631v-4.144c0-.247.145-.473.374-.576l1.92-1.085v-.32c0-.348.283-.631.631-.631s.631.283.631.631v4.143zm-1.89-1.29l-1.26-.712v1.93l1.26-.712z"/>
            </svg>
            @UDOWelding
          </a>
        </div>
      </section>
"""

start_marker = '<!-- Section: Articles / Portfolio (Landy Home Style) -->'

if start_marker in content:
    new_content = content.replace(start_marker, line_banner_html + '\n' + start_marker)
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(new_content)
        print("Success")
else:
    print("Marker not found")

