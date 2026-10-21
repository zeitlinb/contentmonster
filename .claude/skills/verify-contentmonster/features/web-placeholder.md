# Web placeholder

Open `/` to see ContentMonster and the three platform output formats. The page has no controls, tenant state, generation, upload, or persistence.

## Sub-features

- `web-formats` shows `feed_vertical 1080×1350 · 4:5`, `feed_square 1080×1080 · 1:1`, and `stories_reels 1080×1920 · 9:16`, in order.
- `web-layout` fits desktop 1440×1000 and mobile 390×844 without horizontal overflow, in light and dark mode.
- `web-metadata` has title `ContentMonster`, language `en`, and a nonempty favicon.
- `web-missing` returns HTTP 404 and the Next.js missing-page message for an unknown route.

## How to get to it (user POV)

Run the web package's production build and start commands, then open its owned localhost origin.

## Driving it with a browser

Preconditions:

- Complete [Web route](../SKILL.md#web-route) launch and doctor. Use its owned localhost origin and request policy.

- **Read the formats.** Navigate to `/` for each combination of 1440×1000 or 390×844 and light or dark color scheme. Require HTTP 200. Capture these actual values and assert the expected result.

| Browser observation | Expected result |
| --- | --- |
| Document title and `document.documentElement.lang` | `ContentMonster` and `en` |
| `h1` text | `ContentMonster` |
| All `li` inner text, whitespace normalized | The three exact `web-formats` rows, in order |
| `document.documentElement.scrollWidth <= innerWidth` | `true` |
| Computed body background | Light `rgb(255, 255, 255)`, dark `rgb(10, 10, 10)` |
| Count of `a,button,input,textarea,select` | `0` |
| Page errors and error-level console messages | None before the negative-route check |

- **Inspect the layout.** Save and open a full-page screenshot for each of the four combinations. Require complete, legible rows and no clipping.
- **Read the favicon.** Request the exact owned-origin `/favicon.ico` with redirects disabled. In Playwright, use `await context.request.get(origin + '/favicon.ico', { maxRedirects: 0 })`. Require HTTP 200 and nonzero `response.body()` bytes. Record the URL, status, and byte count separately. This context HTTP client does not use page-request interception.
- **Open a missing page.** Navigate to `/verify-contentmonster-missing`. Require HTTP 404 and body text matching `This page could not be found`. Record the expected negative-route console error separately.

## Gotchas

- This is a static placeholder. No tenant, generation, upload, or persistence workflow exists to drive.
- The source still mentions book pipelines. That pre-existing copy conflicts with the killed KDP direction. Report the product inconsistency separately.
- Browser, build, evidence, and cleanup limits are in [Web route](../SKILL.md#web-route). A successful browser check does not certify install hooks or hosted deployment.
