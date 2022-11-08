// - - - Gobal State - - - 

var party = "goats";  
	// Goats make the first move.
var stateOfMove = "selectSource" ;  
	// controls the states of a move
	// Values: selectSource, selectDestination, confirmDestination
var animalSelected = null;
	// Stores the animal to be moved or null if none is selected.
var animalDestination = null;
	// Stores the move destination field or null if none is selected.

// - - - Functions - - -

function animalIsComaptible( textElement ) {
	//// Returns true if the animal clicked is one of the current party's animals.
	switch ( textElement.textContent ) {
	case "G" : return party === "goats" ;
	case "L" : return party === "lions" ;
	default : console.error( "isAnimalComatible(): Logic Error" );
	}	}

function destinationIsValid( ) {
	//// returns true if the destination is within reach 
	// TODO
	return true;
	} 

function findField ( animal ) {
		//// Searches for a circle field with the same coordinates 
		//// as the animal (which is usually a TEXT element).
	return document.querySelector( `circle[cx="${animal.getAttribute('x')}"][cy="${animal.getAttribute('y')}"]` );
	}

function findAnimal( circleField ) {
		// Searches for an animal on that field.
	return document.querySelector( `text[cx="${circleField.getAttribute('x')}"][cy="${circleField.getAttribute('y')}"]` );
	}

function selectAnimal( animal ) {
		// Note: The event target is *always* a TEXT element.
	switch ( stateOfMove ) {
	case "selectSource" :
			// Make event target the selected animal
		animalSelected = animal ;
			// and highlight its circular field.
		findField( animalSelected ).classList.add( "animalSelected" );
			// Set the new move state.
		stateOfMove = "selectDestination" ;
			// Log new state.
		console.log( "Selected animal: " + animal.textContent + " at " + animal.getAttribute( "x" ) + " " + animal.getAttribute( "y" ));
		break;
	case "selectDestination" :
		if ( evt.target === animalSelected ) {
				// The selected animal has been clicked again,
				// so deselect it.
			findField( animalSelected ).classList.remove( "animalSelected" );
				// No animal is currently selected.
			animalSelected = null ;
				// We are back in the select source animal state.
			stateOfMove = "selectSource" ;
			}
		else if ( evt.target.tagName === "TEXT" && animalIsComaptible( evt.target )) {
				// Another compatible animal has been selected as source.
			findField( animalSelected ).classList.remove( "animalSelected" );
				// Make the new animal the source of the move.
			animalSelected = evt.target ;
				// Highlight its field.
			findField( animalSelected ).classList.add( "animalSelected" );
				// We are still in the select destination state.
			stateOfMove = "selectDestination" ;
			}
		else if ( evt.target.tagName === "TEXT" && ! animalIsComaptible( evt.target )) {
			alert( "You cannot ride that animal...!" );
			}
		else if ( evt.target.tagName === "CIRCLE" && destinationIsValid( evt.target )) {
				// The move destination has been chosen.
			animalDestination = evt.target ;
				// Highlight the destination circle
			animalDestination.classList.add( "animalDestination" );
				// Next state conforms the destination.
			stateOfMove = "conformDestination" ;
			}
		else if ( evt.target.tagName === "CIRCLE" && ! destinationIsValid( evt.target )) {
			alert ( "Nope, you cannot move there. Too far away!" );
			}
		break;
	default :
		console.error( "goatClickHandler(): Internal Logic Error!" );
		break;
	}	}

function goatClickHandler ( evt ) {
	if ( party === "goats" ) selectAnimal( evt.target ) ;
	}

function lionClickHandler ( evt ) {
	// Exit if goats are on the move.
	if ( party === "lions" ) selectAnimal( evt.target ) ;
	}

function fieldClickHandler ( evt ) {
		// Only circle elements can call this event handler!
		// Handles both lions and goats destination clicks
		// Make sure that the destination field is not acciently occupied.
	const animal = findAnimal( evt.target );
	if ( animal ) selectAnimal( animal );
	else switch ( stateOfMove ) {
	case "selectDestination" :
		if ( destinationIsValid( evt.target )) {
				// The move destination has been chosen.
			animalDestination = evt.target ;
				// Highlight the destination circle
			animalDestination.classList.add( "animalDestination" );
				// Next state conforms the destination.
			stateOfMove = "conformDestination" ;
			}
		else if ( evt.target.tagName === "CIRCLE" && ! destinationIsValid( evt.target )) {
			alert ( "Nope, you cannot move there. Too far away!" );
			}
		break;
	case "confirmDestination" :
			if ( evt.target === animalDestination ) {
					// The second click on the animal destination confirms the move.
					// Remove the animal from its parent circle field.
				animalSelected.remove();
					// Append it to the destination circle.
				animalDestination.append( animalSelected );
					// Update state
				stateOfMove = "selectSource" ;
					// Invalidate references
				animalSelected = animalDestination = null;
				}
		break;
			break;
	default :
			console.error( "lionClickHandler(): Internal Logic Error!" );
			break;
	}	}

( function ( ) {
	///	 Init module
	document.getElementById( "lions" ).addEventListener( "click", lionClickHandler );
	document.getElementById( "goats" ).addEventListener( "click", goatClickHandler );
	document.getElementById( "field" ).addEventListener( "click", fieldClickHandler );
	} ) ( ) ;