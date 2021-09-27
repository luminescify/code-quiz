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
var optionButtons = document.querySelector(".choice");
var titleEl = document.querySelector("#question-title");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");



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

    // Checks if there are any more questions, and if not, ends the quiz
    if (questionIndex >= questions.length) {
        gameOver();
    } else {
        titleEl.textContent = currentQuestion.title;
        choice1.textContent = currentQuestion.choice[0];
        choice2.textContent = currentQuestion.choice[1];
        choice3.textContent = currentQuestion.choice[2];
        choice4.textContent = currentQuestion.choice[3];
    };
}

// Starts and stops the timer and runs gameOver
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
    // If user choice text matches answer text, display "You got it!"
    if ((document.getElementById(event).textContent) === (questions[questionIndex].answer)) {
        rightAnswer();
        questionIndex++;
    // If user choice text does not match answer text, display "Good try!" and -10 seconds
    } else {
        wrongAnswer();
        questionIndex++
    }
    getCurrentQuestion(questionIndex);
}

// If user selects right answer...
function rightAnswer() {
    // Set finalScore to current time
    finalScore = time;
    // Display "You got it!"
    rightWrong.textContent = "You got it!";
    // Remove message after 1 sec
    setTimeout(function() {
        rightWrong.style.display = "none";
    }, 1000);
}

// If user selects wront answer...
function wrongAnswer() {
    // Subtract 10 seconds from their time
    time = time - 10;
    // Display "Good try!"
    rightWrong.textContent = "Good try!";
    // Remove message after 1 sec
    setTimeout(function() {
        rightWrong.style.display = "none";
    }, 1000);
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




// If correct answer is chosen, "Correct!" is displayed
    //var chosenAnswer = event.target
    //if (questions[questionIndex].answer === chosenAnswer.innerHTML) {
    //    p.textContent = "You got it!";
    // If incorrect answer is chosen, "Wrong!" is displayed and 10 seconds are taken from time
    //} else if (questions[questionIndex].answer !==chosenAnswer.innerHTML) {
     //   time = time - 10;
      //  p.textContent = "Good try!";
    //}


 //for (var i = 0; i < currentQuestion.choice.length; i++) {
   // choices = document.createElement("button");
   // choices.setAttribute("class", "choice");
   // choices.setAttribute("value", currentQuestion.choice[i]);

  //  choices.textContent = i + 1 + ". " + currentQuestion.choice[i];
  //  questionChoices.appendChild(choices);
  // } 