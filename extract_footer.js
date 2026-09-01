const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
const footerHtmlPath = 'frontend/src/components/footer.html';

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const footerStartMarker = '<!-- Footer -->';
const footerEndMarker = '<!-- Modern Fluid Bottom Dock (UDO Custom Framer-style) -->';
// We need to find the closing div of the dock.
// Looking at the file, the dock starts at '<!-- Modern Fluid Bottom Dock (UDO Custom Framer-style) -->'
// and ends exactly before '</div>\n    <script type="module" src="/src/main.js"></script>'

const startIndex = indexHtml.indexOf(footerStartMarker);
const endIndexRegex = /<\/div>\s*<\/div>\n\s*<script type="module"/;
const match = indexHtml.match(endIndexRegex);

if (startIndex !== -1 && match) {
    const endIndex = match.index; // This points to the closing </div> of #app.
    // Wait, the dock ends with </div></div></div>.
    // Let's just extract from footerStartMarker to the closing tag of the dock.
    // I can do a simple string split.
    
    // Instead of regex, I'll extract from '<!-- Footer -->' to the end of the inner app div, which is exactly before closing </div> of #app.
    
    // Actually, I can just grab everything from '<!-- Footer -->' up to before '</div>\n    <script type="module" src="/src/main.js"></script>'
    
    const endStr = '</div>\n    <script type="module" src="/src/main.js"></script>';
    const lastAppDivClose = indexHtml.lastIndexOf(endStr);
    
    if (lastAppDivClose !== -1) {
        const footerHtml = indexHtml.substring(startIndex, lastAppDivClose).trim();
        
        fs.writeFileSync(footerHtmlPath, footerHtml, 'utf8');
        
        const newIndexHtml = indexHtml.substring(0, startIndex) + 
                             '  <load src="./src/components/footer.html" />\n' + 
                             indexHtml.substring(lastAppDivClose);
                             
        fs.writeFileSync(indexHtmlPath, newIndexHtml, 'utf8');
        console.log("Successfully extracted footer.html");
    } else {
        console.error("Could not find the end of the app div.");
    }
} else {
    console.error("Could not find the start or end markers for the footer.");
}
