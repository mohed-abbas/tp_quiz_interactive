import { questions } from './questions.js';

// 1. Elements du formulaire
const userForm       = document.getElementById('user-form');
const nameInput      = document.getElementById('name-input');
const emailInput     = document.getElementById('email-input');

// 2. Navbar & user info
const navbar         = document.getElementById('navbar');
const userInfoDiv    = document.getElementById('user-info');
const liveScoreDiv   = document.getElementById('live-score');

// 3. Quiz & nav
const quizContainer     = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement   = document.getElementById('question');
const choicesContainer  = document.getElementById('choices');
const prevBtn           = document.getElementById('prev-btn');
const nextBtn           = document.getElementById('next-btn');

// 4. Score final
const scoreContainer = document.getElementById('score-container');
const scoreText      = document.getElementById('score-text');
const restartBtn     = document.getElementById('restart-btn');

// États
let currentIndex = 0;
const answers    = new Array(questions.length).fill(null);
let score        = 0;
let user         = { name: '', email: '' };

// Événements
userForm.addEventListener('submit', handleUserSubmit);
prevBtn.addEventListener('click', showPreviousQuestion);
nextBtn.addEventListener('click', showNextQuestion);
restartBtn.addEventListener('click', resetAll);

// Soumission formulaire
function handleUserSubmit(e) {
  e.preventDefault();
  user.name  = nameInput.value.trim();
  user.email = emailInput.value.trim();
  userForm.classList.add('hidden');
  navbar.classList.remove('hidden');
  quizContainer.classList.remove('hidden');
  initQuiz();
}

// Initialisation du quiz
function initQuiz() {
  currentIndex = 0;
  answers.fill(null);
  score = 0;
  updateUserInfo();      // Affiche nom/email
  updateProgress();      // Affiche progression initiale 0
  updateNavButtons();
  showQuestion();
}

// Affiche question et choix
function showQuestion() {
  resetState();
  const q = questions[currentIndex];
  questionElement.textContent = q.prompt;
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.className = 'w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition text-left';
    if (answers[currentIndex] === idx) btn.classList.add('bg-indigo-200');
    btn.addEventListener('click', () => selectAnswer(idx));
    choicesContainer.appendChild(btn);
  });
}

function resetState() {
  choicesContainer.innerHTML = '';
}

function selectAnswer(idx) {
  // On ne met pas à jour la progression ici
  answers[currentIndex] = idx;
  showQuestion();
}

function showPreviousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    updateNavButtons();
    showQuestion();
  }
}

function showNextQuestion() {
  if (answers[currentIndex] === null) {
    alert('Sélectionnez une réponse avant de continuer.');
    return;
  }
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    updateNavButtons();
    updateProgress();      // Mise à jour progression uniquement sur Next
    showQuestion();
  } else {
    calculateScore();
    showFinalScore();
  }
}

function updateNavButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = (currentIndex === questions.length - 1) ? 'Terminer' : 'Suivant';
}

// Mise à jour de la progression dans la navbar
function updateProgress() {
  const done = answers.filter(a => a !== null).length;
  liveScoreDiv.textContent = `Progression : ${done}/${questions.length}`;
}

// Calcul du score
function calculateScore() {
  score = answers.reduce((sum, ans, i) => sum + (ans === questions[i].answer ? 1 : 0), 0);
}

// Calcul du score final en pourcentage 
function calculateFinalScore() {
  return (score / questions.length) * 100;
}
// Affiche score final dans page et navbar
function showFinalScore() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreText.textContent = `Vous avez obtenu ${score} sur ${questions.length} bonnes réponses.`;
  const percentage = calculateFinalScore();
  
  liveScoreDiv.textContent = `Taux de réponse correct: ${percentage.toFixed(2)}%`;
}

function updateUserInfo() {
  userInfoDiv.textContent  = `Bonjour, ${user.name} (${user.email})`;
}

function resetAll() {
  userForm.reset();
  userForm.classList.remove('hidden');
  navbar.classList.add('hidden');
  quizContainer.classList.add('hidden');
  scoreContainer.classList.add('hidden');
}