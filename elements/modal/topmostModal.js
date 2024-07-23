// ng-container-modal
export default class TopmostModalComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const title = document.createElement('cus-title');
    const textFields = document.createElement('cus-text-field-ctr');
    const text = document.createElement('cus-text');
    const buttons = document.createElement('cus-buttons');
    shadow.appendChild(style);
    shadow.appendChild(title);
    shadow.appendChild(textFields);
    shadow.appendChild(text);
    shadow.appendChild(buttons);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
      display: flex;
      flex-direction: column;
      width: 468px;
      padding: 16px;
      gap: 28px;
    `;
    return style;
  }
}

customElements.define('cus-modal', TopmostModalComponent);
