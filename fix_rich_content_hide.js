const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

const oldLogic = `    // Rich Content Hide/Show Logic
    const el_rich_headline = document.getElementById('rich-headline');
    if(el_rich_headline) {
      if(productData.richContent.headline) { el_rich_headline.innerText = productData.richContent.headline; el_rich_headline.style.display = 'block'; }
      else { el_rich_headline.style.display = 'none'; }
    }
    const el_rich_img1 = document.getElementById('rich-img-1');
    if(el_rich_img1) {
      if(productData.richContent.image1) { el_rich_img1.src = productData.richContent.image1; el_rich_img1.style.display = 'block'; }
      else { el_rich_img1.style.display = 'none'; }
    }
    const el_rich_img2 = document.getElementById('rich-img-2');
    if(el_rich_img2) {
      if(productData.richContent.image2) { el_rich_img2.src = productData.richContent.image2; el_rich_img2.style.display = 'block'; }
      else { el_rich_img2.style.display = 'none'; }
    }
    const el_rich_subheadline = document.getElementById('rich-subheadline');
    if(el_rich_subheadline) {
      if(productData.richContent.subheadline) { el_rich_subheadline.innerText = productData.richContent.subheadline; el_rich_subheadline.style.display = 'block'; }
      else { el_rich_subheadline.style.display = 'none'; }
    }
    const el_rich_desc = document.getElementById('rich-desc');
    if(el_rich_desc) {
      if(productData.richContent.description) { el_rich_desc.innerText = productData.richContent.description; el_rich_desc.style.display = 'block'; }
      else { el_rich_desc.style.display = 'none'; }
    }
    const el_rich_img3 = document.getElementById('rich-img-3');
    if(el_rich_img3) {
      if(productData.richContent.image3) { el_rich_img3.src = productData.richContent.image3; el_rich_img3.style.display = 'block'; }
      else { el_rich_img3.style.display = 'none'; }
    }`;

const newLogic = `    // Rich Content Hide/Show Logic (Hiding Parent Wrappers to avoid empty borders)
    const toggleNode = (id, hasData, callback) => {
      const el = document.getElementById(id);
      if(!el) return;
      // ถ้าเป็น img ให้ซ่อน div ที่ครอบมันอยู่ (parentElement) ถ้าเป็น text ซ่อนตัวเอง หรือตัวครอบ
      const targetHide = (el.tagName === 'IMG') ? el.parentElement : el;
      if(hasData) {
        callback(el);
        targetHide.style.display = '';
      } else {
        targetHide.style.display = 'none';
      }
    };

    toggleNode('rich-headline', productData.richContent.headline, (el) => el.innerText = productData.richContent.headline);
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
    }

    toggleNode('rich-img-3', productData.richContent.image3, (el) => el.src = productData.richContent.image3);
`;

js = js.replace(oldLogic, newLogic);
fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Fixed wrapper hiding logic");
