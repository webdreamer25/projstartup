import { Component } from "../../zense";

const SimpleWidgetComponent = Object.create(Component);

SimpleWidgetComponent.create({
  name: 'simple-widget',
  selector: '#widgets-region',
  renderType: 'append',

  serializeData(data) {
    if (data.widgets.length === 1) {
      this.shouldRender = false;
    }
    
    return data.widgets;
  },

  template(widgets) {
    return `
      <div class="container">
        <div class="row clearfix">
          ${widgets.map(widget => {
          
            if (!widget.isNew) {
              return `<div class="col-sm-4 text-center">
                <i class="fa fa-map-marker"></i>
                <h3>${widget.title}</h3>
                <p>${widget.content}</p>
              </div>`;
            }
            
          }).join('')}
        </div>
      </div>
    `;
  }
});

export default SimpleWidgetComponent;