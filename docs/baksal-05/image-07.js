// spielbrett.js
// Funktionen für die Interaktion mit dem SVG-Spielbrett

const circle = document.getElementById( "circle-01" );
circle.addEventListener( "click", function() {
	if ( circle.style.fill === "lime" ) circle.style.fill = "lightsalmon" ;
	else circle.style.fill = "lime" ;
	} ) ;