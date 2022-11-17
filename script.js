const button =  document.getElementsByTagName("button")[0];
button.addEventListener("click", myFunction);

var board = new Array(9);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(9);
}

const EMPTY = "";
const possibleNumber = ["1","2","3","4","5","6","7","8","9"];


function myFunction() {
  const cells = document.getElementsByTagName("input");
  let ccell = 0;
  for(var i = 0 ; i<board.length ; i++){
    for(var j = 0 ; j<board.length ; j++){
      board[i][j] = cells[ccell].value;
      ccell++;
    }
  }
  board = solveSudoku(board);
  console.log(board);
  ccell = 0;
  for(var i = 0 ; i<board.length ; i++){
    for(var j = 0 ; j<board.length ; j++){
      cells[ccell].value =  board[i][j];
      ccell++;
    }
  }
}



function solveSudoku(board){
  let emptySpaces = [];
  for(let i = 0 ; i<board.length ; i++){
    for(let j =0 ; j<board.length ; j++){
      if(board[i][j]===EMPTY){
        emptySpaces.push({row : i , col : j});
      }
    }
  }

  function recources(emptySpaceIndex){
    if(emptySpaceIndex >= emptySpaces.length){
      return true;
    }
    const {row , col} = emptySpaces[emptySpaceIndex];
    for(let i =0 ; i<possibleNumber.length ; i++){
      let num = possibleNumber[i];
      if(isValid(num , row , col , board)){
        board[row][col] = num;
        if(recources(emptySpaceIndex+1)){
          return true;
        }
        board[row][col] = EMPTY;
      }
    }
    return false;
  }
  recources(0);
  return board;
}

function isValid(number , row , col , board){
  for(let i =0 ; i<board.length ; i++){
    if(board[row][i]=== number || board[i][col]=== number){
      return false;
    }

    let sr = Math.floor(row/3) * 3;
    let sc = Math.floor(col/3) * 3;

    for(let i = sr ; i<sr+3 ; i++){
      for(let j =sc ; j<sc+3 ; j++){
        if(board[i][j]===number){
          return false;
        }
      }
    }
  }
  return true;

}
