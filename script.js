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
let selectedAnswers = [];

// Show Question
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
      <li>
        <button class="option-btn" onclick="selectOption(event)">
          ${arsenalQuiz[currentQuestion].options[i]}
        </button>
      </li>`;
  }

  
  nextButton.disabled = true;

  progressBar.style.width =
    ((currentQuestion + 1) / totalQuestions) * 100 + "%";
}

// Select Option
function selectOption(event) {
  currentSelection = event.target.innerText;
  nextButton.disabled = false;
}

// Next Question
function goToNext() {
  if (!currentSelection) return;

  selectedAnswers[currentQuestion] = currentSelection;
  if (currentSelection === arsenalQuiz[currentQuestion].correctAnswer) {
    score += 10;
  }

  currentSelection = null;
  currentQuestion++;
  showQuestion();
}

// Show Result
function showResult() {
  document.querySelector(".question-box").style.display = "none";
  document.getElementById("option-list").style.display = "none";
  nextButton.style.display = "none";

  let feedback = "";
  if (score <= 30) {
    feedback = "😅 Keep practicing, you can do better!";
  } else if (score <= 70) {
    feedback = "👏 Good effort, but there’s room to improve!";
  } else if (score < 100) {
    feedback = "🔥 Great job, almost perfect!";
  } else {
    feedback = "🎉 Congratulations! Perfect score!";
  }

  let wrongAnswers = [];
  for (let i = 0; i < arsenalQuiz.length; i++) {
    if (selectedAnswers[i] !== arsenalQuiz[i].correctAnswer) {
      wrongAnswers.push(
        `Q${i + 1}: Your answer = ${selectedAnswers[i] || "Not answered"}, Correct = ${arsenalQuiz[i].correctAnswer}`
      );
    }
  }

  let resultBox = document.createElement("div");
  resultBox.classList.add("result-box");
  resultBox.innerHTML = `
    <h2>🎉 Quiz Finished!</h2>
    <p>Your final score: <strong>${score}</strong> / ${totalQuestions * 10}</p>
    <p>${feedback}</p>
    ${
      wrongAnswers.length > 0
        ? `<h3>Wrong Answers:</h3>
           <ul>${wrongAnswers.map(ans => `<li>${ans}</li>`).join("")}</ul>`
        : `<p>🎉 All answers correct!</p>`
    }
    <div class="end-buttons">
      <button class="restart-btn" onclick="restartQuiz()">Restart</button>
      <button class="quit-btn" onclick="quitQuiz()">Quit</button>
    </div>
  `;

  document.querySelector(".quiz-container").appendChild(resultBox);
}

// Restart Quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers = [];

  let resultBox = document.querySelector(".result-box");
  if (resultBox) resultBox.remove();

  document.querySelector(".question-box").style.display = "block";
  document.getElementById("option-list").style.display = "grid"; 
  nextButton.style.display = "inline-block";

  showQuestion();
}

// Quit Quiz
function quitQuiz() {
  let resultBox = document.querySelector(".result-box");
  if (resultBox) resultBox.innerHTML = `
    <h2>👋 You quit the quiz!</h2>
    <p>Thanks for playing.</p>
  `;
}

showQuestion();
