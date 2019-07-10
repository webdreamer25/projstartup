import { Component } from "../../../zense";

import style from './loader.component.css';

const LoaderComponent = Object.create(Component);

LoaderComponent.create({
  name: 'global-loader',

  renderType: 'append',

  selector: '[data-loader]',

  setDOMSelector() {
    this.selector = this.dom(this.selector);

    if (!this.selector.exists) {
      this.shouldRender = false;
    } else {
      this.shouldRender = true;
    }
  },

  reset() {
    this.hasRendered = false;
  },

  fadeOut() {
    this.dom('.c-loader').classList.add('c-loader--fadeout');
  },

  template() {
    return `<div class="c-loader">
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
    </div>`;
  }
});

export default LoaderComponent;