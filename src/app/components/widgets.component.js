import { Component } from "../../zense";

const WidgetsComponent = Object.create(Component);

WidgetsComponent.create({
  name: 'widgets',
  selector: '#widgets-region',

  serializeData() {
    if (this.module.store.widgets.length === 1) {
      this.shouldRender = false;
    }
    
    return this.module.store.widgets;
  },

  shouldAnimate(widget) {
    if (widget.animation.type !== '') {
      return 'not-animated';
    }

    return '';
  },

  template(widgets) {
    return `
      ${widgets.map((widget) => {

        if (!widget.isNew) {
          return `<div class="widget2 ${this.shouldAnimate(widget)}" 
            data-animate="${widget.animation.type}" 
            data-animate-delay="${widget.animation.delay}">
        
            <div class="title">${widget.title}</div>
            <div class="content">
              <h4>${widget.subject}</h4>
              <p>${decodeURI(widget.description)} <a href="${widget.link.url}">${widget.link.text}</a></p>
            </div>
            
          </div>`;
        }
      
      }).join('')}
    `;
  }
});

export default WidgetsComponent;