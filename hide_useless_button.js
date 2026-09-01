const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// Insert a check at the end of hydrateProduct to hide the fade if content is smaller than 500px
const findStr = `    updateDisplay();\n\n  }, 100);\n}`;
const newLogic = `    updateDisplay();

    // Hide read-more button entirely if content is short
    setTimeout(() => {
      const richContainer = document.getElementById('rich-content-container');
      const richFade = document.getElementById('rich-content-fade');
      if (richContainer && richFade) {
        if (richContainer.scrollHeight <= 500) {
          richFade.style.display = 'none';
          richContainer.style.maxHeight = 'none';
        } else {
          richFade.style.display = 'flex';
          richContainer.style.maxHeight = '500px';
        }
      }
    }, 300); // give images a bit of time to render height

  }, 100);
}`;

if(js.includes(findStr)) {
  js = js.replace(findStr, newLogic);
  fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
  console.log("Added logic to dynamically hide read-more if content is < 500px");
} else {
  console.log("Could not find string to replace");
}
