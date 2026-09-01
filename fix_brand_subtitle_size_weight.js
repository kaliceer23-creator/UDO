const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /class="block text-\[13px\] md:text-\[15px\] font-semibold text-gray-800 tracking-\[0\.05em\] mb-1 md:mb-1\.5"/;
const replacement = 'class="block text-[12px] md:text-[14px] font-medium text-gray-800 tracking-[0.05em] mb-1 md:mb-1.5"';

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated subtitle size and weight.");
} else {
    console.log("Could not find the target subtitle string.");
}
