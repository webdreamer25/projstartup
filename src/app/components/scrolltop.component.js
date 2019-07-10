import { Component } from "../../zense";

import style from './scrolltop.component.css';

const ScrollTop = Object.create(Component);

ScrollTop.create({
  name: 'scroll-to-top',
  selector: '#app',

  afterRender() {
    this.dom('.js-scroll-to-top').on('click', this.scrollToTop);

    window.addEventListener('scroll', function () {
      let scrollToBtn = document.querySelector('.js-scroll-to-top');

      if (window.pageYOffset > 300) {
        scrollToBtn.classList.add('fade-in');
      } else {
        scrollToBtn.classList.remove('fade-in');
      }
    });
  },

  scrollToTop(e) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },

  template() {
    return `
      <div class="c-scrollup js-scroll-to-top">
        <span class="fa fa-chevron-up"></span>
      </div>
    `;
  }
});

export default ScrollTop;