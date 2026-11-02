# Forest Vital 1.2.1 — fotografie konopné masti

Uživatel dodal původní fotografii masti, která byla v cenovém releasu 1.2.0 dočasně zastoupená symbolem chybějící fotografie. Přední etiketa potvrzuje značku **Forest Clinic**, označení **FORTE** a název **KONOPNÁ MAST**. Výrobek je ve stříbrné kovové dóze se zelenou, růžovou a zlatou etiketou. Název „CBD mast“ v katalogu navazuje na dodaný ceník; není přepisem textu na etiketě.

Z fotografie nejsou doložené objem ani hmotnost balení, úplné INCI/složení, koncentrace CBD, návod ani upozornění. Tato pole zůstávají označená jako nedoplněná. Fotografie není zdrojem odhadované receptury nebo množství.

## Rozsah změny

- Identita masti v katalogu doplněná podle skutečné předlohy: `fullName` je „Forest Clinic Konopná mast FORTE“, značka „Forest Clinic“ a podtitul „Konopná mast FORTE“.
- Cenové údaje všech šesti produktů zůstávají beze změny. Mast má **570,25 Kč bez DPH**, **690 Kč včetně DPH**, sazbu **21 %**. Dřívější cenové výpočty a zaokrouhlování popisuje [QA 1.2.0](release-1.2.0-qa.md).
- Pět tobolkových produktů, jejich texty, fotografie a nákupní ID zůstávají beze změny. Queen Bee se do nabídky nevrací.
- Cílový studiový výřez je `dist/assets/showroom/cbd-mast.webp`; původní fotografie slouží jako záložní obrázek `dist/assets/products/cbd-mast-source.webp`.

## Kontroly

| Kontrola | Stav |
| --- | --- |
| Vizuální kontrola zdrojové fotografie | Prošlo. Potvrzené znění etikety a typ obalu; neviditelné údaje nejsou doplněné odhadem. |
| Původních pět produktů a cenové údaje všech šesti | Prošlo. Pět tobolkových záznamů je hluboce shodných s HEAD; `price`, `priceExclVat` a `vatRate` jsou shodné u všech šesti výrobků. Nezměnil se ani počet produktů a jejich ID. |
| Studiový výřez a původní záložní fotografie | Prošlo podle vizuální kontroly vlastníka releasu: zachované logo Forest Clinic, růžový pruh, FORTE, zlatý list a KONOPNÁ MAST; celá zavřená stříbrná dóza zůstává viditelná. Studiový master má 1792 × 2240 px s alfa kanálem. Oba cílové WebP soubory existují. |
| Šestá scéna, katalog, alt text a odstranění poznámky o čekající fotografii | Prošlo v lokálním prohlížeči. Scéna, vyhledaný katalog i košík načítají nový WebP (1792 px); alt text uvádí Forest Clinic Konopná mast FORTE. Poznámka o chybějící fotografii je skrytá. Přidání a odebrání testovací masti funguje; původní košík obnoven. |
| Mobilní rozložení a načtení obrazu | Prošlo při 390 × 844 a 320 × 568 CSS px. Celá dóza, cena a ovládání zůstávají viditelné; dokument nepřetéká ani vodorovně, ani svisle. Na desktopu 1422 × 800 px fotografie zapadá do teplého pozadí. Dočasný viewport obnoven. |
| Syntaxe a asset cesty | Prošlo: `node --check` obou JS, `git diff --check`, existence obrázků a verze cache 1.2.1. Žádné aktivní odkazy na starý zástupný symbol, žádné chyby v konzoli při ověřeném toku. |
| Veřejné HTTPS nasazení 1.2.1 | Prošlo 2. 11. 2026 v 23:05 CET. [Pages workflow 41533989541](https://github.com/MajkPowa/forestvital/actions/runs/41533989541) uspěl pro commit `197dbe6fc300f22422fc55c2f983a40b844781bb`. Veřejná stránka a katalog vracejí 200, oba nové WebP soubory jsou binárně shodné s lokálními. Původní zástupný SVG vrací 404. HTTPS apex i HTTP varianty přesměrují na hlavní HTTPS www adresu. Veřejný prohlížeč při 1280 × 720 px potvrzuje úplnou fotografii, správný alt text, skrytou poznámku a zachované ceny. |

Veřejné assety při ověření:

- `assets/showroom/cbd-mast.webp`: 964 060 B, SHA-256 `b645ddc4a3b328ce9786ce3bd71cab89a379a660c01dc41842c8e681aff0480c`.
- `assets/products/cbd-mast-source.webp`: 140 248 B, SHA-256 `9fe04c4f2599368213cb137f2f1ac9213c8d13b9f1be1bd4b68ca2cfe0ee41c9`.
- [Release 1.2.1 a zdrojový ZIP](https://github.com/MajkPowa/forestvital/releases/tag/v1.2.1).

Web zůstává funkčním náhledem bez skutečných plateb a objednávek. Kontroly prohlížeče používají emulované rozměry, nikoli fyzický telefon.
