import { INITIAL_MODE } from '../../../../../defaults.js';
import HeaderIconElement from '../atoms/icon.js';

export default class HeaderIconSkinComponent extends HTMLElement {
  currIcon = null;
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
    const icon = new HeaderIconElement({
      iconConfigOverrides: {
        mode: INITIAL_MODE,
      },
    });
    this.currIcon = icon;
    shadow.appendChild(style);
    shadow.appendChild(icon);

    this.eventPublisher?.addEventListener('mode', (event) => {
      const icon = new HeaderIconElement({
        iconConfigOverrides: {
          mode: event.detail,
        },
      });
      if (this.currIcon !== null) {
        shadow.removeChild(this.currIcon);
      }
      this.currIcon = icon;
      shadow.appendChild(icon);
    });
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        height: 24px;
        width: 24px;
      }
    `;
    return style;
  }
}

customElements.define('cus-header-icon-skin', HeaderIconSkinComponent);
