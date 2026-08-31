const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldYoutube = `<a href="#" class="w-8 h-8 md:w-9 md:h-9 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>`;

const newYoutube = `<a href="#" class="hover:opacity-80 transition-opacity block w-8 h-8 md:w-9 md:h-9">
              <svg class="w-full h-full text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                <path d="M16.5 12l-6 3.5v-7l6 3.5z" fill="white"/>
              </svg>
            </a>`;

if (content.includes(oldYoutube)) {
    content = content.replace(oldYoutube, newYoutube);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("YouTube icon replaced with full SVG circle.");
} else {
    console.log("Old YouTube icon not found.");
}
