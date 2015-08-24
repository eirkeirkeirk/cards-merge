var Card = (function () { //begin IIFE...

	// The ctor itself:
	function Card(id) {  //Card is also IIFE's internal name
		if (!isValidID(id))
			return null;
		this.id=id,  //personal property
	};
//------------------
// Private resources (internal use only)
//------------------

	function isValidID(num) { // Returns--> true, false
		return ((typeof num)==="number") //correct type
			&& (num%1 === 0)        //integer
			&& num>=0 && num<=51;   //in range
	};

	var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven',
	'Eight','Nine','Ten','Jack','Queen','King'];

	var suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

//-----------------------
// Class Methods
//-----------------------

	Card.isCard = function(card) { // Returns --> true, falsish
		return card && (typeof card === 'object') // check for null or primitive
			&& ('id' in card) && (card.hasOwnProperty('id'))
			&& isValidID(card.id); //check id
	};

//-----------------------------
// Inherited Instance Methods
//-----------------------------

	Card.prototype.rank = function() { // --> 1..13, NaN
		return Math.floor(this.id/4)+1;
	};

	Card.prototype.suit = function() { // --> 1..4, NaN
		return (this.id%4)+1;
	};

	Card.prototype.color = function() { // -->"red,"black", NaN
		var suitVal=this.suit();
		return suitVal && ((suitVal<3)? "red": "black");
	};

	Card.prototype.name = function() { //--> string, NaN
		var rankVal = this.rank();
		var suitVal = this.suit();
		return rankVal && suitVal &&
			(rankNames[rankVal]+' of '+suitNames[suitVal]);
	};



	// Use factory to create full set:
	Card.fullSet = [];
	for (var id=0; id<52; ++id) {
		Card.fullSet[id] = new Card(id);
	}

	return Card;  //return Ctor
})(); //end IIFE definition and do it now!


// Export as NPM-style module
if (typeof module !== "undefined") {
	module.exports = Card;
}




