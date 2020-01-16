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
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("class", "btn btn-primary row-cols-1");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", goBack);
    scoreButton.appendChild(goBackButton);
    result.textContent = "Your initials and score: " + userNames[numScores] + " " + userScores[numScores];
    numScores++;
};

function goBack(){
    //window.location.href="index.html";
    questionNumber = 0;
    timer = questions.length * 15;
    result.textContent = "";
    scoreButton.textContent = "";
    time.textContent = "75";

    var h1 = document.createElement("h1");
    h1.textContent = "Welcome to my Formula 1 quiz!";
    display.appendChild(h1);

    var h2 = document.createElement("h2");
    h2.textContent = "Press the 'Start Quiz' button to begin";
    display.appendChild(h2);

    var br = document.createElement("br");
    display.appendChild(br);

    var h4 = document.createElement("h4");
    h4.textContent = "You will have 75 seconds to complete this quiz. Your score is calculated by your remaining time. Every incorrect answer will subtract 10 seconds from your remaining time.";
    display.appendChild(h4);

    var br1 = document.createElement("br");
    display.appendChild(br1);

    var startButton = document.createElement("button");
    startButton.setAttribute("class", "btn btn-primary");
    startButton.textContent = "Start Quiz";
    startButton.addEventListener("click", setTimer);
    display.appendChild(startButton);

    console.log(userNames, userScores);
}

startQuiz.addEventListener("click", setTimer);

score.addEventListener("click", function(){
    result.setAttribute("style", "font-size:24px");
    display.textContent = "";
    scoreButton.textContent = "";
    result.textContent = "";
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("class", "btn btn-primary row-cols-1");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", goBack);
    scoreButton.appendChild(goBackButton);
    for(i = 0; i < numScores; i++){
        var getScore = document.createElement("p");
        getScore.textContent = i + 1 + ". " + userNames[i] + " " + userScores[i];
        result.appendChild(getScore);
        console.log(userNames[i], userScores[i]);
    };
});