# English Step by Step (v2)

A self-study English course for scholars: 44 short lessons, mixed practice, and a Speaking Lab with 17 sets.
No build step, no server. It is plain HTML, CSS and JavaScript, so it works on **GitHub Pages**, **Netlify**, or any web host.

## What is inside

| Tab | What the scholar does |
|---|---|
| **Learn** | A path of 44 lessons in 5 modules: words and sentences, helping verbs and modals, tenses, more basics, and the Speaking Lab. Every lesson ends with sentences to say aloud. |
| **Practise** | A daily mix, a smart review (questions you missed come back 4x more often), and quick rounds by module. |
| **Speak** | Pronunciation sets (-ed, -s, th, v/w, stress, vowels, natural speech) and talking tasks (introduce yourself, routine, plans, polite requests, delays, updates). |
| **Me** | XP, streak, daily goal, progress code (move progress to another phone), theme, big text, voice speed. |

Speaking works like this: the scholar hears the sentence, taps the mic and speaks. The app marks each word green or red. Where the browser cannot listen (for example iPhone Safari), the scholar records and plays back their own voice, then rates themselves. Talking tasks accept typed answers too.

## Put it online

**GitHub Pages**: upload all files and folders to a repository, then Settings, Pages, branch `main`, folder `/ (root)`.
**Netlify**: drag the whole folder to app.netlify.com/drop. `netlify.toml` is already set.
Open the link on a phone and choose "Add to Home screen". It installs like an app and opens offline.

The microphone needs `https://` (both hosts give this) or `localhost`.

## Trainer tracking (optional)

Follow `SETUP.md`. In short: paste `apps-script/Code.gs` into a Google Sheet, deploy it, put the URL in `config.js`. Your private dashboard is at `/dashboard/`.

## Settings: `config.js`

| Setting | Meaning |
|---|---|
| `trackerUrl` | Your Apps Script web app URL. Leave `""` to turn tracking off. |
| `appName` | Title shown in the app. |
| `dailyGoalXp` | Default daily goal. |
| `passScore` | Share of words that must match for a spoken sentence to pass (0.8 = 80%). |
| `speechLang` | Recognition language. `en-IN` for Indian English, `en-GB`, `en-US`. |

## Folder map

```
index.html            the app page
config.js             your settings
content/              ALL lessons and speaking sets (edit here)
js/ css/              app code and design
dashboard/            trainer dashboard (private link)
apps-script/Code.gs   saves progress to your Google Sheet
sw.js manifest.webmanifest icons/   offline + install on phone
tools/check-content.js   checks lessons for mistakes
docs/ADDING-LESSONS.md   how to add or edit lessons
```

## Check and preview on your computer

```
node tools/check-content.js      # checks every lesson
python3 -m http.server 8000      # then open http://localhost:8000
```

When you change files after publishing, edit `VERSION` in `sw.js` (for example `ess-v2-2`) so phones fetch the update.

## Browser support for speaking

Chrome and Edge (Android, Windows, Mac): full speech recognition. Safari on iPhone: listening is limited, so the app uses record, playback and self-rating. Firefox: same fallback.
Speech recognition in Chrome sends audio to Google to turn it into text. Tell scholars. Nothing is saved by this project.
