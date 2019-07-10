import { Composite } from "../../zense";
import SplashModule from "../modules/splash.module";
import WelcomeModule from "../modules/welcome.module";
import SimpleWidgetComponent from "../components/simple-widget.component";
import ContactListComponent from "../components/contact-list.component";

const ContactsComposite = Object.create(Composite);

ContactsComposite.create({
  selector: '#main-region',
  renderType: 'html',
  modules: [
    SplashModule,
    WelcomeModule
  ],
  components: [
    SimpleWidgetComponent,
    ContactListComponent
  ],

  template() {
    return `
      <div id="splash-region"></div>

      <section id="welcome-region" class="section">
      </section>
      
      <section id="widgets-region" class="section"></section>
      
      <section id="contacts-region" class="section"></section>
    `;
  }
});

export default ContactsComposite;
