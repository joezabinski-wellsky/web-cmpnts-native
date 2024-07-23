import { INITIAL_MODE } from '../../../../defaults.js';
import ButtonStateLayerComponent from './molecules/state.layer.js';

export default class TopmostButtonContainerComponent extends HTMLElement {
  config = {
    style: 'outlined',
    mode: INITIAL_MODE,
  };
  eventPublisher = null;

  constructor(parentConfig = {}) {
    super();

    if (parentConfig.eventPublisher) {
      this.eventPublisher = parentConfig.eventPublisher;
    }
  }

  connectedCallback() {
    const buttonStyleOverride = this.getAttribute('style');
    if (buttonStyleOverride) {
      this.config.style = buttonStyleOverride;
    }

    const shadow = this.attachShadow({ mode: 'open' });
    // reference global styles within the shadow DOM
    shadow.adoptedStyleSheets = [...document.adoptedStyleSheets];

    const style = this.makeStyle();
    const btnStateLayer = new ButtonStateLayerComponent({
      eventPublisher: shadow,
    });
    shadow.appendChild(style);
    shadow.appendChild(btnStateLayer);
    // Dispatch initial light/dark mode
    this.dispatchTextInfo(shadow, INITIAL_MODE);

    // Listen for more mode changes
    // Listens to: parent event publisher's 'mode'
    // Publishes: shadow 'iconInfo'
    document.addEventListener('mode', (event) => {
      const style = shadow.querySelector('style');
      const rules = Array.from(style.sheet.cssRules);
      const hostRules = rules.find((rule) => rule.selectorText === ':host');
      const currConfig = {
        ...this.config,
        mode: event.detail,
      };
      hostRules.style.borderColor = this.selectBorderColor(currConfig);
      hostRules.style.backgroundColor = this.selectBackgroundColor(currConfig);
      this.dispatchTextInfo(shadow, event.detail);
    });
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: flex;
        cursor: pointer;
        height: 40px;
        width: max-content;
        background-color: ${this.selectBackgroundColor(this.config)};
        border: 1px solid ${this.selectBorderColor(this.config)};
        border-radius: 999px;
        gap: 8px;
      }
    `;
    return style;
  }

  dispatchTextInfo(publisher, mode) {
    publisher.dispatchEvent(
      new CustomEvent('textInfo', {
        bubbles: true,
        composed: true,
        detail: {
          style: this.config.style,
          value: this.getAttribute('btnText'),
          mode: mode,
        },
      })
    );
  }

  selectBorderColor(config) {
    return config?.mode === 'light'
      ? 'var(--light-mode-btn-outline-color)'
      : 'var(--dark-mode-btn-outline-color)';
  }

  selectBackgroundColor(config) {
    if (config?.style === 'outlined') {
      return 'transparent';
    }
    // settings for style 'filled'
    if (config?.mode === 'light') {
      return 'var(--light-mode-btn-bkg-color)';
    }
    return 'var(--dark-mode-btn-bkg-color)';
  }
}

customElements.define('cus-topmost-btn-ctr', TopmostButtonContainerComponent);
