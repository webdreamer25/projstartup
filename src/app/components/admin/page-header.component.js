import { Component } from "../../../zense";

const PageHeaderComponent = Object.create(Component);

PageHeaderComponent.create({
  name: 'page-header',
  
  selector: '#pheader-region',

  defaults: {
    heading: '',
    subheader: '',
    icon: ''
  },

  serializeData() {
    return this.defaults;
  },

  template(data) {
    return `
      <div class="g-pheader__content row">
        <div class="g-pheader__icon col-auto">
          <i class="far ${this.defaults.icon}"></i>
        </div>
        <div class="col-auto">
          <h1 class="g-pheader__heading">
            ${data.heading}
          </h1>
          <p class="g-pheader__sub">${data.subheader}</p>
        </div>
      </div>
    `;
  }
});

export default PageHeaderComponent;