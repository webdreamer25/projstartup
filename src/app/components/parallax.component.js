import { Component } from "../../zense";

import style from './parallax.component.css';

const Parallax = Object.create(Component);

Parallax.create({
  name: 'parallax',
  selector: '.parallax-region',

  serializeData(data) {
    return data.parallax;
  },

  addTemplateToDOM(data) {
    this.selector.each((el, idx) => {
      let tpl = this.template(data[idx+1]);
    
      el.html(tpl);
    });
  },

  template(parallax) {
    return `
      <div class="c-parallax">
        <div class="c-parallax__background inside-shadow clearfix" 
          style="background-image:url(${decodeURI(parallax.image.src)})" 
          aria-hidden="true">
            
          <div class="c-parallax__content c-parallax--${parallax.image.size} not-animated" data-animate="fadeIn">
            <div class="c-parallax__caption not-animated" data-animate="bounceIn">
              ${parallax.caption}
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

export default Parallax;