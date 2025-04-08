  const playerForm = document.getElementById("player-form");
  const gameArea = document.getElementById("game-area");
  const message = document.querySelector(".message");
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const submitBtn = document.getElementById("submit");

  let players = ["", ""];
  let currentPlayer = 0;
  let boardState = Array(9).fill("");
  let gameEnded = false;

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diags
  ];

  submitBtn.addEventListener("click", () => {
    const player1 = document.getElementById("player-1").value.trim();
    const player2 = document.getElementById("player-2").value.trim();

    if (player1 && player2) {
      players = [player1, player2];
      currentPlayer = 0;
      boardState.fill("");
      gameEnded = false;
      cells.forEach(cell => cell.textContent = "");

      playerForm.style.display = "none";
      gameArea.style.display = "block";
      message.textContent = `${players[currentPlayer]}, you're up`;
    }
  });

  function checkWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        gameEnded = true;
        message.textContent = `${players[currentPlayer]} congratulations you won!`;
        return true;
      }
    }

    if (!boardState.includes("")) {
      gameEnded = true;
      message.textContent = "It's a draw!";
    }

    return false;
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (cell.textContent || gameEnded) return;

      const symbol = currentPlayer === 0 ? "X" : "O";
      cell.textContent = symbol;
      boardState[index] = symbol;

      if (!checkWinner()) {
        currentPlayer = 1 - currentPlayer;
        message.textContent = `${players[currentPlayer]}, you're up`;
      }
    });
  });