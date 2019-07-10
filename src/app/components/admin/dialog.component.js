import { Component } from "../../../zense";

import style from './dialog.component.css';

const DialogComponent = Object.create(Component);

DialogComponent.create({
  name: 'dialog',

  renderType: 'append',
  renderMultiple: true,

  selector: '#dialog-region',
  
  defaults: {
    id: '0001',
    title: 'Some title',
    body: 'I am some dialog body text that explains what I do.',
    actionTxt: 'Continue',
    actionMethod: false
  },

  determineActionClass() {
    if (this.defaults.actionClass) {
      return this.defaults.actionClass;
    }

    return '';
  },

  afterRender() {
    let dialog = this.dom('#' + this.defaults.id);
    let dialogContent = dialog.find('.c-dialog__content');
    let actionBtn = dialog.find('.js-action-btn');

    dialogContent.style.cssText = 'margin-top: -' + (dialogContent.offsetHeight / 2) + 'px';

    if (this.defaults.notification === 'true') {
      actionBtn.attr('data-notification', true);
      actionBtn.attr('data-notification-message', this.defaults.notificationMessage);
    }

    dialog.find('.js-close-btn').on('click', (e) => {
      e.preventDefault();
      let target = e.currentTarget.dataset.target;

      this.dom(target).classList.remove('c-dialog--active');
    });
  },

  template() {
    return `<div id="${this.defaults.id}" class="c-dialog">
      <div class="c-dialog__content">
        <h2 class="c-dialog__title">${this.defaults.title}</h2>
        <div class="c-dialog__body">${this.defaults.body}</div>
        <div class="c-dialog__buttons">
          <button class="g-btn g-btn--brand g-btn--small js-close-btn js-action-btn ${this.determineActionClass()}" 
            data-target="#${this.defaults.id}"
            data-method="${this.defaults.actionMethod}">
            ${this.defaults.actionTxt}
          </button>
          <button class="g-btn g-btn--dark g-btn--small js-close-btn" 
            data-target="#${this.defaults.id}">
            Go Back
          </button>
        </div>
      </div>
    </div>`;
  }
});

export default DialogComponent;