import InputTextComponent from '../atoms/input.text.js';

export default class InputTextContainerComponent extends HTMLElement {
  eventPublisher = null;

  constructor(parentConfig = {}) {
    super();

    if (parentConfig.eventPublisher) {
      this.eventPublisher = parentConfig.eventPublisher;
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const inputText = this.eventPublisher
      ? new InputTextComponent({ eventPublisher: this.eventPublisher })
      : new InputTextComponent();
    shadow.appendChild(style);
    shadow.appendChild(inputText);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = ':host { height: max-content; width: max-content; }';
    return style;
  }
}

customElements.define('cus-input-text-ctr', InputTextContainerComponent);
