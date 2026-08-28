import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Remove the old dock
old_dock_start = content.find('<!-- Floating Dock (Landy Home Style) -->')
if old_dock_start != -1:
    old_dock_end = content.find('</section>', old_dock_start)
    if old_dock_end != -1:
        dock_content = content[old_dock_start:old_dock_end]
        content = content.replace(dock_content, '')
        print("Removed old dock.")

# Insert new Fixed Dock at the end of #app
new_dock = """
  <!-- Fixed Bottom Dock (UDO Custom) -->
  <div class="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-full px-6 md:px-10 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center gap-6 md:gap-8 border border-gray-100">
    
    <!-- Item 1: ถาม UDO AI -->
    <a href="#" class="flex flex-col items-center gap-1 group w-20 md:w-24">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#8ac353" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path stroke="#E32626" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>
      <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#8ac353] transition-colors whitespace-nowrap tracking-tight">ถาม UDO AI</span>
    </a>

    <!-- Separator -->
    <div class="h-6 w-[1px] bg-gray-300"></div>

    <!-- Item 2: โทรเช็กสต็อก -->
    <a href="#" class="flex flex-col items-center gap-1 group w-20 md:w-24">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#8ac353" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        <path stroke="#E32626" stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#8ac353] transition-colors whitespace-nowrap tracking-tight">โทรเช็กสต็อก</span>
    </a>

    <!-- Separator -->
    <div class="h-6 w-[1px] bg-gray-300"></div>

    <!-- Item 3: ขอใบเสนอราคา -->
    <a href="#" class="flex flex-col items-center gap-1 group w-20 md:w-24">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#8ac353" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        <path stroke="#E32626" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
      </svg>
      <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#8ac353] transition-colors whitespace-nowrap tracking-tight">ขอใบเสนอราคา</span>
    </a>
  </div>
"""

# Insert at the end of the file, right before the closing backtick
app_end = content.rfind('`')
if app_end != -1:
    content = content[:app_end] + new_dock + "\n" + content[app_end:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("New sticky dock added.")
else:
    print("Could not find the end of #app.")
