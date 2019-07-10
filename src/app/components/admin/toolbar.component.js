import { Component } from "../../../zense";

import style from './toolbar.component.css';

const ToolbarComponent = Object.create(Component);

ToolbarComponent.create({
  name: 'toolbar',

  selector: '#toolbar-region',

  ui: {
    addBtn: '.js-add-component-btn',
    addModalBtn: '.js-add-lightbox-btn',
    saveDraftBtn: '.js-save-draft-btn'
  },

  beforeRender() {
    this.totalComponents = this.module.settings.info.totalComponents;
  },

  handlers() {
    if (this.ui.addBtn.exists) {
      this.ui.addBtn.on('click', (e) => {
        e.preventDefault();
        let hash = window.location.hash;
        let route = '#' + this.module.settings.routes.edit;

        // Prevents route from firing again.
        if (route.indexOf('new') === -1) {
          route = route.slice(0, -1) + 'new';
        } else {
          return false;
        }

        window.lastRoute = hash;
        
        window.location.hash = route;
      });
    }
  },

  afterRender() {
    this.handlers();
  },

  template() {
    let tpl = '';
    let isNew = this.module.settings.routes.edit.indexOf('new') > -1;
    
    tpl += `<ul class="c-toolbar">`;

    if (Array.isArray(this.module.store) && this.totalComponents > 0 && !isNew) {
      tpl += `<li class="c-toolbar__item">
          <button class="c-toolbar__btn js-add-component-btn">
            <i class="c-toolbar__icon far fa-layer-plus"></i>
          </button>

          <span class="c-toolbar__tooltip">Add a component</span>
        </li>`;
    }

    tpl += `<li class="c-toolbar__item">
        <button class="c-toolbar__btn js-add-lightbox-btn">
          <i class="c-toolbar__icon far fa-box"></i>
        </button>
        
        <span class="c-toolbar__tooltip">Add a lightbox</span>
      </li>

      <li class="c-toolbar__item">
        <button class="c-toolbar__btn js-sync-btn">
          <i class="c-toolbar__icon far fa-sync-alt"></i>
        </button>

        <span class="c-toolbar__tooltip">Sync component data</span>
      </li>

      <li class="c-toolbar__item">
        <button class="c-toolbar__btn js-save-draft-btn">
          <i class="c-toolbar__icon far fa-save"></i>
        </button>
        
        <span class="c-toolbar__tooltip">Save draft</span>
      </li>`;

    if (Array.isArray(this.module.store) && this.totalComponents > 0 && !isNew) {
      tpl += `<li class="c-toolbar__item">
        <button class="c-toolbar__btn js-trigger-dialog"
          data-dialog-id="delete-dialog"
          data-dialog-title="Delete component"
          data-dialog-body="Please confirm that you would like to delete the component."
          data-dialog-action-txt="Confirm Delete"
          data-dialog-action-class="js-form-submit"
          data-dialog-action-method="delete">
          <i class="c-toolbar__icon far fa-trash-alt"></i>
        </button>
        
        <span class="c-toolbar__tooltip">Delete component</span>
      </li>`;
    }

    tpl += `</ul>`;

    return tpl;
  }
});

export default ToolbarComponent;