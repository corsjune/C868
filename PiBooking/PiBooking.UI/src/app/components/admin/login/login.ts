//based on code referenced from https://aurelia-authentication.spoonx.org/Quick%20start.html
// login.js

import { AuthService } from 'aurelia-authentication';
import { inject, computedFrom } from 'aurelia-framework';
@inject(AuthService)

export class Login {

    errors: string = null;
    message: string = null; 

    authService: AuthService;

    constructor(authService) {
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

    login() {
        return this.authService.login(this.Username, this.password)
            .then(response => {
                this.message = "Login Successful " + response;
            })
            .catch(
                err => 
                {  
                    console.error(err);
                    this.errors = "Login Failed";
                }
            );
    };

    authenticate(name) {
        return this.authService.authenticate(name)
            .then(response => {
                console.log("auth response " + response);
            });
    }
}