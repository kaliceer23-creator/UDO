const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<span class="block text-\[13px\] md:text-\[15px\] font-semibold text-brand-red tracking-\[0\.05em\] mb-1 md:mb-1\.5">ผู้แทนจำหน่ายอย่างเป็นทางการ<\/span>/;
const replacement = '<span class="block text-[13px] md:text-[15px] font-semibold text-gray-800 tracking-[0.05em] mb-1 md:mb-1.5">ผู้แทนจำหน่ายอย่างเป็นทางการ</span>';

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated subtitle color to black/gray-800.");
} else {
    console.log("Could not find the target subtitle string.");
}
