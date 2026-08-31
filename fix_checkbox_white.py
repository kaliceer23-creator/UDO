import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# For UNCHECKED checkboxes
old_unchecked = '<input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-[#76B83F]">'
new_unchecked = """<div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all">
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>"""
content = content.replace(old_unchecked, new_unchecked)

# For CHECKED checkboxes
old_checked = '<input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-[#76B83F]" checked>'
new_checked = """<div class="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" class="peer appearance-none w-4 h-4 rounded-[3px] border border-gray-300 bg-white checked:bg-brand-green checked:border-brand-green cursor-pointer transition-all" checked>
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>"""
content = content.replace(old_checked, new_checked)

with open(filepath, 'w') as f:
    f.write(content)

print("Checkboxes replaced with custom Tailwind SVG checkboxes")
