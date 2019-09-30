import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Redirect, Router, RouterConfiguration } from 'aurelia-router';
import { stepsEnabledService } from "../../services/stepsEnabledService";
import { AuthenticateStep } from 'aurelia-authentication';

@autoinject
export class App {
    router: Router; 

    constructor(public stepsEnabled: stepsEnabledService) { 
    }  

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Book Now';
        config.addPipelineStep('authorize', AuthenticateStep); 
        config.map([
         { route: '', redirect: 'home' },
         {
            route: ['home'],
            name: 'home', 
            settings: { icon: 'calendar', enabled:true, roles: [] },
            moduleId: PLATFORM.moduleName('../steps/steps_root/app'),
            nav: true,
            title: 'Home'
        }, {
            route: 'admin',
            name: 'admin',
            settings: { icon: 'phone-alt', enabled: true, roles: []  },
            moduleId: PLATFORM.moduleName('../admin/admin_root/app'),
            nav: true,
            title: 'Admin'
        } 
        ]);

        this.router = router;
    }

}

//class AuthorizeStep {
//        run(navigationInstruction, next) {
//          if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf('admin') !== -1)) {
//            var isAdmin = /* insert magic here */false;
//            if (!isAdmin) {
//              return next.cancel(new Redirect('step3'));
//            }
//          }
      
//          return next();
//        }
//}
