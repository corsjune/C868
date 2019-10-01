var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PLATFORM, autoinject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { stepsEnabledService } from "app/services/stepsEnabledService";
var App = (function () {
    function App(stepsEnabled) {
        this.stepsEnabled = stepsEnabled;
    }
    App.prototype.configureRouter = function (config, router) {
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
    };
    App = __decorate([
        autoinject,
        __metadata("design:paramtypes", [stepsEnabledService])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map