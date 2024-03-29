import Xhr from './xhr';
import Eventor from './eventor';

const selectorRegex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

const SelectorMethods = {
  on(event, callback, bubble = true) {
    if (!this.length) {
      this.info = { event, callback };

      this.addEventListener(event, callback, bubble);

      return this;
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].info = { event, callback };

        this[i].addEventListener(event, callback, bubble);
      }

      return this;
    }
  },

  off() {
    if (!this.length && this.info) {
      this.removeEventListener(this.info.event, this.info.callback, true);

      return this;
    } else {
      for (let i = 0; i < this.length; i++) {
        if (this[i].info) {
          this[i].removeEventListener(this[i].info.event, this[i].info.callback, true);
        }
      }

      return this;
    }
  },

  html(html) {
    if (!this.length) {
      this.innerHTML = html;
    } else {
      for (let i = 0; i < this.length; i++) {
        if (this[i].innerHTML !== '') {
          this[i].innerHTML = '';
        }

        this[i].innerHTML = html;
      }
    }
  },

  insertHTML(position, html) {
    if (!this.length) {
      this.insertAdjacentHTML(position, html);
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML(position, html);
      }
    }

    return this;
  },

  attr(attribute, property) {
    if (this.length) {
      for (let i = 0; i < this.length; i++) {
        if (typeof property !== 'undefined') {
          this[i].setAttribute(attribute, property);    
        } else {
          return this[i].getAttribute(attribute);
        }
      }
    } else if (!this.length && property !== undefined) {
      this.setAttribute(attribute, property);
    }

    return this.getAttribute(attribute);
  },

  val(value) {
    if (!this.length) {
      if (typeof value !== 'undefined') {
        this.value = value;
      } else {
        return this.value;
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        if (typeof value !== 'undefined') {
          this[i].value = value;
        } else {
          return this[i].value;
        }
      }
    }

    return this;
  },

  prop(property, value) {
    if (!this.length) {
      this[property] = value;
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i][property] = value;
      }
    }

    return this;
  },

  hasAttribute(attribute) {
    for (let i = 0; i < this.length; i++) {
      return this[i].hasAttribute(attribute);
    }
  },

  removeAttribute(attribute) {
    for (let i = 0; i < this.length; i++) {
      this[i].removeAttribute(attribute);
    }
  },
  
  each(callback) {
    try {
      for (let i = 0; i < this.length; i++) {
        let el = this[i];

        // Add selector chain methods to dom object.
        for (let key in SelectorMethods) {
          if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {
            el[key] = SelectorMethods[key];
          }
        }

        callback(el, i, this);
      }
    } catch (e) {
      console.error(e);
    }
  },

  find(selector) {
    return new DOM(selector, this);
  }
};

const DOM = function (selector, context) {
  if (!context) { 
    context = document;
  }

  let match;
  let strSelector;

  // We do not want to get the dom if the selector is already and html node.
  if (typeof selector === 'string') {
    strSelector = selector;
    match = selectorRegex.exec(selector);

    if (match !== null) {
      if (match[1]) {
        selector = context.getElementById(match[1]);
      } else if (match[2]) {
        selector = context.getElementsByTagName(match[2]);
      } else if (match[3]) {
        selector = context.getElementsByClassName(match[3]);
      }
    } else {
      selector = context.querySelectorAll(selector);
    }

    // We need to preserve a string copy of the selector to for reseting purposes.
    if (selector && (selector.strName === undefined || selector.strName && selector.strName !== strSelector)) {
      selector.strName = strSelector;
    }
  } 

  if (selector === null || selector && selector.length === 0 && selector !== (window || document)) {
    selector = false;
  } else {
    selector.exists = true;
  }

  if (selector) {
    if (selector.length) {
      let i = 0;

      do {

        // Add selector chain methods to dom object.
        for (let key in SelectorMethods) {
          if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {
            
            // Set methods on dom object list returned.
            selector[key] = SelectorMethods[key];

            // Set methods to each dom object list item.
            selector[i][key] = SelectorMethods[key];
          }
        }

        i++;
      } while (i < selector.length);

      if (selector.length === 1) {
        selector[0].exists = true;
        
        return selector[0];
      }
    } else {

      // Add selector chain methods to dom object.
      for (let key in SelectorMethods) {
        if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {
          selector[key] = SelectorMethods[key];
        }
      }

    }
  } else {
    selector = {
      exists: false,
      strName: strSelector
    }
  }

  return selector;
};

const Traverse = Object.create(Xhr);

Traverse.events = Object.create(Eventor);

Traverse.strSelector = null;

Traverse.dom = function (selector) {
  return new DOM(selector);
};

Traverse.each = function (arr, callback) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  } else {
    let obj = arr;
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        callback(obj[key], key, obj);
      }
    }
  }
};

Traverse.isObject = function (val) {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
};

Traverse.extend = function () {
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }

  return arguments[0];
};

Traverse.uniqueArray = function (arr) {
  return Array.from(new Set(arr));
};

export default Traverse;