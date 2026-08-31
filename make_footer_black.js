const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// Extract the footer section to only modify footer text colors
const footerStart = content.indexOf('<footer class="bg-white');
const footerEnd = content.indexOf('</footer>') + 9;

if (footerStart !== -1 && footerEnd !== -1) {
    let footerHTML = content.substring(footerStart, footerEnd);
    
    // Replace link colors
    footerHTML = footerHTML.replace(/text-gray-700 hover:text-black/g, 'text-gray-900 hover:text-brand-red');
    
    // Replace text descriptions and bullet points
    footerHTML = footerHTML.replace(/text-gray-600/g, 'text-gray-900');
    footerHTML = footerHTML.replace(/text-gray-700/g, 'text-gray-900');
    
    // Replace box text colors
    footerHTML = footerHTML.replace(/text-gray-800/g, 'text-gray-900');
    footerHTML = footerHTML.replace(/text-gray-500/g, 'text-gray-900');

    content = content.substring(0, footerStart) + footerHTML + content.substring(footerEnd);
    
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Changed all gray text in footer to black (text-gray-900).");
} else {
    console.log("Could not find footer boundaries.");
}
