import StateLayerComponent from './state.layer.js';

export default class StateLayerContainerComponent extends HTMLElement {
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
    const stateLayer =
      this.eventPublisher !== null
        ? new StateLayerComponent({
            eventPublisher: this.eventPublisher,
          })
        : new StateLayerComponent();
    shadow.appendChild(style);
    shadow.appendChild(stateLayer);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: flex;
        /* Circular radius */
        border-radius: 999px;
        height: max-content;
        width: max-content;
      }
    `;
    return style;
  }
}

customElements.define('cus-state-layer-ctr', StateLayerContainerComponent);
