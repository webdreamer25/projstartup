import { Behavior } from "../../../zense";

const EnablerBehavior = Object.create(Behavior);

EnablerBehavior.config({
  behaviorName: 'enabler',

  ui: {
    form: '.g-form',
    fields: '.js-field'
  },

  handlers() {
    this.ui.fields.on('blur', (e) => {
      let disabledBtn = this.ui.form.find('[disabled]');

      if (disabledBtn.exists) {
        let attr = disabledBtn.getAttributeNode('disabled');
        
        disabledBtn.removeAttributeNode(attr);
      }
    });
  },

  start() {
    this.handlers();
  }
});

export default EnablerBehavior;