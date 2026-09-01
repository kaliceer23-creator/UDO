const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /  \}\n      mobileBottomDock\.classList\.add\('w-auto'\);[\s\S]*?\}, 100\);\n/g;

if (content.match(regex)) {
    content = content.replace(regex, '  }\n\n}, 100);\n');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Fixed JS tail successfully.");
} else {
    console.log("Could not find the target text.");
}
