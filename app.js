let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1;
const board = makeBoard(HEIGHT, WIDTH);

function makeBoard(HEIGHT, WIDTH) {
    const board = [];
    for(let i = 0; i < HEIGHT; i++) {
      const row = [];
      for(let j = 0; j < WIDTH; j++){
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }


function makeHtmlBoard() {

  const htmlBoard = document.getElementById("board");

  const top = document.createElement("tr"); 
  top.setAttribute("id", "column-top"); 
  top.addEventListener("click", handleClick); 

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}


function findSpotForCol(x) {
    for(let y = HEIGHT - 1; y >= 0; y--){
      if(board[y][x] === null){
        return y;
    }
  }
  return null;
   }


function placeInTable(y, x) {
 const piece = document.createElement("div");
 piece.classList.add('piece', `player${currPlayer}`);
 const chosenCell = document.getElementById(`${y}-${x}`);
 
 chosenCell.append(piece);
}

function endGame(msg) {
    alert(msg);
  }
  
function handleClick(evt) {
 const x = +evt.target.id;
 const y = findSpotForCol(x);
 if (y === null) {
   return;
 }
 
 placeInTable(y, x);
 board[y][x] = currPlayer;
 
 if (checkForWin()) {
   return endGame(`Player ${currPlayer} won!`);
 }
 
 if (board.every(row => row.every(cell => cell))) {
    return endGame("Tie Game!")}
 
 currPlayer = (currPlayer === 1) ? 2 : 1;
  }
  
  
  
  function checkForWin() {
    function _win(cells) {
    
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }
  
    // TODO: read and understand this code. Add comments to help you.
  
    //will loop through the rows:
  for (let y = 0; y < HEIGHT; y++) {
    // loops through the columns:
    for (let x = 0; x < WIDTH; x++) {
      // creates arrays for the possible ways to win 
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // checks to see if same currPlayer has any of the winnng combos, if so returns true 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  }
  
  makeBoard();
  makeHtmlBoard();
  