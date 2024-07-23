import { INITIAL_MODE } from '../../defaults.js';

// ng-container-card-0
export default class CardComponent extends HTMLElement {
  config = {
    mode: INITIAL_MODE,
  };

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const header = document.createElement('cus-header');
    const modal = document.createElement('cus-modal');
    shadow.appendChild(style);
    shadow.appendChild(header);
    shadow.appendChild(modal);

    document.addEventListener('mode', (event) => {
      const style = shadow.querySelector('style');
      const rules = Array.from(style.sheet.cssRules);
      const hostRules = rules.find((rule) => rule.selectorText === ':host');
      hostRules.style.borderColor = this.selectBorderColor({
        mode: event.detail,
      });
      hostRules.style.backgroundColor = this.selectBackgroundColor({
        mode: event.detail,
      });
    });
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
      width: max-content;
      border-radius: 12px;
      border: 1px solid ${this.selectBorderColor(this.config)};
      background-color: ${this.selectBackgroundColor(this.config)};
    `;
    return style;
  }

  selectBorderColor(config) {
    return config?.mode === 'light'
      ? 'var(--light-mode-surface-fg-color)'
      : 'var(--dark-mode-surface-fg-color)';
  }

  selectBackgroundColor(config) {
    return config?.mode === 'light'
      ? 'var(--light-mode-surface-bg-color)'
      : 'var(--dark-mode-surface-bg-color)';
  }
}

customElements.define('cus-card', CardComponent);
