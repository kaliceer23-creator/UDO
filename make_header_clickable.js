const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldHeader = `<h2 class="text-brand-green font-semibold text-[16px] mb-8 flex items-center gap-2">
          🔥 โปรโมชั่นพิเศษ ทั้งหมด
        </h2>`;

const newHeader = `<a href="#" class="text-brand-green font-semibold text-[16px] mb-8 flex items-center gap-2 w-fit hover:opacity-80 hover:underline transition-all">
          🔥 โปรโมชั่นพิเศษ ทั้งหมด
        </a>`;

content = content.replace(oldHeader, newHeader);
fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Header is now clickable.");
