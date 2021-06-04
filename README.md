# Global Goals Community
_The Ecologicals:
Vermeulen,Wesley W.P.A. (@I381501)
Vries,Rick R.A.H.P. de (@I390006)
Vegchel,Lieke L. van (@I392267)
Noten,Bente B.C.W. (@I369032)_

### _"Together we build a better world!"_
Global Goals Community is een platform om praktische oplossingen te delen met anderen. Hierbij hebben de gebruikers de mogelijkheid om praktische oplossingen te lezen, liken en zelfs om te reageren.

## Instructies
Om aan de slag te gaan met het ontwikkelen van dit platform zijn er een aantal stappen nodig.

### Stap 1
Clone de repository en vul de juiste gegevens in de [configuratie](qube/includes/configuration.inc.php).

### Stap 2
Installeer composer en npm met de onderstaande commando's in de terminal:

```
composer install
```
```
npm install
```

### Stap 3
Om de JavaScript en SCSS van het platform te compilen en te minifien moet je het volgende commmando uitvoeren:

```
npm run watch
```

Voor het CMS is dit een ander commando, namelijk:
```
npm run admin-watch
```

### Klaar
Je bent nu klaar om aan de slag te gaan met het ontwikkelen van GGC. Er zijn een aantal belangrijke mappen en bestanden die hieronder uitgelegd zullen worden.

#### template_handling.inc.php
In [template_handling.inc.php](template_handling.inc.php) wordt de juiste template met het juiste php bestand ingeladen bij de ingevoerde url. Daarnaast worden hier ook de standaard variabelen en andere Twig functies ingeladen.

#### Templates
In [templates](/templates) staan alle pagina's die te vinden zijn op het platfor. In deze map kunnen nieuwe pagina's aangemaakt worden die overeenkomen met de 'page name' in het CMS. Bij de juiste url wordt meteen het juiste template ingeladen.

#### Includes
[Includes](/includes) bevat alle php bestanden die gelinkt zijn aan een template of op een andere manier worden ingeladen zoals [ajax.inc.php](includes/ajax.inc.php) waarin alle ajax requests staan. Daarnaast bevant [index.inc.php](includes/index.inc.php) alle standaard variabelen die op elke pagina worden ingeladen.

#### Src & public
Binnen [src](/src) vallen alle JavaScript en SCSS bestanden die worden gebruikt op het platform (exclusief CMS). Deze worden d.m.v. commando's compiled en minified in de [public](/public) map waar tevens ook nog een map staat voor alle afbeeldingen.

Wanneer er nieuwe JavaScript bestanden toegevoegd worden, zullen deze ook in [webpack.mix.website.js](webpack.mix.website.js) toegevoegd moeten worden!

#### Classes
De php classes zijn te vinden in de CMS map of via de volgende [link](/qube/includes/classes). Deze worden aangemaakt in [classes.inc.php](/qube/includes/classes.inc.php).

<br/>

## CMS
Voor meer informatie en uitleg over het CMS kan contact worden opgenomen met de ontwikkelaar en eigenaar van Qube CMS, Vermeulen,Wesley W.P.A. (@I381501). Dit is persoonlijke code en dient dus niet zonder toestemming gekopieerd of buiten Global Goals Community gebruikt te worden.

E-mail: contact@wesleyvermeulen.com

<br/>

## Vragen
Voor overige vragen over het gebruik van Twig, SCSS of de ontwikkeling van dit platform kan altijd contact worden opgenomen via contact@wesleyvermeulen.com.