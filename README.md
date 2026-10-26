# Forest Vital 1.1.0

A Czech, single-viewport product showroom for **www.forestvital.cz**, separate from Mijoli. The six actual products share one fixed page: choosing a package changes its full scene, name, palette, photograph, price and purchase ID. There is no vertical document scroll and no scroll-controlled product selection. A searchable collection, product information, saved products, cart and three-step demo checkout open in native dialogs with their own internal scrolling.

**Live preview:** https://majkpowa.github.io/forestvital/?v=1.1.0

This is a functional design preview. It creates no real orders, takes no payments and sends no checkout details. Inventory is unknown; no availability claims are made. The domain is a target identity; DNS is not configured by this repository.

## Design and evidence

[Detailed UI/UX analysis and implementation plan](docs/ui-ux-analysis.md) covers layout, colors, typography, iconography, spacing, design systems, visual branding, research, strategy, user stories, personas, information architecture, flows and testing. Evidence, design decisions and untested hypotheses are distinguished. No customer interviews, conversion study or real participant testing have been performed.

Both supplied reference recordings were examined in full: [496-frame cinematic reference](docs/reference-reel-analysis.md) and [301-frame product-scene reference](docs/product-hover-reference.md), with frame CSV inventories. They are recordings, not access to the original sites' DOM or hidden interactions. The user's later single-screen clarification supersedes the first long-scroll concept. Foreign reference videos and screenshots are not distributed here.

## Real products and original media

The supplied `FC produkty.docx` remains the source for product descriptions, prices, ingredients, dosage and warnings. Package counts for Paměť, CBD and Synbiotika use previously supplied catalog records; Queen Bee's 60 capsules are in the document. No count is asserted for Chlap or Oči. No testimonials, customer counts, certifications or business contacts are invented.

Six new **Higgsfield GPT Image 2.5** transparent package renders use the original user-supplied package photographs. The model preserves the label identity while improving lighting, edge clarity and materials. Assets are illustrative package renders rather than interactive 3D models. [Prompts, job IDs and the 16.5-credit quote](docs/product-image-generation.json) are retained, with source PNGs under `source-assets/higgsfield-products/` and optimized alpha WebP assets under `dist/assets/showroom/`. Original editorial photographs are retained as fallbacks.

The optional, silent **Higgsfield Seedance 2.5** forest film shows actual Paměť, Queen Bee and Synbiotika packages. [Generation provenance and the 96-credit quote](docs/cinema-generation.json) are retained. Its master is in `source-assets/cinema/`; the published 720p clip is under 1 MB and loads only on request. Reduced-motion users receive the poster and native playback control. Generated scenery is illustrative, not documentary footage.

## Interaction and accessibility

- Direct six-product choices, previous/next controls, keyboard arrows/Home/End and optional touch swipe share one active product state.
- Fine-pointer product hover requires physical pointer movement and a short intent delay. Layout changes and page movement beneath a stationary cursor cannot select a product.
- Full ingredients, dosage and warnings stay in HTML, independent of images and animation.
- Native dialogs contain focus, support Escape and restore the parent dialog and original trigger across nested flows.
- Motion preferences disable large transitions. SVG icons are original paths, including all arrows; no emoji arrows are used.
- Cart and saved IDs are stored only in the browser. Checkout details remain in memory and are reset after completing the demo. Delivery fees are explicitly illustrative.

## Local preview and publishing

```sh
python -m http.server 4174 --directory dist
```

Open `http://localhost:4174/`. No framework install or build step is required. GitHub Pages Actions checks both JavaScript files and publishes only `dist/` on pushes to `main`.

## Verification

Release checks and their limits are recorded in [release QA](docs/release-1.1.0-qa.md). Responsive browser checks do not substitute for physical-device or screen-reader testing. Proposed participant tasks and measurable acceptance criteria are included in the UI/UX analysis; no conversion improvement is claimed.
