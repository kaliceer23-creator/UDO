const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const contactBoxRegex = /          <!-- Contact & Hours Box -->[\s\S]*?<\/div>\n        <\/div>\n\n        <!-- Col 2: หมวดหมู่สินค้า -->/;
if (content.match(contactBoxRegex)) {
    content = content.replace(contactBoxRegex, '        </div>\n\n        <!-- Col 2: หมวดหมู่สินค้า -->');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Deleted Contact Box.");
} else {
    console.log("Could not match regex.");
}
