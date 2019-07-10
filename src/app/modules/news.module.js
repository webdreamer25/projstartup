import { Module } from "../../zense";
import ArticlesComponent from "../components/articles.component";
import WidgetsComponent from "../components/widgets.component";

const NewsModule = Object.create(Module);

NewsModule.create({
  name: 'news',
  selector: '#news-region',
  components: [
    ArticlesComponent,
    WidgetsComponent
  ],

  setColumnSize() {
    if (this.store.widgets.length > 1) {
      return 'col-md-8';
    }

    return 'col-md-12';
  },

  template() {
    return `
      <div class="container">
        <div class="row clearfix">
        <aside id="articles-region" class="aside ${this.setColumnSize()}">
        </aside>
      
        <aside id="widgets-region" class="aside sidebar col-md-4">
        </aside>
      </div>
    `;
  }
});

export default NewsModule;