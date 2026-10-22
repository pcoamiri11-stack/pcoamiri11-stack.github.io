# How to publish PCO Prep London on Google Play

This folder has everything you need:

- **pco-prep-london/**: the app itself. It's a website that works offline and can be installed.
- **store/**: the icon, feature graphic, 4 phone screenshots and the store listing text.

You'll go through four stages: put the app online, turn it into an Android package, set up Google Play, then run the 14-day test. The only cost is Google's one-time $25 developer fee.

---

## Stage 1: Get ready (10 minutes)

1. ✅ Done: your contact email (pcoamir11@gmail.com) is already in `privacy.html` and the store listing. Use this same Gmail for GitHub, the Play Console and your key backups.
2. Go through the app and check the questions. Make sure the SERU answers match the current TfL handbook, and check the London quiz answers.

## Stage 2: Put the app online with GitHub Pages (free, about 20 minutes)

1. Go to **github.com** and create a free account. ✅ Done: your username is **pcoamiri11-stack**.
2. Click **+** (top right) and choose **New repository**.
   - Repository name: **exactly** `pcoamiri11-stack.github.io`
   - Set it to **Public** and click **Create repository**.
3. Click **uploading an existing file**. Drag in **everything inside** the `pco-prep-london` folder: `index.html`, `privacy.html`, `manifest.webmanifest`, `sw.js`, the `icons` folder and `.nojekyll`. Click **Commit changes**.
   - `.nojekyll` is a hidden file. If you can't see it: on Mac press **Cmd + Shift + .** in Finder; on Windows tick **View → Hidden items**.
   - If it still won't upload, go to **Add file → Create new file**, name it `.nojekyll`, type `nojekyll` inside, and commit.
4. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then click **Save**.
5. Wait 1–2 minutes, then open `https://pcoamiri11-stack.github.io` on your phone. The app should load.
   - Check that `https://pcoamiri11-stack.github.io/privacy.html` opens too. You'll need this link for Google.

## Stage 3: Turn it into an Android app with PWABuilder (free, about 15 minutes)

1. Go to **pwabuilder.com**, paste `https://pcoamiri11-stack.github.io` and click **Start**.
2. It checks the manifest, offline support and icons. Fix anything marked as required. Everything should already pass.
3. Click **Package for stores**, then **Android**, then **Generate package**. Use these settings:
   - **Package ID:** for example `io.github.pcoamiri11stack.pcoprep` (lowercase, no spaces or hyphens). **This can never be changed later.**
   - **App name:** `PCO Prep London` · **Short name:** `PCO Prep`
   - **Version code:** `1` · **Version name:** `1.0.0`
   - **Signing key:** choose **Create new**, then fill in your name and details.
4. Download the zip. Inside you'll find:
   - an **.aab file**: this is what you upload to Google Play.
   - **signing.keystore** and **signing-key-info.txt**: ⚠️ **back these up somewhere safe**, such as a USB stick or cloud drive. You need them for every future update.
   - **assetlinks.json**: this links your website to your app.
5. Upload `assetlinks.json` to GitHub:
   - In your repository, click **Add file → Create new file**.
   - Name it `.well-known/assetlinks.json`. Typing the `/` creates the folder.
   - Paste in the contents of `assetlinks.json` and commit.
   - Check that `https://pcoamiri11-stack.github.io/.well-known/assetlinks.json` opens in your browser.

## Stage 4: Google Play Console

### 4a. Create your developer account
1. Go to **play.google.com/console** and sign in with your app Gmail.
2. Choose **Yourself** (a personal account), pay the **$25** fee, and complete the identity check (photo ID) and phone check. Verification can take a few days.

### 4b. Create the app
1. Click **Create app**. Set the name to `PCO Prep London`, the language to **English (United Kingdom)**, choose **App** and **Free**, accept the declarations and click **Create app**.
2. Under **Policy → App content**, complete every item:
   - **Privacy policy:** `https://pcoamiri11-stack.github.io/privacy.html`
   - **Ads:** No
   - **App access:** All functionality is available without special access
   - **Content rating:** complete the questionnaire (category: Reference, News or Educational). Answer no to violence and so on.
   - **Target audience:** 18 and over
   - **Data safety:** "Does your app collect or share any of the required user data types?" → **No**. The app sends nothing off the phone; progress stays on the device.
   - **Government apps:** No. **Financial features, Health:** none.
3. Under **Grow users → Store presence → Main store listing**, paste the text from `store/store-listing.txt` and upload:
   - the app icon `play-icon-512.png`
   - the feature graphic `feature-graphic-1024x500.png`
   - the phone screenshots `screenshot-1` to `screenshot-4`

### 4c. Closed test: 12 testers for 14 days (required for new personal accounts)
1. Go to **Test and release → Testing → Closed testing** and click **Create track** (or use the default **Alpha** track).
2. Under **Testers**, create an email list containing **at least 12 people's Gmail addresses**. Friends, family and other PCO applicants are ideal, and they'll find it useful.
3. Click **Create new release** and upload your **.aab** file. Choose **Use Play App Signing** if asked. Add release notes such as "First test version", then **Save → Review release → Start rollout**.
4. Copy the **opt-in link** from the Testers tab and send it to your testers. **Each tester must open the link, tap "Become a tester", then install the app from Play.** Being added to the list is not enough on its own.
5. Keep **at least 12 testers opted in for 14 days in a row**. Ask them to open the app now and then and send you feedback, because Google asks about this later.

### 4d. Fix the address bar (important)
After your first upload, go to **Test and release → Setup → App integrity → App signing**. Copy the **SHA-256 certificate fingerprint** shown under **App signing key certificate**.

Edit `.well-known/assetlinks.json` on GitHub and add it as a second fingerprint, keeping the one PWABuilder gave you:

```json
"sha256_cert_fingerprints": [
  "AA:BB:...the one from PWABuilder...",
  "CC:DD:...the one from Play Console..."
]
```

If you skip this, the app opens with a browser address bar across the top.

### 4e. Go live
1. After 14 days, go to **Dashboard → Apply for production**. Answer the questions about your testers, the feedback they gave and what you changed.
2. Once approved (usually a few days), go to **Production → Create new release**, upload the .aab (or a newer version), and click **Send for review**.
3. Google reviews the app, which can take several days for a new account. Then it goes live on Google Play.

---

## Updating the app later

- **Content changes** (new questions, fixes): edit the files on GitHub. The app loads from your website, so everyone gets the update automatically. Also open `sw.js` and change `pco-prep-v1` to `pco-prep-v2` (and so on), so phones refresh their offline copy.
- **Name, icon or Android version changes:** generate a new package in PWABuilder with the **same signing key**, raise the version code (2, 3…), and upload it as a new release.

## Common problems

| Problem | Fix |
|---|---|
| The Play Console says the app must target a newer Android API level | Generate a fresh package with the latest PWABuilder and upload it with a higher version code. |
| A browser bar shows at the top of the app | assetlinks.json is missing, or doesn't have the Play signing fingerprint (see 4d). |
| `.well-known` or `.nojekyll` gives a 404 error | Make sure `.nojekyll` is in the main folder of the repository, then wait a minute. |
| The 14-day clock seems stuck | Check at least 12 testers have opted in through the link and installed the app. |
| Google rejects the app over TfL | Make sure no TfL logos are used and the "not affiliated with TfL" line stays visible. |
