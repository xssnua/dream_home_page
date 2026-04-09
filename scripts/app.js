import './toTopBtn.js';
import './burgerMenu.js';
import './formValidation.js';
import './modalSignUp.js';
import './learnScroll.js';
import { showLoader, hideLoader } from './loader.js';
import themeSwitcher from './themeSwitcher.js';
import scrollAnimations from './scrollAnimations.js';
import reviewsCarousel from './reviewsCarousel.js';

showLoader();

themeSwitcher.init();

scrollAnimations.init();

reviewsCarousel.init();

window.addEventListener("load", () => {
  hideLoader();
});