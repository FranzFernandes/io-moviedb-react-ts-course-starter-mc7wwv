# io-moviedb-react-ts-course-starter-mc7wwv

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/FranzFernandes/io-moviedb-react-ts-course-starter-mc7wwv)


Dit is de stackblitz voor de opdracht van IO. Op dit moment is eigenlijk het minimale gedaan om de criteria te behalen, wat om eerlijk te zijn aardig jammer is.
Als ik nog wat meer tijd had gehad dan had ik het volgende nog toegepast:

[ ]: Tests toegevoegd
[ ]: De search resultaten veranderd naar een infinite scroll (eigenlijk ook de reden dat ik voor react-query had gekozen)
[ ]: React router loaders toegevoegd en gecombineerd met react-query, om data sneller in te laden
[ ]: Betere image loaders. Op dit moment wanneer er geen image gevonden is, dan wordt er een default gebroken image getoond. Hetzelfde geld voor het laden van images. Het liefst had ik een fallback geimplementeerd met image.onload
[ ]: Betere Async ux. De toggles zijn bijvoorbeeld op sommige momenten aardig traag. In dit geval is dat eigenlijk handig, want je zou dan juist een optimistische actie kunnen uitvoeren. Op z'n minst had ik anders nog snel de toggles willen disablen (ondanks dat dat niet zo geweldig is)
[ ]: Betere error handling ( is volgens mij wel duidelijk)
[ ]: Beter UX voor de home pagina. Op dit moment, is de home pagina niet echt logisch. Wat ik van plan was om te doen, was de search results ook lokaal op te slaan, zodat je op de home pagina een overzicht krijgt van de laats gezochte queries. Dit maakt de home pagina ook wat praktischer. Het enige andere wat je met de home pagina zou kunnen doen is uitleg geven over hoe de app precies werkt.

Verder leek het me in het begin ook wel leuk om zo'n global pop-up search menu te gaan bouwen, maar dat was meer als er genoeg tijd over was, wat natuurlijk nu niet het geval was ;)

## Verdict over de opdracht:
In totaal heb ik ongeveer zo'n 8 uur aan deze opdracht gewerkt. In eerste instantie had ik hem een beetje onderschat, vanwege het feit dat er een hoop al voor me gedaan was. Alleen is het wel zo dat de totale hoeveelheid features die nodig zijn voor de app wel aardig wat tijd hebben toegevoegd. Ik heb qua tech niet hele gekke dingen gebruikt. Het raarste wat ik heb gebruikt was Valibot ipv Zod, wat ik normaal gebruik. Verder had ik waarschijnlijk een hoop meer kunnen opleveren als ik minder tijd had gespendeerd aan het end-to-end maken van de types van de omdb api. Bij grotere applicaties vind ik dit super belangrijk, maar omdat er in dit geval niet veel data nodig was van de api, had ik dit eigenlijk kunnen overslaan. 