import { INITIAL_MODE } from '../../../../../defaults.js';

export default class LabelTextComponent extends HTMLElement {
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
    const span = document.createElement('span');
    span.textContent = 'Label';
    span.setAttribute('class', 'smallText');
    // reference global styles within the shadow DOM
    this.shadow.adoptedStyleSheets = [...document.adoptedStyleSheets];
    this.shadow.appendChild(style);
    this.shadow.appendChild(span);
    this.eventPublisher?.addEventListener('mode', this.handleMode.bind(this));
  }

  disconnectedCallback() {
    this.eventPublisher?.removeEventListener(
      'mode',
      this.handleMode.bind(this)
    );
  }

  handleMode(event) {
    const span = this.shadow.querySelector('span');
    span.style.color =
      event.detail === 'light'
        ? 'var(--light-mode-text-accent)'
        : 'var(--dark-mode-text-accent)';
  }

  makeStyle() {
    const style = document.createElement('style');
    const color =
      INITIAL_MODE === 'light'
        ? 'var(--light-mode-text-accent)'
        : 'var(--dark-mode-text-accent)';
    style.textContent = `
    .smallText {
        color: ${color};
      }
    `;
    return style;
  }
}

customElements.define('cus-label-text', LabelTextComponent);
