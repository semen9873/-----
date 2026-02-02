// Данные викторины: 10 вопросов с 3 вариантами ответа (1 правильный)
const quizData = [
  {
    //1
    question: "На фото неожиданный зритель школьного урока, в кабинете какого учителя гость решил подслушать урок?",
    image: "bird.jpg",
    answers: ["Виктория Николаевна Бызгаева", "Светлана Борисовна Полякова", "Надежда Петровна Старовойтова"],
    correct: 2
  },
  {//2
    question: "Он не летает, но переносит нас другие страны, не читает вслух, но дарит живую речь. Что за таинственное устройство помогает изучать язык в кабинете английского языка?",
    answers: ["CD проигрыватель", "Диктофон", "Магнитофон"],
    correct: 0
  },
  {//3
    question: "Выпуск какого класса оставил данный предмет в подарок школе?",
    image: "Без имени.png52g6.png",
    answers: ["11а", "9а", "9б"],
    correct: 2
  },
  {//4
    question: "План какого этажа изображён на фото?",
    image: "sf.png",
    answers: ["1", "2", "3"],
    correct: 1
  },
  {//5
    question: "Сколько дверей в школе?",
    answers: ["69", "Менее 46", "Более 70"],
    correct: 2
  },
  {
    question: "Старейшими жителями кабинета какого учителя являются: глобус, макет циркуля, макет транспортира?",
    answers: ["Светлана Борисовна Полякова", "Виктория Николаевна Бызгаева", "Надежда Петровна Старовойтова"],
    correct: 1
  },
  {
    question: "В каком месте не проводили урок наши учителя?",
    answers: ["Библиотека", "Столовая", "Актовый зал"],
    correct: 1
  },
];

// Элементы DOM
const progressFill = document.querySelector('.progress-fill');
const startBtn = document.getElementById('startBtn');
const quizSection = document.getElementById('quizSection');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const nextBtn = document.getElementById('nextBtn');
const resultSection = document.getElementById('resultSection');
const resultText = document.getElementById('resultText');
const restartBtn = document.getElementById('restartBtn');
const info = document.querySelector('.info');
const shake = document.querySelector('.shake');
const questionContainer = document.querySelector('.victorina');


// Состояние викторины
let currentQuestion = 0;
let score = 0;


function displayQuestion() {
  const q = quizData[currentQuestion];
  questionText.textContent = q.question;

  // Показываем картинку, если она есть
  const questionImage = document.getElementById('questionImage');
  if (q.image) {
    questionImage.src = q.image;
    questionImage.style.display = 'block'; // делаем видимой
  } else {
    questionImage.style.display = 'none'; // скрываем, если нет изображения
  }

  answersContainer.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer;
    btn.addEventListener('click', () => checkAnswer(index));
    answersContainer.appendChild(btn);
  });
}


function updateProgress() {
  const totalAnswered = currentQuestion; // Уже отвеченные вопросы (1..10)


  // Ширина бара (100% на последнем вопросе)
  const progressPercent = (totalAnswered / quizData.length) * 100;
  progressFill.style.width = progressPercent + '%';

}


const questionImage = document.getElementById('questionImage');

// Обработчик клика по изображению
questionImage.addEventListener('click', () => {
  questionImage.classList.toggle('active');
});

// Обработчик клика вне изображения
document.addEventListener('click', (event) => {
  if (!questionImage.contains(event.target)) {
    questionImage.classList.remove('active');
  }
});

// Дополнительно: убираем увеличение при нажатии Esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    questionImage.classList.remove('active');
  }
});






function checkAnswer(selectedIndex) {
  const q = quizData[currentQuestion];
  const answerButtons = document.querySelectorAll('.answer-btn');

  if (selectedIndex === q.correct) {
    score++;
    answerButtons[selectedIndex].classList.add('correct');
  } else {
    // Эффект тряски
    if (questionContainer) {
      questionContainer.classList.add('shake');
      setTimeout(() => {
        questionContainer.classList.remove('shake');
      }, 500);
    }
    
    answerButtons[selectedIndex].classList.add('incorrect');
    answerButtons[q.correct].classList.add('correct');
  }

  // Отключаем кнопки и показываем "Далее"
  answerButtons.forEach(btn => {
    btn.disabled = true;
  });
  nextBtn.style.display = 'flex';

  // Мгновенное обновление прогресс‑бара (с анимацией)
  updateProgress();
}




// Функция перехода к следующему вопросу
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion();
    updateProgress(); // обновляем прогресс при новом вопросе
    nextBtn.style.display = 'none';
  } else {
    showResult();
  }
}

// Функция перезапуска викторины
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultSection.style.display = 'none';
  quizSection.style.display = 'flex';
  displayQuestion();
  nextBtn.style.display = 'none';
  updateProgress(); // сбрасываем прогресс до 0%
}

// Обработчики событий
startBtn.addEventListener('click', () => {
  info.style.display = 'none';
  quizSection.style.display = 'flex';
  displayQuestion();
  updateProgress();
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function showResult() {
  console.log('Показываем результат'); // отладка


  // Убедимся, что элементы существуют
  if (!resultSection || !resultText) {
    console.error('Элементы результата не найдены!');
    return;
  }

  quizSection.style.display = 'none';
  resultSection.style.display = 'flex'; // должно быть 'flex', а не 'block'

  const accuracy = Math.round((score / quizData.length) * 100);
  resultText.textContent = `Вы ответили правильно на ${score} из ${quizData.length} вопросов (${accuracy}%)!`;


  // Дополнительно: скрываем кнопку «Далее» на экране результата
  nextBtn.style.display = 'none';
}
