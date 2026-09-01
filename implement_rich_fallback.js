const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// The logic block to replace
const oldLogic = `    toggleNode('rich-headline', productData.richContent.headline, (el) => el.innerText = productData.richContent.headline);
    toggleNode('rich-img-1', productData.richContent.image1, (el) => el.src = productData.richContent.image1);
    toggleNode('rich-img-2', productData.richContent.image2, (el) => el.src = productData.richContent.image2);
    
    // สำหรับ text block ที่อยู่รวมกันใน div เดียว (subheadline + desc)
    const textBlockParent = document.getElementById('rich-subheadline')?.parentElement;
    if (textBlockParent) {
       if (productData.richContent.subheadline || productData.richContent.description) {
           textBlockParent.style.display = '';
           const elSub = document.getElementById('rich-subheadline');
           if(elSub) {
             if(productData.richContent.subheadline) { elSub.innerText = productData.richContent.subheadline; elSub.style.display = ''; }
             else { elSub.style.display = 'none'; }
           }
           const elDesc = document.getElementById('rich-desc');
           if(elDesc) {
             if(productData.richContent.description) { elDesc.innerText = productData.richContent.description; elDesc.style.display = ''; }
             else { elDesc.style.display = 'none'; }
           }
       } else {
           textBlockParent.style.display = 'none';
       }
    }`;

const newLogic = `    // Fallback Logic: ถ้าไม่มีข้อมูลโฆษณาเฉพาะ ให้เอาชื่อและรายละเอียดหลักมาวนซ้ำ
    const finalHeadline = productData.richContent.headline || productData.name;
    const finalDesc = productData.richContent.description || productData.description;

    toggleNode('rich-headline', finalHeadline, (el) => el.innerText = finalHeadline);
    toggleNode('rich-img-1', productData.richContent.image1, (el) => el.src = productData.richContent.image1);
    toggleNode('rich-img-2', productData.richContent.image2, (el) => el.src = productData.richContent.image2);
    
    // สำหรับ text block ที่อยู่รวมกันใน div เดียว (subheadline + desc)
    const textBlockParent = document.getElementById('rich-subheadline')?.parentElement;
    if (textBlockParent) {
       if (productData.richContent.subheadline || finalDesc) {
           textBlockParent.style.display = '';
           const elSub = document.getElementById('rich-subheadline');
           if(elSub) {
             if(productData.richContent.subheadline) { elSub.innerText = productData.richContent.subheadline; elSub.style.display = ''; }
             else { elSub.style.display = 'none'; }
           }
           const elDesc = document.getElementById('rich-desc');
           if(elDesc) {
             if(finalDesc) { elDesc.innerText = finalDesc; elDesc.style.display = ''; }
             else { elDesc.style.display = 'none'; }
           }
       } else {
           textBlockParent.style.display = 'none';
       }
    }`;

js = js.replace(oldLogic, newLogic);
fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Implemented Fallback Logic for Rich Content");
