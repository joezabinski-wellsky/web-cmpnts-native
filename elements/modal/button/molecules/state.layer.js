import { ButtonTextComponent } from '../atoms/text.js';

export default class ButtonStateLayerComponent extends HTMLElement {
  eventPublisher = null;
  currBtnText = null;

  constructor(parentConfig = {}) {
    super();

    if (parentConfig.eventPublisher) {
      this.eventPublisher = parentConfig.eventPublisher;
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    shadow.appendChild(style);
    this.eventPublisher?.addEventListener('textInfo', (event) => {
      const btnText = new ButtonTextComponent({
        eventPublisher: this.eventPublisher,
        textConfigOverrides: {
          style: event.detail.style,
          mode: event.detail.mode,
          value: event.detail.value,
        },
      });
      if (this.currBtnText !== null) {
        shadow.removeChild(this.currBtnText);
      }
      this.currBtnText = btnText;
      shadow.appendChild(btnText);
    });
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: flex;
        justify-content: center;
        width: 102px;
        gap: 8px;
        padding: 10px 24px 10px 24px;
    }
    `;
    return style;
  }
}

customElements.define('cus-btn-state-layer', ButtonStateLayerComponent);
