console.clear();

let move = "player1";

const gameBoard = document.querySelector(".game");
const btnRestart = document.querySelector("#restart");


//convert player state from "XXX" to "111000000"
function convertToLogic(state,player){
  return state.map(el => {
    if (el === player) {
      return "1";
    } else {
      return "0";
    }
  }).join('');
}

//return "X" or "O" when find win combination and "undefined" if none
function winnerCheck(result) {
  const winArray = [
    "111000000",
    "000111000",
    "000000111",
    "100100100",
    "010010010",
    "001001001",
    "100010001",
    "001010100"
  ];

  const logicResultX = convertToLogic(result, "X");
  const logicResultO = convertToLogic(result, "O");

  //check win combinations 
  for (let i=0; i<=winArray.length-1; i++){
    const reg = winArray[i].replaceAll(0,'.');
    if (logicResultX.match(reg) != null){
      return "X";
    } else if (logicResultO.match(reg) != null){
      return "O";
    }
  }
  return undefined;
}


//load current state to array
function getBoardResult () {
  let boardResults = [];
  for (let i=1; i<10; i++){
    boardResults.push(document.querySelector(`.cell:nth-child(${i})`).innerText.trim());
  }
  return boardResults;
}

//reset variables to start values
function restartGame() {
  move = "player1";
  clickCounter = 0;
  btnRestart.className = "hidden";
  gameBoard.classList.remove("win");
  gameBoard.classList.remove("lose");
  for (let i=1; i<10; i++){
    document.querySelector(`.cell:nth-child(${i})`).innerText = '';
  }
  gameBoard.addEventListener("click", cellClickHandler);
}


let clickCounter = 0;

//handler for event click
function cellClickHandler (event){

  //count clicks and stop moves if endgame
  clickCounter++;
  
  
  if ( event.target.innerText.trim().length !== 0 ){
    return false;
  }
  event.target.innerText = move === "player1" ? "X" : "O";
  move = move === "player1" ? "player2" : "player1";

  //check winner
  const gameResult = winnerCheck(getBoardResult());
  if (gameResult){
    if (gameResult === "X") {
      gameBoard.classList.add("win");
    } else {
      gameBoard.classList.add("lose");
    }
    gameBoard.removeEventListener("click", cellClickHandler);
    btnRestart.className = "visible";
  }

  if (clickCounter >= 9) {
    //stop game
    if (btnRestart.className === "hidden"){
      btnRestart.className = "visible";
    }
    gameBoard.removeEventListener("click", cellClickHandler);
    return undefined;
  }

}

restartGame();
btnRestart.addEventListener('click', restartGame)



