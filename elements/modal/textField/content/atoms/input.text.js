import { INITIAL_MODE } from '../../../../../defaults.js';

export default class InputTextComponent extends HTMLElement {
  shadow = null;
  eventPublisher = null;

  constructor(parentConfig = {}) {
    super();

    if (parentConfig.eventPublisher) {
      this.eventPublisher = parentConfig.eventPublisher;
    }
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const input = document.createElement('input');
    input.setAttribute('class', 'largeText');
    input.setAttribute('value', 'Input');
    // reference global styles within the shadow DOM
    this.shadow.adoptedStyleSheets = [...document.adoptedStyleSheets];
    this.shadow.appendChild(style);
    this.shadow.appendChild(input);
    this.eventPublisher?.addEventListener('mode', this.handleMode.bind(this));
  }

  disconnectedCallback() {
    this.eventPublisher?.removeEventListener(
      'mode',
      this.handleMode.bind(this)
    );
  }

  handleMode(event) {
    const input = this.shadow.querySelector('input');
    input.style.color =
      event.detail === 'light'
        ? 'var(--light-mode-text-color)'
        : 'var(--dark-mode-text-color)';
  }

  makeStyle() {
    const style = document.createElement('style');
    const color =
      INITIAL_MODE === 'light'
        ? 'var(--light-mode-text-color)'
        : 'var(--dark-mode-text-color)';
    style.textContent = `
    :host {
      display: block;
      height: 24px;
      width: 39px;
    }
    input {
        width: 100%;
        border: none;
        color: ${color};
        background-color: transparent;
      }
    `;
    return style;
  }
}

customElements.define('cus-input-text', InputTextComponent);
