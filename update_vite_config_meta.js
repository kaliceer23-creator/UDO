const fs = require('fs');
let content = fs.readFileSync('frontend/vite.config.js', 'utf8');
content = content.replace(/__dirname/g, 'import.meta.dirname');
fs.writeFileSync('frontend/vite.config.js', content, 'utf8');
console.log("Fixed __dirname to import.meta.dirname");
