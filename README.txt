Mongolian Family Tree Website
=============================

How to open:
1. Open index.html in a browser.
2. Enter the password: Лочин

How to upload to GitHub Pages:
1. Create a new GitHub repository.
2. Upload these extracted files, not the ZIP itself:
   - index.html
   - style.css
   - script.js
   - assets/
   - README.txt
3. Go to Settings > Pages.
4. Source: Deploy from branch.
5. Branch: main, folder: /root.

How to edit the password:
Open script.js and change:
const APP_PASSWORD = "Лочин";

How to edit family members:
Open script.js.
Look at section:
/* 1. Family data */

The current demo creates 100 people automatically:
- 50 bloodline people
- 50 spouse people

Each person has fields like:
id, name, gender, type, parentIds, spouseId, childrenIds, generation, birthYear, birthplace, ovog, branch, bio, photos, events.

How to change the background:
Replace this file:
assets/mongolian-background.png

How to change the golden gerege card decoration:
Replace this file:
assets/gerege.png

Features included:
- Password entry screen
- Password: Лочин
- Mongolian background visible behind tree
- Big gold circles for bloodline people
- Smaller silver circles for spouses
- Tree grows upward from founder roots
- Hover zoom/glow animation
- Click person to open rolling golden gerege profile card
- Relationship path
- Bloodline highlight
- Search person
- Tree View / Timeline View
- Zoom in / zoom out / reset
- Mini map
- Front-end Add Child/Add Spouse/Add Parent demo
- Print / PDF via browser print

Code organization:
index.html keeps only page structure.
style.css contains all visual styling with sections.
script.js contains all data, rendering, interaction, search, timeline, minimap, and utility logic with clear comments.
