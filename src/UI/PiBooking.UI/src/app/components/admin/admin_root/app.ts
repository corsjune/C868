import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Redirect, Router, RouterConfiguration, activationStrategy } from 'aurelia-router';
import { stepsEnabledService } from "app/services/stepsEnabledService";


@autoinject
export class App {
    router: Router;

    constructor(public stepsEnabled: stepsEnabledService) {
    }




    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Admin';

        config.map([{
            route: ['', 'bookings'],
            name: 'bookings',
            settings: { icon: 'calendar-check' },
            moduleId: PLATFORM.moduleName('../bookings/bookings'),
            activationStrategy: activationStrategy.invokeLifecycle,
            nav: true,
            auth: true,
            title: 'View/Search Bookings'
        }, {
            route: 'bookingsdetails',
            name: 'bookingsdetails',
            settings: { icon: 'calendar-check' },
            moduleId: PLATFORM.moduleName('../bookings/bookingsdetails'),
            nav: false,
            auth: true,
            title: 'Add/Edit Engineers'
        }, {
            route: 'engineers',
            name: 'engineers',
            settings: { icon: 'user-tie' },
            moduleId: PLATFORM.moduleName('../engineers/engineers'),
            nav: true,
            auth: true,
            title: 'Add/Edit Engineers'
        }, {
            route: 'engineerdetails',
            name: 'engineerdetails',
            settings: { icon: 'user-tie' },
            moduleId: PLATFORM.moduleName('../engineers/engineerdetails'),
            nav: false,
            auth: true,
            title: 'Add/Edit Engineers'
        }, {
            route: 'timeslots',
            name: 'timeslots',
            settings: { icon: 'user-clock' },
            moduleId: PLATFORM.moduleName('../timeslots/timeslots'),
            nav: true,
            auth: true,
            title: 'Add/Edit Timeslots'
        }, {
            route: 'timeslotdetails',
            name: 'timeslotdetails',
            settings: { icon: 'user-clock' },
            moduleId: PLATFORM.moduleName('../timeslots/timeslotsdetails'),
            nav: false,
            auth: true,
            title: 'Add/Edit Timeslots'
        }, {
            route: 'users',
            name: 'users',
            settings: { icon: 'users' },
            moduleId: PLATFORM.moduleName('../users/users'),
            nav: true,
            auth: true,
            title: 'Add/Edit Users'
        }, {
            route: 'userdetails',
            name: 'userdetails',
            settings: { icon: 'users' },
            moduleId: PLATFORM.moduleName('../users/userdetails'),
            nav: false,
            auth: true,
            title: 'Add/Edit Users'
        },
        {
            route: 'haspaidreport',
            name: 'haspaid',
            settings: { icon: 'chart-pie' },
            moduleId: PLATFORM.moduleName('../reports/reports'),
            nav: true,
            auth: true,
            activationStrategy: activationStrategy.invokeLifecycle,
            title: 'Report - Has Paid'
        },
        {
            route: 'upcomingreport',
            name: 'upcoming',
            settings: { icon: 'chart-pie' },
            moduleId: PLATFORM.moduleName('../reports/reports'),
            nav: true,
            auth: true,
            activationStrategy: activationStrategy.invokeLifecycle,
            title: 'Report - Upcoming Orders'
        }
        ]);

        this.router = router;
    }

}
