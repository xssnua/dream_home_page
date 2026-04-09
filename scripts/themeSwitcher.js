const THEME_STORAGE_KEY = 'dream-home-theme-preference';

class ThemeSwitcher {
  constructor() {
    this.desktopToggle = document.getElementById('themeToggle');
    this.mobileToggle = document.getElementById('themeToggleMobile');
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    const savedTheme = this.getSavedTheme();
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    this.applyTheme(initialTheme, false);

    // Bind events
    if (this.desktopToggle) {
      this.desktopToggle.addEventListener('click', () => this.toggle());
    }

    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggle());
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getSavedTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });

    this.isInitialized = true;
  }

  /**
   *
   * @returns {string|null} 'light' | 'dark' | null
   */
  getSavedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /**
   *
   * @param {string} theme - 'light' | 'dark'
   */
  saveTheme(theme) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
    }
  }

  /**
   *
   * @param {string} theme - 'light' | 'dark'
   * @param {boolean} animate
   */
  applyTheme(theme, animate = true) {
    const html = document.documentElement;
    const isDark = theme === 'dark';

    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }

    this.syncToggles(isDark);

    if (animate) {
      document.documentElement.style.transition = 'background-color 0.35s ease, color 0.35s ease';
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 400);
    }
  }

  /**
   *
   * @param {boolean} isDark
   */
  syncToggles(isDark) {
    const toggles = [this.desktopToggle, this.mobileToggle].filter(Boolean);

    toggles.forEach(toggle => {
      const isChecked = toggle.getAttribute('aria-checked') === 'true';
      if (isChecked !== isDark) {
        toggle.setAttribute('aria-checked', String(isDark));
      }
    });
  }

  /**
   *
   */
  toggle() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    this.saveTheme(newTheme);
    this.applyTheme(newTheme, true);
  }
}

const themeSwitcher = new ThemeSwitcher();

export { themeSwitcher };
export default themeSwitcher;
