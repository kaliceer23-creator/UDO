const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldAuthBlock = `          <!-- Auth Links -->
          <div class="hidden lg:flex items-center gap-1.5 font-normal text-[15px] text-[#252525]">
            <a href="#" class="hover:text-brand-red transition-colors">เข้าสู่ระบบ</a>
            <span class="text-black mx-1">|</span>
            <a href="#" class="hover:text-brand-red transition-colors">ลงทะเบียน</a>
          </div>`;

const newAuthBlock = `          <!-- Auth Links -->
          <div class="hidden lg:flex items-center gap-1.5 font-normal text-[15px] text-[#252525]">
            <a href="#" class="flex items-center gap-1.5 hover:text-brand-red transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              เข้าสู่ระบบ
            </a>
            <span class="text-black mx-1">|</span>
            <a href="#" class="hover:text-brand-red transition-colors">ลงทะเบียน</a>
          </div>`;

if (content.includes(oldAuthBlock)) {
    content = content.replace(oldAuthBlock, newAuthBlock);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("User icon added back.");
} else {
    console.log("Could not find auth block.");
}
