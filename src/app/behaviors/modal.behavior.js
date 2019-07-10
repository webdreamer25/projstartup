import { Behavior } from "../../zense";

const ModalBehavior = Object.create(Behavior);

ModalBehavior.config({
  behaviorName: 'modal-behavior',
  
  ui: {
    modals: '.c-modal',
    trigger: '.js-modal-toggle',
    closeBtn: '.js-modal-close-btn'
  },

  settings: {
    topOffset: 60,
    content: false,
    disableOverlay: false,
    isOpen: false
  },

  loadedModals: [],

  currentActiveModal: null,

  handlers() {
    this.ui.trigger.on('click', this.open.bind(this));
    this.ui.closeBtn.on('click', this.close.bind(this));
  },

  setup() {
    let windowSize = window.outerWidth;

    if (windowSize < 600) {
      this.settings.topOffset = 0;
    }

    if (windowSize > 600) {
      this.settings.topOffset = 60;
    }
  },

  checkModalIsLoaded(id) {
    let loaded = false;

    if (this.loadedModals.length === 0) {
      return false;
    }

    loaded = this.loadedModals.some(modalId => modalId === id);

    return loaded;
  },

  open(e) {
    e.preventDefault();
    let trigger = e.currentTarget;
    let id = trigger.dataset.modalTarget;
    let modalType = trigger.dataset.modalType;
    let componentName = trigger.dataset.component;
    let targetModal = this.dom(trigger.dataset.modalTarget);
    // let loader = targetModal.find('.c-modal__loader');

    targetModal.classList.add('c-modal--active');

    setTimeout(() => {
      targetModal.find('.c-modal__content').style.top = this.settings.topOffset + 'px';
    }, 200);

    this.currentActiveModal = targetModal;

    if (!this.checkModalIsLoaded(id)) {
      this.module.database
        .child(window.config.lang)
        .child('modals')
        .once('value', snap => {
        
        let modalList = snap.child(componentName).val();

        import(
          /* webpackIgnore: false */ 
          '../components/' + modalType + '-modal.component'
        ).then(component => {
          component.default.selector = id;
          component.default.store = modalList.filter((modal) => modal.id === id.slice(1));
          component.default.render();

          this.loadedModals.push(id);
        });
      });
    }

    document.body.classList.add('no-scroll');

    this.settings.isOpen = true;
  },

  close(e) {
    if (e) { e.preventDefault() }
    
    if (this.settings.isOpen) {
      this.currentActiveModal.find('.c-modal__content').style.cssText = '';

      setTimeout(() => {
        this.currentActiveModal.classList.remove('c-modal--active');
        this.currentActiveModal = null;
      }, 300);
      
      this.settings.isOpen = false;

      document.body.classList.remove('no-scroll');

      if (this.settings.disableOverlay) { return false; }
    }
  },

  start() {
    // Need to reset array when we nav away from where it has been composed called.
    this.loadedModals = [];

    this.setup();
    this.handlers();
  }
});

export default ModalBehavior;