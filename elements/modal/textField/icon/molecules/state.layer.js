import IconContainerComponent from './icon.ctr.js';

export default class StateLayerComponent extends HTMLElement {
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
    const iconCtr =
      this.eventPublisher !== null
        ? new IconContainerComponent({
            eventPublisher: this.eventPublisher,
          })
        : new IconContainerComponent();
    shadow.appendChild(style);
    shadow.appendChild(iconCtr);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: flex;
        height: max-content;
        width: max-content;
        padding: 8px;
        gap: 10px;
      }
    `;
    return style;
  }
}

customElements.define('cus-state-layer', StateLayerComponent);
