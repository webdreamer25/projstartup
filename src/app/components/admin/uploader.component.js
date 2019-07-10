import { Component } from "../../../zense";
import UploaderBehavior from "../../behaviors/admin/uploader.behavior";
import NotificationComponent from "./notification.component";

import style from './uploader.component.css';

const UploaderComponent = Object.create(Component);

UploaderComponent.create({
  name: 'image-uploader',

  selector: '#images-uploader-region',

  ui: {
    closeBtn: '.js-close-modal-btn'
  },

  behaviors: [
    UploaderBehavior
  ],

  // setDOMSelector() {
  //   this.selector = this.dom(this.selector);

  //   if (!this.selector.exists) {
  //     this.shouldRender = false;

  //     return false;
  //   }
  // },

  afterRender() {
    this.ui.closeBtn.on('click', this.closeUploader.bind(this));
  },

  closeUploader(e) {
    e.preventDefault();
    let modal = this.dom('#image-uploader');
    let uploader = this.getBehavior('file-uploader-behavior');

    if (modal.exists) {
      modal.classList.add('g-modal--inactive');
    }
    
    setTimeout(() => {
      uploader.reset();
    }, 600);
  },

  template() {
    return `<div id="image-uploader" class="g-modal c-uploader g-modal--inactive">
      <div class="g-modal__content g-modal__content--medium">
        <div class="c-uploader__progress">
          <div class="c-uploader__progress-bar js-progress-bar"></div>
        </div>
        
        <div class="g-modal__header">
          <h2>Upload an Image</h2>
          <button class="g-modal__close-btn js-close-modal-btn" 
            aria-label="modal close button"
            data-modal-parent="#image-uploader">
            <i class="far fa-times"></i>
          </button>
        </div>

        <div class="g-modal__body js-drop-area">
          <form class="c-uploader__droparea">
            <p class="c-uploader__info">Drag and drop one or more files to upload.</p>
            
            <input id="file" 
              class="c-uploader__dropfield js-image-upload-field"
              type="file" 
              accept="image/*" 
              multiple />

            <div class="c-uploader__gallery">
              <div class="c-uploader__gallery-content row js-uploader-gallery"></div>
            </div>
          </form>
          
        </div>

        <div class="g-modal__footer"></div>
      </div>
    </div>`;
  }
});

export default UploaderComponent;