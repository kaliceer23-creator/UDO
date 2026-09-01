const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<button id="dock-cancel-btn" class="text-gray-900 hover:text-black p-2 transition-colors shrink-0 rounded-full mr-1">/;
const newString = '<button id="dock-cancel-btn" class="text-gray-900 hover:text-black hover:bg-gray-100/80 p-2 transition-all shrink-0 rounded-full mr-1">';

if (content.match(regex)) {
    content = content.replace(regex, newString);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Added hover background to cancel button.");
} else {
    console.log("Could not find the target string.");
}
