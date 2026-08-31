const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const targetStr = '<img src="/images/footer-logos/mastercard.png" alt="Mastercard" class="h-[18px] md:h-[24px] w-auto object-contain" />';
const newStr = '<img src="/images/footer-logos/mastercard.png" alt="Mastercard" class="h-4 md:h-[22px] w-auto object-contain" />';

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Reverted Mastercard by 2px.");
} else {
    console.log("Could not find Mastercard block.");
}
