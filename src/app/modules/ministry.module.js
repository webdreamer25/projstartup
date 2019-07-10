import { Module } from "../../zense/index";

import style from './ministry.module.css';

const MinistryModule = Object.create(Module);

MinistryModule.create({
  selector: '#ministries-region',
  renderType: 'append',

  serializeData() {
    return this.store.ministries;
  },

  shouldAnimate(animation) {
    if (animation.type !== '') {
      return 'not-animated';
    }

    return 'animate';
  },

  setColOrder(index) {
    if (index % 2 === 0) {
      return ' order-md-1';
    }

    return '';
  },

  template(ministries) {
    return `
      ${ministries.map((ministry, idx) => {
        if (!ministry.isNew) {
          return `
            <section class="c-ministry section">
              <a id="${ministry.type}"></a>
              <div class="c-ministry__content container">
                <div class="row">
                
                  <div class="col-md-6 ${this.shouldAnimate(ministry.animation.lhs)}${this.setColOrder(idx)}" 
                    data-animate="${ministry.animation.lhs.type}" 
                    data-animate-delay="${ministry.animation.lhs.delay}">

                    <img src="${decodeURI(ministry.image.src)}" 
                      class="c-ministry__image img-responsive" 
                      alt="${decodeURI(ministry.image.alt)}" />
                  </div>
              
                  <div class="c-ministry__content col-md-6 ${this.shouldAnimate(ministry.animation.rhs)}" 
                      data-animate="${ministry.animation.rhs.type}" 
                      data-animate-delay="${ministry.animation.rhs.delay}">
      
                    <h4 class="c-ministry__title">
                      <span class="c-ministry__type">${ministry.type}</span>
                      ${ministry.title}
                    </h4>
                    ${decodeURI(ministry.body)}
                  </div>
  
                </div>
              </div>
            </section>
          `;
        }
      }).join('')}
    `;
  }
});

export default MinistryModule;