# How to explain this portfolio

## A 30-second explanation

“This is a two-page portfolio made with HTML, CSS and JavaScript. The home page introduces me, shows five projects at different stages, groups my skills and gives a way to contact me. The second page has my TV, anime, music, books and games with large artwork I supplied and short spoiler-free notes. I used an editorial layout with numbered sections, a serif heading font and a restrained accent colour. JavaScript handles the category buttons and the Copy email button. The site can be hosted on GitHub Pages because it consists of static files.”

## Walk through the code

1. **`index.html` is the home page.** Its `<main>` contains About, Projects, Skills and Contact. Links such as `href="#projects"` scroll to an element with `id="projects"`. The five project articles each describe the goal, my work and the tools; the labels make clear which ones are prototypes or local builds. The Outside class link opens `outside.html`.
2. **`outside.html` is the second page.** It has four groups of media entries and 21 image cards. Three groups start with the HTML `hidden` attribute, so TV is visible first. Books and games have separate subheadings inside one category. Images are local PNG files beside the HTML pages, with descriptive `alt` text and width/height attributes. The notes introduce each title without plot twists.
3. **`styles.css` controls the appearance.** `:root` defines reusable ink, paper and accent colours. The headings use the browser's Georgia font; the body uses a system font, so no font download is needed. Each media group changes two CSS variables for its background tint and accent. `.container` limits the width on large screens. CSS Grid creates the two-column project rows and media gallery; the first media entry is a larger feature. `object-fit: contain` keeps complete artwork visible. Under 760px, project rows and media cards stack; under 480px the skill rows stack too.
4. **`script.js` handles two small interactions.** The Copy email button uses the clipboard API. The category buttons set `aria-pressed` on the chosen button and `hidden` on the other groups. Each button is matched to a group by its `data-category` and the group’s `id`.
5. **`dev-server.js` is for local development.** It uses Node's built-in HTTP and file modules to serve the two HTML pages, CSS, JavaScript and the named PNG files. `package.json` maps `npm run dev` to that server. The public site does not need a running Node server.

## If your sir asks

- **Why a second page?** The required portfolio sections stay easy to find on the home page. The separate page gives my interests enough space to feel personal without making the homepage long.
- **Why no React?** The two pages and two interactions are simple enough for plain HTML, CSS and JavaScript. That keeps the code small and easy to explain.
- **Where is the JavaScript?** In `script.js`; it handles the Copy email button and shows one media group when a category button is clicked.
- **How is it responsive?** Both pages have a viewport meta tag and share the CSS media queries. The project rows and two-column media gallery change to one column below 760px, and the skill rows stack below 480px. The image frames scale with the available width, while text and the email link can wrap.
- **Why `npm run dev`?** It starts a local server at `http://localhost:3000` so I can work on the site in a browser. It does not mean the portfolio needs a backend in production.
- **How did you check it on a phone?** `npm run dev:phone` listens on the laptop's local network address, so a phone on the same Wi-Fi can open `http://<laptop IPv4 address>:3000`. The CSS media queries then choose the narrow-screen layout automatically.
- **What did AI do?** It helped draft and refine the code and wording. The subject matter comes from my actual projects and interests; I reviewed the final result and can explain how it works. The assignment permits AI coding assistance.

## Recheck before submission

| Assignment point | How to verify |
| --- | --- |
| About, two or more projects, Skills/Interests, Contact | Scroll through the home-page sections and second page; check the descriptions are accurate and sound like you. |
| HTML, CSS and JavaScript | Show `index.html`, `styles.css` and `script.js` in VS Code. |
| No broken links or buttons | Click each navigation link, all four category buttons, the GitHub links and Copy email. Check that the 21 local images load. Try the email link too. |
| Mobile layout | Open both pages at phone width and check there is no sideways scrolling. |
| Public hosting | Open the live URL in an incognito window without signing in. |
| Public source code | Open the portfolio repository URL in an incognito window. Your profile URL is not enough. |
| Submission | Send **both** URLs before October 17, 2026 at 11:59 PM. |
