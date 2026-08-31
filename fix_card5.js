const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /เชื่อมทองเหลือง<br>ทองแดง<\/h3>/;
if (content.match(regex)) {
    content = content.replace(regex, "เชื่อมทองเหลือง<br>ทองแดงและเงิน</h3>");
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Card 5 successfully.");
} else {
    console.log("Could not find the target text.");
}
