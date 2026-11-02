# Forest Vital 1.2.0 — nové ceny a CBD mast

Nový ceník `ceny FC.docx` z 2. listopadu 2026 nahrazuje ceny pěti dosavadních produktů a uvádí šestou položku CBD mast. Zadavatel výslovně potvrdil, že částky jsou bez DPH. Původní `FC produkty.docx` zůstává zdrojem popisů, složení, užívání a upozornění pěti tobolkových produktů; tato pole se v této změně nemění. Queen Bee zůstává vyřazená.

## Ceny a zdroje

| Produkt | Jednotková cena bez DPH | Sazba DPH | Jednotková cena včetně DPH |
| --- | ---: | ---: | ---: |
| Paměť | 792,86 Kč | 12 % | 888,00 Kč |
| Chlap | 792,86 Kč | 12 % | 888,00 Kč |
| CBD, CBG, CBC | 1 098,22 Kč | 12 % | 1 230,01 Kč |
| Synbiotika | 1 091,08 Kč | 12 % | 1 222,01 Kč |
| Oči | 792,86 Kč | 12 % | 888,00 Kč |
| CBD mast | 570,25 Kč | 21 % | 690,00 Kč |

Tobolky jsou vedené jako doplňky stravy se sazbou 12 %. Mast je dočasně klasifikovaná jako kosmetická zevní péče se sazbou 21 %, nikoli jako registrovaný léčivý přípravek. Její přesná identita a etiketa zatím nejsou doložené; po dodání podkladů je nutné tuto klasifikaci ověřit. [Záznam cenového zdroje](pricing-source-2026-11-02.json) obsahuje původní částky, SHA-256 dokumentu, použité sazby, odkazy na státní zdroje a seznam chybějících podkladů.

Hrubá cena se zaokrouhluje na dvě desetinná místa za jednotku metodou half-up. Zdrojová cena bez DPH se nezkracuje na celé koruny. Řádky košíku a součty se počítají v celočíselných haléřích. DPH se sčítá z jednotkových rozdílů mezi hrubou a čistou cenou podle sazby. Součet základu a uvedených částek DPH proto přesně odpovídá hrubému součtu; může se lišit o haléř od jednorázového přepočtu sazby z agregovaného základu.

## Šestý produkt bez vymyšleného balení

Uživatel uvedl, že fotografii CBD masti pošle později. Položka proto používá původní SVG symbol chybějící fotografie s viditelným označením, že fotografie bude doplněna. Nejde o skutečný obal ani o výstup generování obrázků. Značka, velikost balení, úplné INCI/složení, pokyny a upozornění z etikety nebyly dodané a nejsou nahrazené odhadem.

Mast má vlastní kategorii zevní péče. Její podrobnosti používají obecné označení „Složení“ a „Použití“, nikoli množství na jednu tobolku nebo návod k polykání. Přímé volby, sousední náhledy, katalog a počty používají šest aktuálních produktů.

## Provedené technické kontroly

- Všech šest čistých cen bylo porovnáno s přesnými řádky nového DOCX. Čistá cena, sazba a hrubá cena v `products.json` odpovídají tabulce výše.
- Hluboké srovnání původních pěti záznamů s předchozím commitem potvrdilo shodu všech původních polí kromě ceny. Přidaná pole uchovávají čistou cenu a sazbu DPH.
- Node VM spustil skutečné cenové funkce z `app.js`, včetně formátování, řádkových cen, haléřového součtu a rozpisu DPH. Nešlo o samostatný přepis výpočtu.
- Jeden kus každého ze šesti produktů dal součet **5 806,02 Kč**. Všech šest produktů po 99 kusech dalo **574 795,98 Kč**.
- `node --check dist/app.js`, `node --check dist/showroom.js` a `git diff --check` při cenové kontrole prošly. Závěrečné kontroly po dokončení práce a zveřejnění potvrzuje vlastník releasu.

### Smíšený košík v Node VM

| Produkt | Počet | Řádek včetně DPH |
| --- | ---: | ---: |
| Synbiotika | 2 | 2 444,02 Kč |
| CBD, CBG, CBC | 3 | 3 690,03 Kč |
| Paměť | 1 | 888,00 Kč |
| CBD mast | 2 | 1 380,00 Kč |
| **Produkty celkem** | **8** | **8 402,05 Kč** |

Rozpis byl **7 410,18 Kč bez DPH + 752,37 Kč DPH 12 % + 239,50 Kč DPH 21 % = 8 402,05 Kč**. S konečnou ukázkovou dopravou 99 Kč byl celkový součet **8 501,05 Kč**. Daňový rozpis je výslovně označený jako rozpis za produkty; neprezentuje se jako daňový doklad za dopravu.

## Ověření v prohlížeči

| Kontrola | Stav |
| --- | --- |
| Portrét 390 × 844 a 320 × 568, nepřetékající dokument a úplná desetinná cena | Prošlo. Při 390 × 844 jsou celé ceny 1 222,01 Kč a 1 230,01 Kč viditelné; dokument v obou velikostech nepřetéká. |
| Opakované načtení v malém portrétu a dosažitelnost nákupního tlačítka | Prošlo při 320 × 568 po opakovaném načtení. Tlačítko „Do košíku“ má výšku přibližně 57,4 px a popisky 12 px; obsah nepřetéká. |
| Mobilní krajina 844 × 390 | Prošlo bez přetékání. Dekorativní vlna nevstupuje pod 12px poznámku o ukázkovém obchodu; poznámka zůstává čitelná na barevném pozadí scény. |
| CBD mast: přímý výběr, kategorie, vyhledávání, složení a použití bez tvrzení o tobolkách | Prošlo. Panel složení nemá údaj na jednu tobolku. Záložka „Použití“ uvádí čekající pokyny z etikety. Hledání „mast“ vrátí právě jednu kartu: 690 Kč vč. DPH, 570,25 Kč bez DPH, sazba 21 % a označení „Fotografii doplníme“. |
| Smíšený košík a závěrečný krok ukázkové objednávky v prohlížeči | Prošlo. Šest produktů po jednom dalo 5 806,02 Kč; přidání dalšího balení Synbiotik dalo 7 028,03 Kč. Po návratu na šest kusů byl součet v závěrečné kontrole s dopravou 5 905,02 Kč. |
| Publikované soubory, HTTPS a konečné nasazení 1.2.0 | Prošlo. [Nasazení 41532284843](https://github.com/MajkPowa/forestvital/actions/runs/41532284843) uspělo pro commit `dd30e59bffde626ebe4c4c85d17d14d609134bf3`. HTML, oba JS, obě CSS, JSON a SVG odpovídají místním souborům po sjednocení konců řádků. Veřejný web byl otevřený i v prohlížeči přes HTTPS; scéna Synbiotik zobrazila 1 222,01 Kč / 1 091,08 Kč bez DPH a scéna masti 690 Kč / 570,25 Kč bez DPH s poznámkou o chybějící fotografii. |

Browser kontrola jednoho kusu každého výrobku ukázala základ **5 138,13 Kč**, DPH 12 % **548,14 Kč**, DPH 21 % **119,75 Kč** a hrubý součet **5 806,02 Kč**. Pro závěrečný krok ukázkové objednávky byla použitá funkce se smyšlenými údaji; tlačítko dokončení nebylo stisknuté a žádná objednávka nevznikla. Po testu byla přidaná mast odebrána a obnoven původní místní košík pěti produktů s novým součtem **5 116,02 Kč**.

Publikovaný katalog má šest položek, Queen Bee neobsahuje a všech šest cen bez DPH, sazeb a cen s DPH odpovídá cenovému záznamu. Vlastní doména `www.forestvital.cz` a vynucené HTTPS zůstávají aktivní; platnost certifikátu je ověřená pro apex i www. [Release 1.2.0 se ZIP archivem](https://github.com/MajkPowa/forestvital/releases/tag/v1.2.0) je dostupný.

Browser emulace nenahrazuje fyzické mobilní zařízení, odečítač ani testování se zákazníky. Žádná skutečná objednávka ani platba se neodesílá. Historie vyřazení Queen Bee zůstává v [QA 1.1.1](release-1.1.1-qa.md); širší interakční a mediální kontroly a jejich limity jsou v [QA 1.1.0](release-1.1.0-qa.md). DNS a HTTPS vlastní domény popisuje [záznam nasazení](custom-domain-deployment.md).
