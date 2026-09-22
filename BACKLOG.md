# Backlog

Work that is agreed but not scheduled. Add new items at the bottom.

## Open Graph tags and share images

**Status:** not started
**Why:** Neither `index.html` nor `case-studies/tqmi-ai-adoption.html` has Open Graph tags, so a link pasted into LinkedIn, Slack, WhatsApp or Teams renders as a bare URL with no title, description or image. The case study is meant to be shared by sales and forwarded inside a buying organization, so the preview is what people see first.

### What to add

Nine tags per page. LinkedIn, Slack, WhatsApp, Teams and iMessage read Open Graph. Twitter reads it too but needs `twitter:card` to show a large image.

Homepage (`index.html`), inside `<head>`:

```html
<meta name="description" content="Caizin is a strategy-led, execution-driven engineering partner for growth-stage and mid-market companies, working from strategy through delivery."/>
<link rel="canonical" href="https://caizin.ai/"/>

<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Caizin"/>
<meta property="og:url" content="https://caizin.ai/"/>
<meta property="og:title" content="Caizin: engineering and AI delivery, from strategy to live"/>
<meta property="og:description" content="Caizin is a strategy-led, execution-driven engineering partner for growth-stage and mid-market companies, working from strategy through delivery."/>
<meta property="og:image" content="https://caizin.ai/og/caizin-home.jpg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="Caizin, raise the bar"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Caizin: engineering and AI delivery, from strategy to live"/>
<meta name="twitter:description" content="Caizin is a strategy-led, execution-driven engineering partner for growth-stage and mid-market companies, working from strategy through delivery."/>
<meta name="twitter:image" content="https://caizin.ai/og/caizin-home.jpg"/>
```

TQMI case study (`case-studies/tqmi-ai-adoption.html`), inside `<head>`:

```html
<link rel="canonical" href="https://caizin.ai/case-studies/tqmi-ai-adoption.html"/>

<meta property="og:type" content="article"/>
<meta property="og:site_name" content="Caizin"/>
<meta property="og:url" content="https://caizin.ai/case-studies/tqmi-ai-adoption.html"/>
<meta property="og:title" content="TQMI cut 25 to 75% of the time on client documents with AI"/>
<meta property="og:description" content="Ten documented use cases across four consultants. Claude was put into the tools they already used, and a consultant reviewed everything a client saw."/>
<meta property="og:image" content="https://caizin.ai/og/tqmi-case-study.jpg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="TQMI case study: 25 to 75% less time on measured tasks"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="TQMI cut 25 to 75% of the time on client documents with AI"/>
<meta name="twitter:description" content="Ten documented use cases across four consultants. Claude was put into the tools they already used, and a consultant reviewed everything a client saw."/>
<meta name="twitter:image" content="https://caizin.ai/og/tqmi-case-study.jpg"/>
```

The copy above is a starting point. Confirm the homepage positioning line before it ships.

### Rules that break previews if missed

- `og:image` and `og:url` must be absolute URLs starting with `https://caizin.ai`. Relative paths fail with no error.
- The image must be reachable without a login and must not sit behind a redirect.
- 1200x630 pixels, JPG or PNG, under about 1MB. Slow images time out and the preview comes back empty.
- No transparency. A transparent PNG renders on black in some clients.
- Text on the image has to be readable at about 360px wide, which is the thumbnail size in a LinkedIn feed.

### Images to create

There are no 1200x630 assets in the repo today, only favicons, the two logo SVGs, a stock photo and a headshot. Two images are needed, in the site's own style: navy background, inverted logo small in a corner, large white text.

- `/og/caizin-home.jpg` carries the company positioning line.
- `/og/tqmi-case-study.jpg` carries "25 to 75% less time" with "TQMI case study" underneath.

One shared image across every page means every link looks the same in a feed, so keep them per page.

### Related cleanups found while looking at this

- `index.html` has no meta description, so Google writes its own from whatever text it finds.
- The homepage `<title>` is "Caizin — Raise the Bar". It says nothing about what the company does, and it uses an em dash.
- The case study `<title>` still reads "TQMI: AI in Consulting Delivery". "Delivery" is the consulting shorthand that was removed from the body copy.

### Verifying

LinkedIn caches previews for about a week, so a bad first scrape sticks. Run both URLs through LinkedIn Post Inspector and Facebook Sharing Debugger once to force a re-scrape and see what they parsed. Slack can be tested by pasting into a private channel.

Netlify only builds when the latest commit message contains `[deploy]` (see `scripts/netlify-ignore.sh`), so the tags will not be live for scrapers until a tagged commit is pushed.
