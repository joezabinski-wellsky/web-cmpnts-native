// ng-container-vertical-1
export default class TextFieldContainerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.makeStyle();
    const tags = ['cus-text-field', 'cus-text-field', 'cus-text-field'];
    const textFields = tags.map((tag) => document.createElement(tag));

    shadow.appendChild(style);
    textFields.forEach((textField) => shadow.appendChild(textField));
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
        display: grid;
        grid-gap: 16px;
        grid-template-columns: 1fr 1fr;
      }
    `;
    return style;
  }
}

customElements.define('cus-text-field-ctr', TextFieldContainerComponent);
