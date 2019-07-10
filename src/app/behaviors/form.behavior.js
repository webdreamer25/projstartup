import { Behavior } from "../../zense";
import firebase from 'firebase/app';
import 'firebase/database';

const FormBehavior = Object.create(Behavior);

FormBehavior.config({
  behaviorName: 'contact-form',

  ui: {
    form: '#contact-form',
    submitBtn: '.js-submit-btn',
    status: '.js-form-status'
  },

  initialize() {
    let database = firebase.database();

    this.inboxRef = database.ref('mail/inbox');
    this.mailCountRef = database.ref('app/core/header/mail');
  },

  handlers() {
    this.ui.submitBtn.on('click', this.submitForm.bind(this));
  },

  formatDate(date) {
    let day = date.getDate();
    let monthIdx = date.getMonth();
    let year = date.getFullYear();
    let months = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];
  
    return months[monthIdx] + ', ' + day  + ' ' + year;
  },

  formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let meridian = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + meridian;
  },

  submitForm(e) {
    e.preventDefault();
    
    let fields = this.ui.form.find('.js-field');
    let statusContainer = this.ui.form.find('.js-form-status');
    let payload = this.createPayloadFromFields(fields);

    if (this.validateForm(this.ui.form)) {
      let statusClass = '';
      let currDate = new Date();

      payload['created'] = currDate.getTime();
      payload['date'] = this.formatDate(currDate);
      payload['time'] = this.formatTime(currDate);

      // Updates the total mail count that currently exists in inbox
      this.mailCountRef.once('value', snap => {
        let mailCounters = {};
        let newMailCount = snap.child('newCount').val();
        let inboxedCount = snap.child('inboxedCount').val();

        newMailCount = newMailCount ? newMailCount : 0;
        inboxedCount = inboxedCount ? inboxedCount : 0;

        mailCounters['newCount'] = newMailCount + 1;
        mailCounters['inboxedCount'] = inboxedCount + 1;

        this.mailCountRef.set(mailCounters);
      });

      // Creates the new mail data
      this.inboxRef.push(payload)
        .then(() => {
          statusClass = 'is-valid';

          // this.ui.form.find('.is-invalid').classList.remove('is-invalid');

          statusContainer.classList.add(statusClass);
          statusContainer.html('Prayer was sent!')

          setTimeout(() => {
            e.target.setAttribute('disabled', false);
          })
        })
        .catch(error => {
          statusClass = 'is-invalid';

          fields.each(field => {
            field.classList.add(statusClass);
          });

          statusContainer.classList.add(statusClass);
          statusContainer.html('Error: ' + error);
          e.target.setAttribute('disabled', false);
        });

      setTimeout(() => {
        fields.each(field => {
          field.val('');
        });

        statusContainer.style.display = 'none';
        statusContainer.classList.remove(statusClass);
      }, 2200);
    } else {
      statusContainer.classList.add('is-invalid');
      statusContainer.html('Please fill required fields.');
    }
  },

  createPayloadFromFields(fields) {
    let payload = {};

    fields.each(field => {
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

  validateForm(form) {
    let isValid = false;
    let requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (field.value !== '') {
        isValid = true;
      } else {
        field.classList.add('is-invalid');
        isValid = false;
      }
    });

    return isValid;
  },

  start() {
    this.initialize();
    this.handlers();
  }
});

export default FormBehavior;