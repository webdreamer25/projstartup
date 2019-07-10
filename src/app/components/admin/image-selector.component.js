import { Component } from "../../../zense";
import ModalBehavior from "../../behaviors/admin/modal.behavior";
import ImageSelectorBehavior from "../../behaviors/admin/image-selector.behavior";

import style from './image-selector.component.css';

const ImageSelectorComponent = Object.create(Component);

ImageSelectorComponent.create({
  name: 'image-selector',

  selector: '#image-selector-region',

  defaultImage: '',
  selectorId: '',
  // selectorPrevId: '',
  selectorComponent: {},
  selectedImage: {},
  isDefault: true,
  isImageListCreated: false,

  behaviors: [
    ModalBehavior 
  ],

  setImageToken(url) {
    url = new URL(url);

    return url.searchParams.get('token');
  },

  renderImages() {
    let imagesContainer = this.dom('.js-images-container');
    let imagesSelector = this.selectorComponent[this.selectorId];

    this.selectedImage = ImageSelectorBehavior.selectedImage;

    if (typeof ImageSelectorBehavior.isDefault !== 'undefined') {
      this.isDefault = ImageSelectorBehavior.isDefault;
    }

    imagesContainer.html('');

    this.each(imagesSelector, (image, imageIdx) => {
      let tpl = '';
      let isImageSelected = false;
      let target = '#images-' + this.selectorId + '-src';

      if (this.selectedImage !== undefined && Object.keys(this.selectedImage).length > 0) {
        isImageSelected = this.selectedImage[this.selectorId] === image.token;
      } else {
        isImageSelected = this.defaultImage === image.token;
      }

      tpl = `<div class="c-img-selector__card col-md-4">
        <div class="c-img-selector__image">
          <img src="${decodeURI(image.filePath)}" class="img-responsive" />
        </div>
        
        <div class="c-img-selector__footer ${isImageSelected ? 'is-selected' : ''}">
          <input id="${'image-' + imageIdx}" 
            type="radio" 
            name="${image.name}" 
            class="c-img-selector__radio js-image-selector-radio"
            data-image-id="${imageIdx}"
            data-image-path="${image.filePath}"
            data-image-target="${target + 'Img'}"
            data-field-target="${target}"
            data-selector-id="${this.selectorId}"
            ${isImageSelected ? 'checked' : ''} />

          <label for="${'image-' + imageIdx}">
            ${image.name}
          </label>
        </div>
      </div>`;

      imagesContainer.insertHTML('beforeend', tpl);
    });

    this.isImageListCreated = false;

    ImageSelectorBehavior.start();
  },

  transformImagesData() {
    let prevId = '';
    let imagesData = this.module.imagesData;

    if (this.isImageListCreated) { return false; }

    if (!imagesData || imagesData && imagesData.length === 0) {
      imagesData = [];
    }
    
    // Creates the images selector data based on idea to maintain selected
    for (let i = 0; i < imagesData.length; i++) {
      if (prevId === '' || prevId !== '' && prevId !== i) {
        this.selectorComponent[i] = [];
      }

      this.each(imagesData, (image) => {
        let selectorImagesObj = {
          filePath: image.filePath,
          name: image.name,
          token: this.setImageToken(image.filePath)
        };

        this.selectorComponent[i].push(selectorImagesObj);
      });
    }

    this.isImageListCreated = true;
  },

  beforeRender() {
    this.transformImagesData();
  },

  afterRender() {
    this.renderImages();
  },

  template() {
    return `<div id="image-selector" class="g-modal g-modal--inactive">
      <div class="g-modal__content g-modal__content--large">
        <div class="g-modal__header">
          <h2>Select an image</h2>
          <button class="g-modal__close-btn js-close-modal-btn" 
            aria-label="modal close button"
            data-modal-parent="#image-selector">
            <i class="far fa-times"></i>
          </button>
        </div>

        <div class="g-modal__body c-img-selector__body">
          <div class="c-img-selector__container">
            <div class="form-row js-images-container"></div>
          </div>
        </div>

        <div class="g-modal__footer">
        </div>
      </div>
    </div>`;
  }
});

export default ImageSelectorComponent;