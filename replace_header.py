import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Define the new header
new_header = """    <!-- 1. แถบสีขาวด้านบน (Main Header) -->
    <header class="w-full bg-white border-b border-gray-100">
      <div class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-2 md:py-2.5 flex items-center gap-6">
        
        <!-- Hamburger + Logo -->
        <div class="flex items-center gap-4 shrink-0">
          <!-- Hamburger Icon -->
          <button class="text-black/80 hover:text-brand-red transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          
          <!-- Logo -->
          <a href="/" class="hover:opacity-80 transition-opacity">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-12 md:h-[60px] w-auto object-contain" />
          </a>
        </div>
        
        <!-- Search Bar Area (BaNANA Style) -->
        <div class="hidden md:flex flex-1 items-center mx-4 lg:mx-8">
          
          <!-- "ทั้งหมด" dropdown -->
          <div class="flex items-center gap-1.5 text-[15px] text-gray-700 cursor-pointer hover:text-brand-red whitespace-nowrap pl-2">
            <span>ทั้งหมด</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          
          <!-- Search Input Container (Bottom Border) -->
          <div class="flex-1 ml-5 mr-3 flex items-center h-10 border-b border-gray-300 focus-within:border-brand-red transition-colors">
            <input 
              type="text" 
              placeholder="ค้นหาสินค้าที่ต้องการที่นี่....."
              class="w-full bg-transparent text-[15px] text-black/90 outline-none placeholder-gray-500 h-full px-1"
            />
          </div>
          
          <!-- Search Button (Brand Red instead of Yellow) -->
          <button class="bg-[#E32626] hover:bg-[#C92222] text-white w-[54px] h-[44px] rounded-[4px] flex items-center justify-center transition-colors shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          
        </div>

        <!-- Right Side Actions -->
        <div class="shrink-0 flex items-center justify-end text-[15px] text-gray-800 gap-5 lg:gap-6">
          
          <!-- Login -->
          <a href="#" class="hidden lg:flex items-center gap-2 hover:text-brand-red cursor-pointer transition-colors text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span class="font-medium text-[15px]">เข้าสู่ระบบ</span>
          </a>

          <!-- Divider -->
          <div class="w-[1px] h-[24px] bg-gray-200 hidden lg:block"></div>

          <!-- Cart -->
          <a href="#" class="text-gray-800 hover:text-brand-red transition-colors flex items-center relative pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <!-- Badge (Optional, you can remove if not needed, but standard for carts) -->
            <span class="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white leading-none">0</span>
          </a>

        </div>
      </div>
    </header>"""

# Find the start and end of the header block
start_idx = content.find('<!-- 1. แถบสีขาวด้านบน (Main Header) -->')
end_idx = content.find('<!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_header + "\n\n  " + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find boundaries.")
