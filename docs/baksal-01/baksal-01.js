//   Funktionen für Baksal

var status="undefiniert";
var spielbrett = document.getElementById("spielbrett"); // referenz auf table-objekt mit der ID spielbrett besorgen
// hier endet die Variablendeklaration, die nur beim ersten Mal ausgeführt wird 

// dies ist eine Funktionsdeklaration, die nur beim ersten Mal verarbeitet wird; ohne das er ausgeführt wird
// die Funktion wird von der Browser-Engine aufgerufen; der Code läuft jedes Mal, wenn auf die Tabelle geklickt wird
function spielbrettClickHandler(eventinfo)
	{	// click händler erzeugen
		// eventinfo (ist ein Parameter) = enthält Infos über das aufgetretene Ereignis
	// console.log(eventinfo);
	if (eventinfo.target.textContent ==="") return;	
		
	switch(status)
		{
	case "undefiniert":
		if (eventinfo.target.textContent ==="L" ) 
			{
			// Hintergrund für Löwe, festlegung in css-Datei: td.loewe:gewaehlt
			eventinfo.target.className="loewe_gewaehlt";
			status="loewe_gewaehlt";
			}
		else   //oder es ist ein Schaf
			{
			eventinfo.target.className="schaf_gewaehlt";
			status="schaf_gewaehlt";
			}
		break;
	case "loewe_gewaehlt":
		status="loewe_springt";
		eventinfo.target.className = status;
		break;
	case "schaf_gewaehlt":
		status="schaf_springt";
		eventinfo.target.className = status;
		break;
		}
	console.log(status);
	}





// dies ist eine Anweisung, die nur beim ersten Mal ausgeführt wird
spielbrett.addEventListener("click", spielbrettClickHandler);


