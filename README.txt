Mongolian Clean Family Tree Website

Password:
Лочин

How to open:
1. Open index.html in a browser.
2. Enter the password.
3. Drag the tree to move around.
4. Use + / - to zoom.
5. Click a person to open the golden gerege card.

How to upload to GitHub Pages:
1. Extract this ZIP.
2. Upload index.html, style.css, script.js, README.txt, and the assets folder to your repository.
3. Go to Settings > Pages.
4. Choose Deploy from branch, main, /root.
5. Save.

How to edit people:
Open script.js and edit the familyData section.
The current known logic uses 41 bloodline people:
- 2 founders
- 11 children
- one continuing branch with 8 children
- deeper branches based on the structure you described

Important files:
index.html = page structure only
style.css = design and animations
script.js = family data, layout logic, drag/zoom, click card, search
assets/mongolian-background.png = local Mongolian background image

To change password:
Open script.js and edit:
const APP_PASSWORD = "Лочин";
