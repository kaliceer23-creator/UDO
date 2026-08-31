const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldBox = `          <!-- Operating Hours -->
          <div class="text-[13px] md:text-[14px] text-gray-800 leading-[1.8] bg-gray-50 rounded-xl p-4 border border-gray-100 w-fit">
            <p class="mb-0">
              <span class="font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เวลาทำการฝ่ายบริการลูกค้า
              </span>
              ทุกวัน : 09.00 - 18.00 น.
            </p>
          </div>`;

const newBox = `          <!-- Contact & Hours Box -->
          <div class="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-100 w-fit hover:border-gray-200 hover:shadow-sm transition-all">
            <!-- Phone Number -->
            <a href="tel:0628159999" class="flex items-center gap-3 group mb-4">
              <div class="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green transition-colors">
                <svg class="w-5 h-5 text-brand-green group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div class="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">สายด่วนฝ่ายขาย (Call Center)</div>
                <div class="text-[18px] md:text-[20px] font-bold text-gray-900 group-hover:text-brand-green transition-colors">062-815-9999</div>
              </div>
            </a>
            
            <div class="h-px w-full bg-gray-200 mb-4"></div>

            <!-- Operating Hours -->
            <div class="text-[13.5px] text-gray-800">
              <span class="font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เวลาทำการ
              </span>
              ทุกวัน : 09.00 - 18.00 น.
            </div>
          </div>`;

if (content.includes(oldBox)) {
    content = content.replace(oldBox, newBox);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Added Contact box to Col 1.");
} else {
    console.log("Could not find the operating hours box.");
}
