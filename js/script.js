const playerGuess = document.querySelector(".guessed-letters");
const guessTextButton = document.querySelector(".guess");
const guessLetter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining span");
const appearMessage = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";

const beginTheGame = function(word) {
    const beginTheGame = [];
    for (const letter of word) {
        console.log(letter);
        beginTheGame.push("●");
    }
    wordProgress.innerText = beginTheGame.join("");
};

beginTheGame(word);

guessTextButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = postInput.value;
    console.log(guess);
    postInput.value = "";
});