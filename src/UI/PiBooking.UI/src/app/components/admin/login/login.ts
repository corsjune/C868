//based on code referenced from https://aurelia-authentication.spoonx.org/Quick%20start.html
// login.js

import { AuthService } from 'aurelia-authentication';
import { inject, computedFrom, autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService';
@autoinject()

export class Login {

    errors: string = null;
    message: string = null; 

    authService: AuthService;

    constructor(authService: AuthService, private sess: sessionService) {
        this.authService = authService;
    };

    heading = 'Login';

    Username = '';
    password = '';

    // make a getter to get the authentication status.
    // use computedFrom to avoid dirty checking
    @computedFrom('authService.authenticated')
    get authenticated() {
        return this.authService.authenticated;
    }

    async login() {
        var returnValue;
        try {
            var response = await this.authService.login(this.Username, this.password);
            this.message = "Login Successful.";
        }
        catch (err) {
            let mess = await (err.json());
            console.error(mess);
            this.errors = mess.Message;
  
        }
    }

    authenticate(name) {
        return this.authService.authenticate(name)
            .then(response => {
                console.log("auth response " + response);
            });
    }
}