import re

card_html = """
            <!-- Product Card -->
            <a href="#" class="snap-start shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
              <div class="relative w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                 <img src="/images/products/product_placeholder.png" alt="KOBE-308L" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=KOBE-308L'"/>
              </div>
              <h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">
                ลวดเชื่อมสเตนเลส KOBE-308L ขนาด 2.6 มม. (2 กก.)
              </h3>
              <p class="text-[12px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
                งานสเตนเลส | ทนการกัดกร่อน | เชื่อมเรียบ | ไม่เป็นสนิม
              </p>
              <div class="mt-auto flex flex-col">
                <!-- Unit Toggle -->
                <div class="flex items-center bg-gray-100 p-0.5 rounded-[4px] w-fit mb-2.5">
                  <button class="unit-toggle active px-2.5 py-1 bg-white shadow-sm rounded-[3px] text-[11px] text-gray-900 font-medium transition-all" data-price="650" data-unit="ห่อ">ห่อ</button>
                  <button class="unit-toggle px-2.5 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-medium transition-all" data-price="2,500" data-unit="ลัง">ลัง (4 ห่อ)</button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#E12427] font-bold text-[18px] price-display">฿650</span>
                    <span class="text-gray-500 text-[12px] font-medium price-unit">/ห่อ</span>
                  </div>
                  <div class="cart-control flex justify-end" data-unit="ห่อ">
                    <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <div class="control-expanded hidden bg-white border border-brand-green rounded-lg shadow-sm flex items-center h-8 md:h-9 overflow-hidden">
                      <button class="btn-minus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <div class="px-1 font-bold text-[13px] text-gray-800 flex items-center justify-center min-w-[3rem] select-none">1</div>
                      <button class="btn-plus w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
"""

section_html = f"""
      <!-- Related Products Section (BaNANA Style Slider) -->
      <div class="mt-16 mb-8 pt-8 border-t border-gray-200">
        <h2 class="text-[20px] md:text-[22px] font-bold text-[#252525] mb-6">ตัวเลือกอื่นที่คุณอาจชอบ</h2>
        <div class="relative group">
          <!-- Horizontal Scroll Container -->
          <div class="flex gap-4 overflow-x-auto custom-scrollbar pb-6 snap-x hide-scroll-indicator">
            {card_html * 5}
          </div>
          <!-- Next Arrow -->
          <button class="absolute -right-4 top-1/2 -translate-y-[calc(50%+12px)] w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-gray-500 hover:text-brand-red hover:scale-105 transition-all z-10 hidden md:flex opacity-0 group-hover:opacity-100 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
"""

def inject_related(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We need to insert this right before </main>
    if '<!-- Related Products Section' not in content:
        content = content.replace('</main>', section_html + '\n    </main>')
        
        # Add CSS to hide scroll indicator slightly if needed, or rely on custom-scrollbar
        style_css = """
<style>
  .hide-scroll-indicator::-webkit-scrollbar {
    height: 6px;
  }
  .hide-scroll-indicator::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .hide-scroll-indicator::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
  .hide-scroll-indicator::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
</style>
"""
        if '.hide-scroll-indicator' not in content:
            content = content.replace('</head>', style_css + '</head>')
            
        with open(filepath, 'w') as f:
            f.write(content)
        print("Injected related products successfully.")
    else:
        print("Related products already exists.")

inject_related('/Users/aliceer/UDO/frontend/src/product.js')

