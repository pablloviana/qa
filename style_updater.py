import os
import glob

html_files = glob.glob('*.html')

for html_file in html_files:
    if html_file in ['index.html', 'login.html', 'register.html']: # already updated
        continue

    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to insert the link to custom-premium.css right after styles.css
    target = '<link href="css/styles.css" rel="stylesheet" />'
    replacement = '<link href="css/styles.css" rel="stylesheet" />\n    <link href="css/custom-premium.css" rel="stylesheet" />'
    
    if target in content and 'custom-premium.css' not in content:
        content = content.replace(target, replacement)
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {html_file}")
    else:
        print(f"Skipped {html_file} (no target found or already updated)")
