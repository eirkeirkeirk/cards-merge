var Card = (function () { //begin IIFE...

	// The ctor itself:
	function Card(id) {  //Card is also IIFE's internal name
		if (!isValidID(id))
			return null;
		this.id=id //personal property
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
		return (rankNames[rankVal]+' of '+suitNames[suitVal]);
	};

	// Use factory to create full set:
	Card.fullSet = [];
	for (var id=0; id<52; ++id) {
		Card.fullSet.push(new Card(id));
	}

	return Card;  //return factory function, product of IIFE's work

})();

// Export as NPM-style module
if (typeof module !== "undefined") {
  module.exports = Card;
}

/** Tests of the full deck, printing all properties and executing all functions of each card:
var cards = Card.fullSet.slice();
cards.forEach(function (e) {
  console.log(e);
  for (key in e) {
    if (e[key] instanceof Function) {
      console.log(e[key]());
    } else {
      console.log(e[key]);
    }
  }
  console.log();
})
// End testing code
*/

