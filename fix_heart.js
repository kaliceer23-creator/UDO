const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

// 1. Change the heart icon HTML color from text-gray-300 to text-gray-900 (black)
content = content.replace(
    /text-gray-300 hover:text-\[\#E12427\]/g, 
    'text-gray-900 hover:text-[#E12427]'
);

// 2. Change the JS logic to toggle text-gray-900 instead of text-gray-300
content = content.replace(
    /wishlistBtn\.classList\.add\('text-gray-300'\);/g, 
    "wishlistBtn.classList.add('text-gray-900');"
);
content = content.replace(
    /wishlistBtn\.classList\.remove\('text-gray-300'\);/g, 
    "wishlistBtn.classList.remove('text-gray-900');"
);

// 3. Make the heart icon thinner
const heartSvgRegex = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" class="w-\[20px\] h-\[20px\]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">/;
content = content.replace(
    heartSvgRegex,
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">'
);

fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Heart customized");
