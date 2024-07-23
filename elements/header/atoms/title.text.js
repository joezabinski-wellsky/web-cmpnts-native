import { INITIAL_MODE } from '../../../defaults.js';

export const TEXTS = {
  title: 'TEST CARD',
};

// Header
export class TitleTextComponent extends HTMLElement {
  eventPublisher = null;
  textConfig = {
    mode: INITIAL_MODE,
    class: 'mediumTitle',
    value: TEXTS.title,
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
    span.setAttribute('class', this.textConfig.class);
    span.innerText = this.textConfig.value;

    shadow.appendChild(style);
    shadow.appendChild(span);

    // Listen for more mode changes
    // Listens to: parent event publisher's 'mode'
    // Publishes: shadow 'iconInfo'
    this.eventPublisher?.addEventListener('mode', (event) => {
      const style = shadow.querySelector('style');
      const currConfig = {
        ...this.textConfig,
        mode: event.detail,
      };
      style.textContent = `
        :host {
          display: flex;
          span {
            color: ${this.selectColor(currConfig)}
          }
        }
    `;
    });
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
    return config?.mode === 'light'
      ? 'var(--light-mode-surface-fg-color)'
      : 'var(--dark-mode-surface-fg-color)';
  }
}

customElements.define('cus-header-title-text', TitleTextComponent);
