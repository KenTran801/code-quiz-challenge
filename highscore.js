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
    highscoreDisplay.innerHTML = "";
    localStorage.removeItem("highScores")
});
// Get the scores/names from local storage
var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
if (highScores !== "") {
    // Rank the scores from highest to lowest, help from tutor/BCS learning
    highScores.sort(function (a, b) {
        return parseInt(b.score) - parseInt(a.score);
    });
    // loop to pull in scores/names
    for (let i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement("li");
        scoreList.setAttribute("class", "scoreList");
        scoreList.setAttribute("style", "font-weight: bold; padding: 5px")
        scoreList.textContent = highScores[i].name + " " + highScores[i].score;
        highscoreDisplay.appendChild(scoreList);
    };
}