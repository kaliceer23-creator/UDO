const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

content = content.replace(
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">\n            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />',
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">\n            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />'
);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Fixed close button stroke width.");
