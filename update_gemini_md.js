const fs = require('fs');
const filePath = '/Users/aliceer/UDO/GEMINI.md';

let content = fs.readFileSync(filePath, 'utf8');

const targetStr = "- **Custom CMS (Admin):**";
const newBullet = `- **Component Management (HTML Partials):** To avoid code duplication (like Navbar, Footer, Product Cards) across multiple pages, we strictly use **Vite Build-Time HTML Includes** (via Vite plugins). Developers write modular \`.html\` components in a \`components/\` directory. During the build process, Vite compiles and merges these components into flat, standard HTML5 files. This provides a React-like developer experience (edit once, update everywhere) while delivering the 100% pure, framework-free HTML5/CSS3/JS output the client strictly demands.\n- **Custom CMS (Admin):**`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newBullet);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully added the Component Management strategy to GEMINI.md.");
} else {
    console.log("Error: Could not find the target string to replace.");
}
