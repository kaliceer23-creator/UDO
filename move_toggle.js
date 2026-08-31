const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// We will find all instances of the product card bottom section and manually rewrite them.
const chunks = content.split('<div class="mt-auto flex flex-col">');

let newContent = chunks[0];

for (let i = 1; i < chunks.length; i++) {
    let chunk = chunks[i];
    
    // Check if this chunk is a product card bottom section
    if (chunk.includes('<!-- Unit Toggle -->') && chunk.includes('class="cart-control')) {
        // Extract the toggle block
        const toggleStart = chunk.indexOf('<!-- Unit Toggle -->');
        // The toggle block ends at the closing </div> of the bg-gray-100 div
        const toggleEndStr = '</div>\n                \n                <div class="flex items-center justify-between">';
        const toggleEndIndex = chunk.indexOf(toggleEndStr);
        
        if (toggleStart !== -1 && toggleEndIndex !== -1) {
            // Include the </div> in the toggle block
            let toggleBlock = chunk.substring(toggleStart, toggleEndIndex + 6);
            
            // Remove the ' mb-2.5' from the toggle block since it's going side-by-side now
            toggleBlock = toggleBlock.replace('w-fit mb-2.5', 'w-fit');
            
            // Extract the price block
            const priceStart = chunk.indexOf('<div class="flex items-baseline gap-1">', toggleEndIndex);
            const priceEndStr = '</div>\n                  <div class="cart-control flex justify-end"';
            const priceEndIndex = chunk.indexOf(priceEndStr, priceStart);
            
            if (priceStart !== -1 && priceEndIndex !== -1) {
                let priceBlock = chunk.substring(priceStart, priceEndIndex + 6);
                
                // Construct the new layout
                let beforeToggle = chunk.substring(0, toggleStart);
                let afterPrice = chunk.substring(priceEndIndex + 6); // Starts with <div class="cart-control...
                
                let newChunk = beforeToggle + 
                               priceBlock + '\n                ' +
                               '<div class="flex items-center justify-between mt-2.5">\n                  ' + 
                               toggleBlock + '\n                  ' + 
                               afterPrice.trimStart();
                               
                newContent += '<div class="mt-auto flex flex-col">\n                ' + newChunk;
                continue;
            }
        }
    }
    
    // Fallback if parsing fails
    newContent += '<div class="mt-auto flex flex-col">' + chunk;
}

fs.writeFileSync('frontend/src/main.js', newContent, 'utf8');
console.log("Moved toggles.");
