const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /class="bg-brand-red hover:bg-\[#c91d20\] text-white px-3\.5 md:px-4 py-0\.5 h-\[28px\] md:h-\[30px\] rounded-full flex items-center justify-center gap-1 transition-all duration-200 shrink-0 cursor-pointer active:scale-\[0\.98\]"/;

const newString = 'class="bg-brand-red hover:bg-[#c91d20] text-white px-2.5 md:px-3 py-0.5 h-[28px] md:h-[30px] rounded-full flex items-center justify-center gap-1 transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98]"';

if (content.match(regex)) {
    content = content.replace(regex, newString);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated AI button padding.");
} else {
    console.log("Could not find AI button class string.");
}
