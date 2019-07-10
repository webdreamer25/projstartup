import { Module } from "../../../zense";
import PageHeaderComponent from "../../components/admin/page-header.component";
import ConfigToolbarComponent from "../../components/admin/config-toolbar.component";
import BreadcrumbComponent from "../../components/admin/breadcrumb.component";
// import LoaderComponent from "../../components/admin/loader.component";
import ToolbarComponent from "../../components/admin/toolbar.component";
import EditorComponent from "../../components/admin/editor.component";
import ButtonsComponent from "../../components/admin/buttons.component";
import NotificationComponent from "../../components/admin/notification.component";
import UploaderComponent from "../../components/admin/uploader.component";
import ImageSelectorComponent from "../../components/admin/image-selector.component";

const EditModule = Object.create(Module);

EditModule.create({
  name: 'edit',

  selector: '#main-region',

  renderType: 'html',

  components: [
    {
      name: PageHeaderComponent,
      options: {
        defaults: {
          icon: 'fa-pen-nib',
          heading: 'Component Editor',
          subheader: 'Edit, delete or add a component.'
        }
      }
    },
    ConfigToolbarComponent,
    UploaderComponent,
    BreadcrumbComponent,
    EditorComponent,
    ToolbarComponent,
    ButtonsComponent,
    ImageSelectorComponent,
    NotificationComponent
  ],

  // beforeAddComponents() {
  //   LoaderComponent.reset();
  //   LoaderComponent.render();
  // },

  // afterAddComponents() {
  //   setTimeout(() => {
  //     LoaderComponent.fadeOut();
  //   }, 1600);
  // },

  template() {
    return `
      <header class="g-pheader">
        <div class="container">
          <div class="row">
            <div id="pheader-region" class="col-md-6 col-lg-7"></div>
            <div id="config-region" class="col-md-6 col-lg-5"></div>
          </div>
        </div>
      </header>
      <section class="container">
        <div class="row">
          <div id="breadcrumb-region" class="col-md-8"></div>
          <div id="toolbar-region" class="col-md-4"></div>
        </div>
      </section>
      <section class="container">
        <div class="row">
          <div class="col" data-loader="true">
            <div id="editor-region" class="g-card g-card--full"></div>
          </div>
        </div>
      </section>
    `;
  }
});

export default EditModule;