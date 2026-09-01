const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// The line to replace:
// const activeRedShadow = ['shadow-[0_8px_32px_rgba(225,36,39,0.25)]', 'hover:shadow-[0_12px_40px_rgba(225,36,39,0.35)]', 'border-[#ff8585]'];
const regex = /const activeRedShadow = \['shadow-\[0_8px_32px_rgba\(225,36,39,0\.25\)\]', 'hover:shadow-\[0_12px_40px_rgba\(225,36,39,0\.35\)\]', 'border-\[#ff8585\]'\];/;

const newString = "const activeRedShadow = ['shadow-[0_0px_40px_rgba(225,36,39,0.35)]', 'hover:shadow-[0_0px_50px_rgba(225,36,39,0.45)]', 'border-white/50'];";

if (content.match(regex)) {
    content = content.replace(regex, newString);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated red shadow styling.");
} else {
    console.log("Could not find the target string.");
}
