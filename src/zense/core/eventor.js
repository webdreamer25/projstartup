const Eventor = {
  events: {},

  publish(eventName, eventDetails = null, trigger = false) {
    let event;

    // If the event already exists do not create a duplicate.
    if (typeof this.events[eventName] === undefined) { return null; }

    if (eventDetails === null) {
      event = new Event(eventName);
    } else {
      event = new CustomEvent(eventName, { detail: eventDetails });
    }

    this.events[eventName] = event;

    if (trigger) {
      this.trigger(eventName);
    }
  },

  subscribe(event, callback, bubble = false, elem = document) {
    elem.addEventListener(event, callback, bubble);
  },

  trigger(event, elem = document) {
    if (typeof event === 'string') {
      event = new Event(event);
    } else {
      event = this.events[event];
    }

    elem.dispatchEvent(event);
  }
};

export default Eventor;