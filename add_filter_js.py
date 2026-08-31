filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

js_logic = """
  // Filter Dropdown Click Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allDropdowns = document.querySelectorAll('.filter-dropdown');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      
      // Close all other dropdowns
      allDropdowns.forEach(dd => {
        if (dd !== dropdown) dd.classList.add('hidden');
      });

      // Toggle current dropdown
      dropdown.classList.toggle('hidden');
    });
  });

  // Prevent dropdown from closing when clicking inside it
  allDropdowns.forEach(dd => {
    dd.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    allDropdowns.forEach(dd => dd.classList.add('hidden'));
  });
"""

# Insert js_logic just before the final `}, 100);`
content = content.replace('}, 100);', js_logic + '\n}, 100);')

with open(filepath, 'w') as f:
    f.write(content)

print("Added Filter JS logic")
