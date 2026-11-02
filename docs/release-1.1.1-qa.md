# Forest Vital 1.1.1 — odebrání Queen Bee

Queen Bee byla na žádost zadavatele vyřazena z aktuální nabídky. Katalog, přímý výběr i sousední náhledy nyní používají pět produktů: Paměť, Chlap, CBD / CBG / CBC, Synbiotika a Oči. Počet receptur a filtr kategorií odpovídají aktuální nabídce. Mobilní volby mají tři položky v prvním a dvě vycentrované ve druhém řádku.

Lesní film a staré hero obsahovaly také vyřazené balení, proto byly spolu s jeho fotografiemi přesunuty mimo publikovaný `dist/` do `source-assets/retired-queen-bee/`. Zdrojová média a historie zůstávají zachovány. Načtení uloženého košíku a oblíbených produktů odstraňuje neplatná ID podle současného katalogu.

## Technické ověření

- Hluboké srovnání `products.json` s předchozí verzí potvrzuje pouze odebrání Queen Bee. Všechna pole zbývajících pěti produktů, včetně cen, složení, dávkování a upozornění, zůstala beze změny.
- Node VM spustil skutečnou funkci `init()` ze souboru `app.js` se starým košíkem a uloženými produkty. Smíšený výběr zachoval Paměť a Oči ve stejném množství a odstranil Queen Bee; výběr obsahující pouze Queen Bee byl vyprázdněn. Oba případy uložily aktualizovaná data, vykreslily katalog/košík a vyvolaly `forest:catalog-ready`.
- Všechny relativní asset odkazy v HTML a všechny obrázky současných produktů existují. Šest vyřazených médií má archivní kopie a není v publikovaném adresáři.
- V aktivním HTML, JavaScriptu a katalogových datech nejsou odkazy na Queen Bee, filmové tlačítko ani odstraněný video dialog.
- `node --check dist/app.js`, `node --check dist/showroom.js` a `git diff --check` prošly.

## Ověření v prohlížeči

- Pět přímých voleb odpovídá aktuálním produktům. Poslední Oči zobrazují `05 / 05`, další šipka je zakázaná a sousední náhledy pokračují na Paměť a Chlap.
- Katalog ukazuje počet `05`; vyhledání Queen Bee vrací nula produktů.
- Při viewportu 390 × 844 a 320 × 568 dokument nepřetéká do šířky ani výšky. Poslední dvojice produktových voleb je ve druhém řádku vycentrovaná.
- Publikované HTML, JavaScript, CSS a katalog odpovídají lokálním souborům verze 1.1.1. Odebrané produktové fotografie, lesní film a staré hero nejsou na veřejném nasazení dostupné.

Tento záznam zachycuje technické a browser kontroly změny; nepředstavuje zákaznické ani fyzické mobilní testování. Ověření DNS a certifikátu vlastní domény probíhá samostatně podle [záznamu nasazení](custom-domain-deployment.md). Širší přejímka a její limity zůstávají v [záznamu 1.1.0](release-1.1.0-qa.md).
