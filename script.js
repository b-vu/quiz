var startQuiz = document.querySelector("#start");
var display = document.querySelector("#wordDisplay");
var time = document.querySelector("#countdown");
var result = document.querySelector("#answerResult");
var score = document.querySelector("#highScores");
var scoreButton = document.querySelector("#submitScore");

var timer = questions.length * 15;
var questionNumber = 0;
var numScores = 0;
var userNames = [];
var userScores = [];

function startGame(){
    if(questionNumber < questions.length){
        display.textContent = questions[questionNumber].title;
        for(i = 0; i < questions[questionNumber].choices.length; i++){
            var choice = document.createElement("button");
            choice.setAttribute("class", "row row-cols-1");
            choice.setAttribute("style", "width:150px; margin:auto; margin-top:20px");
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
            submitButton.textContent = "Submit";
            submitButton.addEventListener("click", storeScore);
            var goBackButton = document.createElement("button");
            goBackButton.textContent = "Go Back";
            goBackButton.setAttribute("style", "margin-right:20px");
            goBackButton.addEventListener("click", goBack);
            input.setAttribute("style", "width:150px; font-size:20px");
            input.setAttribute("id", "initials");
            result.setAttribute("style", "font-size:24px");
            result.textContent = "Enter your initials: ";
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
    var userInitials = document.querySelector("#initials").value;
    userNames.push(userInitials);
    userScores.push(userTime);

    localStorage.setItem("initials", JSON.stringify(userNames));
    localStorage.setItem("score", JSON.stringify(userScores));
    var userNamesParse = JSON.parse(localStorage.getItem("initials"));
    var userScoresParse = JSON.parse(localStorage.getItem("score"));
    console.log(userNamesParse, userScoresParse);
    console.log(userNames, userScores);
    console.log(userNames[numScores], userScores[numScores]);
    console.log(userNamesParse[numScores], userScoresParse[numScores]);

    result.setAttribute("style", "font-size:24px");
    display.textContent = "";
    scoreButton.textContent = "";
    result.textContent = numScores + 1 + " " + userNames[numScores] + " " + userScores[numScores];
    numScores++;
};

function goBack(){
    window.location.href="index.html";
}

startQuiz.addEventListener("click", setTimer);

score.addEventListener("click", function(){
    result.setAttribute("style", "font-size:24px");
    display.textContent = "";
    scoreButton.textContent = "";
    result.textContent = "";
    for(i = 0; i < numScores; i++){
        var getScore = document.createElement("p");
        getScore.textContent = i + 1 + " " + userNames[numScores - 1] + " " + userScores[numScores - 1];
        result.appendChild(getScore);
    };
    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", goBack);
    scoreButton.appendChild(goBackButton);
});