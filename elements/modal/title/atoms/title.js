import { SurfaceTextComponent } from '../../../text.js';

// Supporting-text // ng-container-vertical-0.Title
export default class TitleComponent extends SurfaceTextComponent {
  constructor(parentConfig = {}) {
    super(parentConfig);
    this.textConfig.class = 'largeText';
    this.textConfig.value = 'Title';
  }

  selectColor(config) {
    return config?.mode === 'light'
      ? 'var(--light-mode-text-color)'
      : 'var(--dark-mode-text-color)';
  }
}

customElements.define('cus-title-text', TitleComponent);
