var Card = // receive Ctor with external name `Card`
(function () { //begin IIFE...

	// The ctor itself:
	function Card(id) {  //Card is also IIFE's internal name
		if (!isValidID(id))
			return null;

		// Personal methods:
		this.rank = function() { // --> 1..13
			return Math.floor(id/4)+1;
		};
		this.suit = function() { // --> 1..4
			return (id%4)+1;
		};

		// links to shared methods, defined below:
		this.color= color;
		this.name = name;
	};

//------------------
// Private resources (internal use only)
//------------------

	var isValidID = function(num) { // Returns--> true, false
		return ((typeof num)==="number") //correct type
			&& (num%1 === 0)        //integer
			&& num>=0 && num<=51;   //in range
	};

	var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven',
						'Eight','Nine','Ten','Jack','Queen','King'];
	var rankAbbrs = ['','A','2','3','4','5','6','7','8','9','10','J','Q','K'];

	var suitNames = ['','Hearts','Diamonds','Spades','Clubs'];
	var suitAbbrs = ['','H','D','S','C'];

//-----------------------
// Methods to be called through factory:
//-----------------------

	Card.isCard = function(card) { // Returns --> true, falsish
		return card && (card instanceof Card); // check for null or primitive
	};

//-----------------------------
// Shared Instance Methods
//-----------------------------

	var color = function() { // -->"red,"black", NaN
		var suitVal=this.suit();
		return ((suitVal<3)? "red": "black");
	};

	var name = function() { //--> string, NaN
		var rankVal = this.rank();
		var suitVal = this.suit();
		return rankNames[rankVal]+' of '+suitNames[suitVal]);
	};
	var shortName = function() { //--> string, NaN
		var rankVal = this.rank();
		var suitVal = this.suit();
		return rankAbbrs[rankVal]+suitAbbrs[suitVal]);
    };



	// Use factory to create full set:
	Card.fullSet = [];
	for (var id=0; id<52; ++id) {
		Card.fullSet.push(new Card(id));
	}

	return Card;  //return factory function, product of IIFE's work

})();




