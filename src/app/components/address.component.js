import { Component } from "../../zense/index";

import style from './address.component.css';

const AddressComponent = Object.create(Component);

AddressComponent.create({
  selector: '#widget-address-region',

  serializeData() {
    return this.module.store.footer.widget1;
  },  

  template(widget) {
    return `
      <h5>${widget.name}</h5>
      <ul class="c-address">
        ${widget.content.map(item=> {
          return `
            <li class="c-address__line">
              <span class="c-address__info">${item.name}:</span> ${item.value}
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }
});

export default AddressComponent;