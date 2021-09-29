// Timer and question index variables
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
    // If question index is longer than question length - 1, trigger gameOver
    if (questionIndex > questions.length - 1) {
        gameOver();
    // If questions remaining, populate choices and listen for click
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
                //Set p element to disappear after 1 second
                setTimeout(function() {
                    p.style.display = "none";
                }, 1000);
                // If choice selected is correct answer...
                if (currentQuestion.answer == event.target.value) {
                    console.log("correct");
                    // Display "You got it!"
                    p.textContent = "You got it!";
                    // Cycle next question
                    questionIndex++;
                    setQuestion();
                // If choice selected is incorrect answer...
                } else {
                    console.log("wrong");
                    // 10 second time penalty
                    time = time - 10;
                    // Display "Good try!"
                    p.textContent = "Good try!";
                    // Cycle next question
                    questionIndex++;
                    setQuestion();
                }
            }); 
        }
        
    }
}


// Starts and stops the timer
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


// Stores scores taken from user input and time remaining in local storage
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

    // Sorts highscores in order
    highScores.sort((x, y) => y.score - x.score);

    // Store highscores object in local storage
    localStorage.setItem("scores", JSON.stringify(highScores));
    // Upon submit click, open highscores.html in same window
    window.open("highscores.html", "_self");
}


// Looks for conditions only if storedScores variable exists on page
if (storedScores !== null) {

    highScores = JSON.parse(localStorage.getItem("scores"));

    // Creates list items based off of local storage elements
    for (var i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement("li");
        scoreList.setAttribute("class", "user-score");
        
        scoreList.textContent = `${i + 1}. ${highScores[i].name} – ${highScores[i].score}`;
        storedScores.appendChild(scoreList);
    }
}


// Runs when game is over
function gameOver() {
    // Hides questions screen
    var endScreen = document.querySelector("#end-screen");
    questionsEl.setAttribute("class","hidden");

    // Show end-screen
    endScreen.removeAttribute("class");
}


// Allows clear button to clear high scores locally + on page
function clearHighScores() {
    localStorage.clear();
    storedScores.textContent = "";
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