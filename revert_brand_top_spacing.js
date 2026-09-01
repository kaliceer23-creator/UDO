const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /class="w-full bg-white pt-16 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20"/;
const replacement = 'class="w-full bg-white pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20"';

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Reverted top spacing to original.");
} else {
    console.log("Could not find the target wrapper class.");
}
