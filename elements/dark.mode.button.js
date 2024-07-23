import { INITIAL_MODE } from '../defaults.js';

export default class DarkModeToggleButtonElement extends HTMLElement {
  darkMode = INITIAL_MODE === 'dark';

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.innerText = this.buildButtonText();
    button.addEventListener('click', (event) => {
      this.toggleDarkMode();
      event.target.innerText = this.buildButtonText();
      this.dispatchMode(this.darkMode);
    });
    shadow.appendChild(button);
    // set initial mode
    this.dispatchMode(this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  buildButtonText() {
    const beginText = `Switch to ${this.darkMode ? 'Light' : 'Dark'}`;
    return `${beginText} Mode`;
  }

  dispatchMode(darkMode) {
    document.dispatchEvent(
      new CustomEvent('mode', {
        bubbles: true,
        composed: true,
        detail: darkMode === false ? 'light' : 'dark',
      })
    );
  }
}

customElements.define('cus-dark-mode-btn', DarkModeToggleButtonElement);
