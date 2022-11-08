// spielbrett.js
// Funktionen für die Interaktion mit dem SVG-Spielbrett

const circle = document.getElementById( "circle-01" );
const loggingPanel = document.getElementById( "log-panel-01" );
circle.addEventListener( "click", function() {
	loggingPanel.innerText += "Klick! " + Date.now + "\r\n" ;
	} ) ;