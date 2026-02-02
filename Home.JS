
window.addEventListener('scroll', () => {
  // Обновляем переменную в корневом контексте
  document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);
});


