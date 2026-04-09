class ReviewsCarousel {
  constructor() {
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    this.wrapper = document.getElementById('reviewsWrapper');
    this.prevBtn = document.getElementById('reviewsPrev');
    this.nextBtn = document.getElementById('reviewsNext');
    this.dotsContainer = document.getElementById('reviewsDots');

    if (!this.wrapper || !this.prevBtn || !this.nextBtn) return;

    this.slides = this.wrapper.querySelectorAll('.reviews__slide');
    this.totalSlides = this.slides.length;
    if (this.totalSlides === 0) return;

    this.track = document.createElement('div');
    this.track.className = 'reviews__track';
    this.slides.forEach(slide => this.track.appendChild(slide));
    this.wrapper.appendChild(this.track);

    // Dots
    this.dots = this.dotsContainer
      ? this.dotsContainer.querySelectorAll('.reviews__dot')
      : [];

    // Event listeners
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        this.goToSlide(parseInt(dot.dataset.slide, 10));
        this.resetAutoPlay();
      });
    });

    // Touch / swipe
    this.initSwipe();

    // Auto-play
    this.startAutoPlay();

    // Pause on hover
    this.wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.wrapper.addEventListener('mouseleave', () => this.startAutoPlay());

    this.wrapper.setAttribute('tabindex', '0');
    this.wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { this.prev(); this.resetAutoPlay(); }
      if (e.key === 'ArrowRight') { this.next(); this.resetAutoPlay(); }
    });

    this.isInitialized = true;
  }

  goToSlide(index) {
    if (index < 0) index = this.totalSlides - 1;
    if (index >= this.totalSlides) index = 0;

    this.currentIndex = index;
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  next() {
    this.goToSlide(this.currentIndex + 1);
  }

  prev() {
    this.goToSlide(this.currentIndex - 1);
  }

  /* ===== Swipe on mobile ===== */
  initSwipe() {
    let startX = 0;
    let endX = 0;
    const threshold = 50;

    this.wrapper.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.wrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      const diff = startX - endX;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
        this.resetAutoPlay();
      }
    }, { passive: true });
  }

  /* ===== Auto-play ===== */
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

const reviewsCarousel = new ReviewsCarousel();

export { reviewsCarousel };
export default reviewsCarousel;
