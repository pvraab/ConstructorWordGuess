// JavaScript for Bootcamp Homework #11 
// Paul Raab 
// Raab Enterprises LLC 
// 5/30/2019 
// Advanced JavaScript Assignment: 
// Constructor Word Guess

// Main index JavaScript
var wordObj = require("./word.js");

var inquirer = require("inquirer");

var prompts = require('prompts');

var colors = require('colors');

var guessesLeft = 10;
var gameOver = false;

// Use a map object for letters guessed
var lettersGuessed = new Map();

var word = new wordObj();

var lettersLeft = word.letters.length;

// Try a prompts function to get user letters
async function askPrompts() {
    word.showLetters();
    var response = await prompts({
        type: 'text',
        name: 'value',
        message: 'Guess a letter?',
        // validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });
    guess(response.value);
    if (!gameOver) {
        askPrompts();
    }

};

// Try a prompts function to get user letters
function askInquirer() {
    word.showLetters();
    inquirer.prompt([{
        type: "input",
        name: "letter",
        message: "Guess a letter?"
    }]).then(function (response) {
        guess(response.letter);
        if (!gameOver) {
            askInquirer();
        }
    })
}

// Ask the user for a letter use either prompts or inquirer based on roll
// of the random dice
if (Math.floor(Math.random() * 2) === 0) {
    console.log("Using prompts npm package");
    askPrompts();
} else {
    console.log("Using inquirer npm package");
    askInquirer();
}

// Function to handle user guesses
// Called from inside the prompts/inquirer functions
function guess(letter) {
    if (letter.length === 1) {

        letter = letter.toLowerCase()

        // Check for a valid letter - not anumber or ssome other keypress
        // Use ASCII character range from 97-122
        console.log(letter.charCodeAt());
        if (letter.charCodeAt() < 97 || letter.charCodeAt() > 122) {
            console.log("Not a valid letter!\n");
            return;
        }

        // Check if in lettersGuessed Map
        if (!lettersGuessed.has(letter)) {
            lettersGuessed.set(letter, letter);
        } else {
            console.log("Letter has already been guessed!\n");
            return;
        }

        // Look for letter in word
        var numMatched = word.checkUserGuess(letter);
        console.log("Number of matches " + numMatched);
        if (numMatched > 0) {
            console.log("Match!!!\n");
            lettersLeft -= numMatched;
        } else {
            guessesLeft--;
            console.log("Wrong Guess!!!  " + guessesLeft + " guesses remaining\n");
        }

        // Check if all letters have been guessed
        if (lettersLeft === 0) {
            console.log("Winner!!!");
            word.showLetters();
            console.log("Word was " + word.word.america);
            gameOver = true;
        }

        // Check for no more guesses
        if (guessesLeft === 0) {
            console.log("You lose!");
            console.log("Word was " + word.word.rainbow)
            gameOver = true;
        }

    } else {
        console.log("Only guess one letter at a time!\n");
    }

}