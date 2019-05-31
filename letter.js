// JavaScript for Bootcamp Homework #11 
// Paul Raab 
// Raab Enterprises LLC 
// 5/30/2019 
// Advanced JavaScript Assignment: 
// Constructor Word Guess

// Letter object
function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

    // Display the letter if guessed and
    // an "_" if not
    this.toString = function() {
        if (this.isGuessed === false) {
            return "_";
        } else {
            return this.letter;
        }
    }

    // Check the user guess against the underlying letter
    // Set isGuessed flag
    this.checkUserGuess = function(guess) {
        if (guess === this.letter) {
            this.isGuessed = true;
            return true;
        } else {
            return false;
        }
    }

}

module.exports = Letter;