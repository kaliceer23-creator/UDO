const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const target = 'class="w-full bg-[#F8F8F8] pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16"';
const replacement = 'class="w-full bg-[#F8F8F8] pt-20 md:pt-28 lg:pt-36 pb-20 md:pb-28 lg:pb-32"';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Increased bottom padding of the Products section.");
} else {
    console.log("Target string not found.");
}
