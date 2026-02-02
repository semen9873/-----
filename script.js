


window.addEventListener('scroll', () => {
  // Обновляем переменную в корневом контексте
  document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);
});


const Propusk = document.querySelector('.propusk');
const Vkladka1 = document.querySelector('.vkladka1');
const Vkladka2 = document.querySelector('.vkladka2');
const Vkladka3 = document.querySelector('.vkladka3');
const Vkladka4 = document.querySelector('.vkladka4');
const Vkladka5 = document.querySelector('.vkladka5');
const Vkladka6 = document.querySelector('.vkladka6');
const SayRobot00 = document.querySelector('.say_robot-1');
const SayRobot6 = document.querySelector('.say_robot6');
const SayRobot5 = document.querySelector('.say_robot5');
const SayRobot4 = document.querySelector('.say_robot4');
const SayRobot3 = document.querySelector('.say_robot3');
const SayRobot2 = document.querySelector('.say_robot2');
const SayRobot1 = document.querySelector('.say_robot1');
const SayRobot0 = document.querySelector('.say_robot0');
const Oblako = document.querySelector('.oblako');
const imgRobot = document.querySelector('.img-robot');
const Robot = document.querySelector('.robot');
const IncorrectAnswer__1 = document.querySelector('.incorrect__answer__1');
const IncorrectAnswer = document.querySelector('.incorrect__answer');
const CorrectAnswer = document.querySelector('.correct__answer');
const Konfiti = document.querySelector('.konfiti');
const list1Btn = document.querySelector('.list__1');
const list0Btn = document.querySelector('.list__0');
const chat = document.querySelector('.chat');

// Текущий шаг (0 — начальное состояние, 1–6 — шаги вперёд)
let currentStep = 0;

// Функция обновления стилей по текущему шагу
function updateStyles(step) {
  // Сбрасываем все стили
  imgRobot.style.margin = '';
  imgRobot.style.animation = '';
  Robot.style.zIndex = '';
  Robot.style.display = '';
  SayRobot0.style.opacity = '0';
  SayRobot1.style.opacity = '0';
  SayRobot2.style.opacity = '0';
  SayRobot3.style.opacity = '0';
  SayRobot4.style.opacity = '0';
  SayRobot5.style.opacity = '0';
  SayRobot00.style.opacity = '0';
  Vkladka1.style = '';
  Vkladka2.style = '';
  Vkladka3.style = '';
  Vkladka4.style = '';
  Vkladka5.style = '';

  // Применяем стили для текущего шага
  switch (step) {
    case 0:
      imgRobot.style.animation = 'moveUpDown 5s cubic-bezier(0.88, 0.02, 0.18, 1.12) infinite';
      SayRobot00.style.opacity = '1';
      break;

    case 1:
      imgRobot.style.margin = '-80px 0px 0px -750px';
      imgRobot.style.animation = 'none';
      Robot.style.zIndex = '1000';
      SayRobot0.style.opacity = '1';
      Vkladka1.style.backgroundColor = 'rgb(31, 51, 142)';
      Vkladka1.style.border = '1px solid rgb(255, 255, 255)';
      Vkladka1.style.borderRadius = '7px';
      break;

    case 2:
      Robot.style.zIndex = '1000';
      imgRobot.style.margin = '-78px 0px 0px -550px';
      SayRobot1.style.opacity = '1';
      Vkladka2.style.backgroundColor = 'rgb(31, 51, 142)';
      Vkladka2.style.border = '1px solid rgb(255, 255, 255)';
      Vkladka2.style.borderRadius = '7px';
      break;

    case 3:
      Robot.style.zIndex = '1000';
      imgRobot.style.margin = '-75px 0px 0px -350px';
      SayRobot2.style.opacity = '1';
      Vkladka3.style.backgroundColor = 'rgb(31, 51, 142)';
      Vkladka3.style.border = '1px solid rgb(255, 255, 255)';
      Vkladka3.style.borderRadius = '7px';
      break;

    case 4:
      Robot.style.zIndex = '1000';
      imgRobot.style.margin = '-80px 0px 0px -150px';
      SayRobot3.style.opacity = '1';
      Vkladka4.style.backgroundColor = 'rgb(31, 51, 142)';
      Vkladka4.style.border = '1px solid rgb(255, 255, 255)';
      Vkladka4.style.borderRadius = '7px';
      break;

    case 5:
      Robot.style.zIndex = '1000';
      imgRobot.style.margin = '-85px 0px 0px 100px';
      SayRobot4.style.opacity = '1';
      Vkladka5.style.backgroundColor = 'rgb(31, 51, 142)';
      Vkladka5.style.border = '1px solid rgb(255, 255, 255)';
      Vkladka5.style.borderRadius = '7px';
      break;

    case 6:
      Robot.style.display = 'none';
      break;
  }
}

// Обработчик для .list__1 (вперёд)
list1Btn.addEventListener('click', () => {
  if (currentStep < 6) {
    currentStep++;
    updateStyles(currentStep);
  }
});

// Обработчик для .list__0 (назад)
list0Btn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateStyles(currentStep);
  }
});

// Обработчик для .propusk
Propusk.addEventListener('click', () => {
  Robot.style.display = 'none';
  Vkladka1.style = '';
  Vkladka2.style = '';
  Vkladka3.style = '';
  Vkladka4.style = '';
  Vkladka5.style = '';
  currentStep = 6; // Считаем, что пропуск = финальный шаг
});

// Инициализация: применяем стили для начального состояния (шаг 0)
updateStyles(currentStep);




// Общая функция для обработки неверных ответов
function handleIncorrectClick(event) {
    const target = event.target;

    // Добавляем анимацию тряски
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);

    // Красим нажатый ответ в красный
    target.style.color = 'red';

    // Отключаем обработчик после первого срабатывания
    target.removeEventListener('click', handleIncorrectClick);
}

// Обработчик клика по верному ответу
function handleCorrectClick(event) {
    const target = event.target;

    if (target === CorrectAnswer) {
        // Показываем Konfiti
        Konfiti.style.display = 'block';
        setTimeout(() => {
            Konfiti.style.display = 'none';
        }, 870);

        // Красим ответ в зелёный
        CorrectAnswer.style.color = 'green';

        // Отключаем обработчик после первого срабатывания
        CorrectAnswer.removeEventListener('click', handleCorrectClick);
    }
}

// Назначаем обработчики (один раз)
IncorrectAnswer__1.addEventListener('click', handleIncorrectClick);
IncorrectAnswer.addEventListener('click', handleIncorrectClick);
CorrectAnswer.addEventListener('click', handleCorrectClick);










document.addEventListener('mousemove', e => {
  const layer = document.querySelector('.layers1');
  
  // Проверяю, что элемент найден
  if (layer) {
    layer.style.cssText = `
      --move-x: ${(e.clientX - window.innerWidth / 2) * -0.03}deg;
      --move-y: ${(e.clientY - window.innerHeight / 2) * -0.03}deg;
    `;
  }
});








const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message-text');
const messagesContainer = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const message = messageInput.value.trim();
  if (message) {
    // Создаем элемент сообщения
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = message;
    
    // Добавляем в контейнер
    messagesContainer.appendChild(messageElement);
    
    // Очищаем поле ввода
    messageInput.value = '';
    
    // Прокручиваем до последнего сообщения
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});






const home = document.querySelector('.home');
const victoriny = document.querySelector('.victoriny');
const ourGlory = document.querySelector('.our-glory');
const vkladka1 = document.querySelector('.vkladka1');
const vkladka2 = document.querySelector('.vkladka2');
const vkladka3 = document.querySelector('.vkladka3');
const vkladka4 = document.querySelector('.vkladka4');
// Скрываем всё при загрузке
// Получаем все кнопки навигации
const navButtons = document.querySelectorAll('.header-navigation button');

// Функция для скрытия всех секций
function hideSections() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.style.display = 'none');
}

// Показываем нужную секцию
function showSection(tabId) {
  const targetSection = document.getElementById(tabId);
  if (targetSection) {
    targetSection.style.display = 'block';
  }
}

// Добавляем обработчики событий на каждую кнопку
navButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Сначала скрываем все секции
    hideSections();
    // Затем показываем выбранную секцию
    showSection(this.dataset.tab);
  });
});



