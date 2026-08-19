# Go-Live Checklist — Careers Page (`caizin-career` branch)

Production for this repo is GitHub Pages, custom domain `caizin.ai`, served from `main`.
Netlify (`caizin-preview.netlify.app`) has only ever been the preview/staging environment
for this branch. "Going live" means merging `caizin-career` into `main`, not switching hosts.

## 1. Content & design decisions still open

- [ ] Decide on the final careers hero banner. There's currently a live "Explore Open
      Roles" mockup picker in `careers/index.html` (marked `DEMO` in comments) letting
      viewers switch between the current design and the GPTW-photo mockup. Once a banner
      is chosen: delete the picker and restore the plain `<a>` link (the code comment at
      that spot explains how).
- [ ] Delete `careers/keka-mock-1.html` and `careers/keka-mock-2.html` once a banner is
      chosen — they're comparison mockups, not meant for production, and each has its own
      "delete before shipping" demo switcher.
- [ ] Get sign-off on the new "What Caizinites Have Built" project blurbs, especially the
      revenue figures (`$250M–$500M`) and any wording that names or implies specific
      clients — worth a legal/leadership glance before this is public.
- [ ] Final proofread pass on captions, alt text, and copy across the new culture carousel
      and work section.

## 2. Repo cleanup

- [ ] Remove or intentionally keep the untracked scratch files sitting in the working tree
      (`careers/_hero-mockups.html`, `_keka-hallway-options.html`, `_keka-page-mockup.html`,
      `_keka-photo-compare.html`, and loose root images `keka-banner.png`, `m2-new.png`,
      `y62.png`) — decide per-file, don't just let them linger.
- [ ] Add `.playwright-mcp/` to `.gitignore` so verification screenshots never accidentally
      get committed.
- [ ] Confirm no other oversized/uncompressed images remain elsewhere in the repo (only
      `careers/carousel-photos/` has been audited so far).

## 3. Preview-only scaffolding to reconsider before/at merge

- [ ] `netlify/edge-functions/basic-auth.ts` — this Basic Auth gate shouldn't end up
      protecting the real production domain. Production is GitHub Pages (not Netlify), so
      it's inert there, but decide whether it's fine sitting in `main`'s history regardless,
      or should be stripped out as part of the merge.
- [ ] `netlify.toml` + `scripts/netlify-ignore.sh` — same question: harmless on GitHub
      Pages, but decide whether these preview-specific files belong in `main` long-term or
      should be scoped to a `preview`/staging branch only.
- [ ] Rotate the `BASIC_AUTH_PASS` Netlify env var — it was typed in chat during setup, so
      treat it as no longer secret once the preview is decommissioned.
- [ ] Decide the fate of the Netlify preview site itself (`caizin-preview.netlify.app`)
      post-launch — delete it, keep it as an ongoing staging environment for future
      changes, or something else.

## 4. Merge & deploy mechanics

- [ ] Open a PR from `caizin-career` → `main`, get it reviewed/approved.
- [ ] Check for merge conflicts against `main` (other branches like
      `change-value-framework`, `new-logo` may have moved on independently).
- [ ] Confirm GitHub Pages is still configured to build from `main` (Settings → Pages) and
      that merging triggers the expected redeploy to `caizin.ai`.
- [ ] Verify the `CNAME` file and DNS for `caizin.ai` are unaffected by this merge (no
      reason they should be, but worth a glance).

## 5. Pre-launch QA

- [ ] Full click-through of the new careers page sections on the actual production build
      (not just the Netlify preview) — carousel autoplay/pause/in-view behavior, lightbox
      navigation, mobile layout.
- [ ] Cross-browser/mobile spot check (carousel drag/swipe, lightbox touch gestures).
- [ ] Basic accessibility pass — alt text present (done for carousel), keyboard nav on
      lightbox (done), color contrast on new sections.
- [ ] Run a quick performance check (Lighthouse or similar) now that carousel images are
      compressed, to confirm page weight is reasonable.

## 6. Post-launch

- [ ] Spot-check `caizin.ai/careers/` live after the GitHub Pages deploy finishes.
- [ ] Watch for any broken links/images in the first day (same class of bug caught twice
      with uncommitted files during the preview phase).
