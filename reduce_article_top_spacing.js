const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const target = 'class="w-full bg-[#F8F8F8] pt-18 md:pt-26 lg:pt-32 pb-28 md:pb-36 lg:pb-44 overflow-hidden"';
const replacement = 'class="w-full bg-[#F8F8F8] pt-12 md:pt-16 lg:pt-24 pb-28 md:pb-36 lg:pb-44 overflow-hidden"';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Reduced top padding of the Articles section.");
} else {
    console.log("Target string not found.");
}
