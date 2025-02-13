let balance = 10000000; // Initial balance
let bet = 1000000; // Default bet amount
let numMines = 5; // Default number of mines
let grid = [];
let revealedCells = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board");
const balanceElement = document.getElementById("balance");
const betInput = document.getElementById("bet");
const minesInput = document.getElementById("mines");

function startGame() {
    // Get user inputs
    bet = parseInt(betInput.value);
    numMines = parseInt(minesInput.value);

    // Prevent starting game with invalid inputs
    if (bet > balance) {
        alert("Insufficient balance! Choose a smaller bet.");
        return;
    }

    // Deduct bet from balance
    balance -= bet;
    balanceElement.innerText = balance;

    // Reset game state
    revealedCells = 0;
    gameOver = false;
    grid = [];

    // Create a grid
    createBoard();
}

function createBoard() {
    grid = [];
    revealedCells = 0;

    // Create the grid (empty cells)
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push({ revealed: false, mine: false });
        }
        grid.push(row);
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        let x = Math.floor(Math.random() * 5);
        let y = Math.floor(Math.random() * 5);
        if (!grid[x][y].mine) {
            grid[x][y].mine = true;
            minesPlaced++;
        }
    }

    // Build the game board HTML
    gameBoard.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-x", i);
            cell.setAttribute("data-y", j);
            cell.addEventListener("click", revealCell);
            gameBoard.appendChild(cell);
        }
    }
}

function revealCell(event) {
    if (gameOver) return;

    const x = event.target.getAttribute("data-x");
    const y = event.target.getAttribute("data-y");
    const cell = grid[x][y];

    if (cell.revealed) return; // Don't reveal the same cell twice

    cell.revealed = true;
    event.target.classList.add("revealed");

    if (cell.mine) {
        event.target.classList.add("mine");
        alert("Game Over! You hit a mine!");
        gameOver = true;
        balance -= bet; // Lost the bet amount
        balanceElement.innerText = balance;
    } else {
        revealedCells++;
        if (revealedCells === (25 - numMines)) {
            alert("You win!");
            balance += bet * 2; // Double the bet for winning
            balanceElement.innerText = balance;
        }
    }
}
