import { INITIAL_MODE } from '../../../../defaults.js';
import LeadingTrailingIconComponent from './molecules/leading.trailing.icon.js';

export default class TopmostIconContainerComponent extends HTMLElement {
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
    const icon = this.eventPublisher
      ? new LeadingTrailingIconComponent({
          eventPublisher: shadow,
        })
      : new LeadingTrailingIconComponent();
    shadow.appendChild(style);
    shadow.appendChild(icon);
    // Dispatch initial light/dark mode
    this.dispatchIconInfo(shadow, INITIAL_MODE);

    // Listen for more mode changes
    // Listens to: parent event publisher's 'mode'
    // Publishes: shadow 'iconInfo'
    this.eventPublisher.addEventListener('mode', (event) =>
      this.dispatchIconInfo(shadow, event.detail)
    );
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        height: 48px;
        width: 32px;
      }
    `;
    return style;
  }

  dispatchIconInfo(publisher, mode) {
    publisher.dispatchEvent(
      new CustomEvent('iconInfo', {
        bubbles: true,
        composed: true,
        detail: {
          position: this.getAttribute('iconPos'),
          mode: mode,
        },
      })
    );
  }
}

customElements.define('cus-topmost-icon-ctr', TopmostIconContainerComponent);
