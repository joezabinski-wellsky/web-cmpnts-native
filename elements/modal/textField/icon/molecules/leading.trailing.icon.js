import StateLayerContainerComponent from './state.layer.container.js';

export default class LeadingTrailingIconComponent extends HTMLElement {
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
    const stateLayerCtr =
      this.eventPublisher !== null
        ? new StateLayerContainerComponent({
            eventPublisher: this.eventPublisher,
          })
        : new StateLayerContainerComponent();
    shadow.appendChild(style);
    shadow.appendChild(stateLayerCtr);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: flex;
        height: 48px;
        width: 48px;
        gap: 10px;
      }
    `;
    return style;
  }
}

customElements.define('cus-trailing-icon', LeadingTrailingIconComponent);
