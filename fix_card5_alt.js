const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regexAlt = /alt="เชื่อมทองเหลือง-ทองแดง"/;
if (content.match(regexAlt)) {
    content = content.replace(regexAlt, 'alt="เชื่อมทองเหลือง-ทองแดงและเงิน"');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Card 5 alt successfully.");
} else {
    console.log("Could not find the target alt text.");
}
