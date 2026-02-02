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

const dialog = document.getElementById('myDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');


openBtn.onclick = () => dialog.showModal();
closeBtn.onclick = () => dialog.close();



document.querySelectorAll('#send-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Координаты клика внутри кнопки
    const x = e.offsetX;
    const y = e.offsetY;

    // Создаём элемент волны
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // Добавляем в кнопку
    this.appendChild(ripple);

    // Удаляем после анимации
    setTimeout(() => {
      ripple.remove();
    }, 800); // Совпадает с длительностью анимации
  });
});

