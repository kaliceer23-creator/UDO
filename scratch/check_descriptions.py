import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_descendants(root_id):
    desc = {root_id}
    added = True
    while added:
        added = False
        for cid, data in cats.items():
            if data['parent_id'] in desc and cid not in desc:
                desc.add(cid)
                added = True
    return desc

prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str = row.group(2)
        pid_str = row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            cid = int(cid_str)
            pid = int(pid_str)
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

products = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for m in re.finditer(r"\(([0-9]+),\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'(.*?)'|NULL)", line):
            pid = int(m.group(1))
            pname = m.group(2).replace("\\'", "'")
            short_desc = (m.group(3) or "").replace("\\'", "'")
            desc = (m.group(4) or "").replace("\\'", "'")
            products[pid] = {'id': pid, 'name': pname, 'short_desc': short_desc, 'desc': desc}

def is_spam(text):
    if not text: return False
    l = text.lower()
    return any(b in l for b in ['http:', 'https:', '.com', 'bitcoin', 'dating', 'viagra', 'casino', 'money', 'sex', 'porn', '@'])

targets = [312, 298, 327, 382, 398]
for rid in targets:
    desc_cids = get_descendants(rid)
    pids = [pid for pid, cids in prod_cats.items() if cids.intersection(desc_cids)]
    spam_cnt = 0
    empty_cnt = 0
    clean_cnt = 0
    for pid in pids:
        p = products.get(pid, {})
        d = (p.get('desc') or '') + ' ' + (p.get('short_desc') or '')
        if is_spam(d):
            spam_cnt += 1
        elif d.strip():
            clean_cnt += 1
        else:
            empty_cnt += 1
    print(f"Root {rid} ({cats.get(rid,{}).get('name')}): Total={len(pids)}, Clean={clean_cnt}, Spam={spam_cnt}, Empty={empty_cnt}")
