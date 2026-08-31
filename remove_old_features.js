const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /    <!-- Features Row -->[\s\S]*?    <!-- Main Footer Content -->/;
if (content.match(regex)) {
    content = content.replace(regex, '    <!-- Main Footer Content -->');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Removed old Features Row.");
} else {
    console.log("Could not find the old Features Row.");
}
