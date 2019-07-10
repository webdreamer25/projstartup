import { Component } from "../../../zense";
import DropDownBehavior from "../../behaviors/dropdown.behavior";
import firebase from 'firebase/app';
import 'firebase/auth';

import style from './navigation.component.css';

const NavigationComponent = Object.create(Component);

NavigationComponent.create({
  selector: '#navigation-region',

  behaviors: [
    { 
      name: DropDownBehavior, 
      options: { 
        ui: {
          btn: '.js-dropdown-toggle'
        }
      } 
    } 
  ],

  serializeData() {
    return this.module.store.core.header.mail;
  },

  afterRender() {
    this.dom('.js-logout-btn').on('click', (e) => {
      e.preventDefault();
      firebase.auth().signOut();
    })
  },

  setCount(category) {
    return category ? category : 0;
  },
  
  getUserInfo() {
    return JSON.parse(sessionStorage.getItem('user'));
  },

  template(mail) {
    return `
      <nav class="c-nav">
        <div class="c-nav--row row justify-content-end">
          <div class="c-nav--col col-auto">
            <a href="#dashboard" class="c-nav__btn js-navigate-to">
              <i class="far fa-home-alt"></i>
            </a>
          </div>
          <div class="c-nav--col col-auto">
            <button class="c-nav__btn js-dropdown-toggle">
              <i class="far fa-envelope"></i>
            </button>

            <div class="g-dropdown g-dropdown--toptriangle g-dropdown--collapsed js-dropdown">
              <ul>
                <li>
                  <a href="#mail" class="g-dropdown__btn js-navigate-to">
                    Inbox <span class="mail-menu-count">${ this.setCount(mail.inboxedCount) }</span>
                  </a>
                </li>
                <li>
                  <a href="#mail" class="g-dropdown__btn js-navigate-to">
                    Archived <span class="mail-menu-count">${ this.setCount(mail.archivedCount) }</span>
                  </a>
                </li>
                <li>
                  <a href="#mail" class="g-dropdown__btn js-navigate-to">
                    Deleted <span class="mail-menu-count">${ this.setCount(mail.archivedCount) }</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="c-nav--col col-auto">
            <button class="c-nav__account c-nav__btn js-dropdown-toggle" aria-expanded="false">
              <span class="c-nav__account--avatar">
                <i class="far fa-user-circle"></i>
              </span>
              <span class="c-nav__account-label">My Account</span>
              <i class="c-nav__chevron c-nav__chevron--down far fa-chevron-down"></i>
            </button>

            <div class="g-dropdown g-dropdown--medium g-dropdown--toptriangle g-dropdown--collapsed js-dropdown">
              <ul>
                <li class="g-dropdown__option">
                  <i class="g-dropdown__icon far fa-user"></i>
                  <span class="g-dropdown__info">${ this.getUserInfo().email }</span>
                </li>
                <li>
                  <a href="#login" class="g-dropdown__btn js-logout-btn">
                    <i class="g-dropdown__icon far fa-power-off"></i>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
});

export default NavigationComponent;