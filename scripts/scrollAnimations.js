class ScrollAnimations {
  constructor() {
    this.isInitialized = false;
    this.countersAnimated = false;
  }

  init() {
    if (this.isInitialized) return;

    this.initScrollReveal();
    this.initParallax();
    this.initCounters();
    this.initProgressBar();

    this.isInitialized = true;
  }

  initScrollReveal() {
    const sections = document.querySelectorAll(
      '.intro, .advantages-section, .portfolio-section, .reviews-section, .support-section'
    );

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(40px)';
      section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroHeight = heroSection.offsetHeight;

          if (scrolled < heroHeight) {
            const offset = scrolled * 0.35;
            heroSection.style.backgroundPositionY = `${offset}px`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  initCounters() {
    const statsContainer = document.querySelector('.intro__wrapper-content-stats');
    if (!statsContainer) return;

    const statNumbers = statsContainer.querySelectorAll('.intro__wrapper-content-stat-number');

    const targets = [];
    statNumbers.forEach(el => {
      const text = el.textContent.trim();
      const match = text.match(/(\d+)/);
      if (match) {
        targets.push({
          element: el,
          target: parseInt(match[1], 10),
          suffix: text.replace(match[1], ''),
          startValue: 0
        });
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.countersAnimated) {
          this.countersAnimated = true;
          this.animateCounters(targets);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
  }

  animateCounters(targets) {
    const duration = 2000;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      targets.forEach(({ element, target, suffix }) => {
        const current = Math.round(easedProgress * target);
        element.textContent = `${current}${suffix}`;
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  initProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'scrollProgress';
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #695346, #DDC7BB);
      z-index: 10001;
      transition: width 0.1s linear;
    `;
    document.body.appendChild(bar);

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          bar.style.width = `${scrollPercent}%`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

const scrollAnimations = new ScrollAnimations();

export { scrollAnimations };
export default scrollAnimations;