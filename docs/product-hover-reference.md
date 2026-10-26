# Produktová interakce Forest Vital — rozbor druhé reference

Reference: [Instagram reel DdT9QmaxO3V](https://www.instagram.com/reel/DdT9QmaxO3V/). Rozbor proveden 27. 10. 2026. Předmětem je obraz viditelný ve videu, nikoli zdrojový kód předváděného webu.

## Co bylo skutečně prohlédnuto

Bylo dekódováno a na čtyřech kontaktních listech vizuálně prohlédnuto všech **301 snímků** videa. Zdroj má rozlišení **720 × 1280 px**, frekvenci **30 snímků/s** a délku **10,033333 s**; poslední snímek má čas **10,000000 s**. Navíc byly zvětšeny důležité stavy a přechody. Záběr je portrétní nahrávka fyzického notebooku: obsah webu zabírá přibližně obdélník x=73–660, y=450–825 ve zdrojovém obrazu, s perspektivou a drobným pohybem kamery. Nejde o ukázku mobilní verze webu.

V přiloženém [product-hover-frames.csv](product-hover-frames.csv) je pro každý snímek čas, průměrný jas výřezu obrazovky, rozdíl proti předchozímu snímku, vzorek barvy pozadí a ručně přiřazený viditelný stav. Indexace je od nuly. První rozdíl je nulová výchozí hodnota; skutečných párových rozdílů je **300**. Ořez byl pro měření zmenšen na 180 × 115 px a převeden do stupňů šedi. Průměrná absolutní změna jasu je **3,7974/255**, nejvyšší **76,3248/255** při snímku 169, tedy 5,633 s. Metrika zachycuje změnu natočeného monitoru, včetně pohybu kamery a komprese; není měřením výkonu ani délky CSS animace původního webu.

Zdrojové video, jeho CDN adresa, jednotlivé obrázky a kontaktní listy zůstávají mimo repozitář a publikovaný web. Soubor CSV neobsahuje přihlašovací údaje, soukromé údaje účtu ani podepsané adresy médií.

## Hlavní vizuální princip

Výběr produktu přebírá **celou prezentační scénu**. Mění se barva rozsáhlého pozadí, název vlevo, dominantní obal ve středu a pořadí menších produktů vpravo. Velký produkt není fotografie sevřená do běžné obdélníkové karty: volně stojí v prostoru, má výraznou velikost a opticky vystupuje před spodní dekorativní plochu.

Odcházející produkt se zvětšuje nebo zůstává velký a odjíždí dolů přes spodní hranu obrazovky. Následující produkt, původně menší napravo, se přesune vlevo do hlavní pozice a doroste. Za ním zůstávají další dva menší náhledy s klesající velikostí a ostrostí. Tím je srozumitelný směr dalšího procházení i bez čtení dlouhého popisu.

Ve videu je sedm čitelných pojmenovaných scén. Přepnutí někdy působí jako rychlá celoplošná změna barvy, jindy je jasně vidět horizontální vstup celé nové vrstvy s pozadím i textem. Nelze z toho určit, zda byly použity skutečné 3D objekty, průhledné obrázky nebo jiná technika. Lze ale přesně převzít prostorovou hierarchii a souběh změn.

## Časová mapa

| Snímky | Čas | Viditelný stav a přechod |
| --- | --- | --- |
| 0–19 | 0,000–0,633 s | **Swedish Vanilla**: tyrkysové pozadí, velký světle modrý kelímek uprostřed, hnědý a zelený menší vpravo. Hlavní název má dva řádky vlevo. |
| 20–38 | 0,667–1,267 s | Vanilkový kelímek sjíždí dolů a přibližuje se spodní hraně. Ostatní náhledy zůstávají napravo. Tyrkysová scéna ještě drží. |
| 39–60 | 1,300–2,000 s | Scéna přechází do **Cookies and Cream**. Pozadí je hnědé, objevuje se čokoládová dekorace, nově aktivní kelímek putuje zprava do centra a roste. Vanilka mizí dole. |
| 61–83 | 2,033–2,767 s | Hnědá scéna je usazená. Aktivní kelímek je vpředu, zelený náhled napravo za ním, další ještě menší na pravém okraji. |
| 84–91 | 2,800–3,033 s | Hnědý kelímek se vydává dolů, zelený se posouvá blíže do hlavní pozice. |
| 92–103 | 3,067–3,433 s | **Mint Chokladchip**: zelené pozadí a zelený produkt vstupují do hlavního stavu, předchozí kelímek pokračuje spodem ven. |
| 104–120 | 3,467–4,000 s | Usazená zelená scéna. Hlavní kelímek výrazně větší než další dva vpravo. |
| 121–124 | 4,033–4,133 s | Začátek odchodu zeleného kelímku směrem dolů. |
| 125–136 | 4,167–4,533 s | Viditelný horizontální přechod do **Choklad Chokladchip**. Zelená plocha i její nadpis odcházejí vlevo, zprava přijíždí hnědá plocha s novým nadpisem. Obě vrstvy jsou krátce současně viditelné. |
| 137–163 | 4,567–5,433 s | Usazená čokoládová scéna. Tmavší hnědý svět, čokoládová dekorace za obalem. |
| 164–168 | 5,467–5,600 s | Velký čokoládový produkt opět sjíždí dolů. |
| 169–182 | 5,633–6,067 s | **Strawberry Junkie**: rychlý přechod do růžové scény, růžový kelímek se přesouvá z pravé pozice do centra. Největší mezisnímková změna jasu nastává na začátku této změny. |
| 183–208 | 6,100–6,933 s | Usazená růžová scéna s jahodovým výrobkem. Další zlatavý kelímek je již vidět vpravo. |
| 209–216 | 6,967–7,200 s | Růžový aktivní kelímek sjíždí dolů. |
| 217–227 | 7,233–7,567 s | Přechod k **Swedish Apple Pie**. Růžová barevnost zůstává podobná, ale nadpis a popis se viditelně posouvají horizontálně a zlatavý obal dorůstá uprostřed. |
| 228–249 | 7,600–8,300 s | Usazená jablečná scéna, nadále růžové pozadí a teple zlatavý hlavní obal. |
| 250–254 | 8,333–8,467 s | Jablečný kelímek odchází dolů, za ním se přibližuje fialový. |
| 255–265 | 8,500–8,833 s | **Blueberry Apple Pie**: fialová plocha a nový dvouřádkový titul, fialový kelímek dorůstá z pravé pozice. |
| 266–300 | 8,867–10,000 s | Poslední fialová scéna drží do konce videa. Menší náhledy napravo stále vysvětlují pokračování kolekce. |

Hranice vedlejších stavů „odchod / vstup / usazení“ jsou ruční popis obrazu přibližně na úrovni několika snímků, nikoli prokázané události aplikace. Hranice změn čitelného názvu a dominantní barvy jsou zřetelnější.

## Layout, barvy, písmo a ovládání

**Layout:** malá značka vlevo nahoře, světlá kapsle navigace nahoře uprostřed a drobné nástroje vpravo nahoře zůstávají na svých místech. Titul a krátký popis tvoří levý sloupec, zhruba první třetinu plochy. Obří produkt obývá střed a dvě menší budoucí varianty pravou část. Dole je krémová zvlněná plocha, vlevo malé portréty a krátký důvěrový text, uprostřed dvojice kruhových šipek, vpravo drobné symboly. Dekorativní vlna zachovává napříč scénami stejnou roli a výškové pásmo; její přesný obrys a vrstvy nemusí být neměnné.

**Barvy:** celá scéna vychází z barvy nebo asociace aktivního produktu. Tyrkysová u vanilky, hnědá u cookies a čokolády, zelená u máty, růžová u jahody a jablka, fialová u borůvky. Krémová spodní plocha a bílá navigační kapsle tvoří opakující se orientační prvky. Ze záznamu monitoru nelze získat přesné původní HEX tokeny: vyvážení bílé, expozice, perspektiva a komprese barvy mění. RGB v CSV jsou jen změřené hodnoty videa z obdélníku x=100–230, y=500–535, který může při přechodu zahrnovat různé vrstvy.

**Typografie:** dvouřádkové názvy mají výrazné tučné zaoblené bezpatkové písmo, světlou barvu a poměrně těsnou sazbu. Pod nimi je několik krátkých řádků menšího textu a dvě malé kapsle CTA. Značka je drobná a typograficky měkčí. Přesné názvy fontů z videa určit nelze. U Forest Vital je vhodné zachovat vlastní rodinu písem a zvětšit titul produktu tak, aby byl hlavním textovým bodem celé scény.

**Ikony a affordance:** dvojice kruhových směrových tlačítek dole jasně naznačuje procházení. Pravé menší produkty fungují jako prostorová předpověď následujících variant. Horní malé kruhové symboly nejsou v záznamu čitelné natolik, aby se dal jejich význam spolehlivě určit. Nepřebírat nečitelnou ikonografii; v implementaci použít vlastní konzistentní SVG a textové názvy ovládání.

**Kurzor a trigger:** vidíme ruku na trackpadu a následné změny scény. Kurzor ani okamžik stisku nelze ve všech přechodech dostatečně číst. Nelze tedy doložit, zda původní přepnutí způsobuje najetí na náhled, kliknutí, šipka, scroll nebo jiná událost. Popisek „$300 website“ je součástí cizího videa, nikoli údaj o ceně ani rozpočtu Forest Vital. Film obsahuje i náznaky generovaného obsahu a podivně se měnící detaily obalů; cizí fotografie ani jejich texty se nepřebírají.

## Přenos do Forest Vital

Vlastní průvodce má mít jeden společný vybraný produkt. Tento výběr má najednou určit **barevný svět, hlavní balení, jméno, pořadí náhledů, cenu, složení, užívání, upozornění a cílové ID košíku**. Dekorativní reakce nesmí ukazovat jiné balení než text a nákupní tlačítko. Je vhodné synchronizovat změnu až ve chvíli, kdy je nové produktové médium připravené, nebo během čekání ponechat konzistentní předchozí stav a jasnou informaci o načítání.

Pro šest dodaných obalů dává smysl původní paleta odvozená z etiket: Paměť chladná modrá, Chlap tlumená cihlová, CBD lesní zelená, Synbiotika jemná tyrkysová, Oči modrozelená a Queen Bee teplá zlatá. Jsou to návrhové tokeny pro tuto značku, nikoli barvy opsané z reelu. Tmavá nebo světlá barva textu se volí podle skutečného kontrastu každého pozadí.

Na desktopu lze vedlejší produkty zvát k výběru najetím a stejnou viditelnou odezvu nabídnout při keyboard focus. Kliknutí má výběr potvrdit, aby se balení neměnilo při pouhém průjezdu myší přes celou stránku. Produktový obsah, cena a košík musí vždy odpovídat potvrzenému výběru. Alternativně může najetí měnit celý výběr, ale pak musí tato změna atomicky zahrnout i všechny informace a akce. Zvolený model má být jednotný a testovatelný.

Na telefonu se stejný koncept ovládá explicitním klepnutím, posouvatelným seznamem produktů a dostatečně velkými šipkami. Hlavní produkt nesmí překrýt popis, cenu ani tlačítko. Všechny funkce zůstávají dostupné bez hoveru. Je třeba zajistit také čitelnost na šířce 320 px, krátkém displeji na šířku a při zvětšení textu.

Pohyb je vhodné skládat z posunu, změny velikosti a opacity nad skutečnými produktovými médii. Nepoužívat pohyb celé stránky ani nekonečný automatický karusel, který by nutil návštěvníka honit odjíždějící tlačítko. Text a CTA mohou zůstat prostorově zakotvené; mění se jejich obsah a barevné souvislosti. Při rychlém opakovaném výběru musí poslední volba vyhrát a předchozí animace se musí přerušit bez duplicitních vrstev.

Při `prefers-reduced-motion` je vhodná okamžitá změna nebo krátké prolínání, bez velkého odjezdu obalu a bez horizontálního pohybu nadpisů. Zobrazení musí dávat smysl i při chybě obrázku nebo pomalém připojení. Prvky mají mít viditelný focus, čitelné popisky a minimálně 44px plochu pro dotyk; miniaturní původní CTA ze záznamu nejsou vhodným vzorem velikosti.

## Rozsah ověření

Tento dokument dokládá snímkový a kompoziční rozbor celé dodané veřejné reference. **Nedokládá otestování živého původního webu**, jeho DOM, hover hitboxů, klávesnice, dotykových gest, responzivních breakpointů, čtečky obrazovky ani výkonu. Doporučené reakce na hover, focus a tap jsou adaptací pro Forest Vital podle uživatelského zadání. Implementaci a její dostupnost je nutné ověřit samostatně na výsledném webu.
