const fs = require('fs');

const mainJsPath = 'frontend/src/main.js';
const indexHtmlPath = 'frontend/index.html';
const navHtmlPath = 'frontend/src/components/nav.html';

let mainJs = fs.readFileSync(mainJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Find the template literal bounds
const startIndex = mainJs.indexOf('document.querySelector(\'#app\').innerHTML = `');
if (startIndex === -1) {
    console.error("Could not find innerHTML assignment in main.js");
    process.exit(1);
}

const templateStart = startIndex + 'document.querySelector(\'#app\').innerHTML = `'.length;
const templateEnd = mainJs.indexOf('`;', templateStart);

const fullHtml = mainJs.substring(templateStart, templateEnd);

// Split the HTML at <!-- 3. Main Content -->
const splitMarker = '<!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->';
const splitIndex = fullHtml.indexOf(splitMarker);

const navHtml = fullHtml.substring(0, splitIndex).trim();
const restHtml = fullHtml.substring(splitIndex).trim();

// 1. Save nav.html
fs.mkdirSync('frontend/src/components', { recursive: true });
fs.writeFileSync(navHtmlPath, navHtml, 'utf8');

// 2. Update index.html
const newAppDiv = `<div id="app">\n  <load src="./src/components/nav.html" />\n  ${restHtml}\n</div>`;
indexHtml = indexHtml.replace(/<div id="app"><\/div>/, newAppDiv);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

// 3. Update main.js (remove the innerHTML part and the setTimeout wrapper)
let newMainJs = mainJs.substring(0, startIndex) + mainJs.substring(templateEnd + 2);
// Remove setTimeout(() => { ... }, 100); wrapper
newMainJs = newMainJs.replace(/setTimeout\(\(\) => \{/, '');
const lastBracketIndex = newMainJs.lastIndexOf('}, 100);');
if (lastBracketIndex !== -1) {
    newMainJs = newMainJs.substring(0, lastBracketIndex) + newMainJs.substring(lastBracketIndex + '}, 100);'.length);
}
fs.writeFileSync(mainJsPath, newMainJs, 'utf8');

console.log("Migration successful!");
