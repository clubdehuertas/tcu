// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
//const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [{
    question: "La principal fuente de energía para todos los procesos que tienen lugar en nuestro planeta es:",
    choiceA: "Sol",
    choiceB: "Viento",
    choiceC: "Combustibles fósiles",
    correct: "A"
  }, {
    question: "¿Cual de las siguientes fuentes de energía no es renovable?",
    choiceA: "Mareomotriz",
    choiceB: "Gas natural",
    choiceC: "Geotérmica",
    correct: "B"
  }, {
    question: "La energía geotérmica se obtiene del...",
    choiceA: "viento",
    choiceB: "carbón",
    choiceC: "calor del subsuelo",
    correct: "C"
  },
  {
    question: "La bioenergía se obtiene de:",
    choiceA: "Sol",
    choiceB: "Materia orgánica",
    choiceC: "Reactores nucleares",
    correct: "B"
  }, {
    question: "La energía que se encuentra en los cuerpos debido a su movimiento es:",
    choiceA: "potencial",
    choiceB: "nuclear",
    choiceC: "cinética",
    correct: "C"
  }, {
    question: "La fuente de energía más usada en Costa Rica es:",
    choiceA: "hidroeléctrica",
    choiceB: "solar",
    choiceC: "eólica",
    correct: "A"
  },
  {
    question: "Una desventaja de las fuentes de energía renovable es:",
    choiceA: "impacto ambiental",
    choiceB: "costo",
    choiceC: "renovabilidad",
    correct: "B"
  }, {
    question: "La capacidad de realizar trabajo es la definición de:",
    choiceA: "energía",
    choiceB: "electricidad",
    choiceC: "combustible",
    correct: "A"
  }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  //    qImg.innerHTML = "<img src="+ q.imgSrc +">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
  displayBattery(ctx);
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
  displayBattery(ctx);
}

function displayBattery(ctx) {
  if (score < 3) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(bat1, 150, 50, 200, 100);
  } else if (score === 3) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(bat2, 150, 50, 200, 100);
  } else if (score === 4) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(bat3, 150, 50, 200, 100);
  } else if (score > 4) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(bat4, 150, 50, 200, 100);
  }
}
var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
let bat1 = document.getElementById("bat1");
let bat2 = document.getElementById("bat2");
let bat3 = document.getElementById("bat3");
let bat4 = document.getElementById("bat4");

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round(100 * score / questions.length);

  // choose the image based on the scorePerCent



  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
