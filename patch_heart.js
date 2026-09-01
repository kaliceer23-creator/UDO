const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

const heartBtn = `
      <!-- Wishlist Heart -->
      <button class="btn-wishlist absolute bottom-[14px] right-[14px] w-[34px] h-[34px] flex items-center justify-center text-gray-300 hover:text-[#E12427] hover:bg-red-50 rounded-full transition-all z-10" title="เพิ่มในรายการโปรด">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
      </button>
    </div>
  \`;`;

content = content.replace("    </div>\n  `;", heartBtn);
fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Heart added");
