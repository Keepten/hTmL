// Script Code für baksal-03-02.htm

( function ( ) { // anonyme Funktion
	const zeilen = spalten = 5 ;
	let spielbrett = document.getElementById( "spielbrett" );
	for ( let i = 0 ; i < zeilen ; i ++ ) {
		const reihe = spielbrett.insertRow( );
		for ( let j = 0 ; j < spalten ; j ++ ) {
			const zelle = reihe.insertCell( );
			}
		}
	} ) ( ) ; // Anonyme Funktion sofort ausführen
