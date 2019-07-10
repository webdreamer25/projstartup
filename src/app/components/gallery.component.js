import { Component } from "../../zense";

const GalleryComponent = Object.create(Component);

GalleryComponent.create({
  selector: '#widget-gallery-region',

  serializeData() {
    let footerStore = this.module.store.footer;

    if (footerStore.widget3 && footerStore.widget3.length === 1 || typeof footerStore.widget3 === 'undefined') {
      this.shouldRender = false;
      return false;
    }

    return footerStore.widget3;
  },

  template(widget) {
    return `
      <h5>${widget.name}</h5>
      <ul id="gallery" class="thumb-gallery clearfix">

        ${widget.images && widget.images.length > 0 ? widget.images.map((image, index) => {
          if (image.thumbnail === '') {
            return `<li class="gitem">
              <a href="${widget.images.original}" class="js-lightbox"
                data-index="${index}"
                data-modal="gallery"
                data-async-status="ready">
                <img class="img-responsive" src="${widget.images.thumbnail}" />
              </a>
            </li>`;
          }
        }).join('') : 'There are no images added to the gallery.'}

      </ul>
    `;
  }
});

export default GalleryComponent;