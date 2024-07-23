import IconElement from '../atoms/icon.js';

export default class IconContainerComponent extends HTMLElement {
  eventPublisher = null;
  currIcon = null;

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
    this.eventPublisher?.addEventListener('iconInfo', (event) => {
      const icon = new IconElement({
        eventPublisher: this.eventPublisher,
        iconConfigOverrides: {
          path: this.selectPath(event.detail.position),
          mode: event.detail.mode,
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
    style.textContent = ':host { height: 24px; width: 24px; }';
    return style;
  }

  selectPath(iconPos) {
    return iconPos === 'leading' ? 'search' : 'cancel';
  }
}

customElements.define('cus-icon-ctr', IconContainerComponent);
