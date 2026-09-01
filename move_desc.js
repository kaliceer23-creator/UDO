const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// 1. Extract the feature text block
const textBlockRegex = /<!-- Feature Text Block -->\s*<div class="mb-8">\s*<h4 id="rich-subheadline"[^>]*>.*?<\/h4>\s*<p id="rich-desc"[^>]*>[\s\S]*?<\/p>\s*<\/div>/;
const match = html.match(textBlockRegex);

if (match) {
  const textBlock = match[0];
  
  // 2. Remove it from the old location
  html = html.replace(textBlockRegex, '');
  
  // 3. Inject it right below the headline
  const headlineRegex = /<!-- Headline -->\s*<h3 id="rich-headline"[^>]*>[\s\S]*?<\/h3>/;
  html = html.replace(headlineRegex, match => `${match}\n          \n          ${textBlock}`);
  
  fs.writeFileSync('frontend/product.html', html, 'utf8');
  console.log("Moved Feature Text Block directly under the Headline");
} else {
  console.log("Could not find the text block!");
}
