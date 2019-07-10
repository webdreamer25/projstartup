import { Module } from "../../../zense";
import PageHeaderComponent from "../../components/admin/page-header.component";

import style from './dashboard.module.css';

const DashboardModule = Object.create(Module);

DashboardModule.create({
  name: 'dashboard',
  
  selector: '#main-region',

  renderType: 'html',

  components: [
    { 
      name: PageHeaderComponent,
      options: {
        defaults: {
          icon: 'fa-tachometer-alt-slow',
          heading: 'Dashboard',
          subheader: 'Put your mouse over a page and select the language for editing.'
        }
      }
    }
  ],

  afterRender() {
    this.dom('.js-page-lang-selector').on('click', (e) => {
      let page = e.target.dataset.page;
      let language = e.target.dataset.language;

      sessionStorage.setItem('temp', JSON.stringify({ page, language }));

      window.location.hash = '#' + page + '/' + language + '/components';
    });
  },

  template(app) {
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

      <div class="m-dashboard container">
        <h2 class="m-dashboard__heading">:: Core ::</h2>

        <ul class="m-dashboard__container">
          ${ Object.keys(app.core).map((key) => {
            return `<li>
              <div class="m-dashboard__selector">
                <div class="g-card g-card--sm">
                  <div class="m-dashboard__icon m-dashboard__icon--core"> 
                    <i class="far fa-cubes"></i>
                  </div>
                  
                  <div class="m-dashboard__selector-lang">
                    <div class="m-dashboard--row">
                      <button class="m-dashboard__btn js-core-lang-selector"
                        data-coreComponent="${ key }" 
                        data-language="en">
                        English
                      </button>
                      <button class="m-dashboard__btn js-core-lang-selector"
                        data-coreComponent="${ key }" 
                        data-language="es">
                        Spanish
                      </button>
                    </div>
                  </div>
                </div>
                <span class="m-dashboard__card-text">${ key }</span>
              </div>
            </li>`;
          }).join('')}
        </ul>

        <h2 class="m-dashboard__heading">:: Pages ::</h2>

        <ul class="m-dashboard__container">
          ${ app.pages.map((page) => { 
            return `<li>
              <div class="m-dashboard__selector">
                <div class="g-card g-card--md">
                  <div class="m-dashboard__icon m-dashboard__icon--page">
                    <i class="far ${ page.icon }"></i>
                  </div>
        
                  <div class="m-dashboard__selector-lang">
                    <div class="m-dashboard--row">
                      <button class="m-dashboard__btn js-page-lang-selector"
                        data-page="${ page.name }" 
                        data-language="en">
                        English
                      </button>
                      <button class="m-dashboard__btn js-page-lang-selector"
                        data-page="${ page.name }" 
                        data-language="es">
                        Spanish
                      </button>
                    </div>
                  </div>
                </div>
                <span class="m-dashboard__card-text">${ page.name }</span>
              </div>
            </li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }
});

export default DashboardModule;