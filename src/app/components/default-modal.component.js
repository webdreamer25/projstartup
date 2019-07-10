import { Component } from "../../zense";

const DefaultModalComponent = Object.create(Component);

DefaultModalComponent.create({
  serializeData(data) {
    return data[0];
  },

  addTemplateToDOM(data) {
    let modalBody = this.selector.querySelector('.c-modal__body');

    if (this.shouldRender) {
      modalBody.innerHTML = this.template(data);
    } else {
      // Assumes that if shouldRender is being set to false manually we also dont want the container in the DOM.
      this.selector.remove();
    }
  },

  template(data) {
    return `
      <h2 class="c-modal__heading">${decodeURI(data.header)}</h2>
      <p class="c-modal__subheader">${decodeURI(data.subheader)}</p>
      <p>${decodeURI(data.body1)}</p>
    `;
  }
});

export default DefaultModalComponent;