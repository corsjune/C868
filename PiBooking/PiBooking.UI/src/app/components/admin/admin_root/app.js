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
    };
    App = __decorate([
        autoinject,
        __metadata("design:paramtypes", [stepsEnabledService])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map