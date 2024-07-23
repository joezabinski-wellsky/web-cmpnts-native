import { TEXT_VALUES } from './button/atoms/text.js';
import TopmostButtonContainerComponent from './button/topmost.btn.ctr.js';

// ng-container-r-.5
export default class ButtonContainerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const cancelButton = new TopmostButtonContainerComponent();
    cancelButton.setAttribute('btnText', TEXT_VALUES.cancel);
    const saveButton = new TopmostButtonContainerComponent();
    saveButton.setAttribute('btnText', TEXT_VALUES.save);
    saveButton.setAttribute('style', 'filled');
    shadow.appendChild(style);
    shadow.appendChild(cancelButton);
    shadow.appendChild(saveButton);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: flex;
        justify-content: end;
        width: 436px;
        gap: 8px;
      }
    `;
    return style;
  }
}

customElements.define('cus-buttons', ButtonContainerComponent);
