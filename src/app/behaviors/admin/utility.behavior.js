import { Behavior } from "../../../zense";

const UtilityBehavior = Object.create(Behavior);

UtilityBehavior.config({
  behaviorName: 'utility',

  ui: {
    switch: '.js-checkbox-switch'
  },

  handlers() {
    if (this.ui.switch.exists) {
      this.ui.switch.on('click', this.toggleSwitch.bind(this));
    }
  },

  toggleSwitch(e) {
    this.setComponentPath();

    let currentSwitch = e.currentTarget;
    let componentIdx = this.componentPath.split('/')[2];
    let path = 'app/pages/' + this.componentPath + '/' + currentSwitch.name;
    let checked = true;

    if (!currentSwitch.checked) {
      checked = false;
    } 

    this.module.settings.componentsConfig.components[componentIdx][currentSwitch.name] = checked;

    sessionStorage.setItem('appSettings', JSON.stringify(this.module.settings));

    this.update(path, checked);
  },

  setComponentPath() {
    let settings = this.module.settings;

    this.componentPath = settings.componentsConfig.configIdx + '/components/';
    this.componentPath += settings.componentsConfig.components.findIndex((item) => {
      return item.name === settings.component;
    });
  },

  update(path, payload) {
    this.module.db.ref(path).set(payload, (error) => {
      if (error) {

      } else {
        this.module.render();
      }
    });
  },

  start() {
    this.handlers();
  }
});

export default UtilityBehavior;