import LabelTextContainerComponent from './molecules/label.text.ctr.js';
import InputTextContainerComponent from './molecules/input.text.ctr.js';

export default class ContentComponent extends HTMLElement {
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
    const labelCtr = this.eventPublisher
      ? new LabelTextContainerComponent({ eventPublisher: this.eventPublisher })
      : new LabelTextContainerComponent();
    const inputCtr = this.eventPublisher
      ? new InputTextContainerComponent({ eventPublisher: this.eventPublisher })
      : new InputTextContainerComponent();
    shadow.appendChild(style);
    shadow.appendChild(labelCtr);
    shadow.appendChild(inputCtr);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
      display: flex;
      flex-direction: column;
      height: 48px;
      width: 114px;
      padding: 4px 0px 4px 0px;
    }
    `;
    return style;
  }
}

customElements.define('cus-content', ContentComponent);
