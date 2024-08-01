/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll(".sqr")

const messageEls = document.querySelector("#message")

const resetEl = document.querySelector("#reset")

/*---------------------------- Variables (state) ----------------------------*/
let board = ['','','','','','','','',''];

let turn = 'X'

let tie = false;

let winner = false;


/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['','','','','','','','',''];

    turn = 'X';

    tie = false;

    winner = false;

    messageEls.textContent = "Message"

    render();
}


function render() {
    updateBoard();
    updateMessage();
    resetGame();
}



function updateBoard() {
    board.forEach((cell, idx) => {
       squareEls[idx].textContent = cell
    }
)}

function updateMessage() {
    if (winner === false && tie === false) {
        return turn 
    } else if (winner === false && tie === true) {
        messageEls.textContent = "The Game Ends in a Tie"
    } else if (winner == true) {
        messageEls.textContent = `Congradulations, ${turn} wins`
    }
}


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*----------------------------- Event Listeners -----------------------------*/
function handleClick(event) {
    const squareIndex = event.target.id
    if (board[squareIndex] !== "" || winner) {
        return
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

squareEls.forEach((squareEl) => {
    squareEl.addEventListener("click", handleClick)
});

function placePiece (idx) {
    board[idx] = turn
    console.log("D'oh")
}

function checkForWinner () {
    winningCombos.forEach(winningCombo => {
        if (board[winningCombo[0]] !== "" && board[winningCombo[0]] === board[winningCombo[1]] && board[winningCombo[1]] === board[winningCombo[2]]) {
            winner = true
        }
    })
}

function checkForTie () {
    if (winner == true) {
        return
    } else if (board.includes("") == false) {
        tie = true
    }
}

function switchPlayerTurn () {
    if (winner == true) {
        return
    } if (winner == false && turn == 'X') {
        turn = 'O'
    } else if (winner == false && turn == 'O') {
        turn = 'X'
    }
}


function resetGame () {
    resetEl.addEventListener("click", init) 
    
}