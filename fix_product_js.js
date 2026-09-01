const fs = require('fs');
const execSync = require('child_process').execSync;

// Restore product.js to original
execSync('git show HEAD:frontend/src/product.js > frontend/src/product.js');

let productJs = fs.readFileSync('frontend/src/product.js', 'utf8');

// 1. Remove HTML String
const htmlStartIndex = productJs.indexOf("document.querySelector('#app').innerHTML = `");
const htmlEndIndex = productJs.indexOf('`;', htmlStartIndex);

let newProductJs = productJs.substring(0, htmlStartIndex) + productJs.substring(htmlEndIndex + 2);

// 2. Remove the specific `setTimeout(() => { ... }, 100);` wrappers that were around 
// the Mega Menu logic and Read More logic.
// There are exactly two of them. Let's find them explicitly.

// Wrapper 1: Mega Menu
const megaMenuStart = newProductJs.indexOf('// --- Mega Menu Click Logic ---');
if (megaMenuStart !== -1) {
    const setTimeStart = newProductJs.indexOf('setTimeout(() => {', megaMenuStart);
    if (setTimeStart !== -1 && setTimeStart < megaMenuStart + 200) {
        newProductJs = newProductJs.substring(0, setTimeStart) + newProductJs.substring(setTimeStart + 'setTimeout(() => {\n'.length);
        const setTimeEnd = newProductJs.indexOf('}, 100);', setTimeStart);
        if (setTimeEnd !== -1) {
            newProductJs = newProductJs.substring(0, setTimeEnd) + newProductJs.substring(setTimeEnd + '}, 100);\n'.length);
        }
    }
}

// Wrapper 2: Read More Logic
const readMoreStart = newProductJs.indexOf('// --- Read More Logic ---');
if (readMoreStart !== -1) {
    const setTimeStart = newProductJs.indexOf('setTimeout(() => {', readMoreStart);
    if (setTimeStart !== -1 && setTimeStart < readMoreStart + 200) {
        newProductJs = newProductJs.substring(0, setTimeStart) + newProductJs.substring(setTimeStart + 'setTimeout(() => {\n'.length);
        const setTimeEnd = newProductJs.indexOf('}, 100);', setTimeStart);
        if (setTimeEnd !== -1) {
            newProductJs = newProductJs.substring(0, setTimeEnd) + newProductJs.substring(setTimeEnd + '}, 100);\n'.length);
        }
    }
}

fs.writeFileSync('frontend/src/product.js', newProductJs, 'utf8');
console.log("Successfully fixed product.js");
