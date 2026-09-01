const fs = require('fs');

const footerHtmlPath = 'frontend/src/components/footer.html';
const floatingHtmlPath = 'frontend/src/components/floating-buttons.html';
const indexHtmlPath = 'frontend/index.html';

let footerHtml = fs.readFileSync(footerHtmlPath, 'utf8');

const splitMarker = '<!-- Sticky Right Buttons (Why UDO & LINE) -->';
const splitIndex = footerHtml.indexOf(splitMarker);

if (splitIndex !== -1) {
    const newFooterHtml = footerHtml.substring(0, splitIndex).trim();
    const floatingHtml = footerHtml.substring(splitIndex).trim();

    // 1. Save floating-buttons.html
    fs.writeFileSync(floatingHtmlPath, floatingHtml, 'utf8');
    
    // 2. Update footer.html
    fs.writeFileSync(footerHtmlPath, newFooterHtml, 'utf8');

    // 3. Update index.html
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Find where footer is loaded and add floating-buttons right after it
    const footerLoadStr = '<load src="./src/components/footer.html" />';
    if (indexHtml.includes(footerLoadStr)) {
        const replacement = `<load src="./src/components/footer.html" />\n      <load src="./src/components/floating-buttons.html" />`;
        indexHtml = indexHtml.replace(footerLoadStr, replacement);
        fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
        console.log("Successfully extracted floating-buttons.html and updated index.html");
    } else {
        console.error("Could not find footer load tag in index.html");
    }
} else {
    console.error("Could not find the split marker in footer.html");
}
