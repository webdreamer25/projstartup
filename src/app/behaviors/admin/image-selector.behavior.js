import { Behavior } from "../../../zense";

const ImageSelectorBehavior = Object.create(Behavior);

ImageSelectorBehavior.config({
  behaviorName: 'image-selector',

  ui: {
    radio: '.js-image-selector-radio'
  },

  selectedImage: {},
  isDefault: true,

  handlers() {
    if (this.ui.radio.exists) {
      this.ui.radio.on('change', this.onChangeState.bind(this));
    }
  },

  onChangeState(e) {
    let radio = e.currentTarget;
    let container = radio.parentNode;
    let selectorId = radio.dataset.selectorId;
    let imagePath = radio.dataset.imagePath;
    let imageTarget = this.dom(radio.dataset.imageTarget);
    let fieldTarget = this.dom(radio.dataset.fieldTarget);

    this.ui.radio.each((radio) => {
      let containerClasses = radio.parentNode.classList;

      if (containerClasses.value.indexOf('is-selected') > -1) {
        containerClasses.remove('is-selected');
        radio.checked = false;
      }
    });

    if (radio.checked) {
      let blurEvent = new Event('blur');

      container.classList.add('is-selected');

      fieldTarget.val(imagePath);
      fieldTarget.dispatchEvent(blurEvent);

      this.dom('.js-img-title-' + selectorId).innerHTML = radio.name;
      
      if (imageTarget.exists) {
        imageTarget.attr('src', imagePath);
      }

      let token = this.setImageToken(imagePath);

      this.selectedImage[selectorId] = token;
      this.isDefault = false;
    }
  },

  setImageToken(url) {
    url = new URL(url);

    return url.searchParams.get('token');
  },

  start() {
    this.settings = JSON.parse(sessionStorage.appSettings);

    this.bindUIElements();
    this.handlers();
  }
});

export default ImageSelectorBehavior;