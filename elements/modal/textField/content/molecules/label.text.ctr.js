import LabelTextComponent from '../atoms/label.text.js';

export default class LabelTextContainerComponent extends HTMLElement {
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
    const labelText = this.eventPublisher
      ? new LabelTextComponent({ eventPublisher: this.eventPublisher })
      : new LabelTextComponent();
    shadow.appendChild(style);
    shadow.appendChild(labelText);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = ':host { height: max-content; width: max-content; }';
    return style;
  }
}

customElements.define('cus-label-text-ctr', LabelTextContainerComponent);
