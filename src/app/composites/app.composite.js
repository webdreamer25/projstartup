import { Composite } from '../../zense/index';

import HeaderModule from '../modules/header.module';
import FooterModule from '../modules/footer.module';
import ScrollTopComponent from '../components/scrolltop.component';

const AppComposite = Object.create(Composite);

AppComposite.create({
  store: {},
  selector: '#app',
  modules: [
    HeaderModule,
    FooterModule
  ],

  components: [
    ScrollTopComponent
  ],

  template() {
    return `
      <header id="header-region" class="c-header">
      </header>
      
      <main id="main-region">
      </main>
      
      <footer id="footer-region" class="c-footer">
      </footer>
    `;
  }
});

export default AppComposite;