var quizQuestion = document.getElementById("question-text");
var quizOption = document.getElementById("option-list");
var currentQuestion = 0;
var score = 0;
var quizScore = document.getElementById("score");
let currentSelection = null;
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
  }
];

const totalQuestions = arsenalQuiz.length;

// User answers store karenge
let userAnswers = [];

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
      <li onclick="selectOption(event)">
        <button class="options">${arsenalQuiz[currentQuestion].options[i]}</button>
      </li>`;
  }

  currentSelection = null;
  nextButton.disabled = true;
  progressBar.style.width = (currentQuestion / totalQuestions) * 100 + "%";
}

function selectOption(event) {
  // pehle remove old selection
  let allOptions = quizOption.querySelectorAll("li");
  allOptions.forEach((li) => li.classList.remove("selected"));

  // naya add karo
  event.currentTarget.classList.add("selected");
  currentSelection = event.currentTarget.innerText.trim();
  nextButton.disabled = false;
}

function goToNext() {
  if (currentSelection) {
    userAnswers.push({
      question: arsenalQuiz[currentQuestion].question,
      selected: currentSelection,
      correct: arsenalQuiz[currentQuestion].correctAnswer
    });

    if (currentSelection === arsenalQuiz[currentQuestion].correctAnswer) {
      score += 10;
    }
  }

  currentQuestion++;
  showQuestion();
}

function showResult() {
  let resultHTML = `
    <h2>🎉 Quiz Finished!</h2>
    <p>Your final score: <strong>${score}</strong> / ${
    totalQuestions * 10
  }</p>
    <h3>Review Answers:</h3>
    <ul class="review-list">
  `;

  userAnswers.forEach((ans, index) => {
    if (ans.selected === ans.correct) {
      resultHTML += `<li>Q${index + 1}: ✅ Correct — <strong>${
        ans.correct
      }</strong></li>`;
    } else {
      resultHTML += `<li>Q${index + 1}: ❌ Wrong (You chose: <strong>${
        ans.selected
      }</strong>) | Correct: <strong>${ans.correct}</strong></li>`;
    }
  });

  resultHTML += `</ul>
    <div class="end-buttons">
      <button class="options" onclick="restartQuiz()">🔄 Restart</button>
      <button class="options" onclick="quitQuiz()">❌ Quit</button>
    </div>`;

  document.querySelector(".question-box").innerHTML = resultHTML;
  progressBar.style.width = "100%";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  quizScore.innerHTML = "Score: 0";
  showQuestion();
}

function quitQuiz() {
  document.querySelector(".question-box").innerHTML = `
    <h2>👋 Thanks for playing!</h2>
    <p>Hope you enjoyed the Arsenal Quiz!</p>
  `;
  progressBar.style.width = "0%";
}

showQuestion();
