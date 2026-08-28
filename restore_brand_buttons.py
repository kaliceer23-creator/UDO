import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# 1. Update HTML
brand_html_start = content.find('<!-- Section 1: Brand Slider (3 Items per view, with Dots) -->')
brand_html_end = content.find('</section>', brand_html_start)

nav_buttons_html = """
        <!-- Navigation Buttons (Hover Reveal) -->
        <button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#E32626] hover:border-[#E32626] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#E32626] hover:border-[#E32626] shadow-sm z-10 opacity-0 group-hover/brand:opacity-100 transition-all pointer-events-none group-hover/brand:pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
"""

# Insert right after dots
dots_end = content.find('</div>\n\n      </section>', brand_html_start)
if dots_end != -1:
    content = content[:dots_end+6] + nav_buttons_html + content[dots_end+6:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Added buttons to HTML.")
