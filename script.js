var quizQuestion = document.getElementById("question-text");
var quizOption = document.getElementById("option-list");
var currentQuestion = 0;
var score = 0;
let selectedAnswer = null;
let nextButton = document.getElementById("next-btn");
let progressBar = document.getElementById("progress");
let questionNumber = document.getElementById("question-number");

const arsenalQuiz = [
  {
    question: "In which city is Arsenal Football Club based?",
    options: ["Manchester", "London", "Liverpool", "Birmingham"],
    correctAnswer: "London"
  },
  {
    question: "What is the name of Arsenal’s home stadium?",
    options: ["Old Trafford", "Stamford Bridge", "Emirates Stadium", "Anfield"],
    correctAnswer: "Emirates Stadium"
  },
  {
    question: "In which year was Arsenal founded?",
    options: ["1886", "1901", "1899", "1878"],
    correctAnswer: "1886"
  },
  {
    question: "How many years did Arsène Wenger manage Arsenal?",
    options: ["10 years", "22 years", "15 years", "18 years"],
    correctAnswer: "22 years"
  },
  {
    question: "In which season did ‘The Invincibles’ go unbeaten in the league?",
    options: ["2001-02", "2003-04", "2005-06", "1997-98"],
    correctAnswer: "2003-04"
  },
  {
    question: "How many goals did Thierry Henry score for Arsenal?",
    options: ["175", "228", "200", "260"],
    correctAnswer: "228"
  },
  {
    question: "When did Arsenal win their first Premier League title?",
    options: ["1992-93", "1997-98", "2001-02", "2003-04"],
    correctAnswer: "1997-98"
  },
  {
    question: "What are Arsenal’s traditional home kit colors?",
    options: ["Blue and White", "Red and White", "Green and Yellow", "Black and Red"],
    correctAnswer: "Red and White"
  },
  {
    question: "Who holds the record for most appearances for Arsenal?",
    options: ["Tony Adams", "David O’Leary", "Patrick Vieira", "Thierry Henry"],
    correctAnswer: "David O’Leary"
  },
  {
    question: "In which year did Arsenal win their first FA Cup?",
    options: ["1930", "1945", "1952", "1927"],
    correctAnswer: "1930"
  }
];

const totalQuestions = arsenalQuiz.length;

function showQuestion() {
  if (currentQuestion >= totalQuestions) {
    document.querySelector(".question-box").innerHTML = `
      <h2>🎉 Quiz Finished!</h2>
      <p>Your final score: <strong>${score}</strong> / ${totalQuestions}</p>
      <div class="end-buttons">
        <button class="options" onclick="restartQuiz()">Restart</button>
        <button class="options" onclick="quitQuiz()">Quit</button>
      </div>
    `;
    progressBar.style.width = "100%";
    return;
  }

  quizQuestion.innerHTML = arsenalQuiz[currentQuestion].question;
  questionNumber.innerHTML =
    "Question " + (currentQuestion + 1) + " of " + totalQuestions;

  quizOption.innerHTML = "";
  selectedAnswer = null; // reset selection

  for (var i = 0; i < arsenalQuiz[currentQuestion].options.length; i++) {
    quizOption.innerHTML += `
      <li onclick="selectOption(event)" class="non-active">
        <button class="options">${arsenalQuiz[currentQuestion].options[i]}</button>
      </li>`;
  }

  nextButton.disabled = false;
  progressBar.style.width = (currentQuestion / totalQuestions) * 100 + "%";
}

function selectOption(event) {
  let clicked = event.target;
  selectedAnswer = clicked.innerText;

  // remove old selection
  for (var i = 0; i < quizOption.children.length; i++) {
    quizOption.children[i].classList.remove("selected");
  }
  clicked.parentElement.classList.add("selected");
}

function goToNext() {
  if (selectedAnswer === null) {
    alert("Please select an option before continuing!");
    return;
  }

  let correct = arsenalQuiz[currentQuestion].correctAnswer;
  if (selectedAnswer === correct) {
    score++;
  }

  currentQuestion++;
  showQuestion();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function quitQuiz() {
  document.querySelector(".question-box").innerHTML = `
    <h2>❌ You Quit the Quiz!</h2>
    <p>Better luck next time!</p>
    <div class="end-buttons">
      <button class="options" onclick="restartQuiz()">Restart</button>
    </div>
  `;
}

showQuestion();
