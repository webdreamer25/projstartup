import { Component } from "../../../zense";
import WysiwygBehavior from "../../behaviors/admin/wysiwyg.behavior";
import EnablerBehavior from "../../behaviors/admin/enabler.behavior";
// import ValidationBehavior from "../../behaviors/admin/validate-form.behavior";

const EditorComponent = Object.create(Component);

EditorComponent.create({
  name: 'editor',

  selector: '#editor-region',

  renderType: 'html',

  hasTextarea: false,
  primaryLabel: false,
  secondaryLabel: false,

  behaviors: [
    WysiwygBehavior,
    EnablerBehavior
    // ValidationBehavior
  ],

  serializeData() {
    let store = this.module.store;

    this.settings = this.module.settings;

    if (Array.isArray(store)) {
      let index = this.settings.componentId;

      store = store[0].isNew ? store[index] : store[0];
    }

    return {
      component: store,
      name: this.settings.component
    };
  },

  isSelected(value, option) {
    if (value === option) {
      return 'selected';
    }

    return '';
  },

  setImageToken(url) {
    url = new URL(url);

    return url.searchParams.get('token');
  },

  setColumnSize(value) {
    if (typeof value === 'string') {
      let strLen = value.length;

      if (strLen < 5 && strLen !== 0) {
        return '-md-3';
      }

      if (strLen > 12) {
        return '-12';
      }
    } else if (typeof value === 'boolean') {
      return '-md-2';
    }

    return '';
  },

  buildFormFields(component, isNestedObject, level, currKey) {
    let tpl = '';

    level = level ? level : 0;

    if (isNestedObject) {
      tpl += '<div class="form-row">';
    }

    for (let key in component) {
      let fieldTpl = '';
      let value = component[key];

      if (key !== 'isNew') {
        if (isNestedObject) {
          if (currKey && key !== currKey && level === 0) {
            level++;
          }

          fieldTpl += `<div class="col${this.setColumnSize(value)}">`;
          fieldTpl += this.determineFieldType(key, value, level, currKey);
          fieldTpl += '</div>';
        } else {
          fieldTpl += this.determineFieldType(key, value, level);
        }

        tpl += fieldTpl;
      }
    }

    if (isNestedObject) {
      tpl += '</div>';
    }

    if (!this.hasTextarea) {
      this.preventBehaviorStart = 'wysiwyg-behavior';
    } else {
      this.preventBehaviorStart = false;
    }

    return tpl;
  },

  determineFieldType(key, value, level, currKey) {
    let fieldTpl = '';

    // Array returns 'object' when checking typeof
    let dataType = Array.isArray(value) ? 'array' : typeof value;
    let { label, fieldID } = this.getFieldInfo(level, key);

    switch(dataType) {
      case 'object':
        if ((currKey === undefined || key !== undefined && currKey !== key) && level === 0) {
          currKey = key;
        }

        if (level === 0) {
          this.primaryLabel = key;

          fieldTpl += `<h3 class="g-form__heading">${key}</h3>`;
        } else {
          this.secondaryLabel = key + ' ';
        }

        fieldTpl += this.buildFormFields(value, true, level, currKey);
        
        break;
      case 'array': 
        if (key === 'images') {
          fieldTpl += '<div class="form-row">';

          fieldTpl += value.map((image, idx) => {
            let fieldSrcId = key + '-' + idx + '-src';
            let fieldAltId = key + '-' + idx + '-alt';
            let imageName = image.src.split(this.settings.page)[1];
            
            if (imageName) {
              imageName = decodeURI(imageName.split('?')[0]).slice(3);
            } else {
              imageName = '';
            }

            return `<div class="g-form__fit col-md-4">
              <span class="js-img-title-${idx}">${imageName}</span>

              <div class="g-form__hover g-form__fit--height js-image-selector">
                <img id="${fieldSrcId + 'Img'}" src="${image.src}" class="g-form__hover-image img-responsive" />
                <div class="g-form__hover-mask">
                  <button class="g-btn g-btn--brand g-btn--small js-open-modal-btn"
                    data-selector-id="${idx}"
                    data-selected-image="${this.setImageToken(image.src)}"
                    data-modal-target="#image-selector">
                    Choose New Image
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label for="${fieldSrcId}" class="g-form__field--hidden">Image ${idx+1}</label>
                <input id="${fieldSrcId}" 
                  class="g-form__field--hidden js-field" 
                  type="text" 
                  name="${fieldSrcId}" 
                  value="${image.src}" />

                <label for="${fieldAltId}">Image Alt ${idx+1}</label>
                <input id="${fieldAltId}" 
                  class="form-control js-field" 
                  type="text" 
                  name="${fieldAltId}" 
                  value="${image.alt}" />
              </div>
            </div>`;
          }).join('');

          fieldTpl += '</div>';
        }
        break;
      case 'string':
        if (key === 'src') {
          fieldID = 'images-0-src';
        }

        fieldTpl += `<div class="form-group">
          <label for="${fieldID}" class="g-form__label">
            ${label}
          </label>`;

        
        if (key === 'body') {
          this.hasTextarea = true;

          fieldTpl += `<div class="g-wysiwyg js-wysiwyg">
            <textarea id="${fieldID}" 
              name="${fieldID}" 
              class="g-wysiwyg__textarea g-form__field--lrg form-control js-field"
              required>${ decodeURI(value) }</textarea>
          </div>`;
        } else if (key === 'src') {
          fieldTpl += `<div class="form-row">
            <div class="col">
              <input id="${fieldID}" 
              class="form-control js-field" 
              name="${fieldID}" 
              value="${ decodeURI(value) }"
              required />
            </div>
            <div class="col-auto">
              <button class="g-btn g-btn--brand g-btn--small js-open-modal-btn"
                data-selector-id="0"
                data-selected-image="${this.setImageToken(value)}"
                data-modal-target="#image-selector">Select Image</button>
            </div>
          </div>`;
        } else {
          fieldTpl += `<input id="${key}" 
              class="form-control js-field" 
              name="${fieldID}" 
              value="${ decodeURI(value) }"
              required />`;
        }

        fieldTpl += '</div>';
        
        break;
      case 'boolean': 
        fieldTpl += `<div class="form-group">
          <label for="${fieldID}" class="g-form__label">${key}</label>
          <select id="${fieldID}" name="${fieldID}" class="form-control js-field">
            <option ${this.isSelected(value, true)}>true</option>
            <option ${this.isSelected(value, false)}>false</option>
          </select>
        </div>`;
      default: 
        // Do nothing for any other type
        if (key.indexOf('created') === -1) {
          fieldTpl += `<div class="form-group">
          <label for="${fieldID}" class="g-form__label">
            ${label}
          </label>
          <input id="${fieldID}" 
            class="form-control js-field" 
            name="${fieldID}" 
            value="${ value }" />
          </div>`;
        }
    }

    return fieldTpl;
  },

  getFieldInfo(level, key) {
    let label = '';
    let fieldID = [];
    let splitCap = key.split(/(?=[A-Z])/).join(" ");

    if (level === 0) {
      this.primaryLabel = false;
      this.secondaryLabel = false;
    } else {
      fieldID.push(this.primaryLabel);
    }

    label = this.secondaryLabel && level === 1 ? this.secondaryLabel + splitCap : splitCap;

    if (label && label !== key && typeof this.secondaryLabel !== 'boolean') {
      fieldID.push(this.secondaryLabel.replace(' ', ''));
    }

    fieldID.push(key);

    fieldID = fieldID.join('-');

    return { label, fieldID };
  },

  setHeading(data) {
    let heading = '';
    let componentId = window.location.hash.split('/')[2];
    let total = this.settings.info.totalComponents;
    let component = data.component;
    let componentName = data.name;

    if (componentId === 'new') {
      return 'Adding new ' + data.name;
    }

    if (component.title) {
      component = ' ' + component.title;
    } else if (component.content && component.content.title) {
      component = ' ' + component.content.title;
    } else {
      component = '';
    }

    // Component name comes from the data so we need to remove the plurality.
    if (componentName.endsWith('s') && componentName !== 'ministries') {
      componentName = componentName.slice(0, -1);
    } else {
      componentName = componentName === 'ministries' ? 'ministry' : componentName;
    }

    if (total > 1) {
      heading += this.createPaginator(total);
    } 

    if (component === '') {
      heading += componentName + ' ' + componentId;
    } else {
      heading += componentName + ' &mdash; ' + component;
    }

    return heading;
  },

  createPaginator(total) {
    let id = parseInt(this.settings.componentId);
    let route = '#' + this.settings.routes.edit.slice(0, -1);

    return `<span class="g-card__aside">
      <a href="${route + (id - 1)}" ${id > 1 ? '' : 'class="disabled"'}>
        <i class="far fa-chevron-double-left"></i>
      </a>
      ${id} of ${total}
      
      <a href="${route + (id + 1)}" ${id === total ? 'class="disabled"' : ''}>
        <i class="far fa-chevron-double-right"></i>
      </a>
    </span>`;
  },

  afterRender() {
    if (this.hasTextarea) {
      if (this.settings.language !== 'en') {
        this.dom('.js-field').each((textarea) => {
          textarea.attr('spellcheck', false);
        });
      }

      // Need to reset back to 
      this.hasTextarea = false;
    }
  },

  template(data) {
    return `<h2 class="g-card__heading">${this.setHeading(data)}</h2>

    <form class="c-editor g-form">
      ${ this.buildFormFields(data.component)}

      <div id="buttons-region" class="form-row justify-content-end"></div>
    </form>`;
  }
});

export default EditorComponent;