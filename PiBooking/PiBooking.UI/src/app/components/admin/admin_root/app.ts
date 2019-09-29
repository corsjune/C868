import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Redirect, Router, RouterConfiguration, activationStrategy } from 'aurelia-router';
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
            settings: { icon: 'calendar-check', roles: [] },
            moduleId: PLATFORM.moduleName('../bookings/bookings'),
            activationStrategy: activationStrategy.invokeLifecycle,
            nav: true,
            title: 'View/Search Bookings'
        }, {
            route: 'bookingdetails',
            name: 'bookingdetails',
            settings: { icon: 'calendar-check', roles: [] },
            moduleId: PLATFORM.moduleName('../bookings/bookingsdetails'),
            nav: false,
            title: 'Add/Edit Engineers'
        }, {
            route: 'engineers',
            name: 'engineers',
            settings: { icon: 'user-tie', roles: [] },
            moduleId: PLATFORM.moduleName('../engineers/engineers'),
            nav: true,
            title: 'Add/Edit Engineers'
        }, {
            route: 'engineerdetails',
            name: 'engineerdetails',
                settings: { icon: 'user-tie', roles: [] },
            moduleId: PLATFORM.moduleName('../engineers/engineerdetails'),
            nav: false,
            title: 'Add/Edit Engineers'
        }, {
            route: 'timeslots',
            name: 'timeslots',
                settings: { icon: 'user-clock', roles: [] },
            moduleId: PLATFORM.moduleName('../timeslots/timeslots'),
            nav: true,
            title: 'Add/Edit Timeslots'
        }, {
            route: 'timeslotdetails',
            name: 'timeslotdetails',
                settings: { icon: 'user-clock', roles: [] },
            moduleId: PLATFORM.moduleName('../timeslots/timeslotsdetails'),
            nav: false,
            title: 'Add/Edit Timeslots'
        }, {
            route: 'users',
            name: 'users',
            settings: { icon: 'users', roles: [] },
                moduleId: PLATFORM.moduleName('../users/users'),
            nav: true,
            title: 'Add/Edit Users'
        }, {
            route: 'userdetails',
                name: 'userdetails',
                settings: { icon: 'users', roles: [] },
                moduleId: PLATFORM.moduleName('../users/userdetails'),
            nav: false,
            title: 'Add/Edit Users'
            },
            {
                route: 'reports',
                name: 'reports',
                settings: { icon: 'chart-pie', roles: [] },
                moduleId: PLATFORM.moduleName('../reports/reports'),
                nav: true,
                title: 'Reports'
            }
        ]);

        this.router = router;
    }

}
