# Familytree app

Rakendus on loodud Net Group suveülikooli kandideerimisülesande raames.

Olen Tallinna Ülikooli 2. kursuse tudeng ning olen äärmiselt huvitatud sellest, kuidas käib töö päris projektides firmades. Olen ka väga motiveeritud ning naudin programmeerimist, mida harrastasin juba enne kooli astumist hobina.

## Reeglid vigade vältimiseks

Lisatava inimese sisaldamisel kasutajate poolsete vigade vältimiseks on mul järgnevad reeglid:

-   Lisatava inimese nimi peab olema korrektne
-   Laps ei tohi olla vanem kui vanemad
-   Sünni ja surma kuupäevad ei tohi olla suuremad kui tänane kuupäev
-   Surma kuupäev ei tohi olla enne sünnikuupäeva
-   Vanemad peavad olema samast perekonnast pärit kus laps on

## Reeglid mida rakendus peab täitma

Rakenduses oleva sisu kuvamise reeglid:

-   Kui isikul on lapsed, tuleb nad loendada isiku vaates
-   Kui isikul on õed/vennad, tuleb nad loendada isiku vaates
-   Kui isik kustutatakse, tuleb temast eemaldada viited teistelt isikutelt
-   Statistika lehel peab olema link igale kujutatud isikule
-   Isiku vaates peab olema link isiku perekonnale.

## Lahenduse loomisele kulunud aeg

Net Groupi suveülikooli programmist sain teada alles 19. märtsil läbi ülikooli ning olen sellest ajast saadik iga päev selle projekti kallal töödanud.

Eelnevalt ei olnud Spring Booti kasutanud ning esimene päev kulus selle õppimise peale. Paari Googlest leitud õpetusega sain üsna kiiresti oma backend rakenduse tööle ja sai lisatud järjest vajalikud otspunktid, mida mu frontend rakendus kasutama hakkab.

Andmed otsustasin jätta seekord väga lihtsana: üks list inimeste jaoks ja üks list perekondade jaoks. Jätsin nad sellisel kujul, sest Spring Boot oli minu jaoks niigi uus ning tundsin, et mul ei pruugi olla piisavalt aega, et õppida kuidas ühendada Spring Boot mõne andmebaasimootoriga. Samas töötas mu kahe listi süsteem väga sarnaselt mongoDB mootorile, mida olin eelnevalt kasutanud koos nodeJS backendiga.

Oma frontend rakenduses otsustasin kasutada Reacti koos typescriptiga. Olin eelnevalt tuttav Reactiga ja olin hiljuti alustanud typescripti õppimist ehk tundus nagu hea ülesanne, kus oma oskusi arendada.

Suurem osa ajast kulus frontendi peale. Pole siiani veel CSSiga sinapeale saanud ning palju aega kulus just selle peale. Kui frontendis oli vaja serverist midagi kätte saada, tegin kiiresti serverisse vajalikud funktsioonid ja otspunktid.

## Heroku

Laadisin ka valminud lahenduse üles Heroku keskkonda. Olin sunnitud backendi ja frontendi eraldi serveritesse laadima, seega jõudlus pole kõige kiirem.

### Frontend

https://fierce-tor-36058.herokuapp.com/

### Backend

https://blooming-ocean-33098.herokuapp.com/

## Kasutatud tehnoloogiad

-   Visual Studi Code - Frontend töö
-   Intellij IDEA - Backend töö
-   Postman - Backend testimine
-   Spring Boot 2.2.6 - Backend
-   ReactJS, Typescript, Sass - Frontend
-   Heroku - Hosting
