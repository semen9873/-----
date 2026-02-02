// Получаем все изображения с классом .glory-img
const images = document.querySelectorAll('.glory-img');

// Функция для закрытия всех активных изображений
function closeAllImages() {
    images.forEach(img => img.classList.remove('active'));
}

// Обработчик клика по изображению
images.forEach(img => {
    img.addEventListener('click', (event) => {
        // Если уже активно — закрываем
        if (img.classList.contains('active')) {
            img.classList.remove('active');
        } else {
            // Закрываем другие и активируем текущее
            closeAllImages();
            img.classList.add('active');
        }
    });
});

// Закрытие при клике вне изображения
document.addEventListener('click', (event) => {
    // Проверяем, кликнули ли не по изображению и не по его потомкам
    const isClickOutside = !event.target.closest('.glory-img');
    if (isClickOutside) {
        closeAllImages();
    }
});

// Закрытие по Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAllImages();
    }
});
