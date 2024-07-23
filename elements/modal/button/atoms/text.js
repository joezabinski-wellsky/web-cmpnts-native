import { INITIAL_MODE } from '../../../../defaults.js';

export const TEXT_VALUES = {
  cancel: 'CANCEL',
  save: 'SAVE',
};

export class ButtonTextComponent extends HTMLElement {
  eventPublisher = null;
  textConfig = {
    style: 'outlined',
    mode: INITIAL_MODE,
    value: TEXT_VALUES.cancel,
  };

  constructor(parentConfig = {}) {
    super();

    if (parentConfig.eventPublisher) {
      this.eventPublisher = parentConfig.eventPublisher;
    }

    if (parentConfig.textConfigOverrides) {
      this.textConfig = {
        ...this.textConfig,
        ...parentConfig.textConfigOverrides,
      };
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    // reference global styles within the shadow DOM
    shadow.adoptedStyleSheets = [...document.adoptedStyleSheets];

    const style = this.makeStyle();
    const span = document.createElement('span');
    span.setAttribute('class', 'largeLabel');
    span.innerText = this.textConfig.value;

    shadow.appendChild(style);
    shadow.appendChild(span);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
      display: flex;
      span {
          color: ${this.selectColor(this.textConfig)}
        }
      }
    `;
    return style;
  }

  selectColor(config) {
    if (config?.style === 'outlined') {
      return config?.mode === 'light'
        ? 'var(--light-mode-btn-label-color-outlined)'
        : 'var(--dark-mode-btn-label-color-outined)';
    }
    // filled style
    return config?.mode === 'light'
      ? 'var(--light-mode-btn-label-color-filled)'
      : 'var(--dark-mode-btn-label-color-filled)';
  }
}

customElements.define('cus-btn-text', ButtonTextComponent);
