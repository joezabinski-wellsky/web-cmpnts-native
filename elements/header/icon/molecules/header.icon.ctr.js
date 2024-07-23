import HeaderIconStateLayerComponent from './header.icon.state.layer.js';

export default class HeaderIconContainerComponent extends HTMLElement {
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
    const stateLayer = new HeaderIconStateLayerComponent({
      eventPublisher: shadow,
    });

    shadow.appendChild(style);
    shadow.appendChild(stateLayer);

    this.eventPublisher?.addEventListener('mode', (event) => {
      shadow.dispatchEvent(
        new CustomEvent('mode', {
          bubbles: false, // keep the event within the element
          composed: true,
          detail: structuredClone(event.detail),
        })
      );
    });
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: flex;
        height: max-content;
        width: max-content;
        border-radius: 999px;
        gap: 10px;
      }
    `;
    return style;
  }
}

customElements.define('cus-header-icon-ctr', HeaderIconContainerComponent);
