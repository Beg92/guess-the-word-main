//global variables
const playerGuessLetters = document.querySelector(".guessed-letters");
const guessTextButton = document.querySelector(".guess");
const guessTheLetter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

//starting word is magnolia for testing it out.
let word = "magnolia";
const guessLetter = []; //this array will contain all the letters the player guesses
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  beginTheGame(word);
};
// Fire off the game
getWord();

//this function to update the paragraph's innertext for the wordin progress
//with the circle symbols to represent each letter in the word.
const beginTheGame = function (word) {
  const beginTheGameLetters = [];
  for (const letter of word) {
    //console.log(letter);
    beginTheGameLetters.push("●");
  }
  //using array and then join it back to the string using the .join('') method
  wordProgress.innerText = beginTheGameLetters.join("");
};

guessTextButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";

  const guess = guessTheLetter.value;
  const niceGuess = validateInput(guess);

  if (niceGuess) {
    makeGuess(guess);
  }
  guessTheLetter.value = "";
});

//this function purpose is to validate the player's input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = " Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase(); //to avoid from case sensitivity we use toUpperCase
  if (guessLetter.includes(guess)) {
    message.innerText = " You already guessed that letter, silly. Try again.";
  } else {
    guessLetter.push(guess);
    console.log(guessLetter);
    remainingCountGuesses(guess);
    showGuessLetter();
    updateWordProgress(guessLetter);
  }
};
const showGuessLetter = function () {
  playerGuessLetters.innerHTML = "";
  for (const letter of guessLetter) {
    const li = document.createElement("li");
    li.innerText = letter;
    playerGuessLetters.append(li);
  }
};
//this function will replace the circle symbols with the correct letters guessed.
const updateWordProgress = function (guessLetter) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessLetter.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  //called function if the player has won
  wordProgress.innerText = revealWord.join("");
  checkIfWin();
};

const remainingCountGuesses = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Sorry. Game is Over! The word was <span class="highlight">${word}</span>`;
  } else if (remainingGuesses === 1) {
    remainingGuessSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  }
};
const checkIfWin = function () {
  if (word.toUpperCase() === wordProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};
const startOver = function () {
  guessTextButton.classList.add("hide");
  remainingGuess.classList.add("hide");
  playerGuessLetters.classList.add("hide");
  hiddenButton.classList.remove("hide");
};
hiddenButton.addEventListener("click", function () {
  // reset all original values - grab new word
  message.classList.remove("win");
  guessLetter = [];
  remainingGuesses = 8;
  remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  playerGuessLetters.innerHTML = "";
  message.innerText = "";
  // Grab a new word
  getWord();
  // show the right UI elements
  guessTextButton.classList.remove("hide");
  hiddenButton.classList.add("hide");
  remainingGuess.classList.remove("hide");
  playerGuessLetters.classList.remove("hide");
});
