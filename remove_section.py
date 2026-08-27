with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_marker = '<!-- Section 3: Shop by Category -->'
end_marker = '</section>'
# We need to find the specific </section> that closes Section 3.
# Let's just use string replacement.

target = """      <!-- Section 3: Shop by Category -->
      <section class="mb-10">
        <h2 class="text-[28px] md:text-[36px] font-semibold text-gray-900 mb-5 md:mb-6 text-left tracking-wide">
          Shop by Category
        </h2>
        <!-- Grid 5 Columns -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          <div class="w-full aspect-[3/4] bg-gray-200 hover:bg-gray-300 rounded-md transition-colors animate-pulse"></div>
          <div class="w-full aspect-[3/4] bg-gray-200 hover:bg-gray-300 rounded-md transition-colors animate-pulse"></div>
          <div class="w-full aspect-[3/4] bg-gray-200 hover:bg-gray-300 rounded-md transition-colors animate-pulse"></div>
          <div class="w-full aspect-[3/4] bg-gray-200 hover:bg-gray-300 rounded-md transition-colors animate-pulse hidden md:block"></div>
          <div class="w-full aspect-[3/4] bg-gray-200 hover:bg-gray-300 rounded-md transition-colors animate-pulse hidden lg:block"></div>
        </div>
      </section>"""

if target in content:
    content = content.replace(target, '')
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Target not found")
