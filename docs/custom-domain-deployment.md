# Forest Vital — vlastní doména

Záznam konfigurace z 2. listopadu 2026. Primární adresa je `https://www.forestvital.cz/`. Publikování nadále zajišťuje GitHub Pages z větve `main`, workflow `.github/workflows/pages.yml` a adresáře `dist/` v repozitáři `MajkPowa/forestvital`.

## Stav při provedení změny

V GitHub Pages je nastavená vlastní doména `www.forestvital.cz`. Ve Forpsi byly upraveny DNS záznamy podle tabulky níže. Nameservery `ns.forpsi.cz`, `ns.forpsi.net` a `ns.forpsi.it` zůstaly beze změny; DNSSEC zůstal zapnutý.

Živé ověření dokončeno 2. listopadu 2026 v 19:06 CET: DNS na obou doménách odpovídá konfiguraci a GitHub Pages je označuje za validní. Přísná TLS kontrola bez vypnutí ověřování certifikátu prošla na `forestvital.cz` i `www.forestvital.cz`. Primární HTTPS stránka vrací 200 a HTTPS apex vrací 301 na `https://www.forestvital.cz/`. Veřejný HTTPS katalog obsahuje pět produktů bez Queen Bee.

Certifikát GitHub Pages je ve stavu `approved`, pokrývá oba názvy a má uvedenou expiraci 31. ledna 2027. Bylo zapnuto a zpětně ověřeno `https_enforced: true`. Nově načtený HTTP asset (`/favicon.svg`) již vracel 301 na HTTPS; dříve uložená HTTP odpověď úvodní stránky byla v době kontroly ještě v CDN mezipaměti s životností do přibližně 19:15 CET.

Po předchozím čekání na DNS byl v 19:05 CET jednou restartován proces vystavení certifikátu odebráním a okamžitým obnovením vlastní domény v Pages. Obnovení `www.forestvital.cz` bylo ověřeno; DNS se při tomto kroku neměnilo.

| Název | Typ | Hodnota | TTL |
| --- | --- | --- | --- |
| `forestvital.cz` | A | `185.199.108.153` | 1800 s |
| `forestvital.cz` | A | `185.199.109.153` | 1800 s |
| `forestvital.cz` | A | `185.199.110.153` | 1800 s |
| `forestvital.cz` | A | `185.199.111.153` | 1800 s |
| `www.forestvital.cz` | CNAME | `majkpowa.github.io` | 1800 s |

Původní wildcard CNAME byl při změně nahrazen explicitním záznamem `www`. Jiné subdomény proto nelze považovat za automaticky nasměrované. Původní GitHub adresa `https://majkpowa.github.io/forestvital/` může při aktivní vlastní doméně přesměrovávat na `www.forestvital.cz`; nejde o nezávislý záložní hosting.

## Původní konfigurace a návrat

Před změnou byly v editoru Forpsi dva záznamy:

| Název | Typ | Hodnota | TTL |
| --- | --- | --- | --- |
| `forestvital.cz` | A | `81.2.196.19` | 1800 s |
| `*.forestvital.cz` | CNAME | `forestvital.cz` | 1800 s |

Pro návrat obnovit původní apex A záznam na `81.2.196.19`, odstranit čtyři GitHub A záznamy a změnit explicitní `www` CNAME zpět na původní wildcard `*.forestvital.cz → forestvital.cz`. Zachovat nameservery i DNSSEC a ověřit propagaci původních hodnot. Potom odebrat vlastní doménu v nastavení GitHub Pages (`cname: null`), čímž se znovu použije původní adresa projektu `https://majkpowa.github.io/forestvital/`.

Návrat DNS obnovuje předchozí směrování; nezaručuje obsah ani funkčnost předchozího hostingu. Konfigurace domény nemění demo charakter obchodu: platby, skutečné objednávky ani napojení skladu nejsou aktivované.
