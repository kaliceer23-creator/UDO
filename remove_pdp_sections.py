import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# We need to remove everything starting from <!-- Warranty --> all the way to just before </div> </div> </div> </div> </main>
# Let's find the exact blocks.
start_idx = content.find('            <!-- Warranty -->')

# The end of the right column is the last </div> before </div> </div> </main>
# Let's search for "<!-- Free Gifts -->" and find its end.
end_idx = content.find('          </div>\n        </div>\n      </div>\n    </main>')

if start_idx != -1 and end_idx != -1:
    # Slice it out
    new_content = content[:start_idx] + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_content)
    print("Removed all specified sections successfully.")
else:
    print("Could not find start or end index.")

