import { SurfaceTextComponent, TEXTS } from '../../text.js';
import { TitleTextComponent } from '../atoms/title.text.js';

// ng-container-vertical-.25
export default class TitleContainerComponent extends HTMLElement {
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
    const title = new TitleTextComponent({ eventPublisher: shadow });
    const subtitle = new SurfaceTextComponent({
      eventPublisher: shadow,
      textConfigOverrides: {
        value: TEXTS.subhead,
      },
    });
    shadow.appendChild(style);
    shadow.appendChild(title);
    shadow.appendChild(subtitle);

    // Listen for mode changes on the document: inform inner elements
    // Listens to: document 'mode'
    // Publishes: shadow 'mode'
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
    style.textContent = `
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 400px;
        gap: 4px;
      }
    `;
    return style;
  }
}

customElements.define('cus-header-title-ctr', TitleContainerComponent);
