const cells = document.querySelectorAll(".cell");
const current = document.querySelector("#currentPlayer");
const resetBtn = document.querySelector("#resetBtn");

const winningArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

let spots = ["", "", "", "", "", "", "", "", ""];
let currentP = "X";
let running = false;
let againstAi = true;

startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  resetBtn.addEventListener("click", resetGame);
  current.textContent = `${currentP}'s turn`;
  running = true;
}

function togglePlayer() {
  againstAi = !againstAi;
  if (againstAi) {
    togglePlayerBtn.textContent = "Play Against AI";
  } else {
    togglePlayerBtn.textContent = "Play Against Human";
  }
}
function cellClicked() {
  const cellIdx = this.getAttribute("cellIdx");

  if (spots[cellIdx] !== "" || !running) {
    return;
  }

  updateCell(this, cellIdx);
  checkWin();

  if (againstAi && running && currentP === "O") {
    setTimeout(makeAiMove, 500);
  }
}

function makeAiMove() {
  const emptyCells = spots.reduce(
    (acc, val, idx) => (val === "" ? [...acc, idx] : acc),
    []
  );

  if (emptyCells.length > 0) {
    const randomIdx = Math.floor(Math.random() * emptyCells.length);
    const aiMoveIdx = emptyCells[randomIdx];
    const aiMoveCell = cells[aiMoveIdx];
    updateCell(aiMoveCell, aiMoveIdx);
    checkWin();
  }
}

function updateCell(cell, idx) {
  spots[idx] = currentP;
  cell.textContent = currentP;
}

function playerChange() {
  currentP = currentP === "X" ? "O" : "X";
  current.textContent = `${currentP}'s turn`;
}

function checkWin() {
  let win = false;

  for (let i = 0; i < winningArr.length; i++) {
    const condition = winningArr[i];
    const [cellA, cellB, cellC] = condition.map((idx) => spots[idx]);

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      win = true;
      break;
    }
  }

  if (win) {
    current.textContent = `${currentP} is Winner Winner Chicken Dinner!`;
    running = false;
  } else if (!spots.includes("")) {
    current.textContent = `DRAW!`;
    running = false;
  } else {
    playerChange();
  }
}

function resetGame() {
  currentP = "X";
  spots = ["", "", "", "", "", "", "", "", ""];
  current.textContent = `${currentP}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
