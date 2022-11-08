( function ( ) {  // IIFE, encapsulates the entire game logic
		
		// Spielfeldgeometrie

	const dx = dy = 40;  // Distance between fields
	const rows = columns = 5;
	const goats = 20;
		
		// Definition der Spielpartein

	const parties = {  
		goat : 0 ,
		lion : 1 ,
		0 : "goat" ,
		1 : "lion"
		} ;

	let party = parties.goat;
		
		// Definition der Spielzug States
		
	const states = {
		selectAnimal : 1 ,
		selectDestination : 2 ,
		confirmDestination : 3,
		1 : "selectAnimal" ,
		2 : "selectDestination" ,
		3 : "confirmDestination"
		} ;

	let stateOfMove = states.selectAnimal ;
	let selectedAnimalField = null ;
	let selectedDestinationField = null ;

		// Support Functions
	
	function findField ( animal ) {
		// Searches for a CIRCLE element with the same coordinates 
		// as the animal (which is usually a TEXT element).
		return document.querySelector( `circle[cx="${animal.getAttribute('x')}"][cy="${animal.getAttribute('y')}"]` );
		}

	function findAnimal ( field ) {
		// Searches for a TEXT element at the same coordinates as the CIRCLE field.
		return document.querySelector( `text[x="${field.getAttribute('cx')}"][y="${field.getAttribute('cy')}"]` );
		}

	function executeMove ( ) {
		const animal = findAnimal( selectedAnimalField );
		animal.setAttribute( "x", selectedDestinationField.getAttribute( "cx" ));
		animal.setAttribute( "y", selectedDestinationField.getAttribute( "cy" ));
		selectedAnimalField.classList.remove( parties[ party ] );
		selectedAnimalField.classList.remove( "animalSelected" );
		selectedDestinationField.classList.add( parties[ party ] );
		selectedDestinationField.classList.remove( "animalDestination" );
		// Eat a goat?
		let killCoordinates = selectedDestinationField.getAttribute( "kills-goat-at" );
		if ( killCoordinates ) {
			killCoordinates = killCoordinates.split( "," );
			selectedDestinationField.removeAttribute( "kills-goat-at" );
			const goatField = document.querySelector( `circle[cx="${killCoordinates[ 0 ]}"][cy="${killCoordinates[ 1 ]}"]` );
			if ( goatField ) {
				goatField.classList.remove( "goat" );
				const goat = document.querySelector( `text[x="${killCoordinates[ 0 ]}"][y="${killCoordinates[ 1 ]}"]` );
				if ( goat ) goat.remove( );
			}	}
		selectedAnimalField = selectedDestinationField = null ;
		}

	function removeValidDestinationMarks( destinationField ) {
		const fields = document.querySelectorAll( "circle.validDestination" );
		for ( let i = 0 ; i < fields.length ; i ++ ) {
			fields[ i ].classList.remove( "validDestination" );
			if ( destinationField !== fields[ i ] ) fields[ i ].removeAttribute( "kills-goat-at" );
		}	}

	function selectDestination( field ) {
		// Markiert das ausgewählte Feld als Ziel, wenn es ein gültiges Ziel ist
		// und liefert in diesem Fall true zurück.
		if ( ! field.classList.contains( "validDestination" )) return false;
		if ( selectedDestinationField ) selectedDestinationField.classList.remove( "animalDestination" );
		field.classList.add( "animalDestination" );
		selectedDestinationField = field;
		removeValidDestinationMarks( field );
		return true;
		}

	function markValidDestinations ( field ) {
			// Sets a "validDestination" attribute on neighbour fields
			// Stores which goat to be killed when lion moves to the field
		const fieldX = parseInt( field.getAttribute( "cx" ));
		const fieldY = parseInt( field.getAttribute( "cy" ));
		const canGoDiagonal = fieldX % (2 * dx) === 0 && fieldY % (2 * dy) === 0
			|| fieldX % (2 * dx) !== 0 && fieldY % (2 * dy) !== 0;
		console.log ( "Field can go diagonal: " + canGoDiagonal );
		for ( let i = -1 ; i < 2 ; i ++ ) {
			for ( let j = -1 ; j < 2 ; j ++ ) {
				if ( i === 0 && j === 0 ) continue ;
				const moveIsDiagonal = i !== 0 && j !== 0;
//				console.log( "moveIsDiagonal: " + moveIsDiagonal );
				if ( ! canGoDiagonal && moveIsDiagonal ) continue;
				const x = fieldX + j * dx ;
				const y = fieldY + i * dy ;
				const candidate = document.querySelector( `circle[cx="${x}"][cy="${y}"]` );
				if ( ! candidate ) continue ;
				// Nur Spielfeld-Felder werde akzeptiert.
				if ( candidate.parentElement.id !== "field" ) continue;
				// Löwen können niemals übersprungen werden.
				if ( candidate.classList.contains( "lion" )) continue;
				// Leere Felder können immer als Zielfeld herhalten.
				if ( ! candidate.classList.contains( "goat" )) {
					candidate.classList.add( "validDestination" ); 
					continue;
					}
				// Das Feld enthält eine Ziege
				// Ziegen können andere Ziegen nicht überspringen
				if ( party === parties.goat ) continue;
				// Löwen können Ziegen überspringen.
				// Zielfeld für den verlängerten Sprung ermitteln
				const candidate2 = document.querySelector( `circle[cx="${x + j * dx}"][cy="${y + i * dy}"]` );
				// Es könnte besetzt sein, dann kann der Löwe nicht springen.
				if ( ! candidate2 || candidate2.classList.contains( "lion" ) || candidate2.classList.contains( "goat" )) continue ;
				// Es ist frei. 
				candidate2.classList.add( "validDestination" ); 
				// Übersprungenes Feld mit der Ziege merken.
				// Bei Ausführung wird die Ziege gefressen.
				candidate2.setAttribute( "kills-goat-at", `${x},${y}` );
		}	}	}

	function markEmptyFields( ) {
		// Called when a goat is about to enter the game field from outside.
		let gameField = document.getElementById( "field" );
		for ( let i = 0 ; i < gameField.children.length ; i ++ ) {
			const field = gameField.children[ i ];
			if ( field.classList.contains( "goat" )) continue;
			if ( field.classList.contains( "lion" )) continue;
			field.classList.add( "validDestination" ); 
		}	}

	function selectAnimal( field ) {
		if ( selectedAnimalField ) {
			// Deselect any previously selected animal.
			selectedAnimalField.classList.remove( "animalSelected" );
//			document.querySelector( "circle.animalSelected" ).classList.remove( "animalSelected" );
			// Remove related valid destination attributes.
			removeValidDestinationMarks( );
			}
		// Select new animal field
		selectedAnimalField = field;
		field.classList.add( "animalSelected" );
		if ( field.parentNode.id === "goat-start-field" ) markEmptyFields( );
		else markValidDestinations( field );
		}

	function processEvent ( field, animal ) {
		// Prevent clicks on other party's animals
		if ( animal && ! field.classList.contains( parties[party] )) {
			console.warn( "You cannot select the other party's animals!" );
			return;
			}
		switch ( stateOfMove ) {
		case states.selectAnimal :
			if ( animal ) {
				selectAnimal( field );
				stateOfMove = states.selectDestination ;
				}
			break;
		case states.selectDestination :
			if ( animal ) selectAnimal( field );
			else if ( selectDestination( field )) stateOfMove = states.confirmDestination ;
			break;
		case states.confirmDestination :
			if ( animal ) {
				selectedDestinationField.classList.remove( "animalDestination" );
				selectedDestinationField = null ;
				selectAnimal( field );
				stateOfMove = states.selectDestination ;
				}
			else if ( field !== selectedDestinationField ) selectDestination( field );
			else {
				executeMove( );
				stateOfMove = states.selectAnimal;
				party = ++ party % 2;
				}
			break;
		}	}
		
		// Registrierung der Event Handler
		
	document.getElementById( "goats" ).addEventListener( "click", function ( evt ) {
		// Das group element #goats Löst nur TEXT-Element Events der Ziegen aus!
		processEvent( findField( evt.target ), evt.target );
		}	)	;
		
	document.getElementById( "lions" ).addEventListener( "click", function ( evt ) {
		// Das group element #lions Löst nur TEXT-Element Events der Löven aus!
		processEvent( findField( evt.target ), evt.target );
		}	)	;
	
	document.getElementById( "field" ).addEventListener( "click", function( evt ) { 
		// Klick-Events auf CIRCLEs 
		processEvent( evt.target, findAnimal( evt.target ) );
		} );

	} ) ( ) ;