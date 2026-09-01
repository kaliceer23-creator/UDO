const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// Restore the classes on rich-content-container
const badContainerRegex = /<div id="rich-content-container" class="max-w-\[900px\] mx-auto px-4 text-center relative  ">/;
const goodContainerStr = `<div id="rich-content-container" class="max-w-[900px] mx-auto px-4 text-center relative overflow-hidden transition-[max-height] duration-500 ease-in-out max-h-[500px]">`;
html = html.replace(badContainerRegex, goodContainerStr);

// Restore the classes on rich-content-fade by removing "hidden "
const badFadeRegex = /<div id="rich-content-fade" class="hidden absolute bottom-0 left-0 w-full h-\[200px\] bg-gradient-to-t from-white via-white\/80 to-transparent flex items-end justify-center pb-0 pointer-events-none transition-all duration-300">/;
const goodFadeStr = `<div id="rich-content-fade" class="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-0 pointer-events-none transition-all duration-300">`;
html = html.replace(badFadeRegex, goodFadeStr);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Restored original UI classes for expanding/collapsing rich content");
