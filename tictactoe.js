let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let audioTurn = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let winnerGame = new Audio("antava.mp3");

let count =0;
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    winnerGame.pause();
};



boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        audioTurn.play();
        if(turnO){
            box.innerHTML = "O";
            turnO = false;
        }else{
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        count++; //to count the number of turns for draw prediction

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){ // if count is 9 and therer is no winner then game will be draw
            gameDraw();
        }
    });
});

const gameDraw = () => {
    gameOver.play();
    msg.innerText = `Game Over! Game Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  }; 
  
const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
};
  
const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
};

const showWinner = (winner) => {
    winnerGame.play();
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//To find out the winner 
const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
