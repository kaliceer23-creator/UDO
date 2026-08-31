const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// Find the section for the Fixed Bottom Dock
const startIndex = content.indexOf('<!-- Fixed Bottom Dock (UDO Custom) -->');
if (startIndex !== -1) {
    const endIndex = content.indexOf('<!-- Script สำหรับทำ Fade Effect ให้กับช่องค้นหา -->', startIndex);
    
    if (endIndex !== -1) {
        let dockSection = content.substring(startIndex, endIndex);
        
        // Replace stroke-width="1.8" with stroke-width="1.4" in this section
        dockSection = dockSection.replace(/stroke-width="1.8"/g, 'stroke-width="1.4"');
        // I also added stroke-width="1.5" explicitly to the red sparkle in previous step,
        // let's change it to 1.4 or 1.2 so it matches the new thinner style.
        dockSection = dockSection.replace(/stroke-width="1.5"/g, 'stroke-width="1.2"');
        
        content = content.substring(0, startIndex) + dockSection + content.substring(endIndex);
        
        fs.writeFileSync('frontend/src/main.js', content, 'utf8');
        console.log("Dock icons stroke-width reduced.");
    } else {
        console.log("End index not found.");
    }
} else {
    console.log("Start index not found.");
}
