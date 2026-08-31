const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const target = 'focus-within:border-brand-red/50 focus-within:ring-[3px] focus-within:ring-brand-red/20 transition-all duration-200 relative';
const replacement = 'focus-within:border-[#ff6b6b] focus-within:ring-[1.5px] focus-within:ring-[#ff6b6b] transition-all duration-200 relative';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated search focus style to a single solid layer.");
} else {
    console.log("Could not find the target text.");
}
