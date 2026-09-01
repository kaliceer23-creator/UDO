const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<div class="mb-10 md:mb-14 lg:mb-18">\s*<span class="block text-\[12px\] md:text-\[14px\] font-medium text-gray-800 tracking-\[0\.05em\] mb-1 md:mb-1\.5">ผู้แทนจำหน่ายอย่างเป็นทางการ<\/span>\s*<h2 class="text-\[32px\] md:text-\[40px\] lg:text-\[48px\] font-semibold text-gray-900 tracking-tight leading-none">\s*แบรนด์ชั้นนำ\s*<\/h2>\s*<\/div>/;

const replacement = `<h2 class="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 tracking-tight mb-10 md:mb-14 lg:mb-18">
          แบรนด์ชั้นนำ
        </h2>`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Reverted subtitle.");
} else {
    console.log("Could not find the target block.");
}
