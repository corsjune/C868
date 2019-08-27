import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { stepsEnabledService } from "../../services/stepsEnabledService";

@autoinject
export class App {
    router: Router; 

    constructor(public stepsEnabled: stepsEnabledService) { 
    }  

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Book Now';
        config.map([{
            route: ['', 'step1'],
            name: 'step1', 
            settings: { icon: 'calendar', enabled:this.stepsEnabled.step1 },
            moduleId: PLATFORM.moduleName('../steps/step1/step1'),
            nav: true,
            title: 'Step 1 - Choose Dates and Times'
        }, {
            route: 'step2',
            name: 'step2',
            settings: { icon: 'phone-alt', enabled: this.stepsEnabled.step2  },
            moduleId: PLATFORM.moduleName('../steps/step2/step2'),
            nav: true,
            title: 'Step 2 - Contact Information'
        }, {
            route: 'step3',
            name: 'step3',
            settings: { icon: 'briefcase', enabled: this.stepsEnabled.step3  },
            moduleId: PLATFORM.moduleName('../steps/step3/step3'),
            nav: true,
            title: 'Step 3 - Job Details'
        }, {
            route: 'step4',
            name: 'step4',
            settings: { icon: 'ok', enabled: this.stepsEnabled.step4  },
            moduleId: PLATFORM.moduleName('../steps/step4/step4'),
            nav: true,
            title: 'Step 4 - Confirm'
        }, {
            route: 'step5',
            name: 'step5',
            settings: { icon: 'credit-card', enabled: this.stepsEnabled.step5  },
            moduleId: PLATFORM.moduleName('../steps/step5/step5'),
            nav: true,
            title: 'Step 5 - Pay and Submit'
        }, {
            route: 'stepfinished',
            name: 'stepfinished',
            settings: { icon: 'credit-card' },
            moduleId: PLATFORM.moduleName('../steps/stepfinished/stepfinished'),
            nav: false,
            title: 'Thank you!'
        }
        ]);

        this.router = router;
    }
}
