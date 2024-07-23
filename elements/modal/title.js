import { SurfaceTextComponent, TEXTS } from '../text.js';
import TitleComponent from './title/atoms/title.js';

// ng-container-vertical-0
export default class TopmostTitleComponent extends HTMLElement {
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
    const title = new TitleComponent();
    const subhead = new SurfaceTextComponent({
      textConfigOverrides: {
        value: TEXTS.subhead,
      },
    });
    shadow.appendChild(style);
    shadow.appendChild(title);
    shadow.appendChild(subhead);
  }

  makeStyle() {
    const style = document.createElement('style');
    style.textContent = `
    :host {
      width: 436px;
    `;
    return style;
  }
}

customElements.define('cus-title', TopmostTitleComponent);
