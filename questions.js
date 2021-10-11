// Create variables
var questionsIndex = 0;
var correctScore = 0;
var totalScore = 0;
var startQuiz = document.querySelector("#startQuizBtn");
var questionDiv = document.createElement("div");
var buttonDiv = document.createElement("div");
var remainTimeElement = document.querySelector("#remainTime");
var resultDisplayElement = document.querySelector("#resultDisplay");
var completedQuizElement = document.querySelector("#completedQuiz");
var enterNameElement = document.querySelector("#enterNameDisplay");
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
var countdown = quizQuestions.length * 10;
var quizStarted = false;
var timer = setInterval(function () {
    // When quiz starts the tiemr will begin
    if (quizStarted) {
        countdown--;
        remainTimeElement.textContent = "Time remaining = " + countdown + " seconds";
        // Once the timer runs out clear all the elements 
        if (countdown <= 0) {
            clearInterval(timer);
            questionDiv.innerHTML = "";
            buttonDiv.innerHTML = "";
            resultDisplayElement.innerHTML = "";
            // Display message if time is up
            remainTimeElement.textContent = "Time remaining =  Time is up!";
            completedQuizElement.textContent = ("Sorry you have ran out of time! You answered " + correctScore + " question(s) correctly!");
            // add in button to rety/restart quiz once time is up
            var retryBtn = document.createElement("button");
            retryBtn.setAttribute("class", "retry-button");
            retryBtn.setAttribute("style", "background: rgb(142, 159, 177); padding: 15px; color: white; margin: 25px 15px")
            retryBtn.textContent = "Try Again!";
            completedQuizElement.appendChild(retryBtn);
            // redirects user to beginning page of quiz
            retryBtn.addEventListener("click", function () {
                window.location.href = "index.html";
            })
        }
    }
}, 1000);
// When start button is clicked begin quiz
startQuiz.addEventListener("click", function () {
    quizStarted = true;
    genQuiz()
});
// Function to generate questions and answerOptions
function genQuiz() {
    // Clear the intro header and text
    introPage.innerHTML = "";
    buttonDiv.innerHTML = "";
    // For loop that will pull in all the questions and choices
    for (var i = 0; i < quizQuestions.length; i++) {
        var userQuestion = quizQuestions[questionsIndex].questionText;
        var userOptions = quizQuestions[questionsIndex].answerOptions;
    };
    // Adding elements to create the question text
    questionHeader = document.createElement("h1");
    questionHeader.textContent = userQuestion;
    introPage.appendChild(questionDiv);
    questionDiv.appendChild(questionHeader);
    // Create the buttons that will contain the answer options from the array
    userOptions.forEach(function (newBtn) {
        var buttonOption = document.createElement("button");
        buttonOption.setAttribute("class", "answer-option-btn");
        buttonOption.setAttribute("style", "background: rgb(142, 159, 177); padding: 15px; color: white; margin: 25px 15px");
        buttonOption.textContent = newBtn;
        introPage.appendChild(buttonDiv);
        buttonDiv.appendChild(buttonOption);
    });
    // Adding click event for each button to check if the user was correct/incorrect
    document.querySelectorAll(".answer-option-btn").forEach(function (verifyAnswer) {
        verifyAnswer.addEventListener("click", function () {
            let userSelection = verifyAnswer.innerText;
            // Verify if the user selects the correct answer
            if (userSelection === quizQuestions[questionsIndex].correctAnswer) {
                questionsIndex++;
                correctScore++;
                questionDiv.innerHTML = "";
                buttonDiv.innerHTML = "";
                resultDisplayElement.textContent = ("The previous answer was correct!");
            }
            // If the user selects incorrectly remove 10 seconds off the time
            else {
                countdown = countdown - 10;
                questionsIndex++;
                questionDiv.innerHTML = "";
                buttonDiv.innerHTML = "";
                resultDisplayElement.textContent = ("The previous answer was incorrect.");
            }
            if (questionsIndex >= quizQuestions.length) {
                questionDiv.innerHTML = "";
                buttonDiv.innerHTML = "";
                resultDisplayElement.innerHTML = "";
                resultDisplayElement.textContent = "";
                remainTimeElement.textContent = "";
                // Message for user when quiz has been completed successfully and display how many correct asnwers
                completedQuizElement.textContent = ("The quiz has been completed! You answered " + correctScore + " questions correctly.");
                // Stop the timer for users final score
                clearInterval(timer);
                // User score = the timer count
                totalScore = countdown;
                // create message to display score
                var scoreDisplay = document.createElement("h2");
                scoreDisplay.setAttribute("id", "score-display");
                scoreDisplay.setAttribute("style", "color: #13e71e; font-weight: bold; padding: 25px");
                scoreDisplay.textContent =("Your final score is " + totalScore);
                completedQuizElement.appendChild(scoreDisplay);
                // Create inputs field to allow user to input name or initals
                enterNameElement.textContent = ("Please enter in your initials: ");
                var nameInput = document.createElement("input");
                nameInput.setAttribute("id", "name-input");
                nameInput.setAttribute("type", "text");
                nameInput.textContent = "";
                enterNameElement.appendChild(nameInput);
                // create button to submit the name or initials
                var submitNameBtn = document.createElement("button");
                submitNameBtn.setAttribute("class", "submit-name-btn");
                submitNameBtn.setAttribute("style", "background: rgb(142, 159, 177); padding: 15px; color: white; margin: 2px 10px");
                submitNameBtn.textContent = "Submit";
                enterNameElement.appendChild(submitNameBtn);
                // Adding event listener to submit button for local storage
                submitNameBtn.addEventListener("click", function () {
                    // variable attached to user name
                    var userName = nameInput.value.trim();
                    // alert user field if field is invalid
                    if (userName === "") {
                        alert("Invalid name, field cannot be blank.")
                        return false;
                    } else {
                        // Scores from locale storage or the empty array
                        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
                        // Adding in the current user & score
                        var scoreResults = {
                            score: totalScore,
                            name: userName
                        };
                        // push the user & score to locale storage
                        highScores.push(scoreResults);
                        window.localStorage.setItem("highScores", JSON.stringify(highScores));
                    } 
                    // redirect user to new page
                    window.location.href = "highscore.html";
                })
            } else {
                genQuiz();
            }
        });
    });
};