const signUpButtons = document.querySelectorAll('.nav-signup, .btn, .card-portfolio__transaction-btn, .hero__filters-search-btn');
const modal = document.getElementById('signupModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

signUpButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('open');
  });
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    modal.classList.remove('open');
  }
});