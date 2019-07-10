import { Module } from '../../zense/index';

import LogoComponent from '../components/logo.component';
import NavComponent from '../components/nav.component';

import style from './header.module.css';

const HeaderModule = Object.create(Module);

HeaderModule.create({
  name: 'header',
  selector: '#header-region',

  components: [
    LogoComponent,
    NavComponent
  ],

  handleAPIUse() {
    this.addComponents(this.store.header);
  },

  template() {
    return `
      <div class="container">
        <div class="row">
          <div id="logo-region" class="col-4"></div>
          <div id="nav-region" class="col-8"></div>
        </div>
      </div>
    `;
  }
});

export default HeaderModule;