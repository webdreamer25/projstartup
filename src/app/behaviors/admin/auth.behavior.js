import { Behavior } from "../../../zense";
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthBehavior = Object.create(Behavior);

AuthBehavior.config({
  behaviorName: 'authentication',

  ui: {
    form: '#auth-form',
    actionBtn: '.js-action-btn',
    passwordField: '.js-password-field',
    validateField: '.js-validate-field',
    fields: '.js-auth-field'
  },

  defaults: {
    user: {},
    validClass: 'is-valid',
    invalidClass: 'is-invalid',
    formActionMethod: '',
    validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },

  handlers() {
    this.ui.actionBtn.on('click', this.formSubmitAction.bind(this));
    this.ui.validateField.on('keyup', this.validateField.bind(this));
  },

  formSubmitAction(e) {
    e.preventDefault();

    let form = this.defaults;

    form.user = this.createPayloadFromFields();

    firebase.auth()
      [form.formActionMethod](form.user.email, form.user.password)
      .catch(this.errorHandler.bind(this));
  },

  createPayloadFromFields() {
    let payload = {};

    this.ui.fields.each(field => {
      let fieldAttrs = field.attributes;

      for (let key in fieldAttrs) {
        let attr = fieldAttrs[key];

        if (fieldAttrs.hasOwnProperty(key) && attr.name === 'name') {
          payload[attr.value] = field.value;
        }
      }
    });

    return payload;
  },

  errorHandler(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log('some error');

    this.ui.fields.each((field) => {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
    });
  },

  validateField(e) {
    if (this.defaults.validationRegex.test(e.target.value)) {
      e.target.classList.remove(this.defaults.invalidClass);
      e.target.classList.add(this.defaults.validClass);
    } else {
      e.target.classList.remove(this.defaults.validClass);
      e.target.classList.add(this.defaults.invalidClass);
    }
  },

  start() {
    this.handlers();
  }
});

export default AuthBehavior;