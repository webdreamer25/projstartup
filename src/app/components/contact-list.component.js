import { Component } from "../../zense";

import style from './contact-list.component.css';

const ContactListComponent = Object.create(Component);

ContactListComponent.create({
  selector: '#contacts-region',
  renderType: 'append',

  serializeData() {
    return this.composite.store.contacts;
  },

  shouldAnimate(animation) {
    if (animation.type !== '') {
      return 'not-animated';
    }

    return '';
  },

  template(contacts) {
    return `
      <div class="container">
        <div class="row">
          ${contacts.map(contact => {
            if (!contact.isNew) {
              return `<div class="col-md-6">
                <div class="c-contact">
                  <div class="c-contact__media ${this.shouldAnimate(contact.animation)}" 
                    data-animate="${contact.animation.lhs.type}" 
                    data-animate-delay="${contact.animation.lhs.delay}">

                    <img class="c-contact__image img-responsive" 
                      src="${decodeURI(contact.image.src)}" 
                      alt="${decodeURI(contact.image.alt)}"
                      data-template="image" />

                  </div>
      
                  <div class="c-contact__body ${this.shouldAnimate(contact.animation)}" 
                    data-animate="${contact.animation.rhs.type}" 
                    data-animate-delay="${contact.animation.rhs.delay}">

                    <h2>
                      <span class="c-contact__title">${contact.title}</span>${contact.name}
                    </h2>
                    <span class="c-contact__phone">
                      <i class="fa fa-phone"></i>
                      ${contact.phone}
                    </span>
                    <span class="c-contact__email">
                      <i class="fa fa-envelope"></i>
                      <a href="mailto:${contact.email}">${contact.email}</a>
                    </span>
                    <p>${decodeURI(contact.bio)}</p>

                  </div>
                </div>
              </div>`;
            }
          }).join('')}
        </div>
      </div>
    `;
  }
});

export default ContactListComponent;