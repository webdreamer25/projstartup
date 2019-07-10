import { Composite } from "../../../zense";
import DashboardModule from "../../modules/admin/dashboard.module";
import AuthModule from "../../modules/admin/auth.module";
import HeaderModule from "../../modules/admin/header.module";

import firebase from 'firebase/app';
import 'firebase/auth';

const AdminComposite = Object.create(Composite);

AdminComposite.create({
  selector: '#app',

  isAuthenticated: false,

  modules: [
    HeaderModule,
    DashboardModule
  ],

  internalPostHook() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let modules = this.modules;
        let currentUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };

        sessionStorage.setItem('user', JSON.stringify(currentUser));

        if (window.location.hash !== '') {
          modules = [HeaderModule];
        } 

        this.bootstraper(modules);
      } else {
        // User is signed out.
        sessionStorage.clear();

        if (HeaderModule.hasRendered) {
          HeaderModule.destroy();
        }

        if (window.location.hash !== '') {
          window.location.hash = '';
        }

        AuthModule.render();
      }
    });
  },

  template() {
    return `
      <header id="header-region" class="m-header"></header>
      <main id="main-region"></main>
      <div id="dialog-region"></div>
      <div id="image-selector-region"></div>
      <div id="images-uploader-region"></div>
	    <div id="global-notifications-region"></div>
    `;
  }
});

export default AdminComposite;