import { Behavior } from "../../../zense";

const ModalBehavior = Object.create(Behavior);

ModalBehavior.config({
  behaviorName: 'admin-modal',

  ui: {
    trigger: '.js-open-modal-btn',
    closeBtn: '.js-close-modal-btn'
  },

  prevSelectorId: '',

  handlers() {
    if (this.ui.trigger.exists) {
      this.ui.trigger.on('click', this.openModal.bind(this));
      this.ui.closeBtn.on('click', this.closeModal.bind(this));
    }
  },

  openModal(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    let selectedImage = btn.dataset.selectedImage;
    let selectorId = btn.dataset.selectorId;
    let target = btn.dataset.modalTarget;

    if (selectedImage && (this.prevSelectorId === '' || this.prevSelectorId !== selectorId)) {
      this.prevSelectorId = selectorId;

      this.component.selectorId = selectorId;
      this.component.defaultImage = selectedImage;

      this.component.renderImages();
    }

    setTimeout(() => {
      this.dom(target).classList.remove('g-modal--inactive');
    }, 200);
  },

  closeModal(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    let parent = btn.dataset.modalParent;

    this.dom(parent).classList.add('g-modal--inactive');
  },

  start() {
    this.handlers();
  }
});

export default ModalBehavior;