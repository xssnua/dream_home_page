const headerSignUpBtn = document.querySelector('.nav-signup'); // твоя кнопка в хедере
const modal = document.getElementById('signupModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// открыть модалку
headerSignUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('open');
});

// закрыть по кнопке
modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

// закрыть по клику вне окна
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});