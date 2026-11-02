# Forest Vital 1.2.1

A Czech, single-viewport product showroom for **www.forestvital.cz**, separate from Mijoli. The six current products share one fixed page: choosing a product changes its scene, name, palette, package visual, price and purchase ID. There is no vertical document scroll and no scroll-controlled product selection. A searchable collection, product information, saved products, cart and three-step demo checkout open in native dialogs with their own internal scrolling.

**Primary address:** https://www.forestvital.cz/

The custom domain is configured in GitHub Pages and Forpsi DNS. On 2 November 2026 at 19:06 CET, DNS and strict TLS validation passed for both `forestvital.cz` and `www.forestvital.cz`; the primary HTTPS page returned 200 and the HTTPS apex redirected to `www`. HTTPS enforcement is enabled in Pages. The [GitHub Pages deployment address](https://majkpowa.github.io/forestvital/?v=1.2.1) redirects to the custom domain. See [deployment verification, configuration and rollback](docs/custom-domain-deployment.md).

This is a functional design preview. It creates no real orders, takes no payments and sends no checkout details. Inventory is unknown; no availability claims are made. DNS is administered separately from the repository; publishing on the custom domain does not enable commerce integrations.

## Design and evidence

[Detailed UI/UX analysis and implementation plan](docs/ui-ux-analysis.md) covers layout, colors, typography, iconography, spacing, design systems, visual branding, research, strategy, user stories, personas, information architecture, flows and testing. Evidence, design decisions and untested hypotheses are distinguished. No customer interviews, conversion study or real participant testing have been performed.

Both supplied reference recordings were examined in full: [496-frame cinematic reference](docs/reference-reel-analysis.md) and [301-frame product-scene reference](docs/product-hover-reference.md), with frame CSV inventories. They are recordings, not access to the original sites' DOM or hidden interactions. The user's later single-screen clarification supersedes the first long-scroll concept. Foreign reference videos and screenshots are not distributed here.

## Real products and original media

The supplied `FC produkty.docx` remains the source for descriptions, ingredients, dosage and warnings of the five capsule products. The newer `ceny FC.docx`, supplied on 2 November 2026, supersedes their prices and supplies the name and net price of the sixth product, **CBD mast**. Package counts for Paměť, CBD and Synbiotika use previously supplied catalog records. No count is asserted for Chlap or Oči. No testimonials, customer counts, certifications or business contacts are invented.

The user has now supplied the ointment photograph for 1.2.1. Its front label confirms **Forest Clinic**, **FORTE** and **KONOPNÁ MAST**, on a round silver metal tin. The catalog retains the price-list name **CBD mast** and records the full label identity as **Forest Clinic Konopná mast FORTE**. Package size, INCI/ingredients, CBD concentration, directions and warnings are not visible on this photograph and remain unspecified. The copy does not reuse capsule directions or assert a fictional formulation.

## Prices and VAT in 1.2.0

The supplied price list contains **net unit prices**. Customer prices include VAT; each product also shows its net price and rate. The capsule products use 12% VAT. CBD mast is provisionally treated as a cosmetic topical product at 21%, rather than a registered medicinal product; its classification should be checked against the full product label. The supplied front photograph confirms the brand and product wording but not this classification. Source values, document and photograph hashes, rate references and the pending product fields are recorded in [pricing provenance](docs/pricing-source-2026-11-02.json). No prices or tax calculations change in 1.2.1.

| Product | Net unit price | VAT | Gross unit price |
| --- | ---: | ---: | ---: |
| Paměť | 792.86 Kč | 12% | 888.00 Kč |
| Chlap | 792.86 Kč | 12% | 888.00 Kč |
| CBD, CBG, CBC | 1,098.22 Kč | 12% | 1,230.01 Kč |
| Synbiotika | 1,091.08 Kč | 12% | 1,222.01 Kč |
| Oči | 792.86 Kč | 12% | 888.00 Kč |
| CBD mast | 570.25 Kč | 21% | 690.00 Kč |

Gross unit prices are rounded half-up to haléře, while the supplied net unit prices are preserved exactly. Cart lines and totals use integer haléře. VAT summaries sum the rounded unit VAT amounts by rate, so the displayed net and tax amounts reconcile exactly with the gross total. This can differ by one haléř from applying a rate once to an aggregated net amount. Delivery remains a separately labelled final demo price; the displayed VAT breakdown covers products only.

## Product media

Five current **Higgsfield GPT Image 2.5** transparent package renders use the original user-supplied package photographs. The model preserves the label identity while improving lighting, edge clarity and materials. Assets are illustrative package renders rather than interactive 3D models. [Prompts, job IDs and the 16.5-credit quote](docs/product-image-generation.json) are retained, with source PNGs under `source-assets/higgsfield-products/` and optimized alpha WebP assets under `dist/assets/showroom/`. Original editorial photographs are retained as fallbacks.

The ointment's separate Higgsfield GPT Image 2.5 studio image is based on its newly supplied real package photograph. Its display asset is `dist/assets/showroom/cbd-mast.webp`, with the source photograph at `dist/assets/products/cbd-mast-source.webp` as the fallback. The [exact prompt, job and 2.75-credit quote](docs/ointment-image-generation.json) are retained. The temporary missing-photo symbol from 1.2.0 is superseded; `imagePending` is false, while the missing label details remain pending. The release owner visually checked the label identity and complete silver tin. Current image and release checks are recorded in [QA 1.2.1](docs/release-1.2.1-qa.md).

Queen Bee was removed from the offer in 1.1.1. Its photographs and the forest film/hero containing that package are no longer served from `dist/`; reversible archives are retained under `source-assets/retired-queen-bee/`. Historical media generation records and previous release analyses remain available. Existing saved/cart IDs are validated against the current catalog on load, removing the retired product while keeping other selections.

## Interaction and accessibility

- Direct six-product choices, previous/next controls, keyboard arrows/Home/End and optional touch swipe share one active product state.
- Fine-pointer product hover requires physical pointer movement and a short intent delay. Layout changes and page movement beneath a stationary cursor cannot select a product.
- Supplied ingredients, directions and warnings stay in HTML, independent of images and animation; missing ointment details are explicitly identified.
- Native dialogs contain focus, support Escape and restore the parent dialog and original trigger across nested flows.
- Motion preferences disable large transitions. SVG icons are original paths, including all arrows; no emoji arrows are used.
- Cart and saved IDs are stored only in the browser. Checkout details remain in memory and are reset after completing the demo. Delivery fees are explicitly illustrative.

## Local preview and publishing

```sh
python -m http.server 4174 --directory dist
```

Open `http://localhost:4174/`. No framework install or build step is required. GitHub Pages Actions checks both JavaScript files and publishes only `dist/` on pushes to `main`.

## Verification

Current ointment identity, image and release checks are recorded in [release 1.2.1 QA](docs/release-1.2.1-qa.md). Pricing, sixth-product and browser checks remain in [release 1.2.0 QA](docs/release-1.2.0-qa.md). Historical Queen Bee removal checks remain in [release 1.1.1 QA](docs/release-1.1.1-qa.md), with the broader implementation checks and their limits in [release 1.1.0 QA](docs/release-1.1.0-qa.md). Responsive browser checks do not substitute for physical-device or screen-reader testing. Proposed participant tasks and measurable acceptance criteria are included in the UI/UX analysis; no conversion improvement is claimed.
