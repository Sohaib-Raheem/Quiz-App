var quizQuestion = document.getElementById("question-text");
var quizOption = document.getElementById("option-list");
var currentQuestion = 0;
var score = 0;
var quizScore = document.getElementById("score");
let nextButton = document.getElementById("next-btn");
let progressBar = document.getElementById("progress");
let questionNumber = document.getElementById("question-number");

// User answers ko store karne ke liye
let userAnswers = [];

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
    showResult();
    return;
  }

  quizQuestion.innerHTML = arsenalQuiz[currentQuestion].question;
  questionNumber.innerHTML =
    "Question " + (currentQuestion + 1) + " of " + totalQuestions;

  quizOption.innerHTML = "";
  for (var i = 0; i < arsenalQuiz[currentQuestion].options.length; i++) {
    quizOption.innerHTML += `
      <li onclick="selectOption(event)" class="non-active">
        <button class="options">${arsenalQuiz[currentQuestion].options[i]}</button>
      </li>`;
  }

  nextButton.disabled = false;
  progressBar.style.width = ((currentQuestion) / totalQuestions * 100) + "%";
}

function selectOption(event) {
  let clicked = event.target;
  // sabse pehle sab options se selected class hatao
  for (var i = 0; i < quizOption.children.length; i++) {
    quizOption.children[i].classList.remove("selected");
  }
  // clicked option select karo
  clicked.parentElement.classList.add("selected");
}

function goToNext() {
  let selected = document.querySelector(".selected");
  let chosenAnswer = selected ? selected.innerText : "Not answered";

  // userAnswers me store karo
  userAnswers.push({
    question: arsenalQuiz[currentQuestion].question,
    selected: chosenAnswer,
    correct: arsenalQuiz[currentQuestion].correctAnswer
  });

  currentQuestion++;
  showQuestion();
}

function showResult() {
  // score calculate karna
  score = 0;
  for (var i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i].selected === userAnswers[i].correct) {
      score += 10;
    }
  }

  let resultHTML = `
    <h2>🎉 Quiz Finished!</h2>
    <p>Your final score: <strong>${score}</strong> / ${totalQuestions * 10}</p>
    <h3>Review Answers:</h3>
    <ul class="review-list">
  `;

  for (var i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i].selected === userAnswers[i].correct) {
      resultHTML += `<li class="correct">Q${i + 1}: ✅ Correct — <strong>${userAnswers[i].correct}</strong></li>`;
    } else {
      resultHTML += `<li class="wrong">Q${i + 1}: ❌ Wrong (You chose: <strong>${userAnswers[i].selected}</strong>) | Correct: <strong>${userAnswers[i].correct}</strong></li>`;
    }
  }

  resultHTML += `</ul>
    <div class="end-buttons">
      <button onclick="restartQuiz()">Restart</button>
      <button onclick="quitQuiz()">Quit</button>
    </div>
  `;

  document.querySelector(".question-box").innerHTML = resultHTML;
  progressBar.style.width = "100%";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  showQuestion();
}

function quitQuiz() {
  document.querySelector(".question-box").innerHTML = `
    <h2>👋 You quit the quiz!</h2>
    <p>Thanks for playing.</p>
  `;
}

showQuestion();
