import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Redirect, Router, RouterConfiguration } from 'aurelia-router';
import { stepsEnabledService } from "app/services/stepsEnabledService";

@autoinject
export class App {
    router: Router; 

    constructor(public stepsEnabled: stepsEnabledService) { 
    }  

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Book Now'; 
        config.map([{
            route: ['', 'main'],
            name: 'main', 
            settings: { icon: 'calendar', roles: [] },
            moduleId: PLATFORM.moduleName('../main/main'),
            nav: true,
            title: 'Admin 1 - Choose Dates and Times'
        }, {
            route: 'main1',
                name: 'main1',
            settings: { icon: 'phone-alt', roles: []  },
                moduleId: PLATFORM.moduleName('../main1/main'),
            nav: true,
                title: 'Admin 2 - Contact Information'
        }, {
                route: 'main2',
                name: 'main2',
            settings: { icon: 'briefcase', enabled: this.stepsEnabled.step3, roles: []  },
                moduleId: PLATFORM.moduleName('../main2/main'),
            nav: true,
                title: 'Admin 3 - Job Details'
        } 
        ]);

        this.router = router;
    }

}
