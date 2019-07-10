import { Component } from "../../zense";

import style from './articles.component.css';

const ArticlesComponent = Object.create(Component);

ArticlesComponent.create({
  name: 'articles',
  selector: '#articles-region',

  serializeData() {
    let store = this.module.store;

    if (store.articles && store.articles.length === 1 || typeof store.articles === 'undefined') {
      this.shouldRender = false;
      return false;
    }

    return store.articles;
  },  

  template(articles) {
    return `
      <h2>Anouncements</h2>
      <ul class="news not-animated" 
        data-animate="fadeInLeft" 
        data-animate-delay="100">
        
      ${articles.map((article) => {  
        if (!article.isNew) {
          return `<li class="c-article">
            <div class="c-article__title">${article.title}</div>
            <div class="c-article__content">
                <span class="c-article__author">
                  <span class="fa fa-long-arrow-right"></span>
                  ${article.date} &mdash; ${article.author}
                </span>
        
                <span class="c-article__day">
                  <span class="c-article__day-num">
                    ${article.date.split(' ')[1].replace(/,\s*$/, "")}
                  </span>
                </span>
                <div class="c-article__info">${decodeURI(article.body)}</div>
            </div>
          </li>`
        }
      
      }).join('')}
      </ul>
    `;
  }
});

export default ArticlesComponent;