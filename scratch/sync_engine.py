with open('udo_migration_engine.py', 'r', encoding='utf-8') as f:
    orig_lines = f.readlines()

# Find line where `audit_rows = []` is
head_lines = []
for line in orig_lines:
    head_lines.append(line)
    if "audit_rows = []" in line:
        break

with open('scratch/test_welding_migration.py', 'r', encoding='utf-8') as f:
    test_lines = f.readlines()

# Extract from line 95 (`for line in sql_text.split('\n'):`) to line 250 (`pos += 1`)
loop_lines = []
in_loop = False
for line in test_lines:
    if line.startswith("for line in sql_text.split('\\n'):"):
        in_loop = True
    if in_loop:
        if line.startswith("print(f\"\\nPROCESSED PRODUCTS"):
            break
        
        # When we find `products_out.append(product_obj)`, we also append to audit_rows
        if "products_out.append(product_obj)" in line:
            audit_entry = """                    prices = [v["price"] for v in prod_variants if v.get("price")]
                    min_price = min(prices) if prices else 0.0
                    max_price = max(prices) if prices else 0.0
                    category_path = " > ".join([c["name"] for c in cat_tree])
                    audit_rows.append({
                        "product_id": f"udo-{p_id}",
                        "legacy_id": p_id,
                        "name": name,
                        "brand": brand_name,
                        "audit_status": audit_meta["status"],
                        "audit_flag": audit_meta["flag"],
                        "reason_th": audit_meta["reason_th"],
                        "variants_count": len(prod_variants),
                        "min_price": min_price,
                        "max_price": max_price,
                        "specs_count": len(commercial_specs),
                        "tables_count": len(cleaned_tables),
                        "images_count": len(formatted_images),
                        "rich_images_count": len(rich_images),
                        "category_path": category_path
                    })
"""
            loop_lines.append(audit_entry)
        
        # In test_welding_migration, target_pids was called welding_pids
        line_mod = line.replace("welding_pids", "target_pids")
        # Add 4 spaces for function indentation
        loop_lines.append("    " + line_mod)

tail = """
    # Write JSON output to primary destination
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Successfully wrote {len(products_out)} products to {OUTPUT_PATH}")

    # Dual-write to pilot_products_5.json for seamless compatibility
    pilot_path = 'frontend/src/pilot_products_5.json'
    with open(pilot_path, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Successfully dual-wrote {len(products_out)} products to {pilot_path}")

    # Write CSV audit report with utf-8-sig (Excel friendly)
    fieldnames = [
        "product_id", "legacy_id", "name", "brand", "audit_status",
        "audit_flag", "reason_th", "variants_count", "min_price",
        "max_price", "specs_count", "tables_count", "images_count",
        "rich_images_count", "category_path"
    ]
    with open(CSV_PATH, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(audit_rows)
    print(f"Successfully generated CSV audit report: {CSV_PATH}")

    print("\\n--- MIGRATION AUDIT SUMMARY ---")
    print(f"Total welding products processed: {len(products_out)}")
    print("Audit status breakdown:")
    for st, cnt in audit_stats.items():
        pct = (cnt * 100.0 / len(products_out)) if products_out else 0
        print(f"  {st}: {cnt} ({pct:.1f}%)")
    print("\\nAudit flags breakdown:")
    for fl, cnt in audit_flags.items():
        print(f"  {fl}: {cnt}")

if __name__ == '__main__':
    run_migration()
"""

new_content = "".join(head_lines) + "\n" + "".join(loop_lines) + tail

with open('udo_migration_engine.py', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Generated new udo_migration_engine.py successfully")
