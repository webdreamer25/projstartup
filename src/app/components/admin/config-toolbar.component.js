import { Component } from "../../../zense";
import DropDownBehavior from "../../behaviors/dropdown.behavior";
import UtilityBehavior from "../../behaviors/admin/utility.behavior";

import style from './config-toolbar.component.css';

const ConfigToolbarComponent = Object.create(Component);

ConfigToolbarComponent.create({
  name: 'config toolbar',

  selector: '#config-region',

  ui: {
    uploadBtn: '.js-toggle-image-upload-modal'
  },

  behaviors: [
    { 
      name: DropDownBehavior, 
      options: {
        ui: {
          btn: '.js-config-toolbar-dropdown-toggle'
        }
      }
    },
    UtilityBehavior
  ],

  serializeData() {
    let allConfig = this.module.settings.componentsConfig;

    return allConfig.components.find((component) => {
      return component.name === this.module.settings.component;
    });
  },

  afterRender() {
    if (this.ui.uploadBtn.exists) {
      this.ui.uploadBtn.on('click', (e) => {
        e.preventDefault();
        let modal = this.dom('#image-uploader');

        if (modal.exists) {
          modal.classList.remove('g-modal--inactive');
        }
      });
    }
  },

  createComponentDropdown() {
    let tpl = '';
    let dataIsArray = false;
    let totalComponents = 0;

    this.store = this.module.store;

    dataIsArray = this.module.settings.dataIsArray;
    totalComponents = this.module.settings.info.totalComponents;

    if (totalComponents > 1 || dataIsArray && totalComponents === 1) {
      tpl = `<div class="c-config-toolbar__dropdown">
        <button class="c-config-toolbar__btn js-config-toolbar-dropdown-toggle">
          <i class="c-config-toolbar__icon far fa-ballot-check"></i>
          <span class="c-config-toolbar__text">${this.setComponentListLabel()}</span>
        </button>
        <div class="g-dropdown g-dropdown--collapsed js-dropdown">
          <ul>
            ${this.createComponentOptionList()}
          </ul>
        </div>
      </div>`;

      this.shouldSetBehaviors = true;
    } else {
      this.shouldSetBehaviors = false;
    }

    return tpl;
  },

  setComponentListLabel() {
    let component = this.module.settings.component;

    component = component.charAt(0).toUpperCase() + component.slice(1);

    if (component.endsWith('s') && component !== 'Ministries') {
      component = component.slice(0, -1);
    } else {
      component = component === 'Ministries' ? 'ministry' : component;
    }

    return 'Select ' + component;
  },

  createComponentOptionList() {
    let i = 0;
    let optionsTpl = ''; 
    let total = this.module.settings.info.totalComponents;
    
    do {
      let componentId = (i + 1);
      let component = this.store[componentId];
      let route = this.module.settings.routes.edit.split('/');

      route.splice(-1,1);

      route = '#' + route.join('/') + '/';

      if (component.title) {
        component = component.title;
      } else if (component.content && component.content.title) {
        component = component.content.title;
      } else {
        component = false;
      }

      if (!component) {
        component = this.module.settings.component + ' ' + componentId;
      }

      route = route + componentId;
      
      optionsTpl += `<li>
        <a href="${route}" class="g-dropdown__btn ${this.setActiveOption(route)}">
          ${component}
        </a>
      </li>`;

      i++;
    } while (i < total);

    return optionsTpl;
  },

  determineChecked(checked) {
    if (checked) {
      return 'checked';
    }

    return '';
  },

  createConfigurationsMenu(config) {
    let tpl = '';

    if (config) {
      for (let key in config) {
        let type = typeof config[key];

        if (key === 'name' || key === 'configIdx') { continue; }

        tpl += `<li class="form-row align-items-center">
          <strong class="c-config-toolbar__label col-auto">${key}:</strong>`;

        switch(type) {
          case 'boolean':
            tpl += `<div class="c-config-toolbar__value col js-toggle-btn">
              <input id="${key}" 
                type="checkbox" 
                name="${key}" 
                class="c-config-toolbar__cb js-checkbox-switch" ${this.determineChecked(config[key])} />
              <label for="${key}" class="c-config-toolbar__toggle"></label>
            </div>`;
            break;
          default:
            tpl += `<div class="c-config-toolbar__value col">${config[key]}</div>`;
        }

        tpl += `</li>`;
      }

      this.shouldSetBehaviors = true;
    } else {
      this.shouldSetBehaviors = false;
    }

    return tpl;
  },

  setActiveOption(route) {
    if (window.location.hash === route) {
      return 'active';
    }

    return '';
  },

  template(config) {
    return `
      <div class="c-config-toolbar">
        <nav class="c-config-toolbar__content row">
          ${this.createComponentDropdown()}
          
          ${ config.uploadImages ?
            `<button class="c-config-toolbar__btn js-toggle-image-upload-modal">
              <i class="c-config-toolbar__icon far fa-upload"></i>
              <span class="c-config-toolbar__text">Upload Image</span>
            </button>` : ''
          }

          <div class="c-config-toolbar__dropdown">
            <button class="c-config-toolbar__btn js-config-toolbar-dropdown-toggle">
              <i class="c-config-toolbar__icon far fa-cog"></i>
              <span class="c-config-toolbar__text">Configure</span>
            </button>

            <div class="g-dropdown g-dropdown--collapsed js-dropdown">
              <ul class="c-config-toolbar__config">
                ${this.createConfigurationsMenu(config)}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    `;
  }
});

export default ConfigToolbarComponent;