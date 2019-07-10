import { Module } from "../../zense";
import ProgressiveImgLoaderBehavior from "../behaviors/progressive-img.behavior";

import style from './jumbotron.module.css';

const JumbotronModule = Object.create(Module);

JumbotronModule.create({
  name: 'jumbotron',
  selector: '#jumbotron-region',
  behaviors: [
    ProgressiveImgLoaderBehavior
  ],

  serializeData() {
    return this.store.jumbotron;
  },

  template(jumbotron) {
    return `
      <figure class="c-jumbotron progressive-img" data-large="${decodeURI(jumbotron.image.src)}">
        <img class="progressive-img-small" 
          src="${decodeURI(jumbotron.image.small)}" 
          alt="${decodeURI(jumbotron.alt)}" />
        <div class="c-jumbotron__spacer"></div>
        <h2 class="c-jumbotron__caption">${jumbotron.heading}</h2>
      </figure>
    `;
  }
});

export default JumbotronModule;