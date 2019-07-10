import { Component } from "../../../zense";
import AuthBehavior from "../../behaviors/admin/auth.behavior";

const LoginComponent = Object.create(Component);

LoginComponent.create({
  name: 'login',

  selector: '#auth-region',

  behaviors: [
    { 
      name: AuthBehavior, 
      options: {
        defaults: {
          formActionMethod: 'signInWithEmailAndPassword'
        }
      }
    }
  ],

  template() {
    return `
      <h1 class="m-auth__heading">Log in</h1>
      <p class="m-auth__info">Please use the credentials you were provided.</p>

      <form id="auth-form">
        <div class="form-group">
          <input id="user-email" class="js-auth-field js-validate-field form-control"
            type="email" 
            name="email" 
            placeholder="E-mail" />
        </div>

        <div class="form-group">
          <input id="user-password" class="js-auth-field js-password-field form-control"
            type="password" 
            name="password" 
            placeholder="Password" />
        </div>
        
        <div class="btn-group row align-items-center">
          <div class="col-md-6">
            <a href="#">
              <i class="far fa-key"></i>Forgot your password?
            </a>
          </div>
          <div class="col d-flex justify-content-end">
            <button class="g-btn g-btn--primary g-btn--small js-action-btn">Login</button>
            <button class="g-btn g-btn--dark g-btn--small js-register-btn">Register</button>
          </div>   
        </div>
      </form>
    `;
  }
});

export default LoginComponent;