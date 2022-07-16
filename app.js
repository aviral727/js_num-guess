let min = 1,
  max = 10,
  winningNum = getWinningNum(),
  guessesLeft = 3;

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  if (guess === winningNum) {
    gameOver(
      true,
      `You have won yayy!!!, ${winningNum} is the correct answer, 2cr in your bank account now!`
    );
    // guessInput.disabled = true;
    // guessInput.style.borderColor = "green";
    // setMessage(
    //   `You have won yayy!!!, ${winningNum} is the correct answer, 2cr in your bank account now!`,
    //   "green"
    // );
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(
        false,
        `You have no more guesses left :( The correct number was ${winningNum}`
      );

      //   guessInput.disabled = true;
      //   guessInput.style.borderColor = "red";
      //   setMessage(
      //     `You have no more guesses left :( The correct number was ${winningNum}`,
      //     "red"
      //   );
    } else {
      guessInput.value = "";
      setMessage(
        `${guess} is not correct, you have ${guessesLeft} guesses left!`,
        "red"
      );
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.value = "";
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

function getWinningNum() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
