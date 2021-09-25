var time = questions.length * 15;
var timerId;
var questionIndex = 0;

// DOM elements
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timeEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");


// Starts the quiz
function startQuiz() {
    // Hides start screen
    var startScreen = document.querySelector(".start-screen");
    startScreen.setAttribute("class","hidden");

    // Show questions
    questionsEl.removeAttribute("class");
    getCurrentQuestion();
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















startButton.addEventListener("click", startQuiz);


