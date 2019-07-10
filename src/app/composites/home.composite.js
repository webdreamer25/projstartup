import { Composite } from "../../zense";
import JumbotronModule from "../modules/jumbotron.module";
import WelcomeModule from "../modules/welcome.module";
import MediaModule from "../modules/media.module";
import CalloutsModule from "../modules/callouts.module";
import NewsModule from "../modules/news.module";
import Parallax from "../components/parallax.component";
import ModalModule from "../modules/modal.module";

const HomeComposite = Object.create(Composite);

HomeComposite.create({
  selector: '#main-region',
  renderType: 'html',
  modules: [
    JumbotronModule,
    WelcomeModule,
    MediaModule,
    CalloutsModule,
    NewsModule,
    ModalModule
  ],
  components: [
    Parallax
  ],

  template() {
    return `
      <section id="jumbotron-region" class="jumbotron-container"></section>	

      <section id="welcome-region" class="section"></section>
      
      <section id="media-region" class="section"></section>
      
      <section id="callouts-region" class="section"></section>
      
      <section class="parallax-region section"></section>
      
      <section id="news-region" class="section clearfix"></section>
      
      <section class="parallax-region section"></section>
    `;
  }
});

export default HomeComposite;