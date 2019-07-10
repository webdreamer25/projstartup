import { Module } from "../../../zense";
import NavigationComponent from "../../components/admin/navigation.component";

import style from './header.module.css';

const HeaderModule = Object.create(Module);

HeaderModule.create({
  name: 'header',
  
  selector: '#header-region',

  components: [
    NavigationComponent
  ],

  template() {
    return `
      <div class="container">
        <div class="row">
          <div class="col-auto">
            <span class="m-header__brand">
              {{ Admin }}
            </span>
          </div>
        
          <div id="navigation-region" class="col">
          </div>
        </div>
      </div>
    `;
  }
});

export default HeaderModule;