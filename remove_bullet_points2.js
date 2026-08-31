const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /          <!-- Bullet Points -->[\s\S]*?<\/ul>/;
if (content.match(regex)) {
    content = content.replace(regex, '');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Removed redundant bullet points.");
} else {
    console.log("Could not find bullet points.");
}
