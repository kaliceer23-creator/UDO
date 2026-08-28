import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

old_button = """          <!-- Search Button (Brand Red instead of Yellow) -->
          <button class="bg-[#E32626] hover:bg-[#C92222] text-white w-[54px] h-[44px] rounded-[4px] flex items-center justify-center transition-colors shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>"""

new_button = """          <!-- Search Button (Brand Red instead of Yellow) -->
          <button class="bg-[#E32626] hover:bg-[#C92222] text-white w-[64px] h-[44px] rounded-[4px] flex items-center justify-center transition-colors shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>"""

if old_button in content:
    content = content.replace(old_button, new_button)
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Button updated.")
else:
    print("Could not find the button.")
