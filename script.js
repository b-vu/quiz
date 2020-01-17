var startQuiz = document.querySelector("#start");
var display = document.querySelector("#wordDisplay");
var time = document.querySelector("#countdown");
var result = document.querySelector("#answerResult");
var score = document.querySelector("#highScores");
var scoreButton = document.querySelector("#submitScore");

var timer = questions.length * 15;
var questionNumber = 0;
var scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));
if(scoreHistory === null){
    scoreHistory = [];
};

function startGame(){
    if(questionNumber < questions.length){
        display.textContent = questions[questionNumber].title;
        for(i = 0; i < questions[questionNumber].choices.length; i++){
            var choice = document.createElement("button");
            choice.setAttribute("class", "btn btn-primary col");
            choice.setAttribute("style", "margin-top:20px; font-size:25px");
            choice.addEventListener("click", getAnswer);
            choice.textContent = questions[questionNumber].choices[i];
            display.appendChild(choice);
        };
    }
};

function getAnswer(event){
    if(event.target.textContent === questions[questionNumber].answer){
        result.textContent = "CORRECT!";
        questionNumber++;
        startGame();
    }
    else{
        result.textContent = "WRONG!";
        questionNumber++;
        timer -= 10;
        startGame();
    }
};

function setTimer(){
    startGame();
    var timerInterval = setInterval(function() {
        timer--;
        time.textContent = timer;
    
        if(questionNumber === questions.length) {
            clearInterval(timerInterval);
            display.textContent = "You are done! Your final score is " + time.textContent + ".";
            var input = document.createElement("input");
            var submitButton = document.createElement("button");
            submitButton.setAttribute("class", "btn btn-primary row-cols-1");
            submitButton.textContent = "Submit";
            submitButton.addEventListener("click", storeScore);
            var goBackButton = document.createElement("button");
            goBackButton.setAttribute("class", "btn btn-primary row-cols-1");
            goBackButton.textContent = "Go Back";
            goBackButton.setAttribute("style", "margin-right:20px");
            goBackButton.addEventListener("click", goBack);
            input.setAttribute("style", "width:150px; font-size:20px");
            input.setAttribute("id", "initials");
            result.setAttribute("style", "font-size:24px");
            result.textContent = "Enter your initials (3 characters): ";
            result.appendChild(input);
            scoreButton.appendChild(goBackButton);
            scoreButton.appendChild(submitButton);
        }
        else if(timer === 0) {
            clearInterval(timerInterval);
            display.textContent = "Time is up! Better luck next time!";
            result.textContent = "";
        }
      }, 1000);
};

function storeScore(){
    var userTime = time.textContent;
    var userInitials = document.querySelector("#initials").value.trim().toUpperCase();
    if(userInitials === "" || userInitials.length !== 3){
        //do nothing until initials are entered and is 3 characters
    }
    else{
    scoreHistory.push({
        initials: userInitials,
        score: userTime
    });

    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
    var scoreHistoryParse = JSON.parse(localStorage.getItem("scoreHistory"));
    var numScores = scoreHistoryParse.length - 1;

    result.setAttribute("style", "font-size:24px");
    display.textContent = "";
    scoreButton.textContent = "";
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("class", "btn btn-primary row-cols-1");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", goBack);
    scoreButton.appendChild(goBackButton);
    result.textContent = "Your initials and score: " + scoreHistoryParse[numScores].initials + " - " + scoreHistoryParse[numScores].score;
    }
};

function goBack(){
    window.location.href="index.html";
}

startQuiz.addEventListener("click", setTimer);

score.addEventListener("click", function(){
    result.setAttribute("style", "font-size:24px");
    display.textContent = "High scores";
    scoreButton.textContent = "";
    result.textContent = "";
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("class", "btn btn-primary row-cols-1");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", goBack);
    scoreButton.appendChild(goBackButton);

    var scores = JSON.parse(localStorage.getItem("scoreHistory"));
    scores.sort(function(a, b){return b.score - a.score});

    for(i = 0; i < scores.length; i++){
        var getScore = document.createElement("p");
        getScore.textContent = i + 1 + ". " + scores[i].initials + " - " +scores[i].score;
        result.appendChild(getScore);
    };
});