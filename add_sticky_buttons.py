with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

sticky_buttons_html = """
  <!-- Sticky Right Buttons (Why UDO & LINE) -->
  <div class="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[100] flex flex-col items-center gap-3">
    
    <!-- Why UDO Button -->
    <div class="relative group cursor-pointer" id="whyUdoBtnContainer">
      <!-- Close Button (X) -->
      <button onclick="document.getElementById('whyUdoBtnContainer').style.display='none'" class="absolute -top-1 -right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-10 border border-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Main Circle Button -->
      <a href="#" class="w-[70px] h-[70px] md:w-[84px] md:h-[84px] bg-[#E32626] hover:bg-[#c92020] rounded-full flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[13px] md:text-[15px] leading-[1.2] text-center font-bold">ทำไมต้อง<br>UDO</span>
      </a>
    </div>

    <!-- LINE Button -->
    <a href="#" class="w-[48px] h-[48px] md:w-[56px] md:h-[56px] bg-[#E32626] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group">
      <!-- LINE SVG Icon -->
      <svg class="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zM8.344 13.56H6.173c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.171c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H6.697v1.865h1.647c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H8.344zm3.924 0h-1.646c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h1.646c.29 0 .524.234.524.523v4.48c0 .29-.234.524-.524.524zm4.184 0h-1.288l-1.921-2.617v2.093c0 .29-.234.524-.524.524h-1.647c-.289 0-.523-.234-.523-.524v-4.48c0-.289.234-.523.523-.523h1.289l1.92 2.617V8.553c0-.289.234-.523.524-.523h1.647c.289 0 .523.234.523.523v4.48c0 .29-.234.524-.523.524zm4.07 0h-2.17c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.17c.289 0 .523.234.523.523v1.308c0 .29-.234.524-.523.524h-1.646v1.08h1.646c.289 0 .523.234.523.524v1.308c0 .29-.234.524-.523.524h-1.646v1.308c0 .29.234.524.523.524h2.17c.289 0 .524.234.524.524z" />
      </svg>
    </a>
    
  </div>
"""

# Insert right before the Fixed Bottom Dock to keep fixed elements together
insert_point = content.find('  <!-- Fixed Bottom Dock (UDO Custom) -->')
if insert_point != -1:
    content = content[:insert_point] + sticky_buttons_html + content[insert_point:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Sticky buttons added successfully.")
else:
    print("Could not find insert point.")
