import { Component } from "../../zense/index";
import FormBehavior from "../behaviors/form.behavior";

import style from './contact-form.component.css';

const ContactFormComponent = Object.create(Component);

ContactFormComponent.create({
  selector: '#contact-form-region',
  behaviors: [
    FormBehavior
  ],

  serializeData() {
    return this.module.store.footer.widget2;
  },

  template(widget) {
    return `
      <h5>${widget.name}</h5>
      <div class="c-contactform">
        <p class="c-contactform__info">*required</p>
        <form id="contact-form" name="form-prayer">
          ${widget.form.map(field => {
            switch (field.type) {
              case 'textarea':
                return `
                  <textarea id="${field.id}" 
                    class="c-contactform__textarea js-field"
                    name="${field.name}" 
                    placeholder="${field.placeholder}"
                    required></textarea>
                `;
              default: 
                return `
                  <input id="${field.id}"
                    class="c-contactform__input-text js-field"
                    type="${field.type}"
                    name="${field.name}" 
                    placeholder="${field.placeholder}"
                    required />
                `;
            }
          }).join('')}

          <div class="row justify-content-end">
            <div class="col-auto">
              <span class="c-contactform__status js-form-status"></span>
              <button class="c-contactform__send-btn js-submit-btn">
                ${widget.btnText}
              </button>
            </div>
          </div>
        </form>
      </div>
    `;
  }
});

export default ContactFormComponent;