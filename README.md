# hyrox-watch

Emails you when tickets for HYROX Houston 26/27 look available. Runs free on GitHub Actions every ~5 min.

1. Push this to a GitHub repo.
2. Repo → Settings → Secrets → Actions: add `SMTP_USER` (your Gmail) and `SMTP_PASS` ([app password](https://myaccount.google.com/apppasswords)).
3. `check.js` looks for the "BUY TICKETS HERE" button text on the page. If it turns out that text is on the page even when tickets are not on sale, tighten `AVAILABLE`.

Test locally: `npm install && DRY_RUN=1 node check.js`
