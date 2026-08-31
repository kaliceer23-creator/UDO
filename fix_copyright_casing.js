const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldText = 'Copyright &copy; 2019 UDO WELDING WIRE CENTER. All rights reserved.';
const newText = '&copy; Copyright 2019 UDO Welding Wire Center. All Rights Reserved.';

if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Copyright typography updated to standard.");
} else {
    console.log("Could not find the old copyright text.");
}
