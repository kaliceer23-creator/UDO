const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

content = content.replace(
    "const defaultBorder = ['border-gray-200'];",
    "const defaultBorder = ['border-white/50'];"
);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Fixed default border in JS.");
