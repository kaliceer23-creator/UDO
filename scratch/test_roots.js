const fs = require('fs');
const db = JSON.parse(fs.readFileSync('frontend/src/welding_products.json', 'utf8'));

const roots = [
  { id: 12, name: 'กลุ่มลวดเชื่อม' },
  { id: 298, name: 'ใบตัดใบเจียร' },
  { id: 312, name: 'อุปกรณ์เชื่อมตัดเผาแก๊ส' },
  { id: 327, name: 'ท่อบรรจุก๊าซ และวาล์ว' },
  { id: 339, name: 'เครื่องเชื่อมและเครื่องตัดพลาสม่า' },
  { id: 344, name: 'อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม' },
  { id: 382, name: 'วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม' },
  { id: 398, name: 'เครื่องมือช่าง' }
];

roots.forEach(r => {
  const matches = db.filter(p => p.categories && p.categories.some(c => c.url_slug === 'cat-' + r.id || c.name.includes(r.name)));
  console.log(r.name, '(', r.id, ') -> count:', matches.length);
});
