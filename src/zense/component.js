import Controller from './core/controller';

const Component = Object.create(Controller);

Component.id = 0;
Component.type = 'component';
Component.behaviors = [];
Component.preventBehaviorStart = false;

Component.setBehaviors = function () {
  if (this.shouldSetBehaviors && this.behaviors.length > 0 && !this.hasRendered) {
    for (let i = 0; i < this.behaviors.length; i++) {
      let behavior = this.behaviors[i];

      if (this.shouldPreventBehaviorFromStarting(behavior)) {
        continue;
      }
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        let customBehavior = Object.create(behavior.name);

        // Necessary if we want to have specific behavior changes on any given component/module
        if (behavior.options) {
          customBehavior = this.customizeObject(behavior.name, behavior.options);
          behavior = customBehavior;
        }
      } else {
        behavior = Object.create(behavior);
      }

      // We need to let the behavior who the parent and grandparent caller are.
      behavior.component = this;
      behavior.module = this.module;

      behavior.bindUIElements();
      behavior.start();
    }

    // Ensures that behaviors are only set one time.
    this.shouldSetBehaviors = false;
  }
};

Component.shouldPreventBehaviorFromStarting = function (behavior) {
  let result = false;

  if (this.preventBehaviorStart) {
    // Need access to behavior when extended under new context.
    if (behavior.name) {
      behavior = behavior.name;
    }

    if (Array.isArray(this.preventBehaviorStart)) {
      result = this.preventBehaviorStart.some((item) => {
        return item.behaviorName === behavior.behaviorName
      });
    } else {
      result = behavior.behaviorName === this.preventBehaviorStart;
    }
  }

  return result;
};

Component.setName = function (selector) {
  selector = selector.toLowerCase();

  this.name = selector.slice(1) + '-' + this.type + '-' + this.id;

  // Increment id after name is set so no duplication occurs
  this.id++
};

export default Component;
