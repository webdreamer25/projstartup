import { Module } from "../../zense/index";
import ProgressiveImgLoaderBehavior from "../behaviors/progressive-img.behavior";

const SplashModule = Object.create(Module);

SplashModule.create({
  selector: '#splash-region',
  defaults: {
    spacerClass: 'splash-spacer'
  },
  behaviors: [
    ProgressiveImgLoaderBehavior
  ],

  serializeData() {
    return this.store.splash;
  },

  showCaption(heading) {
    if (heading === '') {
      return '';
    }

    return `
      <h1 class="splash-caption">
        ${heading}
      </h1>
    `;
  },

  template(data) {
    return `
      <figure class="splash progressive-img" data-large="${decodeURI(data.image.src)}">
        <img src="https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20" class="progressive-img-small" />
        <div class="${this.defaults.spacerClass}"></div>
        ${this.showCaption(data.heading)}
      </figure>
    `;
  }
});

export default SplashModule;