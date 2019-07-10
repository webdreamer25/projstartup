import { Module } from "../../zense/index";
import AddressComponent from "../components/address.component";
import ContactFormComponent from "../components/contact-form.component";
import GalleryComponent from "../components/gallery.component";

import style from './footer.module.css';

const FooterModule = Object.create(Module);

FooterModule.create({
  selector: '#footer-region',
  components: [
    AddressComponent,
    ContactFormComponent,
    GalleryComponent
  ],

  serializeData() {
    return this.store.footer.copyright
  },  

  template(copyright) {
    return `
      <div class="c-footer__top">
        <div class="container">
          <div class="row clearfix">
            <div id="widget-address-region" 
              class="c-footer__widget col-md-4 not-animated" 
              data-animate="slideInLeft" 
              data-animate-delay="600">
            </div>
      
            <div id="contact-form-region" 
              class="c-footer__widget col-md-4 hidden-phone not-animated" 
              data-animate="fadeInUp" 
              data-animate-delay="400">	
            </div>
      
            <div id="widget-gallery-region" 
              class="c-footer__widget col-md-4 not-animated" 
              data-animate="slideInRight" 
              data-animate-delay="200">
            </div>
          </div>
        </div>
      </div>
      
      <div class="c-footer__legal">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-auto">
              ${copyright}
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

export default FooterModule;