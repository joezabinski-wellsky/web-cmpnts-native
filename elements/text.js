import { INITIAL_MODE } from '../../../defaults.js';

export const TEXTS = {
  loremIpsum:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  subhead: 'Subhead',
  title: 'Title',
};

// Supporting-text, ng-container-card-0.ng-container-card-header.Subhead, ng-container-vertical-0.Subhead
export class SurfaceTextComponent extends HTMLElement {
  eventPublisher = null;
  textConfig = {
    mode: INITIAL_MODE,
    class: 'mediumText',
    value: TEXTS.loremIpsum,
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
    document.addEventListener('mode', (event) => {
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

customElements.define('cus-text', SurfaceTextComponent);
