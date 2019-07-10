import { Component } from "../../zense";

import style from './event.component.css';

const EventComponent = Object.create(Component);

EventComponent.create({
  name: 'event',
  selector: '#events-region',
  renderType: 'append',

  serializeData() {
    return this.sortByRecent(this.composite.store.events);
  },

  sortByRecent(arr) {
    // delete the default data template
    if (arr[0].isNew) {
      arr.shift();
    }

    // Sorts by most recent event
    return arr.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  },

  shouldAnimate(animation) {
    if (animation.type !== '') {
      return 'not-animated';
    }

    return '';
  },

  determineBreakpointImageHide(idx) {
    let hideAt = 'sm';

    if (idx > 0) {
      if (idx === 2) {
        hideAt = 'md';
      }

      return 'hidden-' + hideAt;
    } else {
      return '';
    }
  },

  template(events) {
    return `
      ${events.map((event, idx) => {
        return `<section class="c-event section">
          <div id="${'event-' + (idx + 1)}" class="c-event__content container">
            
            <h4 class="c-event__title ${this.shouldAnimate(event.animation)}" 
                data-animate="${event.animation.type}" 
                data-animate-delay="${event.animation.delay}">
              <span class="c-event__type">${event.type}</span>
              <div class="c-event__name">${event.title}</div>
              <div class="c-event__date">${event.startDate} ${event.startTime} ${event.startMeridian} - ${event.endDate} ${event.endTime} ${event.endMeridian}</div>
            </h4>
          
            <div class="row clearfix">
          
              ${event.images.map((image, imageIdx) => {
                return `<div class="c-event__image col-md-4 col-sm-6 ${this.determineBreakpointImageHide(imageIdx)} ${this.shouldAnimate(event.animation)}" 
                    data-animate="${event.animation.type}" 
                    data-animate-delay="${event.animation.delay}">
                  <img src="${decodeURI(image.src)}" class="img-responsive" alt="${decodeURI(image.alt)}" />
                </div>`;
              }).join('')}
          
            </div>
          
            <div class="c-event__body not-animated" data-animate="fadeInRight">
              ${decodeURI(event.body)}
            </div>
          </div>
        </section>`;
      }).join('')}
    `;
  }
});

export default EventComponent;