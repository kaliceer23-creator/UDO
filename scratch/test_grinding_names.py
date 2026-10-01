from scratch.inspect_abrasives_deep import products_raw

wrongly_classified = []
for p in sorted(products_raw.values(), key=lambda x: x['id']):
    name = p['name']
    if 'เจียร' in name:
        wrongly_classified.append(name)

print(f"Total products with 'เจียร' in name: {len(wrongly_classified)}")
for name in wrongly_classified:
    print(" ", name)
