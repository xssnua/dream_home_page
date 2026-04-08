import './toTopBtn.js';
import './burgerMenu.js';
import './formValidation.js';
import './modalSignUp.js';
import './learnScroll.js';
import { showLoader, hideLoader } from './loader.js';
import themeSwitcher from './themeSwitcher.js';

showLoader();

// Инициализируем переключатель темы
themeSwitcher.init();

window.addEventListener("load", () => {
  hideLoader();
});