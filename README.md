# Lucy Shaffer: Portfolio

A personal portfolio site for a Broadcast & Digital Journalism student. It's plain HTML/CSS/JS, so there's no build step. Edit the files and refresh.

## Files
- `index.html`: all the content (about, work, resume, contact). **This is the file you'll edit most.**
- `styles.css`: design. Change the colors at the top (`:root`) to re-theme everything.
- `script.js`: menu, work filters, ticker, animations. No need to touch it.
- `assets/img/`: put photos here.
- `assets/docs/`: put your resume PDF here.

## Make it yours (checklist)
1. **Fill in placeholders.** Search `index.html` for `[` and replace every `[bracketed]` item with your real info.
2. **Headshot:** save it as `assets/img/headshot.jpg` (a portrait crop works best). It shows up automatically.
3. **Resume PDF:** save it as `assets/docs/Lucy-Shaffer-Resume.pdf`.
4. **Demo reel:** upload to YouTube (unlisted is fine), then in the Work section uncomment the `<iframe>`, paste your video ID, and delete the placeholder `<div>`.
5. **Work cards:** set each card's `href="#"` to the real link. Add a thumbnail with `<img src="assets/img/clip1.jpg" alt="...">` inside `.card-thumb`. Set `data-category` to `broadcast`, `digital`, `writing` or `audio` so the filters work. Copy a whole `<article>` to add more.
6. **Ticker:** edit the "LATEST" items near the top with recent wins.
7. **Socials:** replace the `#` links in Contact, or delete any you don't use.

## Preview locally
Open `index.html` in your browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publish free with GitHub Pages
1. Merge this branch into `main`.
2. On GitHub go to **Settings → Pages**, set **Source** to "Deploy from a branch", then pick `main` / `(root)`.
3. Your site will be live at `https://<your-github-username>.github.io/<repo-name>/` within a minute or two.
4. Optional: buy a domain like `lucyshaffer.com` and add it under Settings → Pages → Custom domain.
