const fs = require('fs');
const db = JSON.parse(fs.readFileSync('frontend/src/welding_products.json', 'utf8'));

const hasMat = (p, target) => {
  const m = p.filter_attributes?.material;
  if (Array.isArray(m)) return m.includes(target);
  return m === target || (typeof m === 'string' && m.includes(target));
};

// 1. Welding Best Sellers (Diverse Mix across 8 welding types)
const weldingSubgroups = [
  { name: 'เชื่อมเหล็ก', filter: (p) => hasMat(p, 'เหล็ก') || /(RB-26|LB-52|KOBE-30|FT-51|L-55|TG-S50|SM-70|ER70S-6|E6013|E7016|E7018)/i.test(p.name) },
  { name: 'เชื่อมสแตนเลส', filter: (p) => hasMat(p, 'สแตนเลส') || /(สแตนเลส|สเตนเลส|308|309|310|312|316)/i.test(p.name) },
  { name: 'เชื่อมอลูมิเนียม', filter: (p) => hasMat(p, 'อลูมิเนียม') || /(อลูมิเนียม|4043|5356)/i.test(p.name) },
  { name: 'เชื่อมเหล็กหล่อ', filter: (p) => hasMat(p, 'เหล็กหล่อ') || /(เหล็กหล่อ|CIN-1|CIN-2|Ni-CI|NiFe-CI)/i.test(p.name) },
  { name: 'เชื่อมทองเหลือง-ทองแดงและเงิน', filter: (p) => hasMat(p, 'ทองเหลือง / ทองแดง') || hasMat(p, 'เงินประสาน') || /(ทองเหลือง|ทองแดง|เงิน|Bronze)/i.test(p.name) },
  { name: 'เชื่อมพอกผิวแข็ง', filter: (p) => hasMat(p, 'พอกผิวแข็ง') || /(พอกแข็ง|พอกผิวแข็ง|HARDFACING|HF-|H-)/i.test(p.name) },
  { name: 'เชื่อมตัดเซาะร่อง', filter: (p) => hasMat(p, 'ตัดเซาะร่อง') || /(เซาะร่อง|ตัดเซาะร่อง|CHAMFERTRODE|ARCAIR)/i.test(p.name) },
  { name: 'เชื่อมวัสดุเกรดพิเศษ', filter: (p) => hasMat(p, 'โลหะเกรดพิเศษ (นิเกิล/โคบอลต์)') || /(นิเกิล|Cobalt|Stellite|INCONEL|ทังสเตน)/i.test(p.name) }
];

const allWires = db.filter(p => p.categories && p.categories.some(c => c.name.includes('ลวดเชื่อม') || c.url_slug.includes('wire') || c.url_slug === 'cat-12'));

function getDiverseWeldingBestSellers() {
  const pools = weldingSubgroups.map(grp => {
    return allWires.filter(p => grp.filter(p)).sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
  });

  const result = [];
  const used = new Set();

  // Round-robin selection across all 8 welding subgroups
  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < pools.length; i++) {
      const candidate = pools[i].find(p => !used.has(p.id));
      if (candidate) {
        used.add(candidate.id);
        result.push({ group: weldingSubgroups[i].name, name: candidate.name, sold: candidate.sold_count });
        if (result.length >= 10) return result;
      }
    }
  }
  return result;
}

console.log('--- Track 1: ลวดเชื่อมขายดี (Diverse 10 items) ---');
console.log(getDiverseWeldingBestSellers());

// 2. Store Best Sellers (Diverse Mix across 8 Root Departments)
const storeRoots = [
  { name: 'เครื่องเชื่อม', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-339' || c.name.includes('เครื่องเชื่อมและเครื่องตัดพลาสม่า')) },
  { name: 'เครื่องมือช่าง', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-398' || c.name.includes('เครื่องมือช่าง')) },
  { name: 'อุปกรณ์แก๊ส', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-312' || c.name.includes('อุปกรณ์เชื่อมตัดเผาแก๊ส')) },
  { name: 'ใบตัดใบเจียร', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-298' || c.name.includes('ใบตัดใบเจียร')) },
  { name: 'อะไหล่สิ้นเปลือง', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-344' || c.name.includes('อะไหล่สิ้นเปลือง')) },
  { name: 'เคมีภัณฑ์', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-382' || c.name.includes('เคมีภัณฑ์')) },
  { name: 'ท่อก๊าซและวาล์ว', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-327' || c.name.includes('ท่อบรรจุก๊าซ')) },
  { name: 'ลวดเชื่อม', filter: p => p.categories && p.categories.some(c => c.url_slug === 'cat-12' || c.name.includes('ลวดเชื่อม')) }
];

function getDiverseStoreBestSellers() {
  const pools = storeRoots.map(dept => {
    return db.filter(p => dept.filter(p)).sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
  });

  const result = [];
  const used = new Set();

  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < pools.length; i++) {
      const candidate = pools[i].find(p => !used.has(p.id));
      if (candidate) {
        used.add(candidate.id);
        result.push({ dept: storeRoots[i].name, name: candidate.name, sold: candidate.sold_count });
        if (result.length >= 10) return result;
      }
    }
  }
  return result;
}

console.log('\n--- Track 2: สินค้าขายดี (Diverse Store 10 items) ---');
console.log(getDiverseStoreBestSellers());
