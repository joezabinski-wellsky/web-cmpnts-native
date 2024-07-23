import TopmostIconContainerComponent from './icon/topmost.icon.ctr.js';
import ContentComponent from './content/content.js';
import { INITIAL_MODE } from '../../../defaults.js';

// ng-container-vertical-1.Text field
export default class TextFieldComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const leadingIcon = new TopmostIconContainerComponent({
      eventPublisher: shadow,
    });
    leadingIcon.setAttribute('iconPos', 'leading');
    const input = new ContentComponent({
      eventPublisher: shadow,
    });
    const trailingIcon = new TopmostIconContainerComponent({
      eventPublisher: shadow,
    });
    trailingIcon.setAttribute('iconPos', 'trailing');

    shadow.appendChild(style);
    shadow.appendChild(leadingIcon);
    shadow.appendChild(input);
    shadow.appendChild(trailingIcon);

    // Listen for mode changes on the document: inform inner elements
    // Listens to: document 'mode'
    // Publishes: shadow 'mode'
    document.addEventListener('mode', (event) => {
      const style = shadow.querySelector('style');
      const rules = Array.from(style.sheet.cssRules);
      const hostRules = rules.find((rule) => rule.selectorText === ':host');
      hostRules.style.backgroundColor =
        event.detail === 'light'
          ? 'var(--light-mode-textfield-color)'
          : 'var(--dark-mode-textfield-color)';
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
    const color =
      INITIAL_MODE === 'light'
        ? 'var(--light-mode-textfield-color)'
        : 'var(--dark-mode-textfield-color)';
    style.textContent = `
    :host {
        display: flex;
        background-color: ${color};
        height: 56px;
        width: 210px;
        border-radius: 4px 4px 0px 0px;
      }
    `;
    return style;
  }
}

customElements.define('cus-text-field', TextFieldComponent);
