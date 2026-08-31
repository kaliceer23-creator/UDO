const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const target = 'เชื่อมทองเหลือง-ทองแดง</a>';
const replacement = 'เชื่อมทองเหลือง-ทองแดงและเงิน</a>';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Nav dropdown successfully.");
} else {
    console.log("Could not find the target text.");
}
