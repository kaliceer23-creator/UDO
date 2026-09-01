const fs = require('fs');

let html = fs.readFileSync('frontend/product.html', 'utf8');

const oldCapacityStr = `            <!-- Capacity / บรรจุ -->
            <div class="mb-10">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex items-center gap-3">
                <button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>
                <button class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">ลัง (4 ห่อ)</button>
              </div>
            </div>`;

const newSizeStr = `            <!-- Wire Size (ขนาดลวด) -->
            <div class="mb-10">
              <div class="flex items-baseline gap-4 mb-4">
                <span class="text-[16px] text-[#252525]">ขนาดลวด</span>
                <span id="selected-size-label" class="text-[16px] font-bold text-[#252525]"></span>
              </div>
              <div class="flex flex-wrap items-center gap-3" id="size-buttons">
                <!-- Buttons will be injected by JS -->
              </div>
            </div>`;

const oldColorStr = `            <!-- Color Selection (Mockup) -->
            <div class="mb-12">
              <div class="flex items-baseline gap-4 mb-5">
                <span class="text-[16px] text-[#252525]">สี</span>
                <span class="text-[16px] font-bold text-[#252525]">ดำ</span>
              </div>
              <div class="flex items-center gap-5">
                <button class="w-[24px] h-[24px] rounded-full bg-[#1c1c1c] ring-[1.5px] ring-offset-[4px] ring-[#252525]"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#efefef] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#a9b9cc] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#beb6c8] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#aab38d] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
              </div>
            </div>`;

const newPackageStr = `            <!-- Packaging (บรรจุ) -->
            <div class="mb-12">
              <div class="flex items-baseline gap-4 mb-4">
                <span class="text-[16px] text-[#252525]">บรรจุ</span>
                <span id="selected-package-label" class="text-[16px] font-bold text-[#252525]"></span>
              </div>
              <div class="flex flex-wrap items-center gap-3" id="package-buttons">
                <!-- Buttons will be injected by JS -->
              </div>
            </div>`;

html = html.replace(oldCapacityStr, newSizeStr);
html = html.replace(oldColorStr, newPackageStr);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Successfully updated product.html UI structure");
