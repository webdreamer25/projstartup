import { Behavior } from "../../zense";

const DropDownBehavior = Object.create(Behavior);

DropDownBehavior.config({
  behaviorName: 'dropdown',

  ui: {
    btn: '.js-dropdown-toggle'
  },

  activeClass: 'g-dropdown--collapsed',
  currentActiveContainer: '',
  currentActiveDropdown: '',
  currentBtn: '',

  setHandlers() {
    let onClickOutside = (e) => {
      let elem = this.currentActiveContainer;
      
      if (elem && !elem.contains(e.target)) { 
        if (!!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )) {
            this.close(onClickOutside);
        }
      }
    };

    this.ui.btn.on('click', (e) => {
      let btn = this.dom(e.currentTarget);
      let container = this.dom(btn.parentNode);
      let isOpen = btn.attr('aria-expanded');

      this.currentBtn = btn;
      this.currentActiveContainer = container;
      this.currentActiveDropdown = container.find('.js-dropdown');

      if (isOpen === 'true') {
        this.close(onClickOutside);
      } else {
        this.open(onClickOutside);
      }
    });
  },

  open(callback) {
    this.currentBtn.attr('aria-expanded', true);
    
    this.currentActiveDropdown.classList.remove(this.activeClass);

    this.dom(document).on('click', callback);
  },

  close(callback) {
    this.currentBtn.attr('aria-expanded', false);
    this.currentActiveDropdown.classList.add(this.activeClass);

    this.dom(document).on('click', callback);
  },                                                                                                  

  start() {
    this.currentBtn = '';
    this.currentActiveContainer = '';
    this.currentActiveDropdown = '';

    this.setHandlers();
  }
});

export default DropDownBehavior;