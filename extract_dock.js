const fs = require('fs');

const footerHtmlPath = 'frontend/src/components/footer.html';
const dockHtmlPath = 'frontend/src/components/dock.html';
const indexHtmlPath = 'frontend/index.html';

let footerHtml = fs.readFileSync(footerHtmlPath, 'utf8');

const dockMarker = '<!-- Modern Fluid Bottom Dock (UDO Custom Framer-style) -->';
const dockIndex = footerHtml.indexOf(dockMarker);

if (dockIndex !== -1) {
    const pureFooter = footerHtml.substring(0, dockIndex).trim();
    const pureDock = footerHtml.substring(dockIndex).trim();

    // Save dock.html
    fs.writeFileSync(dockHtmlPath, pureDock, 'utf8');
    
    // Update footer.html
    fs.writeFileSync(footerHtmlPath, pureFooter, 'utf8');

    // Update index.html
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    const footerLoadMarker = '<load src="./src/components/footer.html" />';
    const newLoads = `<load src="./src/components/footer.html" />\n  <load src="./src/components/dock.html" />`;
    
    indexHtml = indexHtml.replace(footerLoadMarker, newLoads);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    
    console.log("Successfully extracted dock.html");
} else {
    console.error("Could not find dock marker in footer.html");
}
