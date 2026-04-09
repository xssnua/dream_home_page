class HeroAnimations {
  init() {
    this.animateIn();
    this.initParallax();
  }

  animateIn() {
    const title = document.querySelector('.hero__content-title');
    const desc = document.querySelector('.hero__content-description');
    const btn = document.querySelector('.hero__action-btn');
    const filters = document.querySelector('.hero__filters');
    const introImg = document.querySelector('.intro__wrapper-img');

    const items = [title, desc, btn, filters, introImg].filter(Boolean);

    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 400 + i * 200);
    });
  }

  initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

      heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
  }
}

const heroAnimations = new HeroAnimations();

export { heroAnimations };
export default heroAnimations;
