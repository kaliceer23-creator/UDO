const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

const targetClass = '<div class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">';

// Find occurrences
let firstIdx = html.indexOf(targetClass);
if (firstIdx !== -1) {
    html = html.substring(0, firstIdx) + 
           '<div id="new-arrivals-track" class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">' + 
           html.substring(firstIdx + targetClass.length);
}

let secondIdx = html.indexOf(targetClass);
if (secondIdx !== -1) {
    html = html.substring(0, secondIdx) + 
           '<div id="best-sellers-track" class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">' + 
           html.substring(secondIdx + targetClass.length);
}

let thirdIdx = html.indexOf(targetClass);
if (thirdIdx !== -1) {
    html = html.substring(0, thirdIdx) + 
           '<div id="recommended-track" class="pslider-track flex items-stretch gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">' + 
           html.substring(thirdIdx + targetClass.length);
}

fs.writeFileSync('frontend/index.html', html, 'utf8');
console.log("Successfully injected IDs into index.html");
