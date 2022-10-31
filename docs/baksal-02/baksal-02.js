//   Funktionen für Baksal

// Variablendeklarationen und Initialisierungen
// Die folgenden Anweisungen werden nur _ein_Mal_ beim Laden des Dokumentes ausgeführt.
// die folgenden vier Variablen sind global und bleiben während der Laufzeit erhalten.
// die folgenden drei Variablen definieren den Zustand der state machine

var status = "neutral";  // Speichert den Zustand der State Machine
var startZelle = null;  // erster Klick
var zielZelle = null;  // zweiter Klick

var spielbrett = document.getElementById("spielbrett"); // referenz auf table-objekt mit der ID spielbrett besorgen


// Funktionsdeklaration, die nur ein Mal beim Laden des Dokumentes verarbeitet wird.
// Dabei wird die Deklaration gelesen, geprüft, aber NICHT ausgeführt.
// Der Code soll nur bei einem Klick auf die Tabelle ausgeführt werden.

function spielbrettClickHandler(eventInfo)
	{	/* diese function behandelt (nur) den einfachen Mausklick innerhalb der Tabelle!
			alle anderen Klicks außerhalb der Tabelle werden ignoriert */
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
			status = "neutral";
			zielZelle.className = "";
			startZelle = zielZelle = null;
			}
		else if ( zielZelle.textContent === "L" ) {  
			// ein anderer Löwe ausgewählt
			// Status ändert sicht nicht
			startZelle.className = "" ;		/* Klassenname der Startzelle gelöscht und damit die Hintergrundfarbe */
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
			// prüfen ob das Schaf bleibt wo es ist
		if ( startZelle === zielZelle ) {
			// Hintergrundfarbe wieder zurücksetzen
			zielZelle.className = "";	
			// state machine in Grundzustand zurücksetzen
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
			startZelle = zielZelle = null;
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
			zielZelle.textContent = "S" ;
			startZelle.className = zielZelle.className = "" ;
			/* die beiden folgenden Zeile setzen die "state machine" in den Grundzustand zurück */
			status = "neutral";
			startZelle=zielZelle=null;
			}
		break;
		}
	console.log(status);
	/* console.log zeigt den Wert von status in der Console des Browser Debugger an*/
	}


// Hier wird die oben deklarierte Funktion mit dem Klick-Event der Tabelle "Spielbrett" verknüpft.
// Nachdem diese Anweisung korrekt verarbeitet wurde, führt jeder Klick zur Ausführung der Funktion 
// spielbrettClickHandler.
spielbrett.addEventListener("click", spielbrettClickHandler);


