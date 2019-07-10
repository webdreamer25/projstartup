import { Module } from "../../zense";
import ModalBehavior from '../behaviors/modal.behavior';

import style from './modal.module.css';

const ModalModule = Object.create(Module);

ModalModule.create({
  name: 'generic-modal',
  renderType: 'html',
  selector: '.c-modal',
  behaviors: [
    ModalBehavior
  ],

  afterRender() {
    this.database = this.composite.database;
  },

  template() {
    return `
      <div class="c-modal__content">
        <button class="c-modal__close-btn close-btn animated-btn js-modal-close-btn">
          <span></span>
          <span></span>
        </button>
        
        <div class="c-modal__body">
          <div class="c-modal__loader row justify-content-center">
            <div class="col-auto">
              <div class="primary-loader">
                <div class="plc-1 primary-loader-circle"></div>
                <div class="plc-2 primary-loader-circle"></div>
                <div class="plc-3 primary-loader-circle"></div>
                <div class="plc-4 primary-loader-circle"></div>
                <div class="plc-5 primary-loader-circle"></div>
                <div class="plc-6 primary-loader-circle"></div>
                <div class="plc-7 primary-loader-circle"></div>
                <div class="plc-8 primary-loader-circle"></div>
                <div class="plc-9 primary-loader-circle"></div>
                <div class="plc-10 primary-loader-circle"></div>
                <div class="plc-11 primary-loader-circle"></div>
                <div class="plc-12 primary-loader-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

export default ModalModule;