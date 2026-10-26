# Forest Vital

Original Czech ecommerce concept for **www.forestvital.cz**. Separate source and visual identity from Mijoli. Warm ivory, dark olive and copper; editorial serif typography and a custom inline SVG icon set.

This is a functional preview: six products, ingredient search, category and price sorting, product details, saved products, persistent local cart and a three-step demo checkout. It does not create orders, take payments or send checkout data. Product stock is unknown and is not presented as available. The domain is a target identity; this project does not configure its DNS.

## Content and imagery

The supplied `FC produkty.docx` is the source for all six product descriptions, prices, ingredients, dosage and warnings. Package counts for Paměť, CBD and Synbiotika use previously provided source catalog records; Queen Bee's 60 capsules are specified in the document. No count is asserted for Chlap or Oči. Six existing ImageGen product edits use the actual package photographs supplied by the user. The separate hero is an ImageGen composition of actual sold packages. The retailer branding does not replace manufacturers' package labels.

No testimonials, customer counts, certifications, live inventory or business contact details have been invented. The delivery fee in checkout is explicitly illustrative.

## Preview

```sh
python -m http.server 4174 --directory dist
```

Open `http://localhost:4174/`.

## Publishing

Push `main` to a GitHub repository with Pages configured for Actions. The workflow checks JavaScript syntax and publishes `dist/`. There is no build dependency or framework installation.

## UI and UX

- The collection is the first shopping destination, with persistent search context and visible counts.
- All six products appear in the initial grid. Categories describe composition rather than promising health outcomes.
- Prices, package format, ingredients, use and warnings are presented near the decision.
- All navigation and purchase controls have at least 44px touch targets. Body text is 16px; functional metadata is 12px or above.
- Native dialogs contain keyboard focus, Escape closes them and the opener receives focus on return.
- Cart and saved state are stored only in the browser. Checkout details stay in memory and are reset on completing the demo.
- Reduced motion, reduced transparency and increased contrast preferences are supported.

## Verification

Static syntax and content checks are recorded by the development agent. Browser QA is handled by the parent task before publication: responsive widths 320 / 390 / 768 / 1440, ingredient search, category empty states, save/reload, product information, cart quantity totals, full demo checkout, keyboard dismissal and no horizontal overflow.

Real customer testing has not been carried out. Suggested moderated tasks: find a product by ingredient, compare package and price, locate a product warning, save a product and return, change cart quantity, finish the demo. Track task completion, errors, need for help and decision confidence before making conversion claims.
