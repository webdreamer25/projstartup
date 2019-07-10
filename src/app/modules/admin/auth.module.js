import { Module } from "../../../zense";
import LoginComponent from "../../components/admin/login.component";

import style from './auth.module.css';

const AuthModule = Object.create(Module);

AuthModule.create({
  name: 'authentication',
  
  selector: '#main-region',

  renderType: 'html',

  components: [
    LoginComponent
  ],

  template() {
    return `
      <div class="container">
        <div class="row vh-80">
          <div class="col align-self-center">
            <div id="auth-region" class="m-auth">
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

export default AuthModule;