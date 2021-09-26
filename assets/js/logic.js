var time = questions.length * 15;
var timer;
var questionIndex = 0;
var currentQuestion = questions[questionIndex];
var highScores = [];

// DOM elements
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timeEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var finalScore = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");
var userInitials = document.querySelector("#initials")
var storedScores = document.querySelector(".stored-scores");
var rightWrong = document.querySelector("#right-wrong");


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

// Pulls first question from question index array + gives answer choices
function getCurrentQuestion() {
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

// Starts and stops the timer and run gameOver
function startTimer() {
    timer = setInterval (function() {
        time--;
        timeEl.textContent = time;
        // If time is more than 0 and questions are complete, run gameOver
        if (time > 0 && currentQuestion > questions.length) {
            if ( time > 0) {
                clearInterval(timer);
                gameOver();
            }
        }
        if (time === 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
};

// Checks whether the answer selected is correct or incorrect + deducts points appropriately
function checkAnswer(event) {
    event.preventDefault();
    rightWrong.setAttribute("display: block");
    var p = document.createElement("p");
    rightWrong.appendChild(p);
    
    setTimeout(function() {
        p.style.display = "none";
    }, 1000);

    // If correct answer is chosen, "Correct!" is displayed
    var chosenAnswer = event.target
    if (questions[questionIndex].answer === chosenAnswer.innerText) {
        p.textContent = "You got it!";
    // If incorrect answer is chosen, "Wrong!" is displayed and 10 seconds are taken from time
    } else if (questions[questionIndex].answer !==chosenAnswer.innerText) {
        time = time - 10;
        p.textContent = "Good try!";
    }

    // Cycles to the next question
    if (questions.length > questionIndex + 1 || time === 0) {
        questionIndex++;
    }
    getCurrentQuestion(questionIndex);
}

// Retrieves information from user inputs and appends them to the page
function addScore() {
    for (i = 0; i < highScores.length; i++) {
        var userScore = document.createElement("li");
        userScore.setAttribute("class", "userScore");
        finalScore.textContent = time;
        userScore.textContent = i + 1 + ". " + userInitials + " - " + finalScore;
        storedScores.appendChild(li);
    }
};

// Saves user inputted score as an object and stringify's in local storage
function saveScore() {
    var newHighScore = {
        initials: userInitials.value,
        highScore: finalScore,
    };
    console.log(newHighScore);
    highScores.push(newHighScore);
    console.log(highScores);
    localStorage.setItem("scores", JSON.stringify(highScores));
}

// Stores and retrieves arrays in/from local storage
if (JSON.parse(localStorage.getItem("scores")) !== null) {
    highScores = JSON.parse(localStorage.getItem("scores"));
}

// Hides questions screen and shows end screen. Also adds and stores score and initials in local storage
function gameOver() {
    // Hides questions screen
    var endScreen = document.querySelector(".end-screen");
    var questionScreen = document.querySelector(".questions");
    questionScreen.setAttribute("class","hidden");

    // Show end-screen
    endScreen.removeAttribute("class");

    // Adds + stores high score to div on highscores page + local storage
    addScore();
    saveScore();
}

// Listens for button clicks to "Start" game and "Submit" user score info
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveScore);