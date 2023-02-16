const playerGuessLetters = document.querySelector(".guessed-letters");
const guessTextButton = document.querySelector(".guess");
const guessTheLetter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";
const guessLetter = [];

const beginTheGame = function (word) {
  const beginTheGameLetters = [];
  for (const letter of word) {
    console.log(letter);
    beginTheGameLetters.push("●");
  }
  wordProgress.innerText = beginTheGameLetters.join("");
};

beginTheGame(word);

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
  guess = guess.toUpperCase();
  if (guessLetter.includes(guess)) {
    message.innerText = " You already guessed that letter, silly. Try again.";
  } else {
    guessLetter.push(guess);
    console.log(guessLetter);
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
  wordProgress.innerText = revealWord.join("");
  checkIfWin();
  ("");
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats!</p>`;
  }
};
