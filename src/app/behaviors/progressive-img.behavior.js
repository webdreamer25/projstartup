import { Behavior } from "../../zense";

import style from './progressive-img.behavior.css';

const ProgressiveImgLoaderBehavior = Object.create(Behavior);

ProgressiveImgLoaderBehavior.config({
  behaviorName: 'progressive-image-loader',

  ui: {
    container: '.progressive-img',
    imageSmall: '.progressive-img-small'
  },

  handleSmallImageLoad(e) {
    e.target.classList.add('progressive-img-loaded');
  },

  handleLargeImageLoad(e) {
    e.target.classList.add('progressive-img-loaded');

    this.ui.imageSmall.classList.remove('progressive-img-loaded');
  },

  progressiveImageLoading() {
    let imgLarge = new Image();

    this.ui.imageSmall.onload = this.handleSmallImageLoad.bind(this);

    imgLarge.src = this.ui.container.dataset.large;
    imgLarge.onload = this.handleLargeImageLoad.bind(this);

    this.ui.container.appendChild(imgLarge);
  },

  start() {
    this.handlers();
    this.progressiveImageLoading();
  }
});

export default ProgressiveImgLoaderBehavior;