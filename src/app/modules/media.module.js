import { Module } from "../../zense";

import style from './media.module.css';

const MediaModule = Object.create(Module);

MediaModule.create({
  name: 'media',
  selector: '#media-region',
  renderType: 'html',

  serializeData() {
    return this.store.rtes;
  },

  shouldAnimate(animation) {
    if (animation.type !== '') {
      return 'not-animated';
    }

    return 'animate';
  },

  addModalClass(rte) {
    if (rte.button.modal) {
      return 'js-modal-toggle';
    }

    return '';
  },

  template(rtes) {
    return `
      <div class="container">
      ${rtes.map((rte) => {
        if (!rte.isNew) {
          return `<div class="c-media">
            <div class="row">
              <div class="col-md-6 c-media__object ${this.shouldAnimate(rte.animation.lhs)}" 
                data-animate="${rte.animation.lhs.type}" 
                data-animate-delay="${rte.animation.lhs.delay}">

                <a href="${rte.image.url}" class="c-media__image-cta">
                  <img src="${decodeURI(rte.image.src)}" 
                    class="c-media__image img-responsive" 
                    alt="${decodeURI(rte.image.alt)}" />
                  <div class="c-media__caption">${rte.image.caption}</div>
                </a>

              </div>
          
              <div class="c-media__body col-md-6">
                <div class="c-media__content ${this.shouldAnimate(rte.animation.rhs)}" 
                  data-animate="${rte.animation.rhs.type}" 
                  data-animate-delay="${rte.animation.rhs.delay}">

                  <h4 class="c-media__title">${rte.title}</h4>
                  <p>${decodeURI(rte.body)}</p>

                  <a class="c-media__cta btn-link text-uppercase ${this.addModalClass(rte)}" 
                    href="#!" 
                    data-modal-target="${'#' + rte.button.url}"
                    data-modal-type="${rte.modal}"
                    data-component="rtes">
                    ${rte.button.text} <i class="fa fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          
            ${rte.button.modal ? 
              `<div id="${rte.button.url}" class="c-modal c-modal--backdrop"></div>` 
              : ''
            }
          </div>`;
        }
      }).join('')}
      </div>
    `;
  }
});

export default MediaModule;