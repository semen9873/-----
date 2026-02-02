// Данные викторины: 10 вопросов с 3 вариантами ответа (1 правильный)
const quizData = [
  {
    //1
    question: "Большинство опрошенных учителей мечтали о преподавании со школьных лет, но этот учитель мечтала стать диктором на ТВ",
    answers: ["Виктория Николаевна Бызгаева", "Людмила Юрьевна Грак", "Данченко Елена Константиновна"],
    correct: 0
  },
  {//2
    question: "Как ты думаешь, что вдохновляет стать учителем? Ответы учителей были похожими. Это и первый учитель, классный руководитель или учитель, который запомнился. Это и желание работать с детьми, в школьной атмосфере, быть полезным обществу. Отгадай какого учителя вдохновила её бабушка — учитель математики?",
    answers: ["Яна Николаевна Погибельная", "Елена Константиновна Данченко", "Надежда Петровна Старовойтова"],
    correct: 2
  },
  {//3
    question: "Вдохновение может быть разным и придти в разное время. Кто-то мечтал стать учителем с раннего дества, кто-то определился в подростковом возрасте, а кого-то привела судьба в более поздние годы. Чья жизнь была связана с гимназией гораздо теснее, ведь этот человек ходил в нашу школу ещё будучи первоклашкой?",
    answers: ["Яна Александровна Емелина", "Кристина Генадевна Бакалэ", "Ирина Вячеславовна Боровинская"],
    correct: 1
  },
  {//4
    question: "Многие из наших педагогов имеют вторую специальность. У нас в школе есть логопед, юрист, учитель фортопиано, художник-аниматор, менеджер...Отгадай, кто из педагогов является техником-технологом швейного дела?",
    answers: ["Елена Николаевна Павлова", "Ирина Вячеславовна Боровинская", "Людмила Юрьевна Грак"],
    correct: 1
  },
  {//5
    question: "Случался ли с тобой курьезный случай в школе. Наши учителя тоже были детьми, кто то мыл полы за плохое поведение, кто-то, балуясь с одноклассником на перемене, выбил дверь в кабинете технологии. Отгадай какой учитель в первом классе, прийдя домой, обнаружила, что портфель не её, а одноклассника?",
    answers: ["Светлана Борисовна Полякова", "Марина Виктровна Благидко", "Виктория Николаевна Бызгаева"],
    correct: 2
  },
  {
    question: "Какая книга или фильм оказали большое впечатление и повлияла на тебя? У наших учителей тоже есть свои предпочтения: «Повесть о настоящем человеке», «Два капитана», «Поллианна», произведения Я. Зенкера, А.Моруа, Д.Хармса, фильм «Офицеры» и многое другое. У кого из учителей такой книгой стали произведения Джоан Роулинг о Гарри Поттере?",
    answers: ["Кириллова Юлия Максимовна", "Елена Николаевна Павлова", "Кристина Генадевна Бакалэ"],
    correct: 0
  },
  {
    question: "У кого из наших учителей есть звание ветеран труда?",
    answers: ["Юрий Васильевич Солодков", "Кириллова Юлия Максимовна", "Марина Виктровна Благидко"],
    correct: 0
  },
];

// Элементы DOM
const progressFill = document.querySelector('.progress-fill');''
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
  const totalQuestions = quizData.length;
  const currentIndex = currentQuestion; // 0, 1, 2, ..., N−1

  let progressPercent;

  if (currentIndex === totalQuestions - 1) {
    // Последний вопрос → гарантированно 100%
    progressPercent = 100;
  } else {
    // Промежуточные вопросы: плавный рост
    progressPercent = (currentIndex / totalQuestions) * 100;
  }

  // Гарантируем, что значение не меньше 0 и не больше 100
  progressPercent = Math.max(0, Math.min(100, progressPercent));

  // Обновляем стиль с явным указанием единиц
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
    if (questionContainer) {
      questionContainer.classList.add('shake');
      setTimeout(() => {
        questionContainer.classList.remove('shake');
      }, 500);
    }
    answerButtons[selectedIndex].classList.add('incorrect');
    answerButtons[q.correct].classList.add('correct');
  }

  // Отключаем кнопки и показываем «Далее»
  answerButtons.forEach(btn => {
    btn.disabled = true;
  });
  nextBtn.style.display = 'flex';

  updateProgress(); // Обновляем прогресс ПОСЛЕ ответа
}





function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    // Если есть ещё вопросы — отображаем следующий
    displayQuestion();
    updateProgress();
    nextBtn.style.display = 'none'; // Скрываем кнопку до нового ответа
  } else {
    // Если вопросов больше нет — показываем результат
    showResult();
  }
}

nextBtn.disabled = true; // На время обработки
setTimeout(() => {
  nextBtn.disabled = false;
}, 300);



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

