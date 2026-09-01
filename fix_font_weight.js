const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /font-semibold text-gray-800 group-hover:text-brand-red/g;
content = content.replace(regex, 'font-medium text-gray-800 group-hover:text-brand-red');

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated font weight successfully.");
