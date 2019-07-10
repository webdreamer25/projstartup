import { Component } from "../../zense";
import DropDownBehavior from "../behaviors/dropdown.behavior";

import style from './nav.component.css';

const NavComponent = Object.create(Component);

NavComponent.create({
  name: 'main-navigation',
  selector: '#nav-region',
  behaviors: [
    DropDownBehavior
  ],  

  serializeData() {
    return this.store.navigation;
  },

  afterRender() {
    // this.dom('.js-nav-link').on('click', (e) => {
    //   e.preventDefault()

    //   window.location.href
    // });
  },  

  template(links) {
    return `
      <div class="c-navigation">
        <button id="navigation-menu-btn" 
          class="c-navigation__mobile-btn js-dropdown-toggle" 
          data-target="#navigation-menu"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="navigation-menu"
          aria-label="Open mobile navigation">

          <i class="c-navigation__mobile-icon" aria-hidden="true"></i>
        </button>

        <nav id="navigation-menu" 
          class="c-dropdown g-dropdown--collapsed js-dropdown"
          role="menu"
          aria-labelledby="navigation-menu-btn">
          <ul>
          ${links.map((link) => {
            return `
              <li role="none">
                <a href="${'#' + link.url}" 
                  role="menuitem" 
                  class="c-navigation__link js-nav-link">
                  ${link.linkText}
                </a>
              </li>
            `;
          }).join('')}
          </ul>
        </nav>
      </div>
    `;
  }
});

export default NavComponent;