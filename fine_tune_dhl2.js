const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const targetStr = '<img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-4 md:h-[20px] w-auto object-contain" />';
const newStr = '<img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-[18px] md:h-[22px] w-auto object-contain" />';

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Bumped DHL by 2px.");
} else {
    console.log("Could not find DHL block.");
}
