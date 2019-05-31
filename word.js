// JavaScript for Bootcamp Homework #11 
// Paul Raab 
// Raab Enterprises LLC 
// 5/30/2019 
// Advanced JavaScript Assignment: 
// Constructor Word Guess

// Word object
var letter = require("./letter.js");

var randomWord = require("random-words");

function Word() {

    // Get a random word
    var word = randomWord();

    // Make sure it is lower case
    word = word.toLowerCase();

    this.word = word;

    // Split the word into a character array
    var wordArr = word.split("");

    // Initialize a letter array to hold Letter objects
    var letters = [];

    // Make a Letter object instance for each letter
    // and push it to the letter array
    wordArr.forEach(function (charVal) {
        var letterObj = new letter(charVal);
        letters.push(letterObj);
    });

    this.letters = letters;

    // Display word with letters shown or hidden
    this.showLetters = function () {
        var display = "";
        this.letters.forEach(function (letter) {
            display += letter.toString() + " ";
        });

        display = display.slice(0, -1);

        console.log(display);
    }

    // Check the user guess against all the letters in the word
    this.checkUserGuess = function(guess) {
        var iCnt = 0;

        // Loop through all the letter objects
        this.letters.forEach(function(letter) {
            if (letter.isGuessed === false && letter.checkUserGuess(guess) === true) {
                letter.isGuessed = true;
                iCnt++;
            }
        });
        return iCnt;
    }
}

module.exports = Word;