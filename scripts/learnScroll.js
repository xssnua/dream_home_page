const learnBtn = document.querySelector('.hero__action-btn');

if (learnBtn) {
  learnBtn.addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('service').scrollIntoView({
      behavior: 'smooth'
    });
  });
}
