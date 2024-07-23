import { INITIAL_MODE } from '../../../../../defaults.js';

export const threeDotsSVGPath =
  'M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z';

// export const threeDotsSVGPath =
//   'm336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z';

export default class HeaderIconElement extends HTMLElement {
  eventPublisher = null;
  iconConfig = {
    mode: INITIAL_MODE,
    height: '16px',
    path: threeDotsSVGPath,
    width: '4px',
    viewBox: '0 -960 960 960',
  };

  constructor(parentConfig = {}) {
    super();

    if (parentConfig.eventPublisher) {
      this.eventPublisher = parentConfig.eventPublisher;
    }

    if (parentConfig.iconConfigOverrides) {
      this.iconConfig = {
        ...this.iconConfig,
        ...parentConfig.iconConfigOverrides,
      };
    }
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' });
    // reference global styles within the shadow DOM
    this.shadow.adoptedStyleSheets = [...document.adoptedStyleSheets];
    this.shadow.innerHTML = `
      <svg
        fill="${this.selectFill(this.iconConfig)}"
        
        viewBox="${this.iconConfig.viewBox}"
        xmlns="http://www.w3.org/2000/svg" 
      >
        <path d="${this.iconConfig.path}"/>
      </svg>
    `;
    // height="${this.iconConfig.height}"
    //     width="${this.iconConfig.width}"
    // viewBox="${this.iconConfig.viewBox}"
  }

  selectFill(config) {
    return config?.mode === 'light'
      ? 'var(--light-mode-icon-color)'
      : 'var(--dark-mode-icon-color)';
  }

  transformConfigToPath(config) {
    return config?.path === 'cancel' ? cancelSVGPath : searchSVGPath;
  }
}

customElements.define('cus-header-icon-svg', HeaderIconElement);
