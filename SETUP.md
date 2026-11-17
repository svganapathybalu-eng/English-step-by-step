# Setup: see your scholars' progress (Google Sheet version)

You need about 25 minutes, once. After that it runs by itself.

This guide is only for **trainer tracking**. The course works without it. If you skip this guide, scholars still learn and keep their progress on their own phone.

---|---|
| `index.html` | The course. Scholars use this. |
| `dashboard.html` | Your private trainer dashboard. Only you use this. |
| `Code.gs` | The small script that saves progress into your Google Sheet. |
| `SETUP.md` | This guide. |

---

## Part A. Make the Sheet and the script (10 minutes)

1. Open **sheets.google.com**. Click **Blank** to make a new Sheet. Name it `English Step by Step - Progress`.
2. In the Sheet, click **Extensions**, then **Apps Script**. A new tab opens with some code in it.
3. Select all the code in that tab and delete it. Open `Code.gs` in Notepad, copy everything, and paste it in.
4. Near the top, find this line and change the words inside the quotes to **your own secret word**. Do not use your Google password.
   `var TRAINER_KEY = 'CHANGE-THIS-TO-YOUR-OWN-SECRET-WORD';`
   Click the **Save** icon.
5. At the top, in the box that shows a function name, choose **setup**. Click **Run**.
   - Google asks for permission. Click **Review permissions**, choose your account.
   - If you see "Google hasn't verified this app", click **Advanced**, then **Go to (project name)**, then **Allow**. This is normal for a script you made yourself.
   - Go back to your Sheet tab. You will now see two new tabs at the bottom: **Events** and **Scholars**.
6. Back in the Apps Script tab, click **Deploy**, then **New deployment**.
   - Click the small gear icon next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**.
   - Copy the **Web app URL**. It starts with `https://script.google.com/macros/s/`. Keep it handy.

## Part B. Put your URL in config.js (2 minutes)

7. Open `config.js` in Notepad. Find `trackerUrl: ""` and put your Web app URL between the quotes. Save.
   One file now controls both the course and the dashboard.

## Part C. Put the project on GitHub or Netlify (10 minutes)

8. **GitHub:** create a repository, click **Add file**, **Upload files**, and drag in everything from the unzipped folder (the files and the folders). Commit. Then **Settings**, **Pages**, Source: *Deploy from a branch*, **main**, **/ (root)**, Save.
   **Netlify:** open app.netlify.com/drop and drag the whole unzipped folder onto the page.
9. Your links will be:
   - **For scholars:** `https://YOUR-NAME.github.io/YOUR-REPO/` (or your Netlify address)
   - **For you only:** the same address followed by `/dashboard/`
   Do not share the dashboard link with scholars. It also needs your secret word.

## Part D. Test it (5 minutes)

12. Open the scholar link. Type a test name and batch, for example `Test Trainer` and `TEST`. Finish Lesson 1 and one Speak set.
13. Open your Sheet. The **Events** tab has new rows, and the **Scholars** tab shows `Test Trainer`.
14. Open the dashboard link (`/dashboard/`), type your secret word, click **Open dashboard**. You will see the test scholar.
15. Delete the test rows from the Sheet (both tabs) before real scholars join.

---

## What you see on the dashboard

- **Tiles:** how many scholars joined, how many studied this week, how many need you, and the batch average score.
- **What to do now:** automatic advice, such as who is scoring low, who has not studied for 3 days, who never started, which lessons to re-teach in class, and the questions the batch misses most.
- **Scholars table:** lessons done, average score, last active, minutes, and a status. Click a name to see every lesson in green, amber or red, what they missed, and a suggested next step.
- **Lessons across the batch:** which lessons are strong and which need re-teaching.
- **Speaking column:** how many speaking sets each scholar has tried and their average clarity. The suggestion box warns you when a scholar studies lessons but never speaks.
- **Download CSV:** the scholar table as a file for Excel.

You can change the rules at the top of the script in `dashboard/dashboard.js`: `INACTIVE_DAYS`, `HELP_BELOW`, `RELEARN_BELOW`.

## Tell your scholars

- Type your **name and batch the same way every time**. "Priya S" and "Priya Sundaram" count as two different people.
- Your trainer can see your name, batch, scores and study time. Nothing else.
- Without internet, your progress is saved on your phone and sent later.

## Good to know

- Names are typed, not verified. Anyone who knows a scholar's name and batch could type them. This is fine for a classroom, but not for exams or marks.
- "Last active" changes when a scholar finishes a lesson, not when they only open the page.
- A scholar who studies on another phone with the same name and batch is counted as the same person. Their ticks on the new phone start fresh, but your Sheet keeps the full history.
- If you ever change `Code.gs`, go to **Deploy**, then **Manage deployments**, click the pencil, choose **New version**, and **Deploy**. The URL stays the same.
- Because this stores scholars' names and scores, tell them it is being collected, and check that HCL or Experis is happy with it.
- If you already used the earlier version of Code.gs, paste this new one over it, run **setup** again, and make a new version (see above). Old rows stay.
