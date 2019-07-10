import { Component } from "../../../zense";
import NotificationBehavior from "../../behaviors/admin/notification.behavior";

const NotificationComponent = Object.create(Component);

NotificationComponent.create({
  name: 'global-notification',

  renderType: 'html',

  renderMultiple: true,

  selector: '#global-notifications-region',

  behaviors: [
    NotificationBehavior
  ],

  icon: 'fa-check',
  message: 'Successfully saved!',

  setNotificationId() {
    if (this.id !== '') {
      return this.id;
    }

    return '';
  },

  template() {
    return `
      <div class="g-notifications">
        <i class="g-notifications__icon far ${this.icon}"></i>
        <span class="g-notifications__msg js-notification-msg">${this.message}</span>
      </div>
    `;
  }
});

export default NotificationComponent;