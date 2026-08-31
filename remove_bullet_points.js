const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<ul class="space-y-2 mb-6">[\s\S]*?<\/ul>/;
if (content.match(regex)) {
    content = content.replace(regex, '');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Removed redundant bullet points from Col 1.");
} else {
    console.log("Could not find bullet points.");
}
