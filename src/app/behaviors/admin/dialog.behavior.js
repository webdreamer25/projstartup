import { Behavior } from "../../../zense";
import DialogComponent from "../../components/admin/dialog.component";

const DialogBehavior = Object.create(Behavior);

DialogBehavior.config({
  behaviorName: 'dialog',

  ui: {
    trigger: '.js-trigger-dialog'
  },

  setup() {
    if (this.ui.trigger.length) {
      this.ui.trigger.each(this.createDialog.bind(this));
    } else {
      this.createDialog(this.ui.trigger);
    }
  },

  createDialog(elem) {
    let dialogOptions = elem.dataset;

    this.each(dialogOptions, (value, key) => {
      // Remove the attributes
      if (key !== 'dialogId') {
        let attr = 'data-' + key.split(/(?=[A-Z])/).join('-').toLowerCase();

        attr = elem.getAttributeNode(attr);

        elem.removeAttributeNode(attr);
      }

      key = key.replace('dialog', '');
      key = key.charAt(0).toLowerCase() + key.slice(1);

      DialogComponent.defaults[key] = value;
    });

    DialogComponent.render();
  },

  handlers() {
    if (this.ui.trigger.exists) {
      this.ui.trigger.on('click', this.open.bind(this));
    }
  },

  open(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    let target = btn.dataset.dialogId;
    let dialog = this.dom('#' + target);

    dialog.classList.add('c-dialog--active');
  },

  start() {
    this.setup();
    this.handlers();
  }
});

export default DialogBehavior;