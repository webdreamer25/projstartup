import { Component } from '../../zense/index';

import style from './logo.component.css';

const LogoComponent = Object.create(Component);

LogoComponent.create({
  name: 'header-logo',
  selector: '#logo-region',

  serializeData() {
    return this.store.logo;
  },

  template(logo) {
    return `
      <a href="${logo.url}" class="c-logo pull-left">
        <img src="${logo.src}" class="c-logo__media img-responsive" alt="${logo.alt}" />
      </a>
    `;
  }
});

export default LogoComponent;