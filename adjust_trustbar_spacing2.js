const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const target = 'divide-gray-200 pt-12 pb-8">';
const replacement = 'divide-gray-200 pt-16 pb-8">';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Increased top padding of the Trust Bar to pt-16.");
} else {
    console.log("Target string not found.");
}
