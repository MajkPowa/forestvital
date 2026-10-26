# Forest Vital 1.1.0 — přejímka realizace

Výsledkem je jeden produktový viewport. Svislé posouvání dokumentu neřídí film ani výběr výrobku. Dlouhé informace, katalog a objednávka mají vlastní nativní dialogy. Starší experiment s dlouhou scrollovací stránkou byl před vydáním nahrazen podle upřesněného zadání.

## Analýza a realizovaná rozhodnutí

Podrobný [UI/UX rozbor](ui-ux-analysis.md) má 15 oddílů: všechny požadované oblasti UI a UX, audit, plán a měřitelné scénáře. Vychází ze 797 skutečně prohlédnutých snímků referencí a dodaného katalogu. Persony a behaviorální předpoklady jsou pracovní hypotézy, nikoli výsledky zákaznických rozhovorů.

Finální barvy odpovídají navrženým šesti produktovým světům. Výrazný titul používá Playfair Display, aby zůstala vlastní redakční identita Forest Vital; ovládání a praktické informace používají stávající bezpatkový systém. Rozhodující informace jsou skutečný HTML text. Všechny šipky jsou originální SVG cesty. Odstupy a velikosti ovládání se řídí výškou i šířkou viewportu. Mobilní dekorativní vlna byla snížena, aby nezakrývala označení ukázkového e-shopu.

Šest nových obrázků vzniklo v Higgsfield z původních fotografií obalů. Každý výstup byl vizuálně porovnán s předlohou: správný výrobek, barva etikety, symbol, hlavní název, celé víčko i základna. Všechny publikované výřezy mají průhledný alfa kanál a rozměry 1792 × 2240. Jejich celková velikost je 2 805 214 B. Volitelný šestisekundový lesní film má 935 511 B a načítá se na vyžádání. Originální PNG a video master jsou mimo publikovaný `dist/`.

## Provedené technické a browser kontroly

| Oblast | Provedená kontrola | Výsledek |
| --- | --- | --- |
| T01 — jedna obrazovka | 320×568, 360×640, 390×844, 768×1024, 1366×768, 1920×1080 a 844×390; nejdelší název CBD, CBG, CBC. | Výška a šířka dokumentu přesně odpovídá viewportu. Žádné hlavní tlačítko mimo obrazovku ani pod 44×44 px. [Naměřená geometrie](viewport-qa.json). |
| T02 — šest scén | Každý přímý výběr v běžném Chrome; kontrola názvu, ceny, src, nákupního ID a palety. | Všech šest výrobků má odpovídající data a nový výřez. |
| T03 — rychlá změna | Deset rychlých Home/End změn; následná kontrola scény a zbylých animačních vrstev. | Poslední volba Paměť, 777 Kč, správný obrázek; po přechodu žádná zbylá odcházející vrstva. |
| T04 — klávesnice | Home/End a šipky v pickeru; taby v informačním dialogu, Escape, vrácení fokusu. | Výběr i informace jsou ovladatelné. Fokus se vrací na původní tlačítko. |
| T07 — chyba média | Nový obrázek Paměť dočasně nebyl dostupný na lokálním serveru; poté obnoven. | Načetla se skutečná původní fotografie jako fallback, text a nákupní ID zůstaly Paměť; žádný blokující loading. |
| T08 — otevřený detail | Informační dialog změněn z 320×568 na 844×390. | Dialog zůstal uvnitř viewportu, dlouhý obsah má vlastní scroll, pozadí zůstalo na Paměti a dokument neposouvá. |
| T09 — nákupní tok | Přidání Queen Bee, správná cena a součty; košík → detail → přidání → košík; checkout zrušení a celý demo checkout s tlačítkem pro smyšlené údaje. | Správný výrobek a násobky 790 Kč. Žádný cyklus dialogů. Dokončení výslovně potvrzuje, že nevznikla objednávka ani platba. Návrat na showroom. |
| Katalog | Vyhledat „bacopa“, otevřít Paměť a zavřít detail. | Jeden správný výsledek. Vrací se původní dialog, dotaz i fokus na otevřený produkt. |
| Informace | Queen Bee — užívání a upozornění na alergii na včelí produkty. | Zobrazeny přesné dodané texty. |
| T11 — kontrast | Výpočet skutečných tokenů pro inkoust, pomocný text a CTA ve všech šesti scénách. | Všech 18 neprůhledných textových párů nejméně 4,57:1. Dva slabší pomocné odstíny byly ztmaveny; funkční text nemá sníženou opacity. [Výpočty](contrast-qa.json). |
| Film | Otevření volitelného filmu v Chrome, načtený video soubor, nativní controls; close/visibility pause v kódu. | Přehratelné médium, skutečná prodávaná balení, samostatný zavírací prvek. |
| Zdrojová data | Srovnání všech původních JSON polí s předchozím commitem, vyjma image; kontrola alfa obrázků, asset cest a statických ID. | Ceny, texty, balení a varování beze změny. Všechny reference existují, žádná duplicitní statická ID. |
| Syntaxe | Node syntax check app.js a showroom.js, Git diff whitespace check. | Prošlo. |

Vizuální kontrola mobilu proběhla také ve skutečných iframe plochách 390×844 a 320×568 v běžném Chrome. Slouží k ověření stejného HTML/CSS při úzké šířce; nejde o test fyzického telefonu. Native dialog stack byl navíc prověřen malým read-only VM harness: katalog/detail, košík/detail/návrat do košíku, checkout/zrušení, informace/soukromí a vyčištění celého řetězce. Zjištěné ztráty fokusu a cyklus předků byly opraveny a kontrola zopakována.

## Praktické limity ověření

Skutečné zákaznické testování, asistivní čtečka, fyzický iPhone/Android, Safari, vysoký browser zoom a profilování na pomalém zařízení nebyly provedeny. Touch swipe je doplněk podle standardních pointer events, s kontrolou hlavního pointeru a ponechaným pinch zoomem; fyzické gesto nebylo emulováno. Reduced-motion CSS a zákaz automatického spuštění filmu byly zkontrolovány v kódu; systémová preference nebyla přepínána. Test výpadku všech médií a pomalé sítě zůstává k doplnění. Loading guard košíku při čekání na katalog byl ověřen VM reprodukcí.

Tyto limity neznamenají provedené uživatelské testy ani důkaz zlepšení konverze. Navržené úlohy a metriky pro pozdější moderované testování jsou v analýze. Náhled neřeší produkční platby, skutečné objednávky, stav skladu, právní identitu provozovatele ani DNS domény.
