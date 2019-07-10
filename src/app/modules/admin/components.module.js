import { Module } from "../../../zense";
import PageHeaderComponent from "../../components/admin/page-header.component";
import BreadcrumbComponent from "../../components/admin/breadcrumb.component";

import style from './components.module.css';

const ComponentsModule = Object.create(Module);

ComponentsModule.create({
  name: 'component-selector',

  selector: '#main-region',

  renderType: 'html',

  components: [
    { 
      name: PageHeaderComponent, 
      options: {
        defaults: {
          icon: 'fa-th',
          heading: 'Component Selector',
          subheader: 'Please click on the component you would like to edit.'
        }
      } 
    }, 
    BreadcrumbComponent
  ],

  serializeData(data) {
    data = data.filter((store) => store.name === this.settings.page)[0].components;
    return data;
  },

  setRoutingURL(component) {
    let url = '#' + component.name + '/edit/';

    if (component.count === 0) {
      url += 'new';
    } else {
      url += '1';
    }

    return url;
  },

  template(components) {
    return `
      <header class="g-pheader">
        <div class="container">
          <div class="row">
            <div id="pheader-region" class="col-md-7">
            </div>
            <div id="config-region" class="col-md-5">
            </div>
          </div>
        </div>
      </header>
      
      <section class="container">
        <div class="row">
          <div id="breadcrumb-region" class="col-md-8"></div>
          <div id="toolbar-region" class="col-md-4"></div>
        </div>
      </section>

      <div class="m-components-selector container">
        <div class="row">
          ${ components.map((component) => {
            let icon = 'fa-cube';

            if (component.count === 0) {
              icon = 'fa-plus';
            }

            return `<div class="col-auto">
              <a href="${ this.setRoutingURL(component) }" class="g-card g-card--sm m-components-selector__card">
                <div class="m-components-selector__icon">
                  <i class="far ${icon}"></i>
                </div>

                <div class="m-components-selector__card-text">
                  ${ component.name }
                </div>
              </a>
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  }
});

export default ComponentsModule;