import { Aurelia, PLATFORM, autoinject, computedFrom } from 'aurelia-framework';
import { Redirect, Router, RouterConfiguration } from 'aurelia-router';
import { stepsEnabledService } from "../../services/stepsEnabledService";
import { AuthenticateStep, AuthService } from 'aurelia-authentication';

@autoinject
export class App {
    router: Router;

    constructor(public stepsEnabled: stepsEnabledService, private authService: AuthService) {
    }

    logout() {
        return this.authService.logout();
    }

    @computedFrom('authService.authenticated')
    get authenticated() {
        return this.authService.authenticated;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Book Now';
        config.addAuthorizeStep(AuthenticateStep);

        config.map([
            { route: '', redirect: 'home' },
            {
                route: ['home'],
                name: 'home',
                settings: { icon: 'calendar', enabled: true, roles: [] },
                moduleId: PLATFORM.moduleName('../steps/steps_root/app'),
                nav: true,
                title: 'Home'
            }, {
                route: 'admin',
                name: 'admin',
                settings: { icon: 'phone-alt', enabled: true },
                moduleId: PLATFORM.moduleName('../admin/admin_root/app'),
                nav: true,
                auth: true,
                title: 'Admin'
            },
            {
                route: 'login',
                name: 'login',
                settings: { icon: 'key', enabled: true, roles: [] },
                moduleId: PLATFORM.moduleName('../admin/login/login'),
                nav: false,
                title: 'Login'
            }
        ]);

        this.router = router;
    }

}
