const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<button class="bg-brand-red hover:bg-\[#c91d20\] text-white px-3 md:px-3\.5 py-0\.5 h-\[26px\] md:h-\[28px\] rounded-full flex items-center justify-center gap-1 transition-all duration-200 shrink-0 cursor-pointer active:scale-\[0\.98\]">[\s\S]*?<\/button>/;

const newHTML = `<button class="bg-brand-red hover:bg-[#c91d20] text-white px-3.5 md:px-4 py-0.5 h-[28px] md:h-[30px] rounded-full flex items-center justify-center gap-1 transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98]">
            <!-- AI Search Icon (Magnifying Glass + Sparkle) -->
            <div class="relative flex items-center justify-center w-4 h-4 mr-0.5">
              <!-- Magnifying Glass -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] h-[14px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <!-- Sparkle (Top Right) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[9px] h-[9px] text-white absolute -top-1 -right-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span class="font-medium text-[12px] md:text-[13px] tracking-tight">โหมด AI</span>
          </button>`;

if (content.match(regex)) {
    content = content.replace(regex, newHTML);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated nav AI button size.");
} else {
    console.log("Could not find nav AI button HTML.");
}
