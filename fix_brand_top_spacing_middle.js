const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /class="w-full bg-white pt-10 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20"/;
const replacement = 'class="w-full bg-white pt-14 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20"';

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Adjusted top spacing to a middle ground.");
} else {
    console.log("Could not find the target wrapper class.");
}
