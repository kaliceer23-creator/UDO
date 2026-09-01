const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /  \}\}\n\n\}, 100\);\n/;
if (content.match(regex)) {
    content = content.replace(regex, '  }\n\n}, 100);\n');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Fixed tail.");
}
