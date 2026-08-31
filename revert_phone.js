const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const targetBox = `          <!-- Contact & Hours Box -->
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 w-fit hover:border-gray-200 hover:shadow-sm transition-all">
            <!-- Phone Number -->
            <a href="tel:0628159999" class="flex items-center gap-2.5 group mb-3.5">
              <div class="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green transition-colors">
                <svg class="w-[18px] h-[18px] text-brand-green group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div class="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">สายด่วนฝ่ายขาย</div>
                <div class="text-[16px] md:text-[17px] font-bold text-gray-900 group-hover:text-brand-green transition-colors">062-815-9999</div>
              </div>
            </a>
            
            <div class="h-px w-full bg-gray-200 mb-3.5"></div>

            <!-- Operating Hours -->
            <div class="text-[13px] md:text-[13.5px] text-gray-800">
              <span class="font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เวลาทำการ
              </span>
              ทุกวัน : 09.00 - 18.00 น.
            </div>
          </div>`;

const revertBox = `          <!-- Contact & Hours Box -->
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 w-fit hover:border-gray-200 hover:shadow-sm transition-all">
            <!-- Phone Number -->
            <a href="tel:0628159999" class="flex items-center gap-2.5 group mb-3">
              <div class="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green transition-colors">
                <svg class="w-4 h-4 text-brand-green group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div class="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">สายด่วนฝ่ายขาย</div>
                <div class="text-[15px] md:text-[15.5px] font-bold text-gray-900 group-hover:text-brand-green transition-colors">062-815-9999</div>
              </div>
            </a>
            
            <div class="h-px w-full bg-gray-200 mb-3"></div>

            <!-- Operating Hours -->
            <div class="text-[13px] md:text-[13.5px] text-gray-800">
              <span class="font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เวลาทำการ
              </span>
              ทุกวัน : 09.00 - 18.00 น.
            </div>
          </div>`;

if (content.includes(targetBox)) {
    content = content.replace(targetBox, revertBox);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Reverted phone number box back to the smaller size.");
} else {
    console.log("Could not find the phone number box.");
}
