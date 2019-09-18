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
import { stepsEnabledService } from "app/services/stepsEnabledService";
var App = (function () {
    function App(stepsEnabled) {
        this.stepsEnabled = stepsEnabled;
    }
    App.prototype.configureRouter = function (config, router) {
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
                settings: { icon: 'phone-alt', roles: [] },
                moduleId: PLATFORM.moduleName('../main1/main'),
                nav: true,
                title: 'Admin 2 - Contact Information'
            }, {
                route: 'main2',
                name: 'main2',
                settings: { icon: 'briefcase', enabled: this.stepsEnabled.step3, roles: [] },
                moduleId: PLATFORM.moduleName('../main2/main'),
                nav: true,
                title: 'Admin 3 - Job Details'
            }
        ]);
        this.router = router;
    };
    var _a;
    App = __decorate([
        autoinject,
        __metadata("design:paramtypes", [typeof (_a = typeof stepsEnabledService !== "undefined" && stepsEnabledService) === "function" ? _a : Object])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map