const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldHeart = `<svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>`;

const newHeart = `<svg xmlns="http://www.w3.org/2000/svg" class="w-[25px] h-[25px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
                <!-- Geometric Heart with straight V bottom -->
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>`;

if (content.includes(oldHeart)) {
    content = content.replace(oldHeart, newHeart);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Heart icon updated.");
} else {
    console.log("Could not find the old heart icon.");
}
