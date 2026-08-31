const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>`;

const newIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.8">
        <!-- Magnifying Glass -->
        <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        <!-- AI Sparkle (Top Right) -->
        <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
      </svg>`;

if (content.includes(oldIcon)) {
    content = content.replace(oldIcon, newIcon);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("UDO AI dock icon updated.");
} else {
    console.log("Could not find the old UDO AI dock icon.");
}
