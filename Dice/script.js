function changeImg(num, item) {
    if (num === 1) item.setAttribute("src", "./images/dice1.png");
    else if (num === 2) item.setAttribute("src", "./images/dice2.png");
    else if (num === 3) item.setAttribute("src", "./images/dice3.png");
    else if (num === 4) item.setAttribute("src", "./images/dice4.png");
    else if (num === 5) item.setAttribute("src", "./images/dice5.png");
    else if (num === 2) item.setAttribute("src", "./images/dice6.png");
}

function changeTitle(num1, num2) {
    if (num1 < num2) document.querySelector(".container h1").textContent = "Player2 Wins!";
    else if (num1 === num2) document.querySelector(".container h1").textContent = "Draw!";
    else document.querySelector(".container h1").textContent = "Player1 Wins!";
}

var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var item1 = document.querySelector(".img1");
var item2 = document.querySelector(".img2");

changeImg(randomNumber1, item1);
changeImg(randomNumber2, item2);
changeTitle(randomNumber1, randomNumber2);