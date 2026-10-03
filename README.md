# Ryan's portfolio

A two-page personal portfolio in HTML, CSS and JavaScript. It has five selected projects, grouped skills, contact details and an illustrated page for interests outside class. No framework, template or npm packages are used.

**Live site:** https://ryancfe.github.io/Personal_Portfolio/  
**Outside class:** https://ryancfe.github.io/Personal_Portfolio/outside.html  
**Source code:** https://github.com/RyanCfe/Personal_Portfolio

## Run it on your laptop

1. Install Node.js if it is not already installed. In a terminal, check with `node --version`.
2. Open the `ryan-portfolio` folder in VS Code. Open **Terminal → New Terminal**.
3. Run `npm run dev`. There is no `npm install` step because the project has no dependencies.
4. Visit **http://localhost:3000** in your browser. Keep the terminal open while using the site.
5. Edit and save `index.html`, `outside.html`, `styles.css`, or `script.js`, then refresh the browser. Keep the PNG files beside the HTML files so the images load. Press **Ctrl+C** in the terminal to stop the server.

In Windows PowerShell, if `npm` reports a script execution policy error, use `npm.cmd run dev` or `node dev-server.js` instead.

## Open it on your phone before publishing

1. Connect your phone and laptop to the same trusted Wi-Fi network.
2. In the VS Code terminal, stop `npm run dev` with **Ctrl+C** if it is running. Start `npm run dev:phone` instead. In PowerShell you can use `npm.cmd run dev:phone` if needed.
3. In a second PowerShell terminal on the laptop, run `ipconfig`. Under your active **Wi-Fi adapter**, find **IPv4 Address** (for example, `192.168.1.42`).
4. On your phone, type `http://192.168.1.42:3000` into the browser, replacing the example with **your laptop's actual IPv4 address**. Keep the server terminal open.

`localhost` on your phone means the phone itself, so it will not open the laptop site. If Windows asks about network access, allow access on a private network only. If the phone cannot connect, check that both devices are on the same Wi-Fi and that no other app is using port 3000. Some college or public Wi-Fi networks keep devices apart; in that case, try a trusted home network or check the hosted GitHub Pages link once published. Press **Ctrl+C** to turn off phone preview when finished.

## What each file does

| File | Purpose |
| --- | --- |
| `index.html` | The portfolio home page: About, Projects, Skills and Contact. |
| `outside.html` | The second page: TV, anime, music, books and games with spoiler-free notes. |
| `*.png` | The 21 images Ryan provided, renamed by title and copied without edits. |
| `styles.css` | Typography, colours, grids and phone-sized layout. |
| `script.js` | Runs the **Copy email** button and the category buttons on the second page. |
| `dev-server.js` | Serves both pages, CSS, JavaScript and local images at `localhost:3000` while developing. |
| `package.json` | Defines the `npm run dev` command. |
| `HOW_TO_EXPLAIN.md` | A short code walkthrough and assignment checklist. |
| `MEDIA_CREDITS.md` | Matches each supplied image to its title and records the title-check references. |

The finished site is static. `dev-server.js` runs only on your laptop; GitHub Pages serves the HTML, CSS, JavaScript and PNG files directly.

## Before submission

- Read the About, project and Outside class text in your own voice. The project descriptions distinguish local builds and prototypes from finished public work. The media page uses your latest list and images; change anything you would rather keep off a public site.
- Only the Netflix project links to code. Add links for other projects if you publish their repositories; avoid linking to private work or claiming a prototype is complete.
- The contact section shows `ryanneshar1@gmail.com` and `https://github.com/RyanCfe` publicly. Change them in `index.html` if you want different public contact details.
- Test the navigation, category buttons, image loading and copy button. Resize both pages to phone width and check there is no horizontal scroll.

## Submit the assignment

Submit the **live site** and **source code** links above through the class portal by **October 17, 2026, 11:59 PM**. The repository is public, and GitHub Pages deploys from `main` at `/(root)`. Check both links in a private/incognito window before submitting. Changes pushed after the deadline will not be marked.

### Artwork and writing credits

Ryan supplied all 21 PNG files. The table credits the work and its creator or publisher for every file. These links are **creator references, not verified download sources for the exact uploaded PNGs**: the original image URLs and reuse terms were not supplied. The artwork remains with its respective rights holders. [MEDIA_CREDITS.md](MEDIA_CREDITS.md) also maps each file to Ryan's upload and notes when an adaptation image accompanies a book or song entry.

| Image file | Work and creator / publisher reference |
| --- | --- |
| `andor.png` | [Andor — Lucasfilm / Star Wars](https://www.starwars.com/series/andor/) |
| `chernobyl.png` | [Chernobyl — HBO](https://www.hbo.com/series) |
| `over-the-garden-wall.png` | [Over the Garden Wall — Cartoon Network](https://www.youtube.com/watch?v=MchGCjJMv3E) |
| `arcane.png` | [Arcane — Riot Games, Fortiche and Netflix](https://www.netflix.com/tudum/arcane) |
| `moon-knight.png` | [Moon Knight — Marvel Studios / Disney](https://news.disney.com/marvel-studios-moon-knight) |
| `attack-on-titan.png` | [Attack on Titan — official anime portal](https://aot-portal.com/about/) |
| `violet-evergarden.png` | [Violet Evergarden — Kyoto Animation](https://tv.violet-evergarden.jp/) |
| `one-piece.png` | [One Piece — official anime site](https://one-piece.com/anime/index.html) |
| `haikyu.png` | [Haikyu!! — official anime site](https://haikyu.jp/) |
| `code-geass.png` | [Code Geass — SUNRISE / PROJECT GEASS](https://geass.jp/first/) |
| `legend-of-the-galactic-heroes.png` | [Legend of the Galactic Heroes — original anime site](https://www.ginei.jp/index.php) |
| `shelter.png` | [Shelter — Porter Robinson, Madeon and A-1 Pictures](https://sheltertheanimation.com/) |
| `who-am-i.png` | [Who Am I — Casting Crowns](https://www.youtube.com/watch?v=3rT8Re1EIQc); supplied image is album art |
| `love-that-binds-us.png` | [The Love That Binds Us — Evan Call / Violet Evergarden](https://tv.violet-evergarden.jp/music/); supplied image is from the anime |
| `random-access-memories.png` | [Random Access Memories — Daft Punk](https://www.daftpunk.com/randomaccessmemories/) |
| `the-hunger-games.png` | [The Hunger Games — Suzanne Collins / Scholastic](https://www.scholastic.com/newsroom/online-press-kits/hunger-games-series.html) |
| `a-week-in-winter.png` | [A Week in Winter — Marcia Willett / Hachette](https://www.hachette.com.au/marcia-willett/a-week-in-winter-a-moving-tale-of-a-family-in-turmoil-in-the-west-country) |
| `the-chronicles-of-narnia.png` | [The Chronicles of Narnia — C. S. Lewis](https://www.cslewis.com/us/about-cs-lewis/); supplied image is adaptation artwork |
| `the-house-in-fata-morgana.png` | [The House in Fata Morgana — NOVECT](https://novect.net/fatamorgana/) |
| `south-of-the-circle.png` | [South of the Circle — State of Play / 11 bit studios](https://11bitstudios.com/games/south-of-the-circle/) |
| `dispatch.png` | [Dispatch — AdHoc Studio](https://adhocstudio.com/) |

The short personal notes were drafted with AI assistance, Ryan's selected media and earlier preferences, and positive reviews linked in `MEDIA_CREDITS.md`. No review wording, external template or code snippet was copied. Review the first-person text before publishing to be sure it sounds like you.
