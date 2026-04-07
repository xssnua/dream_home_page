import './toTopBtn.js';
import './burgerMenu.js';
import './formValidation.js';
import './modalSignUp.js';
import './learnScroll.js';
import { showLoader, hideLoader } from './loader.js';

showLoader();

window.addEventListener("load", () => {
  hideLoader();
});