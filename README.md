# Lucy Shaffer: Portfolio

A personal portfolio site for a Broadcast & Digital Journalism student. It's plain HTML/CSS/JS, so there's no build step. Edit the files and refresh.

## Files
- `index.html`: all the content (about, work, resume, contact). **This is the file you'll edit most.**
- `styles.css`: design. Change the colors at the top (`:root`) to re-theme everything.
- `script.js`: menu, work filters, ticker, animations. No need to touch it.
- `assets/img/`: put photos here.
- `assets/docs/`: put your resume PDF here.

## Updating content
- **Headshot:** `assets/img/headshot.jpg`. Replace the file to change it.
- **Resume PDF:** `assets/docs/Lucy-Shaffer-Resume.pdf`. Replace it with the same file name whenever the resume changes.
- **Featured video:** `assets/video/weather-anchor.mp4` with its poster image `assets/img/weather-anchor-poster.jpg`.
- **YouTube videos:** in the Work section, add `data-youtube="https://youtu.be/VIDEO_ID"` to a card's `<article>`. The thumbnail and the pop-up player are set up automatically. There's a copy-paste template in a comment above the cards.
- **Filters:** set each card's `data-category` to one or more of `broadcast digital writing audio`.
- **Ticker:** edit the "LATEST" items near the top of `index.html`.

## Preview locally
Open `index.html` in your browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publish free with GitHub Pages
1. Merge this branch into `main`.
2. On GitHub go to **Settings → Pages**, set **Source** to "Deploy from a branch", then pick `main` / `(root)`.
3. Your site will be live at `https://<your-github-username>.github.io/<repo-name>/` within a minute or two.
4. Optional: buy a domain like `lucyshaffer.com` and add it under Settings → Pages → Custom domain.
