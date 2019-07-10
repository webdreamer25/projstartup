import { Component } from "../../../zense";

import style from './breadcrumb.component.css';

const BreadcrumbComponent = Object.create(Component);

BreadcrumbComponent.create({
  name: 'breadcrumb',

  selector: '#breadcrumb-region',

  populate() {
    let tpl = '';
    let breadData = this.module.settings.routes;

    for (let key in breadData) {
      if (breadData.hasOwnProperty(key) && key !== 'length') {
        let breadUrl = breadData[key];
        let hash = window.location.hash;
        let bread = breadData[key].split('/').join(' ');
        let id = hash.split('/')[2];

        tpl += `<li class="c-breadcrumb__item col-auto">`;

        if (id === 'new' && bread.indexOf('edit') > -1) { 
          tpl += `Add New`;
        } else if (breadUrl !== hash.replace('#', '')) {
          tpl += `<a href="${'#' + breadUrl}">${bread}</a>`;
        } else {
          tpl += `${this.handleWordPlurality(bread)}`;
        }

        tpl += `</li>`;
        tpl += `<li class="c-breadcrumb__spacer col-auto">
          <i class="far fa-chevron-right"></i></li>`;
      }
    }

    return tpl;
  },

  handleWordPlurality(word) {
    let strArray = word.split(' ');
    
    word = strArray[0];

    strArray.shift();

    if (word.endsWith('s') && word !== 'ministries') {
      word = word.slice(0, -1);
    } else {
      word = word === 'ministries' ? 'ministry' : word;
    }

    return word + ' ' + strArray[1];
  },

  template() {
    return `<ul class="c-breadcrumb row">
      ${this.populate()}
    </ul>`;
  }
});

export default BreadcrumbComponent;