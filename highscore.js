// Create variables
var returnQuizBtn = document.querySelector("#return-quiz");
var clearScoresBtn = document.querySelector("#clear-scores");
var highscoreDisplay = document.querySelector("#display-highscores");
// Return to quiz button redirects user back to the quiz
returnQuizBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});
// Button that will clear scores in local storage/html
clearScoresBtn.addEventListener("click", function () {
    highscoreEl.innerHTML = "";
    localStorage.removeItem("highScores")
});