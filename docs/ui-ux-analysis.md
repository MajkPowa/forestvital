# Forest Vital — analýza UI/UX a plán jedné produktové obrazovky

**Rozhodující zadání:** Forest Vital má být OnePage v jedné obrazovce. Návštěvník neprochází dlouhou stránku; prohlíží jednotlivé produkty uvnitř stále stejného viewportu. Výběr převezme celou scénu: skutečné balení, jméno, barevnost, stručné informace a akci. Dlouhý připnutý film, následný průvodce, katalog a redakční sekce pod sebou tomuto zadání neodpovídají.

Dokument vznikl 27. 10. 2026. Vychází z uživatelského zadání, dodaných produktových podkladů, lokálního katalogu šesti výrobků a dvou skutečně prohlédnutých referencí: [496 snímků cinematic reelu](reference-reel-analysis.md) a [301 snímků produktové prezentace](product-hover-reference.md). Druhá reference má pro výslednou strukturu přednost. Starší doporučení dlouhého scrollu v prvním rozboru je novým zadáním překonané; původní dokument zůstává záznamem tehdejší analýzy.

**Důkaz** v tomto dokumentu označuje pozorování podkladů, kódu nebo provedené kontroly. **Návrh** je rozhodnutí pro novou implementaci. **Hypotéza** je dosud nepotvrzené vysvětlení chování návštěvníků. Neproběhly rozhovory se zákazníky, dotazník, analýza konverzí ani zákaznické testování. Záznam notebooku neprokazuje hover hitboxy, mobilní ovládání, klávesnici ani přístupnost původního webu.

## 1. Layout — jedna scéna, stabilní orientace

**Důkaz:** ve druhé referenci zůstává značka, navigační kapsle a spodní ovládání na stejných místech. Mění se produktová scéna. Aktivní balení je výrazně větší než dvě následující vpravo. Film je kamerový záznam desktopového notebooku; portrétní formát reelu není mobilní návrh.

**Návrh:** kořen aplikace vyplní dostupnou výšku viewportu. Hlavička, produktový prostor a spodní výběr jsou řádky jednoho layoutu, bez obsahu umístěného pod scénou. Výška se má přizpůsobit i skutečné výšce mobilního prohlížeče a bezpečným okrajům displeje. Svislá poloha dokumentu není vstupem pro přepínání produktu.

Na širokém displeji má levý sloupec přibližně třetinu šířky: pořadí, kategorii, výrazný název, krátký podtitul, cenu a akce. Střed a pravá část patří velkému balení; další dvě volby napravo vytvářejí hloubku. Spodní lišta obsahuje všechny názvy a zřejmý aktivní stav. Značka a košík drží horní rohy.

Na mobilu se stejné úlohy přeskupí do řádků: úzká hlavička, název s krátkou identifikací, dominantní balení, cena s hlavní akcí a produktové ovládání. Velikost obrázku ustoupí textu a ovládání při malé výšce. Na krátkém displeji na šířku se obraz a informace umístí vedle sebe. Přebytečná dekorace a vedlejší náhledy se mohou skrýt; název, cena, detail, košík a přepínání zůstanou dostupné.

**Přejímka:** v běžném zobrazení je výška dokumentu shodná s viditelným viewportem s tolerancí 1 px, nevzniká vodorovný posuv celé stránky a CTA se neocitne za spodní hranou. Dlouhé složení patří do otevřeného informačního dialogu, který může mít vlastní svislé posouvání. Toto posouvání nemění produkt ani polohu základní scény.

## 2. Colors — barevný svět konkrétního výrobku

**Důkaz:** reference při výběru mění velkou plochu pozadí společně s produktem. Dodané obaly Forest Vital mají odlišné etikety: modrou, červenou, zelenou, světle tyrkysovou, modrozelenou a zlatou. Přesné původní barvy referenčního webu nelze z natočeného monitoru spolehlivě odečíst.

**Návrh palety:** neutrální lesní inkoust, krémový povrch ovládání a šest produktových scén. Následující hodnoty jsou vlastní návrhové tokeny, nikoli tvrzení o již nasazeném CSS. Poměry kontrastu byly vypočteny pro uvedenou dvojici jednolitých sRGB barev; neověřují text přes fotografii, stíny, gradient ani disabled stav.

| Produkt | Návrh pozadí | Návrh textu | Vypočtený kontrast |
| --- | --- | --- | --- |
| Paměť | `#243e56` | `#f7f5ed` | 10,13 : 1 |
| Chlap | `#623a32` | `#fff9ee` | 9,23 : 1 |
| CBD, CBG, CBC | `#254a3c` | `#f8f4e8` | 8,99 : 1 |
| Synbiotika | `#b8d4cd` | `#17372d` | 8,23 : 1 |
| Oči | `#5f9f98` | `#102d26` | 4,84 : 1 |
| Queen Bee | `#d4be85` | `#263b2d` | 6,59 : 1 |

Jedna sada tokenů produktu má řídit pozadí, běžný text, tlumený text, rámeček, focus a CTA. Není vhodné pouze měnit pozadí a ponechat bílý drobný text ve všech scénách. Vybraný produkt musí být poznat také názvem, číslem a obrysem volby; barva nesmí být jediným signálem.

**Přejímka:** běžný text a jeho skutečný výsledný podklad mají cílový kontrast alespoň 4,5 : 1; významné ovládací obrysy a focus alespoň 3 : 1 vůči sousední ploše. Kontrolují se všechny šestice scén i modal, nikoli pouze úvodní produkt.

## 3. Typography — produkt je hlavní titulek

**Důkaz:** ve druhé referenci se velký název vlevo mění spolu s balením. Název má výrazné tučné zaoblené bezpatkové písmo, obvykle dva řádky. Technické drobnosti první cinematic reference mají menší čitelnost a zabírají prostor.

**Návrh:** na základní scéně je právě jeden hlavní název produktu jako skutečný HTML nadpis. Dominantní velikost lze získat stávající rodinou DM Sans s výraznější váhou; přesnou rodinu referenčního videa není potřeba kopírovat. Doporučená hierarchie je produkt 48–88 px na desktopu, 32–48 px na telefonu, běžný text 15–17 px, cena 22–28 px, navigace 13–15 px a pomocné údaje nejméně 12 px. Konkrétní hranice se mají ověřit na nejdelším názvu „CBD, CBG, CBC“ a „Queen Bee“ i při zvětšení textu.

Krátký podtitul může vyjmenovat skutečné složky. Dlouhý marketingový odstavec se do jedné obrazovky nevkládá. Cena a balení mají jednoznačnou vizuální skupinu; množství se nepředstírá tam, kde podklady uvádějí pouze „Tobolky“. Text etikety zůstává ve fotografii, ale důležité informace se vždy opakují v HTML.

Počet rodin a řezů má být omezený. Jedna hlavní rodina pro ovládání, popisy i titul s dobře zvolenými vahami je vhodnější než tři soupeřící rodiny. Pokud se zachová serifový detail značky, nesmí vytvářet druhý stejně dominantní titulek.

**Přejímka:** žádný název není oříznutý, cena se nikdy nezkracuje výpustkou a při zvětšení textu zůstanou dosažitelné všechny úlohy. Při extrémně malém dostupném prostoru se nejprve omezuje dekorativní obrázek; detailní obsah zůstává v dialogu.

## 4. Iconography — vlastní SVG, srozumitelná funkce

**Důkaz:** uživatel dříve upozornil, že textové šipky se na telefonu vykreslují jako emoji. Současný katalog již používá vlastní SVG cesty. V referenci jsou malé horní symboly příliš drobné, aby šel spolehlivě určit jejich význam.

**Návrh:** jeden vlastní systém na mřížce 24 × 24, zaoblené konce a jednotná síla tahu přibližně 1,75 px. Potřebná sada je předchozí, další, informace, košík, srdce, zavřít, plus, minus, potvrzení a rostlinný symbol značky. Šipky mají být cesty SVG; žádné unicode nebo emoji. Ikona listu označuje značku, nepředstírá nezávislý certifikát.

Ikonové tlačítko má přístupný název popisující akci. „Další produkt: Chlap“ je užitečnější než „Šipka vpravo“. Dekorativní SVG je skryté před čtečkou a neobsahuje vlastní focus. Samotné malé číslo v košíku nenahrazuje název tlačítka.

**Přejímka:** všechny ovládací šipky zůstanou vizuálně shodné na desktopu a mobilu; nejsou závislé na systémovém emoji fontu. Dotyková plocha má alespoň 44 × 44 px, i když samotná kresba je menší.

## 5. Spacing — prostor má jasné priority

**Návrh:** základní jednotka je 4 px, hlavní rytmus 8 px. Sada mezer 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 pokryje drobné popisky i kompoziční odstupy. Vnější okraje mohou na široké obrazovce dosahovat 32–64 px, na telefonu 16–24 px plus bezpečný okraj zařízení. Hlavička má vlastní vyhrazený řádek; nesmí se absolutně překrýt s produktem nebo názvem.

Název a podtitul mají menší mezeru než oddělení informace od nákupní akce. Cena patří bezprostředně k CTA. Informační dialog používá jiný rytmus než reklamní scéna: čitelné řádky složení a dostatek prostoru mezi taby, obsahem a zavřením.

**Priorita při nedostatku místa:** zachovat navigaci a akce, dále název a cenu, potom hlavní balení; teprve pak další náhledy, pomocný slogan a dekorativní čísla. Tato hierarchie zabraňuje tomu, aby splnění výšky viewportu znamenalo zmenšení všech textů na obtížně čitelnou velikost.

**Přejímka:** žádné dvě aktivní plochy se nepřekrývají, focus obrys není oříznutý a velká fotografie neblokuje kliknutí na ovládání. Ověřuje se také krátký landscape viewport, nikoli jen šířka telefonu.

## 6. Design systems — jeden stav produktu pro celý web

**Návrh:** zdrojem pravdy je katalog šesti záznamů. Vybraný `productId` určuje jméno, kategorii, podtitul, cenu, balení, obraz, paletu, podrobnosti i ID tlačítka přidání. UI nesmí počítat cenu nebo obsah podle vizuálního indexu vrstvy animace.

| Vrstva | Hlavní součásti | Potřebné stavy |
| --- | --- | --- |
| Základ scény | značka, hlavní produkt, produktový text, cena, CTA | načítání, připraveno, přechod, chybějící obrázek |
| Výběr | šest pojmenovaných voleb, předchozí/další, pořadí | běžný, hover, focus, vybraný |
| Informace | nativní dialog, Složení / Užívání / Upozornění | otevřený, aktivní tab, scroll obsahu, zavření |
| Nákup | košík, množství, součet, ukázkové dokončení | prázdný, naplněný, změněné množství, potvrzení ukázky |
| Zpětná vazba | krátká zpráva, chyba média, uložený produkt | úspěch, chyba, opakování |

Přechod obrazu je odvozený stav. Nová volba má vyhrát nad rozběhnutou předchozí animací. Dobíhající request starého produktu nesmí přepsat současné balení. Pokud se nové médium nepodaří načíst, je dostupná jeho původní fotografie nebo zřejmá náhradní plocha; cena a informace zůstávají pravdivé.

Dialog má vlastní produktový kontext při otevření. Přepínání produktu na pozadí je po dobu dialogu pozastavené. Modal používá standardní zavření, Escape, focus uvnitř a návrat na konkrétní otvírací tlačítko. Tokeny pohybu rozlišují jemnou odezvu ovládání přibližně 120–180 ms a změnu scény přibližně 350–600 ms; jde o návrhové rozsahy pro měření, nikoli již ověřené hodnoty.

## 7. Visual Branding — Forest Vital zůstává vlastní značkou

**Důkaz:** produkty jsou skutečná tmavá balení s odlišnými etiketami. Reference prodává jiný typ výrobku a má vlastní cukrářské dekorace. Její fotografie, značka, texty ani popisek o ceně webu nejsou podkladem pro produktové tvrzení Forest Vital.

**Návrh:** vizuální identita kombinuje botanickou strukturu, tlumené hlubší barvy, krémovou plochu ovládání a čitelné skutečné etikety. Přírodní světlo, měkký stín a malé prostorové naklonění mají podpořit objem obalu. Náhledy nejsou šest téměř stejných středových fotografií v rámečku; každá scéna pracuje s měřítkem, výřezem a odpovídající barvou.

Nová média z Higgsfieldu mají vycházet z dodaných šesti obalů. Požadavek je věrné konkrétní balení a oddělený objekt použitelný ve scéně. Výstup je potřeba zkontrolovat vůči předloze: název, barva, ilustrace etikety, tvar nádoby, víčko a počet produktů. Vygenerovaný název, chybná etiketa nebo nový neprodávaný výrobek nejsou přijatelná náhrada.

Zdravotní účinky, certifikace, skladovost, zákaznické recenze ani sociální důkaz se nedoplňují obrazovou dekorací nebo fikcí. Lesní motiv je značkový rámec; nemění obsah produktového dokumentu.

## 8. UX research — dostupné důkazy a výzkumné mezery

**Dosud dostupné důkazy:** opakované konkrétní požadavky uživatele na mobil, vlastní ikony, skutečné produkty v hero, úpravu produktových fotografií a nyní jednu obrazovku; katalog šesti výrobků; snímkový rozbor obou reelů; dřívější read-only kontrola filmového loaderu a jeho simulované chybové stavy. Tyto podklady dovolují navrhnout konzistentní produktovou prezentaci. Nedovolují tvrdit, že cíloví zákazníci preferují konkrétní barvu nebo že animace zvýší prodeje.

**Hypotézy k ověření:** návštěvník rychleji pochopí kolekci díky velkému obalu a šesti pojmenovaným volbám; detailní složení očekává blízko produktu; filmový přechod mu pomůže zaznamenat změnu, pokud nemusí čekat na dokončení. Jedna obrazovka může zároveň zhoršit objevitelnost podrobností, pokud je jejich tlačítko příliš nenápadné.

Navržené navazující šetření je několik krátkých rozhovorů a moderovaných úloh s lidmi odpovídajícími níže popsaným potřebám. Nejprve zjišťovat, jak si ověřují složení, balení a cenu, co očekávají po kliknutí na detail a zda rozumí ukázkové povaze obchodu. Nábor 5–6 lidí by byl kvalitativní první krok, nikoli reprezentativní průzkum. V tuto chvíli nikdo z takového vzorku test neabsolvoval.

## 9. UX strategy — objevování bez překážky k informacím

Hlavní úkol zní: **poznat konkrétní výrobek, ověřit podrobnosti a bezpečně si vyzkoušet košík, aniž se ztratí orientace v kolekci**. Scéna má zároveň nést značku a poskytovat rozhodovací informace. Nemá návštěvníka nutit dokončit video, čekat na odpočet nebo hledat katalog níže.

Strategické pořadí je identifikace → prozkoumání → ověření → ukázková akce. Jméno a balení odpovídají na „co vidím“, podtitul a kategorie orientují v receptuře, detail obsahuje přesné složení a použití, cena a košík umožní pokračovat. Výběr neslibuje personalizovanou zdravotní diagnózu ani automatické doporučení vhodnosti.

Měřitelnými cíli prvního testu jsou nalezení konkrétního výrobku do 15 s, nalezení složení do 20 s a správné přidání zamýšleného výrobku při každém testovaném toku. Tyto časy jsou předem stanovené cíle, nikoli naměřený výsledek. Pokud návštěvníci nepoznají, kde jsou informace, je potřeba změnit jejich označení a dostupnost, nikoli přidat více dekorativního pohybu.

## 10. User stories — konkrétní úlohy a přejímka

| Příběh | Důvod | Kritérium dokončení |
| --- | --- | --- |
| Jako první návštěvník chci vidět, kolik výrobků existuje a který právě prohlížím. | Orientace bez scrollu. | Dostupných je šest pojmenovaných voleb, aktivní název a pořadí například 01 / 06. |
| Jako člověk hledající Paměť chci přejít rovnou na její balení. | Není potřeba projít pět animací. | Výrobek vyberu jednou přímou volbou; text, obraz, cena a akce odpovídají stejnému ID. |
| Jako pozorný čtenář chci zkontrolovat složení, užívání a upozornění. | Produkt nelze posoudit podle obrázku. | Otevřu detail z každé scény, najdu tři pojmenované části a zavřu jej bez ztráty vybraného produktu. |
| Jako mobilní návštěvník chci přepnout výrobek a přidat jej do ukázky košíku jednou rukou. | Ovládání nesmí záviset na hoveru. | Přímá volba i šipky reagují na dotyk; cena a CTA zůstávají na obrazovce. |
| Jako uživatel klávesnice chci ovládat scénu a dialogy bez myši. | Úplná dostupnost hlavní úlohy. | Focus je vidět, zvolený produkt se oznámí jednou a po zavření dialogu se focus vrátí. |
| Jako člověk omezující pohyb chci stejnou nabídku bez velkých odjezdů a náklonů. | Komfort a kontrola. | Reduced motion odstraní prostorový přechod a nezablokuje výběr ani košík. |
| Jako vracející se návštěvník chci rozpoznat svůj uložený výrobek a obsah košíku. | Pokračování bez účtu. | Uložené položky odpovídají skutečným ID, prázdné i naplněné stavy jsou srozumitelné. |

## 11. User personas — pracovní potřeby, nikoli smyšlení zákazníci

Následující tři profily jsou **pracovní hypotézy podle úloh**. Nejsou výsledkem rozhovorů; nemají vymyšlené citace, demografická procenta, příjem ani tvrzení o zdravotním stavu.

**Zvídavý objevitel** přichází z vizuálního odkazu a dosud nezná názvy. Potřebuje poznat rozsah kolekce a smysl přepínání. Silný obraz mu pomůže vstoupit, ale nezřetelné drobné tečky by mu skryly zbytek nabídky. Návrh pro něj ponechává názvy voleb a příští produkt v náhledu.

**Cílený vracející se návštěvník** zná název nebo vzhled obalu. Potřebuje přímou volbu, cenu a rychlý košík. Povinná úvodní animace by mu bránila splnit úkol. Návrh pro něj neblokuje CTA animací a dovoluje přeskočit na libovolný výrobek.

**Pozorný čtenář podrobností** porovnává zdrojové údaje a chce vědět, co konkrétní balení obsahuje. Potřebuje čitelné složení, jednotky, použití a upozornění. Samotná emocionální scéna mu nestačí. Návrh pro něj zpřístupňuje informační dialog přímo u názvu a zachovává možnost kopírovat skutečný text.

Omezená jemná motorika, klávesnice, malý displej a preference omezeného pohybu nejsou samostatná „okrajová persona“. Jsou to okolnosti, ve kterých musí stejné úlohy fungovat u všech profilů.

## 12. Layout and IA — malá základní vrstva, úplné podrobnosti na vyžádání

**Základní vrstva:** značka, současný výrobek, jeho kategorie a krátký podtitul, cena, doložené balení, otevření informací, přidání do ukázkového košíku, šest přímých voleb, dvě šipky a košík. Doplňková uložená volba nesmí vytlačit hlavní úlohy z malého displeje.

**Informační vrstva:** jeden nativní dialog se třemi částmi Složení / Užívání / Upozornění. Nadpis obsahuje jméno výrobku. Zdrojový obsah je totožný s katalogovým záznamem, bez zkrácení důležitých jednotek nebo upozornění. Dlouhý obsah se posouvá uvnitř dialogu; pozadí je neaktivní a neprochází do jiné scény.

**Nákupní vrstva:** košík v nativním dialogu, počet kusů, odstranění, součet a jasná informace, že jde o náhled bez skutečné platby. Případná ukázková objednávka pokračuje v témže dialogovém systému. Informační text o značce nebo soukromí může mít další dialog; nepotřebuje sekci pod foldem.

Všechny šestice výrobků jsou rovnocenné přímé cíle. Kategorie slouží jako informace, nikoli jako další povinná navigační vrstva nad pouhými šesti položkami. Vyhledávání a řazení nepřinášejí základnímu prohlížení tak malého katalogu stejnou hodnotu jako přímé názvy; pokud zůstanou, mají být v doplňkové nabídce a musí mít jasný účel.

**Přejímka:** nenachází se žádný odkaz typu „dolů do katalogu“, který vede na odstraněnou sekci. Každá primární akce končí v existujícím stavu jedné obrazovky nebo dialogu.

## 13. User flows — stejné rozhodnutí myší, dotykem i klávesnicí

**Základní průchod:** vstup do připravené scény → výběr pojmenovaného produktu nebo šipky → krátký přechod → kontrola názvu, ceny a balení → otevření informací nebo přidání. Výběr se nemá automaticky měnit v čase. Šest položek může tvořit kruh; při cyklení musí být správně aktualizované pořadí a konkrétní přístupné názvy sousedních voleb.

**Hover a focus:** najetí na další balení má poskytnout zřetelný náhled záměru, například přiblížení, mírný náklon a název. Kliknutí nebo Enter potvrdí přechod scény. Tato volba předchází nechtěnému přidání jiného výrobku po pouhém přejetí myší. Pokud implementace zvolí přímou změnu už při hoveru, musí okamžitě synchronizovat všechna data i košíkové ID; nesmí existovat vizuální produkt B s nákupní akcí produktu A. Původní reel přesný trigger neprokazuje.

**Klávesnice:** Tab prochází skutečné akce, Enter/Space aktivují volbu. Šipky vlevo/vpravo a Home/End mohou ovládat produktový picker, když je v něm focus. Nemají globálně přebírat psaní v poli, změny množství nebo navigaci uvnitř otevřeného dialogu. Vybraná položka a její pořadí se oznámí jednou přes stručný status; dekorační čítače nejsou nepřetržitá live region.

**Dotyk:** základ tvoří explicitní názvy a velké šipky. Horizontální gesto na produktové ploše může být doplňkem, nikoli jediným způsobem výběru. Jedno gesto znamená nejvýše jeden přesun. Běžné přiblížení stránky a ovládání otevřeného detailu se nesmějí zablokovat globálním zákazem dotykových gest.

**Kolečko a trackpad:** svislý scroll dokumentu nemění produkt. Globální zachytávání každého wheel eventu je nevhodné: snadno přeskočí několik položek a zasahuje do dialogů. Výchozí návrh kolečko pro změnu výrobku nepotřebuje. Případný doplněk musí být omezený na produktovou plochu, mít zřetelnou nápovědu a ignorovat zoom s modifikační klávesou i otevřené dialogy.

**Detail a návrat:** otevřít informace → fokus uvnitř dialogu → změnit část Složení / Užívání / Upozornění → zavřít přes tlačítko nebo Escape → návrat na tutéž akci stejného produktu. **Košík:** přidat produkt A → jedna zpráva o přidání → otevřít košík → změnit množství nebo odebrat → zavřít → zůstat na původní scéně. Cena, součet a ID se mění podle dat, nikoli podle animovaného obrázku.

## 14. User testing — co je provedeno a co zbývá

**Provedeno před touto změnou rozsahu:** úplný snímkový rozbor obou referencí a simulace vybraných stavů staršího filmového loaderu: úplné a částečné selhání obrázků, opakované načtení, návrat na již vykreslený snímek, ruční mobilní výběr a reduced motion. Šlo o read-only JavaScript harness, nikoli test s účastníky nebo měření skutečného prohlížeče. Tyto výsledky nedokládají správnost nového OnePage layoutu.

**Plán přejímky nové verze:** níže uvedené scénáře jsou při vzniku tohoto dokumentu plánované. Za dokončené je lze označit až s konkrétním výsledkem, rozměrem a důkazem z výsledného buildu.

| ID | Scénář | Měřitelný výsledek | Stav při vzniku dokumentu |
| --- | --- | --- | --- |
| T01 | Základní viewport 320×568, 360×640, 390×844, 768×1024, 1366×768, 1920×1080 a landscape 844×390. | Žádný svislý nebo vodorovný scroll dokumentu; CTA, jméno, cena a přepnutí jsou dosažitelné. | Plán |
| T02 | Vybrat všech šest položek přímo i šipkami. | Šest správných obalů; název, cena, balení, podrobnosti a nákupní ID mají vždy shodný produkt. | Plán |
| T03 | Rychle desetkrát změnit výběr, včetně opačného směru. | Poslední volba vyhraje; žádné zbylé vrstvy, chybné popisky ani odezva starého requestu. | Plán |
| T04 | Celý tok pouze klávesnicí. | Viditelný focus, dostupný picker, správné šipky a taby; otevření a zavření modalu neztratí focus. | Plán |
| T05 | Čtečka obrazovky. | Jedno oznámení změny produktu, pojmenované akce, správný název dialogu; žádný proud filmových čísel. | Plán |
| T06 | Reduced motion a následná změna výběru. | Bez velkého posunu nebo náklonu; všechny funkce stále dostupné. | Plán |
| T07 | Pomalá síť, první chybějící obrázek i chyba dalšího produktu. | Srozumitelná čekací/chybová informace, pravdivý produktový text a dostupná opakovaná volba; žádné nekonečné „načítání“. | Plán |
| T08 | Otevřený detail a změna velikosti nebo orientace. | Dialog zůstane použitelný, vnitřní text je dostupný, pozadí nepřepne produkt ani nezačne scrollovat. | Plán |
| T09 | Košík: přidat každý produkt, změnit množství, odebrat poslední položku. | Správná ID, ceny a součty; dosažitelný prázdný stav, bez skutečné transakce. | Plán |
| T10 | Zvětšení textu a vysoký zoom. | Žádné ztracené akce nebo informace; zmenšuje se dekorace, nikoli důležitost textu. | Plán |
| T11 | Kontrast všech šesti scén, focusu a dialogů. | Dosažené cíle z oddílu Colors podle skutečně vykresleného podkladu. | Plán |
| T12 | Profil načítání a interakce v cílovém prohlížeči. | První užitečný obsah bez povinného stažení všech velkých médií; žádné trvalé kreslení skryté scény, reakce ovládání bez viditelného zadrhávání. | Plán |

Pro pozdější kvalitativní test dostanou účastníci úlohy bez návodného popisu ovládání: najít pojmenovaný produkt, zjistit konkrétní množství složky, přečíst upozornění, přidat zamýšlené balení a vysvětlit, zda vznikla skutečná objednávka. Zaznamenat dokončení, čas, chybné odbočky, slovní porozumění a konkrétní překážky. Případnou změnu konverze lze vyhodnocovat teprve na skutečných datech; tato analýza žádné takové zlepšení nedokládá.

## 15. Audit, plán a implementace — pořadí oprav a hotový výsledek

Audit vychází z předchozí podoby webu a nového zadání, nikoli z tvrzení, že všechny níže uvedené změny již jsou nasazené. Zachovat lze produktová data, vlastní SVG, ukázkový košík a princip nativních dialogů. Zásadně se mění obal aplikace a způsob prohlížení.

| Priorita | Zjištění / riziko | Zásah | Důkaz dokončení |
| --- | --- | --- | --- |
| P0 — soulad se zadáním | Dlouhý dokument s připnutým filmem a katalogem pod sebou odporuje jedné obrazovce. | Nahradit jedním viewportovým produktovým shellem a odstranit závislost na svislém scroll progress. | T01 a kontrola všech primárních odkazů. |
| P1 — správný výrobek | Oddělené animační vrstvy mohou ukázat jiný obal než text nebo košíkové ID. | Jeden společný produktový stav, přerušitelné přechody, ochrana proti starým image requestům. | T02, T03, T07, T09. |
| P1 — dosažitelnost | Při malé výšce se může dominantní obraz dostat přes cenu nebo CTA. | Výškové řádky, minimální velikosti ovládání, kompaktní a landscape varianta, priorita textu před dekorací. | T01, T08, T10. |
| P1 — úplnost informací | Jedna obrazovka nemůže současně čitelně zobrazit všechny dlouhé ingredience a upozornění. | Progressive disclosure přes jasné tlačítko Informace a nativní detail s vnitřním posuvem. | T04, T05, T08. |
| P1 — pravdivost obrazu | Generované balení může změnit etiketu nebo vytvořit neprodávaný výrobek. | Šest skutečných předloh, kontrola každého výstupu, náhradní originální fotografie při chybě. | Ruční srovnání všech šesti finálních médií s předlohami a T02. |
| P1 — přístupnost | Hover, automatický pohyb nebo globální wheel/keyboard listener mohou blokovat hlavní úkol. | Explicitní volby, scope klávesnicových zkratek, správný modal focus, reduced motion, žádný autoplay výběru. | T04–T06, T08. |
| P2 — vizuální jednotnost | Malé HUD popisky a několik soupeřících struktur oslabují produkt. | Jedna výrazná typografická hierarchie, produktové tokeny a zjednodušený počet ovládacích skupin. | T01, T11 a porovnání šesti stavů vedle sebe. |
| P2 — výkon | Velké plochy a média mohou soupeřit o paměť a zdržet první volbu. | Prioritní první produkt, přiměřené rozlišení, načíst sousední obraz až podle potřeby; v pozadí neanimovat. | T07, T12; doplnit skutečné velikosti přenesených dat a naměřené časy. |

**Implementační pořadí:** nejprve vytvořit statickou jednu obrazovku se skutečnými daty a dostupnými akcemi; poté zapojit přímé přepínání a dialogy; dále šest ověřených médií a palet; potom přidat přerušitelný pohyb a hover/focus odezvu; nakonec projít celou matici přejímky a opravovat podle konkrétních selhání. Návrh animace se nesmí stát podmínkou pro přečtení podrobností nebo přidání do ukázkového košíku.

**Definice hotového výsledku:** šest věrných produktových scén v jednom viewportu, žádná dlouhá stránka ani nefunkční kotva, synchronní produktová data, úplné podrobnosti na vyžádání, funkční ukázkový košík, stejné hlavní úlohy na dotyku a klávesnici, použitelná verze při omezení pohybu a chybě média a zaznamenané výsledky přejímky. Publikace náhledu sama o sobě není důkazem splnění těchto bodů.
