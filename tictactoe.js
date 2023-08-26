/* Game Objectives
 * switch turns
 * assign boxes based on click
 * array with each square 
 * status text
 * check for winner
 * declare winner
 * restart the game 
 * start game function that sets up my game
 * boolean for if game is going so I can stop players from clicking after a win
 */

//declaring variables
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; //sets arrays of all the conditions that could win the game, calling the cell number on the grid
let options = ["", "", "", "", "", "", "", "", ""];
//an array of placeholders with empty strings for each cell
let currentPlayer = "X";
//keeps track of the current player
let running = false;
//boolean variable to keep track if the game is running
startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    //function creates an event listener for each cell on click
    restartBtn.addEventListener("click", restartGame);
    //adds event listener to restart game on click of the button
    statusText.textContent = `${currentPlayer}'s turn`;
    //sets the text for current player
    running = true;
    //sets running to true to initialize game
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}//checks if cell clicked is empty and if game is still running, then updates the cell and checks for winner
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}//updates the placeholder on the grid
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
} //changes the player with a ternary operator(?) It takes 3 parameters: the condition, then an expression if truthy, then falsy. It's used as an alternative for an if/else statement. If the current player is equal to X, then change to O, otherwise X, then displays current player
function checkWinner(){
    let roundWon = false;
//temporary variable to keep the game running, when there is a winner, it will be set to true
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
//iterates over all the win condition arrays. Each array has 3 indexes, conditions 0,1,2
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }//if cells A, B, or C are empty, the game continues
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }//if cells A,B, and C are equal (all X or all O), there is a winner and the loop breaks
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }//changes text to display winner and ends the game
    else if(!options.includes("")){
        statusText.textContent = `It's a Draw!`;
        running = false;
    }//if our options does not include any spaces, then the game is a draw
    else{
        changePlayer();
    }//otherwise, we change players and the game continues
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}//resets the current player, resets the options, resets the text for player turn, empties each cell to restart the game