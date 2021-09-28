var time = questions.length * 5;
var timer;
var questionIndex = 0;
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
var clearButton = document.querySelector(".clear");



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

            choices.textContent = i + 1 + ". " + currentQuestion.choice[i];
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

// Retrieves information from user inputs and appends them to the page
function addScore(event) {
    event.PreventDefault();

    finalScore.style.display = "none";
    highScores.style.display = "block";

}


// Saves user inputted score as an object and stringify's in local storage
function saveScore() {
    // Create's score object from submission
    var newHighScore = {
        initials: userInitials.value,
        highScore: finalScore.value,
    };
    highScores.push(newHighScore);

    // Set's submission to local storage
    localStorage.setItem("scores", JSON.stringify(highScores));
}

// Stores and retrieves arrays in/from local storage
if (JSON.parse(localStorage.getItem("scores")) !== null) {
    highScores = JSON.parse(localStorage.getItem("scores"));
}


// Hides questions screen and shows end screen. Also adds and stores score and initials in local storage
function gameOver() {
         // Hides questions screen
        var endScreen = document.querySelector("#end-screen");
        questionsEl.setAttribute("class","hidden");

        // Show end-screen
        endScreen.removeAttribute("class");

        // Adds + stores high score to div on highscores page + local storage
        addScore();
        saveScore();
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// Listens for button clicks to "Start" game and "Submit" user score info
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveScore);
clearButton.addEventListener("click", clearScores);