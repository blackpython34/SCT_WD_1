Gourmet Haven — Static Restaurant Webpage

This repository contains a professional, responsive, and interactive static restaurant webpage built with HTML, CSS, and vanilla JavaScript.

Key features
- Smooth scroll-driven background color interpolation (automatic color changes as you scroll).
- Crossfading background images that change automatically with scroll position.
- Animated sections using AOS (Animate On Scroll) library.
- Responsive layout and polished typography (Google Fonts).
- Menu items with descriptions, prices, and high-quality placeholder images.

Files of interest
- `index.html` — Main page markup.
- `css/styles.css` — Styling, layout, responsive rules and background layer styles.
- `js/main.js` — Scroll handling, color interpolation and image crossfade logic.
- `images/` — Place your local images here and reference them from `index.html` or `js/main.js`.

Run locally (quick)
1. Open `index.html` directly in your browser (works for basic testing).
2. For a more faithful experience (and to avoid any CORS/network issues), run a simple local static server:

```bash
# From the repository root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Add your own images
1. Copy your images into the `images/` folder. Example filenames:
	- `images/bruschetta.jpg`
	- `images/salmon.jpg`

2. Update image references in `index.html` (menu item thumbnails) to use local paths. Example:

```html
<img src="images/bruschetta.jpg" alt="Bruschetta">
```

3. If you'd like the background crossfade to use local images instead of remote Unsplash URLs, open `js/main.js` and replace the `image` values inside the `colorPalettes` array with local paths such as `images/bg-1.jpg`.

Customizing colors and transitions
- Primary theme color is controlled via the CSS custom property `--primary-color` (defined in `css/styles.css` or updated dynamically by `js/main.js`).
- Background transition timing is in `css/styles.css` (`.bg-layer` transition) and the scroll interpolation is implemented in `js/main.js`.
- To change the palette, edit the `colorPalettes` array in `js/main.js` — each entry supports `bg` (background color), `primary` (theme color), and `image` (optional background image).

Deploying to GitHub Pages
1. Ensure the repository is pushed to GitHub.
2. In your repository on GitHub, go to *Settings → Pages* and set the source to the `main` branch (root). Save.
3. After a few minutes your site will be available at `https://<your-username>.github.io/<repo-name>/`.

Commit & push example
```bash
git add .
git commit -m "Update site: add images / tweak colors / enable crossfade"
git push origin main
```

Troubleshooting
- If background images don't load locally, confirm the path is correct and that you're serving the site via an HTTP server (some browsers block local file access for certain features when opened via `file://`).
- If animations feel janky on older devices, reduce AOS duration or remove `once: true` in the AOS init in `js/main.js`.

Next steps (optional)
- Add a small build step to optimize and bundle images.
- Add a contact form (server or form provider) for reservations.
- Add light/dark mode toggle or a control to disable background images for low-data users.

Enjoy — open `index.html` and scroll to see the automatic color and background transitions in action!
