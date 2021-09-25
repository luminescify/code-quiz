var time = questions.length * 15;
var timer;
var questionIndex = 0;
var isWin = false;

// DOM elements
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timeEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var finalScore = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");
var userInitials = document.querySelector("#initials")
var storedScores = document.querySelector(".stored-scores");


// Starts the quiz
function startQuiz() {
    // Hides start screen
    var startScreen = document.querySelector(".start-screen");
    startScreen.setAttribute("class","hidden");

    // Show questions
    questionsEl.removeAttribute("class");
    getCurrentQuestion();
    startTimer();
};

// Pulls first question from question index array
function getCurrentQuestion() {
    var currentQuestion = questions[questionIndex];
    console.log(currentQuestion);
    var titleEl = document.querySelector("#question-title");
    titleEl.textContent = currentQuestion.title;
    questionChoices.textContent = "";
    
    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choices = document.createElement("button");
        choices.setAttribute("class", "choice");
        choices.setAttribute("value", currentQuestion.choice[i]);

        choices.textContent = i + 1 + ". " + currentQuestion.choice[i];
        questionChoices.appendChild(choices);
    } 
}

//function winGame() {
//    var finalScore = document.querySelector("#final-score");
//    finalScore.textContent = timerCount;
//}

//function loseGame() {
//    var finalScore = document.querySelector("final-score");
//    finalScore.textContent = timerCount;
//}



// Starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    timeEl.setAttribute("value", time);
    timer = setInterval (function() {
        time--;
        timeEl.textContent = time;
        if (time >= 0) {
            if (isWin && time > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
};

function answerQuestion() {
    if (questions.answer = true) {
        //move to the next question
    } else if (questions.answer = false) {
        //time penalty & move to next question
    }
}

submitButton.addEventListener("click", function() {
    window.open("index.html", _self);
    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var userScore = document.createElement("div");
        userScore.setAttribute("class", "userScore");

        userScore.textContent = i + 1 + ". " + userInitials + " - " + finalScore;
        storedScores.appendChild(div);
};




if (questions.answer = true) {
    //move to the next question
}   else if (questions.answer = false) {
    // time penalty & move to next question
}
getCurrentQuestion();






startButton.addEventListener("click", startQuiz);


