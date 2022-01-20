var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userChosenColour;

var gameStarted = false;
var level = 0;

// event listener
$(".btn").click(function(event) {
    if (gameStarted === true) {
        userChosenColour = event.currentTarget.classList[1];
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length);
    }
    
});

$("body").keypress(function(event) {
    if (gameStarted === false) {
        console.log(event.key);
        nextSequence();
        gameStarted = true;
    }
});

// others
function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]) {
        console.log("success");
        if (userClickedPattern.length === level) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // reset
        gameStarted = false;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        // console.log(level);
        // console.log(currentLevel);
    }
}