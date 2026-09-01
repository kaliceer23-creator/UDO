const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<h2 class="text-\[32px\] md:text-\[40px\] lg:text-\[48px\] font-semibold text-gray-900 tracking-tight mb-10 md:mb-14 lg:mb-18">\s*แบรนด์ชั้นนำ\s*<\/h2>/;

const replacement = `<div class="mb-10 md:mb-14 lg:mb-18">
          <span class="block text-[13px] md:text-[15px] font-semibold text-brand-red tracking-[0.05em] mb-1 md:mb-1.5">ผู้แทนจำหน่ายอย่างเป็นทางการ</span>
          <h2 class="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 tracking-tight leading-none">
            แบรนด์ชั้นนำ
          </h2>
        </div>`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Brands section with pre-title.");
} else {
    console.log("Could not find the target Brands H2.");
}
