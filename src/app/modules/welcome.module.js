import { Module } from "../../zense";

import style from './welcome.module.css';

const WelcomeModule = Object.create(Module);

WelcomeModule.create({
  name: 'welcome',
  selector: '#welcome-region',

  serializeData() {
    return this.store.welcome;
  },  

  shouldRenderAuthor(author) {
    if (author !== '') {
      return `<span class="welcome-msg-author">${author}</span>`;
    }

    return '';
  },

  template(welcome) {
    return `
      <div class="c-welcome container animated fadeInUp" 
        data-animate-delay="600">
        <h2 class="c-welcome__heading page-header-1">
          <span class="c-welcome__title">${welcome.title}</span>
        </h2>
        
        <div class="c-welcome__body">
          ${decodeURI(welcome.body)}
        </div>
        
        ${this.shouldRenderAuthor(welcome.author)}
      </div>
    `;
  }
});

export default WelcomeModule;