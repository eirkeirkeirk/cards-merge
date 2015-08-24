var makeCard = // receive factory with external name `makeCard`
(function () { //begin IIFE...

    // The factory itself:
    function makeCard(id) {  //makeCard is also IIFE's internal name
        if (!isValidID(id))
            return null;
        var card = {
            id:id,  //personal property
            // links to shared methods, defined below:
            rank : rank,
            suit : suit,
            color: color,
            name : name
        };
        return card;
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

    var suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

//-----------------------
// Methods to be called through factory:
//-----------------------

    makeCard.isCard = function(card) { // Returns --> true, falsish
        return card && (typeof card === 'object') // check for null or primitive
            && (card.name === name) // check at least one method
            && ('id' in card) && isValidID(card.id); //check id
    };

//-----------------------------
// Methods called though instances (where 'this' means the instance):
//-----------------------------

    var rank = function() { // --> 1..13, NaN
        return Math.floor(this.id/4)+1;
    };

    var suit = function() { // --> 1..4, NaN
        return (this.id%4)+1;
    };
   
    var color = function() { // -->"red,"black", NaN
        var suitVal=this.suit();
        return suitVal && ((suitVal<3)? "red": "black");
    };

    var name = function() { //--> string, NaN
        var rankVal = this.rank();
        var suitVal = this.suit();
        return rankVal && suitVal &&
            (rankNames[rankVal]+' of '+suitNames[suitVal]);
    };


    // Use factory to create full set:
    makeCard.fullSet = [];
    for (var id=0; id<52; ++id) {
        makeCard.fullSet.push(makeCard(id));
    }

    return makeCard;  //return factory function, product of IIFE's work

})(); //end IIFE definition and do it now!





