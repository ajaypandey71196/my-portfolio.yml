# Apni Website Kaise Edit Karein (Simple Guide)

Aapko coding nahi aati, koi baat nahi — is guide mein sab kuch step-by-step diya hai.
Aapki website 3 files se banti hai:

- `index.html` → website ka saara **content/text** (projects, skills, certifications, experience)
- `styles.css` → website ka **look** (colors, spacing, fonts) — isse chhedne ki zarurat nahi hai
- `script.js` → website ka **behaviour** (menu, animations, photo upload) — isse bhi chhedne ki zarurat nahi

Aapko sirf `index.html` mein text change karna hoga. Baaki 2 files ko chhoo mat.

## Kis app se edit karein?

- **VS Code** (free, sabse aasan) — download: https://code.visualstudio.com
- Ya phir Notepad / Notepad++ se bhi chal jayega
- File open karne ke liye: VS Code kholo → File → Open Folder → apni website wala folder select karo

---

## 1. Naya Project Add Karna Hai

`index.html` file mein `<!-- Projects -->` likha hua dhundo (Ctrl+F se search karo).
Wahan aapko 3 project cards dikhenge, har ek `<article class="project-card"> ... </article>` ke beech mein.

**Naya project add karne ke liye:**
1. Kisi bhi ek poore `<article class="project-card">` se `</article>` tak wala block copy karo
2. Uske turant baad paste kar do
3. Ab paste kiye hue naye block mein sirf ye cheezein badlo:
   - `project-badge` wali line ke andar ka text (jaise "AWS · Docker")
   - `project-title` wali line ke andar ka title
   - `project-desc` wale paragraph ka text
   - `project-meta` ke andar ke `<span>` tags (skills/tools ke naam)
   - Agar chaho to GitHub link (`href="..."`) bhi apne actual project ke link se badal do

**Project delete karna ho** to us poore `<article class="project-card"> ... </article>` block ko select karke delete kar do.

---

## 2. Naya Skill Add Karna Hai

`<!-- Skills -->` dhundo. Har skill ek `<div class="skill-card"> ... </div>` block hai.

- Naya skill card add karne ke liye koi ek `skill-card` block copy-paste karo, phir emoji (icon), title, aur `<span class="skill-tag">` wale tags ka text badal do.
- Ek naya tag add karna ho to bas ek naya `<span class="skill-tag">Naya Tool</span>` line add kar do.

---

## 3. Nayi Certification Add Karna Hai

`<!-- Certifications -->` dhundo. Har certificate ek `<div class="cert-card"> ... </div>` hai.

- Copy-paste karke `cert-title`, `cert-desc`, aur `cert-badge` (jaise saal ya "In Progress") ka text badal do.

---

## 4. Experience/Naukri Update Karni Hai

`<!-- Experience -->` dhundo. Har company ek `<div class="timeline-item"> ... </div>` hai.

- `timeline-role` = job title
- `timeline-meta` = company aur dates
- `timeline-points` ke andar `<li>` lines = aapke kaam ke bullet points

Naya job add karna ho to poora `timeline-item` block copy-paste karke details badal do.

---

## 5. Apni Profile Photo Lagana (Permanent — Sabko Dikhegi)

Website ke hero card mein jahan "AP" likha hua dikhta hai, wahan aapki photo lagane ke 2 tareeke hain:

### Tareeka A — Sabke liye permanent (recommended)
1. Apni photo ka naam rakho: `profile.jpg`
2. Us photo ko website ke root folder mein daal do — wahi folder jahan `index.html` hai
3. Bas! Website automatically wahi photo dikhayegi, kyunki code mein pehle se `profile.jpg` likha hua hai

### Tareeka B — Sirf browser mein preview (permanent nahi)
Website par avatar ("AP" wala box) par click karke photo upload kar sakte ho — ye sirf **aapke us specific browser/device** mein save hoti hai (localStorage). Doosre visitors ya doosre device par ye photo nahi dikhegi. Ye sirf quick preview ke liye hai — agar sabko dikhani hai to Tareeka A use karo.

---

## 6. Resume Download Button

Header aur hero section mein "Resume" / "Download Resume" button hai jo `assets/Ajay_Pandey_DevOps_Resume.pdf` file ko download karta hai.

**Apna resume update karna ho:**
1. Apni nayi resume PDF ka naam rakho: `Ajay_Pandey_DevOps_Resume.pdf`
2. Us file ko `assets` folder ke andar daal do, purani wali replace karke
3. Bas — button automatically nayi file download karayega, HTML mein kuch badalne ki zarurat nahi

(Naam ya path badalna ho to `index.html` mein Ctrl+F se `Ajay_Pandey_DevOps_Resume.pdf` search karke saari 3 jagah update kar do — header button, hero button, aur mobile menu button.)

---

## 7. Website Ko Live/Publish Kaise Karein

Agar abhi tak site sirf aapke computer par hai, in mein se koi bhi free option try kar sakte ho:

- **Netlify Drop**: https://app.netlify.com/drop → poora folder drag-drop karo, turant live link mil jayega
- **GitHub Pages**: GitHub par repository banao, files upload karo, Settings → Pages se enable karo
- **Vercel**: https://vercel.com → similar drag-drop / GitHub import process

---

## Quick Tips

- Hamesha ek chhota sa change karke browser mein (index.html file ko double-click karke) check kar lo ki sahi dikh raha hai
- Kisi bhi tag ko delete karte waqt uska matching closing tag (`</div>`, `</article>` etc.) bhi zaroor delete karo, warna layout bigad sakta hai
- Confuse ho jao to bhi tension mat lo — file ka backup rakho copy karke, phir freely experiment karo
