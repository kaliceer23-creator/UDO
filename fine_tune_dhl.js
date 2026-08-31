const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const targetStr = '<img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-3.5 md:h-[16px] w-auto object-contain" />';
const newStr = '<img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-[15px] md:h-[18px] w-auto object-contain" />';

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Bumped DHL by 2px.");
} else {
    console.log("Could not find DHL block.");
}
