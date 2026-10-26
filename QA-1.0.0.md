# Forest Vital 1.0.0 verification

26 October 2026. Code review and browser walkthrough, not customer research.

- All six product descriptions, ingredient lists, dosage and warning fields match the supplied DOCX (24/24 fields), as do their prices.
- Search for `bacopa` finds Paměť. Its detail displays 16px description text and the supplied ingredient quantities without horizontal overflow.
- Saving Paměť persists across reload and the saved filter returns one item.
- Adding one of every product gives six items and 5,573 CZK. Increasing Paměť to two gives 6,350 CZK and keeps focus on the quantity button. Controls measure approximately 44 CSS pixels.
- Restoring one of each and completing the three demo checkout steps gives 5,573 + 99 = 5,672 CZK. Only fictitious data was used. Completion confirms that no order or payment occurred.
- Checkout step changes focus their heading; completion focuses its confirmation.
- Phone widths 320 and 390, tablet around 768 and desktop around 1440 reviewed. No document horizontal overflow. The tablet and mobile catalog use two columns. Desktop hero preserves all three packages.
- All six images and the generated hero resolve locally. JavaScript syntax, static IDs and local asset references checked.

Stock is unknown; the website labels the offer and checkout as a preview. No customer quotes, inventory claims, business details, conversion results or human test outcomes are invented. Domain DNS, live inventory, order submission and payments are not configured in this concept.
