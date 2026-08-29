import re

def fix_slider(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update Title Margin
    content = content.replace(
        '<h2 class="text-[20px] md:text-[22px] font-bold text-[#252525] mb-6">ตัวเลือกอื่นที่คุณอาจชอบ</h2>',
        '<h2 class="text-[20px] md:text-[22px] font-bold text-[#252525] mb-8">ตัวเลือกอื่นที่คุณอาจชอบ</h2>'
    )

    # 2. Update the Arrow button
    old_button = """<button class="absolute -right-4 top-1/2 -translate-y-[calc(50%+12px)] w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-gray-500 hover:text-brand-red hover:scale-105 transition-all z-10 hidden md:flex opacity-0 group-hover:opacity-100 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>"""
          
    new_button = """<button class="absolute -right-4 md:-right-8 top-1/2 -translate-y-[calc(50%+12px)] flex items-center justify-center text-[#252525] hover:text-brand-red transition-colors z-10 hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>"""
          
    content = content.replace(old_button, new_button)

    with open(filepath, 'w') as f:
        f.write(content)
    print("Fixed slider arrow and title margin.")

fix_slider('/Users/aliceer/UDO/frontend/src/product.js')

