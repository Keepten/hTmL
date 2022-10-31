//   Funktionen für Baksal

// Variablendeklarationen und Initialisierungen
// Die folgenden Anweisungen werden nur _ein_Mal_ beim Laden des Dokumentes ausgeführt.

var status = "neutral";  // Speichert den Zustand der State Machine
var spielbrett = document.getElementById("spielbrett"); // referenz auf table-objekt mit der ID spielbrett besorgen
var startZelle = null;  // erster Klick
var zielZelle = null;  // zweiter Klick

// Funktionsdeklaration, die nur ein Mal beim Laden des Dokumentes verarbeitet wird.
// Dabei wird die Deklaration gelesen, geprüft, aber NICHT ausgeführt.
// Der Code soll nur bei einem Klick auf die Tabelle ausgeführt werden.

function spielbrettClickHandler(eventInfo)
	{	// click händler erzeugen
		// eventInfo (ist ein Parameter) = enthält Infos über das aufgetretene Ereignis

	// Diese Switch-Anweisung implementiert eine State Machine.
	switch ( status ) {
	case "neutral":
		// Wer will springen?
		startZelle = eventInfo.target;
		if (startZelle.textContent === "L") status = "loewe_will_springen";
		else if (startZelle.textContent === "S") status = "schaf_will_springen";
		if ( status === "neutral" ) startZelle = null; // niemand will springen
		else startZelle.className = status; // Es will doch jemand springen
		break;
	case "loewe_will_springen":
		zielZelle = eventInfo.target;
		if ( startZelle === zielZelle ) {
			// Startzelle wurde deselektiert
			startZelle = zielZelle = null;
			status = "neutral";
			}
		else if ( zielZelle.textContent === "L" ) {  
			// ein anderer Löwe ausgewählt
			// Status ändert sicht nicht
			startZelle.className = "" ;
			zielZelle.className = status;
			startZelle = zielZelle;
			zielZelle = null;
			}
		else if ( true ) { // TODO: Prüfung auf ungültige Zelle
			// Zielzelle markieren
			zielZelle.className = status = "loewe_springt";
			}
		break;
	case "schaf_will_springen":
		zielZelle = eventInfo.target;
		if ( startZelle === zielZelle ) {
			// Startzelle wurde deselektiert
			startZelle = zielZelle = null;
			status = "neutral";
			}
		else if ( zielZelle.textContent === "S" ) {  
			// ein anderes Schaf wurde ausgewählt
			// Status ändert sicht nicht
			startZelle.className = "" ;
			zielZelle.className = status;
			startZelle = zielZelle;
			zielZelle = null;
			}
		else if ( true ) { // TODO: Prüfung auf ungültige Zelle
			// Zielzelle markieren
			zielZelle.className = status = "schaf_springt";
			}
		break;
	case "loewe_springt" :
		if ( eventInfo.target === startZelle ) { 
			// och nööö, noch nicht
			zielZelle.className = "" ;
			zielZelle = null;
			status = "loewe_will_springen" ;
			}
		else if ( eventInfo.target === zielZelle ) {
			// nu aber doch jetz
			startZelle.textContent = "" ;
			zielZelle.textContent = "L" ;
			startZelle.className = zielZelle.className = "" ;
			status = "neutral";
			}
		break;
	case "schaf_springt" :
		if ( eventInfo.target === startZelle ) { 
			// och nööö, noch nicht
			zielZelle.className = "" ;
			zielZelle = null;
			status = "schaf_will_springen" ;
			}
		else if ( eventInfo.target === zielZelle ) {
			// nu aber doch jetz
			startZelle.textContent = "" ;
			zielZelle.textContent = "L" ;
			startZelle.className = zielZelle.className = "" ;
			status = "neutral";
			}
		break;
		}
	console.log(status);
	}


// Hier wird die oben deklarierte Funktion mit dem Klick-Event der Tabelle "Spielbrett" verknüpft.
// Nachdem diese Anweisung korrekt verarbeitet wurde, führt jeder Klick zur Ausführung der Funktion 
// spielbrettClickHandler.
spielbrett.addEventListener("click", spielbrettClickHandler);


