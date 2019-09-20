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
            route: ['', 'bookings'],
            name: 'bookings',
            settings: { icon: 'calendar', roles: [] },
            moduleId: PLATFORM.moduleName('../bookings/bookings'),
            nav: true,
            title: 'View/Search Bookings'
        }, {
            route: 'bookingdetails',
            name: 'bookingdetails',
            settings: { icon: 'phone-alt', roles: [] },
            moduleId: PLATFORM.moduleName('../bookings/bookingsdetails'),
            nav: false,
            title: 'Add/Edit Engineers'
        }, {
            route: 'engineers',
            name: 'engineers',
            settings: { icon: 'phone-alt', roles: [] },
            moduleId: PLATFORM.moduleName('../engineers/engineers'),
            nav: true,
            title: 'Add/Edit Engineers'
        }, {
            route: 'engineerdetails',
            name: 'engineerdetails',
            settings: { icon: 'phone-alt', roles: [] },
            moduleId: PLATFORM.moduleName('../engineers/engineerdetails'),
            nav: false,
            title: 'Add/Edit Engineers'
        }, {
            route: 'timeslots',
            name: 'timeslots',
            settings: { icon: 'briefcase', roles: [] },
            moduleId: PLATFORM.moduleName('../timeslots/timeslots'),
            nav: true,
            title: 'Add/Edit Timeslots'
        }, {
            route: 'timeslotdetails',
            name: 'timeslotdetails',
            settings: { icon: 'briefcase', roles: [] },
            moduleId: PLATFORM.moduleName('../timeslots/timeslotsdetails'),
            nav: false,
            title: 'Add/Edit Timeslots'
        }
        ]);

        this.router = router;
    }

}
