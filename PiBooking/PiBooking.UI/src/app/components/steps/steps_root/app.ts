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
        //config.addPipelineStep('authorize', AuthorizeStep);
        config.map([{
            route: ['', 'step1'],
            name: 'step1', 
            settings: { icon: 'calendar', enabled:this.stepsEnabled.step1, roles: [] },
            moduleId: PLATFORM.moduleName('../step1/step1'),
            nav: true,
            title: 'Step 1 - Choose Dates and Times'
        }, {
            route: 'step2',
            name: 'step2',
            settings: { icon: 'phone-alt', enabled: this.stepsEnabled.step2, roles: []  },
            moduleId: PLATFORM.moduleName('../step2/step2'),
            nav: true,
            title: 'Step 2 - Contact Information'
        }, {
            route: 'step3',
            name: 'step3',
            settings: { icon: 'briefcase', enabled: this.stepsEnabled.step3, roles: []  },
            moduleId: PLATFORM.moduleName('../step3/step3'),
            nav: true,
            title: 'Step 3 - Job Details'
        }, {
            route: 'step4',
            name: 'step4',
            settings: { icon: 'ok', enabled: this.stepsEnabled.step4, roles: []  },
            moduleId: PLATFORM.moduleName('../step4/step4'),
            nav: true,
            title: 'Step 4 - Confirm'
        }, {
            route: 'step5',
            name: 'step5',
            settings: { icon: 'credit-card', enabled: this.stepsEnabled.step5, roles: []  },
            moduleId: PLATFORM.moduleName('../step5/step5'),
            nav: true,
            title: 'Step 5 - Pay and Submit'
        }, {
            route: 'stepfinished',
            name: 'stepfinished',
            settings: { icon: 'credit-card',  roles: []  },
            moduleId: PLATFORM.moduleName('../stepfinished/stepfinished'),
            nav: false,
            title: 'Thank you!'
        }
        ]);

        this.router = router;
    }

}

