import { Module } from "../../zense";

import style from './callouts.module.css';

const CalloutsModule = Object.create(Module);

CalloutsModule.create({
  name: 'callouts',
  selector: '#callouts-region',
  renderType: 'html',

  serializeData() {
    return this.store.callouts;
  },  

  hasModal(callout) {
    if (callout.button.modal) {
      return 'js-modal-toggle';
    }

    return '';
  },

  template(callouts) {
    return `
      <div class="container">
        <div class="row">
          ${callouts.map((callout) => {
            if (!callout.isNew) {
              return `<div class="c-callout c-callout--horizontal col-md-4 not-animated" 
                data-animate="${callout.animation.type}" 
                data-animate-delay="${callout.animation.delay}">

                <div class="c-callout__content">
                  <div class="c-callout__image">
                    <h4 class="c-callout__image-title">${callout.caption}</h4>
                    <img src="${decodeURI(callout.image.src)}" 
                          class="img-responsive" 
                          alt="${decodeURI(callout.image.alt)}" />
                  </div>
            
                  <div class="c-callout__body">
                    <h5>${callout.content.title}</h5>
                    <p>${decodeURI(callout.content.body)}</p>

                    <a class="c-callout__btn btn btn-primary ${this.hasModal(callout)}"
                      href="#!"
                      data-modal-target="${'#' + callout.button.url}"
                      data-modal-type="${callout.modal}"
                      data-component="callouts">
                      ${callout.button.text}
                    </a>

                    ${callout.button.modal ? 
                      `<div id="${callout.button.url}" class="c-modal c-modal--backdrop"></div>` 
                      : ''
                    }
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

export default CalloutsModule;