# Forest Vital — rozbor cinematic reference

Reference: [Instagram reel DcZx7v2oTE2](https://www.instagram.com/reel/DcZx7v2oTE2/). Rozbor proveden 27. října 2026 pro návrh Forest Vital. Cílem je převzít srozumitelný vztah mezi posunem, obrazem, stavem a rozhodnutím o produktu. Cizí značku, fotografie, texty ani video do e-shopu nepřenášíme.

## Rozsah a metoda

Celý získaný klip má **16,533333 s, rozlišení 540 × 960 a 30 snímků za sekundu**. Dekódování vytvořilo **496 snímků**, od indexu 0 v čase 0,000000 s po index 495 v čase 16,500000 s. Nejde o 496 obrazů původní webové animace: jsou to snímky kamerového záznamu monitoru, na němž návštěvník používá web.

U všech 496 snímků byl vypočten průměrný jas a u 495 navazujících dvojic také změna obrazu. Všechny snímky byly vizuálně projity v šesti kontaktových listech. Navíc byl zkontrolován časový přehled po půl sekundě a plný úvodní snímek, aby zůstala zřejmá kompozice monitoru, notebooku a záznamu. Kontaktové listy slouží k prohlídce každého dekódovaného snímku; nejsou náhradou za samostatnou inspekci každého snímku v plném rozlišení. Drobné texty v nahrávce nejsou všude čitelné.

Soubor [reference-frames.csv](reference-frames.csv) obsahuje **jeden řádek na každý snímek**: index, skutečný čas PTS, střední jas výřezu hlavního monitoru, průměrný absolutní rozdíl vůči předchozímu snímku a ručně přiřazenou viditelnou kapitolu. Pro metriku se použil pevný výřez x=0–540, y=190–595, zmenšený na 135 × 101 px a převedený do odstínů šedi. Rozdíl je na stupnici 0–255; pro 495 navazujících dvojic je průměr 7,863 a medián 6,236. První řádek CSV má rozdíl 0 pouze jako výchozí hodnotu bez předchozího snímku. Není to míra plynulosti webu: zahrnuje také pohyb kamery, expozici, moaré a obnovování monitoru.

Klip a jeho snímky zůstávají lokálním referenčním podkladem mimo publikovaný web a Git. Ve zdrojích nejsou přihlašovací údaje, dočasné podpisy CDN ani osobní části rozhraní Instagramu.

## Co je pozorování a co je informace od autora

**Přímo viditelné:** záběr zachycuje desktopový web na monitoru a notebooku. Stránka má pevnou hlavičku, velkou filmovou plochu, ukazatele postupu, produktové karty, konfigurátor, redakční obsah, další filmovou sekci a horizontální ingredientové karty. Při změnách výběru v konfigurátoru se mění aktivní dlaždice, náhled a cena. Návštěvník ovládá notebook; záznam neukazuje přímá dotyková gesta na telefonu.

**Tvrzení popisku reelu:** autor popisuje GSAP ScrollTrigger s připnutím sekce, přibližně 6 230 px posunu a asi 150 přednačtených obrazů kreslených do jednoho canvasu. Uvádí společný zdroj postupu pro čítač a filmové údaje. Toto je popis autora, nikoli nezávisle ověřená implementace: zdrojový kód a běžící DOM původního webu nebyly dostupné.

**Nelze z nahrávky ověřit:** skutečnou délku scrollovacího úseku, interní knihovnu, počet obrazů každé sekce, načítání a paměť, hover a focus stavy, klávesnici, čtečky obrazovky, podporu reduced motion, chování při chybě videa, košík ani checkout. Nahrávka neprokazuje zpětné přetáčení. Portrétní formát videa není doklad mobilního layoutu webu.

## Časová mapa všech snímků

Hranice níže označují viditelný stav nahrávky, nikoli přesné interní spouštěcí body původního webu. U přechodů je běžné, že jsou současně viditelné dvě sousední sekce.

| Snímky | Čas | Viditelný obsah a interakce |
| --- | --- | --- |
| 0–21 | 0,00–0,70 s | Úvodní film: ruka a surovina nad rozpálenou plochou. Velký název vlevo, produktová akce vpravo, filmové značky při okrajích. Text během pokračování ustupuje obrazu. |
| 22–61 | 0,73–2,03 s | Přitlačení suroviny, detail horké plochy a rostoucí číselný údaj teploty. Malý popis a metadata drží stabilní levou osu. |
| 62–102 | 2,07–3,40 s | Další přípravná fáze s rukou, sýrem, párou a žlutým popisem. Spodní pravítko pokračuje ve společném vizuálním rytmu. |
| 103–134 | 3,43–4,47 s | Zvednutí a rozložení komponent, následné sestavení hotového produktu. Výrazná hloubka, světelný kužel a centrální objekt. |
| 135–154 | 4,50–5,13 s | Hotový produkt na podstavci. Obraz má prostor bez dalšího silného textového soupeře; časová linka dochází ke konci. |
| 155–166 | 5,17–5,53 s | Filmová plocha odjíždí nahoru a pod ní se objevuje nabídka. Zřetelný návrat od inscenace k běžné stránce. |
| 167–183 | 5,57–6,10 s | Tři produktové karty s fotografiemi, textem, cenou a akcí. Nadpis odděluje obchodní nabídku od filmu. |
| 184–209 | 6,13–6,97 s | Posun od karet do konfigurátoru. Jsou současně vidět konce nabídky a začátek dalšího úkolu. |
| 210–283 | 7,00–9,43 s | Konfigurátor: tři základní volby nahoře vlevo, menší volby pod nimi, velký výsledný náhled vpravo. Aktivní rámečky a žluté plochy ukazují výběr. Při změně se náhled krátce mění přes výrazný znak varianty a cena se přepočítává; čitelné okamžiky zahrnují 20, 15 a 16. |
| 284–302 | 9,47–10,07 s | Konfigurátor odjíždí, objevuje se redakční blok. Výrazné tlačítko konfigurátoru zůstává před odchodem viditelné. |
| 303–317 | 10,10–10,57 s | Typografický manifest vlevo a velká fotografie vpravo. Méně ovládání, více vysvětlení značky a produktu. |
| 318–333 | 10,60–11,10 s | Čtyři velké číselné statistiky a drobnější vysvětlení. Jednotlivé hodnoty jsou snáze postřehnutelné než malé odstavce. |
| 334–347 | 11,13–11,57 s | Vstup do další filmové sekce. Nový žlutý čítač je na začátku na nule; dosavadní obsah opouští viewport. |
| 348–384 | 11,60–12,80 s | Připnutá inscenovaná scéna grilu. Čítač napravo viditelně roste přibližně 2 → 52 → 156 → 198, spolu se změnou obrazu a barevného indikátoru. Drobné průvodní texty postupně ustupují detailu. |
| 385–400 | 12,83–13,33 s | Film odjíždí k dalšímu obsahu; objevuje se fotografická mozaika. |
| 401–429 | 13,37–14,30 s | Redakční mozaika několika fotografií. Střídání jejich poměrů dodává rytmus po souvislé filmové ploše. |
| 430–444 | 14,33–14,80 s | Přechod k ingredientovým kartám, nadpis a první velké obrazy složek. |
| 445–495 | 14,83–16,50 s | Horizontální posun velkých karet složek. Je vidět několik částečně sousedících karet, což naznačuje pokračování řady. Záznam zde končí. |

## UI principy, které nesou celek

### Jedna filmová plocha a stabilní rám

Silný dojem nevytváří samotné video. Hlavní objekt mění stav uvnitř stále stejného rámu, zatímco okraje, jemná mřížka, pravítko a typografické osy vytvářejí pocit kontroly. Rám dovoluje sledovat pohyb, aniž by se každý okamžik hledalo nové místo pro informaci. Příliš mnoho podobných dekorací by na malém displeji zabralo prostor produktu.

### Postup musí být společný pro obraz i informace

V první filmové části se obraz, popisky, teplota a spodní pravítko čtou jako jeden děj. Druhá filmová část názorněji ukazuje velký čítač a barevný průběh. Záznam však neprokazuje jeden konkrétní počet snímků pro celý web. Navíc je během sestavování produktu stále vidět označení dřívější fáze; popis a akce tedy nepůsobí v každém okamžiku významově přesně. Forest Vital má odvozovat obraz, číslo snímku a kapitolu ze stejného normalizovaného postupu a používat vlastní názvy odpovídající skutečné scéně.

### Stav výběru má být vidět před i po kliknutí

Konfigurátor funguje jako souvislý celek: volba má zvýrazněný rámeček či plochu, vedle je její důsledek a níže cena. Velký přechodový znak varianty poskytuje okamžitou odezvu, ale na chvíli zakrývá hlavní náhled. Forest Vital může převzít tuto blízkost volby a výsledku; delší blokující přechod nepotřebuje. Kliknutí na produkt má okamžitě změnit název, skutečné balení, cenu a obsah příslušných panelů.

### Barva má rozdělené role

Tmavý zelenošedý základ a světlá typografie rámují velmi teplé fotografie. Sytá žlutá je vyhrazena pro aktivní stav, velká čísla, podtržení a hlavní akci. Červená se objevuje v drobném filmovém záznamovém signálu a v intenzivní fázi grilu. Forest Vital si má ponechat svou olivu, krémovou a teplý zlatý či měděný akcent. Červené značky nemají předstírat zdravotní riziko ani upozornění na produkt.

### Typografie rozlišuje příběh a údaje

Reference kombinuje výrazné, úzké verzálkové titulky s malými technickými popisky a velkými čísly. Její drobné HUD údaje nelze z nahrávky vždy přečíst. Pro Forest Vital je vhodné zachovat vlastní serifovou identitu v hlavním titulku, používat čitelný sans pro složení a krátké technické písmo jen u postupu. Cena, balení, dávkování a upozornění musí zůstat skutečným HTML textem, ne součástí videa nebo canvasu.

### Informační architektura střídá emoci a rozhodnutí

Viditelné pořadí je film → nabídka → konfigurátor → vysvětlení → statistiky → další film → obrazové detaily. Pro Forest Vital dává smysl kratší cesta: cinematic úvod → průvodce šesti konkrétními recepturami → plný katalog → podrobnější přístup a pomoc. Přímý odkaz do katalogu má zůstat dostupný, aby dekorativní příběh neblokoval člověka, který už ví, co hledá.

## Přenos do průvodce Forest Vital

1. **Šest pevných produktů, šest přímých voleb.** Vždy viditelný název a pořadí 01–06, nikoli pouze anonymní tečky. Další a předchozí jsou doplňkem k přímému výběru.
2. **Výsledek vedle volby.** Skutečná fotografie balení, podtitul, cena a doložené balení se aktualizují společně. Výběr nemění hledání ani filtry hlavního katalogu.
3. **Složení není konfigurovatelný recept.** Z burgerového konfigurátoru se nepřebírá přidávání či odebírání ingrediencí. U doplňků stravy se nemění složení, dávka ani doporučení podle klikání návštěvníka. Panely Složení / Užívání / Upozornění čtou stejné zdrojové údaje jako detail.
4. **Pohyb je pod kontrolou.** Film může následovat posun, ale existuje krátká cesta přeskočit jej. Změna směru posunu se promítá zpět do stejného postupu; nejde o automatickou prezentaci vydávanou za scroll interakci.
5. **Mobil má vlastní pravidla.** Nahrávka mobilní řešení neukazuje. Na telefonu má zůstat běžný svislý posun, dostupné ruční ovládání produktu a rozumná délka filmové části. Žádné vynucené dlouhé posouvání ani vnitřní scroll pasti.
6. **Přístupnost musí být doplněna a otestována.** Viditelné popisky ovládání, 44px dotykové cíle, klávesnicové přepínání panelů, zachování focusu při otevření detailu, reduced motion, úspora dat a čitelný poster při chybě filmu. Tyto vlastnosti reference nedokládá.
7. **Nákupní pravda zůstává zřejmá.** Dostupnost není známá, košík je ukázkový a nedochází ke skutečné objednávce. Cinematic styl nesmí schovat cenu, upozornění nebo povahu náhledu.

## Kontrolní scénáře pro implementaci

- Zastavení v libovolném místě filmu ukáže odpovídající obraz, číslo a kapitolu; při návratu posunem se stav obrátí bez driftu.
- První návštěvník se dostane do katalogu bez dokončení celého filmu.
- Každý ze šesti produktů je dosažitelný jednou přímou volbou, klávesnicí i dotykem.
- Po změně produktu odpovídají název, balení, cena, složení i upozornění stejnému záznamu.
- Při změně obsahu zůstane focus na zamýšleném ovládání, nikoli na odstraněném prvku.
- Průvodce, přidání do košíku a otevření detailu fungují i bez filmu a bez animací.
- Záznam reference není skutečný uživatelský test. Výsledky testování se zákazníky ani zlepšení konverze z tohoto rozboru nevyvozujeme.
