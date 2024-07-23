export const searchSVGPath =
  'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z';

export const cancelSVGPath =
  'm336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z';

export default class IconElement extends HTMLElement {
  eventPublisher = null;
  iconConfig = {
    mode: 'light',
    height: '24px',
    path: cancelSVGPath,
    width: '24px',
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
        height="${this.iconConfig.height}"
        viewBox="${this.iconConfig.viewBox}"
        width="${this.iconConfig.width}"
        xmlns="http://www.w3.org/2000/svg" 
      >
        <path d="${this.transformConfigToPath(this.iconConfig)}"/>
      </svg>
    `;
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

customElements.define('cus-icon', IconElement);
