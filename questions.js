// Create variables
var questionsIndex = 0;
var startQuiz = document.querySelector("#startQuizBtn");
var quizQuestionsElement = document.querySelector("#quizQuestions");
var quizChoicesElement = document.querySelector("#quizChoices");
var buttonDiv = document.createElement("div");

// Create questions for the quiz (arrays)
var quizQuestions = [
    {
        questionText: "Question 1: Commonly used data types DO NOT include which of the following.",
        answerOptions: ["Booleans", "Numbers", "Strings", "Alerts"],
        correctAnswer: "Alerts"
    },

    {
        questionText: "Question 2: The condition in an if / else statement is enclosed within ______.",
        answerOptions: ["Curly Brackets", "Quotes", "Parentheses", "Square Brackets"],
        correctAnswer: "Parentheses"
    },

    {
        questionText: "Question 3: Arrays in Javascript can be used to store ______.",
        answerOptions: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        correctAnswer: "All of the above"
    },

    {
        questionText: "Question 4: String values must be enclosed within ______ when being assigned to variables.",
        answerOptions: ["Curly Brackets", "Quotes", "Commas", "Parentheses"],
        correctAnswer: "Quotes"
    },

    {
        questionText: "Question 5: A very useful tool used during development and debugging for printing content to the debugger is.",
        answerOptions: ["Javascript", "Terminal/Bash", "For loops", "Console log"],
        correctAnswer: "Console log"
    },
];

// Setup timer


// When start button is clicked begin quiz
startQuiz.addEventListener("click", function () {
    genQuiz()
});



// Function to generate questions and answerOptions
function genQuiz() {
    // Clear the intro header and text
    introPage.innerHTML = "";
    // For loop that will pull in all the questions and choices
    for (let i = 0; i < quizQuestions.length; i++) {
        var userQuestion = quizQuestions[questionsIndex].questionText;
        var userOptions = quizQuestions[questionsIndex].answerOptions;
        quizQuestionsElement.innerHTML = userQuestion;
    }
    // Create the buttons that will contain the answer options from the array
    userOptions.forEach(function (newItem) {
        var buttonOption = document.createElement("button");
        buttonOption.setAttribute("class", "answer-option-btn");
        buttonOption.setAttribute("style", "background: rgb(142, 159, 177); padding: 15px; color: white; margin: 25px 15px");
        buttonOption.textContent = newItem;
        quizQuestionsElement.appendChild(buttonDiv);
        buttonDiv.appendChild(buttonOption);
    });
};