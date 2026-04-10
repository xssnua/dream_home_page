import './toTopBtn.js';
import './burgerMenu.js';
import './formValidation.js';
import './modalSignUp.js';
import './learnScroll.js';
import { showLoader, hideLoader } from './loader.js';
import themeSwitcher from './themeSwitcher.js';
import scrollAnimations from './scrollAnimations.js';
import reviewsCarousel from './reviewsCarousel.js';
import heroAnimations from './heroAnimations.js';
import chatbot from './chatbot.js';

showLoader();

themeSwitcher.init();

scrollAnimations.init();

reviewsCarousel.init();

heroAnimations.init();

chatbot.init();

window.addEventListener("load", () => {
  hideLoader();
});