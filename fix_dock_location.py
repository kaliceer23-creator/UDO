with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# First, find the accidentally inserted dock in the JS section
dock_start = content.find('  <!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    dock_end = content.find('  </div>\n\n`;')
    if dock_end != -1:
        # Extract the dock HTML to reuse it
        dock_html = content[dock_start:dock_end + 9]
        # Remove it from the broken location
        content = content.replace(dock_html, '')
        
        # Now find the correct place to insert it: right before the actual end of the HTML string
        # The HTML string ends at `;`
        # Let's find: `</section>\n\n<!-- Footer -->` wait, there is a footer.
        footer_start = content.find('<!-- Footer -->')
        # We can just put the dock right before the closing backtick of innerHTML.
        # But we need to find the correct backtick. Let's look for `</footer>\n` or similar.
        correct_backtick_pos = content.find('</footer>\n')
        if correct_backtick_pos != -1:
            correct_end = content.find('`', correct_backtick_pos)
            if correct_end != -1:
                content = content[:correct_end] + dock_html.replace('\n`;', '') + "\n" + content[correct_end:]
                with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
                    f.write(content)
                print("Dock moved to correct HTML location.")
            else:
                print("Could not find backtick after footer")
        else:
            print("Could not find footer")
    else:
        print("Could not find end of broken dock")
else:
    print("Could not find broken dock")

