EMPLOGENT - website (security-hardened static build)
====================================================

FILES
  index.html      -> markup (edit content here)
  styles.css      -> all styles + self-hosted @font-face
  app.js          -> site logic (3D scene, Obi chat, form, menu)
  three.min.js    -> 3D library (vendored, r128 - don't edit)
  assets/         -> logo.png, founder.jpg, fonts/ (woff2)
  vercel.json     -> HTTP security headers (CSP, HSTS, etc.)
  .gitignore      -> keeps secrets/env files out of git

RUN LOCALLY (VS Code)
  Open this folder > install "Live Server" > right-click index.html >
  "Open with Live Server". No internet needed - fonts & library are local.
  (Note: the security headers in vercel.json only apply once deployed to Vercel,
   not under Live Server - that's expected.)

DEPLOY (Vercel)
  Push this folder to GitHub > import in Vercel > Deploy. vercel.json is
  picked up automatically and applies the security headers.

SECURITY NOTES
  - No secrets are stored in this repo. Never put an API key in app.js/index.html.
  - When you add the real "Obi" AI later: build a server-side endpoint (e.g. n8n
    on your VPS) that holds the API key. Flow: browser -> your server -> AI -> reply.
    Add: input size limits, rate limiting, and CORS restricted to emplogent.com.
    Then update connect-src in vercel.json to allow only that endpoint's origin.
