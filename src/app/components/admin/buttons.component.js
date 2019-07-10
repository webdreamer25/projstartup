import { Component } from "../../../zense";
import CrudBehavior from "../../behaviors/admin/crud.behavior";
import DialogBehavior from "../../behaviors/admin/dialog.behavior";

const ButtonsComponent = Object.create(Component);

ButtonsComponent.create({
  name: 'editor form buttons',

  selector: '#buttons-region',

  behaviors: [
    DialogBehavior,
    CrudBehavior
  ],

  setRoute() {
    if (window.lastRoute) {
      return window.lastRoute;
    } else {
      return '#' + this.appSettings.routes.edit;
    }
  },

  beforeRender() {
    this.appSettings = JSON.parse(sessionStorage.appSettings);
    this.componentId = this.appSettings.componentId;

    if (this.componentId === 0) {
      this.preventBehaviorStart = 'save-component-behavior';
    } else {
      this.preventBehaviorStart = '';
    }
  },

  template() {
    let tpl = '';
    
    if (this.componentId === 0) {
      tpl = `<div class="col-auto">
        <button class="g-btn g-btn--brand g-btn--small js-trigger-dialog"
          data-dialog-id="publish-dialog"
          data-dialog-title="Are you sure?"
          data-dialog-body="You are about to publish a new component. Please check that all field are correct."
          data-dialog-action-txt="Confirm"
          data-dialog-action-class="js-form-submit"
          data-dialog-action-method="publish"
          disabled>
          Publish
        </button>
      </div>
      <div class="col-auto">
        <a href="${this.setRoute()}" 
          class="g-btn g-btn--dark g-btn--small js-cancel-component">
          Cancel
        </a>
      </div>`;
    } else {
      tpl = `<div class="col-auto">
        <button class="g-btn g-btn--brand g-btn--small js-form-submit" 
          data-method="update"
          disabled>
          Save
        </button>
      </div>`;
    }

    return tpl;
  }
});

export default ButtonsComponent;