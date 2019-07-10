import { Behavior } from "../../../zense";

const CrudBehavior = Object.create(Behavior);

CrudBehavior.config({
  behaviorName: 'crud-component',

  ui: {
    saveBtn: '.js-form-submit',
    fields: '.js-field'
  },

  handlers() {
    this.ui.saveBtn.on('click', this.formSubmission.bind(this));
  },

  formSubmission(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    let crudMethod = btn.dataset.method;
    let form = this.dom('.c-editor');
    let fields = form.find('.js-field');
    let payload = this.getFormFieldData(fields);
    let settings = this.component.appSettings;
    let fbNode = 'language/';

    this[crudMethod](btn, fbNode, settings, payload);
  },

  publish(btn, firebaseNode, settings, payload) {
    let updates = {};
    let path = 'pages/' + settings.page + '-page/' + settings.component;

    if (settings.dataIsArray) {
      path += '/' + (settings.info.totalComponents + 1);
    }

    updates['/en/' + path] = payload;
    updates['/es/' + path] = payload;

    this.module.db.ref(firebaseNode).update(updates, (error) => {
      if (error) {
        btn.setAttribute('data-notification-message', 'error');
      } else {
        let route = settings.routes.edit.split('/');

        route.pop();

        route = '#' + route.join('/') + '/' + (settings.info.totalComponents + 1);

        this.updateComponentCount(settings, true);
        
        this.events.publish('notify', {
          msg: 'Successfully published component!'
        }, true);

        // Ensures that notification animation finishes before routing.
        setTimeout(() => {
          window.location.hash = route;
        }, 1800);
      }
    });
  },

  update(btn, firebaseNode, settings, payload) {
    firebaseNode += settings.language + '/pages/';
    firebaseNode += settings.page + '-page/' + settings.component;

    if (settings.dataIsArray) {
      firebaseNode += '/' + settings.componentId;
    } 
    
    this.module.db.ref(firebaseNode).set(payload, (error) => {
      if (error) {
        btn.setAttribute('data-notification-message', 'error');
      } else {
        this.events.publish('notify', {
          msg: 'Successfully saved component!'
        }, true);
      }
    });
  },

  delete(btn, firebaseNode, settings) {
    let updates = {};
    let store = this.module.store;
    let path = 'pages/' + settings.page + '-page/' + settings.component;

    store.splice(parseInt(settings.componentId), 1);

    updates['/en/' + path] = store;
    updates['/es/' + path] = store;

    this.module.db.ref(firebaseNode).update(updates, (error) => {
      if (error) {
        btn.setAttribute('data-notification-message', 'error');
      } else {
        this.updateComponentCount(settings, false);

        this.events.publish('notify', {
          msg: 'Successfully deleted component!'
        }, true);

        this.goBackToMainRoute(settings);
      }
    });
  },

  goBackToMainRoute(settings) {
    let route = settings.routes.edit.split('/');

    route.pop();

    route = '#' + route.join('/');

    if (settings.info.totalComponents > 1) {
      route += '/1';
    } else {
      route += '/new';
    }

    // Ensures that notification animation finishes before routing.
    setTimeout(() => {
      window.location.hash = route;
    }, 1800);
  },

  updateComponentCount(settings, increment) {
    this.module.db.ref('app/pages').once('value', (snap) => {
      let path = '';
      let count = 0;
      let data = snap.val();

      data.forEach((page, pageIdx) => {
        if (page.name === settings.page) {
          path += pageIdx;

          page.components.forEach((component, componentIdx) => {
            if (component.name === settings.component) {
              path += '/components/' + componentIdx + '/count';

              count = snap.child(path).val();
            }
          });

          return false;
        }
      });

      if (increment) {
        count++;
      } else {
        if (count > 0) {
          count--;
        }
      }

      this.module.db.ref('app/pages/' + path).set(count);
    });
  },

  getFormFieldData(fields) {
    let currentKey = '';
    let prevKey2 = '';
    let formatted = {};
    let level2 = {};
    let level3 = {};
    
    fields.each((field) => {
      if (field.name.indexOf('-') > -1) {
        let keys = field.name.split('-'),
            k1 = keys[0],
            k2 = keys[1],
            k3 = keys[2];

        if (currentKey === '' || currentKey !== k1) {
          currentKey = k1;
          level2 = {};
        }

        if (prevKey2 === '' || prevKey2 !== k2) {
          prevKey2 = k2;
          level3 = {};
        }

        if (keys.length === 3) {
            level3[k3] = field.value;
            level2[k2] = level3;
        } else {
            level2[k2] = field.value;
        }

        formatted[k1] = level2;
      } else {
        if (field.name === 'body' || field.name === 'bio' || field.name === 'content') {
          formatted[field.name] = encodeURI(field.value);
        } else {
          formatted[field.name] = field.value;
        }
      }
    });

    return formatted;
  },

  start() {
    this.handlers();
  }
});

export default CrudBehavior;