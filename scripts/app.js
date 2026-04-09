import './toTopBtn.js';
import './burgerMenu.js';
import './formValidation.js';
import './modalSignUp.js';
import './learnScroll.js';
import { showLoader, hideLoader } from './loader.js';
import themeSwitcher from './themeSwitcher.js';
import scrollAnimations from './scrollAnimations.js';

showLoader();

themeSwitcher.init();

scrollAnimations.init();

window.addEventListener("load", () => {
  hideLoader();
});