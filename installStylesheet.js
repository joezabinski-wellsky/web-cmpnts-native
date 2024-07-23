const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :root {
    --dark-mode-icon-color: #CAC4D0;
    --dark-mode-text-color: #DED8E1;
    --dark-mode-text-accent: #CAC4D0;
    --dark-mode-textfield-color: #36343B;
    --dark-mode-btn-label-color-outlined: #FFFFFF;
    --dark-mode-btn-label-color-filled: #25323D;
    --dark-mode-btn-outline-color: #79747E;
    --dark-mode-btn-bkg-color: #BAC8D6;
    --dark-mode-surface-fg-color: #CAC4D0;
    --dark-mode-surface-bg-color: #141218; 
    --light-mode-icon-color: #5f6368;
    --light-mode-text-color: #1D1B20;
    --light-mode-text-accent: #49454F;
    --light-mode-textfield-color: #E6E0E9;
    --light-mode-btn-label-color-outlined: #52606C;
    --light-mode-btn-label-color-filled: #FFFFFF;
    --light-mode-btn-outline-color: #938F99;
    --light-mode-btn-bkg-color: #52606C;
    --light-mode-surface-fg-color: #49454F;
    --light-mode-surface-bg-color: #FFFFFF;  
  }

  .largeText {
    font-family: Roboto;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.5px;
    line-height: 24px;
  }

  .mediumText {
    font-family: Roboto;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 20px;
  }

  .smallText {
    font-family: Roboto;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }

  .largeLabel {
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.1px;
    line-height: 20px;
  }

  .mediumTitle {
    font-family: Roboto;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.15px;
    line-height: 24px;
  }

`);

document.adoptedStyleSheets = [sheet];
