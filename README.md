# Joshthatking.github.io

My personal portfolio and resume site, live at **https://joshthatking.github.io**.

Plain HTML, CSS, and JavaScript with no build step. GitHub Pages serves the `main` branch directly.

## Editing

| What | Where |
| --- | --- |
| Text content (about, experience, projects, skills) | `index.html` |
| Colors, fonts, layout | `assets/css/style.css` (change `--accent` to re-theme) |
| Which repos are hidden from "More on GitHub" | `HIDDEN_REPOS` in `assets/js/main.js` |

## Preview locally

```bash
python -m http.server 8000
# open http://localhost:8000
```
