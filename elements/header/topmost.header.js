import TopmostHeaderIconComponent from './icon/topmost.header.icon.js';
import TitleContainerComponent from './molecules/title.ctr.js';

// ng-container-card-header
export default class TopmostHeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const titleCtr = new TitleContainerComponent({ eventPublisher: shadow });
    const icon = new TopmostHeaderIconComponent({ eventPublisher: shadow });

    shadow.appendChild(style);
    shadow.appendChild(titleCtr);
    shadow.appendChild(icon);

    // Listen for mode changes on the document: inform inner elements
    // Listens to: document 'mode'
    // Publishes: shadow 'mode'
    document.addEventListener('mode', (event) => {
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
    style.textContent = `
      :host {
        display: flex;
        height: 72px;
        width: 468px;
        padding: 12px 4px 12px 16px;
      }
    `;
    return style;
  }
}

customElements.define('cus-header', TopmostHeaderComponent);
