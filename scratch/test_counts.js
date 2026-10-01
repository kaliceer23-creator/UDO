const fs = require('fs');
const db = JSON.parse(fs.readFileSync('frontend/src/welding_products.json', 'utf8'));

const hasMat = (p, target) => {
  const m = p.filter_attributes?.material;
  if (Array.isArray(m)) return m.includes(target);
  return m === target || (typeof m === 'string' && m.includes(target));
};

const weldingSubgroups = {
  'เชื่อมเหล็ก': {
    cid: 269,
    filter: (p) => hasMat(p, 'เหล็ก') || /(RB-26|LB-52|KOBE-30|FT-51|L-55|TG-S50|SM-70|ER70S-6|E6013|E7016|E7018|71T|S-12|S-14|S-6013|YW-71|MG-50|MG-51|SUPERWELD|GEMINI G-303|เหล็กเหนียว)/i.test(p.name)
  },
  'เชื่อมสแตนเลส': {
    cid: 263,
    filter: (p) => hasMat(p, 'สแตนเลส') || /(สแตนเลส|สเตนเลส|308|309|310|312|316|347|410|430|680)/i.test(p.name)
  },
  'เชื่อมอลูมิเนียม': {
    cid: 278,
    filter: (p) => hasMat(p, 'อลูมิเนียม') || /(อลูมิเนียม|Zinal|ZINAL|4043|5356)/i.test(p.name)
  },
  'เชื่อมเหล็กหล่อ': {
    cid: 265,
    filter: (p) => hasMat(p, 'เหล็กหล่อ') || /(เหล็กหล่อ|NICAST|Ni-CI|NiFe-CI)/i.test(p.name)
  },
  'เชื่อมทองเหลือง-ทองแดงและเงิน': {
    cid: 293,
    filter: (p) => hasMat(p, 'ทองเหลือง / ทองแดง') || hasMat(p, 'เงินประสาน') || /(ทองเหลือง|ทองแดง|เงิน|Bronze|BRONZE|ERCu|Cu 112|Cu 114|NCS-M|MC-Cu|PHOSBRAZ|BRAZARGENT|BCuP|BAg)/i.test(p.name)
  },
  'เชื่อมพอกผิวแข็ง': {
    cid: 273,
    filter: (p) => hasMat(p, 'พอกผิวแข็ง') || /(พอกแข็ง|พอกผิวแข็ง|HARDFACING|TUBUROD|HF-|H-250|H-350|H-450|H-600|H-800|SC-450|SC-600|SC-700|HB68|HBA|Fe14|Fe15|CrCW|CrC)/i.test(p.name)
  },
  'เชื่อมตัดเซาะร่อง': {
    cid: 267,
    filter: (p) => hasMat(p, 'ตัดเซาะร่อง') || /(เซาะร่อง|ตัดเซาะร่อง|CHAMFERTRODE|C&G)/i.test(p.name)
  },
  'เชื่อมวัสดุเกรดพิเศษ': {
    cid: 271,
    filter: (p) => hasMat(p, 'โลหะเกรดพิเศษ (นิเกิล/โคบอลต์)') || /(นิเกิล|Cobalt|Stellite|สเตลไลท์|INCONEL|FM 82|FM 625|FM C-276|FM 622|NI59|ST-82|ST-276|ST-9010|KW-T82|ทังสเตน|WL20)/i.test(p.name)
  }
};

const allWire = db.filter(p => 
  p.categories && p.categories.some(c => c.name.includes('ลวดเชื่อม') || c.url_slug.includes('wire') || c.url_slug === 'cat-12')
);

for (const [name, grp] of Object.entries(weldingSubgroups)) {
  const subMatched = allWire.filter(p => 
    (p.categories && p.categories.some(c => c.url_slug === 'cat-' + grp.cid || c.name === name)) ||
    grp.filter(p)
  );
  console.log(name, '-> count:', subMatched.length);
}
