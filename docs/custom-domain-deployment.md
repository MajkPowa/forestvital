# Forest Vital — vlastní doména

Záznam konfigurace z 2. listopadu 2026. Primární adresa je `https://www.forestvital.cz/`. Publikování nadále zajišťuje GitHub Pages z větve `main`, workflow `.github/workflows/pages.yml` a adresáře `dist/` v repozitáři `MajkPowa/forestvital`.

## Stav při provedení změny

V GitHub Pages je nastavená vlastní doména `www.forestvital.cz`. Ve Forpsi byly upraveny DNS záznamy podle tabulky níže. Nameservery `ns.forpsi.cz`, `ns.forpsi.net` a `ns.forpsi.it` zůstaly beze změny; DNSSEC zůstal zapnutý.

Šíření DNS a aktivace certifikátu HTTPS ještě vyžadují živé ověření. V době tohoto záznamu nebylo v GitHub Pages zapnuté vynucování HTTPS (`https_enforced: false`) a certifikát čekal na dokončení. Tento dokument nepotvrzuje platný certifikát ani dokončené přesměrování všech variant adresy.

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
