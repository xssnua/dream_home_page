class BurgerMenu {
    constructor() {
        this.burgerButton = document.getElementById('burger-button');
        this.burgerMenu = document.getElementById('burger-menu');
        this.burgerClose = document.getElementById('burger-close');
        this.burgerLinks = document.querySelectorAll('[data-burger-close]');
        
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.burgerButton || !this.burgerMenu) {
            console.warn('Burger menu elements not found');
            return;
        }
        
        this.burgerButton.addEventListener('click', () => this.toggle());
        this.burgerClose.addEventListener('click', () => this.close());
        
        this.burgerMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('burger-menu__overlay')) {
                this.close();
            }
        });
        
        this.burgerLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        
        this.burgerButton.classList.add('burger--open');
        this.burgerButton.setAttribute('aria-expanded', 'true');
        this.burgerButton.setAttribute('aria-label', 'Close menu');
        
        this.burgerMenu.classList.add('burger-menu--open');
        this.burgerMenu.setAttribute('aria-hidden', 'false');
        
        document.body.classList.add('menu-open');
        
        setTimeout(() => {
            this.burgerClose.focus();
        }, 300);
        
        console.log('Menu opened');
    }
    
    close() {
        this.isOpen = false;
        
        this.burgerButton.classList.remove('burger--open');
        this.burgerButton.setAttribute('aria-expanded', 'false');
        this.burgerButton.setAttribute('aria-label', 'Open menu');
        
        this.burgerMenu.classList.remove('burger-menu--open');
        this.burgerMenu.setAttribute('aria-hidden', 'true');
        
        document.body.classList.remove('menu-open');
        
        this.burgerButton.focus();
        
        console.log('Menu closed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = new BurgerMenu();
    
    window.burgerMenu = burgerMenu;
});

export default BurgerMenu;