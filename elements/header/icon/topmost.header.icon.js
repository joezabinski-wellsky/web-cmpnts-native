import HeaderIconContainerComponent from './molecules/header.icon.ctr.js';

export default class TopmostHeaderIconComponent extends HTMLElement {
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
    const headerIconCtr = new HeaderIconContainerComponent({
      eventPublisher: shadow,
    });

    shadow.appendChild(style);
    shadow.appendChild(headerIconCtr);

    this.eventPublisher?.addEventListener('mode', (event) => {
      shadow.dispatchEvent(
        new CustomEvent('mode', {
          bubbles: false, // keep the event within the text field
          composed: true,
          detail: structuredClone(event.detail),
        })
      );
    });
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContext = `
      :host {
        height: 48px;
        width: 48px;
      }
    `;
    return style;
  }
}

customElements.define('cus-header-icon', TopmostHeaderIconComponent);
