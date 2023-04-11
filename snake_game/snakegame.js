const playGround = document.querySelector(".play_ground");
const scoreElement = document.querySelector(".score");
const highestScoreElement = document.querySelector(".highest_score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeLength = [];
let speedX = 0, speedY = 0;
let setIntervalId;
let score = 0;
//get highest score from local storage
let highestScore = localStorage.getItem("highest_score") || 0;
highestScoreElement.innerText = `Highest Score: ${highestScore}`;

const changeFoodPosition = () => {
    //get random number value to make food positions
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);//clear the timer
    alert("Game Over!! Press Close(or OK) if you want to replay");
    location.reload();//reload the page if press OK
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp"){
        speedX = 0;
        speedY = -1;
    }else if(e.key === "ArrowDown"){
        speedX = 0;
        speedY = 1;
    }else if(e.key === "ArrowLeft"){
        speedX = -1;
        speedY = 0;
    }else if(e.key === "ArrowRight"){
        speedX = 1;
        speedY = 0;
    }
    initGame();
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    //check the snake eat the food with if condition
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeLength.push([foodX,foodY]);//adding food postion to the snakelength array
        score++;

        highestScore = score >= highestScore ? score : highestScore;
        localStorage.setItem("highest_score",highestScore);
        scoreElement.innerText = `Score: ${score}`;
        highestScoreElement.innerText = `Highest Score: ${highestScore}`;

    }

    for (let i = snakeLength.length-1; i > 0; i--){
        //shift one the values of the elements in snake body 
        snakeLength[i] = snakeLength[i-1];
    }
    //let the first element of snake body be current snake position
    snakeLength[0] = [snakeX,snakeY];
    //chaning snake direction
    snakeX += speedX;
    snakeY += speedY;

    //check the snake hit the wall and if happens set game over to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }
    for (let i = 0; i< snakeLength.length; i++){  
        htmlMarkup += `<div class="head" style="grid-area: ${snakeLength[i][1]} / ${snakeLength[i][0]}"></div>`;
        //Condition checking if the snake hit itself and if so set the game over to true
        if (i !== 0 && snakeLength[0][1] === snakeLength[i][1] && snakeLength[0][0] === snakeLength[i][0]) {
            gameOver = true;
        }
    }
    playGround.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);