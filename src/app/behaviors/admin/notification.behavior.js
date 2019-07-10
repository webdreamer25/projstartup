import { Behavior } from "../../../zense";

const NotificationBehavior = Object.create(Behavior);

NotificationBehavior.config({
  behaviorName: 'global notification',

  handlers() {
    this.events.subscribe('notify', this.subscribeOnNotify.bind(this));
  },

  subscribeOnNotify(e) {
    let container = this.dom('#global-notifications-region');

    if (e.detail) {
      container.find('.js-notification-msg').innerHTML = e.detail.msg;
    }

    this.triggerNotification(container);
  },

  triggerNotification(container) {
    container.find('.g-notifications').classList.add('active');

    setTimeout(() => {
      container.find('.g-notifications').classList.remove('active');
    }, 1600);
  },

  start() {
    this.handlers();
  }
});

export default NotificationBehavior;