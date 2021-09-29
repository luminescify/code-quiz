var time = questions.length * 10;
var timer;
var questionIndex = 0;


// DOM elements
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timeEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var storedScores = document.querySelector(".stored-scores");
var rightWrong = document.querySelector("#right-wrong");
var finalScore = document.querySelector("#final-score");
var clearButton = document.querySelector(".clear");
var userInitials = document.querySelector("#initials");


// Starts the quiz
function startQuiz() {
    // Hides start screen
    var startScreen = document.querySelector(".start-screen");
    startScreen.setAttribute("class","hidden");

    // Show questions
    questionsEl.removeAttribute("class");
    // Pull first question from array
    setQuestion();
    // Start timer
    setTimer();
};

// Pulls first question from question index array + gives answer choices
function setQuestion() {
    var currentQuestion = questions[questionIndex];
    if (questionIndex > questions.length - 1) {
        gameOver();
    } else {
        console.log(currentQuestion);
        var titleEl = document.querySelector("#question-title");
        titleEl.textContent = currentQuestion.title;
        questionChoices.textContent = "";

        for(var i = 0; i < currentQuestion.choice.length; i++) {
            var choices = document.createElement("button");
            choices.setAttribute("class","choice");
            choices.setAttribute("value", currentQuestion.choice[i]);

            choices.textContent = currentQuestion.choice[i];
            questionChoices.appendChild(choices);

            choices.addEventListener("click", (event) => {
                rightWrong.style.display = "block";
                var p = document.createElement("p");
                rightWrong.appendChild(p);

                setTimeout(function() {
                    p.style.display = "none";
                }, 1000);

                if (currentQuestion.answer == event.target.value) {
                    console.log("correct");
                    // Display "You got it!"
                    p.textContent = "You got it!";
                    // Move to next question
                    questionIndex++;
                    setQuestion();
                } else {
                    console.log("wrong");
                    // Time penalty
                    time = time - 10;
                    // Display "Good try!"
                    p.textContent = "Good try!";
                    questionIndex++;
                    setQuestion();
                }
            }); 
        }
        
    }
}

// Starts and stops the timer and runs gameOver
function setTimer() {
    timer = setInterval (function() {
        time--;
        timeEl.textContent = time;
        // If time is more than 0 and questions are complete, run gameOver
        if (time === 0 || questionIndex === questions.length) {
            clearInterval(timer);
            questionsEl.style.display = "none";
            finalScore.textContent = time;
            gameOver();
        }
    }, 1000);
};

// Takes name and score from local storage and displays in p tag on leaderboard page
function displayScores() {
    storedScores.innerHTML = "";
    var getInitials = localStorage.getItem("name");
    var getScore = localStorage.getItem("score");
    for (var i = 0; i < highScores.length; i++) {
        var highScore = highScores[i];

        var p = document.createElement("p");
        p.textContent = highScore;
        storedScores.appendChild(p);
    }
}

function storeScores() {
    if (userInitials === "") {
        alert("Please enter a name");
        return;
    } else {
        var highScores = JSON.parse(localStorage.getItem("scores"));
    }
    
    if (highScores == null) {
        highScores = [];
    }

    highScores.push({
        name: userInitials.value,
        score: time
    });

    highScores.sort((x, y) => y.score - x.score);

    localStorage.setItem("scores", JSON.stringify(highScores));

    window.open("highscores.html", "_self");
    displayScores();
}

// Hides questions screen and shows end screen. Also adds and stores score and initials in local storage
function gameOver() {
    // Hides questions screen
    var endScreen = document.querySelector("#end-screen");
    questionsEl.setAttribute("class","hidden");

    // Show end-screen
    endScreen.removeAttribute("class");
}

function clearHighScores() {
    localStorage.clear();
}



// Listens for button clicks to "Start" game only if start button exists on page
if (startButton !== null) {
    startButton.addEventListener("click", startQuiz);
}

// Listens for button clicks to "Submit" only if submit button exists on page
if (submitButton !== null) {
    submitButton.addEventListener("click", storeScores);
}

// Listens for button clicks to "Clear" high scores only if clear button exists on page
if (clearButton !== null) {
    clearButton.addEventListener("click", clearHighScores);
}