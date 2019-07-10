import { Behavior } from "../../../zense";

const ValidationBehavior = Object.create(Behavior);

ValidationBehavior.config({
  behaviorName: 'validation',

  ui: {
    form: '.g-form',
    fields: '.js-field'
  }, 

  defaults: {
    validClass: 'is-invalid',
    errorClass: 'validation-error-label',
    errorText: 'data-errorLabel'
  },

  handlers() {
    this.ui.fields.on('blur', this.validateForm.bind(this));
  },

  initialize() {
    this.ui.fields.each((field) => {
      let errorBlock = document.createElement('div');

      errorBlock.classList = this.defaults.errorClass;

      if (field.hasAttribute(this.defaults.errorText)) {
        errorBlock.innerHTML = field.getAttribute(this.defaults.errorText);
        field.insertAdjacentHTML('afterend', errorBlock);
      }
    });
  },

  validateForm(e) {
    e.preventDefault();

    let invalidFields = [];

    this.ui.form.find('[required]').each((field) => {
      if (field.val() === '') {
        invalidFields.push(field.name);

        field.classList.add(this.defaults.validClass);
        field.sibling.style.display = 'block';
      } else {
        field.classList.remove(this.defaults.validClass);
        field.sibling.style.display = 'none';
      }
    });
  },

  start() {
    this.initialize();
    this.handlers();
  }
});

export default ValidationBehavior;